'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { clsx } from 'clsx'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  delay?: number
}

export function Section({ children, className, id, delay = 0 }: SectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 12 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={clsx("relative", className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.section>
  )
}

