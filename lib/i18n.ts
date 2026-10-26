/**
 * Lingue del sito. L'italiano è la lingua principale e sta alla radice
 * (/, /stili/...); l'inglese sta sotto /en (/en, /en/styles/...).
 */
export const LANGS = ['it', 'en'] as const
export type Lang = (typeof LANGS)[number]
export const DEFAULT_LANG: Lang = 'it'

export const isLang = (value: unknown): value is Lang => LANGS.includes(value as Lang)
export const otherLang = (lang: Lang): Lang => (lang === 'it' ? 'en' : 'it')

/** Nome della lingua, scritto nella lingua stessa (per il selettore). */
export const LANG_NAMES: Record<Lang, string> = { it: 'Italiano', en: 'English' }

/** Indirizzo pubblico del sito, per i link assoluti (hreflang, canonical). */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://1001roomz.vercel.app'

/** Pagine del sito, nella forma pubblica di ogni lingua. */
export const paths = {
  home: (lang: Lang) => (lang === 'it' ? '/' : '/en'),
  style: (lang: Lang, slug: string) => (lang === 'it' ? `/stili/${slug}` : `/en/styles/${slug}`),
  /** Una sezione della home. Sulla home basta l'ancora. */
  section: (lang: Lang, anchor: string, onHome = false) =>
    onHome ? `#${anchor}` : `${lang === 'it' ? '/' : '/en'}#${anchor}`,
}
