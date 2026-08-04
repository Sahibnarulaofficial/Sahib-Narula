import React from 'react'
import { MachineCard, type MachineCardProps } from './MachineCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const GarageExperience: React.FC = () => {
  const machines: MachineCardProps[] = [
    {
      name: 'APTLYST AI',
      mission: 'AI Meeting Copilot Platform',
      version: 'v1.0.0',
      status: 'active',
      statusLabel: 'IN PRODUCTION',
      lightColor: 'red',
      litCount: 2,
      devStatus: 'ACTIVE PRODUCTION',
      technologies: ['React', 'TypeScript', 'Node.js', 'LLMs', 'WebRTC'],
      architecture: [
        'Real-time audio processing pipeline via WebRTC protocols',
        'Structured spec extraction engine powered by OpenAI JSON schemas',
        'Autonomous task generation workers mapping directly to Jira APIs',
      ],
      whyItExists:
        'To transform raw spoken discussions into structured, action-oriented engineering specifications, removing manual summarization delays and alignment friction.',
      futureDirection:
        'Integrating autonomous repository scaffolding to generate schema changes, DB migrations, and boilerplate API routes directly from voice transcripts.',
      thumbnailUrl: '/images/Projects%20Thumbnail/Aptlyst%20AI/Car.png',
    },
    {
      name: 'REVIVEOPS AI',
      mission: 'Agentic Workflow Optimizer',
      version: 'v0.8.0-beta',
      status: 'active',
      statusLabel: 'ONLINE',
      lightColor: 'green',
      litCount: 5,
      devStatus: 'BETA TESTING',
      technologies: ['Python', 'Go', 'Kubernetes', 'Prometheus'],
      architecture: [
        'Structured log parsing adapters for Kubernetes system event files',
        'Multi-threaded Go daemon agents reporting local CPU/Memory cycles',
        'Prometheus metric collectors triggering Slack alerts on load anomalies',
      ],
      whyItExists:
        'To actively scan server system infrastructure logs, anticipate hardware limits, and resolve bottlenecks before they impact users, safeguarding uptime.',
      futureDirection:
        'Expanding predictive auto-scaling triggers to dynamically shift server load allocations across cloud provider regions.',
      thumbnailUrl: '/images/Projects%20Thumbnail/ReviveOps%20AI/Car.png',
    },
    {
      name: 'FUTURE SYSTEM - ALPHA',
      mission: 'Autonomous Protocol Engine',
      version: 'v0.1.0',
      status: 'loading',
      statusLabel: 'UPCOMING',
      lightColor: 'yellow',
      litCount: 5,
      devStatus: 'CONCEPT / IN PLANNING',
      technologies: ['Rust', 'WASM', 'Git'],
      architecture: [
        'Local WebAssembly container sandboxes for browser compile checks',
        'Rust-compiled syntax tree parser validating code commits',
        'Decentralized repository integrity validation signatures',
      ],
      whyItExists:
        'To safely check, compile, and merge code updates across multiple repositories automatically, ensuring zero integration failures and instant verification.',
      futureDirection:
        'Developing local WebAssembly compile sandboxes to confirm syntax and lint checks instantly inside the browser environment before commit pushes.',
      thumbnailUrl: '/images/Projects%20Thumbnail/Upcoming/Car.png',
    },
  ]

  return (
    <section
      id="garage"
      className="flex flex-col gap-6 lg:min-h-[calc(100vh-140px)] lg:justify-center"
      aria-labelledby="garage-title"
    >
      <ScrollReveal direction="up">
        <SectionHeader
          id="garage-title"
          title="GARAGE EXPERIENCE"
          subtitle="Engineered systems designed for precision, performance, and scale"
          className="scroll-mt-28"
        />
      </ScrollReveal>

      {/* Widened Grid Layout for Machine Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {machines.map((machine, index) => (
          <ScrollReveal key={machine.name} direction="left" delay={index * 150} className="h-full">
            <MachineCard {...machine} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
