import { NextResponse, type NextRequest } from 'next/server'
import { EN_SEGMENTS } from './lib/i18n'

const TO_EN: Record<string, string> = Object.fromEntries(Object.entries(EN_SEGMENTS).map(([en, it]) => [it, en]))
const has = (map: Record<string, string>, key: string) => Object.hasOwn(map, key)

/**
 * Indirizzi pubblici → pagine interne.
 * - Italiano alla radice: /  → /it,  /stili/x → /it/stili/x,  /prenota → /it/prenota
 * - Inglese sotto /en, con i nomi inglesi: /en/styles/x → /en/stili/x, /en/book → /en/prenota
 *   (tabella in lib/i18n.ts, EN_SEGMENTS)
 * - /it/... e i nomi italiani sotto /en non sono indirizzi pubblici: si reindirizzano
 *   alla forma giusta, così ogni pagina ha un solo indirizzo.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()

  if (pathname === '/it' || pathname.startsWith('/it/')) {
    url.pathname = pathname.slice(3) || '/'
    return NextResponse.redirect(url, 308)
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const parts = pathname.split('/').slice(2) // dopo "/en"
    // Nomi italiani sotto /en: reindirizza ai nomi inglesi.
    if (parts.some((p) => has(TO_EN, p))) {
      url.pathname = ['/en', ...parts.map((p) => (has(TO_EN, p) ? TO_EN[p] : p))].join('/')
      return NextResponse.redirect(url, 308)
    }
    if (parts.some((p) => has(EN_SEGMENTS, p))) {
      url.pathname = ['/en', ...parts.map((p) => (has(EN_SEGMENTS, p) ? EN_SEGMENTS[p] : p))].join('/')
      return NextResponse.rewrite(url)
    }
    return NextResponse.next()
  }

  url.pathname = `/it${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Fuori: lo Studio, i file di Next, le API e i file statici (logo, favicon…).
  matcher: ['/((?!studio|_next|api|.*\\..*).*)'],
}
