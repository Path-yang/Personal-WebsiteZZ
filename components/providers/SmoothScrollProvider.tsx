'use client'

import { useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Only set scroll behavior on client side
    if (typeof window !== 'undefined') {
      if (!prefersReducedMotion) {
        document.documentElement.style.scrollBehavior = 'smooth'
      } else {
        document.documentElement.style.scrollBehavior = 'auto'
      }
    }
  }, [prefersReducedMotion])

  return <>{children}</>
}
