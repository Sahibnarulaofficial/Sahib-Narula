import React from 'react'
import { Card } from '@/components/ui/Card'

export const ProfileCard: React.FC = () => {
  return (
    <Card
      className="flex h-full flex-col gap-5 font-sans text-sm"
      aria-label="Sahib Narula - Core Biography Card"
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-text-primary font-space text-lg font-bold tracking-tight">
          WHO AM I?
        </h3>
        <p className="text-text-secondary font-sans leading-relaxed">
          I am Sahib Narula — a systems engineer, AI builder, and software craftsman who views
          coding as high-precision manufacturing. I specialize in designing and deploying
          low-latency web applications, modular AI microservices, and reactive data pipelines that
          prioritize speed, security, and developer ergonomics.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-text-secondary font-sans text-[10px] font-medium tracking-wider uppercase">WHY DO I BUILD?</span>
        <p className="text-text-secondary font-sans leading-relaxed">
          To build software that feels like driving a finely-tuned sports car: precise, responsive,
          and robust. I aim to create architectures that solve structural user needs, minimize
          computational overhead, and push the envelope of browser runtime capabilities.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-text-secondary font-sans text-[10px] font-medium tracking-wider uppercase">PHILOSOPHY</span>
        <p className="text-text-secondary font-sans leading-relaxed">
          Code should be self-documenting, interfaces should load instantly, and backend systems
          should scale automatically. I treat security boundaries, clean telemetry logs, and
          comprehensive test pipelines as core deliverables, not afterthoughts.
        </p>
      </div>
    </Card>
  )
}
