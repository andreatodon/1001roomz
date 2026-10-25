import { client } from '@/sanity/lib/client'
import { homePageQuery, siteSettingsQuery, stylesQuery } from '@/sanity/lib/queries'
import { isSanityConfigured } from '@/sanity/env'
import { fallbackHome, fallbackSettings, fallbackStyles } from './fallback'
import type { HomePage, SiteSettings, Style } from './types'

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
    return {
      home: merge(fallbackHome, home),
      styles: styles && styles.length > 0 ? styles : fallbackStyles,
      settings: merge(fallbackSettings, settings),
    }
  } catch (error) {
    console.error('Sanity non raggiungibile, uso i testi di default.', error)
    return { home: fallbackHome, styles: fallbackStyles, settings: fallbackSettings }
  }
}
