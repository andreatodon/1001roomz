export const metadata = { title: '1001 Rooms · CMS' }

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
