import React from 'react'
import { Navigation } from '@/features/navigation/components/Navigation'
import { Footer } from '@/components/shared/Footer'
import { Container } from '@/components/ui/Container'

interface PrimaryLayoutProps {
  children: React.ReactNode
}

export const PrimaryLayout: React.FC<PrimaryLayoutProps> = ({ children }) => {
  return (
    <div className="text-text-primary selection:bg-brand-primary/30 selection:text-brand-primary relative flex min-h-screen flex-col justify-between overflow-hidden bg-zinc-950 font-sans">
      {/* Background ambient lighting effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(239,68,68,0.06),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_35%,rgba(161,161,170,0.04),transparent_45%)]" />

      {/* Header Landmark */}
      <Navigation />

      {/* Main Content (Centered column layout with responsive spacing) */}
      <main className="relative z-10 flex flex-grow pt-24 pb-10 md:pt-28 md:pb-16">
        <Container className="flex w-full max-w-3xl flex-col gap-16 px-6 md:gap-24">
          {children}
        </Container>
      </main>

      {/* Footer Landmark */}
      <Footer />
    </div>
  )
}
