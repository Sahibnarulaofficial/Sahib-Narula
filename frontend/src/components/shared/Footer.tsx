import React from 'react'
import { Container } from '@/components/ui/Container'

export const Footer: React.FC = () => {
  return (
    <footer className="border-border-subtle bg-bg-base text-text-secondary border-t py-6 font-sans text-xs font-medium select-none">
      <Container className="flex items-center justify-between">
        <div>© <span className="font-mono">{new Date().getFullYear()}</span> Sahib Narula. All rights reserved.</div>
        <div className="flex gap-2 font-sans font-medium tracking-wider uppercase">
          <span>BUILDING</span>
          <span className="text-accent-red">●</span>
          <span>LEARNING</span>
          <span className="text-accent-red">●</span>
          <span>SHIPPING</span>
        </div>
      </Container>
    </footer>
  )
}
