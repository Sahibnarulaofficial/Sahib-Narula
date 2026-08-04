import React, { useEffect } from 'react'

/**
 * DynamicFavicon component
 * Automatically detects the user's OS/browser theme (prefers-color-scheme: dark)
 * and dynamically swaps the tab favicon between 'Logo Dark.svg' and 'Logo Light.svg'
 * across Chrome, Edge, Brave, Firefox, and Safari with cache-busting and zero page reloads.
 */
export const DynamicFavicon: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const darkFavicon = '/images/logo/Logo%20Dark.svg'
    const lightFavicon = '/images/logo/Logo%20Light.svg'

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const updateFavicon = (isDark: boolean) => {
      // Locate existing icon link tag or create one if absent
      let link: HTMLLinkElement | null =
        document.querySelector("link[id='dynamic-favicon']") ||
        document.querySelector("link[rel*='icon'][type='image/svg+xml']") ||
        document.querySelector("link[rel*='icon']")

      if (!link) {
        link = document.createElement('link')
        link.id = 'dynamic-favicon'
        link.rel = 'icon'
        document.head.appendChild(link)
      }

      link.type = 'image/svg+xml'

      // Target path with cache-busting query parameter to force instantaneous tab icon refresh
      const targetHref = isDark ? darkFavicon : lightFavicon
      const cacheBuster = isDark ? 'dark' : 'light'

      // Set updated href
      link.href = `${targetHref}?t=${cacheBuster}`
    }

    // Set initial favicon based on current system theme
    updateFavicon(mediaQuery.matches)

    // Listen for real-time OS/browser theme preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      updateFavicon(e.matches)
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return null
}
