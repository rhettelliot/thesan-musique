import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'

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

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Thesan Musique — Ataraxia | Warehouse Bass — Deep Dance / Techno / DnB',
  description: 'Warehouse bass. Deep dance, techno, and drum & bass from Thesan Musique. Ataraxia — nine tracks of tranquility under pressure. Manteis Recordings MR-008, 2025.',
  keywords: ['Thesan Musique', 'Ataraxia', 'warehouse bass', 'deep dance', 'techno', 'drum and bass', 'DnB', 'electronic music', 'Manteis Recordings', 'Seattle electronic', 'MR-008'],
  authors: [{ name: 'Thesan Musique' }],
  creator: 'Thesan Musique',
  publisher: 'Manteis Recordings',
  metadataBase: new URL('https://thesan-musique-site.vercel.app'),
  alternates: {
    canonical: 'https://thesan-musique-site.vercel.app',
  },
  openGraph: {
    title: 'Thesan Musique — Ataraxia',
    description: 'Warehouse bass. Deep Dance / Techno / DnB — Manteis Recordings MR-008, 2025',
    type: 'website',
    url: 'https://thesan-musique-site.vercel.app',
    siteName: 'Thesan Musique',
    locale: 'en_US',
    images: [{ url: '/og.jpg', width: 1200, height: 1200, alt: 'Thesan Musique — Ataraxia — Manteis Recordings' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thesan Musique — Ataraxia',
    description: 'Warehouse bass. Deep Dance / Techno / DnB — Manteis Recordings MR-008, 2025',
    images: ['/og.jpg'],
  },
  robots: { index: true, follow: true },
}

const tracks = [
  { name: 'Ataraxia', duration: 'PT4M38S' },
  { name: 'Beyer', duration: 'PT6M31S' },
  { name: 'Incisive', duration: 'PT4M39S' },
  { name: 'Numen', duration: 'PT4M21S' },
  { name: 'Octal303', duration: 'PT4M54S' },
  { name: 'Presence', duration: 'PT5M20S' },
  { name: 'Shadowselves', duration: 'PT6M18S' },
  { name: 'Symbology', duration: 'PT6M35S' },
  { name: 'Far Eastern Winds', duration: 'PT6M2S' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicAlbum',
  name: 'Ataraxia',
  byArtist: {
    '@type': 'MusicGroup',
    name: 'Thesan Musique',
    genre: ['Deep Dance', 'Techno', 'Drum & Bass'],
  },
  recordLabel: {
    '@type': 'Organization',
    name: 'Manteis Recordings',
    url: 'https://manteisrecordings.com',
  },
  albumProductionType: 'https://schema.org/StudioAlbum',
  albumReleaseType: 'https://schema.org/AlbumRelease',
  catalogNumber: 'MR-008',
  datePublished: '2025',
  numTracks: 9,
  genre: ['Deep Dance', 'Techno', 'Drum & Bass', 'Electronic'],
  url: 'https://thesan-musique-site.vercel.app',
  image: 'https://thesan-musique-site.vercel.app/og.jpg',
  description: 'Warehouse bass. Nine tracks of tranquility under pressure — techno architecture meeting DnB velocity.',
  track: {
    '@type': 'ItemList',
    numberOfItems: 9,
    itemListElement: tracks.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'MusicRecording',
        name: t.name,
        duration: t.duration,
        byArtist: { '@type': 'MusicGroup', name: 'Thesan Musique' },
      },
    })),
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-void text-light antialiased">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000', color: '#00FFDD', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', textAlign: 'center', padding: 24 }}>
            Thesan Musique is an interactive experience — enable JavaScript to enter.
          </div>
        </noscript>
        <div className="noise-overlay" />
        {children}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            setTimeout(function() {
              var els = document.querySelectorAll('main [style*="opacity: 0"], main [style*="opacity:0"]');
              els.forEach(function(el) { el.style.opacity = '1'; el.style.transform = 'none'; });
            }, 4000);
          })();
        `}} />
      </body>
    </html>
  )
}
