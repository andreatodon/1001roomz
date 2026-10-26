import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LANGS, SITE_URL, isLang } from '@/lib/i18n'
import '../globals.css'

// Solo le lingue previste: /fr o simili danno 404.
export const dynamicParams = false

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }))
}

export const metadata: Metadata = { metadataBase: new URL(SITE_URL) }

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
