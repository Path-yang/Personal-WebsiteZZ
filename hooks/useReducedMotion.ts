'use client'

import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Return safe default if not on client
  if (!isClient) {
    return false
  }

  useEffect(() => {

    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } catch (error) {
      console.warn('Error setting up reduced motion detection:', error)
      // Fallback to false (no reduced motion)
      setPrefersReducedMotion(false)
    }
  }, [isClient])

  return prefersReducedMotion
}

