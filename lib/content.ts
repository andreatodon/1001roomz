import { client } from '@/sanity/lib/client'
import {
  homePageQuery,
  siteSettingsQuery,
  styleBySlugQuery,
  stylePageQuery,
  styleSlugsQuery,
  stylesQuery,
} from '@/sanity/lib/queries'
import { isSanityConfigured } from '@/sanity/env'
import { fallbacks } from './fallback'
import type { Lang } from './i18n'
import { localize } from './localize'
import type { HomePage, SiteSettings, Style, StyleDetail, StylePageLabels } from './types'

/** Unisce un oggetto del CMS ai testi di partenza: i campi vuoti restano quelli di default. */
function merge<T extends object>(base: T, override: Partial<T> | null | undefined): T {
  if (!override) return base
  const out = { ...base }
  for (const key of Object.keys(override) as (keyof T)[]) {
    const value = override[key]
    if (value === null || value === undefined || value === '') continue
    if (Array.isArray(value)) {
      if (value.length > 0) out[key] = value as T[keyof T]
    } else if (typeof value === 'object' && typeof base[key] === 'object' && !Array.isArray(base[key])) {
      out[key] = merge(base[key] as object, value as object) as T[keyof T]
    } else {
      out[key] = value as T[keyof T]
    }
  }
  return out
}

/** Impostazioni come le legge il CMS, prima di scegliere la lingua. */
type RawSettings = Partial<SiteSettings> & { bookingUrlEn?: string }

/** Impostazioni nella lingua della pagina, con il link di prenotazione giusto. */
function settingsFor(raw: RawSettings | null, lang: Lang): SiteSettings {
  const localized = raw ? localize<RawSettings>(raw, lang) : null
  const merged = merge(fallbacks[lang].settings, localized)
  const bookingUrl = lang === 'en' ? localized?.bookingUrlEn || localized?.bookingUrl : localized?.bookingUrl
  return { ...merged, bookingUrl: bookingUrl || undefined }
}

/** Uno stile del CMS nella lingua della pagina, con i testi di partenza dove il CMS è vuoto. */
function styleFor<T extends Style>(raw: T, lang: Lang): T {
  const localized = localize<T>(raw, lang)
  const base = fallbacks[lang].styles.find((s) => s.slug === localized.slug)
  return base ? merge(base as T, localized) : localized
}

export async function getContent(lang: Lang): Promise<{ home: HomePage; styles: Style[]; settings: SiteSettings }> {
  const fb = fallbacks[lang]
  if (!isSanityConfigured) return { home: fb.home, styles: fb.styles, settings: fb.settings }

  try {
    const [home, styles, settings] = await Promise.all([
      client.fetch<Partial<HomePage> | null>(homePageQuery),
      client.fetch<Style[]>(stylesQuery),
      client.fetch<RawSettings | null>(siteSettingsQuery),
    ])
    const mergedHome = merge(fb.home, home ? localize<Partial<HomePage>>(home, lang) : null)
    // Stili scelti nel CMS per il carosello (si scartano quelli eliminati o non pubblicati).
    const curated = (mergedHome.stylesSection.styles ?? [])
      .filter((s): s is Style => Boolean(s && s._id))
      .map((s) => styleFor(s, lang))
    const allStyles = styles && styles.length > 0 ? styles.map((s) => styleFor(s, lang)) : fb.styles
    return {
      home: mergedHome,
      styles: curated.length > 0 ? curated : allStyles,
      settings: settingsFor(settings, lang),
    }
  } catch (error) {
    console.error('Sanity non raggiungibile, uso i testi di default.', error)
    return { home: fb.home, styles: fb.styles, settings: fb.settings }
  }
}

/** Gli indirizzi di tutti gli stili, per generare le pagine in anticipo. Lo slug è uguale nelle due lingue. */
export async function getStyleSlugs(): Promise<string[]> {
  const fromFallback = fallbacks.it.styles.map((s) => s.slug)
  if (!isSanityConfigured) return fromFallback
  try {
    const slugs = await client.fetch<string[]>(styleSlugsQuery)
    return slugs && slugs.length > 0 ? slugs : fromFallback
  } catch {
    return fromFallback
  }
}

export type StylePageData = {
  lang: Lang
  style: StyleDetail
  /** Tutti gli stili, nell'ordine globale: servono per il numero e per "Altri stili". */
  styles: Style[]
  labels: StylePageLabels
  settings: SiteSettings
}

/** Lo stile con quello slug e tutto ciò che serve alla sua pagina. `null` se non esiste. */
export async function getStylePage(slug: string, lang: Lang): Promise<StylePageData | null> {
  const fb = fallbacks[lang]
  const fromFallback = (): StylePageData | null => {
    const base = fb.styles.find((s) => s.slug === slug)
    if (!base) return null
    return {
      lang,
      style: { ...base, ...fb.styleDetails[slug] },
      styles: fb.styles,
      labels: fb.stylePage,
      settings: fb.settings,
    }
  }

  if (!isSanityConfigured) return fromFallback()

  try {
    const [style, styles, labels, settings] = await Promise.all([
      client.fetch<StyleDetail | null>(styleBySlugQuery, { slug }),
      client.fetch<Style[]>(stylesQuery),
      client.fetch<Partial<StylePageLabels> | null>(stylePageQuery),
      client.fetch<RawSettings | null>(siteSettingsQuery),
    ])
    if (!style) return null
    // I campi vuoti nel CMS lasciano il posto ai testi di partenza, se ci sono.
    const base = { ...(fb.styles.find((s) => s.slug === slug) ?? {}), ...(fb.styleDetails[slug] ?? {}) }
    const detail = merge(base as StyleDetail, localize<StyleDetail>(style, lang))
    return {
      lang,
      style: detail,
      styles: styles && styles.length > 0 ? styles.map((s) => styleFor(s, lang)) : fb.styles,
      labels: merge(fb.stylePage, labels ? localize<Partial<StylePageLabels>>(labels, lang) : null),
      settings: settingsFor(settings, lang),
    }
  } catch (error) {
    console.error('Sanity non raggiungibile, uso i testi di default.', error)
    return fromFallback()
  }
}
