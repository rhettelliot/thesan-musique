'use client'

import { useEffect, useRef } from 'react'
import { revealOnEnter } from '@/lib/reveal'

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const disposers: Array<() => void> = []
    ;(async () => {
      disposers.push(await revealOnEnter(root.querySelectorAll('.cta-content'), { y: 40, duration: 0.8 }))
    })()
    return () => disposers.forEach((d) => d())
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-48">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="cta-content">
          {/* Bass waveform */}
          <div className="flex items-end justify-center gap-[3px] mb-8 h-10">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="w-[3px] rounded-sm"
                style={{
                  height: `${4 + Math.abs(Math.sin(i * 0.35)) * 36}px`,
                  backgroundColor: i % 8 === 0 ? 'var(--mag)' : i % 2 === 0 ? 'var(--neon)' : 'var(--light-muted)',
                }}
              />
            ))}
          </div>

          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.05] uppercase">
            Feel the <span className="text-neon text-neon-glow">Frequency</span>
          </h2>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted mt-4">
            Manteis Recordings — accepting demos from artists pushing bass culture forward
          </p>

          <div className="mt-10">
            <a
              href="mailto:demo@manteisrecordings.com"
              className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase px-8 py-4 border border-neon text-neon btn-snap hover:bg-neon hover:text-void transition-colors duration-200"
              style={{ boxShadow: '0 0 10px var(--neon-glow)' }}
            >
              Submit Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
