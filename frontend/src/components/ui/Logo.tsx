import React from 'react'
import { usePrefersDarkMode } from '@/hooks/usePrefersDarkMode'

export interface LogoProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** Path to dark mode logo variant */
  darkSrc?: string
  /** Path to light mode logo variant */
  lightSrc?: string
  /** Alt text for accessibility */
  alt?: string
  /** Styling classes for uniform layout dimensions */
  className?: string
}

/**
 * Reusable Logo component that automatically renders the dark or light logo SVG variant
 * based on the user's system/browser prefers-color-scheme preference.
 * Switches instantly without page reload or layout shift.
 */
export const Logo: React.FC<LogoProps> = ({
  darkSrc = '/images/logo/Logo%20Dark.svg',
  lightSrc = '/images/logo/Logo%20Light.svg',
  alt = 'Sahib Narula Logo',
  className = 'h-7 w-auto object-contain sm:h-8',
  ...props
}) => {
  const isDarkMode = usePrefersDarkMode()

  return (
    <picture className="inline-flex items-center justify-center shrink-0">
      <source media="(prefers-color-scheme: dark)" srcSet={darkSrc} />
      <source media="(prefers-color-scheme: light)" srcSet={lightSrc} />
      <img
        src={isDarkMode ? darkSrc : lightSrc}
        alt={alt}
        className={className}
        loading="eager"
        decoding="async"
        {...props}
      />
    </picture>
  )
}

export default Logo
