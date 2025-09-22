'use client'

import { motion, useMotionValue, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Particle {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
  size: number
  color: string
  alpha: number
  velocity: { x: number; y: number }
}

export function SpectacularParticleSystem() {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentShape, setCurrentShape] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  // Removed spring animations for better performance

  // Different particle formation shapes
  const shapes = [
    'neural-network',
    'dna-helix', 
    'geometric-mandala',
    'flowing-waves',
    'constellation',
    'fractal-tree'
  ]

  // Initialize particles
  useEffect(() => {
    if (prefersReducedMotion || dimensions.width === 0 || dimensions.height === 0) return

    try {
      const newParticles: Particle[] = []
      const particleCount = 60 // Reduced from 150 for better performance

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          targetX: Math.random() * dimensions.width,
          targetY: Math.random() * dimensions.height,
          size: Math.random() * 3 + 1,
          color: ['#60A5FA', '#34D399', '#8B5CF6', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)],
          alpha: Math.random() * 0.8 + 0.2,
          velocity: { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 }
        })
      }
      setParticles(newParticles)
    } catch (error) {
      console.error('Error initializing particles:', error)
      setParticles([])
    }
  }, [prefersReducedMotion, dimensions])

  // Shape formation functions
  const generateShapePositions = useCallback((shapeName: string, centerX: number, centerY: number) => {
    const positions: { x: number; y: number }[] = []
    const particleCount = particles.length

    switch (shapeName) {
      case 'neural-network':
        // Create interconnected nodes in a brain-like network
        for (let i = 0; i < particleCount; i++) {
          const layer = Math.floor(i / 25)
          const nodeInLayer = i % 25
          const layerY = centerY + (layer - 2) * 80
          const layerX = centerX + (nodeInLayer - 12) * 30 + Math.sin(layer) * 60
          positions.push({ 
            x: layerX + Math.sin(i * 0.5) * 40, 
            y: layerY + Math.cos(i * 0.3) * 30 
          })
        }
        break

      case 'dna-helix':
        // Double helix structure
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 8
          const helixRadius = 80
          const x1 = centerX + Math.cos(angle) * helixRadius
          const y1 = centerY + (i / particleCount - 0.5) * 600
          const x2 = centerX + Math.cos(angle + Math.PI) * helixRadius
          
          if (i % 2 === 0) {
            positions.push({ x: x1, y: y1 })
          } else {
            positions.push({ x: x2, y: y1 })
          }
        }
        break

      case 'geometric-mandala':
        // Symmetrical geometric pattern
        for (let i = 0; i < particleCount; i++) {
          const rings = 6
          const ring = Math.floor(i / (particleCount / rings))
          const angleStep = (Math.PI * 2) / (particleCount / rings)
          const angle = (i % (particleCount / rings)) * angleStep
          const radius = (ring + 1) * 40
          
          positions.push({
            x: centerX + Math.cos(angle) * radius + Math.sin(angle * 3) * 20,
            y: centerY + Math.sin(angle) * radius + Math.cos(angle * 3) * 20
          })
        }
        break

      case 'flowing-waves':
        // Simplified wave patterns (removed time-based calculations for performance)
        for (let i = 0; i < particleCount; i++) {
          const waveX = (i / particleCount) * dimensions.width
          const waveY = centerY + Math.sin((i / particleCount) * Math.PI * 3) * 80
          
          positions.push({
            x: waveX,
            y: waveY + Math.sin(i * 0.2) * 30
          })
        }
        break

      case 'constellation':
        // Star constellation pattern
        for (let i = 0; i < particleCount; i++) {
          const starGroup = Math.floor(i / 15)
          const angle = (Math.random() * Math.PI * 2)
          const distance = Math.random() * 120 + 40
          const groupX = centerX + (starGroup % 4 - 1.5) * 200
          const groupY = centerY + Math.floor(starGroup / 4 - 1) * 150
          
          positions.push({
            x: groupX + Math.cos(angle) * distance,
            y: groupY + Math.sin(angle) * distance
          })
        }
        break

      case 'fractal-tree':
        // Simplified tree structure for better performance
        for (let i = 0; i < particleCount; i++) {
          const level = Math.floor(i / 10)
          const branch = i % 10
          const angle = (branch - 4.5) * (Math.PI / 8)
          const distance = 60 + level * 40
          
          positions.push({
            x: centerX + Math.sin(angle) * distance,
            y: centerY + 100 + level * 50 - Math.cos(angle) * distance
          })
        }
        break

      default:
        // Random scatter
        for (let i = 0; i < particleCount; i++) {
          positions.push({
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height
          })
        }
    }

    return positions
  }, [particles.length, dimensions])

  // Update particle positions based on current shape
  useEffect(() => {
    if (prefersReducedMotion || particles.length === 0 || dimensions.width === 0) return

    try {
      const centerX = dimensions.width / 2
      const centerY = dimensions.height / 2
      const shapePositions = generateShapePositions(shapes[currentShape], centerX, centerY)

      setParticles(prevParticles => 
        prevParticles.map((particle, index) => {
          const targetPos = shapePositions[index] || { x: centerX, y: centerY }
          return {
            ...particle,
            targetX: targetPos.x,
            targetY: targetPos.y
          }
        })
      )
    } catch (error) {
      console.error('Error updating particle positions:', error)
    }
  }, [currentShape, generateShapePositions, prefersReducedMotion, particles.length, dimensions])

  // Cycle through shapes
  useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentShape(prev => (prev + 1) % shapes.length)
    }, 8000) // Slower shape changes for better performance

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  // Mouse interaction
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePosition({ x, y })
      mouseX.set(x)
      mouseY.set(y)
    }
  }, [mouseX, mouseY])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }

    window.addEventListener('resize', updateDimensions)
    updateDimensions()
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  if (prefersReducedMotion || particles.length === 0) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-slate-900 to-dark-bg opacity-70">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-accent-blue/5 to-transparent" />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Interactive particle field */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          {/* Glowing effect filters */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Connection line gradient */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6"/>
            <stop offset="50%" stopColor="#34D399" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4"/>
          </linearGradient>
        </defs>

        {/* Optimized connection lines - limited for performance */}
        {particles.map((particle, i) => 
          particles.slice(i + 1, i + 4).map((otherParticle, j) => { // Only check next 3 particles
            const distance = Math.sqrt(
              Math.pow(particle.targetX - otherParticle.targetX, 2) + 
              Math.pow(particle.targetY - otherParticle.targetY, 2)
            )
            
            if (distance < 80) { // Reduced connection distance
              return (
                <line // Using basic line instead of motion.line for performance
                  key={`${i}-${j}`}
                  x1={particle.targetX}
                  y1={particle.targetY}
                  x2={otherParticle.targetX}
                  y2={otherParticle.targetY}
                  stroke="url(#connectionGradient)"
                  strokeWidth={Math.max(0.3, 1.5 - distance / 60)}
                  opacity={Math.max(0.1, 0.8 - distance / 80)}
                />
              )
            }
            return null
          })
        )}

        {/* Particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.circle
              key={particle.id}
              r={particle.size}
              fill={particle.color}
              filter="url(#glow)"
              opacity={particle.alpha}
              initial={{ 
                cx: particle.x, 
                cy: particle.y,
                scale: 0
              }}
              animate={{ 
                cx: particle.targetX, 
                cy: particle.targetY,
                scale: 1
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut"
              }}
              whileHover={{
                r: particle.size * 2,
                opacity: 1,
                transition: { duration: 0.2 }
              }}
            />
          ))}
        </AnimatePresence>

        {/* Simplified mouse interaction effect */}
        <circle
          cx={mousePosition.x}
          cy={mousePosition.y}
          r="25"
          fill="none"
          stroke="#60A5FA"
          strokeWidth="2"
          opacity="0.4"
        />
      </svg>

      {/* Shape name indicator */}
      <motion.div
        className="absolute top-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg text-accent-blue text-sm font-mono"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        key={currentShape}
        transition={{ duration: 0.5 }}
      >
        {shapes[currentShape].replace('-', ' ').toUpperCase()}
      </motion.div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg/80 via-transparent to-dark-bg/60 pointer-events-none" />
    </div>
  )
}
