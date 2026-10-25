import { defineField, defineType } from 'sanity'

export const style = defineType({
  name: 'style',
  title: 'Stile',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nome',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Indirizzo (slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrizione breve',
      description: 'Una o due frasi, mostrate nella card dello stile.',
      type: 'text',
      rows: 2,
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: 'icon',
      title: 'Simbolo',
      description: 'La forma geometrica mostrata nella card.',
      type: 'string',
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
      initialValue: false,
    }),
    defineField({
      name: 'coverImage',
      title: 'Immagine di copertina',
      description: 'Facoltativa. Se presente, sostituisce il simbolo nella card.',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Testo alternativo', type: 'string' })],
    }),
    defineField({
      name: 'order',
      title: 'Ordine',
      description: 'Numero più basso = mostrato prima.',
      type: 'number',
      initialValue: 10,
    }),
  ],
  orderings: [{ title: 'Ordine', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'shortDescription', media: 'coverImage' },
  },
})
