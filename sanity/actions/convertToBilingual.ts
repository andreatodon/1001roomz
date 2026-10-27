import { useEffect, useMemo, useState } from 'react'
import { useClient, type DocumentActionComponent } from 'sanity'
import { convertToBilingual, docTypeFor, plainStarterDocuments, type StarterDoc } from '../../lib/seedDocs'
import { apiVersion } from '../env'
import { isPreviewStudio } from '../lib/studioEnv'

const TYPES = ['homePage', 'siteSettings', 'stylePage', 'bookingPage', 'style']
const QUERY = `*[_type in $types]`

type Doc = StarterDoc & { _rev?: string; slug?: { current?: string } }
type Change = { id: string; rev?: string; set: Record<string, unknown> }

/** I testi di partenza che corrispondono a un documento: stesso ID, oppure (per gli stili) stesso slug. */
function starterFor(doc: Doc, starters: StarterDoc[]) {
  const id = doc._id.replace(/^drafts\./, '')
  const byId = starters.find((s) => s._id === id)
  if (byId) return byId
  const slug = doc.slug?.current
  return slug ? starters.find((s) => (s.slug as { current?: string } | undefined)?.current === slug) : undefined
}

/** Per ogni documento, i campi da riscrivere nel formato bilingue. */
function planChanges(docs: Doc[]): Change[] {
  const it = plainStarterDocuments('it')
  const en = plainStarterDocuments('en')
  const changes: Change[] = []
  for (const doc of docs) {
    const type = docTypeFor(doc._type)
    if (!type) continue
    const { value, changed } = convertToBilingual(type, doc, starterFor(doc, it), starterFor(doc, en))
    if (!changed) continue
    const set: Record<string, unknown> = {}
    for (const key of Object.keys(value)) {
      if (key.startsWith('_')) continue
      if (JSON.stringify(value[key]) !== JSON.stringify(doc[key])) set[key] = value[key]
    }
    if (Object.keys(set).length > 0) changes.push({ id: doc._id, rev: doc._rev, set })
  }
  return changes
}

/**
 * Pulsante nella Home page del CMS: porta i testi scritti prima del bilingue
 * nel nuovo formato, in tutti i documenti (anche nelle bozze). L'italiano resta
 * com'è; l'inglese si riempie con la bozza di partenza solo dove l'italiano non
 * è stato cambiato. Compare solo finché c'è qualcosa da convertire.
 */
export const convertToBilingualAction: DocumentActionComponent = (props) => {
  const studioClient = useClient({ apiVersion })
  // "raw": legge anche le bozze, che vanno convertite come i documenti pubblicati.
  const client = useMemo(() => studioClient.withConfig({ perspective: 'raw' }), [studioClient])
  const [pending, setPending] = useState<Change[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    let alive = true
    client
      .fetch<Doc[]>(QUERY, { types: TYPES })
      .then((docs) => alive && setPending(planChanges(docs)))
      .catch(() => alive && setPending([]))
    return () => {
      alive = false
    }
  }, [client, busy])

  if (isPreviewStudio() || !pending || pending.length === 0) return null

  const run = async () => {
    setBusy(true)
    try {
      const tx = client.transaction()
      for (const c of pending) {
        tx.patch(c.id, (p) => (c.rev ? p.ifRevisionId(c.rev) : p).set(c.set))
      }
      await tx.commit()
    } catch (error) {
      console.error(error)
      window.alert('Non sono riuscito a convertire i testi. Ricarica la pagina e riprova.')
    } finally {
      setBusy(false)
      setConfirming(false)
      props.onComplete()
    }
  }

  return {
    label: busy ? 'Conversione…' : 'Converti i testi in italiano e inglese',
    tone: 'caution',
    disabled: busy,
    onHandle: () => setConfirming(true),
    dialog: confirming && {
      type: 'confirm',
      message: `Ci sono testi in ${pending.length} documenti (bozze comprese) scritti prima del sito bilingue. Li sposto nel campo "Italiano"; dove il testo è ancora quello di partenza aggiungo anche la bozza inglese. Non si perde niente. Procedo?`,
      onCancel: () => setConfirming(false),
      onConfirm: run,
    },
  }
}
