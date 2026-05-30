import type { Metadata } from 'next'
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
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${teko.variable}`}>
      <body className="bg-void text-light antialiased">
        <div className="noise-overlay" />
        <div className="scanlines" />
        {children}
      </body>
    </html>
  )
}