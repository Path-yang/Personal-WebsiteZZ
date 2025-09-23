'use client'

import { useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Ensure smooth scrolling is enabled
    if (!prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = 'smooth'
    } else {
      document.documentElement.style.scrollBehavior = 'auto'
    }

    // Cleanup function
    return () => {
      document.documentElement.style.scrollBehavior = 'smooth'
    }
  }, [prefersReducedMotion])

  return <>{children}</>
}
