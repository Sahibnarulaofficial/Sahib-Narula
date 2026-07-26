import React from 'react'
import { Navigation } from '@/features/navigation/components/Navigation'
import { Footer } from '@/components/shared/Footer'
import { Container } from '@/components/ui/Container'
import { GlobalBackground } from '@/components/shared/GlobalBackground'

interface PrimaryLayoutProps {
  children: React.ReactNode
  heroSlot?: React.ReactNode
}

export const PrimaryLayout: React.FC<PrimaryLayoutProps> = ({ children, heroSlot }) => {
  return (
    <div className="text-text-primary selection:bg-brand-primary/30 selection:text-brand-primary relative flex min-h-screen flex-col justify-between font-sans">
      {/* Global Engineering Blueprint Background System — spans entire website */}
      <GlobalBackground />

      {/* Header Landmark — Layer 6 (topmost) */}
      <Navigation />

      {/* Hero Section — Full viewport width, outside the container */}
      {heroSlot && <div className="relative z-10 w-full pt-16 md:pt-20">{heroSlot}</div>}

      {/* Main Content — Constrained column layout */}
      <main className="relative z-10 flex flex-grow pb-10 md:pb-16">
        <Container className="flex w-full max-w-6xl flex-col gap-16 px-6 md:gap-24 lg:max-w-7xl xl:max-w-[1400px]">
          {children}
        </Container>
      </main>

      {/* Footer Landmark */}
      <Footer />
    </div>
  )
}
