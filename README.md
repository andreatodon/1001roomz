# 1001 Rooms

Il sito di 1001 Rooms: landing page in **Next.js** con i contenuti gestiti in **Sanity** (CMS headless).

- Il sito è su `/`, il CMS su `/studio`.
- Tutti i testi della landing, gli stili, le FAQ, il prezzo e la foto dell'hero si modificano dal CMS.
- Finché Sanity non è collegato, il sito mostra i testi di partenza (in `lib/fallback.ts`), quindi si può già pubblicare.

## Cosa si modifica dal CMS

| Sezione del CMS | Cosa contiene |
| --- | --- |
| **Home page → Hero** | Occhiello, titolo, testo, pulsanti, **foto della stanza** |
| **Home page → Sezioni** | Il problema, Come funziona (i passi), testi della sezione stili, Cosa ricevi, Stesso stile/stanze diverse |
| **Home page → Prezzo e FAQ** | Prezzo, domande frequenti, chiusura |
| **Stili** | Uno per stile: nome, descrizione, simbolo o foto di copertina, card scura, ordine. Aggiungerne uno lo mostra subito sul sito. |
| **Impostazioni** | Link di prenotazione (Cal.com/Calendly) usato da tutti i pulsanti "Prenota", testo del footer |

Le modifiche pubblicate compaiono sul sito entro circa un minuto.

## Messa online (prima volta)

### 1. Crea il progetto Sanity
1. Vai su [sanity.io](https://www.sanity.io) e crea un account (il piano gratuito basta).
2. Crea un nuovo progetto, con dataset `production`.
3. Annota il **Project ID** (in sanity.io/manage → il tuo progetto).
4. Nelle impostazioni del progetto, sezione **API → CORS origins**, aggiungi:
   - `http://localhost:3000` (per lavorare in locale)
   - l'indirizzo del sito su Vercel, per esempio `https://1001roomz.vercel.app`, con **Allow credentials** attivo.

### 2. Pubblica su Vercel
1. Su [vercel.com](https://vercel.com) importa il repository GitHub `1001roomz`.
2. In **Environment Variables** aggiungi:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = il Project ID
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
3. Deploy.

### 3. Carica i contenuti di partenza nel CMS
Dal tuo computer, nella cartella del progetto:

```bash
npm install
cp .env.example .env.local   # poi inserisci il Project ID
npx sanity login
npm run seed
```

Lo script carica nel CMS i testi attuali della landing e i 5 stili, così parti già con tutto compilato.

### 4. Usa il CMS
Apri `https://<il-tuo-sito>/studio`, accedi con l'account Sanity e modifica. Per invitare altre persone a gestire i contenuti: sanity.io/manage → Members.

## Lavorare in locale

```bash
npm install
npm run dev
```

Sito su http://localhost:3000, CMS su http://localhost:3000/studio.

## Struttura

```
app/(site)/          landing page e stili grafici (globals.css)
app/(studio)/studio  il CMS Sanity integrato nel sito
components/          i blocchi della landing
lib/fallback.ts      testi di partenza
lib/content.ts       lettura dei contenuti dal CMS
sanity/schemaTypes/  la struttura dei contenuti (cosa si può modificare)
scripts/seed.ts      caricamento iniziale dei contenuti
```

## Prossimi passi

- Pagina di dettaglio per ogni stile (`/stili/[slug]`): lo schema ha già lo slug.
- Pagamento con Stripe Checkout e prenotazione con Cal.com dopo il pagamento.
- Questionario pre-consulenza (misure, foto, budget) e generazione della bozza del piano.
