'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const manifesto = [
  'Bass is not sound.',
  'Bass is architecture.',
  'The kick drum is the heartbeat of a world',
  'that has forgotten how to dance.',
  'Techno strips everything to its frequency.',
  'DnB accelerates what was already infinite.',
  'Ataraxia: tranquility through rhythm.',
]

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const isReduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.mantra-line').forEach((line, i) => {
        gsap.from(line, {
          y: isReduced ? 0 : 40,
          opacity: 0,
          duration: isReduced ? 0.2 : 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 88%',
            once: true,
          },
          delay: isReduced ? 0 : i * 0.04,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="manifesto" className="py-32 md:py-48">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="section-label mb-20">Manifesto /</div>

        <div className="space-y-6 md:space-y-8">
          {manifesto.map((line, i) => (
            <p
              key={i}
              className={`mantra-line font-display text-2xl md:text-4xl lg:text-5xl leading-[1.12] tracking-[-0.02em] uppercase ${
                i === manifesto.length - 1
                  ? 'font-bold text-neon text-neon-glow'
                  : i === 0
                    ? 'font-bold text-mag text-mag-glow'
                    : i === manifesto.length - 2
                      ? 'text-light-dim'
                      : 'text-light'
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-16 bass-line w-32" />
      </div>
    </section>
  )
}
