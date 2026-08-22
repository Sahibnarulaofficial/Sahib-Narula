import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { ProfileSuspension } from './ProfileSuspension'
import { AboutContent } from './AboutContent'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="border-t border-brand-detail"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32">
        {/* Eyebrow */}
        <span
          ref={labelRef}
          className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase block mb-4"
        >
          ABOUT / 01
        </span>

        {/* Section heading */}
        <h2
          ref={headingRef}
          className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-bold text-content-primary mb-10 sm:mb-16 md:mb-20 tracking-tight"
          style={{ clipPath: 'inset(0 0 0% 0)' }}
        >
          BUILDING WITH INTENT.
        </h2>

        {/* On mobile: profile first, then content. On desktop: two columns. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Profile — centered on mobile, natural on desktop */}
          <div className="flex justify-center lg:justify-start lg:pl-8">
            <ProfileSuspension />
          </div>

          {/* About content */}
          <AboutContent />
        </div>
      </div>
    </section>
  )
}

