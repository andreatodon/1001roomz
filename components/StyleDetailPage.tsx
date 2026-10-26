import type { StylePageData } from '@/lib/content'
import { bookingLink } from '@/lib/booking'
import { SanityPicture, hasImage } from './SanityPicture'
import { StyleShape } from './Shapes'
import { SiteFooter, SiteHeader } from './SiteChrome'

const pad = (n: number) => String(n).padStart(2, '0')

/** Pagina di un singolo stile, su /stili/[slug]. Le sezioni vuote nel CMS non compaiono. */
export function StyleDetailPage({ style, styles, labels, settings }: StylePageData) {
  const book = bookingLink(settings, { style: style.title, fallback: '/#prezzo' })
  const unsure = bookingLink(settings, { fallback: '/#prezzo' })

  const index = styles.findIndex((s) => s.slug === style.slug)
  const counter =
    index >= 0 ? labels.counter.replace('{n}', pad(index + 1)).replace('{totale}', String(styles.length)) : ''

  // Altri stili: i tre che vengono dopo questo, ricominciando dall'inizio.
  const others =
    index >= 0
      ? [...styles.slice(index + 1), ...styles.slice(0, index)].slice(0, 3)
      : styles.filter((s) => s.slug !== style.slug).slice(0, 3)

  const gallery = (style.gallery ?? []).filter(hasImage)
  const traits = style.traits ?? []
  const fitFor = style.fitFor ?? []
  const notFor = style.notFor ?? []
  const plan = style.examplePlan && style.examplePlan.items?.length ? style.examplePlan : null

  return (
    <>
      <SiteHeader settings={settings} />

      <main id="top">
        {/* INTESTAZIONE */}
        <section className="sp-head">
          <div className="container">
            <p className="sp-crumbs small muted">
              <a href="/#stili">{labels.breadcrumb}</a>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">{style.title}</span>
            </p>
            <div className="split sp-head-grid">
              <div className="sp-title">
                <div className="bracket bracket-tl sp-corner" aria-hidden="true" />
                {counter && <p className="eyebrow">{counter}</p>}
                <h1>{style.title}</h1>
              </div>
              <div className="stack" style={{ gap: 28 }}>
                <p className="sp-intro">{style.intro || style.shortDescription}</p>
                <div className="hero-actions">
                  <a href={book.href} className="btn" {...book.props}>
                    <span className="diamond-fill sp-btn-diamond" aria-hidden="true" />
                    {labels.bookLabel}
                  </a>
                  <a href={unsure.href} className="link-underline" {...unsure.props}>
                    {labels.unsureLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOTO */}
        <section className="sp-gallery-wrap">
          <div className="container">
            {gallery.length > 0 ? (
              <div className={`sp-gallery sp-gallery-${gallery.length}`}>
                {gallery.map((img, i) => (
                  <div key={img.asset?._ref ?? i} className="sp-photo">
                    <SanityPicture
                      image={img}
                      width={i === 0 ? 1600 : 800}
                      height={i === 0 ? 1000 : 600}
                      sizes={i === 0 ? '(max-width: 900px) 100vw, 760px' : '(max-width: 900px) 100vw, 380px'}
                      priority={i === 0}
                      fallbackAlt={`${style.title}, foto ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="sp-gallery-empty">
                <StyleShape icon={style.icon} />
                <p className="small">{labels.galleryPlaceholder}</p>
              </div>
            )}
          </div>
        </section>

        {/* IN BREVE */}
        {traits.length > 0 && (
          <>
            <div className="divider" />
            <section className="section">
              <div className="container">
                <div className="section-head">
                  <h2 className="h-section">{labels.traitsTitle}</h2>
                  <p className="eyebrow">{labels.traitsEyebrow}</p>
                </div>
                <ul className={`sp-traits sp-traits-${traits.length}`}>
                  {traits.map((t, i) => (
                    <li key={t._key || i} className="sp-trait">
                      <h3>{t.title}</h3>
                      {t.colors && t.colors.length > 0 && (
                        <ul className="sp-swatches" aria-label={`${t.title}: campioni`}>
                          {t.colors.map((c, j) => (
                            <li key={c._key || j} title={c.name} style={{ background: c.hex }}>
                              <span className="sr-only">{c.name || c.hex}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="small muted">{t.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}

        {/* FA PER TE SE */}
        {(fitFor.length > 0 || notFor.length > 0) && (
          <section className="section bg-paper-2">
            <div className="container">
              <h2 className="h-section sp-fit-title">{labels.fitTitle}</h2>
              <div className="sp-fit">
                <ul className="sp-list">
                  {fitFor.map((line, i) => (
                    <li key={i}>
                      <span className="diamond-fill" aria-hidden="true" />
                      {line}
                    </li>
                  ))}
                </ul>
                {notFor.length > 0 && (
                  <div className="sp-notfor">
                    <p className="eyebrow sp-notfor-eyebrow">{labels.notForTitle}</p>
                    <ul className="sp-list muted">
                      {notFor.map((line, i) => (
                        <li key={i}>
                          <span className="diamond sp-diamond-muted" aria-hidden="true" />
                          {line}
                        </li>
                      ))}
                    </ul>
                    {style.alternativeStyle?.slug && (
                      <p className="small sp-alt">
                        {labels.alternativeBefore}{' '}
                        <a href={`/stili/${style.alternativeStyle.slug}`} className="link-underline">
                          {style.alternativeStyle.title}
                        </a>
                        {labels.alternativeAfter}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* PIANO DI ESEMPIO */}
        {plan && (
          <section className="section">
            <div className="container split">
              <div className="stack" style={{ gap: 16 }}>
                <p className="eyebrow">{labels.planEyebrow}</p>
                <h2 className="h-section">{plan.title}</h2>
                {plan.text && (
                  <p className="body muted" style={{ maxWidth: 380 }}>
                    {plan.text}
                  </p>
                )}
              </div>
              <ol className="sp-plan">
                {plan.items.map((item, i) => (
                  <li key={item._key || i}>
                    <span className="sp-plan-num">{pad(i + 1)}</span>
                    <span>
                      <strong>{item.title}</strong>
                      {item.note && <span className="small muted sp-plan-note">{item.note}</span>}
                    </span>
                    <span className="sp-plan-price">{item.price}</span>
                  </li>
                ))}
                {plan.total && (
                  <li className="sp-plan-total">
                    <span className="diamond-fill" aria-hidden="true" />
                    <strong>{labels.planTotalLabel}</strong>
                    <span className="sp-plan-price">{plan.total}</span>
                  </li>
                )}
              </ol>
            </div>
          </section>
        )}

        {/* FASCIA FINALE */}
        <section className="section-tight bg-ink sp-cta">
          <div className="container closing">
            <h2>{labels.ctaTitle}</h2>
            <p className="body sp-cta-text">{labels.ctaText}</p>
            <div className="hero-actions sp-cta-actions">
              <a href={book.href} className="btn btn-lg btn-inv" {...book.props}>
                <span className="diamond-fill" aria-hidden="true" />
                {labels.bookLabel}
              </a>
              <a href={unsure.href} className="link-underline" {...unsure.props}>
                {labels.unsureShortLabel}
              </a>
            </div>
          </div>
        </section>

        {/* ALTRI STILI */}
        {others.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-head">
                <h2 className="h-section">{labels.otherStylesTitle}</h2>
                <a href="/#stili" className="link-underline">
                  {labels.allStylesLabel}
                </a>
              </div>
              <ul className="sp-others">
                {others.map((s) => (
                  <li key={s._id}>
                    <a href={`/stili/${s.slug}`} className={`style-card${s.highlighted ? ' is-dark' : ''}`}>
                      <div className="style-visual">
                        {hasImage(s.coverImage) ? (
                          <div className="style-cover">
                            <SanityPicture
                              image={s.coverImage}
                              width={480}
                              height={360}
                              sizes="(max-width: 900px) 100vw, 360px"
                              fallbackAlt={s.title}
                            />
                          </div>
                        ) : (
                          <StyleShape icon={s.icon} />
                        )}
                      </div>
                      <h3>{s.title}</h3>
                      <p>{s.shortDescription}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>

      <SiteFooter settings={settings} />
    </>
  )
}
