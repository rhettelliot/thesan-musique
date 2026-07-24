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
          {/* Logo */}
          <a href="#" aria-label="Thesan Musique home" className="font-display text-lg font-bold tracking-[-0.02em] uppercase">
            <span className="text-neon text-neon-glow">TM</span>
            <span className="text-light-muted font-mono text-[9px] tracking-[0.15em] ml-2 hidden md:inline">
              MR-002
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted hover:text-neon transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://distrokid.com/hyperfollow/thesanmusique/ataraxia"
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon border border-neon px-4 py-2 btn-snap hover:bg-neon hover:text-void transition-colors duration-200"
              style={{ boxShadow: '0 0 8px rgba(0,255,221,0.1)' }}
            >
              Listen
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted"
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-void/95 backdrop-blur-[8px] border-b border-edge-faint px-6 py-6 space-y-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block font-mono text-[11px] tracking-[0.15em] uppercase text-light-muted hover:text-neon transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://distrokid.com/hyperfollow/thesanmusique/ataraxia"
              target="_blank"
              rel="noreferrer noopener"
              className="block font-mono text-[11px] tracking-[0.15em] uppercase text-neon"
            >
              Listen →
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}