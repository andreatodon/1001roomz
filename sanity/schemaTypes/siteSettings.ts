import { defineField, defineType } from 'sanity'
import { ls, lt } from './locale'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Impostazioni',
  type: 'document',
  groups: [
    { name: 'general', title: 'Generali', default: true },
    { name: 'nav', title: 'Menu' },
    { name: 'seo', title: 'Motori di ricerca' },
  ],
  fields: [
    defineField({
      name: 'bookingUrl',
      title: 'Link di prenotazione',
      description: 'Dove portano i pulsanti "Prenota" (per esempio il tuo link Cal.com).',
      type: 'url',
      group: 'general',
    }),
    defineField({
      name: 'bookingUrlEn',
      title: 'Link di prenotazione, sito in inglese',
      description: 'Facoltativo: un evento Cal.com in inglese. Se è vuoto, il sito in inglese usa il link qui sopra.',
      type: 'url',
      group: 'general',
    }),
    { ...ls('footerText', 'Testo del footer'), group: 'general' },
    { ...ls('navStyles', 'Voce "Stili"'), group: 'nav' },
    { ...ls('navHowItWorks', 'Voce "Come funziona"'), group: 'nav' },
    { ...ls('navGuides', 'Voce "Guide"'), group: 'nav' },
    { ...ls('navBook', 'Pulsante "Prenota"'), group: 'nav' },
    {
      ...ls('metaTitle', 'Titolo della home', 'Quello che compare nella scheda del browser e su Google.'),
      group: 'seo',
    },
    {
      ...lt('metaDescription', 'Descrizione della home', 'Una o due frasi, mostrate sotto il titolo su Google.'),
      group: 'seo',
    },
  ],
  preview: { prepare: () => ({ title: 'Impostazioni' }) },
})
