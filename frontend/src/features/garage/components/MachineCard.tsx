import React from 'react'
import { Card } from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import { Button } from '@/components/ui/Button'
import { StatusIndicator } from '@/components/shared/StatusIndicator'

export interface MachineCardProps {
  name: string
  mission: string
  version: string
  status: 'active' | 'inactive' | 'loading'
  statusLabel: string
  devStatus: string
  technologies: string[]
  architecture: string[]
  whyItExists: string
  futureDirection: string
}

export const MachineCard: React.FC<MachineCardProps> = ({
  name,
  mission,
  version,
  status,
  statusLabel,
  devStatus,
  technologies,
  architecture,
  whyItExists,
  futureDirection,
}) => {
  return (
    <Card className="flex flex-col justify-between" aria-label={`Specifications board for ${name}`}>
      <div className="flex flex-col gap-4 font-sans text-sm">
        {/* Header Grid */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-text-primary font-mono text-sm font-semibold">{name}</h3>
            <span className="text-text-muted font-mono text-[9px]">{version}</span>
          </div>
          <StatusIndicator label={statusLabel} status={status} />
        </div>

        {/* Development Stage */}
        <div className="text-text-secondary inline-flex items-center gap-1.5 font-mono text-[10px] font-medium">
          <span className="text-text-muted">STAGE:</span>
          <span className="text-brand-primary">{devStatus}</span>
        </div>

        {/* Mission statement */}
        <div className="flex flex-col gap-0.5 text-xs">
          <span className="text-text-muted font-mono text-[9px] uppercase">Mission</span>
          <p className="text-text-primary font-mono text-xs leading-normal font-semibold">
            {mission}
          </p>
        </div>

        {/* Why It Exists */}
        <div className="flex flex-col gap-1 text-xs">
          <span className="text-text-muted font-mono text-[9px] uppercase">Why It Exists</span>
          <p className="text-text-secondary leading-relaxed">{whyItExists}</p>
        </div>

        {/* Core Architecture */}
        <div className="flex flex-col gap-1.5 text-xs">
          <span className="text-text-muted font-mono text-[9px] uppercase">Core Architecture</span>
          <ul className="text-text-secondary flex list-disc flex-col gap-0.5 pl-4 leading-relaxed">
            {architecture.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Future Direction */}
        <div className="flex flex-col gap-1 text-xs">
          <span className="text-text-muted font-mono text-[9px] uppercase">Future Direction</span>
          <p className="text-text-secondary leading-relaxed">{futureDirection}</p>
        </div>

        <Divider spacing="none" />

        {/* Tech tags */}
        <div className="flex flex-col gap-1.5">
          <span className="text-text-muted font-mono text-[9px] uppercase">Technologies Used</span>
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-subtle bg-bg-surface border-border-subtle text-text-secondary border px-2 py-0.5 font-mono text-[9px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button variant="outline" className="w-full">
          Enter Machine
        </Button>
      </div>
    </Card>
  )
}
