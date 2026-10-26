/**
 * Converte i documenti nel formato bilingue seguendo lo schema.
 *
 * Ogni testo semplice in un campo bilingue diventa { it, en }. L'inglese si
 * prende dai testi di partenza solo se l'italiano è ancora quello di partenza:
 * se è stato cambiato nel CMS, l'inglese resta vuoto (e il sito mostra l'italiano).
 *
 * Serve in due casi:
 * - i documenti di partenza (seed): testo italiano + testo inglese di partenza;
 * - la conversione dei documenti già nel CMS, scritti prima del bilingue.
 *
 * Non tocca i campi che non sono bilingui (slug, prezzi, colori, riferimenti, immagini).
 */

type Def = {
  name?: string
  type: string
  fields?: Def[]
  of?: Def[]
}

type Json = unknown

const LOCALE_TYPES = new Set(['localeString', 'localeText'])

const isObject = (v: Json): v is Record<string, Json> => typeof v === 'object' && v !== null && !Array.isArray(v)

const isLocaleValue = (v: Json) => isObject(v) && ('it' in v || 'en' in v)

export type ConvertResult<T> = { value: T; changed: boolean }

export function makeConverter(namedTypes: Def[]) {
  const named = new Map(namedTypes.filter((t) => t.name).map((t) => [t.name as string, t]))

  /** Il tipo "vero" di un campo, seguendo i tipi con nome (per esempio un documento o un oggetto riusato). */
  const resolve = (def: Def): Def => {
    if (LOCALE_TYPES.has(def.type)) return def
    const target = named.get(def.type)
    if (target && !def.fields && !def.of) return { ...target, name: def.name }
    return def
  }

  let changed = false

  const leaf = (type: string, value: string, itRef: Json, enRef: Json, key?: string) => {
    changed = true
    const en = value === itRef && typeof enRef === 'string' && enRef.trim() ? enRef : undefined
    return {
      ...(key ? { _key: key } : {}),
      _type: type,
      it: value,
      ...(en ? { en } : {}),
    }
  }

  const memberFor = (of: Def[], item: Json): Def | undefined => {
    if (typeof item === 'string') return of.find((m) => LOCALE_TYPES.has(m.type))
    if (isObject(item) && typeof item._type === 'string') {
      return of.find((m) => m.name === item._type || m.type === item._type) ?? of[0]
    }
    return of[0]
  }

  const refAt = (refs: Json, item: Json, index: number): Json => {
    if (!Array.isArray(refs)) return undefined
    if (isObject(item) && typeof item._key === 'string') {
      const byKey = refs.find((r) => isObject(r) && r._key === item._key)
      if (byKey !== undefined) return byKey
    }
    return refs[index]
  }

  const walk = (rawDef: Def, value: Json, itRef: Json, enRef: Json): Json => {
    const def = resolve(rawDef)

    if (LOCALE_TYPES.has(def.type)) {
      if (typeof value === 'string') return leaf(def.type, value, itRef, enRef)
      return value // già bilingue, vuoto o di un altro tipo: non si tocca
    }

    if (def.of && Array.isArray(value)) {
      return value.map((item, i) => {
        const member = memberFor(def.of as Def[], item)
        if (!member) return item
        const itItem = refAt(itRef, item, i)
        const enItem = refAt(enRef, item, i)
        if (typeof item === 'string' && LOCALE_TYPES.has(member.type)) {
          return leaf(member.type, item, itItem, enItem, `k${i}`)
        }
        return walk(member, item, itItem, enItem)
      })
    }

    if (def.fields && isObject(value) && !isLocaleValue(value)) {
      const out: Record<string, Json> = { ...value }
      for (const field of def.fields) {
        if (!field.name || !(field.name in value)) continue
        out[field.name] = walk(
          field,
          value[field.name],
          isObject(itRef) ? itRef[field.name] : undefined,
          isObject(enRef) ? enRef[field.name] : undefined,
        )
      }
      return out
    }

    return value
  }

  /**
   * Converte un documento. `itRef` ed `enRef` sono lo stesso documento di partenza
   * nelle due lingue (facoltativi): servono solo a recuperare l'inglese.
   */
  return function convert<T>(docType: Def, doc: T, itRef?: Json, enRef?: Json): ConvertResult<T> {
    changed = false
    const value = walk(docType, doc, itRef ?? doc, enRef) as T
    return { value, changed }
  }
}
