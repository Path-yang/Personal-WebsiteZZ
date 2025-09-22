'use client'

import { motion } from 'framer-motion'
import { FileText, ExternalLink } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useState } from 'react'

export function CompactResumeButton() {
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href="/Yang-Zhenzhao-Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-mint to-green-500 text-white rounded-xl font-semibold text-sm shadow-lg hover:from-green-500 hover:to-accent-mint transition-all duration-300 relative overflow-hidden border border-accent-mint/30"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={prefersReducedMotion ? {} : { 
        scale: 1.05,
        boxShadow: '0 8px 25px rgba(52, 211, 153, 0.4)',
        transition: { duration: 0.3 }
      }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      title="View My Resume"
    >
      {/* Background shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        animate={isHovered ? {
          x: ['-100%', '100%'],
          opacity: [0, 0.5, 0]
        } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Icon with animation */}
      <motion.div
        animate={isHovered && !prefersReducedMotion ? {
          rotate: [0, -10, 10, 0],
          scale: 1.1
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <FileText size={16} />
      </motion.div>

      <span className="relative z-10 font-bold">Resume</span>

      {/* External link indicator */}
      <motion.div
        initial={{ opacity: 0.7, scale: 0.8 }}
        animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <ExternalLink size={12} />
      </motion.div>

      {/* Subtle pulsing glow */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent-mint/20 to-green-500/20 rounded-xl"
          animate={{
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.a>
  )
}
