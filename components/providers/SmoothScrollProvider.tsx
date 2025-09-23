'use client'

import { useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) return

    // Disable CSS smooth scrolling
    document.documentElement.style.scrollBehavior = 'auto'
    document.body.style.scrollBehavior = 'auto'

    // Custom smooth scroll implementation
    let isScrolling = false

    const smoothScrollTo = (targetY: number, duration: number = 800) => {
      if (isScrolling) return
      isScrolling = true

      const startY = window.scrollY
      const distance = targetY - startY
      const startTime = performance.now()

      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeInOutCubic(progress)
        
        window.scrollTo(0, startY + distance * easedProgress)
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        } else {
          isScrolling = false
        }
      }

      requestAnimationFrame(animateScroll)
    }

    // Override default scroll behavior for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]')
      
      if (link) {
        e.preventDefault()
        const href = link.getAttribute('href')
        if (href && href !== '#') {
          const targetElement = document.querySelector(href)
          if (targetElement) {
            const targetY = targetElement.getBoundingClientRect().top + window.scrollY - 80
            smoothScrollTo(targetY)
          }
        }
      }
    }

    // Add click listener
    document.addEventListener('click', handleClick)

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick)
      document.documentElement.style.scrollBehavior = 'auto'
      document.body.style.scrollBehavior = 'auto'
    }
  }, [prefersReducedMotion])

  return <>{children}</>
}
