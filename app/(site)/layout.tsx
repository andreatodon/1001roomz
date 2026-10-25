import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '1001 Rooms · Una stanza alla volta',
  description:
    'Scegli uno stile, prenota una consulenza. Ricevi un piano chiaro: cosa comprare, dove metterlo, come farla tua.',
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
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
