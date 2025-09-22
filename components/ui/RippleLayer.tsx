'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Ripple {
  id: string
  x: number
  y: number
}

export function RippleLayer() {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const prefersReducedMotion = useReducedMotion()

  const createRipple = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (prefersReducedMotion) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ('touches' in event ? event.touches[0].clientX : event.clientX) - rect.left
    const y = ('touches' in event ? event.touches[0].clientY : event.clientY) - rect.top

    const newRipple: Ripple = {
      id: `ripple-${Date.now()}-${Math.random()}`,
      x,
      y
    }

    setRipples(prev => {
      // Limit to 3 concurrent ripples
      const updated = [...prev, newRipple]
      return updated.length > 3 ? updated.slice(-3) : updated
    })

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 800)
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <div
      className="absolute inset-0 cursor-pointer"
      onMouseDown={createRipple}
      onTouchStart={createRipple}
    >
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border border-accent-blue/30 pointer-events-none"
            style={{
              left: ripple.x - 80,
              top: ripple.y - 80,
              width: 160,
              height: 160
            }}
            initial={{
              scale: 0,
              opacity: 0.6
            }}
            animate={{
              scale: 1,
              opacity: 0
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

