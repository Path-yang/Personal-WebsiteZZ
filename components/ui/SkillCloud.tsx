'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SkillCloudProps {
  skills: string[]
  categoryColor?: string
  categoryBorder?: string
}

export function SkillCloud({ skills, categoryColor = 'from-slate-500/20 to-gray-500/20', categoryBorder = 'border-slate-400/30' }: SkillCloudProps) {
  const [pulsingChip, setPulsingChip] = useState<string | null>(null)
  const [hoveredChip, setHoveredChip] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const handleChipClick = (skill: string) => {
    if (prefersReducedMotion) return
    
    setPulsingChip(skill)
    setTimeout(() => setPulsingChip(null), 800)
  }

  const chipVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.6,
      y: 20,
      rotateX: -15
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.08,
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.23, 1, 0.320, 1],
        type: "spring",
        stiffness: 100
      }
    })
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {skills.map((skill, index) => (
        <motion.button
          key={skill}
          className={`group relative px-6 py-3 bg-gradient-to-br ${categoryColor} backdrop-blur-sm border ${categoryBorder} rounded-full text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:ring-offset-2 focus:ring-offset-dark-bg overflow-hidden`}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          variants={chipVariants}
          whileHover={prefersReducedMotion ? {} : { 
            scale: 1.08,
            y: -4,
            rotateY: 5,
            boxShadow: '0 10px 25px rgba(96, 165, 250, 0.2)',
            transition: { duration: 0.3 }
          }}
          whileTap={prefersReducedMotion ? {} : { 
            scale: 0.95,
            transition: { duration: 0.1 }
          }}
          onClick={() => handleChipClick(skill)}
          onMouseEnter={() => setHoveredChip(skill)}
          onMouseLeave={() => setHoveredChip(null)}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Animated Background Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-mint/20 rounded-full opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />

          {/* Rotating Ring on Hover */}
          {hoveredChip === skill && !prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(96, 165, 250, 0.3), transparent)',
                padding: '1px'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}

          <span className="relative z-10">{skill}</span>
          
          {/* Enhanced Pulse Ring Animation */}
          {pulsingChip === skill && !prefersReducedMotion && (
            <>
              <motion.div
                className="absolute inset-0 border-2 border-accent-blue rounded-full"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 border border-accent-mint rounded-full"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-blue/30 to-accent-mint/30 rounded-full"
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </>
          )}

          {/* Subtle floating animation for each chip */}
          <motion.div
            className="absolute inset-0"
            animate={{
              y: [-1, 1, -1],
            }}
            transition={{
              duration: 3 + index * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1
            }}
          />
        </motion.button>
      ))}
    </div>
  )
}

