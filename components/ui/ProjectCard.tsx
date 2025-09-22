'use client'

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { LucideIcon, Github, ExternalLink, Play, X } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useRef, MouseEvent, useState, useCallback } from 'react'
import { Portal } from '@/components/ui/Portal'

// Simple throttle function
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }) as T
}

interface ProjectCardProps {
  project: {
    id: string
    title: string
    category: string
    period: string
    description: string
    highlights: string[]
    icon: LucideIcon
    tech: string[]
    githubUrl?: string
    demoUrl?: string
    demoVideoUrl?: string
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const Icon = project.icon
  const ref = useRef<HTMLDivElement>(null)
  const [showVideo, setShowVideo] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

      const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
      const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  // Throttle mouse move for better performance
  const throttledMouseMove = useCallback(
    throttle(handleMouseMove, 16), // ~60fps
    [prefersReducedMotion, ref]
  )

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.645, 0.045, 0.355, 1.000],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
        <motion.div
          ref={ref}
          className="group relative h-full project-card"
      variants={cardVariants}
      style={{
        rotateY: prefersReducedMotion ? 0 : rotateY,
        rotateX: prefersReducedMotion ? 0 : rotateX,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={throttledMouseMove}
      onMouseLeave={handleMouseLeave}
          whileHover={prefersReducedMotion ? {} : { 
            z: 25,
            transition: { duration: 0.2 }
          }}
    >
      <motion.div 
        className="relative bg-gradient-to-br from-dark-card/60 to-dark-card/30 backdrop-blur-sm border border-dark-border rounded-2xl p-6 h-full transition-all duration-500 group-hover:border-accent-blue/40 overflow-hidden"
        style={{
          transform: prefersReducedMotion ? "translateZ(0)" : "translateZ(20px)",
          boxShadow: prefersReducedMotion ? "none" : "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)"
        }}
        whileHover={{
          boxShadow: prefersReducedMotion ? "none" : "0 30px 60px rgba(96, 165, 250, 0.15), 0 0 0 1px rgba(96, 165, 250, 0.2)"
        }}
      >
        {/* Animated background gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-mint/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{ transform: prefersReducedMotion ? "none" : "translateZ(-10px)" }}
        />
        
        {/* Header */}
        <motion.div 
          className="flex items-start justify-between mb-4 relative z-10"
          style={{
            transform: prefersReducedMotion ? "none" : "translateZ(30px)"
          }}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-3 bg-gradient-to-br from-accent-blue/20 to-accent-blue/10 rounded-xl text-accent-blue border border-accent-blue/20"
              whileHover={prefersReducedMotion ? {} : { 
                scale: 1.1,
                rotate: 12,
                boxShadow: "0 10px 25px rgba(96, 165, 250, 0.3)",
                transform: "translateZ(40px)",
                transition: { duration: 0.3 }
              }}
              style={{
                transform: prefersReducedMotion ? "none" : "translateZ(40px)"
              }}
            >
              <Icon size={24} />
            </motion.div>
            <div>
              <motion.h3 
                className="heading text-xl font-semibold text-white"
                style={{
                  transform: prefersReducedMotion ? "none" : "translateZ(35px)"
                }}
              >
                {project.title}
              </motion.h3>
              <motion.p 
                className="text-accent-mint text-sm font-medium"
                style={{
                  transform: prefersReducedMotion ? "none" : "translateZ(32px)"
                }}
              >
                {project.category}
              </motion.p>
            </div>
          </div>
          <motion.span 
            className="text-slate-400 text-sm whitespace-nowrap"
            style={{
              transform: prefersReducedMotion ? "none" : "translateZ(30px)"
            }}
          >
            {project.period}
          </motion.span>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-slate-300 leading-relaxed mb-6 relative z-10"
          style={{
            transform: prefersReducedMotion ? "none" : "translateZ(25px)"
          }}
        >
          {project.description}
        </motion.p>

        {/* Highlights */}
        <motion.div 
          className="mb-6 relative z-10"
          style={{
            transform: prefersReducedMotion ? "none" : "translateZ(20px)"
          }}
        >
          <motion.h4 
            className="text-white font-medium mb-3"
            style={{
              transform: prefersReducedMotion ? "none" : "translateZ(30px)"
            }}
          >
            Key Achievements
          </motion.h4>
          <ul className="space-y-2">
            {project.highlights.map((highlight, index) => (
              <motion.li 
                key={index}
                className="text-slate-300 text-sm flex items-start gap-2"
                initial={{ opacity: 0, x: -20, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                  duration: prefersReducedMotion ? 0 : 0.5,
                  ease: "easeOut"
                }}
                style={{
                  transform: prefersReducedMotion ? "none" : "translateZ(25px)"
                }}
                whileHover={prefersReducedMotion ? {} : {
                  x: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.span 
                  className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-2 flex-shrink-0"
                  whileHover={prefersReducedMotion ? {} : {
                    scale: 1.5,
                    boxShadow: "0 0 10px rgba(96, 165, 250, 0.6)",
                    transition: { duration: 0.2 }
                  }}
                />
                {highlight}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Tech Stack */}
        <motion.div 
          className="relative z-10 mb-6"
          style={{
            transform: prefersReducedMotion ? "none" : "translateZ(15px)"
          }}
        >
          <motion.h4 
            className="text-white font-medium mb-3"
            style={{
              transform: prefersReducedMotion ? "none" : "translateZ(25px)"
            }}
          >
            Technologies
          </motion.h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-dark-bg/30 border border-dark-border rounded-full text-xs text-slate-300 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.5, rotateX: -45 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: prefersReducedMotion ? 0 : index * 0.05,
                  duration: prefersReducedMotion ? 0 : 0.4,
                  ease: "easeOut"
                }}
                style={{
                  transform: prefersReducedMotion ? "none" : "translateZ(20px)"
                }}
                whileHover={prefersReducedMotion ? {} : { 
                  scale: 1.1,
                  rotateY: 10,
                  backgroundColor: 'rgba(96, 165, 250, 0.1)',
                  borderColor: 'rgba(96, 165, 250, 0.4)',
                  boxShadow: '0 5px 15px rgba(96, 165, 250, 0.2)',
                  transform: "translateZ(30px)",
                  transition: { duration: 0.2 }
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Links Section */}
        <motion.div 
          className="relative z-10 flex flex-wrap gap-3"
          style={{
            transform: prefersReducedMotion ? "none" : "translateZ(20px)"
          }}
        >
          {/* GitHub Link */}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-blue/20 to-accent-mint/20 border border-accent-blue/30 rounded-lg text-accent-blue hover:text-white transition-all duration-300 group"
              whileHover={prefersReducedMotion ? {} : { 
                scale: 1.05,
                backgroundColor: 'rgba(96, 165, 250, 0.1)',
                borderColor: 'rgba(96, 165, 250, 0.5)',
                boxShadow: '0 8px 25px rgba(96, 165, 250, 0.2)',
                transform: "translateZ(30px)",
                transition: { duration: 0.2 }
              }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              <Github size={16} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm font-medium">GitHub</span>
              <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.a>
          )}

          {/* Demo Link */}
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-mint/20 to-purple-500/20 border border-accent-mint/30 rounded-lg text-accent-mint hover:text-white transition-all duration-300 group"
              whileHover={prefersReducedMotion ? {} : { 
                scale: 1.05,
                backgroundColor: 'rgba(52, 211, 153, 0.1)',
                borderColor: 'rgba(52, 211, 153, 0.5)',
                boxShadow: '0 8px 25px rgba(52, 211, 153, 0.2)',
                transform: "translateZ(30px)",
                transition: { duration: 0.2 }
              }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              <ExternalLink size={16} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm font-medium">Live Demo</span>
              <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.a>
          )}

              {/* Demo Video Button - Only show if video URL exists */}
              {project.demoVideoUrl && (
                <motion.button
                  onClick={() => setShowVideo(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:text-white transition-all duration-300 group"
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.05,
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    borderColor: 'rgba(168, 85, 247, 0.5)',
                    boxShadow: '0 8px 25px rgba(168, 85, 247, 0.2)',
                    transform: "translateZ(30px)",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <Play size={16} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-medium">Demo Video</span>
                </motion.button>
              )}
        </motion.div>
      </motion.div>

      {/* Video Modal Overlay - Rendered at document body level */}
      <Portal>
        <AnimatePresence>
          {showVideo && (
            <motion.div
              className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVideo(false)}
              style={{ 
                zIndex: 999999,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
            >
              <motion.div
                className="relative w-[90vw] max-w-4xl bg-dark-card rounded-2xl overflow-hidden shadow-2xl border border-dark-border"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                style={{ zIndex: 1000000 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-dark-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-accent-blue/20 to-accent-blue/10 rounded-lg text-accent-blue">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                      <p className="text-slate-400">{project.category}</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setShowVideo(false)}
                    className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* Video Content */}
                <div className="p-6">
                  <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                    <video
                      src={project.demoVideoUrl}
                      className="w-full h-full"
                      controls
                      preload="metadata"
                      title={`${project.title} Demo Video`}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className="text-slate-400 text-sm mt-4 text-center">
                    Click outside the video or press the X button to close
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </motion.div>
  )
}

