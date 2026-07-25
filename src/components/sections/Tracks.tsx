'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

const tracks = [
  { num: 'A1', name: 'Ataraxia', duration: '4:38', bpm: 174, key: 'F min' },
  { num: 'A2', name: 'Beyer', duration: '6:31', bpm: 174, key: 'D min' },
  { num: 'A3', name: 'Incisive', duration: '4:39', bpm: 174, key: 'G min' },
  { num: 'B1', name: 'Numen', duration: '4:21', bpm: 128, key: 'A min' },
  { num: 'B2', name: 'Octal303', duration: '4:54', bpm: 128, key: 'C min' },
  { num: 'B3', name: 'Presence', duration: '5:20', bpm: 174, key: 'E min' },
  { num: 'C1', name: 'Shadowselves', duration: '6:18', bpm: 174, key: 'B min' },
  { num: 'C2', name: 'Symbology', duration: '6:35', bpm: 174, key: 'F# min' },
  { num: 'C3', name: 'Far Eastern Winds', duration: '6:02', bpm: 174, key: 'A min' },
]

const bpmValues = [130, 128, 126, 140, 135]

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function Tracks() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  // Physics state
  const posRef = useRef({ x: 0, v: 0 })
  const draggingRef = useRef(false)
  const startRef = useRef({ x: 0, scroll: 0, t: 0 })
  const lastRef = useRef({ x: 0, t: 0 })
  const rafRef = useRef<number | null>(null)
  const dimsRef = useRef({ max: 0, vw: 0 })

  const updateDims = useCallback(() => {
    const rail = railRef.current
    const viewport = viewportRef.current
    if (!rail || !viewport) return
    const max = Math.max(0, rail.scrollWidth - viewport.clientWidth)
    dimsRef.current = { max, vw: viewport.clientWidth }
  }, [])

  const apply = useCallback((x: number) => {
    const rail = railRef.current
    if (!rail) return
    rail.style.transform = `translate3d(${x}px, 0, 0)`
    const pct = dimsRef.current.max > 0 ? Math.abs(x) / dimsRef.current.max : 0
    setProgress(pct)
  }, [])

  const physicsLoop = useCallback(() => {
    const { max } = dimsRef.current
    if (!draggingRef.current && max > 0) {
      const { x, v } = posRef.current
      const projectedX = x + v
      const beyond = projectedX > 0 || projectedX < -max
      const friction = beyond ? 0.88 : 0.945
      const nextV = v * friction
      const finalX = x + nextV

      // Boundary spring
      let finalV = nextV
      if (finalX > 0) {
        finalV += -finalX * 0.12
      } else if (finalX < -max) {
        finalV += (-max - finalX) * 0.12
      }
      if (Math.abs(finalV) < 0.15 && !beyond) finalV = 0
      if (Math.abs(finalV) < 0.08 && beyond) finalV = 0

      posRef.current = { x: finalX, v: finalV }
      apply(finalX)
    }
    rafRef.current = requestAnimationFrame(physicsLoop)
  }, [apply])

  useEffect(() => {
    const viewport = viewportRef.current
    const section = sectionRef.current
    if (!viewport || !section) return

    updateDims()
    rafRef.current = requestAnimationFrame(physicsLoop)

    const onResize = () => {
      updateDims()
      posRef.current.x = clamp(posRef.current.x, -dimsRef.current.max, 0)
      apply(posRef.current.x)
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [apply, physicsLoop, updateDims])

  useEffect(() => {
    if (prefersReducedMotion()) return

    // Wheel hijack with momentum physics
    const viewport = viewportRef.current
    const section = sectionRef.current
    if (!viewport || !section) return

    let cancelled = false
    let cleanup: (() => void) | null = null

    const init = async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      updateDims()

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${dimsRef.current.max + viewport.clientHeight}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!draggingRef.current) {
            const target = -self.progress * dimsRef.current.max
            // Let the GSAP-driven position act as a soft target rather than hard set
            posRef.current.x = lerp(posRef.current.x, target, 0.18)
            posRef.current.v = 0
            apply(posRef.current.x)
          }
        },
      })

      const onWheel = (e: WheelEvent) => {
        const self = st
        const inView = self.isActive
        if (!inView) return

        // Compute bounds and decide whether to consume wheel
        const { max } = dimsRef.current
        const atStart = posRef.current.x >= -1
        const atEnd = posRef.current.x <= -max + 1
        if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) return

        e.preventDefault()
        posRef.current.v += -Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) * 0.65, 80)
        posRef.current.v = clamp(posRef.current.v, -140, 140)
      }

      viewport.addEventListener('wheel', onWheel, { passive: false })

      cleanup = () => {
        viewport.removeEventListener('wheel', onWheel as EventListener)
        st.kill()
      }
    }

    init()
    return () => {
      cancelled = true
      if (cleanup) cleanup()
    }
  }, [apply, updateDims])

  // Drag / swipe physics
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    draggingRef.current = true
    startRef.current = { x: e.clientX, scroll: posRef.current.x, t: performance.now() }
    lastRef.current = { x: e.clientX, t: performance.now() }
    posRef.current.v = 0
    ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return
    const dx = e.clientX - startRef.current.x
    let nextX = startRef.current.scroll + dx

    // Rubber-band at edges
    const { max } = dimsRef.current
    if (nextX > 0) nextX = nextX * 0.35
    else if (nextX < -max) nextX = -max + (nextX + max) * 0.35

    posRef.current.x = nextX
    const now = performance.now()
    const dt = Math.max((now - lastRef.current.t) / 1000, 0.001)
    posRef.current.v = (e.clientX - lastRef.current.x) / dt / 60
    lastRef.current = { x: e.clientX, t: now }
    apply(nextX)
  }, [apply])

  const onPointerUp = useCallback(() => {
    draggingRef.current = false
    const { max } = dimsRef.current
    // Momentum throw with friction from current velocity
    posRef.current.v = clamp(posRef.current.v * 0.8, -120, 120)
    // If near edge, spring back
    if (posRef.current.x > 0) posRef.current.v += -posRef.current.x * 0.15
    if (posRef.current.x < -max) posRef.current.v += (-max - posRef.current.x) * 0.15
  }, [])

  return (
    <section
      ref={sectionRef}
      id="tracks"
      className="relative bg-void min-h-[100dvh] overflow-hidden select-none"
      aria-label="Ataraxia tracklist"
    >
      {/* Cockpit structural grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 grid-skeleton"
        style={{ backgroundSize: '160px 160px', opacity: 0.25 }}
      />

      {/* Chroma gradient grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[1] opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,221,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,221,0.08) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* Top catalog strip */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-signal">
          TSM-008 // WAREHOUSE PROTOCOL
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-light-muted hidden md:block">
          9 TRACKS · 48:18
        </span>
      </div>

      {/* Kinetic BPM marquee */}
      <div className="absolute top-16 left-0 right-0 z-20 overflow-hidden border-y border-edge-subtle py-2">
        <div
          className="whitespace-nowrap"
          style={{
            animation: 'marquee 18s linear infinite',
          }}
        >
          {Array.from({ length: 8 }).map((_, group) => (
            <span key={group} className="inline-flex">
              {bpmValues.map((bpm, i) => (
                <span
                  key={`${group}-${i}`}
                  className="inline-flex items-center gap-2 mx-8"
                >
                  <span className="font-mono text-xs text-signal">{String(bpm).padStart(3, '0')}</span>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted">BPM</span>
                  <span className="w-6 h-px bg-edge-subtle" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Massive watermark */}
      <div
        aria-hidden="true"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1] pointer-events-none"
      >
        <span className="catalog-massive text-[38vw] md:text-[30vw]">MR-008</span>
      </div>

      {/* Horizontal drag viewport */}
      <div
        ref={viewportRef}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[68vh] min-h-[420px] overflow-hidden z-10 cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          ref={railRef}
          className="flex h-full will-change-transform"
          style={{ transform: 'translate3d(0,0,0)' }}
        >
          {tracks.map((track, i) => (
            <TrackCard key={track.name} track={track} index={i} />
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-6 right-6 z-20 flex items-center gap-4">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted">
          {String(Math.round(progress * 100)).padStart(2, '0')}%
        </span>
        <div className="flex-1 h-px bg-edge-subtle relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-signal"
            style={{ width: `${progress * 100}%`, transition: 'width 0.1s linear' }}
          />
        </div>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-light-muted">
          DRAG / SCROLL
        </span>
      </div>
    </section>
  )
}

function TrackCard({ track, index }: { track: typeof tracks[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const rafRef = useRef<number | null>(null)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false })

  useEffect(() => {
    if (prefersReducedMotion()) return
    const card = cardRef.current
    if (!card) return

    let active = true
    const smooth = () => {
      if (!active) return
      tiltRef.current.x = lerp(tiltRef.current.x, tiltRef.current.tx, 0.12)
      tiltRef.current.y = lerp(tiltRef.current.y, tiltRef.current.ty, 0.12)
      card.style.transform = `perspective(900px) rotateX(${tiltRef.current.y}deg) rotateY(${tiltRef.current.x}deg)`
      rafRef.current = requestAnimationFrame(smooth)
    }

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      tiltRef.current.tx = (px - 0.5) * 14
      tiltRef.current.ty = (0.5 - py) * 10
      setSpotlight({ x: px * 100, y: py * 100, active: true })
    }

    const onLeave = () => {
      tiltRef.current.tx = 0
      tiltRef.current.ty = 0
      setSpotlight((s) => ({ ...s, active: false }))
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    rafRef.current = requestAnimationFrame(smooth)

    return () => {
      active = false
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <article
      ref={cardRef}
      className="track-card group relative flex-shrink-0 w-[86vw] md:w-[42vw] lg:w-[32vw] h-full px-5 md:px-7 py-6 flex flex-col justify-between overflow-hidden"
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Chroma grid + cyan gradient border wrapper */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 chroma-border"
        style={{
          background:
            'linear-gradient(135deg, rgba(0,255,221,0.14) 0%, rgba(0,255,221,0.02) 40%, rgba(0,255,221,0.02) 60%, rgba(0,255,221,0.14) 100%)',
          padding: '1px',
        }}
      >
        <div
          className="w-full h-full bg-void-raised"
          style={{
            backgroundImage:
              'linear-gradient(rgba(236,232,217,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(236,232,217,0.045) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Spotlight border */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none transition-opacity duration-300"
        style={{
          opacity: spotlight.active ? 1 : 0,
          background: `radial-gradient(circle 260px at ${spotlight.x}% ${spotlight.y}%, rgba(0,255,221,0.18), transparent 65%)`,
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Scanline overlay */}
      <div
        aria-hidden="true"
        className="scanlines absolute inset-0 z-[3] opacity-[0.22] group-hover:opacity-[0.45] transition-opacity duration-300 pointer-events-none"
      />

      {/* Edge glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 80px rgba(0,255,221,0.08)',
        }}
      />

      {/* Top index strip */}
      <div className="relative z-10 flex items-start justify-between border-b border-edge-faint pb-3 mb-3">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-signal">{track.num}</span>
        <span className="font-mono text-[10px] tracking-[0.15em] text-light-muted">{String(index + 1).padStart(2, '0')} / 09</span>
      </div>

      {/* Track data */}
      <div className="relative z-10">
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.04em] uppercase leading-[0.9] text-cream group-hover:text-neon transition-colors duration-300">
          {track.name}
        </h3>

        {/* Bento metadata strips */}
        <div className="mt-5 meta-strip">
          <div className="grid grid-cols-3 divide-x divide-edge-faint">
            <div className="p-2.5 md:p-3">
              <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-light-muted mb-0.5">BPM</div>
              <div className="font-mono text-lg md:text-xl tracking-[-0.02em] text-cream data-tick">{track.bpm}</div>
            </div>
            <div className="p-2.5 md:p-3">
              <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-light-muted mb-0.5">KEY</div>
              <div className="font-mono text-lg md:text-xl tracking-[-0.02em] text-cream">{track.key}</div>
            </div>
            <div className="p-2.5 md:p-3">
              <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-light-muted mb-0.5">DUR</div>
              <div className="font-mono text-lg md:text-xl tracking-[-0.02em] text-cream">{track.duration}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom label stamp */}
      <div className="relative z-10 mt-auto pt-3 border-t border-edge-faint flex items-center justify-between">
        <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-light-muted">MANTEIS RECORDINGS</span>
        <div className="relative border border-edge-subtle px-2 py-0.5 overflow-hidden">
          <div className="absolute inset-0 stamp-texture" aria-hidden="true" />
          <span className="relative font-mono text-[8px] tracking-[0.2em] uppercase text-signal">MR-008</span>
        </div>
      </div>

      {/* Connector */}
      {index < tracks.length - 1 && (
        <svg
          className="absolute -right-[1px] top-1/2 -translate-y-1/2 w-[40px] h-[40%] z-20 pointer-events-none"
          viewBox="0 0 40 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="0" y1="50" x2="40" y2="50" className="connector-line pulse-connector" style={{ strokeDasharray: '6 4' }} />
          <circle cx="38" cy="50" r="2.5" fill="rgba(0,255,221,0.55)" className="pulse-connector" />
        </svg>
      )}
    </article>
  )
}
