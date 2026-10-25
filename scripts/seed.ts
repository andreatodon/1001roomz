/**
 * Alternativa da terminale al pulsante "Carica contenuti di partenza" nello Studio.
 * Uso: npx sanity login, poi npm run seed
 *
 * Crea solo i documenti che mancano: non sovrascrive nulla di già modificato.
 */
import { getCliClient } from 'sanity/cli'
import { starterDocuments } from '../lib/seedDocs'

const client = getCliClient({ apiVersion: '2025-01-01' })

async function run() {
  const tx = client.transaction()
  for (const doc of starterDocuments()) tx.createIfNotExists(doc)
  await tx.commit()
  console.log('Contenuti di partenza caricati (solo quelli mancanti).')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
