import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-border-subtle bg-bg-base border-t py-8">
      <div className="text-text-muted mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 font-mono text-xs sm:flex-row">
        <div>© {new Date().getFullYear()} Project Garage. All rights reserved.</div>
        <div className="flex gap-4">
          <a
            href="#security"
            className="duration-standard hover:text-text-secondary focus-visible:ring-border-focus transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            Security
          </a>
          <a
            href="#performance"
            className="duration-standard hover:text-text-secondary focus-visible:ring-border-focus transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            Performance
          </a>
          <a
            href="#protocols"
            className="duration-standard hover:text-text-secondary focus-visible:ring-border-focus transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            Protocols
          </a>
        </div>
      </div>
    </footer>
  )
}
