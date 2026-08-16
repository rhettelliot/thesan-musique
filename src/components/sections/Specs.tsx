'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

const primarySpecs = [
  { label: '174', unit: 'BPM', desc: 'Peak tempo — DnB pressure' },
  { label: '128', unit: 'BPM', desc: 'Techno axis — mid-set pivot' },
  { label: '48:18', unit: 'RUN', desc: 'Total runtime' },
  { label: '9', unit: 'TRKS', desc: 'Across 3 movements' },
]

const secondarySpecs = [
  { k: 'CATALOG', v: 'MR-008' },
  { k: 'FORMAT', v: 'Digital · 24-bit WAV' },
  { k: 'KEY', v: 'F minor (primary)' },
  { k: 'MASTERED', v: 'Manteis Studios · Seattle' },
  { k: 'RELEASED', v: '2025' },
  { k: 'LABEL', v: 'Manteis Recordings' },
]

export function Specs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.spec-cell'), { y: 30, duration: 0.5, stagger: 0.08 }))
      disposers.push(await revealOnEnter(root.querySelectorAll('.spec-meta-row'), { y: 20, duration: 0.4, stagger: 0.06 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} id="specs" className="py-20 md:py-28 relative bg-void">
      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div className="section-label mb-12">Specs /</div>

        {/* Primary specs — large numeric grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-edge-faint border border-edge-faint">
          {primarySpecs.map((spec, i) => (
            <div
              key={spec.label}
              className="spec-cell p-6 md:p-10 flex flex-col items-center justify-center text-center relative group"
              style={{ borderLeft: i > 0 && i % 2 !== 0 ? undefined : undefined }}
            >
              <div className="font-mono text-[clamp(1.75rem,8vw,5rem)] md:text-5xl font-bold tracking-[-0.04em] text-cream group-hover:text-signal transition-colors duration-300">
                {spec.label}
              </div>
              <div className="font-mono text-[9px] tracking-[0.25em] uppercase mt-2 text-signal">
                {spec.unit}
              </div>
              <div className="font-mono text-[8px] tracking-[0.15em] uppercase text-light-muted mt-1">
                {spec.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Secondary specs — technical data sheet */}
        <div className="mt-px border-x border-b border-edge-faint bg-void-raised">
          {secondarySpecs.map((s, i) => (
            <div
              key={s.k}
              className="spec-meta-row flex items-center justify-between px-6 md:px-10 py-3 border-t border-edge-faint first:border-t-0"
            >
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-light-muted">
                {s.k}
              </span>
              <span className="font-mono text-[10px] tracking-[0.1em] text-cream">
                {s.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
