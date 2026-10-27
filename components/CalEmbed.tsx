'use client'

import { useEffect, useId, useRef, useState } from 'react'

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean
  ns: Record<string, (...args: unknown[]) => void>
  q?: unknown[]
}

declare global {
  interface Window {
    Cal?: CalApi
  }
}

/** Carica lo script di Cal.com una volta sola (è lo snippet ufficiale di Cal.com, riscritto). */
function ensureCal(origin: string): CalApi {
  const w = window
  if (w.Cal) return w.Cal
  const queue = (api: { q: unknown[] }, args: unknown) => api.q.push(args)
  const cal = function (...args: unknown[]) {
    const self = w.Cal as CalApi & { q: unknown[] }
    if (!self.loaded) {
      self.ns = {}
      self.q = self.q || []
      const script = document.createElement('script')
      script.src = `${origin}/embed/embed.js`
      script.async = true
      document.head.appendChild(script)
      self.loaded = true
    }
    if (args[0] === 'init') {
      const api = function (...inner: unknown[]) {
        queue(api as unknown as { q: unknown[] }, inner)
      } as unknown as ((...a: unknown[]) => void) & { q: unknown[] }
      api.q = api.q || []
      const namespace = args[1]
      if (typeof namespace === 'string') {
        self.ns[namespace] = self.ns[namespace] || api
        queue(self.ns[namespace] as unknown as { q: unknown[] }, args)
        queue(self, ['initNamespace', namespace])
      } else {
        queue(self, args)
      }
      return
    }
    queue(self, args)
  } as CalApi
  w.Cal = cal
  return cal
}

type Props = {
  origin: string
  calLink: string
  /** Risposte già compilate: chiave = identificativo della domanda su Cal.com (stile, stanza). */
  prefill: Record<string, string | undefined>
  /** Dove andare quando la prenotazione è fatta. */
  confirmedHref: string
  /** Testo per i lettori di schermo mentre il calendario si carica. */
  loadingLabel: string
  ariaLabel: string
}

/**
 * Il calendario Cal.com dentro la pagina. Stile e stanza arrivano già compilati;
 * a prenotazione fatta si passa alla nostra pagina di conferma.
 */
export function CalEmbed({ origin, calLink, prefill, confirmedHref, loadingLabel, ariaLabel }: Props) {
  const id = `cal-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const started = useRef(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Una volta sola, anche se React ripete l'effetto (in sviluppo lo fa apposta).
    if (started.current) return
    started.current = true
    const Cal = ensureCal(origin)
    const ns = 'consulenza'
    Cal('init', ns, { origin })
    const api = () => window.Cal?.ns[ns]
    const config = Object.fromEntries(Object.entries({ layout: 'month_view', ...prefill }).filter(([, v]) => v))
    api()?.('inline', { elementOrSelector: `#${id}`, calLink, config })
    api()?.('ui', {
      hideEventTypeDetails: true,
      layout: 'month_view',
      theme: 'light',
      cssVarsPerTheme: { light: { 'cal-brand': '#1a1a18' } },
    })
    api()?.('on', { action: 'linkReady', callback: () => setReady(true) })
    api()?.('on', {
      action: 'bookingSuccessful',
      callback: () => {
        window.location.href = confirmedHref
      },
    })
    // Se l'evento "pronto" non arriva, togliamo comunque il segnaposto dopo qualche secondo.
    window.setTimeout(() => setReady(true), 6000)
  }, [origin, calLink, id, confirmedHref, prefill])

  return (
    <div className="bp-cal" role="region" aria-label={ariaLabel} aria-busy={!ready}>
      {!ready && (
        <div className="bp-cal-loading">
          <span className="sr-only">{loadingLabel}</span>
        </div>
      )}
      <div id={id} className="bp-cal-frame" />
    </div>
  )
}
