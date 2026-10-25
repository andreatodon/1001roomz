import { groq } from 'next-sanity'

export const stylesQuery = groq`*[_type == "style"] | order(order asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  icon,
  highlighted,
  coverImage
}`

export const homePageQuery = groq`*[_type == "homePage"][0] {
  hero,
  problem,
  howItWorks,
  stylesSection {
    title,
    text,
    ctaLabel,
    layout,
    "styles": styles[]-> {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      icon,
      highlighted,
      coverImage
    }
  },
  whatYouGet,
  examples {
    eyebrow,
    title,
    note,
    items[] { _key, text, "styleTitle": style->title }
  },
  pricing,
  faqs,
  closing
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  bookingUrl,
  footerText
}`
