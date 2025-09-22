'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Timeline } from '@/components/ui/Timeline'
import { useMobileOptimization } from '@/hooks/useMobileOptimization'
import { SectionBackground } from '@/components/ui/SectionBackground'

const experiences = [
  {
    id: 'massivue',
    title: 'AI Engineer Intern',
    company: 'Massivue',
    period: 'May 2025 – Aug 2025',
    description: [
      'Developed AI-powered process workflow analysis platform with process mining and RAG-enhanced insights.',
      'Implemented dual AI architecture (cloud GPT-4/local Gemma-3B) with React/TypeScript dashboards for workflow optimization.'
    ],
    logo: '/logos/massivue.jpg'
  },
  {
    id: 'amcor',
    title: 'Data Automation Intern',
    company: 'Amcor Flexibles',
    period: 'Feb 2024 – May 2024',
    description: [
      'Developed Excel-based automation tools for HR processes, including safety certification tracking with automated alerts.',
      'Automated payroll tasks using VBA, improving data accuracy and compliance monitoring across teams.'
    ],
    logo: '/logos/amcor.png'
  },
  {
    id: 'spf',
    title: 'National Service',
    company: 'Singapore Police Force',
    period: 'April 2022 – Feb 2024',
    description: [
      'Police Special Operations Command - K9'
    ],
    logo: '/logos/spf.jpg'
  }
]

export function ExperienceSection() {
  const { shouldReduceAnimations } = useMobileOptimization()
  
  return (
    <Section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      {/* Professional Journey Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dynamic Professional Gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 20%, rgba(15, 23, 42, 0.8) 40%, rgba(30, 41, 59, 0.6) 60%, rgba(15, 23, 42, 0.9) 80%, rgba(30, 41, 59, 0.7) 100%)',
            backgroundSize: '300% 300%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Ascending Career Pathways */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 900">
          {/* Main ascending path */}
          <motion.path
            d="M50,750 Q200,600 350,500 T650,350 Q800,280 950,200 T1250,80"
            fill="none"
            stroke="rgba(96, 165, 250, 0.4)"
            strokeWidth="2"
            strokeDasharray="8,12"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            animate={{
              strokeDashoffset: [0, -80],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{
              strokeDashoffset: {
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              },
              opacity: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />

          {/* Secondary pathways */}
          {[0, 1, 2].map(i => (
            <motion.path
              key={`path-${i}`}
              d={`M${150 + i * 400},${800 - i * 50} Q${300 + i * 400},${650 - i * 50} ${450 + i * 400},${500 - i * 50} T${750 + i * 400},${300 - i * 50}`}
              fill="none"
              stroke={i % 2 === 0 ? "rgba(52, 211, 153, 0.3)" : "rgba(168, 85, 247, 0.25)"}
              strokeWidth="1.5"
              strokeDasharray="6,10"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              viewport={{ once: true }}
              animate={{
                strokeDashoffset: [0, -60],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                strokeDashoffset: {
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "linear"
                },
                opacity: {
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8
                }
              }}
            />
          ))}

          {/* Professional Network Nodes */}
          {[
            { x: 350, y: 500, size: 8 },
            { x: 650, y: 350, size: 12 },
            { x: 950, y: 200, size: 10 },
            { x: 500, y: 420, size: 6 },
            { x: 800, y: 280, size: 9 },
            { x: 1100, y: 150, size: 7 }
          ].map((node, i) => (
            <motion.g key={`node-group-${i}`}>
              {/* Node glow */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size + 4}
                fill={i % 3 === 0 ? "rgba(96, 165, 250, 0.1)" : i % 3 === 1 ? "rgba(52, 211, 153, 0.08)" : "rgba(168, 85, 247, 0.06)"}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              />
              {/* Core node */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill={i % 3 === 0 ? "rgba(96, 165, 250, 0.6)" : i % 3 === 1 ? "rgba(52, 211, 153, 0.5)" : "rgba(168, 85, 247, 0.4)"}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4
                }}
              />
            </motion.g>
          ))}
        </svg>

        {/* Floating Professional Elements - Reduce count on mobile */}
        {[...Array(shouldReduceAnimations ? 4 : 8)].map((_, i) => (
          <motion.div
            key={`prof-element-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${12 + i * 6}px`,
              height: `${12 + i * 6}px`,
              left: `${10 + i * 11}%`,
              top: `${80 - i * 8}%`,
              background: i % 4 === 0 
                ? 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%)'
                : i % 4 === 1 
                ? 'radial-gradient(circle, rgba(52, 211, 153, 0.12) 0%, transparent 70%)'
                : i % 4 === 2
                ? 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
              filter: 'blur(0.5px)'
            }}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{
              y: [-30, -15, -30],
              x: [-8, 8, -8],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 10 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7
            }}
          />
        ))}

        {/* Professional Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(96, 165, 250, 0.3) 0.5px, transparent 0.5px),
              linear-gradient(90deg, rgba(96, 165, 250, 0.3) 0.5px, transparent 0.5px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>
      
      <div className="container-max section-padding relative z-10">
        <motion.h2 className="heading text-3xl md:text-4xl lg:text-5xl mb-16 text-center text-accent-blue">
          Professional Journey
        </motion.h2>
        
        <Timeline items={experiences} />
      </div>
    </Section>
  )
}

