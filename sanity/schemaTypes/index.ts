import { homePage } from './homePage'
import { siteSettings } from './siteSettings'
import { style } from './style'

export const schemaTypes = [homePage, siteSettings, style]

/** Documenti unici: si modificano, non si creano né si duplicano. */
export const singletonTypes = new Set(['homePage', 'siteSettings'])
