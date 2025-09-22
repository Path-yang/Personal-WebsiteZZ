'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Particle {
  id: string
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
}

interface Connection {
  id: string
  from: Particle
  to: Particle
  opacity: number
}

export function ParticleSystem() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    // Generate particles representing neural network nodes
    const newParticles: Particle[] = []
    const particleCount = 25

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: `particle-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      })
    }

    // Generate connections between nearby particles
    const newConnections: Connection[] = []
    for (let i = 0; i < newParticles.length; i++) {
      for (let j = i + 1; j < newParticles.length; j++) {
        const dx = newParticles[i].x - newParticles[j].x
        const dy = newParticles[i].y - newParticles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Connect particles within 20% of screen distance
        if (distance < 20 && Math.random() > 0.7) {
          newConnections.push({
            id: `connection-${i}-${j}`,
            from: newParticles[i],
            to: newParticles[j],
            opacity: Math.max(0.1, 0.4 - distance * 0.02)
          })
        }
      }
    }

    setParticles(newParticles)
    setConnections(newConnections)
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {/* Particle connections */}
        {connections.map(connection => (
          <motion.line
            key={connection.id}
            x1={`${connection.from.x}%`}
            y1={`${connection.from.y}%`}
            x2={`${connection.to.x}%`}
            y2={`${connection.to.y}%`}
            stroke="url(#connectionGradient)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: connection.opacity,
            }}
            transition={{
              pathLength: { duration: 2, delay: 1 },
              opacity: { duration: 1, delay: 1.5 }
            }}
          />
        ))}

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="particleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#34D399" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Floating particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-accent-blue/60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            zIndex: 2
          }}
          initial={{ 
            scale: 0,
            opacity: 0
          }}
          animate={{ 
            scale: [0, 1, 1.2, 1],
            opacity: [0, particle.opacity, particle.opacity, particle.opacity],
            y: [-10, 10, -10],
            x: [-5, 5, -5]
          }}
          transition={{
            scale: { duration: 2, delay: particle.delay },
            opacity: { duration: 1, delay: particle.delay },
            y: { 
              duration: particle.duration, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: particle.delay 
            },
            x: { 
              duration: particle.duration * 0.7, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: particle.delay + 1
            }
          }}
        />
      ))}
    </div>
  )
}
