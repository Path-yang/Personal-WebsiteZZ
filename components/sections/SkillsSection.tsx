'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { SkillCloud } from '@/components/ui/SkillCloud'
import { SectionBackground } from '@/components/ui/SectionBackground'
import { Code, Database, Cpu, Terminal, Zap, Brain, Palette, Wrench } from 'lucide-react'

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    skills: ['C', 'C++', 'Python', 'Java', 'JavaScript', 'TypeScript'],
    color: 'from-blue-500/20 to-indigo-500/20',
    borderColor: 'border-blue-400/30',
    iconColor: 'text-blue-400'
  },
  {
    title: 'Frameworks & Libraries',
    icon: Terminal,
    skills: ['TensorFlow', 'Scikit-learn', 'NumPy', 'Flask', 'React', 'Next.js', 'React Native'],
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-400/30',
    iconColor: 'text-green-400'
  },
  {
    title: 'Data & Analytics',
    icon: Database,
    skills: ['Machine Learning', 'Data Analysis', 'Excel', 'Exploratory Data Analysis', 'Process Mining'],
    color: 'from-purple-500/20 to-violet-500/20',
    borderColor: 'border-purple-400/30',
    iconColor: 'text-purple-400'
  },
  {
    title: 'Tools & Platforms',
    icon: Wrench,
    skills: ['Git', 'AutoCAD Fusion', 'Replit', 'Cursor', 'Figma', 'MySQL', 'Node.js'],
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-400/30',
    iconColor: 'text-orange-400'
  },
  {
    title: 'Embedded & Hardware',
    icon: Cpu,
    skills: ['Arduino', 'Raspberry Pi', 'FPGA (Vivado)', 'Circuit Design', 'Sensor Integration'],
    color: 'from-cyan-500/20 to-teal-500/20',
    borderColor: 'border-cyan-400/30',
    iconColor: 'text-cyan-400'
  },
  {
    title: 'Core Concepts',
    icon: Brain,
    skills: ['Object-Oriented Programming', 'Data Structures & Algorithms', 'Networking Protocols', 'AI/ML Architecture', 'Full-Stack Development'],
    color: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-pink-400/30',
    iconColor: 'text-pink-400'
  }
]

export function SkillsSection() {
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

  const categoryVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.320, 1],
        type: "spring",
        stiffness: 80
      }
    }
  }

  return (
    <Section 
      id="skills" 
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)' }}
    >
      {/* Enhanced Animated Background */}
      <SectionBackground variant="particles" intensity="medium" />

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { Icon: Code, x: '10%', y: '15%', delay: 0 },
          { Icon: Database, x: '85%', y: '25%', delay: 0.5 },
          { Icon: Brain, x: '15%', y: '60%', delay: 1 },
          { Icon: Cpu, x: '80%', y: '70%', delay: 1.5 },
          { Icon: Terminal, x: '50%', y: '10%', delay: 2 },
          { Icon: Zap, x: '90%', y: '45%', delay: 2.5 }
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
                <Zap size={32} className="text-accent-blue" />
              </motion.div>
              <span className="text-accent-mint font-medium text-lg">Technical Expertise</span>
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
              Technical Skills
            </motion.h2>

            <motion.p
              className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              A comprehensive toolkit spanning from low-level systems to cutting-edge AI, 
              built through hands-on projects and real-world applications.
            </motion.p>
          </motion.div>

          {/* Skills Categories Grid */}
          <div className="grid gap-12 md:gap-16">
            {skillCategories.map((category, categoryIndex) => {
              const Icon = category.icon
              
              return (
                <motion.div
                  key={category.title}
                  variants={categoryVariants}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="group px-3 sm:px-6"
                >
                  {/* Category Header */}
                  <motion.div
                    className="flex items-center justify-center gap-4 mb-8 px-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={`px-4 py-3 sm:px-4 sm:py-3.5 bg-gradient-to-br ${category.color} ${category.borderColor} border rounded-xl backdrop-blur-sm shadow-lg`}
                      animate={{
                        y: [-2, 2, -2],
                        rotateY: [0, 5, 0, -5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: categoryIndex * 0.5
                      }}
                    >
                      <Icon size={24} className={category.iconColor} />
                    </motion.div>
                    
                    <motion.h3 
                      className="heading text-xl md:text-2xl font-semibold text-white"
                      style={{
                        textShadow: '0 0 20px rgba(96, 165, 250, 0.2)'
                      }}
                    >
                      {category.title}
                    </motion.h3>
                  </motion.div>

                  {/* Skills Cloud */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ 
                      delay: categoryIndex * 0.1 + 0.3,
                      duration: 0.6,
                      ease: "easeOut" 
                    }}
                  >
                    <SkillCloud 
                      skills={category.skills} 
                      categoryColor={category.color}
                      categoryBorder={category.borderColor}
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent-blue/10 to-accent-mint/10 rounded-full border border-accent-blue/20 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(96, 165, 250, 0.2)',
                borderColor: 'rgba(96, 165, 250, 0.4)'
              }}
              transition={{ duration: 0.3 }}
            >
              <Palette size={20} className="text-accent-mint" />
              <span className="text-slate-300 font-medium">
                Always learning, always building
              </span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Zap size={16} className="text-accent-blue" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Visual Separator - Transition to Contact Section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <motion.div 
          className="w-full h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(30, 41, 59, 0.2) 50%, rgba(30, 41, 59, 0.4) 100%)'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Animated Line Separator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="w-24 h-px bg-gradient-to-r from-transparent via-accent-mint to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
        </div>
      </div>
    </Section>
  )
}
