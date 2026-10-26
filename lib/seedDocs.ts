import { makeConverter } from '../sanity/lib/toBilingual'
import { contentTypes, schemaTypes } from '../sanity/schemaTypes'
import { fallbacks } from './fallback'
import type { Lang } from './i18n'

const key = (i: number) => `k${i}`

/** Forma comune a tutti i documenti di partenza, accettata dal client Sanity. */
export type StarterDoc = { _id: string; _type: string; [field: string]: unknown }

/**
 * I documenti di partenza in una sola lingua, con testi semplici al posto
 * dei campi bilingui. Servono a costruire quelli bilingui qui sotto e a
 * recuperare l'inglese durante la conversione dei documenti già nel CMS.
 */
export function plainStarterDocuments(lang: Lang): StarterDoc[] {
  const { home: h, styles: fallbackStyles, settings, stylePage: labels, styleDetails } = fallbacks[lang]
  const minimal = fallbackStyles.find((s) => s.slug === 'minimalismo-razionalista')!

  const styles = fallbackStyles.map((s, i) => {
    const d = styleDetails[s.slug]
    const alternative = d?.alternativeStyle && fallbackStyles.find((x) => x.slug === d.alternativeStyle?.slug)
    return {
      _id: s._id,
      _type: 'style',
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      shortDescription: s.shortDescription,
      icon: s.icon,
      highlighted: Boolean(s.highlighted),
      order: (i + 1) * 10,
      ...(d && {
        intro: d.intro,
        traits: d.traits?.map((t, j) => ({
          _key: key(j),
          _type: 'trait',
          title: t.title,
          text: t.text,
          colors: t.colors?.map((c, k) => ({ _key: key(k), _type: 'swatch', name: c.name, hex: c.hex })),
        })),
        fitFor: d.fitFor,
        notFor: d.notFor,
        alternativeStyle: alternative ? { _type: 'reference', _ref: alternative._id } : undefined,
        examplePlan: d.examplePlan && {
          ...d.examplePlan,
          items: d.examplePlan.items.map((it, j) => ({ _key: key(j), _type: 'planItem', ...it })),
        },
      }),
    }
  })

  const homePage = {
    _id: 'homePage',
    _type: 'homePage',
    hero: h.hero,
    problem: h.problem,
    howItWorks: { ...h.howItWorks, steps: h.howItWorks.steps.map((s, i) => ({ _key: key(i), _type: 'item', ...s })) },
    stylesSection: {
      ...h.stylesSection,
      styles: fallbackStyles.map((s, i) => ({ _key: key(i), _type: 'reference', _ref: s._id })),
    },
    whatYouGet: { ...h.whatYouGet, items: h.whatYouGet.items.map((s, i) => ({ _key: key(i), _type: 'item', ...s })) },
    examples: {
      eyebrow: h.examples.eyebrow,
      title: h.examples.title,
      note: h.examples.note,
      items: h.examples.items.map((e, i) => ({
        _key: key(i),
        _type: 'example',
        style: { _type: 'reference', _ref: minimal._id },
        text: e.text,
      })),
    },
    pricing: h.pricing,
    faqTitle: h.faqTitle,
    faqs: h.faqs.map((f, i) => ({ _key: key(i), _type: 'faq', ...f })),
    closing: h.closing,
  }

  const siteSettings = { _id: 'siteSettings', _type: 'siteSettings', ...settings }

  const stylePage = { _id: 'stylePage', _type: 'stylePage', ...labels }

  return [...styles, homePage, siteSettings, stylePage]
}

export const convertToBilingual = makeConverter(schemaTypes)

/** Lo schema di un tipo di documento, per la conversione. */
export const docTypeFor = (type: string) => contentTypes.find((t) => t.name === type)

/**
 * I documenti di partenza del CMS, in italiano e inglese: Home page,
 * Impostazioni, testi comuni delle pagine stile e i 5 stili. Usati dal
 * pulsante "Carica contenuti di partenza" nello Studio e da `npm run seed`.
 */
export function starterDocuments(): StarterDoc[] {
  const english = new Map(plainStarterDocuments('en').map((d) => [d._id, d]))
  return plainStarterDocuments('it').map((doc) => {
    const type = docTypeFor(doc._type)
    if (!type) return doc
    return convertToBilingual(type, doc, doc, english.get(doc._id)).value
  })
}
