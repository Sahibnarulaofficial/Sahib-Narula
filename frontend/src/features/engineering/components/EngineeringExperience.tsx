import React from 'react'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

interface ProtocolConfig {
  title: string
  description: string
}

export const EngineeringExperience: React.FC = () => {
  const protocols: ProtocolConfig[] = [
    {
      title: 'SECURITY FIRST',
      description:
        'Implementing role-based access tokens, strict JWT session boundary verifications, and parameterized inputs at the API entry point of every microservice to block unauthorized system leaks.',
    },
    {
      title: 'PERFORMANCE FIRST',
      description:
        'Enforcing strict limits on static bundle footprints, code-splitting client routes dynamically, and auditing telemetry cycle latency to ensure smooth sub-100ms interface operations.',
    },
    {
      title: 'DOCUMENTATION FIRST',
      description:
        'Maintaining comprehensive OpenAPI schemas, strongly-typed interface payloads, and descriptive task blueprints to minimize onboarding friction and optimize developer collaboration cycles.',
    },
    {
      title: 'PROTOCOL DRIVEN',
      description:
        'Encapsulating systems into decoupled domain boundaries, utilizing strict modular rules, and requiring declarative API contracts to guarantee code maintainability over time.',
    },
  ]

  return (
    <section
      id="engineering"
      className="flex flex-col gap-4"
      aria-labelledby="engineering-experience-heading"
    >
      <ScrollReveal direction="up">
        <SectionHeader
          id="engineering-experience-heading"
          title="ENGINEERING EXPERIENCE"
          subtitle="Core standards and system development guidelines"
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {protocols.map((protocol, index) => (
          <ScrollReveal key={protocol.title} direction="up" delay={index * 100}>
            <Card
              className="flex h-full flex-col gap-2 font-sans text-sm"
              aria-label={`Engineering protocol: ${protocol.title}`}
            >
              <h3 className="text-text-primary font-mono text-xs font-bold tracking-wider uppercase">
                {protocol.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">{protocol.description}</p>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
