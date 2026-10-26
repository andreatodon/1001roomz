import type { HomePage, SiteSettings, Style, StyleDetail, StylePageLabels } from './types'

/**
 * Testi di partenza della landing.
 * Servono in due casi: finché Sanity non è collegato, e come contenuto
 * iniziale caricato nel CMS con `npm run seed`.
 */

export const fallbackStyles: Style[] = [
  {
    _id: 'style-2001-space-odyssey',
    title: '2001: A Space Odyssey',
    slug: '2001-space-odyssey',
    shortDescription: 'Bianchi, curve, un tocco di rosso. Per chi vive la casa come un set.',
    icon: 'odyssey',
  },
  {
    _id: 'style-minimalismo-razionalista',
    title: 'Minimalismo razionalista',
    slug: 'minimalismo-razionalista',
    shortDescription: 'Poco, ma tutto al suo posto.',
    icon: 'square',
  },
  {
    _id: 'style-taac',
    title: 'Taac! Piccoli spazi, grandi idee',
    slug: 'taac',
    shortDescription: 'Per chi ha un monolocale e nessuna intenzione di rinunciare a niente.',
    icon: 'brackets',
    highlighted: true,
  },
  {
    _id: 'style-vintage',
    title: 'Vintage',
    slug: 'vintage',
    shortDescription: 'Pezzi che hanno già una storia, prima ancora della tua.',
    icon: 'circle',
  },
  {
    _id: 'style-classico-moderno',
    title: 'Classico moderno',
    slug: 'classico-moderno',
    shortDescription: 'Linee pulite, materiali caldi. Non passa mai di moda.',
    icon: 'rectangle',
  },
]

export const fallbackHome: HomePage = {
  hero: {
    eyebrow: 'Una stanza alla volta',
    title: 'Hai già le chiavi.\nOra ti serve una stanza che sembri tua.',
    text: 'Scegli uno stile, prenota una consulenza. Ricevi un piano chiaro: cosa comprare, dove metterlo, come farla tua. Senza forare un muro.',
    ctaLabel: 'Trova il tuo stile',
    secondaryLabel: 'Come funziona',
  },
  problem: {
    eyebrow: 'Il problema',
    title: 'Le scatole sono disfatte, ma la casa sembra ancora di passaggio.',
    paragraphs: ['Hai aperto trenta schede, salvato venti idee, comprato una lampada a caso.'],
    highlight: 'Non ti mancano le idee. Ti manca qualcuno che decida con te.',
  },
  howItWorks: {
    title: 'Come funziona',
    eyebrow: 'Tre passi, non trenta',
    steps: [
      { title: 'Scegli uno stile.', text: 'Pochi, pensati bene. Non mille.' },
      {
        title: 'Parliamo di te.',
        text: 'Una consulenza di 30 minuti per capire cosa hai già, cosa ami, cosa non sopporti.',
      },
      {
        title: 'Ricevi il tuo piano.',
        text: 'Lista di oggetti con link e budget, in ordine di acquisto, più le istruzioni per farla tua. Poi compri tu, ma sai già cosa e perché.',
      },
    ],
  },
  stylesSection: {
    title: 'Una stanza alla volta.\nComincia da uno stile.',
    text: 'Ogni stile è un modo di stare in casa. Alcuni vengono dal cinema, altri dal design.',
    ctaLabel: 'Scegli il tuo stile',
    layout: 'carousel',
  },
  whatYouGet: {
    title: 'Cosa ricevi',
    text: 'Non una lista di link. Un piano che puoi davvero seguire.',
    items: [
      { title: 'Una lista di oggetti veri', text: 'Disponibili in Italia, con prezzo e link.' },
      {
        title: 'Un budget chiaro',
        text: 'Il totale in alto, un’alternativa più economica per gli acquisti più grossi.',
      },
      { title: 'Un ordine di acquisto', text: 'Prima il tappeto e la luce, il resto può aspettare.' },
      {
        title: 'Le istruzioni per farla tua',
        text: 'Come disporre, abbinare, dare carattere. Senza trapano, senza vernice.',
      },
      { title: 'Tutto ti segue', text: 'Quando cambi casa, la stanza viene con te.' },
    ],
  },
  examples: {
    eyebrow: 'La consulenza fa la differenza',
    title: 'Stesso stile, stanze diverse.',
    note: 'Due persone scelgono lo stesso stile. Ricevono due piani diversi, perché la consulenza parte da loro e non dallo stile.',
    items: [
      {
        styleTitle: 'Minimalismo razionalista',
        text: 'Tiene la libreria di famiglia, niente grigio: il piano parte dal legno chiaro che ha già.',
      },
      {
        styleTitle: 'Minimalismo razionalista',
        text: 'Lavora da casa e ha una bici da appendere: il piano parte dallo spazio, non dagli oggetti.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Prezzo',
    title: 'Il piano per una stanza',
    price: '[€ ...]',
    text: 'Consulenza e piano inclusi. Nessun acquisto obbligatorio, nessun abbonamento.',
    ctaLabel: 'Prenota la consulenza',
  },
  faqs: [
    {
      question: 'Devo comprare tutto io?',
      answer: 'Sì. Ti diamo la lista, i link e l’ordine giusto. Scegli tu dove e quando comprare.',
    },
    {
      question: 'Funziona se la stanza è piccola?',
      answer: 'Soprattutto. Lo stile si adatta ai tuoi metri, non il contrario.',
    },
    {
      question: 'Come funziona la consulenza a distanza?',
      answer:
        'Una videochiamata di 30 minuti. Ti chiediamo qualche foto e le misure della stanza, il resto lo raccontiamo insieme.',
    },
    {
      question: 'E se non mi piace il piano?',
      answer: '[Da definire: una revisione inclusa, o rimborso prima della consegna.]',
    },
    {
      question: 'Posso farlo per più stanze?',
      answer: 'Una stanza alla volta. Quando hai finito la prima, cominci la successiva.',
    },
  ],
  closing: {
    title: 'Una stanza che sembri tua comincia da una scelta sola.',
    ctaLabel: 'Trova il tuo stile',
  },
}

export const fallbackSettings: SiteSettings = {
  footerText: '© 2026 1001 Rooms',
}

/** Testi comuni delle pagine stile. */
export const fallbackStylePage: StylePageLabels = {
  breadcrumb: 'Stili',
  counter: 'Stile {n} di {totale}',
  bookLabel: 'Prenota con questo stile',
  unsureLabel: 'Non lo so ancora, decidiamolo insieme',
  unsureShortLabel: 'Non lo so ancora',
  traitsTitle: 'In breve',
  traitsEyebrow: 'Riconoscerlo',
  fitTitle: 'Fa per te se…',
  notForTitle: 'Forse no, se',
  alternativeBefore: 'In quel caso guarda',
  alternativeAfter: ', o prenota e lo scegliamo insieme.',
  planEyebrow: 'Esempio',
  planTotalLabel: 'Budget totale',
  ctaTitle: 'Ti riconosci? Partiamo da qui.',
  ctaText: 'Consulenza di 30 minuti in videochiamata. Il piano arriva entro [... giorni]. Prezzo: [€ ...].',
  otherStylesTitle: 'Altri stili',
  allStylesLabel: 'Vedili tutti',
  galleryPlaceholder: '[Foto dello stile: caricale dal CMS in Stili → nome dello stile → Pagina dello stile → Foto]',
}

/**
 * Contenuti di partenza delle pagine stile, per slug.
 * Bozza da rivedere: c'è solo il Minimalismo razionalista, come esempio.
 * Gli altri stili mostrano solo le sezioni compilate nel CMS.
 */
export const fallbackStyleDetails: Record<string, Partial<StyleDetail>> = {
  'minimalismo-razionalista': {
    intro:
      'Poco, ma tutto al suo posto. Pochi oggetti scelti bene, linee dritte, colori che non urlano. La stanza respira e tu con lei.',
    traits: [
      {
        title: 'Colori',
        text: 'Bianco, grigio calce, legno chiaro. Il nero solo per i dettagli.',
        colors: [
          { name: 'Bianco', hex: '#FFFFFF' },
          { name: 'Grigio calce', hex: '#D8D6D0' },
          { name: 'Rovere chiaro', hex: '#C9AD86' },
          { name: 'Nero', hex: '#1A1A18' },
        ],
      },
      { title: 'Materiali', text: 'Legno naturale, lino, lana grezza, metallo verniciato opaco.' },
      {
        title: 'Pezzi tipici',
        text: 'Contenitori chiusi, una libreria bassa, una lampada da terra, un tappeto unito.',
      },
      { title: 'Regola d’oro', text: 'Ogni cosa ha un posto. Se non ce l’ha, non entra.' },
    ],
    fitFor: [
      'Il disordine ti stanca anche quando non lo vedi.',
      'Preferisci un oggetto buono a tre oggetti carini.',
      'Vuoi una stanza che regga anche fra dieci anni.',
    ],
    notFor: ['Ami le collezioni in vista e gli oggetti ricordo.', 'Ti piace cambiare tutto ogni stagione.'],
    alternativeStyle: { title: 'Vintage', slug: 'vintage' },
    examplePlan: {
      title: 'Un piano in questo stile, per un soggiorno',
      text: 'Il tuo sarà diverso: parte dalla tua stanza e da quello che hai già. Questo serve a capire cosa ricevi.',
      items: [
        { title: 'Tappeto in lana, tinta unita', note: 'Prima di tutto: definisce la zona.', price: '[€ ...]' },
        { title: 'Contenitore basso con ante', note: 'Sparisce tutto quello che oggi sta in giro.', price: '[€ ...]' },
        { title: 'Lampada da terra', note: 'Luce calda nell’angolo, niente buchi nel soffitto.', price: '[€ ...]' },
        {
          title: 'Tende in lino, su bastone a pressione',
          note: 'Senza trapano. Per ultime, se avanza budget.',
          price: '[€ ...]',
        },
      ],
      total: '[€ ...]',
    },
  },
}
