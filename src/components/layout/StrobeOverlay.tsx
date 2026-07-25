'use client'

import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

export function StrobeOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const velocityRef = useRef(0)
  const lastYRef = useRef(0)
  const decayRef = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const overlay = overlayRef.current
    if (!overlay) return

    let rafId: number
    let active = true
    let lastTime = performance.now()

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastYRef.current
      lastYRef.current = y
      // Accumulate velocity; direction changes reset sign
      if (Math.sign(delta) !== Math.sign(velocityRef.current)) {
        velocityRef.current = 0
      }
      velocityRef.current = Math.max(0, Math.min(Math.abs(velocityRef.current) + Math.abs(delta) * 0.45, 180))
      decayRef.current = 0
    }

    const loop = (now: number) => {
      if (!active) return
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      if (velocityRef.current > 0.5) {
        // Flash intensity tied to velocity — the harder you scroll, the brighter/harder the strobe
        const intensity = Math.min(velocityRef.current / 120, 1)
        const flicker = Math.random() > 0.55 ? intensity * 0.85 : intensity * 0.25
        overlay.style.opacity = String(flicker * 0.55)
        decayRef.current += dt
        if (decayRef.current > 0.08) {
          velocityRef.current *= 0.82
        }
      } else {
        overlay.style.opacity = '0'
        velocityRef.current = 0
      }

      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    rafId = requestAnimationFrame(loop)

    return () => {
      active = false
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[60] mix-blend-overlay"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, rgba(0,255,221,0.55) 0%, rgba(0,255,221,0.12) 45%, transparent 75%)',
        opacity: 0,
        transition: 'opacity 0.06s linear',
      }}
    />
  )
}
