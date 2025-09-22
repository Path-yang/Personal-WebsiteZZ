'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingStage, setLoadingStage] = useState('Initializing')
  const prefersReducedMotion = useReducedMotion()

  const stages = [
    'Initializing Neural Networks...',
    'Loading AI Components...',
    'Compiling Data Streams...',
    'Optimizing Performance...',
    'Ready to Innovate!'
  ]

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLoading(false)
      return
    }

    let currentProgress = 0
    let stageIndex = 0

    const interval = setInterval(() => {
      currentProgress += Math.random() * 20 + 8
      
      if (currentProgress >= 100) {
        currentProgress = 100
        setProgress(100)
        setLoadingStage(stages[4])
        
        setTimeout(() => {
          setIsLoading(false)
        }, 600)
        
        clearInterval(interval)
      } else {
        setProgress(currentProgress)
        
        // Update stage based on progress
        const newStageIndex = Math.floor((currentProgress / 100) * (stages.length - 1))
        if (newStageIndex !== stageIndex && newStageIndex < stages.length - 1) {
          stageIndex = newStageIndex
          setLoadingStage(stages[stageIndex])
        }
      }
    }, 300)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  if (!isLoading) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          scale: 1.1,
          transition: { duration: 0.8, ease: "easeInOut" }
        }}
      >
        {/* Minimal background particles for maximum performance */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent-blue rounded-full opacity-20"
              style={{
                left: `${25 + i * 10}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                y: [0, -30, -60]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Central loading content */}
        <div className="text-center z-10 px-8">
          {/* Logo animation */}
          <motion.div
            className="mb-12"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              transition: {
                duration: 1,
                ease: [0.68, -0.55, 0.265, 1.55],
                type: "spring",
                stiffness: 200
              }
            }}
          >
            <motion.div
              className="w-24 h-24 mx-auto bg-gradient-to-br from-accent-blue to-accent-mint rounded-2xl flex items-center justify-center mb-6 relative"
              animate={{
                boxShadow: [
                  '0 0 15px rgba(96, 165, 250, 0.3)',
                  '0 0 25px rgba(52, 211, 153, 0.4)',
                  '0 0 15px rgba(96, 165, 250, 0.3)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {/* Static background for better performance */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-mint to-accent-blue rounded-2xl" />
              
              {/* Central icon - minimal animation */}
              <motion.div
                className="relative z-10 text-white text-3xl font-bold"
                animate={{
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                YZ
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl font-light text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Yang{' '}
              <motion.span 
                className="text-accent-blue font-medium"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(96, 165, 250, 0.5)',
                    '0 0 40px rgba(96, 165, 250, 0.8)',
                    '0 0 20px rgba(96, 165, 250, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Zhenzhao
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Progress section */}
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {/* Loading text */}
            <motion.p
              className="text-lg text-slate-300 mb-6 h-6"
              key={loadingStage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {loadingStage}
            </motion.p>

            {/* Progress bar */}
            <div className="relative">
              <div className="w-full h-2 bg-dark-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-blue to-accent-mint rounded-full relative"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Static progress bar glow for performance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-mint opacity-70 blur-sm" />
                </motion.div>
              </div>
              
              {/* Static progress percentage for performance */}
              <div
                className="absolute -top-8 text-accent-blue font-mono text-sm"
                style={{ 
                  left: `${Math.max(progress - 5, 0)}%`,
                  textShadow: '0 0 15px rgba(96, 165, 250, 0.6)'
                }}
              >
                {Math.round(progress)}%
              </div>
            </div>

            {/* Simplified loading dots */}
            <motion.div 
              className="flex justify-center gap-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-accent-blue rounded-full"
                  animate={{
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Simplified tech stack indicators */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 text-slate-500 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            {['Next.js', 'TypeScript', 'Framer Motion', 'AI/ML'].map((tech, i) => (
              <motion.span
                key={tech}
                animate={{
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.8
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>

      </motion.div>
    </AnimatePresence>
  )
}
