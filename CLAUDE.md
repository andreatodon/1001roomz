# 1001 Rooms

Servizio di consulenza d'arredo, con sito in **italiano e inglese**. L'utente sceglie uno stile e prenota una consulenza di 30 minuti in videochiamata. Riceve poi un piano per una stanza: lista di oggetti disponibili in Italia, con prezzo e link, budget, ordine di acquisto e istruzioni per farla sua. Niente trapano, niente vernice. Il motto è "una stanza alla volta".

Rispondi in **italiano**. I testi del sito sono in italiano (lingua principale) e in inglese, con lo stesso tono: asciutto e diretto, frasi brevi, senza enfasi da marketing. I testi del sito li decide il proprietario: non inventare prezzi, numeri o testimonianze. Dove manca un dato metti un segnaposto tra parentesi quadre, come `[€ ...]`.

## Stack

- **Next.js 15**, App Router, TypeScript strict, React 19. Ospitato su **Vercel**: ogni push su `main` pubblica in automatico.
- **Sanity v3**, CMS headless, con lo Studio integrato nel sito su `/studio`.
  - Progetto `p5ngpovr`, dataset `production`, già impostati come default in `sanity/env.ts`. Il Project ID è pubblico e non è un segreto.
  - Il proprietario accede a Sanity con il suo account **Google**. Un accesso con GitHub crea un utente diverso, che non vede il progetto.
  - Le origini CORS si gestiscono in sanity.io/manage → progetto → API.
- Repository: `andreatodon/1001roomz`.

## Struttura

```
middleware.ts               indirizzi pubblici → pagine interne: / e /stili/x → /it/...; /en/styles/x → /en/stili/x
app/(site)/globals.css      tutti gli stili
app/(site)/[lang]/          layout.tsx (html lang, font), page.tsx (home, revalidate 60s, hreflang)
app/(site)/[lang]/stili/[slug]/  pagina di ogni stile, generata in anticipo per le due lingue
app/(studio)/studio/        Sanity Studio integrato
components/Landing.tsx      tutte le sezioni della home, server component
components/StyleDetailPage.tsx  la pagina di uno stile; le sezioni vuote nel CMS non compaiono
components/SiteChrome.tsx   intestazione e footer comuni (fuori dalla home i link puntano a "/#…")
components/StylesCarousel.tsx  carosello stili (client component)
components/Shapes.tsx       simboli geometrici delle card stile
components/SanityPicture.tsx immagini dal CMS via next/image + @sanity/image-url
lib/types.ts                tipi dei contenuti
lib/fallback/it.ts, en.ts   testi di partenza per lingua, stessa struttura: il sito li mostra se un campo nel CMS è vuoto
lib/i18n.ts                 lingue e percorsi (paths.home, paths.style, paths.section)
lib/localize.ts             sceglie la lingua nei contenuti letti dal CMS
lib/ui.ts                   testi non visibili (aria, alt di riserva) per lingua
lib/content.ts              lettura dal CMS + lingua + unione con i testi di partenza (getContent(lang), getStylePage(slug, lang))
lib/booking.ts              link dei pulsanti "Prenota", con lo stile come parametro `stile`
lib/rooms.ts                tipi di stanza per il filtro degli stili (valori fissi)
components/StylesFilter.tsx sezione stili della home con i tab per stanza (client component)
lib/seedDocs.ts             documenti di partenza (pulsante nello Studio e npm run seed)
sanity/schemaTypes/         schemi: homePage, siteSettings, stylePage (singleton), style; locale.ts (localeString, localeText)
sanity/lib/toBilingual.ts   converte i testi semplici in bilingui seguendo lo schema (seed e conversione)
sanity/lib/studioEnv.ts     riconosce lo Studio delle anteprime (sola lettura)
sanity/lib/queries.ts       query GROQ
sanity/actions/             azioni sulla Home page: "Carica contenuti di partenza", "Converti i testi in italiano e inglese"
sanity.config.ts            Studio: struttura, singleton, azioni
```

## Lingue

- Italiano alla radice (`/`, `/stili/<slug>`), inglese sotto `/en` (`/en`, `/en/styles/<slug>`). Lo slug è uguale nelle due lingue. Le ancore delle sezioni (`#stili`, `#prezzo`…) sono le stesse.
- Nei link non si scrivono percorsi a mano: si usano `paths.home(lang)`, `paths.style(lang, slug)`, `paths.section(lang, ancora)`.
- Nel CMS ogni testo visibile è un campo `localeString` o `localeText` (`{ it, en }`, affiancati). Per gli schemi ci sono gli aiuti `ls()` e `lt()` in `locale.ts`. Restano testi semplici solo i valori uguali nelle due lingue: slug, prezzi, codici colore, valori delle stanze, layout.
- In lettura `localize()` sceglie la lingua: se l'inglese è vuoto mostra l'italiano; un testo semplice (scritto prima del bilingue) resta com'è.
- Ogni testo di partenza esiste in `lib/fallback/it.ts` **e** in `lib/fallback/en.ts`, voce per voce. La bozza inglese è da rivedere con il proprietario.
- Testi non visibili (aria-label, alt di riserva) in `lib/ui.ts`, per lingua.
- `siteSettings.bookingUrlEn` è il link di prenotazione per il sito inglese; se è vuoto si usa `bookingUrl`.
- **Lo Studio delle anteprime è in sola lettura** (niente "Pubblica"): l'anteprima di un branch usa lo stesso dataset del sito vero. Un cambio di schema si prova lì guardando, non scrivendo.

## Regole di lavoro

- **Ogni testo visibile deve essere modificabile da Sanity.** Per aggiungere un contenuto si toccano sempre, in quest'ordine:
  1. lo schema in `sanity/schemaTypes/`, con etichette e descrizioni in italiano;
  2. la query in `sanity/lib/queries.ts`;
  3. il tipo in `lib/types.ts`;
  4. il testo di partenza in `lib/fallback/it.ts` e `lib/fallback/en.ts`;
  5. se serve, `lib/seedDocs.ts`;
  6. infine il componente.
- `lib/content.ts` unisce il CMS ai testi di partenza campo per campo: stringhe vuote e array vuoti non sovrascrivono i default. Le immagini vanno controllate con `hasImage()` prima di passarle a `SanityPicture`.
- `homePage`, `siteSettings` e `stylePage` sono documenti unici, con ID fisso uguale al nome del tipo. Non si creano né si duplicano.
- Gli stili hanno un ordine globale (campo `order`). In più c'è una lista curata e ordinata in `homePage.stylesSection.styles`, con riferimenti agli stili: se è vuota si mostrano tutti.
- Tutti i pulsanti "Prenota" passano da `bookingLink()` e usano `siteSettings.bookingUrl`. Se è vuoto puntano a `#prezzo` (fuori dalla home `/#prezzo`). Dalla pagina stile il link riceve `?stile=<nome>`: su Cal.com precompila la domanda di prenotazione con identificativo `stile`.
- Filtro per stanza: ogni stile ha il campo `rooms` (scelta multipla tra i valori di `lib/rooms.ts`: bagno, soggiorno, camera-da-letto, cucina). I nomi dei tab si modificano in `homePage.stylesSection.filter`. Un tab compare solo se almeno uno stile ha quella stanza; uno stile senza stanze compare solo in "Tutti". La stanza scelta va nell'indirizzo come `?stanza=`. Per aggiungere una stanza: nuova voce in `lib/rooms.ts` (`value` per dati e indirizzo, `field` senza trattini per il campo dell'etichetta), poi etichetta nei due fallback.
- "Come funziona": le colonne seguono il numero di passi nel CMS. Ogni passo può avere un'etichetta (`tag`) accanto al numero, per esempio "Gratis" o il prezzo.
- Pagina stile: i contenuti propri di ogni stile stanno nel documento `style` (gruppo "Pagina dello stile"); titoli di sezione e pulsanti comuni a tutte le pagine stanno in `stylePage`. I testi di partenza per stile sono in `styleDetails` dei due fallback (per ora solo il Minimalismo razionalista, come bozza).

## Design

- Colori, definiti come variabili CSS in `globals.css`. Palette neutra:
  - bianco `#FFFFFF` (`--paper`, colore base), grigio chiaro `#F4F4F3` (`--paper-2`, sezioni alterne);
  - inchiostro `#1A1A18` (`--ink`), grigio `#6B6B68` (`--muted`);
  - rosso `#C0392B`, solo come accento: occhielli e rombi.
- Hero: la foto (`homePage.hero.image`) è lo sfondo a tutta larghezza, sotto un velo scuro piatto; il testo è bianco. Senza foto, fondo `--paper-2` e testo scuro.
- Font: **Space Grotesk** per titoli, pulsanti e occhielli; **IBM Plex Sans** per il testo.
- Segni grafici: angoli a squadra (`.bracket`, ripresi dal logo) e rombi (`.diamond`, `.diamond-fill`). I rombi si usano in elenchi e passi, **mai dentro i pulsanti**. Niente gradienti, ombre, emoji o angoli arrotondati: i pulsanti hanno raggio 2px.
- Logo in `public/logo.png` (scuro) e `public/logo-light.png` (chiaro, per fondi scuri).
- Il sito deve funzionare a 390px di larghezza senza scroll orizzontale. Elementi cliccabili di almeno 44px. Pulsanti e link veri, mai `div` cliccabili. Testo alternativo su tutte le immagini.
- Le sezioni a due colonne usano `.split` (0.9fr / 1.1fr). Sotto i 900px diventano una colonna sola.

## Prima di un push

- La build su Vercel esegue il **controllo dei tipi**, che è il punto dove fallisce più spesso. Attenzione soprattutto ai tipi passati al client Sanity: i documenti per `createIfNotExists` sono tipizzati come `StarterDoc`.
- In locale: `npm install`, poi `npm run typecheck`, `npx sanity schema validate` e `npm run build`. La build **non** controlla lo schema di Sanity: un nome di campo non valido passa la build e rompe lo Studio.
- I nomi dei campi Sanity accettano solo lettere, numeri e `_` (niente trattini).
- Un cambio che altera la forma dei dati nel CMS (per esempio un testo semplice che diventa bilingue) va accompagnato da una conversione dei documenti esistenti, e il sito deve leggere sia il vecchio formato sia il nuovo finché la conversione non è fatta.
- Messaggi di commit in italiano, brevi, che dicono cosa cambia per il sito.

## Da fare

- Dopo l'unione del sito bilingue: premere "Converti i testi in italiano e inglese" sulla Home page nello Studio; rivedere le bozze inglesi.
- Contenuti: prezzo, politica di revisione o rimborso (FAQ "E se non mi piace il piano?"), link Cal.com, foto dell'hero, foto di copertina degli stili.
- Contenuti delle pagine stile: foto, "In breve", "Fa per te se", piano di esempio per ogni stile; rivedere la bozza del Minimalismo razionalista.
- Pagamento con Stripe Checkout, seguito dalla prenotazione su Cal.com.
- Questionario pre-consulenza (misure, foto, budget, cosa c'è già) e generazione con l'IA di una bozza del piano a partire da un catalogo di prodotti nel CMS, da rivedere prima dell'invio.
- Fatturazione elettronica (per esempio Fatture in Cloud) e informativa GDPR per le foto delle case.
