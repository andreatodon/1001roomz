import type { CSSProperties } from 'react'
import type { HomePage, SiteSettings, Style } from '@/lib/types'
import { bookingLink } from '@/lib/booking'
import { paths, type Lang } from '@/lib/i18n'
import { uiFor } from '@/lib/ui'
import { Brackets, StyleShape } from './Shapes'
import { SanityPicture, hasImage } from './SanityPicture'
import { StylesFilter } from './StylesFilter'
import { SiteFooter, SiteHeader } from './SiteChrome'

type Props = { lang: Lang; home: HomePage; styles: Style[]; settings: SiteSettings }

export function Landing({ lang, home, styles, settings }: Props) {
  const ui = uiFor(lang)
  const { href: bookingHref, props: bookingProps } = bookingLink(settings)
  const heroImage = hasImage(home.hero.image) ? home.hero.image : null

  // Sezione stili: carosello o griglia, scelto dal CMS (Home page → Sezioni → Sezione stili).
  const isCarousel = home.stylesSection.layout !== 'grid'
  const cover = isCarousel ? { width: 560, height: 700 } : { width: 480, height: 360 }

  const styleCards = styles.map((s) => ({
    id: s._id,
    rooms: s.rooms ?? [],
    card: (
      <li key={s._id}>
        <a href={paths.style(lang, s.slug)} className={`style-card${s.highlighted ? ' is-dark' : ''}`}>
          <div className="style-visual">
            {hasImage(s.coverImage) ? (
              <div className="style-cover">
                <SanityPicture
                  image={s.coverImage}
                  width={cover.width}
                  height={cover.height}
                  sizes="(max-width: 560px) 80vw, 280px"
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
    ),
  }))

  return (
    <>
      <SiteHeader lang={lang} settings={settings} alternateHref={paths.home(lang === 'it' ? 'en' : 'it')} onHome />

      <main id="top">
        {/* HERO: la foto fa da sfondo al testo */}
        <section className={`hero${heroImage ? ' hero--image' : ''}`}>
          {heroImage && (
            <div className="hero-bg">
              <SanityPicture
                image={heroImage}
                width={2400}
                height={1500}
                sizes="100vw"
                priority
                fallbackAlt={ui.heroAlt}
              />
            </div>
          )}
          <div className="container hero-inner">
            <div className="hero-copy">
              <div className="bracket bracket-tl hero-corner" aria-hidden="true" />
              <p className="eyebrow">{home.hero.eyebrow}</p>
              <h1 className="hero-title multiline">{home.hero.title}</h1>
              <p className="lead hero-text">{home.hero.text}</p>
              <div className="hero-actions">
                <a href="#stili" className="btn">
                  {home.hero.ctaLabel}
                </a>
                <a href="#come-funziona" className="link-underline">
                  {home.hero.secondaryLabel}
                </a>
              </div>
              {!heroImage && <p className="hero-placeholder">{ui.heroPlaceholder}</p>}
            </div>
          </div>
        </section>

        {/* IL PROBLEMA */}
        <div className="divider" />
        <section className="section">
          <div className="container split">
            <div className="stack" style={{ gap: 16 }}>
              <p className="eyebrow">{home.problem.eyebrow}</p>
              <h2 className="h-section">{home.problem.title}</h2>
            </div>
            <div className="stack problem-body">
              {home.problem.paragraphs.map((p, i) => (
                <p key={i} className="lead muted">
                  {p}
                </p>
              ))}
              <p className="lead problem-highlight">{home.problem.highlight}</p>
            </div>
          </div>
        </section>

        {/* COME FUNZIONA */}
        <div className="divider" id="come-funziona" />
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="h-section">{home.howItWorks.title}</h2>
              <p className="eyebrow">{home.howItWorks.eyebrow}</p>
            </div>
            <ol
              className="steps"
              style={
                {
                  listStyle: 'none',
                  padding: 0,
                  margin: '56px 0 0',
                  '--steps': home.howItWorks.steps.length,
                } as CSSProperties
              }
            >
              {home.howItWorks.steps.map((step, i, all) => (
                <li key={step._key || i} className="step">
                  <div className="step-num">
                    <span className={i === all.length - 1 ? 'diamond-fill' : 'diamond'} aria-hidden="true" />
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {step.tag && <span className="step-tag">{step.tag}</span>}
                  </div>
                  <h3>{step.title}</h3>
                  <p className="body muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* STILI */}
        <div className="divider" id="stili" />
        <section className="section bg-paper-2">
          <div className="container">
            <StylesFilter
              title={home.stylesSection.title}
              text={home.stylesSection.text}
              items={styleCards}
              labels={home.stylesSection.filter}
              ui={ui}
              layout={isCarousel ? 'carousel' : 'grid'}
            />
          </div>
        </section>

        {/* COSA RICEVI */}
        <div className="divider" />
        <section className="section">
          <div className="container split">
            <div>
              <h2 className="h-section">{home.whatYouGet.title}</h2>
              <p className="body muted" style={{ marginTop: 16, maxWidth: 380 }}>
                {home.whatYouGet.text}
              </p>
            </div>
            <ul className="stack" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {home.whatYouGet.items.map((item, i, all) => (
                <li key={item._key || i} className="get-item">
                  <span className={i === all.length - 1 ? 'diamond-fill' : 'diamond'} aria-hidden="true" />
                  <div>
                    <h3>{item.title}</h3>
                    <p className="small muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* STESSO STILE, STANZE DIVERSE */}
        <section className="section-tight bg-ink">
          <div className="container">
            <p className="eyebrow">{home.examples.eyebrow}</p>
            <h2 className="examples-title">{home.examples.title}</h2>
            <div className="examples-grid">
              {home.examples.items.map((ex, i) => (
                <div key={ex._key || i} className="example-card">
                  <div className="example-visual">
                    <Brackets size={100} arm={60} />
                  </div>
                  {ex.styleTitle && <p className="eyebrow">{ex.styleTitle}</p>}
                  <p className="small">{ex.text}</p>
                </div>
              ))}
            </div>
            <p className="small examples-note">{home.examples.note}</p>
          </div>
        </section>

        {/* PREZZO */}
        <section className="section" id="prezzo">
          <div className="container pricing">
            <p className="eyebrow">{home.pricing.eyebrow}</p>
            <h2>
              {home.pricing.title}: {home.pricing.price}
            </h2>
            <p className="body muted">{home.pricing.text}</p>
            <a href={bookingHref} className="btn btn-lg" {...bookingProps}>
              {home.pricing.ctaLabel}
            </a>
          </div>
        </section>

        {/* FAQ */}
        <div className="divider" id="faq" />
        <section className="section">
          <div className="container faq">
            <h2>{home.faqTitle}</h2>
            {home.faqs.map((f, i) => (
              <div key={f._key || i} className="faq-item">
                <h3>{f.question}</h3>
                <p className="small muted">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CHIUSURA */}
        <section className="section bg-paper-2">
          <div className="container closing">
            <h2>{home.closing.title}</h2>
            <a href="#stili" className="btn btn-lg">
              {home.closing.ctaLabel}
            </a>
          </div>
        </section>
      </main>

      <SiteFooter settings={settings} />
    </>
  )
}
