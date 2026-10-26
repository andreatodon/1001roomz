/**
 * Tipi di stanza per filtrare gli stili. Il nome mostrato sul sito si
 * modifica in Home page → Sezioni → Sezione stili → Filtro per stanza.
 *
 * - `value`: salvato negli stili e usato nell'indirizzo (?stanza=). Fisso: non cambiarlo.
 * - `field`: nome del campo dell'etichetta nel CMS. Sanity accetta solo lettere,
 *   numeri e trattini bassi, quindi niente trattini.
 */
export const ROOMS = [
  { value: 'bagno', field: 'bagno', title: 'Bagno' },
  { value: 'soggiorno', field: 'soggiorno', title: 'Soggiorno' },
  { value: 'camera-da-letto', field: 'cameraDaLetto', title: 'Camera da letto' },
  { value: 'cucina', field: 'cucina', title: 'Cucina' },
] as const

export type RoomKey = (typeof ROOMS)[number]['value']
export type RoomField = (typeof ROOMS)[number]['field']

export const isRoomKey = (value: unknown): value is RoomKey => ROOMS.some((r) => r.value === value)
