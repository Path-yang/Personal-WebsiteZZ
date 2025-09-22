'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface TouchRipple {
  id: string
  x: number
  y: number
  timestamp: number
}

export function DramaticBackground() {
  const [touchRipples, setTouchRipples] = useState<TouchRipple[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const prefersReducedMotion = useReducedMotion()
  const controls = useAnimation()

  // Create dramatic touch ripples
  const createTouchRipple = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (prefersReducedMotion) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top

    const newRipple: TouchRipple = {
      id: `ripple-${Date.now()}-${Math.random()}`,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      timestamp: Date.now()
    }

    setTouchRipples(prev => [...prev.slice(-4), newRipple]) // Keep max 5 ripples

    // Remove ripple after animation
    setTimeout(() => {
      setTouchRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 2000)
  }, [prefersReducedMotion])

  // Track mouse for dynamic effects
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (prefersReducedMotion) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    })
  }, [prefersReducedMotion])

  // Animate on mount
  useEffect(() => {
    if (!prefersReducedMotion) {
      controls.start("visible")
    }
  }, [controls, prefersReducedMotion])

  const geometricVariants = {
    hidden: { 
      pathLength: 0, 
      opacity: 0,
      scale: 0.8,
      rotate: -45
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 3,
        ease: [0.645, 0.045, 0.355, 1.000],
        delay: 0.5
      }
    }
  }

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: [0, 1.5, 1],
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: 2 + i * 0.2,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    })
  }

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card/20 to-dark-bg" />
    )
  }

  return (
    <div 
      className="absolute inset-0 overflow-hidden cursor-crosshair"
      onMouseDown={createTouchRipple}
      onTouchStart={createTouchRipple}
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px' }}
    >
      {/* Dynamic gradient background that responds to mouse */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(96, 165, 250, 0.15) 0%, 
            rgba(52, 211, 153, 0.1) 30%, 
            rgba(15, 23, 42, 0.8) 70%)`
        }}
        animate={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(96, 165, 250, 0.15) 0%, 
            rgba(52, 211, 153, 0.1) 30%, 
            rgba(15, 23, 42, 0.8) 70%)`
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Complex geometric self-building animation */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        style={{ zIndex: 1 }}
      >
        {/* Main complex geometric pattern */}
        <motion.g initial="hidden" animate={controls} variants={geometricVariants}>
          {/* Central complex shape */}
          <motion.path
            d="M600 100 L800 200 L900 400 L700 600 L500 600 L300 400 L400 200 Z"
            stroke="url(#complexGradient1)"
            strokeWidth="2"
            fill="none"
            variants={geometricVariants}
          />
          
          {/* Radiating complex lines */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
            const angle = (i * 45) * (Math.PI / 180)
            const x1 = 600 + Math.cos(angle) * 150
            const y1 = 400 + Math.sin(angle) * 150
            const x2 = 600 + Math.cos(angle) * 300
            const y2 = 400 + Math.sin(angle) * 300
            
            return (
              <motion.line
                key={`ray-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#complexGradient2)"
                strokeWidth="1.5"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: 0.7,
                    transition: {
                      duration: 2,
                      delay: 1 + i * 0.1,
                      ease: "easeOut"
                    }
                  }
                }}
              />
            )
          })}

          {/* Orbital rings */}
          {[200, 300, 400].map((radius, i) => (
            <motion.circle
              key={`orbit-${i}`}
              cx="600"
              cy="400"
              r={radius}
              stroke="url(#complexGradient3)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="10,5"
              variants={{
                hidden: { pathLength: 0, opacity: 0, rotate: -180 },
                visible: {
                  pathLength: 1,
                  opacity: 0.4,
                  rotate: 0,
                  transition: {
                    duration: 3,
                    delay: 1.5 + i * 0.3,
                    ease: "easeInOut"
                  }
                }
              }}
              style={{ transformOrigin: '600px 400px' }}
            />
          ))}
        </motion.g>

        {/* Floating energy nodes */}
        <motion.g>
          {[
            { x: 200, y: 150, size: 12 },
            { x: 1000, y: 200, size: 8 },
            { x: 150, y: 600, size: 10 },
            { x: 1050, y: 650, size: 14 },
            { x: 600, y: 100, size: 16 },
            { x: 300, y: 400, size: 8 },
            { x: 900, y: 500, size: 12 }
          ].map((node, i) => (
            <motion.g key={`node-${i}`}>
              {/* Main node */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill="url(#nodeGradient)"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={nodeVariants}
              />
              
              {/* Pulsing rings */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size * 2}
                stroke="#60A5FA"
                strokeWidth="2"
                fill="none"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.8, 0, 0.8]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 3 + i * 0.5,
                  ease: "easeInOut"
                }}
              />

              {/* Orbiting particles */}
              <motion.circle
                r="3"
                fill="#34D399"
                animate={{
                  cx: [node.x + node.size * 2, node.x - node.size * 2, node.x + node.size * 2],
                  cy: [node.y, node.y, node.y]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 4 + i * 0.3,
                  ease: "linear"
                }}
              />
            </motion.g>
          ))}
        </motion.g>

        {/* Touch ripple effects */}
        {touchRipples.map(ripple => (
          <motion.g key={ripple.id}>
            {/* Main ripple */}
            <motion.circle
              cx={`${ripple.x}%`}
              cy={`${ripple.y}%`}
              r="0"
              stroke="#60A5FA"
              strokeWidth="3"
              fill="none"
              initial={{ r: 0, opacity: 1 }}
              animate={{ 
                r: [0, 100, 200],
                opacity: [1, 0.5, 0],
                strokeWidth: [3, 2, 1]
              }}
              transition={{
                duration: 2,
                ease: "easeOut"
              }}
            />
            
            {/* Secondary ripple */}
            <motion.circle
              cx={`${ripple.x}%`}
              cy={`${ripple.y}%`}
              r="0"
              stroke="#34D399"
              strokeWidth="2"
              fill="none"
              initial={{ r: 0, opacity: 0.8 }}
              animate={{ 
                r: [0, 50, 120],
                opacity: [0.8, 0.3, 0]
              }}
              transition={{
                duration: 1.5,
                delay: 0.2,
                ease: "easeOut"
              }}
            />

            {/* Burst particles */}
            {[0, 1, 2, 3, 4, 5].map(i => {
              const angle = (i * 60) * (Math.PI / 180)
              return (
                <motion.circle
                  key={`burst-${i}`}
                  r="2"
                  fill="#60A5FA"
                  initial={{ 
                    cx: `${ripple.x}%`, 
                    cy: `${ripple.y}%`,
                    opacity: 1
                  }}
                  animate={{
                    cx: `${ripple.x + Math.cos(angle) * 15}%`,
                    cy: `${ripple.y + Math.sin(angle) * 15}%`,
                    opacity: 0,
                    scale: [1, 1.5, 0]
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.1,
                    ease: "easeOut"
                  }}
                />
              )
            })}
          </motion.g>
        ))}

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="complexGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#34D399" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#60A5FA" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.8" />
          </linearGradient>
          
          <linearGradient id="complexGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.4" />
          </linearGradient>
          
          <linearGradient id="complexGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#34D399" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.6" />
          </linearGradient>

          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="1" />
            <stop offset="70%" stopColor="#34D399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.6" />
          </radialGradient>
        </defs>
      </svg>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={`float-${i}`}
            className="absolute w-4 h-4 border border-accent-blue/30"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
              transform: 'rotate(45deg)'
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [45, 135, 45],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}
