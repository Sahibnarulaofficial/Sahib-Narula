import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

const NAV_LINKS = [
  { label: 'HOME',       id: 'hero'       },
  { label: 'ABOUT',      id: 'about'      },
  { label: 'PROJECTS',   id: 'projects'   },
  { label: 'EXPERIENCE', id: 'experience' },
  { label: 'CONTACT',    id: 'contact'    },
]

export function Navigation() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrolled,       setScrolled]       = useState(false)
  const [menuOpen,       setMenuOpen]       = useState(false)
  const navRef      = useRef<HTMLElement>(null)
  const overlayRef  = useRef<HTMLDivElement>(null)
  const linksRef    = useRef<(HTMLLIElement | null)[]>([])
  const prevMenuOpen = useRef(false)

  /* ── Scroll progress & background ── */
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
      setScrolled(window.scrollY > 60)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ── Mobile Menu Animation ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (menuOpen && !prevMenuOpen.current) {
        gsap.set(overlayRef.current, { pointerEvents: 'auto' })
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
        gsap.fromTo(
          linksRef.current.filter(Boolean),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'back.out(1.5)', delay: 0.1 },
        )
      } else if (!menuOpen && prevMenuOpen.current) {
        gsap.to(linksRef.current.filter(Boolean), {
          y: -20, opacity: 0, stagger: 0.03, duration: 0.2, ease: 'power2.in',
        })
        gsap.to(overlayRef.current, {
          opacity: 0, duration: 0.4, ease: 'power2.inOut', delay: 0.1,
          onComplete: () => { gsap.set(overlayRef.current, { pointerEvents: 'none' }) },
        })
      }
      prevMenuOpen.current = menuOpen
    })
    return () => ctx.revert()
  }, [menuOpen])

  /* ── Entrance animation ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -40, opacity: 0, duration: 0.7, ease: 'power2.out', delay: 0.1,
      })
    })
    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: scrolled || menuOpen ? 'var(--nav-bg)' : 'transparent',
        backdropFilter:  scrolled || menuOpen ? 'blur(12px)' : 'none',
        borderBottom:    scrolled || menuOpen ? '1px solid var(--color-detail)' : 'none',
      }}
    >
      <nav
        className="flex items-center justify-between px-5 sm:px-6 md:px-10 py-4 max-w-7xl mx-auto"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('hero') }}
          className="relative z-50 font-orbitron text-sm font-bold text-content-primary tracking-[0.2em] hover:text-accent transition-colors duration-300"
          aria-label="Sahib Narula — scroll to top"
        >
          SN
        </a>

        {/* Desktop links + theme toggle */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-10" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}
                  className="relative font-inter text-[11px] font-medium tracking-[0.2em] text-content-secondary hover:text-content-primary transition-colors duration-200 uppercase group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          {/* Theme toggle — desktop */}
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-50 flex flex-col justify-center items-end gap-[6px] w-12 h-12 -mr-2 focus-visible:outline-none"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-6 bg-content-primary transition-all duration-300 origin-right ${
                menuOpen ? '-rotate-45 -translate-x-[2px] -translate-y-[1px]' : ''
              }`}
            />
            <span
              className={`block h-px w-6 bg-content-primary transition-all duration-300 origin-right ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block h-px w-6 bg-content-primary transition-all duration-300 origin-right ${
                menuOpen ? 'rotate-45 -translate-x-[2px] translate-y-[1px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 w-full h-px bg-accent origin-left"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
          transition: 'transform 0.15s cubic-bezier(0.1, 0.5, 0.2, 1)',
        }}
        aria-hidden="true"
      />

      {/* Mobile overlay menu */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-screen h-[100dvh] z-40 bg-brand-base flex flex-col items-center justify-center opacity-0 pointer-events-none overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation overlay"
      >
        <ul className="flex flex-col items-center gap-6" role="list">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.id}
              ref={(el) => { linksRef.current[i] = el }}
              className="w-full text-center"
            >
              <a
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}
                className="block py-3 px-8 font-orbitron text-[2rem] sm:text-5xl font-bold text-content-secondary hover:text-accent transition-colors duration-200 tracking-widest uppercase"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme toggle — mobile menu */}
        <div className="mt-10 border-t border-brand-detail/30 w-48 pt-6">
          <ThemeToggle inMenu />
        </div>

        <div className="absolute bottom-10 font-mono text-[10px] text-content-secondary/30 tracking-widest">
          SAHIB NARULA · 2026
        </div>
      </div>
    </header>
  )
}
