import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * ProfileSuspension — circular profile photo hanging from a thin line.
 *
 * Animations (ScrollTrigger):
 *  1. Suspension line scaleY 0 → 1 (draws in from top)
 *  2. Image drops from above (y: -60 → 0) with back.out easing
 *  3. Assembly begins gentle swing (±2.5° rotation, sine.inOut, infinite)
 *  4. Frame glow breathes (sine.inOut, infinite)
 *
 * Hover (desktop only):
 *  - Image filter: grayscale(100%) → grayscale(0%) via CSS transition
 *  - Frame scales up slightly via GSAP
 */
export function ProfileSuspension() {
  const assemblyRef       = useRef<HTMLDivElement>(null)
  const lineRef           = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const frameRef          = useRef<HTMLDivElement>(null)
  const imgRef            = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice  = window.matchMedia('(hover: none), (pointer: coarse)').matches

    const ctx = gsap.context(() => {
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set(imageContainerRef.current, { y: -70, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: assemblyRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      tl.to(lineRef.current, { scaleY: 1, duration: 0.65, ease: 'power2.out' })
      tl.to(imageContainerRef.current, { y: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.5)' }, '-=0.05')

      if (!prefersReduced) {
        tl.call(() => {
          // Reduce swing amplitude on mobile
          const swingAmount = isTouchDevice ? 1.5 : 2.5

          gsap.to(assemblyRef.current, {
            rotation: swingAmount,
            transformOrigin: 'top center',
            duration: isTouchDevice ? 4 : 3.5,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          })

          gsap.to(frameRef.current, {
            boxShadow: '0 0 22px var(--profile-glow)',
            duration: 2.8,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          })
        })
      }
    })

    return () => ctx.revert()
  }, [])

  /* ── Hover handlers (desktop pointer only) ── */
  const handleMouseEnter = () => {
    if (imgRef.current) imgRef.current.style.filter = 'grayscale(0%) brightness(1)'
    gsap.to(frameRef.current, { scale: 1.04, duration: 0.3, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    if (imgRef.current) imgRef.current.style.filter = 'grayscale(100%) brightness(0.82)'
    gsap.to(frameRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <div
      ref={assemblyRef}
      className="flex flex-col items-center"
      style={{ transformOrigin: 'top center' }}
    >
      {/* Suspension line — shorter on mobile */}
      <div
        ref={lineRef}
        style={{
          width:      '1px',
          height:     'clamp(60px, 10vw, 110px)',
          background: 'var(--profile-line)',
        }}
      />

      {/* Image container */}
      <div ref={imageContainerRef}>
        {/* Frame — responsive size using clamp */}
        <div
          ref={frameRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            width:        'clamp(160px, 40vw, 220px)',
            height:       'clamp(160px, 40vw, 220px)',
            borderRadius: '50%',
            overflow:     'hidden',
            border:       '2px solid var(--profile-border)',
            boxShadow:    '0 0 0px rgba(225, 6, 0, 0)',
          }}
        >
          <img
            ref={imgRef}
            src="/assets/profile.jpg"
            alt="Sahib Narula"
            style={{
              width:          '100%',
              height:         '100%',
              objectFit:      'cover',
              objectPosition: 'center 18%',
              filter:         'grayscale(100%) brightness(0.82)',
              transition:     'filter 0.55s ease',
              display:        'block',
              userSelect:     'none',
            }}
            draggable={false}
          />
        </div>

        {/* Label below image */}
        <div className="mt-3 sm:mt-4 text-center">
          <span className="font-mono text-[9px] text-content-secondary/30 tracking-widest">
            SAHIB NARULA
          </span>
        </div>
      </div>
    </div>
  )
}
