import React, { useState, useEffect, useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  className?: string
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'none',
  delay = 0,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (elementRef.current) {
            observer.unobserve(elementRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const getDirectionClass = () => {
    if (isVisible) return 'opacity-100 translate-x-0 translate-y-0 scale-100'

    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-6'
      case 'down':
        return 'opacity-0 -translate-y-6'
      case 'left':
        return 'opacity-0 -translate-x-8'
      case 'right':
        return 'opacity-0 translate-x-8'
      case 'none':
      default:
        return 'opacity-0'
    }
  }

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${getDirectionClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
