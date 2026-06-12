'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

export function Release() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const isReduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      gsap.from('.release-cover', {
        y: isReduced ? 0 : 60,
        opacity: 0,
        duration: isReduced ? 0.2 : 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.release-cover',
          start: 'top 85%',
          once: true,
        },
      })

      gsap.from('.release-info', {
        x: isReduced ? 0 : 60,
        opacity: 0,
        duration: isReduced ? 0.2 : 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.release-info',
          start: 'top 85%',
          once: true,
        },
      })

      // Track list stagger
      gsap.utils.toArray<HTMLElement>('.track-row').forEach((row, i) => {
        gsap.from(row, {
          x: isReduced ? 0 : -30,
          opacity: 0,
          duration: isReduced ? 0.2 : 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            once: true,
          },
          delay: isReduced ? 0 : i * 0.05,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="release" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Release /</div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          {/* Cover art */}
          <div className="release-cover w-full md:w-1/2">
            <div
              className="relative aspect-square overflow-hidden"
              style={{
                border: '1px solid var(--edge-faint)',
                boxShadow: '0 0 60px var(--neon-glow), 0 0 120px var(--mag-glow)',
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
              {/* Neon corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div
                  className="absolute top-0 right-0 w-full h-[2px]"
                  style={{ background: 'linear-gradient(270deg, var(--neon), transparent)' }}
                />
                <div
                  className="absolute top-0 right-0 w-[2px] h-full"
                  style={{ background: 'linear-gradient(180deg, var(--mag), transparent)' }}
                />
              </div>
            </div>
          </div>

          {/* Release info */}
          <div className="release-info flex-1 py-4 md:py-12">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon mb-4">
              MR-002 · 2024
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.88] mb-2 uppercase">
              Ataraxia
            </h2>
            <p className="font-display text-xl md:text-2xl text-mag font-semibold mb-6">
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
                className="font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3 border border-neon text-neon btn-snap hover:bg-neon hover:text-void transition-colors duration-200"
                style={{ boxShadow: '0 0 10px var(--neon-glow)' }}
              >
                Listen Now
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
