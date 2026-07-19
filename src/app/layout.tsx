import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { Inter, JetBrains_Mono, Teko } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const teko = Teko({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Thesan Musique — Ataraxia | Deep Dance / Techno / Drum & Bass',
  description: 'Deep dance. Techno. Drum & Bass. Frequency as force. Ataraxia — a state of tranquil illumination through rhythm. Manteis Recordings.',
  keywords: ['Thesan Musique', 'Ataraxia', 'deep dance', 'techno', 'drum and bass', 'DnB', 'electronic music', 'Manteis Recordings', 'Seattle electronic'],
  authors: [{ name: 'Thesan Musique' }],
  creator: 'Thesan Musique',
  publisher: 'Manteis Recordings',
  metadataBase: new URL('https://thesanmusique.com'),
  alternates: {
    canonical: 'https://thesanmusique.com',
  },
  openGraph: {
    title: 'Thesan Musique — Ataraxia',
    description: 'Deep Dance / Techno / Drum & Bass — Manteis Recordings',
    type: 'website',
    url: 'https://thesanmusique.com',
    siteName: 'Thesan Musique',
    locale: 'en_US',
    images: [{ url: '/og.jpg', width: 1200, height: 1200, alt: 'Thesan Musique — Ataraxia — Manteis Recordings' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thesan Musique — Ataraxia',
    description: 'Deep Dance / Techno / Drum & Bass — Manteis Recordings',
    images: ['/og.jpg'],
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicAlbum',
  name: 'Ataraxia',
  byArtist: {
    '@type': 'MusicGroup',
    name: 'Thesan Musique',
  },
  recordLabel: {
    '@type': 'Organization',
    name: 'Manteis Recordings',
  },
  catalogNumber: 'MR-002',
  datePublished: '2024',
  genre: ['Deep Dance', 'Techno', 'Drum & Bass', 'Electronic'],
  url: 'https://thesanmusique.com',
  image: 'https://thesanmusique.com/og.jpg',
  description: 'A state of tranquil illumination through rhythm. Deep dance frequencies that dissolve the boundary between body and bass. Techno architecture meeting DnB pressure — dance floor as meditation chamber.',
}

export const viewport: Viewport = {
  themeColor: '#020203',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${teko.variable}`}>
      <body className="bg-void text-light antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020203', color: '#007AFF', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', textAlign: 'center', padding: 24 }}>
            Thesan Musique is an interactive experience — enable JavaScript to enter.
          </div>
        </noscript>
        <div className="noise-overlay" />
        <div className="scanlines" />
        {children}
      </body>
    </html>
  )
}