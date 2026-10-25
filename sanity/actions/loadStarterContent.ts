import { useState } from 'react'
import { useClient, type DocumentActionComponent } from 'sanity'
import { starterDocuments } from '../../lib/seedDocs'
import { apiVersion } from '../env'

/**
 * Pulsante nella Home page del CMS, visibile finché la Home page non è pubblicata:
 * carica i testi attuali della landing e i 5 stili. Crea solo ciò che manca.
 */
export const loadStarterContent: DocumentActionComponent = (props) => {
  const client = useClient({ apiVersion })
  const [busy, setBusy] = useState(false)

  if (props.published) return null

  return {
    label: busy ? 'Caricamento…' : 'Carica contenuti di partenza',
    tone: 'primary',
    disabled: busy,
    onHandle: async () => {
      setBusy(true)
      try {
        const tx = client.transaction()
        for (const doc of starterDocuments()) tx.createIfNotExists(doc)
        await tx.commit()
      } catch (error) {
        console.error(error)
        window.alert('Non sono riuscito a caricare i contenuti. Riprova tra poco.')
      } finally {
        setBusy(false)
        props.onComplete()
      }
    },
  }
}
