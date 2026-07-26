'use client'

import { Navigation } from '@/components/layout/Navigation'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Hero } from '@/components/animation/Hero'
import { Specs } from '@/components/sections/Specs'
import { Release } from '@/components/sections/Release'
import { Tracks } from '@/components/sections/Tracks'
import { Manifesto } from '@/components/sections/Manifesto'
import { CTASection } from '@/components/ui/CTASection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <SmoothScroll>
        <header>
          <Navigation />
        </header>
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Specs />
          <Release />
          <Tracks />
          <Manifesto />
          <CTASection />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  )
}
