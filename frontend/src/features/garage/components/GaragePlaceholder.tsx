import React from 'react'

export const GaragePlaceholder: React.FC = () => {
  return (
    <section
      id="garage"
      className="rounded-large border-border-subtle bg-bg-surface/30 shadow-subtle border p-8"
      aria-labelledby="garage-heading"
    >
      <h2
        id="garage-heading"
        className="text-text-muted mb-2 font-mono text-xs font-semibold tracking-widest uppercase"
      >
        Garage Experience
      </h2>
      <p className="text-text-secondary font-mono text-sm">
        Placeholder container for the upcoming Garage feature experience.
      </p>
    </section>
  )
}
