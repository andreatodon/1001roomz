import type { SiteSettings } from './types'

/**
 * Link dei pulsanti "Prenota". Se è indicato uno stile, lo aggiunge al link
 * come parametro `stile`: su Cal.com precompila la domanda con identificativo "stile".
 * Senza link nel CMS si torna al prezzo in home.
 */
export function bookingLink(settings: SiteSettings, opts: { style?: string; fallback?: string } = {}) {
  const fallback = opts.fallback ?? '#prezzo'
  if (!settings.bookingUrl) return { href: fallback, props: {} }

  let href = settings.bookingUrl
  if (opts.style) {
    try {
      const url = new URL(settings.bookingUrl)
      url.searchParams.set('stile', opts.style)
      href = url.toString()
    } catch {
      // Link non valido nel CMS: lo usiamo così com'è.
    }
  }
  return { href, props: { target: '_blank', rel: 'noopener noreferrer' } }
}
