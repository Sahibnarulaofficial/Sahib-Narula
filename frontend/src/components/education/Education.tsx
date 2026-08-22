import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * Education section — BCA, S.S. Jain Subodh P.G. College, 2027.
 * Information sourced from user-provided spec.
 */
export function Education() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="education"
      className="border-t border-brand-detail"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase">
            EDUCATION
          </span>
          <h3 className="font-space text-xl md:text-2xl font-bold text-content-primary">
            Bachelor of Computer Applications
          </h3>
          <p className="font-inter text-content-secondary">
            S.S. Jain Subodh P.G. College
          </p>
        </div>
        <div>
          <span
            className="font-orbitron font-black text-content-secondary/10"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
            aria-label="Graduating 2027"
          >
            2027
          </span>
        </div>
      </div>
    </section>
  )
}
