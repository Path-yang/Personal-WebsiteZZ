'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionBackground } from '@/components/ui/SectionBackground'
import { Brain, Ship, Shield, Heart } from 'lucide-react'

const projects = [
  {
    id: 'maritime-hackathon',
    title: 'Maritime AI Classification',
    category: 'Machine Learning',
    period: 'Jan 2025',
    description: 'Developed a machine learning model with over 90% accuracy to classify ship repair severity levels using a dataset of 10,000+ ship entries.',
    highlights: [
      'Designed Python algorithm to consolidate severity annotations from three different Subject Matter Experts',
      'Achieved 90%+ accuracy in classification tasks',
      'Processed dataset of 10,000+ ship entries'
    ],
    icon: Ship,
    tech: ['Python', 'Machine Learning', 'Data Analysis', 'Algorithm Design'],
    githubUrl: 'https://github.com/Path-yang/Maritime-Hackathon-2025'
  },
  {
    id: 'lifehack',
    title: 'Sigma Health',
    category: 'React Native • AI Integration',
    period: 'June 2025',
    description: 'Finalist (top 10 out of 60+ teams) - React Native app integrating real-time Singapore health data with GPT-powered health guidance.',
    highlights: [
      'Integrated real-time Singapore health data',
      'GPT-powered health guidance and recommendations',
      'Community reporting features for public health',
      'Finalist achievement in competitive hackathon'
    ],
    icon: Heart,
    tech: ['React Native', 'GPT Integration', 'Real-time Data', 'Public Health APIs'],
    githubUrl: 'https://github.com/clemenong1/SigmaHealth',
    demoVideoUrl: '/SigmaHealth-demo-video.mp4'
  },
  {
    id: 'dsta-brainhack',
    title: 'Sigma Shield',
    category: 'React Native • Community Intelligence',
    period: 'June 2025',
    description: 'Finalist (top 20 out of 80+ teams) - AI-powered app using community insights to detect and prevent online scams.',
    highlights: [
      'Combined AI detection with community reporting',
      'Real-time scam URL analysis and flagging',
      'Interactive educational modules for scam awareness',
      'Top 20 finalist in DSTA Brainhack competition'
    ],
    icon: Shield,
    tech: ['React Native', 'AI/ML', 'Community Intelligence', 'Cybersecurity'],
    githubUrl: 'https://github.com/Path-yang/DSTA-Code-Exp-2025',
    demoVideoUrl: '/SigmaShield-demo-video.mp4'
  },
  {
    id: 'hackomania',
    title: 'No Fap',
    category: 'Full Stack Development',
    period: 'Feb 2025',
    description: 'Full-stack donation platform connecting users seeking support with community contributors through micro-donations.',
    highlights: [
      'Built with Next.js, TypeScript, and MySQL',
      'Integrated Open Payments API for secure transactions',
      'Designed user-friendly interface for addiction support',
      'Scalable architecture for community growth'
    ],
    icon: Brain,
    tech: ['Next.js', 'TypeScript', 'MySQL', 'Open Payments API'],
    githubUrl: 'https://github.com/Path-yang/Hackomania_2025',
    demoUrl: 'https://geekshackinghackathon-8ygu.vercel.app/'
  }
]

export function ProjectsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <Section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <SectionBackground variant="geometric" intensity="high" />
      
      <div className="container-max section-padding relative z-10">
        <motion.h2 className="heading text-3xl md:text-4xl lg:text-5xl mb-16 text-center text-accent-blue">
          Projects
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ perspective: '1000px' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

