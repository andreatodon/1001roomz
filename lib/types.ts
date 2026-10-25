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
}

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
