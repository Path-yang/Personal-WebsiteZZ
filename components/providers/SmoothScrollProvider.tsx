'use client'

import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // Always use native scrolling for normal website behavior
  return <>{children}</>
}
