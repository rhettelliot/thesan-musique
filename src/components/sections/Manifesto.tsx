'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

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
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.mantra-line'), { y: 40, duration: 0.6, stagger: 0.04 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} id="manifesto" className="py-32 md:py-48 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
        <div className="section-label mb-20">Manifesto /</div>

        <div className="space-y-6 md:space-y-8 relative z-10">
          {manifesto.map((line, i) => (
            <div key={i} className="relative">
              <span
                className="absolute -left-4 md:-left-12 -top-6 md:-top-10 font-display text-[120px] md:text-[200px] font-bold leading-none text-neon opacity-[0.03] select-none pointer-events-none z-0"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p
                className={`mantra-line relative z-10 font-display text-2xl md:text-4xl lg:text-5xl leading-[1.12] tracking-[-0.02em] uppercase ${
                  i === manifesto.length - 1
                    ? 'font-bold text-neon text-neon-glow'
                    : i === 0
                      ? 'font-bold text-mag'
                      : i === manifesto.length - 2
                        ? 'text-light-dim'
                        : 'text-light'
                }`}
              >
                {line}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bass-line w-32" />
      </div>
    </section>
  )
}
