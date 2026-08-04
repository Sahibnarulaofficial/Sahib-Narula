import React from 'react'
import { Card } from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import { StatusIndicator } from '@/components/shared/StatusIndicator'

export interface MachineCardProps {
  name: string
  mission: string
  version: string
  status: 'active' | 'inactive' | 'loading'
  statusLabel?: string
  devStatus?: string
  lightColor?: 'red' | 'green' | 'yellow'
  litCount?: number
  technologies: string[]
  architecture: string[]
  whyItExists: string
  futureDirection: string
  thumbnailUrl?: string
}

export const MachineCard: React.FC<MachineCardProps> = ({
  name,
  mission,
  version,
  lightColor,
  litCount,
  technologies,
  architecture,
  whyItExists,
  futureDirection,
  thumbnailUrl,
}) => {
  return (
    <Card
      className="flex h-full flex-col justify-between p-5 md:p-6"
      aria-label={`Specifications board for ${name}`}
    >
      <div className="flex flex-col gap-4 font-sans text-sm flex-grow justify-between">
        <div className="flex flex-col gap-4">
          {/* Project Thumbnail Image Container */}
          <div className="group border-border-subtle bg-bg-surface gloss-overlay rounded-medium relative mb-1 h-44 w-full shrink-0 overflow-hidden border sm:h-48">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={`${name} project thumbnail`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="text-text-muted flex h-full w-full items-center justify-center bg-zinc-900/80 font-mono text-xs">
                <span>[ THUMBNAIL PLACEHOLDER ]</span>
              </div>
            )}
          </div>

          {/* Header Grid */}
          <div className="flex items-start justify-between min-h-[44px]">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-text-primary font-space text-lg font-bold tracking-tight sm:text-xl">
                {name}
              </h3>
              <span className="text-text-muted font-mono text-xs">{version}</span>
            </div>
            <StatusIndicator color={lightColor} litCount={litCount} />
          </div>

          {/* Mission statement */}
          <div className="flex flex-col gap-0.5 text-xs min-h-[48px]">
            <span className="text-accent-red font-sans text-[10px] font-medium tracking-wider uppercase">Mission</span>
            <p className="text-text-primary font-sans text-xs leading-normal font-medium sm:text-sm">
              {mission}
            </p>
          </div>

          {/* Why It Exists */}
          <div className="flex flex-col gap-1 text-xs sm:text-sm min-h-[72px]">
            <span className="text-text-secondary font-sans text-[10px] font-medium tracking-wider uppercase">Why It Exists</span>
            <p className="text-text-secondary font-sans leading-relaxed">{whyItExists}</p>
          </div>

          {/* Core Architecture */}
          <div className="flex flex-col gap-1.5 text-xs sm:text-sm flex-grow">
            <span className="text-text-secondary font-sans text-[10px] font-medium tracking-wider uppercase">Core Architecture</span>
            <ul className="text-text-secondary font-sans flex list-disc flex-col gap-1 pl-4 leading-relaxed">
              {architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Future Direction */}
          <div className="flex flex-col gap-1 text-xs sm:text-sm min-h-[72px]">
            <span className="text-text-secondary font-sans text-[10px] font-medium tracking-wider uppercase">Future Direction</span>
            <p className="text-text-secondary font-sans leading-relaxed">{futureDirection}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <Divider spacing="none" />

          {/* Tech tags */}
          <div className="flex flex-col gap-1.5">
            <span className="text-text-secondary font-sans text-[10px] font-medium tracking-wider uppercase">Technologies Used</span>
            <div className="flex flex-wrap gap-1.5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-subtle bg-bg-surface-hover border-border-subtle text-text-secondary border px-2 py-0.5 font-mono text-[10px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
