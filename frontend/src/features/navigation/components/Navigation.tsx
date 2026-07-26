import React, { useState, useEffect } from 'react'

interface NavLink {
  id: string
  label: string
  href: string
}

export const Navigation: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  // Links mapped directly to Section Title IDs
  const links: NavLink[] = [
    { id: 'garage-title', label: 'THE GARAGE', href: '#garage-title' },
    { id: 'driver-profile-title', label: 'DRIVER', href: '#driver-profile-title' },
    { id: 'engineering-title', label: 'ENGINEERING', href: '#engineering-title' },
    { id: 'radio-room-title', label: 'RADIO ROOM', href: '#radio-room-title' },
    { id: 'checkered-flag-title', label: 'FINISH', href: '#checkered-flag-title' },
  ]

  // Track scroll progress percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Manage body scroll locking when full screen menu is active
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleLinkClick = (id: string) => {
    setIsMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`border-border-subtle fixed top-0 right-0 left-0 z-50 border-b transition-colors duration-300 ${
        isMenuOpen ? 'border-transparent bg-zinc-950' : 'bg-bg-base/80 backdrop-blur-md'
      }`}
    >
      <nav className="relative w-full" aria-label="Primary Navigation">
        {/* Full-width 3-column grid extending to screen edges */}
        <div className="grid w-full grid-cols-3 items-center px-6 py-4.5 font-mono md:px-8">
          {/* Left Column: Brand Logo */}
          <div className="relative z-50 flex items-center gap-1.5 justify-self-start text-xs font-bold tracking-wider">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick('hero')
              }}
              className="rounded-subtle text-text-primary hover:text-text-secondary focus-visible:ring-border-focus focus-visible:ring-offset-bg-base transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-label="Project Garage Home"
            >
              SN
            </a>
            <span className="bg-text-primary h-1 w-1 animate-pulse rounded-full" />
          </div>

          {/* Center Column: Clickable Bracket Title */}
          <div className="relative z-50 justify-self-center text-center">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick('hero')
              }}
              className="group rounded-subtle focus-visible:ring-border-focus focus-visible:ring-offset-bg-base flex items-center gap-3 transition-colors select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-label="Scroll to top welcome section"
            >
              <span className="text-text-muted group-hover:text-text-primary text-sm font-light transition-colors">
                [
              </span>
              <div className="flex flex-col items-center">
                <span className="text-text-primary group-hover:text-brand-primary text-[10px] font-bold tracking-widest uppercase transition-colors sm:text-xs">
                  PROJECT GARAGE
                </span>
                <span className="text-text-secondary xs:block group-hover:text-text-primary hidden text-[7px] tracking-wider uppercase transition-colors">
                  BY SAHIB NARULA
                </span>
              </div>
              <span className="text-text-muted group-hover:text-text-primary text-sm font-light transition-colors">
                ]
              </span>
            </a>
          </div>

          {/* Right Column: Navigation Links or Menu Toggle */}
          <div className="relative z-50 flex items-center gap-6 justify-self-end text-[10px] font-semibold tracking-wider">
            {/* Desktop Nav Links */}
            <ul className="hidden items-center gap-6 lg:flex" role="list">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.id)
                    }}
                    className="text-text-secondary hover:text-text-primary focus-visible:ring-border-focus focus-visible:ring-offset-bg-base duration-standard transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile non-traditional hamburger trigger (///// -> X) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-primary flex h-8 cursor-pointer items-center justify-center px-2 font-mono text-[10px] font-bold tracking-widest transition-transform duration-300 focus-visible:outline-none active:scale-95 lg:hidden"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              <span
                className={`inline-block transition-all duration-300 ${
                  isMenuOpen ? 'text-status-error rotate-90 text-sm' : 'text-text-primary rotate-0'
                }`}
              >
                {isMenuOpen ? '✕' : '/////'}
              </span>
            </button>
          </div>
        </div>

        {/* Full-Screen Overlay Menu (Centered links) */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-zinc-950"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Overlay"
          >
            <ul
              className="flex flex-col items-center gap-7 font-mono text-sm font-semibold tracking-widest uppercase"
              role="list"
            >
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.id)
                    }}
                    className="text-text-secondary hover:text-text-primary block cursor-pointer px-6 py-3 text-base transition-all hover:scale-105"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Progress Scroll Indicator */}
        <div
          className="bg-brand-primary absolute bottom-0 left-0 h-[1.5px] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
      </nav>
    </header>
  )
}
