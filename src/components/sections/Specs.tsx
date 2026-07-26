'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

const specs = [
  { label: '174', unit: 'BPM', desc: 'Peak tempo' },
  { label: '4/4', unit: 'TIME', desc: 'Structural pulse' },
  { label: '48', unit: 'MIN', desc: 'Total runtime' },
  { label: '9', unit: 'TRKS', desc: 'Album tracks' },
]

export function Specs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.spec-cell'), { y: 30, duration: 0.5, stagger: 0.08 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative bg-void">
      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-edge-faint border border-edge-faint">
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className="spec-cell p-6 md:p-10 flex flex-col items-center justify-center text-center relative"
              style={{ borderLeft: i > 0 ? undefined : 'none' }}
            >
              <div className="font-mono text-[clamp(1.75rem,8vw,5rem)] md:text-5xl font-bold tracking-[-0.04em] text-cream">
                {spec.label}
              </div>
              <div className="font-mono text-[9px] tracking-[0.25em] uppercase mt-2 text-light-muted">
                {spec.unit}
              </div>
              <div className="font-mono text-[8px] tracking-[0.15em] uppercase text-light-muted mt-1">
                {spec.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
