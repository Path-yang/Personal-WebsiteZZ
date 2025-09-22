'use client'

import { useState, useEffect } from 'react'

export function useMobileOptimization() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isClient, setIsClient] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Only run after hydration is complete
    const runAfterHydration = () => {
      setIsClient(true)
      setIsHydrated(true)
      
      // Check if device is mobile
      const checkMobile = () => {
        try {
          if (typeof window === 'undefined' || typeof navigator === 'undefined') return
          
          const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
          const isSmallScreen = window.innerWidth < 768
          const isMediumScreen = window.innerWidth >= 768 && window.innerWidth < 1024
          const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)
          
          const mobile = Boolean(isMobileDevice || (isSmallScreen && isTouchDevice))
          const tablet = Boolean(isMediumScreen || (isMobileDevice && window.innerWidth >= 768))
          
          setIsMobile(mobile)
          setIsTablet(tablet)
          
          if (mobile) {
            setScreenSize('mobile')
          } else if (tablet) {
            setScreenSize('tablet')
          } else {
            setScreenSize('desktop')
          }
        } catch (error) {
          console.warn('Error checking mobile device:', error)
          // Fallback to desktop
          setIsMobile(false)
          setIsTablet(false)
          setScreenSize('desktop')
        }
      }

      // Check for low power mode indicators
      const checkLowPowerMode = () => {
        try {
          if (typeof window === 'undefined') return
          
          // Check for reduced motion preference
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          
          // Check for low-end device indicators
          const isLowEndDevice = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 2 : false
          
          // Check for slow network
          const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
          const isSlowNetwork = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
          
          setIsLowPowerMode(prefersReducedMotion || isLowEndDevice || isSlowNetwork)
        } catch (error) {
          console.warn('Error checking low power mode:', error)
          setIsLowPowerMode(false)
        }
      }

      // Run checks after a small delay to ensure hydration is complete
      setTimeout(() => {
        checkMobile()
        checkLowPowerMode()

        // Listen for window resize with debouncing
        let resizeTimeout: NodeJS.Timeout
        const handleResize = () => {
          clearTimeout(resizeTimeout)
          resizeTimeout = setTimeout(checkMobile, 100)
        }
        
        window.addEventListener('resize', handleResize)
        
        // Listen for reduced motion changes
        try {
          const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
          mediaQuery.addEventListener('change', checkLowPowerMode)

          return () => {
            window.removeEventListener('resize', handleResize)
            mediaQuery.removeEventListener('change', checkLowPowerMode)
            clearTimeout(resizeTimeout)
          }
        } catch (error) {
          console.warn('Error setting up media query listener:', error)
          return () => {
            window.removeEventListener('resize', handleResize)
            clearTimeout(resizeTimeout)
          }
        }
      }, 100)
    }

    // Only run on client-side and after hydration
    if (typeof window !== 'undefined') {
      runAfterHydration()
    }
  }, [])

  return {
    isMobile: isHydrated ? isMobile : false,
    isTablet: isHydrated ? isTablet : false,
    isLowPowerMode: isHydrated ? isLowPowerMode : false,
    screenSize: isHydrated ? screenSize : 'desktop',
    isClient,
    isHydrated,
    shouldReduceAnimations: isHydrated ? (isMobile || isLowPowerMode) : false,
    shouldSimplifyParticles: isHydrated ? isMobile : false,
    shouldReduceParticleCount: isHydrated ? (isMobile || isLowPowerMode) : false,
    shouldOptimizeForTouch: isHydrated ? (isMobile || isTablet) : false,
    shouldReduceComplexity: isHydrated ? (isMobile || isLowPowerMode) : false
  }
}
