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
                boxShadow: '0 0 60px rgba(0,255,221,0.08), 0 0 120px rgba(255,0,127,0.06)',
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
              {/* Scanline overlay on cover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 scanlines opacity-20"
              />
              {/* Neon corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16" aria-hidden="true">
                <div
                  className="absolute top-0 right-0 w-full h-[2px]"
                  style={{ background: 'linear-gradient(270deg, var(--neon), transparent)' }}
                />
                <div
                  className="absolute top-0 right-0 w-[2px] h-full"
                  style={{ background: 'linear-gradient(180deg, var(--signal-dim), transparent)' }}
                />
              </div>
              {/* Geometric rectangle mask corners */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 w-full h-full border border-edge-faint"
                style={{ clipPath: 'inset(6% 6% 6% 6%)' }}
              />
            </div>
          </div>

          {/* Release info */}
          <div className="release-info flex-1 py-4 md:py-12">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon mb-4">
              MR-008 · 2025
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.88] mb-2 uppercase text-cream">
              Ataraxia
            </h2>
            <p className="font-display text-xl md:text-2xl text-neon font-semibold mb-6">
              Thesan Musique
            </p>

            <div className="bass-line w-24 mb-8" />

            <p className="font-body text-base md:text-lg text-light-dim leading-relaxed mb-10 max-w-lg">
              A state of tranquil illumination through rhythm. Deep dance frequencies 
              that dissolve the boundary between body and bass. Techno architecture 
              meeting DnB pressure — dance floor as meditation chamber.
            </p>

            {/* Streaming links */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="https://distrokid.com/hyperfollow/thesanmusique/ataraxia"
                target="_blank"
                rel="noreferrer noopener"
                className="relative font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 border border-neon text-neon btn-snap hover:bg-neon hover:text-void transition-colors duration-200 overflow-hidden"
                style={{ boxShadow: '0 0 10px rgba(0,255,221,0.1)' }}
              >
                <span className="relative z-10">Listen Now</span>
              </a>
              <a
                href="https://open.spotify.com/album/34IoM42BGoMQ7VoeeZSWlh"
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[10px] tracking-[0.1em] text-light-muted hover:text-neon transition-colors duration-300 uppercase"
              >
                Spotify →
              </a>
            </div>

            {/* Genre tags */}
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

      <div className="divider-neon max-w-5xl mx-auto mt-32" />
    </section>
  )
}
