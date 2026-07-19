'use client'

import { useEffect, useState } from 'react'
import { Gatekeeper } from '@/components/layout/Gatekeeper'
import { Navigation } from '@/components/layout/Navigation'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Hero } from '@/components/animation/Hero'
import { Specs } from '@/components/sections/Specs'
import { Release } from '@/components/sections/Release'
import { Manifesto } from '@/components/sections/Manifesto'
import { CTASection } from '@/components/ui/CTASection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  const [entered, setEntered] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('thesan-entered') === 'true'
    }
    return false
  })

  useEffect(() => {
    const handleEnter = () => {
      sessionStorage.setItem('thesan-entered', 'true')
      setEntered(true)
    }

    window.addEventListener('thesan-enter', handleEnter)
    return () => window.removeEventListener('thesan-enter', handleEnter)
  }, [])

  return (
    <>
      <Gatekeeper />
      {entered && (
        <SmoothScroll>
          <header>
            <Navigation />
          </header>
          <main id="main-content" tabIndex={-1}>
            <Hero />
            <Specs />
            <Release />
            <Manifesto />
            <CTASection />
          </main>
          <Footer />
        </SmoothScroll>
      )}
    </>
  )
}