'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined
    let cancelled = false

    ;(async () => {
      const gsapModule = await import('gsap')
      const scrollTriggerModule = await import('gsap/ScrollTrigger')
      const gsap = gsapModule.gsap
      const { ScrollTrigger } = scrollTriggerModule
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const isReduced = prefersReducedMotion()

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.2 })

        // Strobe flash fires before title lands
        if (!isReduced && flashRef.current) {
          gsap.set(flashRef.current, { opacity: 0.85 })
          gsap.to(flashRef.current, {
            opacity: 0,
            duration: 0.55,
            ease: 'steps(8)',
          })
        }

        // Title flickers in with opacity steps
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: isReduced ? 0 : 80, scaleY: isReduced ? 1 : 1.2 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: isReduced ? 0.2 : 0.65,
            ease: 'steps(10)',
          },
          0.15
        )

        tl.fromTo(
          subRef.current,
          { opacity: 0 },
          { opacity: 1, duration: isReduced ? 0.2 : 0.6, ease: 'power2.out' },
          0.55
        )

        // Scroll indicator
        if (!isReduced) {
          gsap.to(indicatorRef.current, {
            y: 10,
            duration: 1.2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
        }

        // Parallax on scroll
        if (!isReduced) {
          gsap.to(titleRef.current, {
            y: -100,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          })
        }
      }, heroRef)
    })()

    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Strobe flash overlay on first load */}
      <div
        ref={flashRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'var(--neon)', mixBlendMode: 'screen', opacity: 0 }}
        aria-hidden="true"
      />

      {/* Continuous strobe-flicker overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[18] pointer-events-none strobe-cycle"
        style={{ background: 'var(--neon)', mixBlendMode: 'overlay', opacity: 0 }}
      />

      {/* Wireframe grid tunnel — perspective plane */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[75vh] z-[1] wireframe-tunnel tunnel-pulse"
        style={{ backgroundSize: '70px 70px' }}
      />

      {/* Topographic warehouse floor plan contours */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[45vh] z-[2] topo-overlay"
      />

      {/* Visible structural grid skeleton */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[3] opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(236,232,217,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(236,232,217,0.04) 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
        }}
      />

      {/* Geometric rectangular masks */}
      <div
        aria-hidden="true"
        className="absolute top-[12%] left-[8%] w-[18%] h-[32%] border border-edge-subtle z-[3] opacity-40"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[18%] right-[6%] w-[22%] h-[24%] border border-edge-subtle z-[3] opacity-30"
      />
      <div
        aria-hidden="true"
        className="absolute top-[22%] right-[12%] w-[8%] h-[8%] border border-neon z-[3] opacity-20"
      />

      {/* Radial glow — cyan core */}
      <div className="absolute inset-0 pointer-events-none z-[4]" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,221,0.06) 0%, rgba(255,0,127,0.03) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* Side EQ bars */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col-reverse items-end gap-[2px] z-10" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-[2px]"
            style={{
              height: `${6 + Math.abs(Math.sin(i * 0.4)) * 30}px`,
              backgroundColor: i % 5 === 0 ? 'var(--signal-dim)' : i % 2 === 0 ? 'var(--neon)' : 'var(--light-muted)',
              opacity: 0.4 + (i % 3) * 0.15,
            }}
          />
        ))}
      </div>

      {/* MASSIVE catalog number MR-008 art */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center z-[4] pointer-events-none"
      >
        <span className="catalog-massive text-[22vw] md:text-[20vw] font-bold uppercase">
          MR-008
        </span>
      </div>

      {/* Title */}
      <div ref={titleRef} className="relative z-10 text-center opacity-0">
        <h1 className="font-display text-7xl md:text-[10rem] lg:text-[13rem] font-bold tracking-[-0.06em] leading-[0.78] uppercase">
          <span className="block text-cream">Thesan</span>
          <span className="block text-neon text-neon-glow">Musique</span>
        </h1>
      </div>

      {/* Subtitle */}
      <div ref={subRef} className="relative z-10 mt-6 text-center opacity-0">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-light-muted">
          Deep Dance · Techno · Drum & Bass · MR-008
        </p>
        <div className="mt-4 bass-line w-40 mx-auto" />
      </div>

      {/* Stamp badge texture for label */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        <div className="relative border border-edge-subtle px-4 py-2 overflow-hidden">
          <div className="absolute inset-0 stamp-texture stamp-jitter" aria-hidden="true" />
          <span className="relative font-mono text-[9px] tracking-[0.25em] uppercase text-cream-dim">
            TSM-008 // WAREHOUSE PROTOCOL
          </span>
        </div>
      </div>

      {/* Scroll */}
      <div
        ref={indicatorRef}
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted">
          Drop
        </span>
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none" className="text-neon">
          <path d="M7 4 L7 16 M3 12 L7 16 L11 12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  )
}
