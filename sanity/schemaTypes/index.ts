import { homePage } from './homePage'
import { siteSettings } from './siteSettings'
import { style } from './style'
import { stylePage } from './stylePage'

export const schemaTypes = [homePage, siteSettings, style, stylePage]

/** Documenti unici: si modificano, non si creano né si duplicano. */
export const singletonTypes = new Set(['homePage', 'siteSettings', 'stylePage'])
