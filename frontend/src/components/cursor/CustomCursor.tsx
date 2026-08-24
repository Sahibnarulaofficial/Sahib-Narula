import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * Custom cursor — desktop only (completely removed on touch devices).
 * Small center dot + thin outer ring.
 * Ring expands subtly on interactive elements.
 */
export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if the device is a touch device / coarse pointer
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
      setIsMobile(true)
      return
    }

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('has-custom-cursor')

    // Use gsap.quickTo for smooth lag-free follow
    const moveDotX  = gsap.quickTo(dot,  'x', { duration: 0.04, ease: 'none' })
    const moveDotY  = gsap.quickTo(dot,  'y', { duration: 0.04, ease: 'none' })
    const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.18, ease: 'power2.out' })
    const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.18, ease: 'power2.out' })

    let isVisible = false

    const onMove = (e: MouseEvent) => {
      // Fade in on first mouse movement so it doesn't just sit at top-left
      if (!isVisible) {
        gsap.to(dot, { opacity: 1, duration: 0.3 })
        gsap.to(ring, { opacity: 0.35, duration: 0.3 })
        isVisible = true
      }
      
      moveDotX(e.clientX)
      moveDotY(e.clientY)
      moveRingX(e.clientX)
      moveRingY(e.clientY)
    }

    const onEnterInteractive = () => {
      gsap.to(ring, { scale: 1.8, opacity: 0.15, duration: 0.25, ease: 'power2.out' })
    }

    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, opacity: 0.35, duration: 0.25, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', onMove)

    // Attach to all interactive elements
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-expand]')) {
        onEnterInteractive()
      } else {
        onLeaveInteractive()
      }
    }

    document.addEventListener('mouseover', handleOver)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', handleOver)
    }
  }, [])

  // Completely unmount cursor DOM elements on touch devices
  if (isMobile) return null

  return (
    <>
      {/* Center dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999999] pointer-events-none"
        style={{
          width:  '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          opacity: 0, // Hidden until first mouse move
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999998] pointer-events-none"
        style={{
          width:  '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid #FFFFFF',
          opacity: 0, // Hidden until first mouse move
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />
    </>
  )
}
