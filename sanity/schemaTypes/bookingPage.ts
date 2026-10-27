import { defineArrayMember, defineField, defineType } from 'sanity'
import { ls, lt } from './locale'

/** Testi della pagina di prenotazione e della pagina di conferma. */
export const bookingPage = defineType({
  name: 'bookingPage',
  title: 'Pagina prenotazione',
  type: 'document',
  groups: [
    { name: 'page', title: 'Prenotazione', default: true },
    { name: 'faq', title: 'Domande' },
    { name: 'confirm', title: 'Conferma' },
    { name: 'seo', title: 'Motori di ricerca' },
  ],
  fields: [
    { ...ls('breadcrumb', 'Ultimo pezzo del percorso', 'Per esempio "Prenota".'), group: 'page' },
    { ...ls('eyebrow', 'Occhiello', 'Per esempio "Consulenza gratuita · 30 minuti".'), group: 'page' },
    { ...lt('title', 'Titolo'), group: 'page' },
    { ...lt('intro', 'Testo sotto il titolo'), group: 'page' },
    { ...ls('styleLabel', 'Etichetta dello stile scelto', 'Per esempio "Lo stile che hai scelto".'), group: 'page' },
    { ...ls('changeStyle', 'Link per cambiare stile'), group: 'page' },
    { ...lt('styleNote', 'Nota sotto lo stile', 'Per chi non è sicuro dello stile scelto.'), group: 'page' },
    {
      ...ls('noStyleTitle', 'Senza stile: titolo', 'Si vede quando si prenota senza aver scelto uno stile.'),
      group: 'page',
    },
    { ...lt('noStyleText', 'Senza stile: testo'), group: 'page' },
    { ...ls('browseStyles', 'Senza stile: link agli stili'), group: 'page' },
    {
      ...ls('stepsTitle', 'Titolo dei passi', 'I passi sono quelli di "Come funziona" nella Home page.'),
      group: 'page',
    },
    { ...lt('footNote', 'Nota sotto il calendario', 'Per esempio: non paghi niente adesso.'), group: 'page' },
    {
      ...lt(
        'unavailableText',
        'Avviso senza calendario',
        'Si vede al posto del calendario finché in Impostazioni manca il link di prenotazione.',
      ),
      group: 'page',
    },
    { ...ls('faqTitle', 'Titolo delle domande'), group: 'faq' },
    defineField({
      name: 'faqs',
      title: 'Domande prima di prenotare',
      type: 'array',
      group: 'faq',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          fields: [ls('question', 'Domanda'), lt('answer', 'Risposta')],
          preview: { select: { title: 'question.it', subtitle: 'answer.it' } },
        }),
      ],
    }),
    { ...ls('confirmEyebrow', 'Occhiello', 'Per esempio "Prenotazione confermata".'), group: 'confirm' },
    { ...lt('confirmTitle', 'Titolo'), group: 'confirm' },
    { ...lt('confirmText', 'Testo'), group: 'confirm' },
    { ...ls('confirmStepsTitle', 'Titolo dei passi', 'Per esempio "Cosa succede adesso".'), group: 'confirm' },
    { ...ls('backLabel', 'Pulsante per tornare al sito'), group: 'confirm' },
    { ...ls('otherStylesLabel', 'Link agli stili'), group: 'confirm' },
    { ...ls('metaTitle', 'Titolo per Google'), group: 'seo' },
    { ...lt('metaDescription', 'Descrizione per Google'), group: 'seo' },
  ],
  preview: { prepare: () => ({ title: 'Pagina prenotazione' }) },
})
