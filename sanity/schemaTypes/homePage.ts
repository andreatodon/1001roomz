import { defineArrayMember, defineField, defineType } from 'sanity'
import { ROOMS } from '../../lib/rooms'
import { ls, lt } from './locale'

const titledItems = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        name: 'item',
        fields: [ls('title', 'Titolo'), lt('text', 'Testo')],
        preview: { select: { title: 'title.it', subtitle: 'text.it' } },
      }),
    ],
  })

const steps = defineField({
  name: 'steps',
  title: 'Passi',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'object',
      name: 'step',
      fields: [
        ls('title', 'Titolo'),
        lt('text', 'Testo'),
        ls('tag', 'Etichetta', 'Facoltativa, accanto al numero. Per esempio "Gratis" o il prezzo.'),
      ],
      preview: { select: { title: 'title.it', subtitle: 'tag.it' } },
    }),
  ],
})

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'sections', title: 'Sezioni' },
    { name: 'sales', title: 'Prezzo e FAQ' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        ls('eyebrow', 'Occhiello'),
        lt('title', 'Titolo', 'Vai a capo con Invio: le righe vengono mantenute.'),
        lt('text', 'Testo'),
        ls('ctaLabel', 'Testo del pulsante'),
        ls('secondaryLabel', 'Link secondario'),
        defineField({
          name: 'image',
          title: 'Foto della stanza',
          description:
            'Sfondo dell’hero, a tutta larghezza sotto il testo. Formato orizzontale, almeno 2400 px di base, stanza reale con luce naturale. Usa il punto focale per scegliere cosa resta visibile.',
          type: 'image',
          options: { hotspot: true },
          fields: [ls('alt', 'Testo alternativo')],
        }),
      ],
    }),
    defineField({
      name: 'problem',
      title: 'Il problema',
      type: 'object',
      group: 'sections',
      fields: [
        ls('eyebrow', 'Occhiello'),
        lt('title', 'Titolo'),
        defineField({
          name: 'paragraphs',
          title: 'Paragrafi',
          type: 'array',
          of: [defineArrayMember({ type: 'localeText' })],
        }),
        lt('highlight', 'Frase in evidenza'),
      ],
    }),
    defineField({
      name: 'howItWorks',
      title: 'Come funziona',
      type: 'object',
      group: 'sections',
      fields: [ls('title', 'Titolo'), ls('eyebrow', 'Occhiello'), steps],
    }),
    defineField({
      name: 'stylesSection',
      title: 'Sezione stili',
      description: 'Il contenuto di ogni stile (nome, descrizione, foto) si modifica nella sezione "Stili" del CMS.',
      type: 'object',
      group: 'sections',
      fields: [
        lt('title', 'Titolo'),
        lt('text', 'Testo'),
        defineField({
          name: 'layout',
          title: 'Visualizzazione',
          type: 'string',
          options: {
            list: [
              { title: 'Carosello', value: 'carousel' },
              { title: 'Griglia', value: 'grid' },
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'carousel',
        }),
        defineField({
          name: 'styles',
          title: 'Stili nel carosello',
          description:
            'Scegli quali stili mostrare e trascinali per cambiarne l’ordine. Se lasci vuoto, compaiono tutti gli stili nell’ordine impostato in "Stili".',
          type: 'array',
          of: [defineArrayMember({ type: 'reference', to: [{ type: 'style' }] })],
          validation: (r) => r.unique(),
        }),
        defineField({
          name: 'filter',
          title: 'Filtro per stanza',
          description:
            'I tab sopra gli stili. Un tab compare solo se almeno uno stile ha quella stanza (Stili → nome dello stile → Stanze).',
          type: 'object',
          options: { collapsible: true, collapsed: true },
          fields: [
            ls('allLabel', 'Tab "tutti"', 'Il primo tab, che mostra tutti gli stili.'),
            ...ROOMS.map((r) => ls(r.field, `Tab "${r.title}"`)),
            ls(
              'ariaLabel',
              'Descrizione per lettori di schermo',
              'Non si vede. Esempio: "Filtra gli stili per stanza".',
            ),
            ls('countOne', 'Conteggio, singolare', 'Accanto al numero, per esempio "stile".'),
            ls('countMany', 'Conteggio, plurale', 'Accanto al numero, per esempio "stili".'),
          ],
        }),
      ],
    }),
    defineField({
      name: 'whatYouGet',
      title: 'Cosa ricevi',
      type: 'object',
      group: 'sections',
      fields: [ls('title', 'Titolo'), lt('text', 'Testo'), titledItems('items', 'Voci')],
    }),
    defineField({
      name: 'examples',
      title: 'Stesso stile, stanze diverse',
      type: 'object',
      group: 'sections',
      fields: [
        ls('eyebrow', 'Occhiello'),
        ls('title', 'Titolo'),
        defineField({
          name: 'items',
          title: 'Esempi',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'example',
              fields: [
                defineField({ name: 'style', title: 'Stile', type: 'reference', to: [{ type: 'style' }] }),
                lt('text', 'Racconto'),
              ],
              preview: { select: { title: 'style.title.it', subtitle: 'text.it' } },
            }),
          ],
        }),
        lt('note', 'Nota finale'),
      ],
    }),
    defineField({
      name: 'pricing',
      title: 'Prezzo',
      type: 'object',
      group: 'sales',
      fields: [
        ls('eyebrow', 'Occhiello'),
        ls('title', 'Titolo', 'Per esempio: "Il piano per una stanza"'),
        defineField({
          name: 'price',
          title: 'Prezzo',
          description: 'Uguale nelle due lingue. Per esempio: "€ 149"',
          type: 'string',
        }),
        lt('text', 'Testo'),
        ls('ctaLabel', 'Testo del pulsante'),
      ],
    }),
    { ...ls('faqTitle', 'Titolo delle domande frequenti'), group: 'sales' },
    defineField({
      name: 'faqs',
      title: 'Domande frequenti',
      type: 'array',
      group: 'sales',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          fields: [ls('question', 'Domanda'), lt('answer', 'Risposta')],
          preview: { select: { title: 'question.it', subtitle: 'answer.it' } },
        }),
      ],
    }),
    defineField({
      name: 'closing',
      title: 'Chiusura',
      type: 'object',
      group: 'sales',
      fields: [lt('title', 'Titolo'), ls('ctaLabel', 'Testo del pulsante')],
    }),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
})
