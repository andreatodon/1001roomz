import type { Lang } from './i18n'

type Json = unknown

const isObject = (v: Json): v is Record<string, Json> => typeof v === 'object' && v !== null && !Array.isArray(v)

/** Un testo bilingue del CMS: { it, en }, con _type localeString o localeText. */
const isLocaleValue = (v: Json): v is { it?: string; en?: string } =>
  isObject(v) &&
  (v._type === 'localeString' || v._type === 'localeText' || (('it' in v || 'en' in v) && !('asset' in v)))

/**
 * Sceglie la lingua in tutto il contenuto letto dal CMS.
 * - Testo bilingue: la lingua richiesta; se è vuota, l'italiano.
 * - Testo semplice (contenuti scritti prima del bilingue): resta com'è.
 * Il resto (slug, immagini, riferimenti, numeri) non cambia.
 */
export function localize<T = Json>(value: Json, lang: Lang): T {
  if (Array.isArray(value)) return value.map((item) => localize(item, lang)) as T
  if (isLocaleValue(value)) {
    const wanted = value[lang]?.trim() ? value[lang] : undefined
    return (wanted ?? value.it ?? '') as T
  }
  if (isObject(value)) {
    const out: Record<string, Json> = {}
    for (const [key, item] of Object.entries(value)) out[key] = localize(item, lang)
    return out as T
  }
  return value as T
}
