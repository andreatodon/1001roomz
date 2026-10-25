import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'
import { isSanityConfigured } from '@/sanity/env'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 560, margin: '80px auto', padding: 16, lineHeight: 1.6 }}>
        <h1 style={{ fontSize: 22 }}>CMS non ancora collegato</h1>
        <p>
          Aggiungi la variabile <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (in <code>.env.local</code> o nelle impostazioni
          del progetto su Vercel) e ricarica la pagina. I passaggi sono nel README.
        </p>
      </main>
    )
  }
  return <NextStudio config={config} />
}
