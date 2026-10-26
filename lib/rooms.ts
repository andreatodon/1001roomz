/**
 * Tipi di stanza per filtrare gli stili. Il valore è fisso e finisce nel CMS:
 * non cambiarlo. Il nome mostrato sul sito si modifica in Home page →
 * Sezioni → Sezione stili → Filtro per stanza.
 */
export const ROOMS = [
  { value: 'bagno', title: 'Bagno' },
  { value: 'soggiorno', title: 'Soggiorno' },
  { value: 'camera-da-letto', title: 'Camera da letto' },
  { value: 'cucina', title: 'Cucina' },
] as const

export type RoomKey = (typeof ROOMS)[number]['value']

export const isRoomKey = (value: unknown): value is RoomKey => ROOMS.some((r) => r.value === value)
