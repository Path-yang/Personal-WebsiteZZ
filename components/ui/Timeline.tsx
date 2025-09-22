'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface TimelineItem {
  id: string
  title: string
  company: string
  period: string
  description: string[]
  logo?: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  const containerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const pathLength = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  )

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      rotateY: -15,
      scale: 0.9
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.15,
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.645, 0.045, 0.355, 1.000],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    })
  }

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto" style={{ perspective: '1000px' }}>
      {/* Enhanced Timeline SVG Line with Data Flow */}
      <div className="absolute left-8 top-0 bottom-0 w-1 overflow-hidden">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 4 100" 
          preserveAspectRatio="none"
        >
          {/* Main timeline path */}
          <motion.path
            d="M2 0 L2 100"
            stroke="url(#timelineGradient)"
            strokeWidth="3"
            fill="none"
            style={{
              pathLength: prefersReducedMotion ? 1 : pathLength
            }}
          />
          
          {/* Pulsing data flow particles */}
          {!prefersReducedMotion && (
            <>
              {[0, 1, 2].map(i => (
                <motion.circle
                  key={`flow-${i}`}
                  cx="2"
                  r="1.5"
                  fill="#60A5FA"
                  initial={{ cy: 0 }}
                  animate={{
                    cy: [0, 100],
                    opacity: [0, 1, 0.7, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "linear"
                  }}
                />
              ))}
            </>
          )}

          <defs>
            <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#34D399" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#60A5FA" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Timeline Items */}
      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative pl-20"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={itemVariants}
          >
            {/* Enhanced Timeline Node */}
            <motion.div 
              className="absolute left-5 top-2 w-6 h-6 rounded-full border-4 border-dark-bg overflow-hidden"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: prefersReducedMotion ? 0 : index * 0.15 + 0.3,
                duration: prefersReducedMotion ? 0 : 0.6,
                type: "spring",
                stiffness: 150
              }}
              style={{
                background: 'linear-gradient(45deg, #60A5FA, #34D399)',
                boxShadow: '0 0 20px rgba(96, 165, 250, 0.4)'
              }}
            >
              {/* Pulsing inner core */}
              <motion.div
                className="absolute inset-1 bg-white rounded-full"
                animate={prefersReducedMotion ? {} : {
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 0.4, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Enhanced Content Card */}
            <motion.div 
              className="relative bg-gradient-to-br from-dark-card/60 to-dark-card/30 backdrop-blur-sm border border-dark-border rounded-2xl p-6 overflow-hidden transition-all duration-500"
              style={{
                transformStyle: 'preserve-3d',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}
              whileHover={prefersReducedMotion ? {} : {
                rotateY: 2,
                scale: 1.02,
                boxShadow: '0 20px 50px rgba(96, 165, 250, 0.1)',
                borderColor: 'rgba(96, 165, 250, 0.3)',
                transition: { duration: 0.3 }
              }}
            >
              {/* Animated background gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-mint/5 opacity-0 group-hover:opacity-100 rounded-2xl"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div 
                className="relative z-10"
                style={{
                  transform: prefersReducedMotion ? "none" : "translateZ(10px)"
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <motion.h3 
                      className="heading text-xl md:text-2xl font-semibold text-white mb-1"
                      style={{
                        textShadow: '0 0 20px rgba(96, 165, 250, 0.3)',
                        transform: prefersReducedMotion ? "none" : "translateZ(15px)"
                      }}
                    >
                      {item.title}
                    </motion.h3>
                    <motion.div 
                      className="flex items-center gap-5"
                      style={{
                        transform: prefersReducedMotion ? "none" : "translateZ(12px)"
                      }}
                    >
                      {item.logo && (
                        <motion.div
                          className="w-32 h-24 flex items-center justify-center bg-white rounded-xl p-3 shadow-lg border border-gray-100 overflow-hidden"
                          whileHover={prefersReducedMotion ? {} : { 
                            scale: 1.05,
                            rotate: 2,
                            boxShadow: '0 15px 40px rgba(96, 165, 250, 0.4)',
                            transition: { duration: 0.3 }
                          }}
                          style={{
                            transform: prefersReducedMotion ? "none" : "translateZ(15px)"
                          }}
                        >
                          <img 
                            src={item.logo} 
                            alt={`${item.company} logo`}
                            className="max-w-full max-h-full object-contain"
                            style={{ minWidth: '80px', minHeight: '60px' }}
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              console.log('Logo failed to load:', item.logo);
                            }}
                          />
                        </motion.div>
                      )}
                      <motion.p className="text-accent-blue font-medium text-lg">
                        {item.company}
                      </motion.p>
                    </motion.div>
                  </div>
                  <motion.span 
                    className="text-slate-400 text-sm md:text-base mt-2 md:mt-0 whitespace-nowrap"
                    style={{
                      transform: prefersReducedMotion ? "none" : "translateZ(10px)"
                    }}
                  >
                    {item.period}
                  </motion.span>
                </div>
                
                <motion.div 
                  className="space-y-3"
                  style={{
                    transform: prefersReducedMotion ? "none" : "translateZ(8px)"
                  }}
                >
                  {item.description.map((desc, descIndex) => (
                    <motion.p 
                      key={descIndex} 
                      className="text-slate-300 leading-relaxed"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : descIndex * 0.1 + 0.2,
                        duration: prefersReducedMotion ? 0 : 0.5
                      }}
                    >
                      {desc}
                    </motion.p>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

