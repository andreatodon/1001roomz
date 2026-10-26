# 1001 Rooms

Servizio di consulenza d'arredo. L'utente sceglie uno stile e prenota una consulenza di 30 minuti in videochiamata. Riceve poi un piano per una stanza: lista di oggetti disponibili in Italia, con prezzo e link, budget, ordine di acquisto e istruzioni per farla sua. Niente trapano, niente vernice. Il motto è "una stanza alla volta".

Rispondi e scrivi i testi in **italiano**. Il tono del brand è asciutto e diretto, con frasi brevi, senza enfasi da marketing. I testi del sito li decide il proprietario: non inventare prezzi, numeri o testimonianze. Dove manca un dato metti un segnaposto tra parentesi quadre, come `[€ ...]`.

## Stack

- **Next.js 15**, App Router, TypeScript strict, React 19. Ospitato su **Vercel**: ogni push su `main` pubblica in automatico.
- **Sanity v3**, CMS headless, con lo Studio integrato nel sito su `/studio`.
  - Progetto `p5ngpovr`, dataset `production`, già impostati come default in `sanity/env.ts`. Il Project ID è pubblico e non è un segreto.
  - Il proprietario accede a Sanity con il suo account **Google**. Un accesso con GitHub crea un utente diverso, che non vede il progetto.
  - Le origini CORS si gestiscono in sanity.io/manage → progetto → API.
- Repository: `andreatodon/1001roomz`.

## Struttura

```
app/(site)/                 landing: layout.tsx (font Google), page.tsx (revalidate 60s), globals.css (tutti gli stili)
app/(site)/stili/[slug]/    pagina di ogni stile (generata in anticipo, revalidate 60s)
app/(studio)/studio/        Sanity Studio integrato
components/Landing.tsx      tutte le sezioni della home, server component
components/StyleDetailPage.tsx  la pagina di uno stile; le sezioni vuote nel CMS non compaiono
components/SiteChrome.tsx   intestazione e footer comuni (fuori dalla home i link puntano a "/#…")
components/StylesCarousel.tsx  carosello stili (client component)
components/Shapes.tsx       simboli geometrici delle card stile
components/SanityPicture.tsx immagini dal CMS via next/image + @sanity/image-url
lib/types.ts                tipi dei contenuti
lib/fallback.ts             testi di partenza: il sito li mostra se un campo nel CMS è vuoto
lib/content.ts              lettura dal CMS + unione con i testi di partenza (getContent, getStylePage)
lib/booking.ts              link dei pulsanti "Prenota", con lo stile come parametro `stile`
lib/rooms.ts                tipi di stanza per il filtro degli stili (valori fissi)
components/StylesFilter.tsx sezione stili della home con i tab per stanza (client component)
lib/seedDocs.ts             documenti di partenza (pulsante nello Studio e npm run seed)
sanity/schemaTypes/         schemi: homePage, siteSettings, stylePage (singleton), style
sanity/lib/queries.ts       query GROQ
sanity/actions/             azione "Carica contenuti di partenza" sulla Home page
sanity.config.ts            Studio: struttura, singleton, azioni
```

## Regole di lavoro

- **Ogni testo visibile deve essere modificabile da Sanity.** Per aggiungere un contenuto si toccano sempre, in quest'ordine:
  1. lo schema in `sanity/schemaTypes/`, con etichette e descrizioni in italiano;
  2. la query in `sanity/lib/queries.ts`;
  3. il tipo in `lib/types.ts`;
  4. il testo di partenza in `lib/fallback.ts`;
  5. se serve, `lib/seedDocs.ts`;
  6. infine il componente.
- `lib/content.ts` unisce il CMS ai testi di partenza campo per campo: stringhe vuote e array vuoti non sovrascrivono i default. Le immagini vanno controllate con `hasImage()` prima di passarle a `SanityPicture`.
- `homePage`, `siteSettings` e `stylePage` sono documenti unici, con ID fisso uguale al nome del tipo. Non si creano né si duplicano.
- Gli stili hanno un ordine globale (campo `order`). In più c'è una lista curata e ordinata in `homePage.stylesSection.styles`, con riferimenti agli stili: se è vuota si mostrano tutti.
- Tutti i pulsanti "Prenota" passano da `bookingLink()` e usano `siteSettings.bookingUrl`. Se è vuoto puntano a `#prezzo` (fuori dalla home `/#prezzo`). Dalla pagina stile il link riceve `?stile=<nome>`: su Cal.com precompila la domanda di prenotazione con identificativo `stile`.
- Filtro per stanza: ogni stile ha il campo `rooms` (scelta multipla tra i valori di `lib/rooms.ts`: bagno, soggiorno, camera-da-letto, cucina). I nomi dei tab si modificano in `homePage.stylesSection.filter`. Un tab compare solo se almeno uno stile ha quella stanza; uno stile senza stanze compare solo in "Tutti". La stanza scelta va nell'indirizzo come `?stanza=`. Per aggiungere una stanza: nuova voce in `lib/rooms.ts` (`value` per dati e indirizzo, `field` senza trattini per il campo dell'etichetta), poi etichetta in fallback.
- Pagina stile: i contenuti propri di ogni stile stanno nel documento `style` (gruppo "Pagina dello stile"); titoli di sezione e pulsanti comuni a tutte le pagine stanno in `stylePage`. I testi di partenza per stile sono in `fallbackStyleDetails` (per ora solo il Minimalismo razionalista, come bozza).

## Design

- Colori, definiti come variabili CSS in `globals.css`. Palette neutra:
  - bianco `#FFFFFF` (`--paper`, colore base), grigio chiaro `#F4F4F3` (`--paper-2`, sezioni alterne);
  - inchiostro `#1A1A18` (`--ink`), grigio `#6B6B68` (`--muted`);
  - rosso `#C0392B`, solo come accento: occhielli e rombi.
- Hero: la foto (`homePage.hero.image`) è lo sfondo a tutta larghezza, sotto un velo scuro piatto; il testo è bianco. Senza foto, fondo `--paper-2` e testo scuro.
- Font: **Space Grotesk** per titoli, pulsanti e occhielli; **IBM Plex Sans** per il testo.
- Segni grafici: angoli a squadra (`.bracket`, ripresi dal logo) e rombi (`.diamond`, `.diamond-fill`). Niente gradienti, ombre, emoji o angoli arrotondati: i pulsanti hanno raggio 2px.
- Logo in `public/logo.png` (scuro) e `public/logo-light.png` (chiaro, per fondi scuri).
- Il sito deve funzionare a 390px di larghezza senza scroll orizzontale. Elementi cliccabili di almeno 44px. Pulsanti e link veri, mai `div` cliccabili. Testo alternativo su tutte le immagini.
- Le sezioni a due colonne usano `.split` (0.9fr / 1.1fr). Sotto i 900px diventano una colonna sola.

## Prima di un push

- La build su Vercel esegue il **controllo dei tipi**, che è il punto dove fallisce più spesso. Attenzione soprattutto ai tipi passati al client Sanity: i documenti per `createIfNotExists` sono tipizzati come `StarterDoc`.
- In locale: `npm install`, poi `npm run typecheck`, `npx sanity schema validate` e `npm run build`. La build **non** controlla lo schema di Sanity: un nome di campo non valido passa la build e rompe lo Studio.
- I nomi dei campi Sanity accettano solo lettere, numeri e `_` (niente trattini).
- Messaggi di commit in italiano, brevi, che dicono cosa cambia per il sito.

## Da fare

- Contenuti: prezzo, politica di revisione o rimborso (FAQ "E se non mi piace il piano?"), link Cal.com, foto dell'hero, foto di copertina degli stili.
- Contenuti delle pagine stile: foto, "In breve", "Fa per te se", piano di esempio per ogni stile; rivedere la bozza del Minimalismo razionalista.
- Pagamento con Stripe Checkout, seguito dalla prenotazione su Cal.com.
- Questionario pre-consulenza (misure, foto, budget, cosa c'è già) e generazione con l'IA di una bozza del piano a partire da un catalogo di prodotti nel CMS, da rivedere prima dell'invio.
- Fatturazione elettronica (per esempio Fatture in Cloud) e informativa GDPR per le foto delle case.
