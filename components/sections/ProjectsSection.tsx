'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionBackground } from '@/components/ui/SectionBackground'
import { Brain, Ship, Shield, Heart, MessageCircle, BarChart3 } from 'lucide-react'

const projects = [
  {
    id: 'silver-sigma',
    title: 'SilverSigma',
    category: 'Full Stack Development • AI Integration',
    period: 'Sep 2025',
    event: '@SUTD WTH 2025',
    description: 'Built an AI-powered companion platform for seniors featuring real-time avatar conversations, hobby discovery, and a secure social space.',
    highlights: [
      'Developed AI-powered companion platform for elderly care',
      'Implemented real-time avatar conversation system',
      'Built hobby discovery and social networking features',
      'Created secure social space for senior community engagement'
    ],
    icon: Heart,
    tech: ['React', 'Node.js', 'AI/ML', 'WebSocket', 'Social Platform'],
    githubUrl: 'https://github.com/Path-yang/SilverSigma',
    demoUrl: 'https://silver-sigma.vercel.app/'  },
  {
    id: 'sentinel-ai',
    title: 'SentinelAI',
    category: 'Machine Learning • Full Stack Development',
    period: 'Aug 2025 - Sep 2025',
    event: '@IDP IDEATE 2025\n@SOC VIP 24/25 SEM 1',
    description: 'Co-developed SentinelAI, a prototype using CCTV/IP cameras with AI to detect falls, strokes, and industrial accidents in real time.',
    highlights: [
      'Built AI-powered CCTV/IP camera system for real-time anomaly detection',
      'Developed cloud-based streaming technology for global camera access',
      'Implemented WebSocket-based alerts and real-time video streaming',
      'Even thought SentinelAI did not move forward, we gained valuable lessons in technical feasibility, privacy, and sustainable AI deployment'
    ],
    icon: Shield,
    tech: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'Docker', 'RTSP', 'HLS'],
    githubUrl: 'https://github.com/Path-yang/SentinelAI',
    demoUrl: 'https://sentinel-ai-web-ll3v.vercel.app/',
    pitchVideoUrl: 'https://www.youtube.com/watch?v=mX03emoBGes&feature=youtu.be'  },
  {
    id: 'lifehack',
    title: 'SigmaHealth',
    category: 'Full Stack Development • AI Integration',
    period: 'July 2025',
    event: '@NUS LIFEHACK 2025',
    description: (
      <>
        <span className="text-sky-300 font-semibold">Finalist (top 10 of 60+ teams)</span>,{' '}
        <span className="text-rose-300 font-semibold">Best Usage of Data</span>,{' '}
        <span className="text-amber-300 font-semibold">Best Team for Theme 1 (Health &amp; Wellbeing)</span>
        {' '} - React Native app integrating real-time Singapore health data with GPT-powered health guidance.
      </>
    ),
    highlights: [
      'Integrated real-time Singapore health data',
      'GPT-powered health guidance and recommendations',
      'Community reporting features for public health',
      <>
        <span className="text-sky-300 font-semibold">Finalist</span> achievement in competitive hackathon
      </>
    ],
    icon: Heart,
    tech: ['React Native', 'GPT Integration', 'Real-time Data', 'Public Health APIs'],
    githubUrl: 'https://github.com/clemenong1/SigmaHealth',
    demoUrl: 'https://www.youtube.com/watch?v=y4ql2yiB7j4'
  },
  {
    id: 'dsta-brainhack',
    title: 'SigmaShield',
    category: 'Full Stack Development • AI Integration',
    period: 'June 2025 - July 2025',
    event: '@DSTA BRAINHACK CODE EXP 2025',
    description: (
      <>
        <span className="text-orange-300 font-semibold">Finalist (top 20 out of 80+ teams)</span> - AI-powered app using community insights to detect and prevent online scams.
      </>
    ),
    highlights: [
      'Combined AI detection with community reporting',
      'Real-time scam URL analysis and flagging',
      'Interactive educational modules for scam awareness',
      <>
        <span className="text-orange-300 font-semibold">Top 20 finalist</span> in DSTA Brainhack competition
      </>
    ],
    icon: Shield,
    tech: ['React Native', 'AI/ML', 'Community Intelligence', 'Cybersecurity'],
    githubUrl: 'https://github.com/Path-yang/DSTA-Code-Exp-2025',
    demoUrl: 'https://www.canva.com/design/DAGqDBMHrzE/HRmg8WpRrwy6EB30zSUjJg/edit'
  },
  {
    id: 'hackomania',
    title: 'NoFap',
    category: 'Full Stack Development',
    period: 'Feb 2025',
    event: '@HACKOMANIA 2025',
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
  },
  {
    id: 'maritime-hackathon',
    title: 'Maritime AI Classification',
    category: 'Machine Learning',
    period: 'Jan 2025',
    event: '@MARITIME HACKATHON 2025',
    description: (
      <>
        <span className="text-blue-300 font-semibold">Top 3</span> - Developed a machine learning model with over 90% accuracy to classify ship repair severity levels using a dataset of 10,000+ ship entries.
      </>
    ),
    highlights: [
      'Designed Python algorithm to consolidate severity annotations from three different Subject Matter Experts',
      'Achieved 90%+ accuracy in classification tasks',
      'Processed dataset of 10,000+ ship entries'
    ],
    icon: Ship,
    tech: ['Python', 'Machine Learning', 'Data Analysis', 'Algorithm Design'],
    githubUrl: 'https://github.com/Path-yang/Maritime-Hackathon-2025'
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
