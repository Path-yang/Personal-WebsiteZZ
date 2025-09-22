'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMobileOptimization } from '@/hooks/useMobileOptimization'

interface TrailNode {
  id: number
  x: number
  y: number
  timestamp: number
  opacity: number
}

export function CursorEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isVisible, setIsVisible] = useState(false)
  const [trailNodes, setTrailNodes] = useState<TrailNode[]>([])
  const prefersReducedMotion = useReducedMotion()
  const { isMobile } = useMobileOptimization()
  const nodeIdRef = useRef(0)

  // Don't render cursor effects on mobile devices
  if (isMobile) {
    return null
  }

  useEffect(() => {
    if (prefersReducedMotion) return

    const updateMousePosition = (e: MouseEvent) => {
      const newX = e.clientX
      const newY = e.clientY
      
      setMousePosition({ x: newX, y: newY })
      setIsVisible(true)

      // Create trail nodes every 8px of movement for smooth trails
      setTrailNodes(prev => {
        const lastNode = prev[prev.length - 1]
        const distance = lastNode ? 
          Math.sqrt(Math.pow(newX - lastNode.x, 2) + Math.pow(newY - lastNode.y, 2)) : 100
        
        if (distance > 8) {
          const newNode: TrailNode = {
            id: nodeIdRef.current++,
            x: newX,
            y: newY,
            timestamp: Date.now(),
            opacity: 1
          }
          
          // Keep last 15 nodes for trail effect
          return [...prev.slice(-14), newNode]
        }
        return prev
      })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('a, button, [role="button"]')) {
        setCursorVariant('hover')
      } else if (target.closest('h1, h2, h3')) {
        setCursorVariant('text')
      } else {
        setCursorVariant('default')
      }
    }

    const handleMouseLeave = () => {
      setCursorVariant('default')
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseEnter)
    window.addEventListener('mouseout', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseEnter)
      window.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [prefersReducedMotion])

  // Update trail node opacities
  useEffect(() => {
    if (prefersReducedMotion || trailNodes.length === 0) return

    const interval = setInterval(() => {
      setTrailNodes(prev => {
        const now = Date.now()
        return prev.map(node => ({
          ...node,
          opacity: Math.max(0, 1 - (now - node.timestamp) / 1000) // Fade over 1 second
        })).filter(node => node.opacity > 0.05)
      })
    }, 50)

    return () => clearInterval(interval)
  }, [trailNodes.length, prefersReducedMotion])

  if (prefersReducedMotion || !isVisible) return null

  const variants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(96, 165, 250, 0.4)',
      border: '2px solid rgba(96, 165, 250, 0.6)',
      boxShadow: '0 0 15px rgba(96, 165, 250, 0.3)'
    },
    hover: {
      scale: 1.8,
      backgroundColor: 'rgba(52, 211, 153, 0.5)',
      border: '2px solid rgba(52, 211, 153, 0.9)',
      boxShadow: '0 0 25px rgba(52, 211, 153, 0.5)'
    },
    text: {
      scale: 0.6,
      backgroundColor: 'rgba(168, 85, 247, 0.5)',
      border: '2px solid rgba(168, 85, 247, 0.9)',
      boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)'
    }
  }

  return (
    <>
      {/* Trail Connection Lines - SVG for better performance */}
      <svg 
        className="fixed inset-0 pointer-events-none z-[996] w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      >
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(96, 165, 250, 0.8)" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="rgba(52, 211, 153, 0.6)" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.4)" stopOpacity="0.4"/>
          </linearGradient>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Connection lines between trail nodes */}
        {trailNodes.map((node, index) => {
          if (index === 0) return null
          const prevNode = trailNodes[index - 1]
          const opacity = Math.min(node.opacity, prevNode.opacity) * 0.8
          
          return (
            <motion.line
              key={`line-${node.id}`}
              x1={prevNode.x}
              y1={prevNode.y}
              x2={node.x}
              y2={node.y}
              stroke="url(#trailGradient)"
              strokeWidth="2"
              filter="url(#lineGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          )
        })}
        
        {/* Signal propagation lines from cursor to recent nodes */}
        {trailNodes.slice(-3).map((node, index) => (
          <motion.line
            key={`signal-${node.id}`}
            x1={mousePosition.x}
            y1={mousePosition.y}
            x2={node.x}
            y2={node.y}
            stroke="rgba(96, 165, 250, 0.3)"
            strokeWidth="1"
            strokeDasharray="4,4"
            filter="url(#lineGlow)"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: 1.5,
              delay: index * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>

      {/* Enhanced Main Cursor with Orbital Rings */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999]"
        style={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
      >
        {/* Outer orbital ring */}
        <motion.div
          className="absolute w-10 h-10 rounded-full border border-accent-blue/40"
          animate={{
            rotate: [0, 360],
            scale: cursorVariant === 'hover' ? 1.5 : 1
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.3 }
          }}
        />
        
        {/* Middle ring */}
        <motion.div
          className="absolute inset-2 rounded-full border border-accent-mint/50"
          animate={{
            rotate: [360, 0],
            scale: cursorVariant === 'hover' ? 1.3 : 1
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.3 }
          }}
        />
        
        {/* Core cursor */}
        <motion.div
          className="absolute inset-3 rounded-full"
          variants={variants}
          animate={cursorVariant}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
            duration: 0.3
          }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 bg-white rounded-full"
          animate={{
            scale: cursorVariant === 'hover' ? 1.5 : 1,
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            scale: { duration: 0.3 },
            opacity: { duration: 1.5, repeat: Infinity }
          }}
        />
      </motion.div>

      {/* Trail Nodes with Dynamic Effects */}
      {trailNodes.map((node, index) => {
        const isRecent = index >= trailNodes.length - 5
        const nodeSize = isRecent ? 8 : 6
        
        return (
          <motion.div
            key={node.id}
            className="fixed pointer-events-none z-[998] rounded-full"
            style={{
              x: node.x - nodeSize/2,
              y: node.y - nodeSize/2,
              width: nodeSize,
              height: nodeSize,
              background: `radial-gradient(circle, ${
                isRecent ? 'rgba(52, 211, 153, 0.9)' : 'rgba(96, 165, 250, 0.7)'
              } 0%, transparent 70%)`,
              boxShadow: `0 0 ${nodeSize * 2}px ${
                isRecent ? 'rgba(52, 211, 153, 0.5)' : 'rgba(96, 165, 250, 0.3)'
              }`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: node.opacity,
              rotateZ: [0, 360]
            }}
            transition={{ 
              scale: { duration: 0.3, ease: "backOut" },
              rotateZ: { duration: 4, repeat: Infinity, ease: "linear" }
            }}
          >
            {/* Node pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-current"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.8, 0, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeOut"
              }}
            />
          </motion.div>
        )
      })}

      {/* Enhanced Cursor Glow with Magnetic Field Effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[997]"
        style={{
          x: mousePosition.x - 60,
          y: mousePosition.y - 60,
          width: 120,
          height: 120,
        }}
      >
        {/* Primary glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(52, 211, 153, 0.1) 50%, transparent 70%)',
            filter: 'blur(20px)'
          }}
          animate={{
            scale: cursorVariant === 'hover' ? 1.8 : 1,
            opacity: cursorVariant === 'hover' ? 0.9 : 0.5
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 30
          }}
        />
        
        {/* Secondary pulse glow */}
        <motion.div
          className="absolute inset-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 60%)',
            filter: 'blur(15px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Magnetic Field Lines */}
      {cursorVariant === 'hover' && (
        <svg 
          className="fixed inset-0 pointer-events-none z-[995] w-full h-full"
          style={{ mixBlendMode: 'screen' }}
        >
          {[...Array(6)].map((_, i) => {
            const radius = 40 + i * 15
            const circumference = 2 * Math.PI * radius
            
            return (
              <motion.circle
                key={`field-${i}`}
                cx={mousePosition.x}
                cy={mousePosition.y}
                r={radius}
                fill="none"
                stroke="rgba(52, 211, 153, 0.2)"
                strokeWidth="1"
                strokeDasharray={`${circumference * 0.2},${circumference * 0.8}`}
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ 
                  opacity: [0, 0.6, 0],
                  rotate: 360
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2
                }}
              />
            )
          })}
        </svg>
      )}
    </>
  )
}
