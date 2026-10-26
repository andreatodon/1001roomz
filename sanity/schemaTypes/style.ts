import { defineArrayMember, defineField, defineType } from 'sanity'

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
      type: 'string',
      group: ['card', 'page'],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Indirizzo (slug)',
      description: 'La pagina dello stile sarà su /stili/questo-indirizzo.',
      type: 'slug',
      group: ['card', 'page'],
      options: { source: 'title', maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrizione breve',
      description: 'Una o due frasi, mostrate nella card dello stile.',
      type: 'text',
      rows: 2,
      group: 'card',
      validation: (r) => r.required().max(160),
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
      fields: [defineField({ name: 'alt', title: 'Testo alternativo', type: 'string' })],
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
      type: 'text',
      rows: 3,
      group: 'page',
    }),
    defineField({
      name: 'gallery',
      title: 'Foto',
      description:
        'Fino a 3 foto. La prima è la più grande: meglio una stanza intera, orizzontale. Le altre sono dettagli.',
      type: 'array',
      group: 'page',
      validation: (r) => r.max(3),
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Testo alternativo', type: 'string' })],
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
            defineField({ name: 'title', title: 'Titolo', type: 'string' }),
            defineField({ name: 'text', title: 'Testo', type: 'text', rows: 2 }),
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
                    defineField({ name: 'name', title: 'Nome', type: 'string' }),
                    defineField({
                      name: 'hex',
                      title: 'Codice colore',
                      description: 'Nel formato #RRGGBB, per esempio #D8D6D0.',
                      type: 'string',
                      validation: (r) => r.regex(/^#[0-9a-fA-F]{6}$/, { name: 'colore' }),
                    }),
                  ],
                  preview: { select: { title: 'name', subtitle: 'hex' } },
                }),
              ],
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'text' } },
        }),
      ],
    }),
    defineField({
      name: 'fitFor',
      title: 'Fa per te se…',
      description: 'Una frase per riga.',
      type: 'array',
      group: 'page',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'notFor',
      title: 'Forse no, se…',
      description: 'Una frase per riga.',
      type: 'array',
      group: 'page',
      of: [defineArrayMember({ type: 'string' })],
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
        defineField({ name: 'title', title: 'Titolo', type: 'string' }),
        defineField({ name: 'text', title: 'Testo', type: 'text', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Oggetti, in ordine di acquisto',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'planItem',
              fields: [
                defineField({ name: 'title', title: 'Oggetto', type: 'string' }),
                defineField({ name: 'note', title: 'Nota', type: 'string' }),
                defineField({
                  name: 'price',
                  title: 'Prezzo',
                  description: 'Testo libero, per esempio "€ 120".',
                  type: 'string',
                }),
              ],
              preview: { select: { title: 'title', subtitle: 'price' } },
            }),
          ],
        }),
        defineField({ name: 'total', title: 'Budget totale', type: 'string' }),
      ],
    }),
  ],
  orderings: [{ title: 'Ordine', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'shortDescription', media: 'coverImage' },
  },
})
