import React from 'react'
import { Card } from '@/components/ui/Card'

export const StatsCard: React.FC = () => {
  const topics = [
    {
      name: 'Software Engineering',
      desc: 'Mastering modular architecture patterns, clean testing setups, and advanced build toolchains to optimize React compilation pipelines.',
    },
    {
      name: 'Artificial Intelligence',
      desc: 'Implementing autonomous agent reasoning cycles, custom RAG indexing pipelines, and local LLM orchestration using Python and Go.',
    },
    {
      name: 'Product Design & Ergonomics',
      desc: 'Developing high-fidelity micro-interactions, responsive typographic grids, and accessible layout flows to improve engagement.',
    },
    {
      name: 'Distributed Systems Design',
      desc: 'Understanding distributed event streams, multi-tenant databases, real-time sync engines, and telemetry monitoring frameworks.',
    },
  ]

  return (
    <Card
      className="flex h-full flex-col gap-4 font-sans text-sm"
      aria-label="Currently Learning Focus Board"
    >
      <h3 className="text-text-primary font-space text-lg font-bold tracking-tight">
        WHAT AM I CURRENTLY LEARNING?
      </h3>

      <div className="flex flex-col gap-3.5">
        {topics.map((topic) => (
          <div key={topic.name} className="flex flex-col gap-0.5">
            <h4 className="text-text-primary font-space text-sm font-bold">{topic.name}</h4>
            <p className="text-text-secondary font-sans text-xs leading-relaxed">{topic.desc}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
