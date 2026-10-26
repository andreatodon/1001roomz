import { defineField, defineType, type Rule } from 'sanity'

/**
 * Testi bilingui: ogni campo ha l'italiano e l'inglese affiancati.
 * Se l'inglese è vuoto, il sito in inglese mostra l'italiano.
 */
export const LOCALE_TYPES = new Set(['localeString', 'localeText'])

export const localeString = defineType({
  name: 'localeString',
  title: 'Testo',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({ name: 'it', title: 'Italiano', type: 'string' }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
  ],
  preview: { select: { title: 'it', subtitle: 'en' } },
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Testo lungo',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({ name: 'it', title: 'Italiano', type: 'text', rows: 3 }),
    defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'it', subtitle: 'en' } },
})

type LocaleValue = { it?: string; en?: string } | undefined

/** Validazione: l'italiano è obbligatorio, con una lunghezza massima facoltativa per ogni lingua. */
export const requiredLocale = (max?: number) => (rule: Rule) =>
  rule.custom((value: LocaleValue) => {
    if (!value?.it?.trim()) return 'Il testo in italiano è obbligatorio.'
    if (max && (value.it.length > max || (value.en?.length ?? 0) > max)) return `Massimo ${max} caratteri per lingua.`
    return true
  })

/** Campi bilingui pronti, per scrivere gli schemi in breve. */
export const ls = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: 'localeString', description })

export const lt = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: 'localeText', description })
