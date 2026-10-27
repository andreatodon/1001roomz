import type { BookingPageLabels, HomePage, SiteSettings, Style, StyleDetail, StylePageLabels } from '../types'
import type { StarterContent } from './index'

/**
 * Testi di partenza in inglese: bozza da rivedere.
 * Stessa struttura di it.ts, voce per voce: ID, slug, simboli e prezzi
 * restano quelli italiani, cambiano solo i testi.
 */

const fallbackStyles: Style[] = [
  {
    _id: 'style-2001-space-odyssey',
    title: '2001: A Space Odyssey',
    slug: '2001-space-odyssey',
    shortDescription: 'White, curves, a touch of red. For people who live at home as if on a film set.',
    icon: 'odyssey',
  },
  {
    _id: 'style-minimalismo-razionalista',
    title: 'Rational minimalism',
    slug: 'minimalismo-razionalista',
    shortDescription: 'Not much, but everything in its place.',
    icon: 'square',
  },
  {
    _id: 'style-taac',
    title: 'Taac! Small spaces, big ideas',
    slug: 'taac',
    shortDescription: 'For people with a studio flat and no intention of giving anything up.',
    icon: 'brackets',
    highlighted: true,
  },
  {
    _id: 'style-vintage',
    title: 'Vintage',
    slug: 'vintage',
    shortDescription: 'Pieces that already have a story, before yours begins.',
    icon: 'circle',
  },
  {
    _id: 'style-classico-moderno',
    title: 'Modern classic',
    slug: 'classico-moderno',
    shortDescription: 'Clean lines, warm materials. It never goes out of style.',
    icon: 'rectangle',
  },
]

const fallbackHome: HomePage = {
  hero: {
    eyebrow: 'One room at a time',
    title: 'You have the keys.\nNow you need a room that feels like yours.',
    text: 'Pick a style, book a consultation. Get a clear plan: what to buy, where to put it, how to make it yours. Without drilling a single hole.',
    ctaLabel: 'Find your style',
    secondaryLabel: 'How it works',
  },
  problem: {
    eyebrow: 'The problem',
    title: 'The boxes are unpacked, but the place still feels temporary.',
    paragraphs: ['You opened thirty tabs, saved twenty ideas, bought a lamp on a whim.'],
    highlight: 'You don’t lack ideas. You lack someone to decide with.',
  },
  howItWorks: {
    title: 'How it works',
    eyebrow: 'Four steps, not thirty',
    steps: [
      { title: 'Pick a style.', text: 'A few, well thought out. Not a thousand.' },
      {
        title: 'We talk about you.',
        text: 'A 30-minute consultation to understand what you already have, what you love, what you can’t stand.',
        tag: 'Free',
      },
      {
        title: 'Confirm and pay.',
        text: 'If you want the plan, we send you the bank transfer details. If it doesn’t convince you, that’s it.',
        tag: '[€ ...]',
      },
      {
        title: 'Get your plan.',
        text: 'You send us measurements and photos. You get a list of items with links and budget, in buying order, plus instructions to make it yours. You do the shopping, but you already know what and why.',
      },
    ],
  },
  stylesSection: {
    title: 'One room at a time.\nStart with a style.',
    text: 'Each style is a way of living at home. Some come from cinema, others from design.',
    layout: 'carousel',
    filter: {
      allLabel: 'All',
      bagno: 'Bathroom',
      soggiorno: 'Living room',
      cameraDaLetto: 'Bedroom',
      cucina: 'Kitchen',
      ariaLabel: 'Filter styles by room',
      countOne: 'style',
      countMany: 'styles',
    },
  },
  whatYouGet: {
    title: 'What you get',
    text: 'Not a list of links. A plan you can actually follow.',
    items: [
      { title: 'A list of real items', text: 'Available in Italy, with price and link.' },
      {
        title: 'A clear budget',
        text: 'The total up front, and a cheaper alternative for the bigger purchases.',
      },
      { title: 'A buying order', text: 'Rug and lighting first, the rest can wait.' },
      {
        title: 'Instructions to make it yours',
        text: 'How to arrange, match, add character. No drill, no paint.',
      },
      { title: 'It all moves with you', text: 'When you move house, the room comes with you.' },
    ],
  },
  examples: {
    eyebrow: 'The consultation makes the difference',
    title: 'Same style, different rooms.',
    note: 'Two people choose the same style. They get two different plans, because the consultation starts from them, not from the style.',
    items: [
      {
        styleTitle: 'Rational minimalism',
        text: 'Keeps the family bookcase, no grey: the plan starts from the light wood they already have.',
      },
      {
        styleTitle: 'Rational minimalism',
        text: 'Works from home and has a bike to hang: the plan starts from the space, not the objects.',
      },
    ],
  },
  pricing: {
    eyebrow: 'Price',
    title: 'The plan for one room',
    price: '[€ ...]',
    text: 'Consultation and plan included. No purchase required, no subscription.',
    ctaLabel: 'Book the consultation',
  },
  faqTitle: 'Questions',
  faqs: [
    {
      question: 'Do I have to buy everything myself?',
      answer: 'Yes. We give you the list, the links and the right order. You choose where and when to buy.',
    },
    {
      question: 'Does it work if the room is small?',
      answer: 'Especially then. The style adapts to your square metres, not the other way round.',
    },
    {
      question: 'How does a remote consultation work?',
      answer:
        'A 30-minute video call. We ask for a few photos and the room’s measurements; we go through the rest together.',
    },
    {
      question: 'What if I don’t like the plan?',
      answer: '[To be decided: one revision included, or a refund before delivery.]',
    },
    {
      question: 'Can I do more than one room?',
      answer: 'One room at a time. When you finish the first, you start the next.',
    },
  ],
  closing: {
    title: 'A room that feels like yours starts with a single choice.',
    ctaLabel: 'Find your style',
  },
}

const fallbackSettings: SiteSettings = {
  footerText: '© 2026 1001 Rooms',
  navStyles: 'Styles',
  navHowItWorks: 'How it works',
  navFaq: 'FAQ',
  navBook: 'Book',
  metaTitle: '1001 Rooms · One room at a time',
  metaDescription:
    'Pick a style, book a consultation. Get a clear plan: what to buy, where to put it, how to make it yours.',
}

const fallbackStylePage: StylePageLabels = {
  breadcrumb: 'Styles',
  counter: 'Style {n} of {totale}',
  bookLabel: 'Book with this style',
  unsureLabel: 'Not sure yet? Let’s decide together',
  unsureShortLabel: 'Not sure yet',
  traitsTitle: 'At a glance',
  traitsEyebrow: 'How to spot it',
  fitTitle: 'It’s for you if…',
  notForTitle: 'Maybe not, if',
  alternativeBefore: 'In that case have a look at',
  alternativeAfter: ', or book and we’ll choose together.',
  planEyebrow: 'Example',
  planTotalLabel: 'Total budget',
  ctaTitle: 'Sound like you? Let’s start here.',
  ctaText: 'A 30-minute video consultation. The plan arrives within [... days]. Price: [€ ...].',
  otherStylesTitle: 'Other styles',
  allStylesLabel: 'See them all',
  galleryPlaceholder: '[Style photos: upload them in the CMS under Stili → style name → Pagina dello stile → Foto]',
}

const fallbackStyleDetails: Record<string, Partial<StyleDetail>> = {
  'minimalismo-razionalista': {
    intro:
      'Not much, but everything in its place. A few well-chosen objects, straight lines, colours that don’t shout. The room breathes, and so do you.',
    traits: [
      {
        title: 'Colours',
        text: 'White, lime grey, light wood. Black only for the details.',
        colors: [
          { name: 'White', hex: '#FFFFFF' },
          { name: 'Lime grey', hex: '#D8D6D0' },
          { name: 'Light oak', hex: '#C9AD86' },
          { name: 'Black', hex: '#1A1A18' },
        ],
      },
      { title: 'Materials', text: 'Natural wood, linen, raw wool, matt painted metal.' },
      {
        title: 'Typical pieces',
        text: 'Closed storage, a low bookcase, a floor lamp, a plain rug.',
      },
      { title: 'Golden rule', text: 'Everything has a place. If it doesn’t, it doesn’t come in.' },
    ],
    fitFor: [
      'Clutter wears you out even when you can’t see it.',
      'You’d rather have one good object than three nice ones.',
      'You want a room that still works ten years from now.',
    ],
    notFor: ['You love collections on display and keepsakes.', 'You like changing everything every season.'],
    alternativeStyle: { title: 'Vintage', slug: 'vintage' },
    examplePlan: {
      title: 'A plan in this style, for a living room',
      text: 'Yours will be different: it starts from your room and what you already have. This shows what you get.',
      items: [
        { title: 'Plain wool rug', note: 'First of all: it defines the area.', price: '[€ ...]' },
        { title: 'Low cabinet with doors', note: 'Everything lying around today disappears.', price: '[€ ...]' },
        { title: 'Floor lamp', note: 'Warm light in the corner, no holes in the ceiling.', price: '[€ ...]' },
        {
          title: 'Linen curtains on a tension rod',
          note: 'No drilling. Last, if there’s budget left.',
          price: '[€ ...]',
        },
      ],
      total: '[€ ...]',
    },
  },
}

const fallbackBookingPage: BookingPageLabels = {
  breadcrumb: 'Book',
  eyebrow: 'Free consultation · 30 minutes',
  title: 'Book the consultation.',
  intro:
    'A video call to get to know you and your room. You pay nothing. Afterwards, you decide whether you want the plan.',
  styleLabel: 'The style you chose',
  changeStyle: 'Change',
  styleNote: 'Not sure? Leave it: we can change it during the consultation.',
  noStyleTitle: 'We’ll choose it together',
  noStyleText: 'You don’t need a style yet. We’ll talk it through in the consultation, starting from your room.',
  browseStyles: 'Browse the styles',
  stepsTitle: 'How it works',
  footNote: 'You pay nothing now. After the consultation there’s no obligation to continue.',
  unavailableText: '[Calendar not connected yet: add the Cal.com link in Impostazioni → Link di prenotazione]',
  faqTitle: 'Before you book',
  faqs: [
    {
      question: 'When do I pay?',
      answer: 'Only if, after the consultation, you want the plan. We email you the amount and bank transfer details.',
    },
    {
      question: 'Can I reschedule or cancel?',
      answer: 'Yes, from the link in the confirmation email. We just ask you to do it before the call.',
    },
    {
      question: 'What do I need for the call?',
      answer: 'A phone or a computer. If you can, join from the room: you can show it to us as we talk.',
    },
  ],
  confirmEyebrow: 'Booking confirmed',
  confirmTitle: 'See you soon.',
  confirmText: 'We’ve emailed you the date, time and video call link. You can reschedule or cancel from there too.',
  confirmStepsTitle: 'What happens now',
  backLabel: 'Back to the site',
  otherStylesLabel: 'See the other styles',
  metaTitle: 'Book the consultation · 1001 Rooms',
  metaDescription:
    'A free 30-minute video consultation. Afterwards, you decide whether you want the plan for your room.',
}

export const en: StarterContent = {
  styles: fallbackStyles,
  home: fallbackHome,
  settings: fallbackSettings,
  stylePage: fallbackStylePage,
  bookingPage: fallbackBookingPage,
  styleDetails: fallbackStyleDetails,
}
