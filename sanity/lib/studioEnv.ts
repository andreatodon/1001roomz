/**
 * Vero quando lo Studio gira in un'anteprima di Vercel (un branch non ancora unito).
 * L'anteprima usa lo stesso dataset del sito pubblico: lì lo Studio è in sola
 * lettura, così niente di quello che si prova finisce sul sito vero.
 */
export function isPreviewStudio(): boolean {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') return true
  if (typeof window === 'undefined') return false
  const host = window.location.hostname
  // Le anteprime di Vercel hanno indirizzi tipo 1001roomz-abc123-1001-roomz.vercel.app.
  return host.endsWith('.vercel.app') && host !== '1001roomz.vercel.app'
}
