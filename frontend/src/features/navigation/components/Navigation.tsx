import React from 'react'

export const Navigation: React.FC = () => {
  return (
    <nav
      className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
      aria-label="Primary Navigation"
    >
      <div className="flex items-center gap-3">
        <a
          href="#"
          className="text-text-secondary duration-standard hover:text-text-primary focus-visible:ring-border-focus focus-visible:ring-offset-bg-base font-mono text-sm font-semibold tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label="Project Garage Home"
        >
          PROJECT GARAGE
        </a>
      </div>

      <div className="flex items-center gap-6">
        <ul className="flex items-center gap-6" role="list">
          <li>
            <a
              href="#garage"
              className="text-text-secondary duration-standard hover:text-text-primary focus-visible:ring-border-focus focus-visible:ring-offset-bg-base font-mono text-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Garage
            </a>
          </li>
          <li>
            <a
              href="#driver-profile"
              className="text-text-secondary duration-standard hover:text-text-primary focus-visible:ring-border-focus focus-visible:ring-offset-bg-base font-mono text-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Driver Profile
            </a>
          </li>
          <li>
            <a
              href="#radio-room"
              className="text-text-secondary duration-standard hover:text-text-primary focus-visible:ring-border-focus focus-visible:ring-offset-bg-base font-mono text-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Radio Room
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
