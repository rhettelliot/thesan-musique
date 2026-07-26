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
    <section ref={sectionRef} className="py-32 md:py-48 relative bg-void">
      <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="cta-content">
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.05] uppercase text-cream">
            Feel the <span className="text-signal">Frequency</span>
          </h2>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-light-muted mt-4">
            Manteis Recordings — accepting demos from artists pushing bass culture forward
          </p>

          <div className="mt-10">
            <a
              href="mailto:demo@manteisrecordings.com"
              className="relative inline-block font-mono text-[10px] tracking-[0.25em] uppercase px-8 py-4 border border-signal text-signal hover:bg-signal hover:text-void transition-colors duration-200"
            >
              <span className="relative z-10">Submit Demo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
