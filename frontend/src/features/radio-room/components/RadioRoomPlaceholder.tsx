import React from 'react'

export const RadioRoomPlaceholder: React.FC = () => {
  return (
    <section
      id="radio-room"
      className="rounded-large border-border-subtle bg-bg-surface/30 shadow-subtle border p-8"
      aria-labelledby="radio-room-heading"
    >
      <h2
        id="radio-room-heading"
        className="text-text-muted mb-2 font-mono text-xs font-semibold tracking-widest uppercase"
      >
        Radio Room
      </h2>
      <p className="text-text-secondary font-mono text-sm">
        Placeholder container for the upcoming Radio Room feature experience.
      </p>
    </section>
  )
}
