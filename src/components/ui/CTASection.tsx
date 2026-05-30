'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
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
                  backgroundColor: i % 8 === 0 ? '#FF0066' : i % 2 === 0 ? '#00FFDD' : '#555',
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
              style={{ boxShadow: '0 0 10px rgba(0,255,221,0.15)' }}
            >
              Submit Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}