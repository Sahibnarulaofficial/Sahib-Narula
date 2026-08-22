import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { projects } from '@/data/projects'
import { ProjectEntry } from './ProjectEntry'

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
      tl.from(labelRef.current, { opacity: 0, y: 15, duration: 0.4 })
      tl.from(headingRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="border-t border-brand-detail"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 pt-16 sm:pt-24 md:pt-32">
        <span
          ref={labelRef}
          className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase block mb-4"
        >
          SELECTED WORK / 02
        </span>
        <h2
          ref={headingRef}
          className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-bold text-content-primary tracking-tight"
          style={{ clipPath: 'inset(0 0 0% 0)' }}
        >
          SYSTEMS I'VE BUILT.
        </h2>

        {/* Project entries */}
        <div>
          {projects.map((project, index) => (
            <ProjectEntry
              key={project.number}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
