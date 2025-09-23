'use client'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // Just return children - use browser's default scrolling
  return <>{children}</>
}
