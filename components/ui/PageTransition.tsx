'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsReady(true)
      return
    }

    const timer = setTimeout(() => {
      setIsReady(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [prefersReducedMotion])

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      rotateX: 5,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 1.2,
        ease: [0.23, 1, 0.320, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.645, 0.045, 0.355, 1.000]
      }
    }
  }

  if (!isReady) {
    return <div className="min-h-screen bg-dark-bg" />
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ transformStyle: 'preserve-3d' }}
      className="min-h-screen"
    >
      <motion.div
        variants={contentVariants}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
