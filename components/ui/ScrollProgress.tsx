'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  if (prefersReducedMotion) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue via-accent-mint to-accent-blue z-50 origin-left pointer-events-none"
      style={{ scaleX }}
    />
  )
}
