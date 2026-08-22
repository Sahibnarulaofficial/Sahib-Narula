import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * Hero section — full viewport, ZERO images.
 * Typography + technical graphics + GSAP entrance timeline.
 */

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const eyebrowRef   = useRef<HTMLDivElement>(null)
  const sahibRef     = useRef<HTMLDivElement>(null)
  const narulaRef    = useRef<HTMLDivElement>(null)
  const supportRef   = useRef<HTMLParagraphElement>(null)
  const metaRef      = useRef<HTMLDivElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)
  const decorRef     = useRef<HTMLDivElement>(null)
  const gridRef      = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.set([eyebrowRef.current, supportRef.current, metaRef.current], {
          opacity: 0, y: 24,
        })
        gsap.set(ctaRef.current, { opacity: 0, y: 16 })
        gsap.set(sahibRef.current,  { clipPath: 'inset(0 0 100% 0)' })
        gsap.set(narulaRef.current, { clipPath: 'inset(0 0 100% 0)' })

        if (decorRef.current) {
          gsap.set(Array.from(decorRef.current.children), { opacity: 0, scale: 0.7 })
        }

        const tl = gsap.timeline({ delay: 0.35 })

        tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' })
        tl.to(sahibRef.current,  { clipPath: 'inset(0 0 0% 0)', duration: 0.85, ease: 'power3.out' }, '-=0.1')
        tl.to(narulaRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 0.85, ease: 'power3.out' }, '-=0.55')
        tl.to(supportRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35')
        tl.to(metaRef.current,   { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        tl.to(ctaRef.current,    { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }, '-=0.25')

        if (decorRef.current) {
          tl.to(Array.from(decorRef.current.children), {
            opacity: 1, scale: 1, stagger: 0.08, duration: 0.45, ease: 'power2.out',
          }, '-=0.4')
        }
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex flex-col justify-center overflow-hidden bg-brand-base"
      style={{ minHeight: '100svh' }}
      aria-label="Introduction — Sahib Narula"
    >
      {/* ── Technical Grid Background ── */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none select-none animate-grid-pulse"
        aria-hidden="true"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="70" height="70" patternUnits="userSpaceOnUse">
              <path d="M 70 0 L 0 0 0 70" fill="none" stroke="var(--color-primary)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* ── Technical Decorative Elements ── */}
      <div
        ref={decorRef}
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Coordinate label — smaller on mobile */}
        <div className="absolute top-20 sm:top-28 right-4 sm:right-8 md:right-14 font-mono text-[8px] sm:text-[9px] text-content-secondary/25 tracking-widest leading-5">
          <div>40.7128°&nbsp;N</div>
          <div>74.0060°&nbsp;W</div>
        </div>

        {/* Crosshair — desktop only */}
        <div className="absolute top-[38%] right-[12%] hidden md:block">
          <div className="relative w-7 h-7">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-accent/25" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent/25" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-accent/50" />
          </div>
        </div>

        {/* Pulse dot — desktop only */}
        <div className="absolute bottom-[32%] right-[22%] hidden md:block">
          <div className="relative w-2 h-2">
            <div className="absolute inset-0 rounded-full bg-accent/60" style={{ animation: 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
            <div className="absolute inset-[2px] rounded-full bg-accent" />
          </div>
        </div>

        {/* Status marker — smaller on mobile */}
        <div className="absolute bottom-10 sm:bottom-14 left-4 sm:left-8 md:left-14 font-mono text-[8px] sm:text-[9px] text-content-secondary/20 tracking-widest uppercase leading-5">
          <div>SYS:ONLINE</div>
          <div>BUILD:2026</div>
        </div>

        {/* Structural lines — desktop only */}
        <div className="absolute top-0 left-[18%] w-px h-28 hidden md:block"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-detail), transparent)' }} />
        <div className="absolute bottom-[28%] left-0 h-px w-28 hidden md:block"
          style={{ background: 'linear-gradient(to right, transparent, var(--color-detail), transparent)' }} />
      </div>

      {/* ── Main Hero Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 w-full pt-20 sm:pt-24 pb-12 sm:pb-16">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="mb-5 sm:mb-7 md:mb-8">
          <span className="font-mono text-[9px] sm:text-[10px] md:text-[11px] text-accent tracking-[0.28em] sm:tracking-[0.35em] uppercase">
            AI DEVELOPER&nbsp;&nbsp;/&nbsp;&nbsp;AUTOMATION BUILDER
          </span>
        </div>

        {/* Name */}
        <div className="mb-5 sm:mb-8 md:mb-10">
          <div
            ref={sahibRef}
            className="font-orbitron font-black text-content-primary"
            style={{
              fontSize: 'clamp(3rem, 13.5vw, 10.5rem)',
              lineHeight: '0.88',
              letterSpacing: '-0.02em',
            }}
          >
            SAHIB
          </div>
          <div
            ref={narulaRef}
            className="font-orbitron font-black"
            style={{
              fontSize: 'clamp(3rem, 13.5vw, 10.5rem)',
              lineHeight: '0.88',
              letterSpacing: '-0.02em',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(245,245,245,0.45)',
            }}
          >
            NARULA
          </div>
        </div>

        {/* Supporting text */}
        <p
          ref={supportRef}
          className="font-inter text-content-secondary text-[14px] sm:text-base md:text-lg max-w-sm sm:max-w-md leading-relaxed mb-5 sm:mb-7"
        >
          Building intelligent systems, AI-powered products
          <br className="hidden sm:block" />
          and automation experiences.
        </p>

        {/* Technical metadata */}
        <div ref={metaRef} className="flex items-center mb-7 sm:mb-10">
          {['AI', 'AUTOMATION', 'FULL-STACK'].map((item, i) => (
            <span key={item} className="flex items-center">
              <span className="font-mono text-[9px] sm:text-[10px] text-content-secondary/50 tracking-[0.2em] sm:tracking-[0.25em] uppercase px-2 sm:px-3 first:pl-0">
                {item}
              </span>
              {i < 2 && <span className="w-px h-3 bg-brand-detail" />}
            </span>
          ))}
        </div>

        {/* CTAs — stack on very small screens, side-by-side otherwise */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <button
            onClick={() => scrollToId('projects')}
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 sm:py-3.5 border border-accent text-content-primary font-inter text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-accent min-h-[48px]"
          >
            VIEW PROJECTS
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
          <button
            onClick={() => scrollToId('contact')}
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 sm:py-3.5 border border-brand-detail text-content-secondary font-inter text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:border-content-secondary/60 hover:text-content-primary min-h-[48px]"
          >
            LET'S CONNECT
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.25 }}
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] text-content-secondary tracking-[0.25em] uppercase">
          Scroll
        </span>
        <div
          className="w-px h-8 sm:h-10 bg-gradient-to-b from-content-secondary to-transparent"
          style={{ animation: 'pulse 2s ease-in-out infinite' }}
        />
      </div>
    </section>
  )
}
