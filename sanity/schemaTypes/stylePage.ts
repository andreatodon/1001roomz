import { defineField, defineType } from 'sanity'

const str = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: 'string', description })

/** Testi uguali per tutte le pagine stile: titoli delle sezioni e pulsanti. */
export const stylePage = defineType({
  name: 'stylePage',
  title: 'Pagina stile (testi comuni)',
  type: 'document',
  fields: [
    str('breadcrumb', 'Percorso', 'Il primo pezzo del percorso in alto, per esempio "Stili".'),
    str(
      'counter',
      'Occhiello',
      'Usa {n} per il numero dello stile e {totale} per quanti sono. Esempio: "Stile {n} di {totale}".',
    ),
    str('bookLabel', 'Pulsante principale', 'Porta alla prenotazione, con lo stile già indicato.'),
    str('unsureLabel', 'Link "non lo so"', 'Per chi vuole prenotare senza aver scelto uno stile.'),
    str('unsureShortLabel', 'Link "non lo so", versione breve', 'Usato nella fascia scura in fondo.'),
    str('traitsTitle', 'Titolo "In breve"'),
    str('traitsEyebrow', 'Occhiello "In breve"'),
    str('fitTitle', 'Titolo "Fa per te se"'),
    str('notForTitle', 'Titolo "Forse no, se"'),
    str('alternativeBefore', 'Frase dello stile alternativo, prima del nome', 'Esempio: "In quel caso guarda".'),
    str(
      'alternativeAfter',
      'Frase dello stile alternativo, dopo il nome',
      'Esempio: ", o prenota e lo scegliamo insieme."',
    ),
    str('planEyebrow', 'Occhiello del piano di esempio'),
    str('planTotalLabel', 'Etichetta del budget totale'),
    str('ctaTitle', 'Fascia finale: titolo'),
    defineField({ name: 'ctaText', title: 'Fascia finale: testo', type: 'text', rows: 2 }),
    str('otherStylesTitle', 'Titolo "Altri stili"'),
    str('allStylesLabel', 'Link a tutti gli stili'),
    str('galleryPlaceholder', 'Avviso foto mancanti', 'Si vede solo finché uno stile non ha foto.'),
  ],
  preview: { prepare: () => ({ title: 'Pagina stile (testi comuni)' }) },
})
