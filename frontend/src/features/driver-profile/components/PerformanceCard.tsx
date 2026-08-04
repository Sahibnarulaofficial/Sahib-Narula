import React from 'react'
import { Card } from '@/components/ui/Card'

export const PerformanceCard: React.FC = () => {
  const statuses = [
    {
      label: 'BUILDING - APTLYST AI',
      desc: 'Refining the real-time audio pipeline and connecting action triggers directly to developer tickets.',
    },
    {
      label: 'STAGING - REVIVEOPS AI',
      desc: 'Validating Kubernetes event log parsers on staging clusters to ensure clean scaling behavior.',
    },
    {
      label: 'PLANNING - FUTURE SYSTEM',
      desc: 'Drafting Rust-to-WASM compilation protocols to run code syntax reviews directly inside user browsers.',
    },
  ]

  return (
    <Card
      className="flex h-full flex-col gap-4 font-sans text-sm"
      aria-label="Active Developer Status Panel"
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-text-primary font-space text-lg font-bold tracking-tight">
          WHAT AM I CURRENTLY BUILDING?
        </h3>
        <p className="text-text-secondary font-sans leading-relaxed">
          I maintain a tight shipping loop focused on building and testing modular SaaS products,
          generative AI productivity toolkits, and infrastructure telemetry log daemons.
        </p>
      </div>

      <div className="mt-1 flex flex-col gap-3">
        <span className="text-text-secondary font-sans text-[10px] font-medium tracking-wider uppercase">Active Shipping Log</span>
        <div className="flex flex-col gap-3.5">
          {statuses.map((status) => (
            <div key={status.label} className="flex items-start gap-3">
              <span className="bg-accent-red mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
              <div className="flex flex-col gap-0.5">
                <span className="text-text-primary font-mono text-xs font-semibold tracking-wider uppercase">
                  {status.label}
                </span>
                <p className="text-text-secondary font-sans text-xs leading-relaxed">{status.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
