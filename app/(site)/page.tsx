import { Landing } from '@/components/Landing'
import { getContent } from '@/lib/content'

// Le modifiche pubblicate nel CMS compaiono sul sito entro un minuto.
export const revalidate = 60

export default async function HomePage() {
  const { home, styles, settings } = await getContent()
  return <Landing home={home} styles={styles} settings={settings} />
}
