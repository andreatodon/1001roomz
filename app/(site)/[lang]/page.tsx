import type { Metadata } from 'next'
import { Landing } from '@/components/Landing'
import { getContent } from '@/lib/content'
import { DEFAULT_LANG, isLang, paths, type Lang } from '@/lib/i18n'

// Le modifiche pubblicate nel CMS compaiono sul sito entro un minuto.
export const revalidate = 60

type Params = { params: Promise<{ lang: string }> }

const langOf = async (params: Params['params']): Promise<Lang> => {
  const { lang } = await params
  return isLang(lang) ? lang : DEFAULT_LANG
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const lang = await langOf(params)
  const { settings } = await getContent(lang)
  return {
    title: settings.metaTitle,
    description: settings.metaDescription,
    alternates: {
      canonical: paths.home(lang),
      languages: { it: paths.home('it'), en: paths.home('en'), 'x-default': paths.home('it') },
    },
  }
}

export default async function HomePage({ params }: Params) {
  const lang = await langOf(params)
  const { home, styles, settings } = await getContent(lang)
  return <Landing lang={lang} home={home} styles={styles} settings={settings} />
}
