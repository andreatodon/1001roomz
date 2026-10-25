# 1001 Rooms

Il sito di 1001 Rooms: landing page in **Next.js** con i contenuti gestiti in **Sanity** (CMS headless).

- Il sito è su `/`, il CMS su `/studio`.
- Tutti i testi della landing, gli stili, le FAQ, il prezzo e la foto dell'hero si modificano dal CMS.
- Finché un contenuto non è compilato nel CMS, il sito mostra i testi di partenza (in `lib/fallback.ts`), quindi si può già pubblicare.

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

Il progetto Sanity (`p5ngpovr`, dataset `production`) è già impostato nel codice: non servono variabili d'ambiente.

### 1. Pubblica su Vercel
Su [vercel.com](https://vercel.com) importa il repository GitHub `1001roomz` e fai il deploy, senza cambiare nulla.

### 2. Autorizza il sito su Sanity
In [sanity.io/manage](https://www.sanity.io/manage) → progetto → **API → CORS origins** aggiungi, con **Allow credentials** attivo:
- l'indirizzo del sito su Vercel, per esempio `https://1001roomz.vercel.app`
- `http://localhost:3000`, se lavori anche in locale

### 3. Carica i contenuti di partenza
Apri `https://<il-tuo-sito>/studio`, accedi con l'account Sanity, apri **Home page** e premi **Carica contenuti di partenza**. Il pulsante crea la Home page, le Impostazioni e i 5 stili con i testi attuali della landing, e sparisce una volta usato. Non sovrascrive mai contenuti già presenti.

(In alternativa da terminale: `npx sanity login` e poi `npm run seed`.)

### 4. Usa il CMS
Modifica e premi **Publish**: il sito si aggiorna entro circa un minuto. Per invitare altre persone a gestire i contenuti: sanity.io/manage → Members.

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
lib/seedDocs.ts      contenuti di partenza per il CMS
scripts/seed.ts      caricamento iniziale da terminale
```

## Prossimi passi

- Pagina di dettaglio per ogni stile (`/stili/[slug]`): lo schema ha già lo slug.
- Pagamento con Stripe Checkout e prenotazione con Cal.com dopo il pagamento.
- Questionario pre-consulenza (misure, foto, budget) e generazione della bozza del piano.
