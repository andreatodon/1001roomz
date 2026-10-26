import type { RoomField, RoomKey } from './rooms'

export type SanityImage = {
  _type?: 'image'
  asset?: { _ref: string; _type?: 'reference' }
  alt?: string
  hotspot?: unknown
  crop?: unknown
}

export type StyleIcon = 'odyssey' | 'square' | 'brackets' | 'circle' | 'rectangle'

export type Style = {
  _id: string
  title: string
  slug: string
  shortDescription: string
  icon?: StyleIcon
  highlighted?: boolean
  coverImage?: SanityImage
  /** Stanze per cui va bene lo stile: decidono in quali tab compare. */
  rooms?: RoomKey[]
}

export type StyleTrait = {
  _key?: string
  title: string
  text: string
  colors?: { _key?: string; name?: string; hex: string }[]
}

export type StylePlan = {
  title: string
  text?: string
  items: { _key?: string; title: string; note?: string; price?: string }[]
  total?: string
}

/** Uno stile con i contenuti della sua pagina. I campi della pagina sono facoltativi. */
export type StyleDetail = Style & {
  intro?: string
  gallery?: SanityImage[]
  traits?: StyleTrait[]
  fitFor?: string[]
  notFor?: string[]
  alternativeStyle?: { title: string; slug: string } | null
  examplePlan?: StylePlan | null
}

/** Testi uguali per tutte le pagine stile. */
export type StylePageLabels = {
  breadcrumb: string
  counter: string
  bookLabel: string
  unsureLabel: string
  unsureShortLabel: string
  traitsTitle: string
  traitsEyebrow: string
  fitTitle: string
  notForTitle: string
  alternativeBefore: string
  alternativeAfter: string
  planEyebrow: string
  planTotalLabel: string
  ctaTitle: string
  ctaText: string
  otherStylesTitle: string
  allStylesLabel: string
  galleryPlaceholder: string
}

export type StylesFilterLabels = {
  allLabel: string
  ariaLabel: string
  countOne: string
  countMany: string
} & Record<RoomField, string>

export type TitledItem = { _key?: string; title: string; text: string }

export type HomePage = {
  hero: {
    eyebrow: string
    title: string
    text: string
    ctaLabel: string
    secondaryLabel: string
    image?: SanityImage
  }
  problem: { eyebrow: string; title: string; paragraphs: string[]; highlight: string }
  howItWorks: { title: string; eyebrow: string; steps: TitledItem[] }
  stylesSection: {
    title: string
    text: string
    ctaLabel: string
    layout?: 'carousel' | 'grid'
    filter: StylesFilterLabels
    /** Stili scelti e ordinati nel CMS. Vuoto = tutti gli stili, in ordine. */
    styles?: (Style | null)[]
  }
  whatYouGet: { title: string; text: string; items: TitledItem[] }
  examples: {
    eyebrow: string
    title: string
    note: string
    items: { _key?: string; styleTitle?: string; text: string }[]
  }
  pricing: { eyebrow: string; title: string; price: string; text: string; ctaLabel: string }
  faqs: { _key?: string; question: string; answer: string }[]
  closing: { title: string; ctaLabel: string }
}

export type SiteSettings = { bookingUrl?: string; footerText: string }
