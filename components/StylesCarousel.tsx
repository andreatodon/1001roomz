'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import type { UiStrings } from '@/lib/ui'

/**
 * Carosello orizzontale degli stili: scorre con il dito, con il trackpad
 * o con le frecce. Le card arrivano già pronte come `children` (elementi <li>).
 */
export function StylesCarousel({
  children,
  footer,
  resetKey,
  ui,
}: {
  children: ReactNode
  footer?: ReactNode
  /** Quando cambia (per esempio con il filtro per stanza) il carosello torna all'inizio. */
  resetKey?: string
  /** Descrizioni per i lettori di schermo, nella lingua della pagina. */
  ui: Pick<UiStrings, 'stylesList' | 'prevStyles' | 'nextStyles'>
}) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  // Cambiate le card: torna all'inizio e ricalcola le frecce.
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: 0 })
    update()
  }, [resetKey, update])

  const scrollByPage = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('li')
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8
    const perPage = Math.max(1, Math.floor(el.clientWidth / step))
    el.scrollBy({ left: direction * step * perPage, behavior: 'smooth' })
  }

  return (
    <div className="carousel">
      <ul ref={trackRef} className="carousel-track" aria-label={ui.stylesList}>
        {children}
      </ul>
      <div className="carousel-footer">
        <div>{footer}</div>
        <div className="carousel-controls">
          <button
            type="button"
            className="carousel-btn"
            onClick={() => scrollByPage(-1)}
            disabled={atStart}
            aria-label={ui.prevStyles}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12.5 4 6.5 10l6 6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <button
            type="button"
            className="carousel-btn"
            onClick={() => scrollByPage(1)}
            disabled={atEnd}
            aria-label={ui.nextStyles}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m7.5 4 6 6-6 6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
