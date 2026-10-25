export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
// Il Project ID è pubblico (non è una chiave segreta): lo teniamo qui come default.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'p5ngpovr'

/** Senza projectId il sito usa i testi di esempio in lib/fallback.ts. */
export const isSanityConfigured = projectId.length > 0
