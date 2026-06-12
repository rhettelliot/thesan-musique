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
  title: 'Thesan Musique',
  description: 'Deep dance. Techno. Drum & Bass. Frequency as force. Manteis Recordings.',
  metadataBase: new URL('https://thesanmusique.com'),
  openGraph: {
    title: 'Thesan Musique',
    description: 'Deep Dance / Techno / Drum & Bass — Manteis Recordings',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 1200, alt: 'Thesan Musique — Manteis Recordings' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thesan Musique',
    description: 'Deep Dance / Techno / Drum & Bass — Manteis Recordings',
    images: ['/og.jpg'],
  },
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