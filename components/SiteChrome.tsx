import type { SiteSettings } from '@/lib/types'
import { bookingLink } from '@/lib/booking'
import { LANG_NAMES, otherLang, paths, type Lang } from '@/lib/i18n'
import { uiFor } from '@/lib/ui'

type HeaderProps = {
  lang: Lang
  settings: SiteSettings
  /** La stessa pagina nell'altra lingua, per il selettore. */
  alternateHref: string
  onHome?: boolean
}

/** Intestazione del sito. Fuori dalla home i link alle sezioni puntano alla home della stessa lingua. */
export function SiteHeader({ lang, settings, alternateHref, onHome = false }: HeaderProps) {
  const ui = uiFor(lang)
  const other = otherLang(lang)
  const section = (anchor: string) => paths.section(lang, anchor, onHome)
  const booking = bookingLink(settings, { fallback: section('prezzo') })
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href={onHome ? '#top' : paths.home(lang)} className="nav-logo" aria-label={ui.logoLabel}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="1001 Rooms" width={411} height={46} />
        </a>
        <nav className="nav-links" aria-label={ui.navLabel}>
          <a href={section('stili')}>{settings.navStyles}</a>
          <a href={section('come-funziona')}>{settings.navHowItWorks}</a>
          <a href={section('faq')}>{settings.navFaq}</a>
          <a
            href={alternateHref}
            className="lang-switch"
            hrefLang={other}
            lang={other}
            aria-label={uiFor(other).switchLabel}
            title={LANG_NAMES[other]}
          >
            {other.toUpperCase()}
          </a>
          <a href={booking.href} className="btn" {...booking.props}>
            {settings.navBook}
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
