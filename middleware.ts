import { NextResponse, type NextRequest } from 'next/server'

/**
 * Indirizzi pubblici → pagine interne.
 * - Italiano alla radice: /            → /it,  /stili/x  → /it/stili/x
 * - Inglese sotto /en:   /en           → /en,  /en/styles/x → /en/stili/x
 * - /it/... e /en/stili/... non sono indirizzi pubblici: si reindirizzano
 *   alla forma giusta, così ogni pagina ha un solo indirizzo.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()

  if (pathname === '/it' || pathname.startsWith('/it/')) {
    url.pathname = pathname.slice(3) || '/'
    return NextResponse.redirect(url, 308)
  }

  if (pathname.startsWith('/en/stili/')) {
    url.pathname = pathname.replace('/en/stili/', '/en/styles/')
    return NextResponse.redirect(url, 308)
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    if (pathname.startsWith('/en/styles/')) {
      url.pathname = pathname.replace('/en/styles/', '/en/stili/')
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
