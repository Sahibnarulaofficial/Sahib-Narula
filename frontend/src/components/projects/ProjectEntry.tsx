import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap'
import type { Project } from '@/data/projects'
import { ProjectVisual } from './ProjectVisual'

interface ProjectEntryProps {
  project: Project
  index: number
}

/**
 * Large editorial project entry — NOT a card.
 * Number, title, meta, description, architecture, tech tags, links.
 * Alternates visual left/right on desktop for visual rhythm.
 * On mobile: always content-first, visual below.
 */
export function ProjectEntry({ project, index }: ProjectEntryProps) {
  const containerRef = useRef<HTMLElement>(null)
  const isEven       = index % 2 === 0
  const variant      = project.number === '01' ? 'aptlyst' : 'reviveops'

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const numEl   = el.querySelector('.pj-number')
      const lineEl  = el.querySelector('.pj-line')
      const titleEl = el.querySelector('.pj-title')
      const metaEl  = el.querySelector('.pj-meta')
      const descEl  = el.querySelector('.pj-desc')
      const archEl  = el.querySelector('.pj-arch')
      const tags    = el.querySelectorAll('.pj-tag')
      const visual  = el.querySelector('.pj-visual')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      if (numEl)   tl.from(numEl,   { opacity: 0, x: -20, duration: 0.45, ease: 'power2.out' })
      if (lineEl)  tl.from(lineEl,  { scaleX: 0, transformOrigin: 'left center', duration: 0.55, ease: 'power3.out' }, '-=0.25')
      if (titleEl) tl.from(titleEl, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'power3.out' }, '-=0.3')
      if (metaEl)  tl.from(metaEl,  { opacity: 0, y: 12, duration: 0.45 }, '-=0.25')
      if (descEl)  tl.from(descEl,  {
        opacity: 0, y: 28, rotationX: -15,
        transformPerspective: 800,
        duration: 0.6, ease: 'power2.out',
      }, '-=0.3')
      if (archEl)  tl.from(archEl,  { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      if (tags.length) tl.from(Array.from(tags), {
        opacity: 0, scale: 0.65, y: 8,
        stagger: 0.05, duration: 0.3, ease: 'back.out(2)',
      }, '-=0.3')
      if (visual)  tl.from(visual, {
        opacity: 0,
        x: isEven ? 30 : -30,
        duration: 0.7, ease: 'power2.out',
      }, '-=0.9')
    }, containerRef)

    return () => ctx.revert()
  }, [isEven])

  return (
    <article
      ref={containerRef}
      className="border-t border-brand-detail py-12 sm:py-16 md:py-24 group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">

        {/* ── Content column — always first on mobile ── */}
        <div className={`flex flex-col gap-5 sm:gap-6 ${!isEven ? 'lg:order-2' : ''}`}>
          {/* Number + accent line */}
          <div className="flex items-center gap-4">
            <span className="pj-number font-mono text-[11px] text-accent tracking-[0.35em]">
              {project.number}
            </span>
            <div className="pj-line h-px bg-accent/30 w-14" />
          </div>

          {/* Title — fluid size */}
          <h3
            className="pj-title font-space font-bold text-content-primary leading-tight"
            style={{
              clipPath: 'inset(0 0 0% 0)',
              fontSize: 'clamp(1.6rem, 5vw, 2.75rem)',
            }}
          >
            {project.name}
          </h3>

          {/* Meta — tagline, status badge, version */}
          <div className="pj-meta flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-mono text-[11px] text-content-secondary tracking-wider">
              {project.tagline}
            </span>
            <span
              className={`font-mono text-[9px] px-2.5 py-1 border tracking-widest ${
                project.status === 'IN PRODUCTION'
                  ? 'border-accent/50 text-accent'
                  : 'border-content-secondary/25 text-content-secondary/60'
              }`}
            >
              {project.status}
            </span>
            <span className="font-mono text-[9px] text-content-secondary/30 tracking-wider">
              {project.version}
            </span>
          </div>

          {/* Description */}
          <p className="pj-desc font-inter text-content-secondary leading-relaxed text-[14px] sm:text-[15px] md:text-base">
            {project.description}
          </p>

          {/* Architecture */}
          <div className="pj-arch flex flex-col gap-2.5">
            <span className="font-mono text-[9px] text-content-secondary/40 tracking-[0.25em] uppercase mb-1">
              Architecture
            </span>
            {project.architecture.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-accent text-xs mt-0.5 flex-shrink-0 font-mono">→</span>
                <span className="font-inter text-sm text-content-secondary leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="pj-tag font-mono text-[10px] text-content-secondary/55 border border-brand-detail px-3 py-1 hover:border-accent/40 hover:text-content-secondary transition-all duration-250"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTAs — stack on mobile, side-by-side when space allows */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
            <a
              href={project.links.live || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center justify-center gap-2.5 px-5 py-4 sm:py-3.5 border border-accent text-content-primary font-inter text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-accent min-h-[48px] sm:min-h-0"
            >
              VIEW PROJECT
              <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
            </a>
            <a
              href={project.links.github || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center justify-center gap-2.5 px-5 py-4 sm:py-3.5 border border-brand-detail text-content-secondary font-inter text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:border-content-secondary/60 hover:text-content-primary min-h-[48px] sm:min-h-0"
            >
              VIEW SOURCE
              <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* ── Visual column — always below content on mobile ── */}
        <div className={`pj-visual aspect-[4/3] w-full ${!isEven ? 'lg:order-1' : ''}`}>
          <ProjectVisual variant={variant} />
        </div>
      </div>
    </article>
  )
}
