import { groq } from 'next-sanity'

export const stylesQuery = groq`*[_type == "style"] | order(order asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  icon,
  highlighted,
  coverImage,
  rooms
}`

export const homePageQuery = groq`*[_type == "homePage"][0] {
  hero,
  problem,
  howItWorks,
  stylesSection {
    title,
    text,
    layout,
    filter,
    "styles": styles[]-> {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      icon,
      highlighted,
      coverImage,
      rooms
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
  faqTitle,
  faqs,
  closing
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  bookingUrl,
  bookingUrlEn,
  footerText,
  navStyles,
  navHowItWorks,
  navFaq,
  navBook,
  metaTitle,
  metaDescription
}`

export const styleSlugsQuery = groq`*[_type == "style" && defined(slug.current)].slug.current`

export const styleBySlugQuery = groq`*[_type == "style" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  icon,
  highlighted,
  coverImage,
  rooms,
  intro,
  gallery,
  traits[] { _key, title, text, colors[] { _key, name, hex } },
  fitFor,
  notFor,
  "alternativeStyle": alternativeStyle-> { title, "slug": slug.current },
  examplePlan { title, text, items[] { _key, title, note, price }, total }
}`

export const stylePageQuery = groq`*[_type == "stylePage"][0] {
  breadcrumb,
  counter,
  bookLabel,
  unsureLabel,
  unsureShortLabel,
  traitsTitle,
  traitsEyebrow,
  fitTitle,
  notForTitle,
  alternativeBefore,
  alternativeAfter,
  planEyebrow,
  planTotalLabel,
  ctaTitle,
  ctaText,
  otherStylesTitle,
  allStylesLabel,
  galleryPlaceholder
}`
