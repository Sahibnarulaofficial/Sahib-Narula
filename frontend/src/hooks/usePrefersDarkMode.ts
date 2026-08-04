import { useState, useEffect } from 'react'

/**
 * Custom React hook that detects and listens to the user's preferred browser/OS theme (prefers-color-scheme: dark).
 * Automatically updates state when system preference changes without requiring a page refresh.
 */
export function usePrefersDarkMode(): boolean {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches)
    }

    setIsDark(mediaQuery.matches)

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      // Fallback for older browser versions
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return isDark
}
