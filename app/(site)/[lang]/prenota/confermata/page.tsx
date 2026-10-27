import type { Metadata } from 'next'
import { BookingConfirmed } from '@/components/BookingPage'
import { getBookingPage } from '@/lib/content'
import { DEFAULT_LANG, isLang, type Lang } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ stile?: string | string[] }>
}

const langOf = async (params: Props['params']): Promise<Lang> => {
  const { lang } = await params
  return isLang(lang) ? lang : DEFAULT_LANG
}

// La conferma è per chi ha appena prenotato: Google non deve indicizzarla.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await langOf(params)
  const { labels } = await getBookingPage(lang)
  return { title: `${labels.confirmEyebrow} · 1001 Rooms`, robots: { index: false, follow: false } }
}

export default async function Confermata({ params, searchParams }: Props) {
  const lang = await langOf(params)
  const { stile } = await searchParams
  const data = await getBookingPage(lang, Array.isArray(stile) ? stile[0] : stile)
  return <BookingConfirmed {...data} />
}
