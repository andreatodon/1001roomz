import type { Lang } from '../i18n'
import type { BookingPageLabels, HomePage, SiteSettings, Style, StyleDetail, StylePageLabels } from '../types'
import { en } from './en'
import { it } from './it'

/** Tutti i testi di partenza di una lingua. La struttura è la stessa in it.ts ed en.ts. */
export type StarterContent = {
  styles: Style[]
  home: HomePage
  settings: SiteSettings
  stylePage: StylePageLabels
  bookingPage: BookingPageLabels
  /** Contenuti delle pagine stile, per slug. */
  styleDetails: Record<string, Partial<StyleDetail>>
}

export const fallbacks: Record<Lang, StarterContent> = { it, en }
