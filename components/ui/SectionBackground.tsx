'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SectionBackgroundProps {
  variant?: 'grid' | 'waves' | 'particles' | 'geometric'
  intensity?: 'low' | 'medium' | 'high'
}

export function SectionBackground({ 
  variant = 'grid', 
  intensity = 'medium' 
}: SectionBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-card/5 to-transparent" />
    )
  }

  const opacityByIntensity = {
    low: 0.3,
    medium: 0.5,
    high: 0.7
  }

  if (variant === 'grid') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {/* Animated grid pattern */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <motion.path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="url(#gridGradient)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </pattern>
            <linearGradient id="gridGradient">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity={opacityByIntensity[intensity]} />
              <stop offset="100%" stopColor="#34D399" stopOpacity={opacityByIntensity[intensity] * 0.5} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Flowing lines */}
          {[0, 1, 2].map(i => (
            <motion.line
              key={i}
              x1="0"
              y1={`${20 + i * 30}%`}
              x2="100%"
              y2={`${20 + i * 30}%`}
              stroke="#60A5FA"
              strokeWidth="1"
              strokeOpacity={opacityByIntensity[intensity]}
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 3, 
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>
      </div>
    )
  }

  if (variant === 'waves') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
          {[0, 1, 2, 3].map(i => (
            <motion.path
              key={i}
              d={`M0,${200 + i * 150} Q300,${150 + i * 150} 600,${200 + i * 150} T1200,${200 + i * 150}`}
              fill="none"
              stroke={i % 2 === 0 ? "#60A5FA" : "#34D399"}
              strokeWidth="2"
              strokeOpacity={opacityByIntensity[intensity] * (1 - i * 0.2)}
              initial={{ pathLength: 0, y: 50 }}
              whileInView={{ pathLength: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{
                d: [
                  `M0,${200 + i * 150} Q300,${150 + i * 150} 600,${200 + i * 150} T1200,${200 + i * 150}`,
                  `M0,${200 + i * 150} Q300,${250 + i * 150} 600,${200 + i * 150} T1200,${200 + i * 150}`,
                  `M0,${200 + i * 150} Q300,${150 + i * 150} 600,${200 + i * 150} T1200,${200 + i * 150}`
                ]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>
      </div>
    )
  }

  if (variant === 'particles') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(intensity === 'high' ? 20 : intensity === 'medium' ? 12 : 6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: opacityByIntensity[intensity] }}
            viewport={{ once: true }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.5, 1],
              opacity: [opacityByIntensity[intensity], opacityByIntensity[intensity] * 0.3, opacityByIntensity[intensity]]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'geometric') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
          {/* Geometric shapes */}
          {[0, 1, 2].map(i => (
            <motion.g key={i}>
              <motion.polygon
                points={`${200 + i * 400},100 ${300 + i * 400},200 ${200 + i * 400},300 ${100 + i * 400},200`}
                fill="none"
                stroke={i % 2 === 0 ? "#60A5FA" : "#34D399"}
                strokeWidth="1.5"
                strokeOpacity={opacityByIntensity[intensity]}
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ transformOrigin: `${200 + i * 400}px 200px` }}
              />
              
              <motion.circle
                cx={200 + i * 400}
                cy={200}
                r="3"
                fill={i % 2 === 0 ? "#60A5FA" : "#34D399"}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            </motion.g>
          ))}
        </svg>
      </div>
    )
  }

  return null
}
