'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

const manifesto = [
  { text: 'Bass is not sound.', emphasis: 'first' },
  { text: 'Bass is architecture.', emphasis: 'first' },
  { text: 'The kick drum is the heartbeat of a world', emphasis: 'body' },
  { text: 'that has forgotten how to dance.', emphasis: 'body' },
  { text: 'Techno strips everything to its frequency.', emphasis: 'body' },
  { text: 'DnB accelerates what was already infinite.', emphasis: 'body' },
  { text: 'Ataraxia: tranquility through rhythm.', emphasis: 'final' },
]

const principles = [
  { num: '01', title: 'Frequency as Form', desc: 'Every track is a structure — bass is the foundation, rhythm is the architecture, melody is the light that enters through the windows.' },
  { num: '02', title: 'Dance as Meditation', desc: 'The dance floor is a temple. The DJ is the officiant. The crowd is the congregation. The beat is the prayer.' },
  { num: '03', title: 'Pressure as Release', desc: 'DnB compresses emotion until it detonates. Techno builds tension until it dissolves. Both arrive at the same place: catharsis.' },
]

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.mantra-line'), { y: 40, duration: 0.6, stagger: 0.04 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.principle-card'), { y: 30, duration: 0.5, stagger: 0.1 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} id="manifesto" className="py-32 md:py-48 relative bg-void">
      <div className="relative max-w-5xl mx-auto px-6 md:px-10">
        <div className="section-label mb-20">Manifesto /</div>

        {/* Primary manifesto text */}
        <div className="space-y-6 md:space-y-8">
          {manifesto.map((line, i) => (
            <p
              key={i}
              className={`mantra-line font-display text-[clamp(1.25rem,6vw,3.5rem)] md:text-4xl lg:text-5xl leading-[1.12] tracking-[-0.02em] uppercase ${
                line.emphasis === 'final'
                  ? 'font-bold text-signal'
                  : line.emphasis === 'first'
                    ? 'font-bold text-cream'
                    : 'text-light-dim'
              }`}
            >
              {line.text}
            </p>
          ))}
        </div>

        <div className="mt-16 rule w-32" />

        {/* Three principles */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px border border-edge-faint">
          {principles.map((p) => (
            <div
              key={p.num}
              className="principle-card p-8 md:p-10 bg-void-raised flex flex-col"
            >
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-signal mb-6">
                {p.num}
              </span>
              <h3 className="font-display text-lg md:text-xl font-bold tracking-[-0.02em] uppercase text-cream mb-4">
                {p.title}
              </h3>
              <p className="font-body text-sm md:text-base text-light-dim leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
