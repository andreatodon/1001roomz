import { bookingPage } from './bookingPage'
import { homePage } from './homePage'
import { localeString, localeText } from './locale'
import { siteSettings } from './siteSettings'
import { style } from './style'
import { stylePage } from './stylePage'

export const schemaTypes = [localeString, localeText, homePage, siteSettings, style, stylePage, bookingPage]

/** I tipi di documento con contenuti del sito (quelli da convertire in bilingue). */
export const contentTypes = [homePage, siteSettings, style, stylePage, bookingPage]

/** Documenti unici: si modificano, non si creano né si duplicano. */
export const singletonTypes = new Set(['homePage', 'siteSettings', 'stylePage', 'bookingPage'])
