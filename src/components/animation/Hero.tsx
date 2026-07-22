'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isReduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      // Title slams in
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: isReduced ? 0 : 80, scaleY: isReduced ? 1 : 1.2 },
        { opacity: 1, y: 0, scaleY: 1, duration: isReduced ? 0.2 : 0.8, ease: 'power4.out' }
      )

      tl.fromTo(
        subRef.current,
        { opacity: 0 },
        { opacity: 1, duration: isReduced ? 0.2 : 0.6, ease: 'power2.out' },
        '-=0.3'
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

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Grid overlay — faint rave grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,221,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,221,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow — cyan core */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,221,0.08) 0%, rgba(255,0,127,0.04) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* Side EQ bars */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col-reverse items-end gap-[2px]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-[2px]"
            style={{
              height: `${6 + Math.abs(Math.sin(i * 0.4)) * 30}px`,
              backgroundColor: i % 5 === 0 ? 'var(--mag)' : i % 2 === 0 ? 'var(--neon)' : 'var(--light-muted)',
              opacity: 0.4 + (i % 3) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div ref={titleRef} className="relative z-10 text-center">
        <h1 className="font-display text-7xl md:text-[10rem] lg:text-[13rem] font-bold tracking-[-0.06em] leading-[0.78] uppercase">
          <span className="block">Thesan</span>
          <span className="block text-neon text-neon-glow">Musique</span>
        </h1>
      </div>

      {/* Subtitle */}
      <div ref={subRef} className="relative z-10 mt-6 text-center">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-light-muted">
          Deep Dance · Techno · Drum & Bass · MR-002
        </p>
        <div className="mt-4 bass-line w-40 mx-auto" />
      </div>

      {/* Scroll */}
      <div
        ref={indicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
