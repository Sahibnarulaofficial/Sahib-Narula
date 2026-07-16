import React from 'react'

export const StartupSequencePlaceholder: React.FC = () => {
  return (
    <section
      id="startup-sequence"
      className="rounded-large border-border-subtle bg-bg-surface/30 shadow-subtle border p-8"
      aria-labelledby="startup-sequence-heading"
    >
      <h2
        id="startup-sequence-heading"
        className="text-text-muted mb-2 font-mono text-xs font-semibold tracking-widest uppercase"
      >
        Startup Sequence
      </h2>
      <p className="text-text-secondary font-mono text-sm">
        Placeholder container for the upcoming Startup Sequence feature experience.
      </p>
    </section>
  )
}
