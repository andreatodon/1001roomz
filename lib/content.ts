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
import { fallbackHome, fallbackSettings, fallbackStyleDetails, fallbackStylePage, fallbackStyles } from './fallback'
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

export async function getContent(): Promise<{ home: HomePage; styles: Style[]; settings: SiteSettings }> {
  if (!isSanityConfigured) {
    return { home: fallbackHome, styles: fallbackStyles, settings: fallbackSettings }
  }

  try {
    const [home, styles, settings] = await Promise.all([
      client.fetch<Partial<HomePage> | null>(homePageQuery),
      client.fetch<Style[]>(stylesQuery),
      client.fetch<Partial<SiteSettings> | null>(siteSettingsQuery),
    ])
    const mergedHome = merge(fallbackHome, home)
    // Stili scelti nel CMS per il carosello (si scartano quelli eliminati o non pubblicati).
    const curated = (mergedHome.stylesSection.styles ?? []).filter((s): s is Style => Boolean(s && s._id))
    const allStyles = styles && styles.length > 0 ? styles : fallbackStyles
    return {
      home: mergedHome,
      styles: curated.length > 0 ? curated : allStyles,
      settings: merge(fallbackSettings, settings),
    }
  } catch (error) {
    console.error('Sanity non raggiungibile, uso i testi di default.', error)
    return { home: fallbackHome, styles: fallbackStyles, settings: fallbackSettings }
  }
}

/** Gli indirizzi di tutti gli stili, per generare le pagine in anticipo. */
export async function getStyleSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return fallbackStyles.map((s) => s.slug)
  try {
    const slugs = await client.fetch<string[]>(styleSlugsQuery)
    return slugs && slugs.length > 0 ? slugs : fallbackStyles.map((s) => s.slug)
  } catch {
    return fallbackStyles.map((s) => s.slug)
  }
}

export type StylePageData = {
  style: StyleDetail
  /** Tutti gli stili, nell'ordine globale: servono per il numero e per "Altri stili". */
  styles: Style[]
  labels: StylePageLabels
  settings: SiteSettings
}

/** Lo stile con quello slug e tutto ciò che serve alla sua pagina. `null` se non esiste. */
export async function getStylePage(slug: string): Promise<StylePageData | null> {
  const fromFallback = (): StylePageData | null => {
    const base = fallbackStyles.find((s) => s.slug === slug)
    if (!base) return null
    return {
      style: { ...base, ...fallbackStyleDetails[slug] },
      styles: fallbackStyles,
      labels: fallbackStylePage,
      settings: fallbackSettings,
    }
  }

  if (!isSanityConfigured) return fromFallback()

  try {
    const [style, styles, labels, settings] = await Promise.all([
      client.fetch<StyleDetail | null>(styleBySlugQuery, { slug }),
      client.fetch<Style[]>(stylesQuery),
      client.fetch<Partial<StylePageLabels> | null>(stylePageQuery),
      client.fetch<Partial<SiteSettings> | null>(siteSettingsQuery),
    ])
    if (!style) return null
    // I campi vuoti nel CMS lasciano il posto ai testi di partenza, se ci sono.
    const detail = merge({ ...(fallbackStyleDetails[slug] ?? {}) } as StyleDetail, style)
    return {
      style: detail,
      styles: styles && styles.length > 0 ? styles : fallbackStyles,
      labels: merge(fallbackStylePage, labels),
      settings: merge(fallbackSettings, settings),
    }
  } catch (error) {
    console.error('Sanity non raggiungibile, uso i testi di default.', error)
    return fromFallback()
  }
}
