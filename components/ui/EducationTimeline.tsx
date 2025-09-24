'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { LucideIcon, MapPin, Calendar, Trophy } from 'lucide-react'

interface EducationItem {
  id: string
  institution: string
  degree: string
  period: string
  status: 'current' | 'completed'
  description: string[]
  icon: LucideIcon
  location: string
}

interface EducationTimelineProps {
  items: EducationItem[]
}

export function EducationTimeline({ items }: EducationTimelineProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end end']
  })

  const pathLength = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  )

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -60,
      rotateY: -20,
      scale: 0.9
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.2,
        duration: prefersReducedMotion ? 0 : 1,
        ease: [0.23, 1, 0.320, 1],
        type: "spring",
        stiffness: 80,
        damping: 20
      }
    })
  }

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto" style={{ perspective: '1200px' }}>
      {/* Enhanced Academic Timeline SVG */}
      <div className="absolute left-8 top-0 bottom-0 w-1 overflow-hidden">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 4 100" 
          preserveAspectRatio="none"
        >
          {/* Main academic pathway */}
          <motion.path
            d="M2 0 L2 100"
            stroke="url(#academicGradient)"
            strokeWidth="4"
            fill="none"
            style={{
              pathLength: prefersReducedMotion ? 1 : pathLength,
              filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 0.4))'
            }}
          />
          
          {/* Knowledge flow particles */}
          {!prefersReducedMotion && (
            <>
              {[0, 1, 2, 3].map(i => (
                <motion.g key={`flow-${i}`}>
                  <motion.circle
                    cx="2"
                    r="1.5"
                    fill="#34D399"
                    initial={{ cy: 0 }}
                    animate={{
                      cy: [0, 100],
                      opacity: [0, 1, 0.8, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 1.2,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Trailing glow */}
                  <motion.circle
                    cx="2"
                    r="3"
                    fill="#34D399"
                    opacity="0.2"
                    initial={{ cy: 0 }}
                    animate={{
                      cy: [0, 100],
                      opacity: [0, 0.4, 0.2, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 1.2 + 0.1,
                      ease: "easeInOut"
                    }}
                  />
                </motion.g>
              ))}
            </>
          )}

          <defs>
            <linearGradient id="academicGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="1" />
              <stop offset="25%" stopColor="#60A5FA" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#60A5FA" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Education Items */}
      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative pl-20"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-5%" }}
            variants={itemVariants}
          >
            {/* Enhanced Institution Node */}
            <motion.div 
              className="absolute left-3 top-4 w-10 h-10 rounded-2xl border-4 border-dark-bg overflow-hidden flex items-center justify-center"
              initial={{ scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: prefersReducedMotion ? 0 : index * 0.2 + 0.4,
                duration: prefersReducedMotion ? 0 : 0.8,
                type: "spring",
                stiffness: 120
              }}
              style={{
                background: item.status === 'current' 
                  ? 'linear-gradient(135deg, #34D399, #60A5FA)' 
                  : 'linear-gradient(135deg, #60A5FA, #8B5CF6)',
                boxShadow: item.status === 'current'
                  ? '0 0 30px rgba(52, 211, 153, 0.6)'
                  : '0 0 25px rgba(96, 165, 250, 0.4)'
              }}
            >
              <motion.div
                animate={prefersReducedMotion ? {} : {
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <item.icon size={20} className="text-white" />
              </motion.div>

              {/* Pulsing ring for current education */}
              {item.status === 'current' && !prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-accent-mint"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.8, 0.2, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>

            {/* Premium Education Card */}
            <motion.div 
              className="relative bg-gradient-to-br from-dark-card/70 to-dark-card/40 backdrop-blur-lg border border-dark-border rounded-3xl p-6 overflow-hidden transition-all duration-500"
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: '0 15px 35px rgba(0,0,0,0.4), 0 5px 15px rgba(0,0,0,0.2)'
              }}
              whileHover={prefersReducedMotion ? {} : {
                rotateY: 3,
                scale: 1.02,
                boxShadow: '0 25px 60px rgba(96, 165, 250, 0.15), 0 10px 30px rgba(0,0,0,0.3)',
                borderColor: item.status === 'current' ? 'rgba(52, 211, 153, 0.4)' : 'rgba(96, 165, 250, 0.4)',
                transition: { duration: 0.4 }
              }}
            >
              {/* Card background glow */}
              <motion.div 
                className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 ${
                  item.status === 'current' 
                    ? 'bg-gradient-to-br from-accent-mint/10 to-accent-blue/10' 
                    : 'bg-gradient-to-br from-accent-blue/10 to-purple-500/10'
                }`}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div 
                className="relative z-10"
                style={{
                  transform: prefersReducedMotion ? "none" : "translateZ(20px)"
                }}
              >
                {/* Institution Header */}
                <div className="relative flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex-1">
                    <motion.h3 
                      className="heading text-2xl md:text-3xl font-bold text-white mb-2"
                      style={{
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
                        transform: prefersReducedMotion ? "none" : "translateZ(25px)"
                      }}
                    >
                      {item.institution}
                    </motion.h3>
                    {item.status === 'current' && (
                      <motion.div
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-accent-mint to-accent-blue rounded-full text-white text-sm font-medium mb-3 lg:mb-0 lg:absolute lg:top-0 lg:right-0"
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(52, 211, 153, 0.4)',
                            '0 0 30px rgba(52, 211, 153, 0.6)',
                            '0 0 20px rgba(52, 211, 153, 0.4)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Current
                      </motion.div>
                    )}
                    <motion.p 
                      className={`text-lg md:text-xl font-semibold mb-3 ${
                        item.status === 'current' ? 'text-accent-mint' : 'text-accent-blue'
                      }`}
                      style={{
                        transform: prefersReducedMotion ? "none" : "translateZ(20px)"
                      }}
                    >
                      {item.degree}
                    </motion.p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-4 mb-2">
                      <motion.div 
                        className="flex items-center gap-2 text-slate-400"
                        style={{ transform: prefersReducedMotion ? "none" : "translateZ(15px)" }}
                      >
                        <Calendar size={16} />
                        <span className="text-sm">{item.period}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2 text-slate-400"
                        style={{ transform: prefersReducedMotion ? "none" : "translateZ(15px)" }}
                      >
                        <MapPin size={16} />
                        <span className="text-sm">{item.location}</span>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Description - Only show if descriptions exist */}
                {item.description.length > 0 && (
                  <motion.div 
                    className="space-y-4 mb-6"
                    style={{
                      transform: prefersReducedMotion ? "none" : "translateZ(15px)"
                    }}
                  >
                    {item.description.map((desc, descIndex) => (
                      <motion.p 
                        key={descIndex} 
                        className="text-slate-300 leading-relaxed text-lg"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: prefersReducedMotion ? 0 : descIndex * 0.1 + 0.3,
                          duration: prefersReducedMotion ? 0 : 0.6
                        }}
                      >
                        {desc}
                      </motion.p>
                    ))}
                  </motion.div>
                )}

              </motion.div>

              {/* Corner Decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent-blue/30 rounded-tl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent-mint/30 rounded-br-lg" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Academic Excellence Footer */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent-blue/10 to-accent-mint/10 rounded-full border border-accent-blue/20 backdrop-blur-sm"
          whileHover={{
            scale: 1.05,
            boxShadow: '0 10px 25px rgba(96, 165, 250, 0.2)'
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Trophy size={24} className="text-yellow-400" />
          </motion.div>
          <span className="text-slate-300 font-medium">Continuous Learning & Academic Excellence</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
