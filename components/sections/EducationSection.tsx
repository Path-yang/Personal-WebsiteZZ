'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { EducationTimeline } from '@/components/ui/EducationTimeline'
import { SectionBackground } from '@/components/ui/SectionBackground'
import { GraduationCap, Award, BookOpen } from 'lucide-react'

const educationData = [
  {
    id: 'nus',
    institution: 'National University of Singapore',
    degree: 'Bachelor of Engineering in Computer Engineering',
    period: 'Aug 2024 – Present',
    status: 'current' as const,
    description: [],
    icon: GraduationCap,
    location: 'Singapore'
  },
  {
    id: 'hcjc',
    institution: 'Hwa Chong Junior College',
    degree: 'GCE A-Levels',
    period: '2020 – 2021',
    status: 'completed' as const,
    description: [],
    icon: Award,
    location: 'Singapore'
  },
  {
    id: 'hci',
    institution: 'Hwa Chong Institution',
    degree: 'Integrated Program',
    period: '2016 – 2019',
    status: 'completed' as const,
    description: [
      'Integrated Programme with emphasis on advanced mathematics and computing foundations',
      'Co-curricular leadership in technology clubs and community outreach initiatives'
    ],
    icon: BookOpen,
    location: 'Singapore'
  }
]

export function EducationSection() {
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

  const headerVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: [0.23, 1, 0.320, 1],
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <Section 
      id="education" 
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)' }}
    >
      {/* Enhanced Animated Background */}
      <SectionBackground variant="waves" intensity="medium" />
      
      {/* Floating Academic Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { Icon: GraduationCap, x: '10%', y: '20%', delay: 0 },
          { Icon: Award, x: '85%', y: '30%', delay: 0.5 },
          { Icon: BookOpen, x: '15%', y: '70%', delay: 1 },
          { Icon: GraduationCap, x: '80%', y: '80%', delay: 1.5 }
        ].map(({ Icon, x, y, delay }, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 0.1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="p-4 text-accent-blue"
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            >
              <Icon size={48} />
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      <div className="container-max section-padding relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Spectacular Section Header */}
          <motion.div 
            className="text-center mb-20"
            variants={headerVariants}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              className="inline-flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-accent-blue/10 to-accent-mint/10 rounded-2xl border border-accent-blue/20 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 15px 30px rgba(96, 165, 250, 0.2)',
                borderColor: 'rgba(96, 165, 250, 0.4)'
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <GraduationCap size={32} className="text-accent-blue" />
              </motion.div>
              <span className="text-accent-mint font-medium text-lg">Academic Excellence</span>
            </motion.div>
            
            <motion.h2 
              className="heading text-4xl md:text-5xl lg:text-6xl mb-6 text-white"
              style={{
                textShadow: '0 0 30px rgba(96, 165, 250, 0.3)',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #60A5FA 50%, #34D399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Educational Journey
            </motion.h2>
            

          </motion.div>

          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          >
            <EducationTimeline items={educationData} />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
