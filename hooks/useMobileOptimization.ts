'use client'

import { useState, useEffect } from 'react'

export function useMobileOptimization() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      try {
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        const isSmallScreen = window.innerWidth < 768
        const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
        
        setIsMobile(Boolean(isMobileDevice || (isSmallScreen && isTouchDevice)))
      } catch (error) {
        // Fallback for mobile detection
        setIsMobile(window.innerWidth < 768)
      }
    }

    // Check for low power mode indicators
    const checkLowPowerMode = () => {
      try {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        
        // Check for low-end device indicators
        const isLowEndDevice = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 2 : false
        
        // Check for slow network
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
        const isSlowNetwork = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
        
        setIsLowPowerMode(prefersReducedMotion || isLowEndDevice || isSlowNetwork)
      } catch (error) {
        // Fallback for low power mode detection
        setIsLowPowerMode(false)
      }
    }

    checkMobile()
    checkLowPowerMode()

    // Listen for window resize
    const handleResize = () => {
      try {
        checkMobile()
      } catch (error) {
        console.warn('Error in resize handler:', error)
      }
    }
    
    window.addEventListener('resize', handleResize)
    
    // Listen for reduced motion changes
    let mediaQuery: MediaQueryList | null = null
    try {
      mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      const handleMediaChange = () => {
        try {
          checkLowPowerMode()
        } catch (error) {
          console.warn('Error in media change handler:', error)
        }
      }
      mediaQuery.addEventListener('change', handleMediaChange)
    } catch (error) {
      console.warn('Error setting up media query listener:', error)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (mediaQuery) {
        try {
          mediaQuery.removeEventListener('change', checkLowPowerMode)
        } catch (error) {
          console.warn('Error removing media query listener:', error)
        }
      }
    }
  }, [])

  return {
    isMobile,
    isLowPowerMode,
    shouldReduceAnimations: isMobile || isLowPowerMode,
    shouldSimplifyParticles: isMobile,
    shouldReduceParticleCount: isMobile || isLowPowerMode
  }
}
