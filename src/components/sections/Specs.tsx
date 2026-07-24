'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

const specs = [
  { label: '174', unit: 'BPM', color: 'var(--volt)', desc: 'Peak tempo' },
  { label: '4/4', unit: 'TIME', color: 'var(--neon)', desc: 'Structural pulse' },
  { label: '140', unit: 'HZ', color: 'var(--mag)', desc: 'Sub frequency' },
  { label: '∞', unit: 'SIGNAL', color: 'var(--neon)', desc: 'Output active' },
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
    <section ref={sectionRef} className="py-20 md:py-28 relative">
      {/* Visible grid lines as structural skeleton */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `linear-gradient(rgba(236,232,217,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(236,232,217,0.05) 1px, transparent 1px)`,
          backgroundSize: '100% 100%',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-edge-faint">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="spec-cell bg-void p-6 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden"
              style={{ borderTop: `1px solid ${spec.color}22` }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(236,232,217,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(236,232,217,0.04) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />

              <div
                className="relative z-10 font-mono text-4xl md:text-5xl font-bold tracking-[-0.04em]"
                style={{
                  color: spec.color,
                  textShadow: `0 0 12px ${spec.color}44`,
                }}
              >
                {spec.label}
              </div>
              <div
                className="relative z-10 font-mono text-[9px] tracking-[0.25em] uppercase mt-2"
                style={{ color: spec.color, opacity: 0.7 }}
              >
                {spec.unit}
              </div>
              <div className="relative z-10 font-mono text-[8px] tracking-[0.15em] uppercase text-light-muted mt-1">
                {spec.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
