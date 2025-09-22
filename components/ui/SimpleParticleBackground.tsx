'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useState, useEffect, useMemo } from 'react'

export function SimpleParticleBackground() {
  const prefersReducedMotion = useReducedMotion()
  const [currentShape, setCurrentShape] = useState(0)


  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-slate-900" />
    )
  }


      // Cycle through all 4 patterns with extended duration
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentShape(prev => (prev + 1) % 4)
        }, 9000) // Extended by 1 second as requested (8s → 9s)
        return () => {
          try {
            clearInterval(interval)
          } catch (error) {
            console.warn('Error clearing particle interval:', error)
          }
        }
      }, [])

  // CRYSTAL CLEAR meaningful shapes with perfect structure
  const getParticlePositions = (shapeType: number) => {
    const particles = []
        // Mobile optimization: reduce particle count for better performance
        const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      let x, y, size, color, duration, nodeType = 'normal'

      switch (shapeType) {
        case 0: // NEURAL NETWORK - Clear network topology
          if (i < 15) {
            // Input layer (left)
            x = 15
            y = 20 + (i / 14) * 60
            size = 8
            color = '#60A5FA'
            nodeType = 'input'
          } else if (i < 35) {
            // Hidden layer 1
            x = 35
            y = 15 + ((i - 15) / 19) * 70
            size = 6
            color = '#34D399'
            nodeType = 'hidden1'
          } else if (i < 55) {
            // Hidden layer 2  
            x = 55
            y = 15 + ((i - 35) / 19) * 70
            size = 6
            color = '#8B5CF6'
            nodeType = 'hidden2'
          } else if (i < 70) {
            // Hidden layer 3
            x = 75
            y = 20 + ((i - 55) / 14) * 60
            size = 6
            color = '#F59E0B'
            nodeType = 'hidden3'
          } else {
            // Output layer (right)
            x = 90
            y = 30 + ((i - 70) / 29) * 40
            size = 8
            color = '#EF4444'
            nodeType = 'output'
          }
          break

        case 1: // DNA DOUBLE HELIX - Elegant spiral structure
          if (i < 25) {
            // Left DNA strand - spiral backbone
            const helixProgress = (i / 25) * 4 * Math.PI // 4 full rotations
            const verticalPos = 15 + (i / 25) * 70 // Top to bottom
            const radius = 12
            x = 50 - Math.cos(helixProgress) * radius
            y = verticalPos
            size = 6
            color = '#60A5FA'
            nodeType = 'dna-left'
          } else if (i < 50) {
            // Right DNA strand - spiral backbone
            const strandIndex = i - 25
            const helixProgress = (strandIndex / 25) * 4 * Math.PI // 4 full rotations
            const verticalPos = 15 + (strandIndex / 25) * 70 // Top to bottom
            const radius = 12
            x = 50 + Math.cos(helixProgress) * radius
            y = verticalPos
            size = 6
            color = '#34D399'
            nodeType = 'dna-right'
          } else if (i < 75) {
            // Base pairs - connecting the two strands
            const pairIndex = i - 50
            const pairProgress = (pairIndex / 25) * 4 * Math.PI
            const verticalPos = 18 + (pairIndex / 25) * 64 // Slightly inset
            const leftRadius = 12
            const rightRadius = 12
            
            // Alternate between left and right base
            if (pairIndex % 2 === 0) {
              // Left base (A or T)
              x = 50 - Math.cos(pairProgress) * leftRadius * 0.7
              y = verticalPos
              size = 4
              color = '#8B5CF6'
              nodeType = 'base-left'
            } else {
              // Right base (G or C)
              x = 50 + Math.cos(pairProgress) * rightRadius * 0.7
              y = verticalPos
              size = 4
              color = '#F59E0B'
              nodeType = 'base-right'
            }
          } else {
            // Information flow particles - traveling along the helix
            const flowIndex = i - 75
            const flowProgress = (flowIndex / 25) * 4 * Math.PI + Date.now() * 0.001
            const verticalPos = 20 + (flowIndex / 25) * 60
            const flowRadius = 8
            x = 50 + Math.cos(flowProgress) * flowRadius
            y = verticalPos
            size = 3
            color = '#EF4444'
            nodeType = 'info-flow'
          }
          break

        case 2: // QUANTUM COMPUTING - Qubit visualization with quantum gates
          if (i < 20) {
            // Central Quantum Core - circular arrangement
            const angle = (i / 20) * Math.PI * 2
            const radius = 12
            x = 50 + Math.cos(angle) * radius
            y = 50 + Math.sin(angle) * radius
            size = 8
            color = '#60A5FA'
            nodeType = 'qubit'
          } else if (i < 40) {
            // Quantum Gates - forming geometric patterns
            const gateIndex = i - 20
            const layer = Math.floor(gateIndex / 5)
            const pos = gateIndex % 5
            
            // Create quantum gate layers in expanding rings
            const gateAngle = (pos / 5) * Math.PI * 2
            const gateRadius = 20 + layer * 8
            x = 50 + Math.cos(gateAngle) * gateRadius
            y = 50 + Math.sin(gateAngle) * gateRadius
            size = 6
            color = '#34D399'
            nodeType = 'gate'
          } else if (i < 60) {
            // Entangled Particles - paired positions
            const pairIndex = (i - 40) / 2
            const isPrimary = (i - 40) % 2 === 0
            const pairAngle = (pairIndex / 10) * Math.PI * 2
            const entangleRadius = 35
            
            x = 50 + Math.cos(pairAngle) * entangleRadius + (isPrimary ? 3 : -3)
            y = 50 + Math.sin(pairAngle) * entangleRadius + (isPrimary ? 3 : -3)
            size = 5
            color = '#8B5CF6'
            nodeType = isPrimary ? 'entangled-a' : 'entangled-b'
          } else if (i < 80) {
            // Quantum Superposition Cloud - probabilistic positions
            const cloudIndex = i - 60
            const superAngle = (cloudIndex / 20) * Math.PI * 4 // Double rotation
            const superRadius = 45 + Math.sin(cloudIndex * 0.5) * 10
            x = 50 + Math.cos(superAngle) * superRadius
            y = 50 + Math.sin(superAngle) * superRadius
            size = 4
            color = '#F59E0B'
            nodeType = 'superposition'
          } else {
            // Quantum Measurement Points - observation nodes
            const measureIndex = i - 80
            const measureAngle = (measureIndex / 20) * Math.PI * 2
            const measureRadius = 55
            x = 50 + Math.cos(measureAngle) * measureRadius
            y = 50 + Math.sin(measureAngle) * measureRadius
            size = 3
            color = '#EF4444'
            nodeType = 'measurement'
          }
          break

        case 3: // COMPUTER CHIP - Integrated circuit layout (brought back!)
          if (i < 25) {
            // Main processor cores (center grid)
            const row = Math.floor(i / 5)
            const col = i % 5
            x = 35 + col * 6
            y = 35 + row * 6
            size = 6
            color = '#60A5FA'
            nodeType = 'core'
          } else if (i < 50) {
            // Cache memory (surrounding cores)
            const cacheIndex = i - 25
            const side = Math.floor(cacheIndex / 6.25)
            const pos = cacheIndex % 6.25
            
            if (side === 0) { // Top
              x = 30 + pos * 5
              y = 25
            } else if (side === 1) { // Right
              x = 70
              y = 30 + pos * 5
            } else if (side === 2) { // Bottom
              x = 65 - pos * 5
              y = 75
            } else { // Left
              x = 25
              y = 70 - pos * 5
            }
            size = 4
            color = '#34D399'
            nodeType = 'cache'
          } else if (i < 75) {
            // I/O pins (edges)
            const pinIndex = i - 50
            const edge = Math.floor(pinIndex / 6.25)
            const pinPos = pinIndex % 6.25
            
            if (edge === 0) { // Top edge
              x = 10 + pinPos * 12
              y = 10
            } else if (edge === 1) { // Right edge
              x = 90
              y = 10 + pinPos * 12
            } else if (edge === 2) { // Bottom edge
              x = 90 - pinPos * 12
              y = 90
            } else { // Left edge
              x = 10
              y = 90 - pinPos * 12
            }
            size = 3
            color = '#8B5CF6'
            nodeType = 'io'
          } else {
            // Power distribution (connecting paths)
            const pathIndex = i - 75
            x = 15 + (pathIndex % 8) * 10
            y = 15 + Math.floor(pathIndex / 8) * 15
            size = 2
            color = '#F59E0B'
            nodeType = 'power'
          }
          break

        default:
          x = Math.random() * 100
          y = Math.random() * 100
          size = Math.random() * 6 + 3
          color = '#60A5FA'
          nodeType = 'default'
      }

      duration = Math.random() * 8 + 6

      particles.push({
        id: i,
        x: Math.max(5, Math.min(95, x)),
        y: Math.max(5, Math.min(95, y)),
        size,
        color,
        duration,
        delay: Math.random() * 0.5,
        nodeType
      })
    }
        return particles
      }

  // Get particle positions
  const particles = getParticlePositions(currentShape)

  // Full particle count for complete animations
  const maxParticles = 50
  const displayParticles = particles.slice(0, maxParticles)

  // Simplified enhanced particles (removing complex useTransform to fix runtime issues)
  const enhancedParticles = displayParticles

  return (
    <div 
      className="absolute inset-0 overflow-hidden particle-container" 
      style={{ zIndex: 0 }}
    >
      {/* Dark base background */}
      <div className="absolute inset-0 bg-slate-900" />
      
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(96, 165, 250, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(52, 211, 153, 0.05) 0%, transparent 50%), linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%)',
            'radial-gradient(circle at 80% 30%, rgba(96, 165, 250, 0.05) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(52, 211, 153, 0.05) 0%, transparent 50%), linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%)',
            'radial-gradient(circle at 50% 20%, rgba(96, 165, 250, 0.05) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(52, 211, 153, 0.05) 0%, transparent 50%), linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%)'
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Additional dark overlay for extra darkness */}
      <div className="absolute inset-0 bg-black/30" />

      {/* MAGNETICALLY ENHANCED PARTICLES */}
      {enhancedParticles.map((particle) => (
        <motion.div
          key={`${currentShape}-${particle.id}`}
          className="absolute rounded-full opacity-80"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size * 1.3, // Enhanced size for better impact
            height: particle.size * 1.3,
            background: `radial-gradient(circle, ${particle.color}98 0%, ${particle.color}50 40%, ${particle.color}20 70%, transparent 100%)`,
            boxShadow: `
              0 0 ${particle.size * 4}px ${particle.color}90, 
              0 0 ${particle.size * 8}px ${particle.color}40,
              0 0 ${particle.size * 12}px ${particle.color}15,
              inset 0 0 ${particle.size * 1.5}px ${particle.color}50
            `,
            border: `1px solid ${particle.color}30`,
            transformStyle: 'preserve-3d'
          }}
          initial={{ 
            scale: 0, 
            opacity: 0,
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            rotateX: -180,
            rotateY: -180
          }}
          animate={{
            // DRAMATIC SCALE BREATHING
            scale: [0, 1.8, 0.9, 1.5, 1.1, 1.3, 1],
            
            // ENHANCED OPACITY PULSING
            opacity: [0, 1, 0.8, 1, 0.7, 0.95, 0.85],
            
            // COMPLEX ORBITAL MOVEMENT
            x: [
              Math.random() * 400 - 200, 
              Math.sin(particle.id * 0.8) * 80, 
              Math.cos(particle.id * 0.4) * 60, 
              Math.sin(particle.id * 1.2) * 70,
              Math.cos(particle.id * 0.6) * 30,
              0
            ],
            y: [
              Math.random() * 400 - 200,
              Math.cos(particle.id * 0.7) * 70, 
              Math.sin(particle.id * 0.9) * 55, 
              Math.cos(particle.id * 1.1) * 65,
              Math.sin(particle.id * 0.5) * 35,
              0
            ],
            
            // SPECTACULAR ROTATION
            rotate: [Math.random() * 720, 240, 480, 720, 360, 180, 0],
            
            // 3D TRANSFORMS FOR DEPTH
            rotateX: [-180, 90, 180, 270, 360, 180, 0],
            rotateY: [-180, 135, 270, 180, 90, 45, 0],
            
            // DYNAMIC BLUR EFFECTS
            filter: [
              `blur(3px) brightness(0.4) saturate(0.5)`,
              `blur(0px) brightness(1.3) saturate(1.2)`,
              `blur(1px) brightness(0.9) saturate(1.1)`,
              `blur(0px) brightness(1.2) saturate(1.3)`,
              `blur(0px) brightness(1.1) saturate(1.2)`,
              `blur(0px) brightness(1) saturate(1)`
            ]
          }}
          transition={{
            duration: particle.duration * 1.4, // Longer for more dramatic effect
            repeat: Infinity,
            delay: particle.delay,
            ease: [0.23, 1, 0.32, 1], // Custom cubic-bezier for organic feel
            
            // STAGGERED TIMING FOR COMPLEXITY
            scale: { 
              duration: particle.duration * 1.2, 
              ease: "backInOut",
              times: [0, 0.2, 0.4, 0.6, 0.7, 0.9, 1]
            },
            opacity: { 
              duration: particle.duration * 0.8, 
              ease: "easeInOut",
              times: [0, 0.15, 0.35, 0.55, 0.7, 0.85, 1]
            },
            rotate: { 
              duration: particle.duration * 2, 
              ease: "circInOut",
              times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1]
            },
            filter: { 
              duration: particle.duration * 0.6, 
              ease: "easeInOut"
            }
          }}
          
          // ENHANCED HOVER EFFECTS
          whileHover={{
            scale: 2.5,
            opacity: 1,
            rotate: 360,
            rotateX: 180,
            rotateY: 180,
            filter: `blur(0px) brightness(1.8) saturate(1.5) drop-shadow(0 0 25px ${particle.color})`,
            transition: { 
              duration: 0.5, 
              ease: "backOut",
              type: "spring",
              stiffness: 200
            }
          }}
          
          // DRAMATIC TAP RESPONSE
          whileTap={{
            scale: 0.3,
            rotate: -180,
            rotateX: -90,
            filter: `blur(2px) brightness(2) saturate(2)`,
            transition: { 
              type: "spring", 
              stiffness: 600, 
              damping: 8
            }
          }}
        />
      ))}

      {/* Connection lines between nearby particles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="#34D399" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        
        {/* STRUCTURED MEANINGFUL CONNECTIONS */}
        {currentShape === 0 && ( // Neural Network - Layer-to-layer connections
          <>
            {/* Input to Hidden Layer 1 */}
            {particles.filter(p => p.nodeType === 'input').map((inputNode, i) => 
              particles.filter(p => p.nodeType === 'hidden1').slice(0, 3).map((hiddenNode, j) => (
                <motion.line
                  key={`input-hidden1-${i}-${j}`}
                  x1={`${inputNode.x}%`}
                  y1={`${inputNode.y}%`}
                  x2={`${hiddenNode.x}%`}
                  y2={`${hiddenNode.y}%`}
                  stroke="#60A5FA"
                  strokeWidth="2"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.1 + j * 0.05 }}
                />
              ))
            )}
            
            {/* Hidden Layer 1 to Hidden Layer 2 */}
            {particles.filter(p => p.nodeType === 'hidden1').map((h1Node, i) => 
              particles.filter(p => p.nodeType === 'hidden2').slice(Math.floor(i/2), Math.floor(i/2) + 2).map((h2Node, j) => (
                <motion.line
                  key={`hidden1-hidden2-${i}-${j}`}
                  x1={`${h1Node.x}%`}
                  y1={`${h1Node.y}%`}
                  x2={`${h2Node.x}%`}
                  y2={`${h2Node.y}%`}
                  stroke="#34D399"
                  strokeWidth="2"
                  opacity="0.7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.08 }}
                />
              ))
            )}
            
            {/* Hidden Layer 2 to Hidden Layer 3 */}
            {particles.filter(p => p.nodeType === 'hidden2').map((h2Node, i) => 
              particles.filter(p => p.nodeType === 'hidden3').slice(Math.floor(i/2), Math.floor(i/2) + 2).map((h3Node, j) => (
                <motion.line
                  key={`hidden2-hidden3-${i}-${j}`}
                  x1={`${h2Node.x}%`}
                  y1={`${h2Node.y}%`}
                  x2={`${h3Node.x}%`}
                  y2={`${h3Node.y}%`}
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  opacity="0.7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1 + i * 0.08 }}
                />
              ))
            )}
            
            {/* Hidden Layer 3 to Output */}
            {particles.filter(p => p.nodeType === 'hidden3').map((h3Node, i) => 
              particles.filter(p => p.nodeType === 'output').map((outputNode, j) => (
                <motion.line
                  key={`hidden3-output-${i}-${j}`}
                  x1={`${h3Node.x}%`}
                  y1={`${h3Node.y}%`}
                  x2={`${outputNode.x}%`}
                  y2={`${outputNode.y}%`}
                  stroke="#EF4444"
                  strokeWidth="2"
                  opacity="0.8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.5 + i * 0.1 }}
                />
              ))
            )}
          </>
        )}

        {currentShape === 1 && ( // DNA Double Helix - Genetic connections
          <>
            {/* Left DNA strand backbone connections */}
            {particles.filter(p => p.nodeType === 'dna-left').map((leftNode, i) => {
              const nextLeft = particles.filter(p => p.nodeType === 'dna-left')[i + 1]
              if (nextLeft) {
                return (
                  <motion.line
                    key={`dna-left-${i}`}
                    x1={`${leftNode.x}%`}
                    y1={`${leftNode.y}%`}
                    x2={`${nextLeft.x}%`}
                    y2={`${nextLeft.y}%`}
                    stroke="#60A5FA"
                    strokeWidth="3"
                    opacity="0.8"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: 1,
                      opacity: [0.8, 1, 0.6, 0.9]
                    }}
                    transition={{ 
                      duration: 2, 
                      delay: i * 0.08,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )
              }
              return null
            })}
            
            {/* Right DNA strand backbone connections */}
            {particles.filter(p => p.nodeType === 'dna-right').map((rightNode, i) => {
              const nextRight = particles.filter(p => p.nodeType === 'dna-right')[i + 1]
              if (nextRight) {
                return (
                  <motion.line
                    key={`dna-right-${i}`}
                    x1={`${rightNode.x}%`}
                    y1={`${rightNode.y}%`}
                    x2={`${nextRight.x}%`}
                    y2={`${nextRight.y}%`}
                    stroke="#34D399"
                    strokeWidth="3"
                    opacity="0.8"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: 1,
                      opacity: [0.8, 1, 0.6, 0.9]
                    }}
                    transition={{ 
                      duration: 2, 
                      delay: 0.5 + i * 0.08,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )
              }
              return null
            })}
            
            {/* Base pair connections - horizontal bonds between strands */}
            {particles.filter(p => p.nodeType === 'base-left').map((leftBase, i) => {
              const rightBase = particles.filter(p => p.nodeType === 'base-right')[i]
              if (rightBase) {
                return (
                  <motion.line
                    key={`base-pair-${i}`}
                    x1={`${leftBase.x}%`}
                    y1={`${leftBase.y}%`}
                    x2={`${rightBase.x}%`}
                    y2={`${rightBase.y}%`}
                    stroke="#8B5CF6"
                    strokeWidth="2.5"
                    opacity="0.7"
                    strokeDasharray="3,3"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: 1,
                      strokeDashoffset: [0, -6],
                      opacity: [0.7, 1, 0.5, 0.8]
                    }}
                    transition={{ 
                      duration: 1.8, 
                      delay: 1 + i * 0.12,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                )
              }
              return null
            })}
            
            {/* Base to backbone connections */}
            {particles.filter(p => p.nodeType === 'base-left').map((leftBase, i) => {
              const leftStrand = particles.filter(p => p.nodeType === 'dna-left')[Math.floor(i * 25 / 12.5)]
              if (leftStrand) {
                return (
                  <motion.line
                    key={`base-backbone-left-${i}`}
                    x1={`${leftBase.x}%`}
                    y1={`${leftBase.y}%`}
                    x2={`${leftStrand.x}%`}
                    y2={`${leftStrand.y}%`}
                    stroke="#8B5CF6"
                    strokeWidth="1.5"
                    opacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: 1,
                      opacity: [0.5, 0.8, 0.3, 0.6]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 1.5 + i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )
              }
              return null
            })}
            
            {/* Information flow trails */}
            {particles.filter(p => p.nodeType === 'info-flow').slice(0, 10).map((flowNode, i) => {
              const targetStrand = i % 2 === 0 
                ? particles.filter(p => p.nodeType === 'dna-left')[Math.floor(i / 2)] 
                : particles.filter(p => p.nodeType === 'dna-right')[Math.floor(i / 2)]
              if (targetStrand) {
                return (
                  <motion.line
                    key={`info-flow-${i}`}
                    x1={`${flowNode.x}%`}
                    y1={`${flowNode.y}%`}
                    x2={`${targetStrand.x}%`}
                    y2={`${targetStrand.y}%`}
                    stroke="#EF4444"
                    strokeWidth="1"
                    opacity="0.4"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: [0, 1, 0],
                      opacity: [0.4, 0.8, 0.2, 0.6]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      delay: 2 + i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )
              }
              return null
            })}
          </>
        )}

        {currentShape === 2 && ( // Quantum Computing - Quantum connections and entanglement
          <>
            {/* Quantum Core Connections - Inner ring connections */}
            {particles.filter(p => p.nodeType === 'qubit').map((qubitNode, i) => {
              const nextQubit = particles.filter(p => p.nodeType === 'qubit')[(i + 1) % 20]
              return (
                <motion.line
                  key={`qubit-ring-${i}`}
                  x1={`${qubitNode.x}%`}
                  y1={`${qubitNode.y}%`}
                  x2={`${nextQubit.x}%`}
                  y2={`${nextQubit.y}%`}
                  stroke="#60A5FA"
                  strokeWidth="3"
                  opacity="0.8"
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 0.7, 1],
                    opacity: [0.8, 1, 0.6, 0.9]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )
            })}
            
            {/* Quantum Gate to Core connections */}
            {particles.filter(p => p.nodeType === 'gate').map((gateNode, i) => {
              const targetQubit = particles.filter(p => p.nodeType === 'qubit')[i % 20]
              if (targetQubit) {
                return (
                  <motion.line
                    key={`gate-qubit-${i}`}
                    x1={`${gateNode.x}%`}
                    y1={`${gateNode.y}%`}
                    x2={`${targetQubit.x}%`}
                    y2={`${targetQubit.y}%`}
                    stroke="#34D399"
                    strokeWidth="2"
                    opacity="0.6"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: 1,
                      opacity: [0.6, 1, 0.4, 0.8]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 1 + i * 0.08,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )
              }
              return null
            })}
            
            {/* Quantum Entanglement Lines - connecting paired particles */}
            {particles.filter(p => p.nodeType === 'entangled-a').map((primaryNode, i) => {
              const entangledPair = particles.filter(p => p.nodeType === 'entangled-b')[i]
              if (entangledPair) {
                return (
                  <motion.line
                    key={`entanglement-${i}`}
                    x1={`${primaryNode.x}%`}
                    y1={`${primaryNode.y}%`}
                    x2={`${entangledPair.x}%`}
                    y2={`${entangledPair.y}%`}
                    stroke="#8B5CF6"
                    strokeWidth="2.5"
                    opacity="0.8"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: 1,
                      strokeDashoffset: [0, -10],
                      opacity: [0.8, 1, 0.5, 0.9]
                    }}
                    transition={{ 
                      duration: 1.8, 
                      delay: 1.5 + i * 0.15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                )
              }
              return null
            })}
            
            {/* Superposition Probability Waves */}
            {particles.filter(p => p.nodeType === 'superposition').slice(0, 10).map((superNode, i) => {
              const measurementNode = particles.filter(p => p.nodeType === 'measurement')[i % 20]
              if (measurementNode) {
                return (
                  <motion.line
                    key={`superposition-${i}`}
                    x1={`${superNode.x}%`}
                    y1={`${superNode.y}%`}
                    x2={`${measurementNode.x}%`}
                    y2={`${measurementNode.y}%`}
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    opacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: [0, 1, 0, 1],
                      opacity: [0.5, 1, 0.3, 0.7]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      delay: 2 + i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )
              }
              return null
            })}
            
            {/* Quantum Measurement Collapse - Central connections */}
            {particles.filter(p => p.nodeType === 'measurement').slice(0, 8).map((measureNode, i) => (
              <motion.line
                key={`measurement-center-${i}`}
                x1="50%"
                y1="50%"
                x2={`${measureNode.x}%`}
                y2={`${measureNode.y}%`}
                stroke="#EF4444"
                strokeWidth="1"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0.5, 1],
                  opacity: [0.4, 0.8, 0.2, 0.6]
                }}
                transition={{ 
                  duration: 3, 
                  delay: 2.5 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}

        {currentShape === 3 && ( // Computer Chip - Digital pathways (brought back!)
          <>
            {/* Core to Cache connections */}
            {particles.filter(p => p.nodeType === 'core').map((coreNode, i) => 
              particles.filter(p => p.nodeType === 'cache').slice(i * 2, i * 2 + 2).map((cacheNode, j) => (
                <motion.line
                  key={`core-cache-${i}-${j}`}
                  x1={`${coreNode.x}%`}
                  y1={`${coreNode.y}%`}
                  x2={`${cacheNode.x}%`}
                  y2={`${cacheNode.y}%`}
                  stroke="#60A5FA"
                  strokeWidth="2"
                  opacity="0.7"
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: 1,
                    opacity: [0.7, 1, 0.5, 0.8]
                  }}
                  transition={{ 
                    duration: 1, 
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))
            )}
            
            {/* Cache to I/O connections */}
            {particles.filter(p => p.nodeType === 'cache').map((cacheNode, i) => {
              const ioNode = particles.filter(p => p.nodeType === 'io')[i % 25]
              if (ioNode) {
                return (
                  <motion.line
                    key={`cache-io-${i}`}
                    x1={`${cacheNode.x}%`}
                    y1={`${cacheNode.y}%`}
                    x2={`${ioNode.x}%`}
                    y2={`${ioNode.y}%`}
                    stroke="#34D399"
                    strokeWidth="1.5"
                    opacity="0.6"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: 1,
                      opacity: [0.6, 1, 0.4, 0.8]
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.5 + i * 0.05,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )
              }
              return null
            })}
            
            {/* Power distribution grid */}
            {particles.filter(p => p.nodeType === 'power').map((powerNode, i) => {
              const nearbyCore = particles.filter(p => p.nodeType === 'core').find(core => 
                Math.abs(core.x - powerNode.x) < 15 && Math.abs(core.y - powerNode.y) < 15
              )
              if (nearbyCore) {
                return (
                  <motion.line
                    key={`power-core-${i}`}
                    x1={`${powerNode.x}%`}
                    y1={`${powerNode.y}%`}
                    x2={`${nearbyCore.x}%`}
                    y2={`${nearbyCore.y}%`}
                    stroke="#F59E0B"
                    strokeWidth="1"
                    opacity="0.4"
                    initial={{ pathLength: 0 }}
                    animate={{ 
                      pathLength: 1,
                      opacity: [0.4, 0.8, 0.2, 0.6]
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 1 + i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )
              }
              return null
            })}

            {/* Horizontal and Vertical Circuit Traces */}
            {particles.filter(p => p.nodeType === 'core').slice(0, 5).map((coreNode, i) => (
              <motion.line
                key={`horizontal-trace-${i}`}
                x1="10%"
                y1={`${coreNode.y}%`}
                x2="90%"
                y2={`${coreNode.y}%`}
                stroke="#8B5CF6"
                strokeWidth="1.5"
                opacity="0.5"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0.8, 1],
                  opacity: [0.5, 0.9, 0.3, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  delay: 1.5 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}

            {particles.filter(p => p.nodeType === 'core').slice(0, 5).map((coreNode, i) => (
              <motion.line
                key={`vertical-trace-${i}`}
                x1={`${coreNode.x}%`}
                y1="10%"
                x2={`${coreNode.x}%`}
                y2="90%"
                stroke="#8B5CF6"
                strokeWidth="1.5"
                opacity="0.5"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0.8, 1],
                  opacity: [0.5, 0.9, 0.3, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  delay: 2 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}
      </svg>

      {/* Pulsing accent overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-transparent via-accent-blue/5 to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* SIMPLIFIED INTERACTIVE CURSOR EFFECT */}
      <motion.div
        className="absolute pointer-events-none z-20 w-16 h-16"
        style={{
          left: '50%',
          top: '50%',
          x: '-50%',
          y: '-50%'
        }}
        whileHover={{
          scale: 1.5,
          opacity: 1
        }}
      >
        {/* Magnetic field rings */}
        <motion.div
          className="w-16 h-16 border-2 border-accent-blue/40 rounded-full"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-2 border border-accent-mint/50 rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.9, 0.4],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-4 bg-accent-blue/30 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Enhanced shape indicator with advanced effects */}
      <motion.div
        className="absolute top-4 left-4 px-4 py-2 bg-dark-card/80 backdrop-blur-md rounded-2xl text-accent-blue text-sm font-mono border border-accent-blue/30 shadow-xl"
        initial={{ opacity: 0, y: -10, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          boxShadow: [
            '0 0 20px rgba(96, 165, 250, 0.3)',
            '0 0 40px rgba(96, 165, 250, 0.6)',
            '0 0 20px rgba(96, 165, 250, 0.3)'
          ]
        }}
        key={currentShape}
        transition={{ 
          duration: 0.8,
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <motion.span
          animate={{
            textShadow: [
              '0 0 8px rgba(96, 165, 250, 0.6)',
              '0 0 20px rgba(96, 165, 250, 0.9)',
              '0 0 8px rgba(96, 165, 250, 0.6)'
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎯 {['NEURAL NETWORK', 'DNA DOUBLE HELIX', 'QUANTUM COMPUTING', 'COMPUTER CHIP'][currentShape]}
        </motion.span>
      </motion.div>

      {/* ENHANCED STATUS INDICATOR */}
      <motion.div 
        className="absolute top-4 right-4 text-xs font-mono text-accent-mint bg-dark-card/70 px-3 py-2 rounded-xl backdrop-blur-md border border-accent-mint/30 shadow-lg"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 bg-accent-mint rounded-full"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.5, 1, 0.5],
              boxShadow: [
                '0 0 6px rgba(52, 211, 153, 0.6)',
                '0 0 16px rgba(52, 211, 153, 1)',
                '0 0 6px rgba(52, 211, 153, 0.6)'
              ]
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity
            }}
          />
          <span>ENHANCED MODE</span>
        </div>
        <div className="text-accent-blue/70 mt-1 text-center">
          {enhancedParticles.length} PARTICLES
        </div>
      </motion.div>
    </div>
  )
}
