'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const specs = [
  { label: '174', unit: 'BPM', color: '#FFE600', desc: 'Peak tempo' },
  { label: '4/4', unit: 'TIME', color: '#00FFDD', desc: 'Structural pulse' },
  { label: '140', unit: 'HZ', color: '#FF0066', desc: 'Sub frequency' },
  { label: '∞', unit: 'SIGNAL', color: '#00FFDD', desc: 'Output active' },
]

export function Specs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.spec-cell', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
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
    <section ref={sectionRef} className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-edge-faint">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="spec-cell bg-void p-6 md:p-10 flex flex-col items-center justify-center text-center"
              style={{ borderTop: `1px solid ${spec.color}22` }}
            >
              <div
                className="font-mono text-4xl md:text-5xl font-bold tracking-[-0.04em]"
                style={{
                  color: spec.color,
                  textShadow: `0 0 12px ${spec.color}44`,
                }}
              >
                {spec.label}
              </div>
              <div
                className="font-mono text-[9px] tracking-[0.25em] uppercase mt-2"
                style={{ color: spec.color, opacity: 0.7 }}
              >
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