'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const tracks = [
  { num: 'A1', name: 'Ataraxia', duration: '4:38', bpm: 174 },
  { num: 'A2', name: 'Beyer', duration: '6:31', bpm: 174 },
  { num: 'A3', name: 'Incisive', duration: '4:39', bpm: 174 },
  { num: 'B1', name: 'Numen', duration: '4:21', bpm: 128 },
  { num: 'B2', name: 'Octal303', duration: '4:54', bpm: 128 },
  { num: 'B3', name: 'Presence', duration: '5:20', bpm: 174 },
  { num: 'C1', name: 'Shadowselves', duration: '6:18', bpm: 174 },
  { num: 'C2', name: 'Symbology', duration: '6:35', bpm: 174 },
  { num: 'C3', name: 'Far Eastern Winds', duration: '6:02', bpm: 174 },
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
          spot.style.background = `radial-gradient(circle 180px at ${x}px ${y}px, rgba(0,255,221,0.22), transparent 70%)`
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

      {/* Silkscreen catalog mark */}
      <div className="absolute top-6 left-6 z-20 font-mono text-[10px] tracking-[0.25em] uppercase text-signal">
        TSM-008 // WAREHOUSE PROTOCOL
      </div>
      <div className="absolute top-6 right-6 z-20 font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted hidden md:block">
        9 TRACKS · 48:18
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
        className="absolute top-0 left-0 h-full flex items-center px-6 md:px-12"
      >
        <div className="flex items-stretch gap-[1px] h-[65vh] min-h-[420px]">
          {tracks.map((track, i) => (
            <article
              key={track.name}
              className="track-card relative group flex-shrink-0 w-[82vw] md:w-[38vw] lg:w-[30vw] bg-void-raised border border-edge-faint px-5 md:px-8 py-6 md:py-8 flex flex-col justify-between overflow-hidden"
            >
              {/* Spotlight border layer */}
              <div
                className="spotlight absolute inset-[-1px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />

              {/* Top index strip */}
              <div className="flex items-start justify-between border-b border-edge-faint pb-4 mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal">
                  {track.num}
                </span>
                <span className="font-mono text-[10px] tracking-[0.15em] text-light-muted">
                  {String(i + 1).padStart(2, '0')} / 09
                </span>
              </div>

              {/* Track data */}
              <div className="relative z-10">
                <h3 className="font-display text-3xl md:text-5xl font-bold tracking-[-0.04em] uppercase leading-[0.9] text-light group-hover:text-neon transition-colors duration-300">
                  {track.name}
                </h3>
                <div className="mt-6 grid grid-cols-2 gap-[1px] bg-edge-faint">
                  <div className="bg-void-raised p-3">
                    <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-light-muted mb-1">
                      Duration
                    </div>
                    <div className="font-mono text-lg md:text-xl tracking-[-0.02em] text-light">
                      {track.duration}
                    </div>
                  </div>
                  <div className="bg-void-raised p-3">
                    <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-light-muted mb-1">
                      BPM
                    </div>
                    <div className="font-mono text-lg md:text-xl tracking-[-0.02em] text-light">
                      {track.bpm}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom label */}
              <div className="relative z-10 mt-auto pt-4 border-t border-edge-faint flex items-center justify-between">
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-light-muted">
                  MANTEIS RECORDINGS
                </span>
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-signal">
                  MR-002
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
