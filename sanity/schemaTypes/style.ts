import { defineArrayMember, defineField, defineType } from 'sanity'
import { ROOMS } from '../../lib/rooms'
import { requiredLocale } from './locale'

export const style = defineType({
  name: 'style',
  title: 'Stile',
  type: 'document',
  groups: [
    { name: 'card', title: 'Card', default: true },
    { name: 'page', title: 'Pagina dello stile' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Nome',
      type: 'localeString',
      group: ['card', 'page'],
      validation: requiredLocale(),
    }),
    defineField({
      name: 'slug',
      title: 'Indirizzo (slug)',
      description:
        'Uguale nelle due lingue. La pagina dello stile sarà su /stili/questo-indirizzo e, in inglese, su /en/styles/questo-indirizzo.',
      type: 'slug',
      group: ['card', 'page'],
      options: { source: 'title.it', maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrizione breve',
      description: 'Una o due frasi, mostrate nella card dello stile.',
      type: 'localeText',
      group: 'card',
      validation: requiredLocale(160),
    }),
    defineField({
      name: 'rooms',
      title: 'Stanze',
      description:
        'Per quali stanze va bene questo stile. Decide in quali tab della home compare. Se non ne scegli nessuna, lo stile compare solo in "Tutti".',
      type: 'array',
      group: 'card',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: ROOMS.map((r) => ({ title: r.title, value: r.value })), layout: 'grid' },
      validation: (r) => r.unique(),
    }),
    defineField({
      name: 'icon',
      title: 'Simbolo',
      description: 'La forma geometrica mostrata nella card.',
      type: 'string',
      group: 'card',
      options: {
        list: [
          { title: 'Angolo + rombo rosso', value: 'odyssey' },
          { title: 'Quadrato', value: 'square' },
          { title: 'Due angoli', value: 'brackets' },
          { title: 'Cerchio', value: 'circle' },
          { title: 'Rettangolo', value: 'rectangle' },
        ],
        layout: 'radio',
      },
      initialValue: 'square',
    }),
    defineField({
      name: 'highlighted',
      title: 'Card scura (in evidenza)',
      type: 'boolean',
      group: 'card',
      initialValue: false,
    }),
    defineField({
      name: 'coverImage',
      title: 'Immagine di copertina',
      description: 'Facoltativa. Se presente, sostituisce il simbolo nella card.',
      type: 'image',
      group: 'card',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Testo alternativo', type: 'localeString' })],
    }),
    defineField({
      name: 'order',
      title: 'Ordine',
      description: 'Numero più basso = mostrato prima.',
      type: 'number',
      group: 'card',
      initialValue: 10,
    }),

    // Pagina dello stile
    defineField({
      name: 'intro',
      title: 'Introduzione',
      description: 'Due o tre frasi sotto il nome, in alto nella pagina. Se è vuota si usa la descrizione breve.',
      type: 'localeText',
      group: 'page',
    }),
    defineField({
      name: 'gallery',
      title: 'Foto',
      description:
        'Da 1 a 9 foto, mostrate in griglia. La prima è la più grande: meglio una stanza intera. Le altre sono dettagli. Con 3, 6 o 9 foto la griglia è piena.',
      type: 'array',
      group: 'page',
      validation: (r) => r.max(9),
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Testo alternativo', type: 'localeString' })],
        }),
      ],
    }),
    defineField({
      name: 'traits',
      title: 'In breve',
      description: 'Da 2 a 4 blocchi per riconoscere lo stile: colori, materiali, pezzi tipici, una regola.',
      type: 'array',
      group: 'page',
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trait',
          fields: [
            defineField({ name: 'title', title: 'Titolo', type: 'localeString' }),
            defineField({ name: 'text', title: 'Testo', type: 'localeText' }),
            defineField({
              name: 'colors',
              title: 'Campioni di colore',
              description: 'Facoltativi. Compaiono come quadratini sopra il testo.',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'swatch',
                  fields: [
                    defineField({ name: 'name', title: 'Nome', type: 'localeString' }),
                    defineField({
                      name: 'hex',
                      title: 'Codice colore',
                      description: 'Nel formato #RRGGBB, per esempio #D8D6D0.',
                      type: 'string',
                      validation: (r) => r.regex(/^#[0-9a-fA-F]{6}$/, { name: 'colore' }),
                    }),
                  ],
                  preview: { select: { title: 'name.it', subtitle: 'hex' } },
                }),
              ],
            }),
          ],
          preview: { select: { title: 'title.it', subtitle: 'text.it' } },
        }),
      ],
    }),
    defineField({
      name: 'fitFor',
      title: 'Fa per te se…',
      description: 'Una frase per riga.',
      type: 'array',
      group: 'page',
      of: [defineArrayMember({ type: 'localeString' })],
    }),
    defineField({
      name: 'notFor',
      title: 'Forse no, se…',
      description: 'Una frase per riga.',
      type: 'array',
      group: 'page',
      of: [defineArrayMember({ type: 'localeString' })],
    }),
    defineField({
      name: 'alternativeStyle',
      title: 'Stile alternativo',
      description: 'Suggerito sotto "Forse no, se…" a chi non si riconosce in questo stile.',
      type: 'reference',
      to: [{ type: 'style' }],
      group: 'page',
    }),
    defineField({
      name: 'examplePlan',
      title: 'Piano di esempio',
      description: 'Facoltativo. Mostra cosa si riceve: qualche oggetto in ordine di acquisto e il budget.',
      type: 'object',
      group: 'page',
      fields: [
        defineField({ name: 'title', title: 'Titolo', type: 'localeString' }),
        defineField({ name: 'text', title: 'Testo', type: 'localeText' }),
        defineField({
          name: 'items',
          title: 'Oggetti, in ordine di acquisto',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'planItem',
              fields: [
                defineField({ name: 'title', title: 'Oggetto', type: 'localeString' }),
                defineField({ name: 'note', title: 'Nota', type: 'localeString' }),
                defineField({
                  name: 'price',
                  title: 'Prezzo',
                  description: 'Uguale nelle due lingue. Testo libero, per esempio "€ 120".',
                  type: 'string',
                }),
              ],
              preview: { select: { title: 'title.it', subtitle: 'price' } },
            }),
          ],
        }),
        defineField({ name: 'total', title: 'Budget totale', description: 'Uguale nelle due lingue.', type: 'string' }),
      ],
    }),
  ],
  orderings: [{ title: 'Ordine', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: {
      title: 'title.it',
      legacyTitle: 'title',
      subtitle: 'shortDescription.it',
      media: 'coverImage',
      rooms: 'rooms',
    },
    prepare: ({ title, legacyTitle, subtitle, media, rooms }) => {
      const names = ((rooms as string[] | undefined) ?? [])
        .map((v) => ROOMS.find((r) => r.value === v)?.title)
        .filter(Boolean)
      // Prima della conversione in bilingue il nome è ancora un testo semplice.
      const name = title || (typeof legacyTitle === 'string' ? legacyTitle : 'Stile senza nome')
      return { title: name, subtitle: names.length ? names.join(', ') : subtitle, media }
    },
  },
})
