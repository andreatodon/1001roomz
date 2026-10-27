import type { Lang } from './i18n'

/**
 * Testi che non si vedono: descrizioni per i lettori di schermo e testi
 * alternativi di riserva. Quelli visibili stanno tutti nel CMS.
 */
const ui = {
  it: {
    navLabel: 'Principale',
    logoLabel: '1001 Rooms, torna all’inizio',
    switchLabel: 'Leggi in italiano',
    stylesList: 'Stili',
    prevStyles: 'Stili precedenti',
    nextStyles: 'Stili successivi',
    breadcrumbLabel: 'Percorso',
    swatches: 'campioni di colore',
    photo: 'foto',
    heroAlt: 'Una stanza arredata con luce naturale',
    heroPlaceholder: '[Foto hero: caricala dal CMS in Home page → Hero → Foto della stanza]',
    calendarLabel: 'Calendario delle prenotazioni',
    calendarLoading: 'Carico il calendario',
  },
  en: {
    navLabel: 'Main',
    logoLabel: '1001 Rooms, back to the top',
    switchLabel: 'Read in English',
    stylesList: 'Styles',
    prevStyles: 'Previous styles',
    nextStyles: 'Next styles',
    breadcrumbLabel: 'Breadcrumb',
    swatches: 'colour swatches',
    photo: 'photo',
    heroAlt: 'A furnished room in natural light',
    heroPlaceholder: '[Hero photo: upload it in the CMS under Home page → Hero → Foto della stanza]',
    calendarLabel: 'Booking calendar',
    calendarLoading: 'Loading the calendar',
  },
} satisfies Record<Lang, Record<string, string>>

export type UiStrings = (typeof ui)['it']
export const uiFor = (lang: Lang): UiStrings => ui[lang]
