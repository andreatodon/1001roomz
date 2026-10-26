import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StyleDetailPage } from '@/components/StyleDetailPage'
import { getStylePage, getStyleSlugs } from '@/lib/content'

// Come la home: le modifiche pubblicate nel CMS compaiono entro un minuto.
export const revalidate = 60

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getStyleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const data = await getStylePage(slug)
  if (!data) return {}
  return {
    title: `${data.style.title} · 1001 Rooms`,
    description: data.style.shortDescription,
  }
}

export default async function StylePage({ params }: Params) {
  const { slug } = await params
  const data = await getStylePage(slug)
  if (!data) notFound()
  return <StyleDetailPage {...data} />
}
