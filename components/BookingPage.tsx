import type { CSSProperties } from 'react'
import type { BookingPageData } from '@/lib/content'
import { calEmbedFrom } from '@/lib/booking'
import { otherLang, paths } from '@/lib/i18n'
import { ROOMS, isRoomKey } from '@/lib/rooms'
import { uiFor } from '@/lib/ui'
import type { HomePage } from '@/lib/types'
import { CalEmbed } from './CalEmbed'
import { SanityPicture, hasImage } from './SanityPicture'
import { StyleShape } from './Shapes'
import { SiteFooter, SiteHeader } from './SiteChrome'

const pad = (n: number) => String(n).padStart(2, '0')

/** I passi di "Come funziona" della home, in verticale. `from` = numero del primo passo da mostrare. */
function Steps({ steps, from = 1 }: { steps: HomePage['howItWorks']['steps']; from?: number }) {
  const shown = steps.slice(from - 1)
  return (
    <ol className="bp-steps">
      {shown.map((step, i) => {
        const n = from + i
        const first = i === 0
        return (
          <li key={step._key || n} className={first ? 'is-current' : undefined}>
            <span className="bp-step-num">
              <span className={first ? 'diamond-fill' : 'diamond'} aria-hidden="true" />
              {pad(n)}
            </span>
            <div className="bp-step-body">
              <div className="bp-step-head">
                <h3>{step.title}</h3>
                {step.tag && <span className="step-tag">{step.tag}</span>}
              </div>
              <p className="small muted">{step.text}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

type Props = BookingPageData & { room?: string }

/** Pagina di prenotazione: stile scelto, come funziona, calendario Cal.com, domande. */
export function BookingPage({ lang, labels, home, style, settings, room }: Props) {
  const ui = uiFor(lang)
  const cal = calEmbedFrom(settings.bookingUrl)
  const roomKey = isRoomKey(room) ? room : undefined
  const roomField = roomKey ? ROOMS.find((r) => r.value === roomKey)?.field : undefined
  const roomLabel = roomField ? home.stylesSection.filter[roomField] : undefined

  return (
    <>
      <SiteHeader
        lang={lang}
        settings={settings}
        alternateHref={paths.booking(otherLang(lang), { style: style?.slug, room: roomKey })}
      />

      <main id="top">
        <section className="sp-head bp-head">
          <div className="container">
            <nav className="sp-crumbs small muted" aria-label={ui.breadcrumbLabel}>
              <a href={paths.section(lang, 'stili')}>{settings.navStyles}</a>
              {style && (
                <>
                  <span aria-hidden="true"> / </span>
                  <a href={paths.style(lang, style.slug)}>{style.title}</a>
                </>
              )}
              <span aria-hidden="true"> / </span>
              <span aria-current="page">{labels.breadcrumb}</span>
            </nav>
            <div className="sp-title bp-title">
              <div className="bracket bracket-tl sp-corner" aria-hidden="true" />
              <p className="eyebrow">{labels.eyebrow}</p>
              <h1 className="multiline">{labels.title}</h1>
              <p className="sp-intro bp-intro">{labels.intro}</p>
            </div>
          </div>
        </section>

        <section className="bp-body">
          {/* Tre blocchi in griglia: su telefono il calendario viene subito dopo lo stile. */}
          <div className="container bp-grid">
            <div className="stack bp-area-style" style={{ gap: 12 }}>
              <p className="eyebrow bp-label">{labels.styleLabel}</p>
              {style ? (
                <div className="bp-style">
                  <div className="bp-style-visual" aria-hidden="true">
                    {hasImage(style.coverImage) ? (
                      <SanityPicture image={style.coverImage} width={160} height={160} sizes="72px" />
                    ) : (
                      <div className="bp-style-shape">
                        <StyleShape icon={style.icon} />
                      </div>
                    )}
                  </div>
                  <div className="bp-style-text">
                    <h2>{style.title}</h2>
                    <p className="small muted">{style.shortDescription}</p>
                  </div>
                  <a href={paths.section(lang, 'stili')} className="link-underline bp-change">
                    {labels.changeStyle}
                  </a>
                </div>
              ) : (
                <div className="bp-style">
                  <div className="bp-style-text">
                    <h2>{labels.noStyleTitle}</h2>
                    <p className="small muted">{labels.noStyleText}</p>
                  </div>
                  <a href={paths.section(lang, 'stili')} className="link-underline bp-change">
                    {labels.browseStyles}
                  </a>
                </div>
              )}
              {style && <p className="small muted">{labels.styleNote}</p>}
            </div>

            <div className="bp-area-steps">
              <h2 className="bp-steps-title">{labels.stepsTitle}</h2>
              <Steps steps={home.howItWorks.steps} />
            </div>

            <div className="stack bp-area-cal" style={{ gap: 16 }}>
              {cal ? (
                <CalEmbed
                  origin={cal.origin}
                  calLink={cal.calLink}
                  prefill={{ stile: style?.title, stanza: roomLabel }}
                  confirmedHref={paths.bookingConfirmed(lang, style?.slug)}
                  loadingLabel={ui.calendarLoading}
                  ariaLabel={ui.calendarLabel}
                />
              ) : (
                <div className="bp-cal bp-cal-missing">
                  <p className="small">{labels.unavailableText}</p>
                </div>
              )}
              <p className="small muted">{labels.footNote}</p>
            </div>
          </div>
        </section>

        {labels.faqs.length > 0 && (
          <section className="section bg-paper-2">
            <div className="container">
              <h2 className="h-section bp-faq-title">{labels.faqTitle}</h2>
              <div className="bp-faq" style={{ '--cols': Math.min(labels.faqs.length, 3) } as CSSProperties}>
                {labels.faqs.map((f, i) => (
                  <div key={f._key || i} className="bp-faq-item">
                    <h3>{f.question}</h3>
                    <p className="small muted">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter settings={settings} />
    </>
  )
}

/** Pagina di conferma, dopo la prenotazione su Cal.com. */
export function BookingConfirmed({ lang, labels, home, style, settings }: BookingPageData) {
  return (
    <>
      <SiteHeader
        lang={lang}
        settings={settings}
        alternateHref={paths.bookingConfirmed(otherLang(lang), style?.slug)}
      />
      <main id="top">
        <section className="section">
          <div className="container split">
            <div className="sp-title bp-title">
              <div className="bracket bracket-tl sp-corner" aria-hidden="true" />
              <p className="eyebrow bp-confirm-eyebrow">
                <span className="diamond-fill" aria-hidden="true" />
                {labels.confirmEyebrow}
              </p>
              <h1 className="multiline">{labels.confirmTitle}</h1>
              <p className="sp-intro bp-intro">{labels.confirmText}</p>
              {style && (
                <p className="small bp-confirm-style">
                  <span className="muted">{labels.styleLabel}: </span>
                  <strong>{style.title}</strong>
                </p>
              )}
            </div>
            <div className="bp-confirm-next">
              <h2 className="bp-steps-title">{labels.confirmStepsTitle}</h2>
              {/* Il primo passo (scegliere lo stile) è fatto: si parte dalla consulenza. */}
              <Steps steps={home.howItWorks.steps} from={Math.min(2, home.howItWorks.steps.length)} />
              <div className="hero-actions">
                <a href={paths.home(lang)} className="btn-outline">
                  {labels.backLabel}
                </a>
                <a href={paths.section(lang, 'stili')} className="link-underline">
                  {labels.otherStylesLabel}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter settings={settings} />
    </>
  )
}
