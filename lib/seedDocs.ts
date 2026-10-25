import { fallbackHome, fallbackSettings, fallbackStyles } from './fallback'

const key = (i: number) => `k${i}`

/**
 * I documenti di partenza del CMS: Home page, Impostazioni e i 5 stili,
 * con i testi attuali della landing. Usati dal pulsante "Carica contenuti
 * di partenza" nello Studio e dallo script `npm run seed`.
 */
export function starterDocuments() {
  const h = fallbackHome
  const minimal = fallbackStyles.find((s) => s.slug === 'minimalismo-razionalista')!

  const styles = fallbackStyles.map((s, i) => ({
    _id: s._id,
    _type: 'style',
    title: s.title,
    slug: { _type: 'slug', current: s.slug },
    shortDescription: s.shortDescription,
    icon: s.icon,
    highlighted: Boolean(s.highlighted),
    order: (i + 1) * 10,
  }))

  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    hero: h.hero,
    problem: h.problem,
    howItWorks: { ...h.howItWorks, steps: h.howItWorks.steps.map((s, i) => ({ _key: key(i), ...s })) },
    stylesSection: h.stylesSection,
    whatYouGet: { ...h.whatYouGet, items: h.whatYouGet.items.map((s, i) => ({ _key: key(i), ...s })) },
    examples: {
      eyebrow: h.examples.eyebrow,
      title: h.examples.title,
      note: h.examples.note,
      items: h.examples.items.map((e, i) => ({
        _key: key(i),
        style: { _type: 'reference', _ref: minimal._id },
        text: e.text,
      })),
    },
    pricing: h.pricing,
    faqs: h.faqs.map((f, i) => ({ _key: key(i), ...f })),
    closing: h.closing,
  }

  const siteSettings = { _id: 'siteSettings', _type: 'siteSettings', ...fallbackSettings }

  return [...styles, homePage, siteSettings]
}
