'use client'

import { useState } from 'react'

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '#release', label: 'Release' },
    { href: '#tracks', label: 'Tracks' },
    { href: '#manifesto', label: 'Manifesto' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <nav className="bg-void/85 backdrop-blur-[8px] border-b border-edge-faint">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <a href="#" aria-label="Thesan Musique home" className="font-display text-lg font-bold tracking-[-0.02em] uppercase">
            <span className="text-signal">TM</span>
            <span className="text-light-muted font-mono text-[9px] tracking-[0.15em] ml-2 hidden md:inline">
              MR-008
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted hover:text-signal transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://distrokid.com/hyperfollow/thesanmusique/ataraxia"
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal border border-signal px-4 py-2 hover:bg-signal hover:text-void transition-colors duration-200"
            >
              <span className="relative z-10">Listen</span>
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted"
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-void/95 backdrop-blur-[8px] border-b border-edge-faint px-6 py-6 space-y-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block font-mono text-[11px] tracking-[0.15em] uppercase text-light-muted hover:text-signal transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://distrokid.com/hyperfollow/thesanmusique/ataraxia"
              target="_blank"
              rel="noreferrer noopener"
              className="block font-mono text-[11px] tracking-[0.15em] uppercase text-signal"
            >
              Listen →
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}
