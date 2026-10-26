'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ROOMS, isRoomKey, type RoomKey } from '@/lib/rooms'
import type { StylesFilterLabels } from '@/lib/types'
import { StylesCarousel } from './StylesCarousel'

type Item = { id: string; rooms: RoomKey[]; card: ReactNode }

type Props = {
  title: string
  text: string
  items: Item[]
  labels: StylesFilterLabels
  layout: 'carousel' | 'grid'
  cta: ReactNode
}

const PARAM = 'stanza'

/**
 * Sezione stili della home con i tab per stanza. Le card arrivano già pronte
 * dal server; qui si sceglie solo quali mostrare. La stanza scelta resta
 * nell'indirizzo (?stanza=bagno), così il link si può condividere.
 */
export function StylesFilter({ title, text, items, labels, layout, cta }: Props) {
  const [room, setRoom] = useState<RoomKey | null>(null)

  // Solo le stanze con almeno uno stile, nell'ordine fisso.
  const tabs = useMemo(() => ROOMS.filter((r) => items.some((it) => it.rooms.includes(r.value))), [items])

  // All'apertura legge la stanza dall'indirizzo, se c'è ed è valida.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get(PARAM)
    if (isRoomKey(fromUrl) && tabs.some((t) => t.value === fromUrl)) setRoom(fromUrl)
  }, [tabs])

  const choose = (next: RoomKey | null) => {
    setRoom(next)
    const url = new URL(window.location.href)
    if (next) url.searchParams.set(PARAM, next)
    else url.searchParams.delete(PARAM)
    window.history.replaceState(null, '', url)
  }

  const visible = room ? items.filter((it) => it.rooms.includes(room)) : items
  const count = `${visible.length} ${visible.length === 1 ? labels.countOne : labels.countMany}`
  const cards = visible.map((it) => it.card)

  return (
    <>
      <div className="section-head">
        <h2 className="h-section multiline">{title}</h2>
        <p className="eyebrow" aria-live="polite">
          {count}
        </p>
      </div>
      <p className="body muted styles-intro">{text}</p>

      {tabs.length > 0 && (
        <div className="room-tabs" role="group" aria-label={labels.ariaLabel}>
          <button type="button" className="room-tab" aria-pressed={room === null} onClick={() => choose(null)}>
            {labels.allLabel}
          </button>
          {tabs.map((t) => (
            <button
              key={t.value}
              type="button"
              className="room-tab"
              aria-pressed={room === t.value}
              onClick={() => choose(t.value)}
            >
              {labels[t.value] || t.title}
            </button>
          ))}
        </div>
      )}

      {layout === 'carousel' ? (
        <StylesCarousel footer={cta} resetKey={room ?? 'tutti'}>
          {cards}
        </StylesCarousel>
      ) : (
        <>
          <ul className="styles-grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {cards}
          </ul>
          <div className="styles-cta">{cta}</div>
        </>
      )}
    </>
  )
}
