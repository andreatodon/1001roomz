import { paths, type Lang } from './i18n'

/**
 * Link dei pulsanti "Prenota": portano tutti alla pagina di prenotazione del sito,
 * con lo stile (slug) già scelto se c'è. Il calendario Cal.com sta dentro quella pagina.
 */
export function bookingLink(lang: Lang, opts: { style?: string } = {}) {
  return { href: paths.booking(lang, { style: opts.style }), props: {} }
}

/**
 * Dal link Cal.com nelle Impostazioni (per esempio https://cal.com/1001rooms/consulenza)
 * ai dati per incorporare il calendario: indirizzo del servizio e "utente/evento".
 * `null` se il link manca o non è valido.
 */
export function calEmbedFrom(bookingUrl?: string): { origin: string; calLink: string } | null {
  if (!bookingUrl) return null
  try {
    const url = new URL(bookingUrl)
    const calLink = url.pathname.replace(/^\/+|\/+$/g, '')
    if (!calLink) return null
    // cal.com e cal.eu servono il calendario incorporato da app.cal.com e app.cal.eu.
    const host = url.hostname.replace(/^www\./, '')
    const origin = host === 'cal.com' || host === 'cal.eu' ? `https://app.${host}` : url.origin
    return { origin, calLink }
  } catch {
    return null
  }
}
