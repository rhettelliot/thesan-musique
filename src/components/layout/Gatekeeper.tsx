'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '@/lib/motion'

export function Gatekeeper() {
  const [entered, setEntered] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('thesan-entered') === 'true'
    }
    return false
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const titleTopRef = useRef<HTMLDivElement>(null)
  const titleBottomRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const eqRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (entered) return

    const isReduced = prefersReducedMotion()

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      if (eqRef.current) {
        const bars = eqRef.current.children
        tl.fromTo(
          bars,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: isReduced ? 0.1 : 0.3, stagger: isReduced ? 0 : 0.03, ease: 'power2.out' },
          0
        )
      }

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: isReduced ? 0.2 : 0.6, ease: 'power4.inOut' },
        0.3
      )

      tl.fromTo(
        titleTopRef.current,
        { x: isReduced ? 0 : -80, opacity: 0 },
        { x: 0, opacity: 1, duration: isReduced ? 0.2 : 0.5, ease: 'power4.out' },
        0.5
      )

      tl.fromTo(
        titleBottomRef.current,
        { x: isReduced ? 0 : 80, opacity: 0 },
        { x: 0, opacity: 1, duration: isReduced ? 0.2 : 0.5, ease: 'power4.out' },
        0.6
      )

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: isReduced ? 0 : 15 },
        { opacity: 1, y: 0, duration: isReduced ? 0.2 : 0.4, ease: 'power2.out' },
        0.8
      )

      tl.fromTo(
        btnRef.current,
        { opacity: 0, y: isReduced ? 0 : 20 },
        { opacity: 1, y: 0, duration: isReduced ? 0.2 : 0.4, ease: 'power2.out' },
        0.9
      )
    }, containerRef)

    return () => ctx.revert()
  }, [entered])

  if (entered) return null

  const handleEnter = () => {
    const isReduced = prefersReducedMotion()
    if (flashRef.current) {
      gsap.fromTo(
        flashRef.current,
        { opacity: 0.8 },
        { opacity: 0, duration: 0.4, ease: 'power2.out' }
      )
    }

    gsap.to(containerRef.current, {
      opacity: 0,
      scale: isReduced ? 1 : 1.05,
      duration: 0.5,
      ease: 'power3.in',
      delay: 0.05,
      onComplete: () => {
        sessionStorage.setItem('thesan-entered', 'true')
        window.dispatchEvent(new Event('thesan-enter'))
        setEntered(true)
      },
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) return
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.2, ease: 'power2.out' })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion()) return
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <div
      ref={containerRef}
      data-gate=""
      className="fixed inset-0 z-50 bg-void flex flex-col items-center justify-center"
    >
      <div ref={flashRef} className="strobe-flash opacity-0" style={{ background: 'var(--neon)' }} />

      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 right-0 h-[3px] origin-left"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--neon) 20%, var(--mag) 50%, var(--neon) 80%, transparent)',
          boxShadow: '0 0 20px var(--neon-glow), 0 0 60px var(--neon-glow)',
        }}
      />

      <div ref={eqRef} className="absolute left-8 bottom-8 flex items-end gap-[2px]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="eq-bar"
            style={{
              height: `${10 + Math.random() * 20}px`,
              animationDelay: `${i * 0.1}s`,
              backgroundColor: i % 4 === 0 ? 'var(--mag)' : 'var(--neon)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6">
        <div ref={titleTopRef} className="opacity-0">
          <h1 className="font-display text-7xl md:text-[10rem] lg:text-[12rem] font-bold tracking-[-0.06em] leading-[0.75] uppercase">
            Thesan
          </h1>
        </div>
        <div ref={titleBottomRef} className="opacity-0">
          <h1 className="font-display text-7xl md:text-[10rem] lg:text-[12rem] font-bold tracking-[-0.06em] leading-[0.75] text-neon uppercase text-neon-glow">
            Musique
          </h1>
        </div>

        <p
          ref={tagRef}
          className="opacity-0 font-mono text-[10px] tracking-[0.35em] uppercase text-light-muted mt-4"
        >
          Deep Dance · Techno · Drum & Bass
        </p>

        <button
          ref={btnRef}
          onClick={handleEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="opacity-0 mt-8 font-mono text-[10px] tracking-[0.25em] uppercase px-8 py-3 border border-neon text-neon btn-snap hover:bg-neon hover:text-void transition-colors duration-200"
          style={{ boxShadow: '0 0 10px var(--neon-glow)' }}
        >
          Enter the Frequency
        </button>
      </div>

      <div className="absolute top-6 left-6 font-mono text-[9px] tracking-[0.15em] text-volt">
        174 BPM
      </div>
      <div className="absolute top-6 right-6 font-mono text-[9px] tracking-[0.15em] text-neon animate-flicker">
        ● LIVE
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[9px] tracking-[0.15em] text-light-muted">
        MR-002
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[9px] tracking-[0.15em] text-mag">
        SEATTLE WA
      </div>
    </div>
  )
}
