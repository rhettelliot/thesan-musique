'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { revealOnEnter } from '@/lib/reveal'

export function Release() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.release-cover'), { y: 60, duration: 0.9 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.release-info'), { y: 0, x: 60, duration: 0.8 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.track-row'), { y: 0, x: -30, duration: 0.5, stagger: 0.05 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} id="release" className="py-32 md:py-48 relative">
      {/* Structural grid lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(236,232,217,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(236,232,217,0.04) 1px, transparent 1px)`,
          backgroundSize: '140px 140px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Release /</div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          {/* Cover art */}
          <div className="release-cover w-full md:w-1/2">
            <div
              className="relative aspect-square overflow-hidden rect-mask"
              style={{
                border: '1px solid var(--edge-faint)',
              }}
            >
              <Image
                src="/covers/Thesan.webp"
                alt="Ataraxia cover art"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 border border-edge-faint"
                style={{ clipPath: 'inset(6% 6% 6% 6%)' }}
              />
            </div>
          </div>

          <div className="release-info flex-1 py-4 md:py-12">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal mb-4">
              MR-008 · 2025
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.88] mb-2 uppercase text-cream">
              Ataraxia
            </h2>
            <p className="font-display text-xl md:text-2xl text-light-dim font-semibold mb-6">
              Thesan Musique
            </p>

            <div className="rule w-24 mb-8" />

            <p className="font-body text-base md:text-lg text-light-dim leading-relaxed mb-10 max-w-lg">
              A state of tranquil illumination through rhythm. Deep dance frequencies 
              that dissolve the boundary between body and bass. Techno architecture 
              meeting DnB pressure — dance floor as meditation chamber.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="https://distrokid.com/hyperfollow/thesanmusique/ataraxia"
                target="_blank"
                rel="noreferrer noopener"
                className="relative font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 border border-signal text-signal hover:bg-signal hover:text-void transition-colors duration-200"
              >
                <span className="relative z-10">Listen Now</span>
              </a>
              <a
                href="https://open.spotify.com/album/34IoM42BGoMQ7VoeeZSWlh"
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-signal transition-colors duration-300 uppercase"
              >
                Spotify →
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Deep Dance', 'Techno', 'Drum & Bass', 'Electronic'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1 border border-edge-subtle text-light-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rule max-w-5xl mx-auto mt-32" />
    </section>
  )
}
