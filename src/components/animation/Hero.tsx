'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

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

        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: isReduced ? 0 : 40 },
          { opacity: 1, y: 0, duration: isReduced ? 0.2 : 0.7, ease: 'power3.out' },
          0.15
        )

        tl.fromTo(
          subRef.current,
          { opacity: 0 },
          { opacity: 1, duration: isReduced ? 0.2 : 0.6, ease: 'power2.out' },
          0.45
        )

        if (!isReduced) {
          gsap.to(indicatorRef.current, {
            y: 8,
            duration: 1.4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })

          gsap.to(titleRef.current, {
            y: -60,
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
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-void pt-16 md:pt-0"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(236,232,217,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(236,232,217,0.04) 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
        }}
      />

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[35vh] z-[1] opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(255,85,0,0.06) 0%, transparent 70%)',
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none"
      >
        <span className="catalog-massive text-[clamp(4rem,20vw,16rem)] md:text-[clamp(8rem,16vw,16rem)] font-bold uppercase">
          MR-008
        </span>
      </div>

      <div ref={titleRef} className="relative z-10 text-center" style={{ opacity: 1 }}>
        <h1 className="font-display text-[clamp(2.75rem,14vw,13rem)] md:text-[clamp(6rem,12vw,13rem)] font-bold tracking-[-0.06em] leading-[0.78] uppercase">
          <span className="block text-cream">Thesan</span>
          <span className="block text-signal">Musique</span>
        </h1>
      </div>

      <div ref={subRef} className="relative z-10 mt-8 text-center" style={{ opacity: 1 }}>
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-light-muted">
          Deep Dance · Techno · Drum & Bass · MR-008
        </p>
        <div className="mt-6 rule w-40 mx-auto" />
      </div>

      <div
        ref={indicatorRef}
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ opacity: 1 }}
      >
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted">
          Scroll
        </span>
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none" className="text-signal">
          <path d="M7 4 L7 16 M3 12 L7 16 L11 12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  )
}
