import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenuti')
    .items([
      S.listItem().title('Home page').id('homePage').child(S.document().schemaType('homePage').documentId('homePage')),
      S.documentTypeListItem('style').title('Stili'),
      S.listItem()
        .title('Pagina stile (testi comuni)')
        .id('stylePage')
        .child(S.document().schemaType('stylePage').documentId('stylePage')),
      S.listItem()
        .title('Pagina prenotazione')
        .id('bookingPage')
        .child(S.document().schemaType('bookingPage').documentId('bookingPage')),
      S.divider(),
      S.listItem()
        .title('Impostazioni')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ])
