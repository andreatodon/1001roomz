import type { SiteSettings } from '@/lib/types'
import { bookingLink } from '@/lib/booking'

/** Intestazione del sito. Fuori dalla home i link alle sezioni puntano a "/". */
export function SiteHeader({ settings, onHome = false }: { settings: SiteSettings; onHome?: boolean }) {
  const base = onHome ? '' : '/'
  const booking = bookingLink(settings, { fallback: `${base}#prezzo` })
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href={onHome ? '#top' : '/'} className="nav-logo" aria-label="1001 Rooms, torna all’inizio">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="1001 Rooms" width={411} height={46} />
        </a>
        <nav className="nav-links" aria-label="Principale">
          <a href={`${base}#stili`}>Stili</a>
          <a href={`${base}#come-funziona`}>Come funziona</a>
          <a href={`${base}#guide`} className="muted">
            Guide
          </a>
          <a href={booking.href} className="btn" {...booking.props}>
            Prenota
          </a>
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="1001 Rooms" width={411} height={46} />
        <p>{settings.footerText}</p>
      </div>
    </footer>
  )
}
