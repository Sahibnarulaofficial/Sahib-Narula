import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { experiences } from '@/data/experience'

export function Experience() {
  const sectionRef     = useRef<HTMLElement>(null)
  const labelRef       = useRef<HTMLSpanElement>(null)
  const headingRef     = useRef<HTMLHeadingElement>(null)
  const timelineRef    = useRef<HTMLDivElement>(null)
  const entriesRef     = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      tl.from(labelRef.current, { opacity: 0, y: 15, duration: 0.4 })
      tl.from(headingRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.2')

      if (timelineRef.current) {
        tl.from(timelineRef.current, {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.2')
      }

      entriesRef.current.forEach((entry, i) => {
        if (!entry) return
        tl.from(entry, {
          opacity: 0,
          x: 24,
          duration: 0.5,
          ease: 'power2.out',
        }, i === 0 ? '-=0.5' : '-=0.3')
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="border-t border-brand-detail"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32">
        <span
          ref={labelRef}
          className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase block mb-4"
        >
          EXPERIENCE / 03
        </span>
        <h2
          ref={headingRef}
          className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-bold text-content-primary mb-12 sm:mb-16 tracking-tight"
          style={{ clipPath: 'inset(0 0 0% 0)' }}
        >
          PROFESSIONAL PATH.
        </h2>

        <div className="relative pl-7 sm:pl-8 md:pl-10">
          {/* Vertical timeline line */}
          <div
            ref={timelineRef}
            className="absolute left-0 top-0 bottom-0 w-px bg-brand-detail"
          />

          <div className="flex flex-col gap-10 sm:gap-12">
            {experiences.map((exp, i) => (
              <div
                key={exp.organization}
                ref={(el) => { entriesRef.current[i] = el }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[1.95rem] sm:-left-[2.3rem] md:-left-[2.65rem] top-2 w-2 h-2 rounded-full border border-accent bg-brand-base"
                />

                <div className="flex flex-col gap-2">
                  {/* Org name + role — stack on mobile */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline gap-1 sm:gap-3">
                    <h3 className="font-space text-lg sm:text-xl md:text-2xl font-bold text-content-primary">
                      {exp.organization}
                    </h3>
                    {exp.role && (
                      <span className="font-mono text-[11px] text-content-secondary/60 tracking-wider">
                        {exp.role}
                      </span>
                    )}
                  </div>

                  {exp.program && (
                    <p className="font-inter text-content-secondary text-[14px] sm:text-[15px]">
                      {exp.program}
                    </p>
                  )}

                  {exp.period ? (
                    <span className="font-mono text-[10px] text-content-secondary/50 tracking-wider">
                      {exp.period}
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] text-content-secondary/25 tracking-wider italic">
                      Period to be confirmed
                    </span>
                  )}

                  {exp.responsibilities.length > 0 && (
                    <ul className="mt-2 flex flex-col gap-2">
                      {exp.responsibilities.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-content-secondary">
                          <span className="text-accent text-xs mt-1 flex-shrink-0">→</span>
                          <span className="font-inter leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
