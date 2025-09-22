'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Zap, Brain, Code } from 'lucide-react'
import { SimpleParticleBackground } from '@/components/ui/SimpleParticleBackground'
import { AnimatedText, HeroTitle } from '@/components/ui/AnimatedText'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useState } from 'react'

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
      
      {/* Floating Tech Icons - Simplified for performance */}
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
              animate={{
                y: [-10, 10, -10],
                scale: [1, 1.05, 1]
              }}
              transition={{
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
          className="w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] xl:w-[780px] xl:h-[780px] backdrop-blur-[3px] rounded-full border border-white/10"
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
        <div className="text-center px-8 max-w-4xl mx-auto">
          {/* Dramatic Title with Character Animation */}
          <motion.h1 
            className="heading text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 font-light tracking-tight"
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
      
          {/* Innovative Animated Role Presentation */}
          <motion.div 
            className="mb-6"
            variants={heroElementVariants}
          >
            {/* Animated Role Cards */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {/* NUS Card */}
              <motion.div
                className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-full backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 2.5,
                  ease: [0.23, 1, 0.320, 1]
                }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <span className="text-blue-300 font-medium text-sm md:text-base">NUS</span>
              </motion.div>

              {/* Computer Engineering Card */}
              <motion.div
                className="px-4 py-2 bg-gradient-to-r from-emerald-600/20 to-emerald-500/20 border border-emerald-500/30 rounded-full backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 2.7,
                  ease: [0.23, 1, 0.320, 1]
                }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <span className="text-emerald-300 font-medium text-sm md:text-base">Computer Engineering</span>
              </motion.div>

              {/* Student Card */}
              <motion.div
                className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-purple-500/20 border border-purple-500/30 rounded-full backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 2.9,
                  ease: [0.23, 1, 0.320, 1]
                }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <span className="text-purple-300 font-medium text-sm md:text-base">Student</span>
              </motion.div>
            </div>

            {/* Animated Connecting Lines */}
            <motion.div
              className="flex justify-center items-center gap-2 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.1, duration: 0.8 }}
            >
              <motion.div
                className="w-8 h-px bg-gradient-to-r from-transparent to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ delay: 3.2, duration: 0.8 }}
              />
              <motion.div
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="w-8 h-px bg-gradient-to-l from-transparent to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ delay: 3.4, duration: 0.8 }}
              />
            </motion.div>

            {/* Main Role Text with Typewriter Effect */}
            <motion.div 
              className="text-xl md:text-2xl lg:text-3xl text-cyan-400 leading-relaxed mb-4 font-mono"
              style={{
                textShadow: '0 0 30px rgba(96, 165, 250, 0.5), 0 0 60px rgba(96, 165, 250, 0.3), 0 0 10px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 1)'
              }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 3.6,
                ease: [0.23, 1, 0.320, 1]
              }}
              onAnimationComplete={() => setSubtitleComplete(true)}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.8, duration: 0.5 }}
              >
                AI Engineer & Full-Stack Developer
              </motion.span>
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

          {/* Description Paragraph */}
          <motion.div 
            className="mb-8 max-w-3xl mx-auto"
            variants={heroElementVariants}
          >
            <motion.p 
              className="text-lg md:text-xl text-slate-300 leading-relaxed"
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
              I am dedicated to building practical, impactful, and user-friendly products that bridge the gap between ideas and execution. Passionate about creating solutions that combine functionality with beautiful design.
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