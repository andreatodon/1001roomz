import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Impostazioni',
  type: 'document',
  fields: [
    defineField({
      name: 'bookingUrl',
      title: 'Link di prenotazione',
      description: 'Dove portano i pulsanti "Prenota" (per esempio il tuo link Cal.com o Calendly).',
      type: 'url',
    }),
    defineField({
      name: 'footerText',
      title: 'Testo del footer',
      type: 'string',
    }),
  ],
  preview: { prepare: () => ({ title: 'Impostazioni' }) },
})
