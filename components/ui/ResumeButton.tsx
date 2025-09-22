'use client'

import { motion } from 'framer-motion'
import { Download, FileText, ExternalLink } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useState } from 'react'

export function ResumeButton() {
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  const buttonVariants = {
    initial: { 
      scale: 1,
      boxShadow: '0 4px 15px rgba(96, 165, 250, 0.2)'
    },
    hover: { 
      scale: 1.05,
      boxShadow: '0 8px 25px rgba(96, 165, 250, 0.4)',
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  }

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: [0, -10, 10, 0],
      scale: 1.1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div 
      className="relative"
      animate={!prefersReducedMotion ? {
        scale: [1, 1.05, 1],
        boxShadow: [
          '0 0 20px rgba(52, 211, 153, 0.3)',
          '0 0 40px rgba(52, 211, 153, 0.6)',
          '0 0 20px rgba(52, 211, 153, 0.3)'
        ]
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.a
        href="/Yang-Zhenzhao-Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-accent-mint to-green-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:from-green-500 hover:to-accent-mint transition-all duration-300 relative overflow-hidden border-2 border-accent-mint/50"
        variants={buttonVariants}
        initial="initial"
        whileHover={prefersReducedMotion ? {} : "hover"}
        whileTap={prefersReducedMotion ? {} : "tap"}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ transformStyle: 'preserve-3d' }}
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
          variants={iconVariants}
          initial="initial"
          animate={isHovered && !prefersReducedMotion ? "hover" : "initial"}
        >
          <FileText size={20} />
        </motion.div>

        <span className="relative z-10 text-xl font-bold">📄 View My Resume</span>

        {/* External link indicator */}
        <motion.div
          initial={{ opacity: 0.7, scale: 0.8 }}
          animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <ExternalLink size={16} />
        </motion.div>

        {/* Floating particles on hover */}
        {!prefersReducedMotion && isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%'
                }}
                animate={{
                  x: [0, Math.cos(i * 72 * Math.PI / 180) * 20],
                  y: [0, Math.sin(i * 72 * Math.PI / 180) * 20],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </motion.a>

      {/* Download alternative button */}
      <motion.a
        href="/Yang-Zhenzhao-Resume.pdf"
        download="Yang-Zhenzhao-Resume.pdf"
        className="absolute -top-2 -right-2 p-2 bg-accent-mint text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        whileHover={prefersReducedMotion ? {} : { 
          scale: 1.1,
          rotate: 15,
          boxShadow: '0 5px 15px rgba(52, 211, 153, 0.4)'
        }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
        title="Download Resume"
      >
        <Download size={14} />
      </motion.a>
    </motion.div>
  )
}
