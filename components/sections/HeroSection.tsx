'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Zap, Brain, Code } from 'lucide-react'
import { SimpleParticleBackground } from '@/components/ui/SimpleParticleBackground'
import { AnimatedText, HeroTitle } from '@/components/ui/AnimatedText'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useState, useMemo, useCallback } from 'react'

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const [titleComplete, setTitleComplete] = useState(false)
  const [subtitleComplete, setSubtitleComplete] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const heroElementVariants = {
    hidden: { 
      opacity: 0,
      y: 100,
      rotateX: -15,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.23, 1, 0.320, 1],
        type: "spring",
        stiffness: 100
      }
    }
  }

  const iconVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180
    },
    visible: (i: number) => ({
      opacity: 0.8,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.5,
        delay: 1.5 + i * 0.2,
        ease: [0.23, 1, 0.320, 1]
      }
    })
  }

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    aboutSection?.scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Simple Particle Background */}
      <SimpleParticleBackground />
      
      {/* Floating Tech Icons - Optimized for performance */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        {[Brain, Code, Zap].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`
            }}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={iconVariants}
          >
            <motion.div
              className="p-4 bg-gradient-to-br from-accent-blue/30 to-accent-mint/30 rounded-full border border-accent-blue/40 backdrop-blur-lg shadow-lg"
              animate={prefersReducedMotion ? {} : {
                y: [-10, 10, -10],
                scale: [1, 1.05, 1]
              }}
              transition={prefersReducedMotion ? {} : {
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            >
              <Icon size={20} className="text-accent-blue" />
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Circular Signal Node Backdrop - Positioned Higher and Smaller */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translateY(-60px)' }}>
        <motion.div 
          className="backdrop-blur-[3px] rounded-full border border-white/10 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] 2xl:w-[780px] 2xl:h-[780px]"
          style={{ 
            background: 'radial-gradient(circle, rgba(15, 23, 42, 0.5) 0%, rgba(30, 41, 59, 0.7) 40%, rgba(15, 23, 42, 0.3) 100%)',
            zIndex: 1
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: [0, 360]
          }}
          transition={{ 
            opacity: { duration: 2, delay: 1.5 },
            scale: { duration: 2, delay: 1.5 },
            rotate: { duration: 120, repeat: Infinity, ease: "linear" }
          }}
        >
          {/* Simplified radar-style rings */}
          <motion.div 
            className="absolute inset-8 border border-accent-blue/20 rounded-full"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-16 border border-accent-mint/15 rounded-full"
            animate={{ 
              scale: [1, 1.03, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          {/* Signal scan line */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-accent-blue/40 to-transparent origin-bottom"
            style={{
              transform: 'translate(-50%, -50%)',
              transformOrigin: 'center center'
            }}
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

        </motion.div>
      </div>
      
      {/* Hero Content - Centered on Screen */}
      <motion.div 
        className="relative z-10 flex items-center justify-center min-h-screen hero-content hw-accelerated"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Dramatic Title with Character Animation */}
          <motion.h1 
            className="heading mb-6 font-light tracking-tight text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
            variants={heroElementVariants}
            style={{
              textShadow: '0 0 50px rgba(96, 165, 250, 0.6), 0 0 100px rgba(96, 165, 250, 0.4), 0 0 20px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9)',
              transformStyle: 'preserve-3d'
            }}
          >
            <HeroTitle 
              firstName="Hello, I'm" 
              lastName="Zhenzhao" 
              delay={0.5}
            />
          </motion.h1>
      
          {/* Simplified Animated Role Presentation */}
          <motion.div 
            className="mb-6"
            variants={heroElementVariants}
          >
            {/* Single Role Text with Character-by-Character Typing Animation */}
            <motion.div 
              className="text-cyan-400 leading-relaxed mb-4 font-mono text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
              style={{
                textShadow: '0 0 30px rgba(96, 165, 250, 0.5), 0 0 60px rgba(96, 165, 250, 0.3), 0 0 10px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 1)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 2.5,
                ease: [0.23, 1, 0.320, 1]
              }}
              onAnimationComplete={() => setSubtitleComplete(true)}
            >
              {"NUS Computer Engineering Student".split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 2.7 + i * 0.05,
                    ease: [0.645, 0.045, 0.355, 1.000],
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -2,
                    textShadow: '0 0 20px rgba(96, 165, 250, 0.8)',
                    transition: { duration: 0.2 }
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.div>

            {/* Main Role Text with Character-by-Character Floating Animation */}
            <motion.div 
              className="text-white leading-relaxed mb-4 font-light text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
              style={{
                textShadow: '0 0 30px rgba(96, 165, 250, 0.5), 0 0 60px rgba(96, 165, 250, 0.3), 0 0 10px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 1)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 3.0,
                ease: [0.23, 1, 0.320, 1]
              }}
            >
              {"AI Engineer & Full-Stack Developer".split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 30, rotateX: -90, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, -2, 0], 
                    rotateX: 0, 
                    scale: 1
                  }}
                  transition={{
                    opacity: {
                      duration: 0.5,
                      delay: 3.2 + i * 0.03,
                      ease: [0.645, 0.045, 0.355, 1.000],
                      type: "spring",
                      stiffness: 150,
                      damping: 12
                    },
                    y: {
                      duration: 3 + i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 4.5 + i * 0.05
                    },
                    rotateX: {
                      duration: 0.5,
                      delay: 3.2 + i * 0.03,
                      ease: [0.645, 0.045, 0.355, 1.000],
                      type: "spring",
                      stiffness: 150,
                      damping: 12
                    },
                    scale: {
                      duration: 0.5,
                      delay: 3.2 + i * 0.03,
                      ease: [0.645, 0.045, 0.355, 1.000],
                      type: "spring",
                      stiffness: 150,
                      damping: 12
                    }
                  }}
                  whileHover={{ 
                    y: -3,
                    scale: 1.05,
                    textShadow: '0 0 25px rgba(255, 255, 255, 0.6)',
                    transition: { duration: 0.2 }
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.div>
            {subtitleComplete && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                className="h-1 bg-gradient-to-r from-transparent via-accent-mint to-transparent mx-auto max-w-md"
                style={{
                  boxShadow: '0 0 20px rgba(52, 211, 153, 0.6), 0 0 40px rgba(52, 211, 153, 0.4)'
                }}
              />
            )}
          </motion.div>

          {/* Description Paragraph with Word-by-Word Animation */}
          <motion.div 
            className="mb-8 max-w-3xl mx-auto"
            variants={heroElementVariants}
          >
            <motion.p 
              className="text-slate-300 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl"
              style={{
                textShadow: '0 0 10px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 1)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 3.5,
                ease: [0.23, 1, 0.320, 1]
              }}
            >
              {"I am dedicated to building practical, impactful, and user-friendly products that bridge the gap between ideas and execution. Passionate about creating solutions that combine functionality with beautiful design.".split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-1"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, -1, 0], 
                    scale: 1
                  }}
                  transition={{
                    opacity: {
                      duration: 0.4,
                      delay: 3.7 + i * 0.08,
                      ease: [0.645, 0.045, 0.355, 1.000],
                      type: "spring",
                      stiffness: 120
                    },
                    y: {
                      duration: 4 + i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 5.5 + i * 0.02
                    },
                    scale: {
                      duration: 0.4,
                      delay: 3.7 + i * 0.08,
                      ease: [0.645, 0.045, 0.355, 1.000],
                      type: "spring",
                      stiffness: 120
                    }
                  }}
                  whileHover={{ 
                    y: -2,
                    scale: 1.05,
                    textShadow: '0 0 15px rgba(148, 163, 184, 0.5)',
                    transition: { duration: 0.2 }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
      
          
          {/* Spectacular Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center gap-3 mt-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5, duration: 1.2, ease: "easeOut" }}
          >
            <motion.p
              className="text-slate-500 text-sm font-medium tracking-wider uppercase"
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                textShadow: '0 0 15px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 1)'
              }}
            >
              Discover My Journey
            </motion.p>
            
            <motion.button
              onClick={scrollToNext}
              className="group relative p-6 bg-gradient-to-br from-dark-card/60 to-dark-card/30 border border-dark-border/50 rounded-full backdrop-blur-sm transition-all duration-500 overflow-hidden"
              whileHover={prefersReducedMotion ? {} : { 
                scale: 1.1,
                y: -5,
                boxShadow: '0 15px 40px rgba(96, 165, 250, 0.3)',
                borderColor: 'rgba(96, 165, 250, 0.5)',
                transition: { duration: 0.3 }
              }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              aria-label="Scroll to next section"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Rotating background ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(96, 165, 250, 0.3), transparent)',
                  padding: '2px'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* Arrow Icon */}
              <motion.div
                className="relative z-10 text-accent-blue"
                animate={{
                  y: [0, 8, 0],
                  rotateX: [0, 15, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowDown size={24} />
              </motion.div>

              {/* Pulse rings */}
              {!prefersReducedMotion && (
                <>
                  <motion.div
                    className="absolute inset-0 border border-accent-blue/30 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 border border-accent-mint/30 rounded-full"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </>
              )}
            </motion.button>
                
            {/* Scroll line indicator */}
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-accent-blue/50 to-transparent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 5.5, duration: 1, ease: "easeOut" }}
              style={{ transformOrigin: 'top' }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}