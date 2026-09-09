import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Signal — see how AI answers about you',
  description: 'Check how your site shows up in search engines and AI assistants.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Poppins+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
      </head>
      <body className="font-body">{children}</body>
    </html>
  )
}
