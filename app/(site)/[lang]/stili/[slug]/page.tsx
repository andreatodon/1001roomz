import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StyleDetailPage } from '@/components/StyleDetailPage'
import { getStylePage, getStyleSlugs } from '@/lib/content'
import { DEFAULT_LANG, isLang, paths, type Lang } from '@/lib/i18n'

// Come la home: le modifiche pubblicate nel CMS compaiono entro un minuto.
export const revalidate = 60

type Params = { params: Promise<{ lang: string; slug: string }> }

const read = async (params: Params['params']): Promise<{ lang: Lang; slug: string }> => {
  const { lang, slug } = await params
  return { lang: isLang(lang) ? lang : DEFAULT_LANG, slug }
}

// In tutte e due le lingue lo slug è lo stesso: /stili/x e /en/styles/x.
export async function generateStaticParams() {
  const slugs = await getStyleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await read(params)
  const data = await getStylePage(slug, lang)
  if (!data) return {}
  return {
    title: `${data.style.title} · 1001 Rooms`,
    description: data.style.shortDescription,
    alternates: {
      canonical: paths.style(lang, slug),
      languages: { it: paths.style('it', slug), en: paths.style('en', slug), 'x-default': paths.style('it', slug) },
    },
  }
}

export default async function StylePage({ params }: Params) {
  const { lang, slug } = await read(params)
  const data = await getStylePage(slug, lang)
  if (!data) notFound()
  return <StyleDetailPage {...data} />
}
