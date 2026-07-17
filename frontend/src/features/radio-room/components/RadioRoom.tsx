import React from 'react'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

interface Channel {
  name: string
  label: string
  url: string
}

export const RadioRoom: React.FC = () => {
  const channels: Channel[] = [
    {
      name: 'GITHUB',
      label: 'Explore open source machinery, telemetry log scripts, and codebase history logs.',
      url: 'https://github.com',
    },
    {
      name: 'LINKEDIN',
      label: 'Connect to discuss systems design, AI agent integrations, and tech leadership.',
      url: 'https://linkedin.com',
    },
    {
      name: 'EMAIL',
      label: 'Open a secure channel to discuss custom software products and consultancies.',
      url: 'mailto:hello@sahibnarula.com',
    },
    {
      name: 'RESUME',
      label: 'Export a PDF of my technical background, core specs, and shipping achievements.',
      url: '#',
    },
  ]

  return (
    <section id="radio-room" className="flex flex-col gap-4" aria-labelledby="radio-heading">
      <ScrollReveal direction="up">
        <SectionHeader id="radio-heading" title="RADIO ROOM" subtitle="BUILDING THINGS TOGETHER." />
      </ScrollReveal>

      <div className="flex flex-col gap-4">
        <ScrollReveal direction="up" delay={100}>
          <p className="text-text-secondary max-w-xl font-mono text-xs leading-relaxed">
            If you have an engineering challenge that demands structural systems design, clean data
            modeling, and performance optimization, let's collaborate. Project Garage is open for
            architectural consulting, custom AI agent setups, and scalable frontend integrations.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {channels.map((channel, index) => (
            <ScrollReveal key={channel.name} direction="up" delay={index * 100 + 150}>
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full focus-visible:outline-none"
              >
                <Card className="border-border-subtle hover:border-text-primary/60 flex h-full flex-col gap-2 border p-5 font-sans text-sm transition-all duration-200">
                  <h4 className="text-text-primary flex items-center justify-between font-mono text-xs font-bold tracking-wider uppercase">
                    {channel.name}
                    <span className="text-text-muted group-hover:text-text-primary text-[10px] transition-colors">
                      ❯
                    </span>
                  </h4>
                  <p className="text-text-secondary leading-relaxed">{channel.label}</p>
                </Card>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
