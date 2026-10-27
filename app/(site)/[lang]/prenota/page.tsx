import type { Metadata } from 'next'
import { BookingPage } from '@/components/BookingPage'
import { getBookingPage } from '@/lib/content'
import { DEFAULT_LANG, isLang, paths, type Lang } from '@/lib/i18n'

// Legge ?stile= e ?stanza= dall'indirizzo, quindi si costruisce a ogni visita.
export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ stile?: string | string[]; stanza?: string | string[] }>
}

const one = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v)
const langOf = async (params: Props['params']): Promise<Lang> => {
  const { lang } = await params
  return isLang(lang) ? lang : DEFAULT_LANG
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await langOf(params)
  const { labels } = await getBookingPage(lang)
  return {
    title: labels.metaTitle,
    description: labels.metaDescription,
    alternates: {
      canonical: paths.booking(lang),
      languages: { it: paths.booking('it'), en: paths.booking('en'), 'x-default': paths.booking('it') },
    },
  }
}

export default async function Prenota({ params, searchParams }: Props) {
  const lang = await langOf(params)
  const query = await searchParams
  const data = await getBookingPage(lang, one(query.stile))
  return <BookingPage {...data} room={one(query.stanza)} />
}
