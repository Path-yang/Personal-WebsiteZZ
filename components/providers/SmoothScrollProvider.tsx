'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

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
  }, [prefersReducedMotion, isClient])

  return <>{children}</>
}
