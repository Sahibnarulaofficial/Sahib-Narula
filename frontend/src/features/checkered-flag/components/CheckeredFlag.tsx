import React from 'react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const CheckeredFlag: React.FC = () => {
  return (
    <section
      id="checkered-flag"
      className="flex flex-col items-center justify-center py-16 text-center select-none"
      aria-label="Checkered flag final sign-off"
    >
      <ScrollReveal direction="up">
        <div id="checkered-flag-title" className="scroll-mt-28">
          {/* Checkered Flag Icon Flag */}
          <span
            className="text-accent-red mb-8 inline-block text-2xl font-normal"
            aria-hidden="true"
          >
            ⚑
          </span>

          <div className="text-text-secondary flex flex-col gap-3 font-sans text-xs font-medium tracking-widest uppercase">
            <span className="text-text-primary font-orbitron text-sm font-bold sm:text-base">UNTIL NEXT BUILD.</span>
            <span>KEEP LEARNING.</span>
            <span>KEEP BUILDING.</span>
            <span>KEEP SHIPPING.</span>
            <span className="text-text-secondary mt-2 text-xs font-medium">
              SEE YOU AT THE NEXT CHECKERED FLAG.
            </span>
          </div>

          <div className="mt-10 flex flex-col gap-1 text-center">
            <span className="text-text-primary font-orbitron text-sm font-bold tracking-wider uppercase">
              SAHIB NARULA
            </span>
            <span className="text-text-secondary font-sans text-xs font-medium tracking-wider uppercase">
              AI ENGINEER &amp; SYSTEMS BUILDER
            </span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
