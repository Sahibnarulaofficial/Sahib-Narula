import React from 'react'
import { Container } from '@/components/ui/Container'

export const Footer: React.FC = () => {
  return (
    <footer className="border-border-subtle bg-bg-base text-text-muted border-t py-6 font-mono text-[9px] select-none">
      <Container className="flex items-center justify-between">
        <div>© {new Date().getFullYear()} Project Garage. By Sahib Narula.</div>
        <div className="flex gap-2">
          <span>BUILDING</span>
          <span>●</span>
          <span>LEARNING</span>
          <span>●</span>
          <span>SHIPPING</span>
        </div>
      </Container>
    </footer>
  )
}
