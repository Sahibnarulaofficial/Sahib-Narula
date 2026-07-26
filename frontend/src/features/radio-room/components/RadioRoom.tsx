import React from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { GarageAccessPass } from './GarageAccessPass'

interface Channel {
  name: string
  label: string
  url: string
  image: string
}

export const RadioRoom: React.FC = () => {
  const channels: Channel[] = [
    {
      name: 'GITHUB',
      label: 'Explore open source machinery, telemetry log scripts, and codebase history logs.',
      url: 'https://github.com',
      image: '/images/helmets(contact)/GitHub.png',
    },
    {
      name: 'LINKEDIN',
      label: 'Connect to discuss systems design, AI agent integrations, and tech leadership.',
      url: 'https://linkedin.com',
      image: '/images/helmets(contact)/LinkedIn.png',
    },
    {
      name: 'EMAIL',
      label: 'Open a secure channel to discuss custom software products and consultancies.',
      url: 'mailto:hello@sahibnarula.com',
      image: '/images/helmets(contact)/EMail.png',
    },
    {
      name: 'RESUME',
      label: 'Export a PDF of my technical background, core specs, and shipping achievements.',
      url: '#',
      image: '/images/helmets(contact)/Resume.png',
    },
  ]

  return (
    <section
      id="radio-room"
      className="flex flex-col gap-12 md:gap-16"
      aria-labelledby="radio-room-title"
    >
      <ScrollReveal direction="up">
        <SectionHeader
          id="radio-room-title"
          title="RADIO ROOM"
          subtitle="BUILDING THINGS TOGETHER."
          className="scroll-mt-28"
        />
      </ScrollReveal>

      {/* Horizontal Container for 3D Flipping Helmet Cards */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {channels.map((channel, index) => (
          <ScrollReveal key={channel.name} direction="up" delay={index * 100}>
            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:ring-border-focus focus-visible:ring-offset-bg-base rounded-medium block focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-label={`Connect via ${channel.name}`}
            >
              <div className="flip-card h-44 w-44 md:h-48 md:w-48">
                <div className="flip-card-inner">
                  {/* Front of Card: Helmet Image */}
                  <div className="flip-card-front bg-bg-surface border-border-subtle flex items-center justify-center border">
                    <img
                      src={channel.image}
                      alt={`${channel.name} helmet`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Back of Card: Title, Description and Link Actions */}
                  <div className="flip-card-back bg-bg-surface border-border-subtle hover:border-text-primary/60 flex flex-col justify-between border p-4 text-center">
                    <h4 className="text-text-primary font-mono text-xs font-bold tracking-wider uppercase">
                      {channel.name}
                    </h4>
                    <p className="text-text-secondary text-[11px] leading-relaxed">
                      {channel.label}
                    </p>
                    <span className="text-text-muted font-mono text-[9px] font-semibold tracking-wider uppercase">
                      CONNECT ❯
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>

      {/* Garage Access Pass VIP Paddock Credential Form */}
      <ScrollReveal direction="up" delay={200} className="mt-8 sm:mt-12">
        <GarageAccessPass />
      </ScrollReveal>
    </section>
  )
}
