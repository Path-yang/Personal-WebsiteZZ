'use client'

import { useState, useEffect } from 'react'

export function useMobileOptimization() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return

    try {
      // Check if device is mobile
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isSmallScreen = window.innerWidth < 768
      const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
      
      setIsMobile(Boolean(isMobileDevice || (isSmallScreen && isTouchDevice)))

      // Check for low power mode
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isLowEndDevice = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 2 : false
      
      setIsLowPowerMode(prefersReducedMotion || isLowEndDevice)

      // Listen for resize
      const handleResize = () => {
        const isSmallScreen = window.innerWidth < 768
        const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
        setIsMobile(Boolean(isMobileDevice || (isSmallScreen && isTouchDevice)))
      }
      
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    } catch {
      // Silent fail - return defaults
      setIsMobile(false)
      setIsLowPowerMode(false)
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