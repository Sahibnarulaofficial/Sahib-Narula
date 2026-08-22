import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * About section right column — bio paragraphs, currently building,
 * and tech context. All content sourced from verified old portfolio data.
 */
export function AboutContent() {
  const contentRef = useRef<HTMLDivElement>(null)
  const pillsRef   = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const paras = contentRef.current?.querySelectorAll('p, h3, .about-block')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      if (paras) {
        tl.from(Array.from(paras), {
          opacity: 0,
          y: 32,
          rotationX: -40,
          transformPerspective: 1000,
          stagger: 0.11,
          duration: 0.65,
          ease: 'back.out(1.4)',
        })
      }

      const pills = pillsRef.current?.querySelectorAll('.status-pill')
      if (pills) {
        tl.from(Array.from(pills), {
          opacity: 0,
          scale: 0.5,
          y: 12,
          stagger: 0.08,
          duration: 0.35,
          ease: 'back.out(2)',
        }, '-=0.3')
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={contentRef} className="flex flex-col gap-8">

      {/* Who I am */}
      <div className="flex flex-col gap-3">
        <h3 className="font-space text-lg font-bold text-content-primary tracking-tight">
          Who I Am
        </h3>
        <p className="font-inter text-content-secondary leading-relaxed text-[15px]">
          I'm Sahib Narula — a systems engineer, AI builder, and software craftsman.
          I specialize in low-latency web applications, modular AI microservices, and
          reactive data pipelines that prioritize speed, security, and developer ergonomics.
        </p>
      </div>

      {/* What I build */}
      <div className="flex flex-col gap-3">
        <h3 className="font-space text-lg font-bold text-content-primary tracking-tight">
          What I Build
        </h3>
        <p className="font-inter text-content-secondary leading-relaxed text-[15px]">
          From AI-powered meeting intelligence to autonomous infrastructure monitoring —
          I build systems that make complex workflows feel effortless. Every product I ship
          is precision-engineered for performance, security, and scale.
        </p>
      </div>

      {/* Philosophy */}
      <div className="flex flex-col gap-3">
        <h3 className="font-space text-lg font-bold text-content-primary tracking-tight">
          Philosophy
        </h3>
        <p className="font-inter text-content-secondary leading-relaxed text-[15px]">
          Code should be self-documenting. Interfaces should load instantly. Backend systems
          should scale automatically. I treat security boundaries, clean telemetry, and
          comprehensive test pipelines as core deliverables — not afterthoughts.
        </p>
      </div>

      {/* Currently building */}
      <div ref={pillsRef} className="about-block pt-4 border-t border-brand-detail flex flex-col gap-4">
        <span className="font-mono text-[10px] text-content-secondary/40 tracking-[0.3em] uppercase">
          Currently Building
        </span>
        <div className="flex flex-col gap-3">
          <div className="status-pill flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            <div>
              <span className="font-mono text-[11px] text-content-primary tracking-wider">
                APTLYST AI
              </span>
              <span className="font-mono text-[11px] text-content-secondary/60 tracking-wider">
                &nbsp;—&nbsp;Real-time audio pipeline refinement
              </span>
            </div>
          </div>
          <div className="status-pill flex items-start gap-3">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full border border-content-secondary/30 bg-brand-detail flex-shrink-0" />
            <div>
              <span className="font-mono text-[11px] text-content-primary tracking-wider">
                REVIVEOPS AI
              </span>
              <span className="font-mono text-[11px] text-content-secondary/60 tracking-wider">
                &nbsp;—&nbsp;Kubernetes log parsers on staging
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
