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
            className="text-status-error mb-8 inline-block text-2xl font-normal"
            aria-hidden="true"
          >
            ⚑
          </span>

          <div className="text-text-secondary flex flex-col gap-3 font-mono text-xs font-semibold tracking-widest uppercase">
            <span className="text-text-primary">UNTIL NEXT BUILD.</span>
            <span>KEEP LEARNING.</span>
            <span>KEEP BUILDING.</span>
            <span>KEEP SHIPPING.</span>
            <span className="text-text-muted mt-2 text-[10px]">
              SEE YOU AT THE NEXT CHECKERED FLAG.
            </span>
          </div>

          <div className="mt-10 flex flex-col gap-1 text-center font-mono">
            <span className="text-text-primary text-sm font-bold tracking-widest uppercase">
              SAHIB NARULA
            </span>
            <span className="text-text-muted text-[9px] tracking-wider uppercase">
              PROJECT GARAGE
            </span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
