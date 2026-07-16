import React from 'react'

export const DriverProfilePlaceholder: React.FC = () => {
  return (
    <section
      id="driver-profile"
      className="rounded-large border-border-subtle bg-bg-surface/30 shadow-subtle border p-8"
      aria-labelledby="driver-profile-heading"
    >
      <h2
        id="driver-profile-heading"
        className="text-text-muted mb-2 font-mono text-xs font-semibold tracking-widest uppercase"
      >
        Driver Profile
      </h2>
      <p className="text-text-secondary font-mono text-sm">
        Placeholder container for the upcoming Driver Profile feature experience.
      </p>
    </section>
  )
}
