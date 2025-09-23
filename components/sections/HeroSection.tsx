'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useState, useEffect, useRef, useCallback } from 'react'

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  
  // Touch/mouse tracking for lighting effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const mouseXSpring = useSpring(mouseX, { damping: 60, stiffness: 60 })
  const mouseYSpring = useSpring(mouseY, { damping: 60, stiffness: 60 })
  const [isInteracting, setIsInteracting] = useState(false)
  
  // Smooth interaction spring for gradual transitions
  const interactionValue = useMotionValue(0)
  const interactionSpring = useSpring(interactionValue, { damping: 40, stiffness: 50 })
  
  useEffect(() => {
    interactionValue.set(isInteracting ? 1 : 0)
  }, [isInteracting, interactionValue])
  
  // Mobile optimization - reduce animations on smaller screens
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Handle touch/mouse movement for lighting effects
  const handlePointerMove = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!heroRef.current || prefersReducedMotion) return
    
    const rect = heroRef.current.getBoundingClientRect()
    let clientX: number, clientY: number
    
    if ('touches' in event && event.touches.length > 0) {
      clientX = event.touches[0].clientX
      clientY = event.touches[0].clientY
    } else if ('clientX' in event) {
      clientX = event.clientX
      clientY = event.clientY
    } else {
      return
    }
    
    const x = (clientX - rect.left) / rect.width
    const y = (clientY - rect.top) / rect.height
    
    mouseX.set(x)
    mouseY.set(y)
  }, [mouseX, mouseY, prefersReducedMotion])

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    aboutSection?.scrollIntoView({ behavior: 'smooth' })
  }

  // Clean animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  // Simple text animation - NO CHARACTER STAGGER
  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      onMouseEnter={() => !prefersReducedMotion && setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={(e) => {
        if (!prefersReducedMotion) {
          setIsInteracting(true)
          handlePointerMove(e)
        }
      }}
      onTouchEnd={() => setIsInteracting(false)}
    >
      {/* Base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />
      
      {/* Autonomous fluid animation with subtle mouse influence */}
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          background: useTransform(
            [mouseXSpring, mouseYSpring, interactionSpring],
            ([x, y, interaction]: number[]) => {
              // Smooth convergence effect using interaction spring
              const mouseInfluence = 0.2 + (interaction * 0.5) // 0.2 to 0.7 smoothly
              const mouseX = x * 100
              const mouseY = y * 100
              
              // Blobs converge closer to mouse position with smooth transitions
              const blob1X = 20 + (mouseX - 20) * mouseInfluence
              const blob1Y = 30 + (mouseY - 30) * mouseInfluence
              const blob2X = 80 + (mouseX - 80) * mouseInfluence
              const blob2Y = 70 + (mouseY - 70) * mouseInfluence  
              const blob3X = 60 + (mouseX - 60) * mouseInfluence
              const blob3Y = 20 + (mouseY - 20) * mouseInfluence
              
              // Smooth intensity transition
              const baseIntensity = 0.25 + (interaction * 0.03)
              
              return `
                radial-gradient(ellipse 800px 600px at ${blob1X}% ${blob1Y}%, 
                  rgba(59, 130, 246, ${baseIntensity}) 0%, 
                  rgba(147, 197, 253, ${baseIntensity * 0.6}) 40%, 
                  transparent 70%
                ),
                radial-gradient(ellipse 600px 400px at ${blob2X}% ${blob2Y}%, 
                  rgba(168, 85, 247, ${baseIntensity * 0.8}) 0%, 
                  rgba(196, 181, 253, ${baseIntensity * 0.5}) 50%, 
                  transparent 75%
                ),
                radial-gradient(ellipse 500px 700px at ${blob3X}% ${blob3Y}%, 
                  rgba(34, 197, 94, ${baseIntensity * 0.7}) 0%, 
                  rgba(74, 222, 128, ${baseIntensity * 0.4}) 60%, 
                  transparent 80%
                )
              `.replace(/\s+/g, ' ').trim()
            }
          ),
          filter: 'blur(120px)'
        }}
      />

      {/* Secondary flowing depth layer */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            `conic-gradient(from 0deg at 30% 40%, rgba(59, 130, 246, 0.1) 0deg, rgba(168, 85, 247, 0.06) 120deg, rgba(34, 197, 94, 0.08) 240deg, rgba(59, 130, 246, 0.1) 360deg)`,
            `conic-gradient(from 45deg at 70% 60%, rgba(59, 130, 246, 0.12) 0deg, rgba(168, 85, 247, 0.08) 120deg, rgba(34, 197, 94, 0.1) 240deg, rgba(59, 130, 246, 0.12) 360deg)`,
            `conic-gradient(from 90deg at 50% 30%, rgba(59, 130, 246, 0.11) 0deg, rgba(168, 85, 247, 0.09) 120deg, rgba(34, 197, 94, 0.09) 240deg, rgba(59, 130, 246, 0.11) 360deg)`,
            `conic-gradient(from 135deg at 40% 70%, rgba(59, 130, 246, 0.1) 0deg, rgba(168, 85, 247, 0.07) 120deg, rgba(34, 197, 94, 0.08) 240deg, rgba(59, 130, 246, 0.1) 360deg)`,
            `conic-gradient(from 0deg at 30% 40%, rgba(59, 130, 246, 0.1) 0deg, rgba(168, 85, 247, 0.06) 120deg, rgba(34, 197, 94, 0.08) 240deg, rgba(59, 130, 246, 0.1) 360deg)`
          ]
        }}
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
        style={{
          filter: 'blur(150px)'
        }}
      />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 grid-animation"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Enhanced floating particles with radiating effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main floating particles */}
        {[...Array(isMobile ? 3 : 6)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 bg-blue-400/30 rounded-full"
            style={{
              left: `${20 + (i * (isMobile ? 30 : 15))}%`,
              top: `${30 + Math.random() * 40}%`,
            }}
            animate={prefersReducedMotion ? {} : {
              y: [-20, 20],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Subtle radiating particles that respond to interaction */}
        {[...Array(isMobile ? 8 : 12)].map((_, i) => (
          <motion.div
            key={`radiate-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${15 + (i * 8)}%`,
              top: `${25 + (i % 4) * 20}%`,
              backgroundColor: `rgba(${i % 3 === 0 ? '59, 130, 246' : i % 3 === 1 ? '168, 85, 247' : '34, 197, 94'}, 0.3)`,
              opacity: useTransform(interactionSpring, [0, 1], [0.1, 0.4]),
              scale: useTransform(interactionSpring, [0, 1], [0.5, 1.2]),
              x: useTransform(mouseXSpring, [0, 1], [-5 + i * 2, 5 - i * 2]),
              y: useTransform(mouseYSpring, [0, 1], [-3 + i, 3 - i]),
            }}
            animate={prefersReducedMotion ? {} : {
              y: [-8, 8],
              opacity: [0.1, 0.5, 0.1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 6 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Floating particles that follow the fluid lights */}
        {[...Array(isMobile ? 12 : 18)].map((_, i) => (
          <motion.div
            key={`follow-particle-${i}`}
            className="absolute w-0.5 h-0.5 rounded-full"
            style={{
              backgroundColor: `rgba(${i % 3 === 0 ? '59, 130, 246' : i % 3 === 1 ? '168, 85, 247' : '34, 197, 94'}, 0.6)`,
              left: useTransform(
                [mouseXSpring, mouseYSpring, interactionSpring],
                ([x, y, interaction]: number[]) => {
                  const mouseInfluence = 0.2 + (interaction * 0.5)
                  const mouseX = x * 100
                  
                  // Follow the blob positions with static offset
                  const blobX = i < 6 ? 20 + (mouseX - 20) * mouseInfluence : 
                               i < 12 ? 80 + (mouseX - 80) * mouseInfluence : 
                                       60 + (mouseX - 60) * mouseInfluence
                  
                  return `${blobX + (i * 2 - 18)}%`
                }
              ),
              top: useTransform(
                [mouseXSpring, mouseYSpring, interactionSpring],
                ([x, y, interaction]: number[]) => {
                  const mouseInfluence = 0.2 + (interaction * 0.5)
                  const mouseY = y * 100
                  
                  // Follow the blob positions with static offset
                  const blobY = i < 6 ? 30 + (mouseY - 30) * mouseInfluence : 
                               i < 12 ? 70 + (mouseY - 70) * mouseInfluence : 
                                       20 + (mouseY - 20) * mouseInfluence
                  
                  return `${blobY + (i * 1.5 - 13)}%`
                }
              ),
              opacity: useTransform(interactionSpring, [0, 1], [0.3, 0.8]),
              scale: useTransform(interactionSpring, [0, 1], [0.8, 1.5]),
            }}
            animate={prefersReducedMotion ? {} : {
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
              x: [0, Math.sin(i) * 15, 0],
              y: [0, Math.cos(i) * 12, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

        {/* Main content */}
        <motion.div
          className="relative z-10 text-center px-6 sm:px-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
        {/* Greeting */}
               <motion.div
                 initial={{ opacity: 0, y: 40, scale: 0.9 }}
                 animate={{ 
                   opacity: 1, 
                   y: 0, 
                   scale: 1,
                   rotate: [0, 1, -1, 0]
                 }}
                 transition={{ 
                   delay: 0.1,
                   duration: 0.6, 
                   ease: [0.25, 0.46, 0.45, 0.94],
                   rotate: { delay: 0.8, duration: 2, ease: "easeInOut" }
                 }}
                 className="mb-6"
               >
                 <motion.p 
                   className="text-3xl sm:text-4xl md:text-5xl text-blue-400 font-medium tracking-wide"
                   animate={{
                     textShadow: [
                       '0 0 20px rgba(59, 130, 246, 0.4)',
                       '0 0 30px rgba(59, 130, 246, 0.6)',
                       '0 0 20px rgba(59, 130, 246, 0.4)'
                     ]
                   }}
                   transition={{ delay: 1.0, duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 >
                   Hello, I'm
                 </motion.p>
               </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ 
            opacity: 0, 
            y: 50, 
            scale: 0.8,
            rotateX: 15
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotateX: 0,
            rotateY: [0, 5, -5, 0]
          }}
          transition={{ 
            delay: 0.3,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            rotateY: { delay: 1.2, duration: 4, ease: "easeInOut", repeat: Infinity }
          }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-12 leading-none"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 50%, #34d399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            willChange: 'transform'
          }}
          whileHover={isMobile ? {} : {
            scale: 1.02,
            rotateY: 5,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
        >
          Zhenzhao
        </motion.h1>

        {/* Role Section */}
        <motion.div
          variants={textVariants}
          className="mb-16 space-y-6"
        >
          {/* University */}
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl text-slate-200 font-light tracking-wide"
            variants={textVariants}
          >
            NUS Computer Engineering Student
          </motion.h2>
          
          {/* Elegant separator */}
          <motion.div 
            className="flex items-center justify-center gap-4 my-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent flex-1 max-w-20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            />
            <motion.div 
              className="w-2 h-2 bg-blue-400/60 rounded-full"
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0.6]
              }}
              transition={{ 
                delay: 1.0,
                duration: 0.8, 
                ease: "easeOut",
                repeat: Infinity,
                repeatDelay: 1.2
              }}
            />
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent flex-1 max-w-20"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            />
          </motion.div>
          
          {/* Profession */}
          <motion.h3 
            className="text-xl sm:text-2xl md:text-3xl text-slate-300 font-light tracking-wide"
            variants={textVariants}
          >
            AI Engineer & Full-Stack Developer
          </motion.h3>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <motion.p className="text-xl sm:text-2xl md:text-3xl text-slate-400 leading-relaxed">
            Passionate about transforming ideas into 
            <motion.span
              className="text-blue-300 font-medium"
              animate={{
                textShadow: [
                  '0 0 10px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.8)',
                  '0 0 10px rgba(59, 130, 246, 0.5)'
                ]
              }}
              transition={{ delay: 2.0, duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              innovative AI-powered solutions
            </motion.span>
            {' '}that bridge cutting-edge technology with real-world impact. I thrive on building technology that makes a meaningful difference in people's lives.
          </motion.p>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center"
        >
          <motion.div
            className="flex items-center gap-2 text-slate-400 mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-sm uppercase tracking-wider">Explore My Journey</span>
            <Sparkles size={16} className="text-blue-400" />
          </motion.div>

          <motion.button
            onClick={scrollToNext}
            className="group relative p-4 sm:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to next section"
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div
              className="text-blue-400"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={24} />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>

    </section>
  )
}