'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const tracks = [
  { num: 'A1', name: 'Ataraxia', duration: '4:38', bpm: 174, key: 'F min' },
  { num: 'A2', name: 'Beyer', duration: '6:31', bpm: 174, key: 'D min' },
  { num: 'A3', name: 'Incisive', duration: '4:39', bpm: 174, key: 'G min' },
  { num: 'B1', name: 'Numen', duration: '4:21', bpm: 128, key: 'A min' },
  { num: 'B2', name: 'Octal303', duration: '4:54', bpm: 128, key: 'C min' },
  { num: 'B3', name: 'Presence', duration: '5:20', bpm: 174, key: 'E min' },
  { num: 'C1', name: 'Shadowselves', duration: '6:18', bpm: 174, key: 'B min' },
  { num: 'C2', name: 'Symbology', duration: '6:35', bpm: 174, key: 'F# min' },
  { num: 'C3', name: 'Far Eastern Winds', duration: '6:02', bpm: 174, key: 'A min' },
]

export function Tracks() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const root = sectionRef.current
    const rail = railRef.current
    const ghost = ghostRef.current
    if (!root || !rail || !ghost) return

    let cleanup = () => {}
    let cancelled = false

    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      const scrollWidth = rail.scrollWidth - window.innerWidth
      if (scrollWidth <= 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: 1 / (tracks.length - 1),
        },
      })

      tl.to(rail, { x: -scrollWidth, ease: 'none' })

      const cards = rail.querySelectorAll<HTMLElement>('.track-card')
      cards.forEach((card) => {
        const spot = card.querySelector<HTMLElement>('.spotlight')
        if (!spot) return
        const move = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          spot.style.background = `radial-gradient(circle 220px at ${x}px ${y}px, rgba(0,255,221,0.18), transparent 70%)`
        }
        const leave = () => {
          spot.style.background = 'transparent'
        }
        card.addEventListener('mousemove', move)
        card.addEventListener('mouseleave', leave)
      })

      cleanup = () => {
        tl.kill()
        ScrollTrigger.getAll()
          .filter((st) => st.trigger === root)
          .forEach((st) => st.kill())
      }
    }

    init()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="tracks"
      className="relative bg-void h-screen overflow-hidden"
      aria-label="Ataraxia tracklist"
    >
      {/* Pin spacer ghost */}
      <div ref={ghostRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Structural skeleton grid lines across section */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 grid-skeleton"
        style={{ backgroundSize: '160px 160px', opacity: 0.25 }}
      />

      {/* Silkscreen catalog mark */}
      <div className="absolute top-6 left-6 z-20 font-mono text-[10px] tracking-[0.25em] uppercase text-signal">
        TSM-008 // WAREHOUSE PROTOCOL
      </div>
      <div className="absolute top-6 right-6 z-20 font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted hidden md:block">
        9 TRACKS · 48:18
      </div>

      {/* Massive catalog MR-008 watermark */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1] pointer-events-none"
      >
        <span className="catalog-massive text-[38vw] md:text-[30vw]">MR-008</span>
      </div>

      {/* Kinetic marquee of track names */}
      <div className="absolute bottom-20 left-0 right-0 z-20 overflow-hidden border-y border-edge-subtle py-3">
        <div className="whitespace-nowrap animate-marquee">
          {[...tracks, ...tracks, ...tracks, ...tracks].map((t, i) => (
            <span
              key={`${t.name}-${i}`}
              className="inline-block font-mono text-xs tracking-[0.1em] uppercase text-light-dim mx-8"
            >
              {t.num} {t.name}
            </span>
          ))}
        </div>
      </div>

      {/* Horizontal rail */}
      <div
        ref={railRef}
        className="absolute top-0 left-0 h-full flex items-center px-6 md:px-12 z-10"
      >
        <div className="flex items-stretch h-[72vh] min-h-[420px]">
          {tracks.map((track, i) => (
            <article
              key={track.name}
              className="track-card relative group flex-shrink-0 w-[82vw] md:w-[38vw] lg:w-[30vw] bg-void-raised px-5 md:px-8 py-6 md:py-8 flex flex-col justify-between overflow-hidden border-r border-edge-faint last:border-r-0"
            >
              {/* Visible 1px grid skeleton inside card */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: `linear-gradient(rgba(236,232,217,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(236,232,217,0.06) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Scanline pattern overlay */}
              <div
                aria-hidden="true"
                className="scanlines absolute inset-0 z-[1] opacity-30 group-hover:opacity-60 transition-opacity duration-300"
              />

              {/* Spotlight border layer */}
              <div
                className="spotlight absolute inset-[-1px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none z-[2]"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
                aria-hidden="true"
                style={{
                  border: '1px solid rgba(0,255,221,0.35)',
                }}
              />

              {/* Top index strip */}
              <div className="relative z-10 flex items-start justify-between border-b border-edge-faint pb-4 mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal">
                  {track.num}
                </span>
                <span className="font-mono text-[10px] tracking-[0.15em] text-light-muted">
                  {String(i + 1).padStart(2, '0')} / 09
                </span>
              </div>

              {/* Track data */}
              <div className="relative z-10">
                <h3 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.04em] uppercase leading-[0.9] text-cream group-hover:text-neon transition-colors duration-300">
                  {track.name}
                </h3>

                {/* Mono metadata strips — BPM / key / duration */}
                <div className="mt-6 meta-strip">
                  <div className="grid grid-cols-3 divide-x divide-edge-faint">
                    <div className="p-3">
                      <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-light-muted mb-1">
                        BPM
                      </div>
                      <div className="font-mono text-lg md:text-xl tracking-[-0.02em] text-cream data-tick">
                        {track.bpm}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-light-muted mb-1">
                        KEY
                      </div>
                      <div className="font-mono text-lg md:text-xl tracking-[-0.02em] text-cream">
                        {track.key}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-light-muted mb-1">
                        DUR
                      </div>
                      <div className="font-mono text-lg md:text-xl tracking-[-0.02em] text-cream">
                        {track.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom label stamp */}
              <div className="relative z-10 mt-auto pt-4 border-t border-edge-faint flex items-center justify-between">
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-light-muted">
                  MANTEIS RECORDINGS
                </span>
                <div className="relative border border-edge-subtle px-2 py-0.5 overflow-hidden">
                  <div className="absolute inset-0 stamp-texture" aria-hidden="true" />
                  <span className="relative font-mono text-[8px] tracking-[0.2em] uppercase text-signal">
                    MR-008
                  </span>
                </div>
              </div>

              {/* Glowing connecting line between cards */}
              {i < tracks.length - 1 && (
                <svg
                  className="absolute -right-[1px] top-1/2 -translate-y-1/2 w-[40px] h-[40%] z-20 pointer-events-none"
                  viewBox="0 0 40 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <line
                    x1="0"
                    y1="50"
                    x2="40"
                    y2="50"
                    className="connector-line pulse-connector"
                    style={{ strokeDasharray: '6 4' }}
                  />
                  <circle cx="38" cy="50" r="2.5" fill="rgba(0,255,221,0.55)" className="pulse-connector" />
                </svg>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
