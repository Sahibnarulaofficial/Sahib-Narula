import React from 'react'
import { Navigation } from '@/features/navigation/components/Navigation'
import { Footer } from '@/components/shared/Footer'

interface PrimaryLayoutProps {
  children: React.ReactNode
}

export const PrimaryLayout: React.FC<PrimaryLayoutProps> = ({ children }) => {
  return (
    <div className="bg-bg-base text-text-primary selection:bg-brand-primary/30 selection:text-brand-primary flex min-h-screen flex-col justify-between font-sans">
      {/* Header Landmark */}
      <header className="border-border-subtle bg-bg-surface/40 sticky top-0 z-50 border-b backdrop-blur-md">
        <Navigation />
      </header>

      {/* Main Landmark */}
      <main className="gap-layout-gap-lg mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-12">
        {children}
      </main>

      {/* Footer Landmark */}
      <Footer />
    </div>
  )
}
