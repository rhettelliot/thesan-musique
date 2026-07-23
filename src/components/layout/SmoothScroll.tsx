'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let lenis: Lenis | null = null
    let gsapInstance: typeof import('gsap').default | null = null
    let tick: ((time: number) => void) | null = null
    let active = true

    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (!active) return
      gsap.registerPlugin(ScrollTrigger)
      gsapInstance = gsap

      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      lenisRef.current = lenis

      lenis.on('scroll', ScrollTrigger.update)

      // Keep the exact callback reference so cleanup can remove it — passing
      // lenis.raf here (as the old code did to ticker.remove) removes nothing,
      // leaking a ticker that calls raf() on a destroyed Lenis.
      tick = (time: number) => lenis!.raf(time * 1000)
      gsap.ticker.add(tick)

      gsap.ticker.lagSmoothing(0)
    }

    init()

    return () => {
      active = false
      if (tick) gsapInstance?.ticker.remove(tick)
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <div className="relative">
      {/* Fog vignettes */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-30"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-30"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
        }}
      />
      {children}
    </div>
  )
}