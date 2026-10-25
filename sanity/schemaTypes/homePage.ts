import { defineArrayMember, defineField, defineType } from 'sanity'

const str = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: 'string', description })

const txt = (name: string, title: string, rows = 3, description?: string) =>
  defineField({ name, title, type: 'text', rows, description })

const titledItems = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        name: 'item',
        fields: [str('title', 'Titolo'), txt('text', 'Testo', 2)],
        preview: { select: { title: 'title', subtitle: 'text' } },
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
        str('eyebrow', 'Occhiello'),
        txt('title', 'Titolo', 3, 'Vai a capo con Invio: le righe vengono mantenute.'),
        txt('text', 'Testo'),
        str('ctaLabel', 'Testo del pulsante'),
        str('secondaryLabel', 'Link secondario'),
        defineField({
          name: 'image',
          title: 'Foto della stanza',
          description: 'Sfondo dell’hero, a tutta larghezza sotto il testo. Formato orizzontale, almeno 2400 px di base, stanza reale con luce naturale. Usa il punto focale per scegliere cosa resta visibile.',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Testo alternativo', type: 'string' })],
        }),
      ],
    }),
    defineField({
      name: 'problem',
      title: 'Il problema',
      type: 'object',
      group: 'sections',
      fields: [
        str('eyebrow', 'Occhiello'),
        txt('title', 'Titolo', 2),
        defineField({ name: 'paragraphs', title: 'Paragrafi', type: 'array', of: [defineArrayMember({ type: 'text' })] }),
        txt('highlight', 'Frase in evidenza', 2),
      ],
    }),
    defineField({
      name: 'howItWorks',
      title: 'Come funziona',
      type: 'object',
      group: 'sections',
      fields: [str('title', 'Titolo'), str('eyebrow', 'Occhiello'), titledItems('steps', 'Passi')],
    }),
    defineField({
      name: 'stylesSection',
      title: 'Sezione stili',
      description: 'Il contenuto di ogni stile (nome, descrizione, foto) si modifica nella sezione "Stili" del CMS.',
      type: 'object',
      group: 'sections',
      fields: [
        txt('title', 'Titolo', 2),
        txt('text', 'Testo', 2),
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
        str('ctaLabel', 'Testo del pulsante'),
      ],
    }),
    defineField({
      name: 'whatYouGet',
      title: 'Cosa ricevi',
      type: 'object',
      group: 'sections',
      fields: [str('title', 'Titolo'), txt('text', 'Testo', 2), titledItems('items', 'Voci')],
    }),
    defineField({
      name: 'examples',
      title: 'Stesso stile, stanze diverse',
      type: 'object',
      group: 'sections',
      fields: [
        str('eyebrow', 'Occhiello'),
        str('title', 'Titolo'),
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
                txt('text', 'Racconto', 2),
              ],
              preview: { select: { title: 'style.title', subtitle: 'text' } },
            }),
          ],
        }),
        txt('note', 'Nota finale', 2),
      ],
    }),
    defineField({
      name: 'pricing',
      title: 'Prezzo',
      type: 'object',
      group: 'sales',
      fields: [
        str('eyebrow', 'Occhiello'),
        str('title', 'Titolo', 'Per esempio: "Il piano per una stanza"'),
        str('price', 'Prezzo', 'Per esempio: "€ 149"'),
        txt('text', 'Testo', 2),
        str('ctaLabel', 'Testo del pulsante'),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Domande frequenti',
      type: 'array',
      group: 'sales',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          fields: [str('question', 'Domanda'), txt('answer', 'Risposta', 3)],
          preview: { select: { title: 'question', subtitle: 'answer' } },
        }),
      ],
    }),
    defineField({
      name: 'closing',
      title: 'Chiusura',
      type: 'object',
      group: 'sales',
      fields: [txt('title', 'Titolo', 2), str('ctaLabel', 'Testo del pulsante')],
    }),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
})
