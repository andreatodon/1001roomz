import type { HomePage, SiteSettings, Style } from '@/lib/types'
import { Brackets, StyleShape } from './Shapes'
import { SanityPicture, hasImage } from './SanityPicture'

type Props = { home: HomePage; styles: Style[]; settings: SiteSettings }

export function Landing({ home, styles, settings }: Props) {
  const bookingHref = settings.bookingUrl || '#prezzo'
  const external = Boolean(settings.bookingUrl)
  const bookingProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="nav-logo" aria-label="1001 Rooms, torna all’inizio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="1001 Rooms" width={411} height={46} />
          </a>
          <nav className="nav-links" aria-label="Principale">
            <a href="#stili">Stili</a>
            <a href="#come-funziona">Come funziona</a>
            <a href="#guide" className="muted">
              Guide
            </a>
            <a href={bookingHref} className="btn" {...bookingProps}>
              Prenota
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="section" style={{ paddingTop: 88, paddingBottom: 88 }}>
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{home.hero.eyebrow}</p>
              <h1 className="hero-title multiline">{home.hero.title}</h1>
              <p className="lead muted hero-text">{home.hero.text}</p>
              <div className="hero-actions">
                <a href="#stili" className="btn">
                  <span className="diamond-fill" style={{ background: 'var(--cream)' }} aria-hidden="true" />
                  {home.hero.ctaLabel}
                </a>
                <a href="#come-funziona" className="link-underline">
                  {home.hero.secondaryLabel}
                </a>
              </div>
            </div>

            <div className="hero-frame">
              <div className="bracket bracket-tl" aria-hidden="true" />
              <div className="bracket bracket-br" aria-hidden="true" />
              <div className="hero-photo">
                {hasImage(home.hero.image) ? (
                  <SanityPicture
                    image={home.hero.image}
                    width={960}
                    height={1200}
                    sizes="(max-width: 900px) 90vw, 560px"
                    priority
                    fallbackAlt="Una stanza arredata con luce naturale"
                  />
                ) : (
                  <div className="hero-placeholder">
                    <strong>[Foto hero: stanza reale]</strong>
                    <span>Caricala dal CMS: Home page → Hero → Foto della stanza.</span>
                  </div>
                )}
              </div>
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
            <ol className="steps" style={{ listStyle: 'none', padding: 0, margin: '56px 0 0' }}>
              {home.howItWorks.steps.map((step, i, all) => (
                <li key={step._key || i} className="step">
                  <div className="step-num">
                    <span className={i === all.length - 1 ? 'diamond-fill' : 'diamond'} aria-hidden="true" />
                    <span>{String(i + 1).padStart(2, '0')}</span>
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
        <section className="section bg-cream-2">
          <div className="container">
            <div className="section-head">
              <h2 className="h-section multiline">{home.stylesSection.title}</h2>
              <p className="eyebrow">
                {styles.length} {styles.length === 1 ? 'stile' : 'stili'}
              </p>
            </div>
            <p className="body muted styles-intro">{home.stylesSection.text}</p>

            <ul className="styles-grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {styles.map((s) => (
                <li key={s._id} className={`style-card${s.highlighted ? ' is-dark' : ''}`}>
                  <div className="style-visual">
                    {hasImage(s.coverImage) ? (
                      <div className="style-cover">
                        <SanityPicture
                          image={s.coverImage}
                          width={480}
                          height={360}
                          sizes="(max-width: 560px) 90vw, 240px"
                          fallbackAlt={s.title}
                        />
                      </div>
                    ) : (
                      <StyleShape icon={s.icon} />
                    )}
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.shortDescription}</p>
                </li>
              ))}
            </ul>

            <div className="styles-cta">
              <a href={bookingHref} className="btn-outline" {...bookingProps}>
                {home.stylesSection.ctaLabel}
              </a>
            </div>
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
        <div className="divider" id="guide" />
        <section className="section">
          <div className="container faq">
            <h2>Domande frequenti</h2>
            {home.faqs.map((f, i) => (
              <div key={f._key || i} className="faq-item">
                <h3>{f.question}</h3>
                <p className="small muted">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CHIUSURA */}
        <section className="section bg-cream-2">
          <div className="container closing">
            <h2>{home.closing.title}</h2>
            <a href="#stili" className="btn btn-lg">
              {home.closing.ctaLabel}
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="1001 Rooms" width={411} height={46} />
          <p>{settings.footerText}</p>
        </div>
      </footer>
    </>
  )
}
