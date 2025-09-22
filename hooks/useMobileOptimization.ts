'use client'

import { useState, useEffect } from 'react'

export function useMobileOptimization() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Set client-side flag to prevent hydration mismatches
    setIsClient(true)
    
    // Check if device is mobile
    const checkMobile = () => {
      if (typeof window === 'undefined') return
      
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const isSmallScreen = window.innerWidth < 768
      const isMediumScreen = window.innerWidth >= 768 && window.innerWidth < 1024
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      const mobile = isMobileDevice || (isSmallScreen && isTouchDevice)
      const tablet = isMediumScreen || (isMobileDevice && window.innerWidth >= 768)
      
      setIsMobile(mobile)
      setIsTablet(tablet)
      
      if (mobile) {
        setScreenSize('mobile')
      } else if (tablet) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    // Check for low power mode indicators
    const checkLowPowerMode = () => {
      if (typeof window === 'undefined') return
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      // Check for low-end device indicators
      const isLowEndDevice = navigator.hardwareConcurrency <= 2
      
      // Check for slow network
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      const isSlowNetwork = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
      
      setIsLowPowerMode(prefersReducedMotion || isLowEndDevice || isSlowNetwork)
    }

    // Only run on client-side
    if (typeof window !== 'undefined') {
      checkMobile()
      checkLowPowerMode()

      // Listen for window resize
      window.addEventListener('resize', checkMobile)
      
      // Listen for reduced motion changes
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      mediaQuery.addEventListener('change', checkLowPowerMode)

      return () => {
        window.removeEventListener('resize', checkMobile)
        mediaQuery.removeEventListener('change', checkLowPowerMode)
      }
    }
  }, [])

  return {
    isMobile: isClient ? isMobile : false,
    isTablet: isClient ? isTablet : false,
    isLowPowerMode: isClient ? isLowPowerMode : false,
    screenSize: isClient ? screenSize : 'desktop',
    isClient,
    shouldReduceAnimations: isClient ? (isMobile || isLowPowerMode) : false,
    shouldSimplifyParticles: isClient ? isMobile : false,
    shouldReduceParticleCount: isClient ? (isMobile || isLowPowerMode) : false,
    shouldOptimizeForTouch: isClient ? (isMobile || isTablet) : false,
    shouldReduceComplexity: isClient ? (isMobile || isLowPowerMode) : false
  }
}
