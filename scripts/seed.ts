/**
 * Carica i testi attuali della landing in Sanity, così il CMS parte già pieno.
 * Uso: npm run seed   (richiede `npx sanity login` e il file .env.local compilato)
 *
 * Si può rilanciare: sovrascrive Home page, Impostazioni e i 5 stili di partenza,
 * senza toccare eventuali stili nuovi creati nel CMS.
 */
import { getCliClient } from 'sanity/cli'
import { fallbackHome, fallbackSettings, fallbackStyles } from '../lib/fallback'

const client = getCliClient({ apiVersion: '2025-01-01' })

const key = (i: number) => `k${i}`

async function run() {
  const tx = client.transaction()

  fallbackStyles.forEach((s, i) => {
    tx.createOrReplace({
      _id: s._id,
      _type: 'style',
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      shortDescription: s.shortDescription,
      icon: s.icon,
      highlighted: Boolean(s.highlighted),
      order: (i + 1) * 10,
    })
  })

  const minimal = fallbackStyles.find((s) => s.slug === 'minimalismo-razionalista')!
  const h = fallbackHome

  tx.createOrReplace({
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
  })

  tx.createOrReplace({ _id: 'siteSettings', _type: 'siteSettings', ...fallbackSettings })

  await tx.commit()
  console.log('Contenuti caricati in Sanity: home page, impostazioni e 5 stili.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
