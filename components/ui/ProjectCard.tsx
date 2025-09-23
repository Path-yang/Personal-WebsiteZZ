'use client'

import { motion } from 'framer-motion'
import { LucideIcon, Github, ExternalLink, Play, X } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useRef, useState } from 'react'

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

  return (
    <div ref={ref} className="group relative h-full">
      <div className="relative bg-gradient-to-br from-dark-card/60 to-dark-card/30 backdrop-blur-sm border border-dark-border rounded-2xl p-6 h-full transition-all duration-500 group-hover:border-accent-blue/40 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-accent-blue/20 to-accent-blue/10 rounded-xl text-accent-blue border border-accent-blue/20">
              <Icon size={24} />
            </div>
            <div>
              <h3 className="heading text-xl font-semibold text-white">
                {project.title}
              </h3>
              <p className="text-accent-mint text-sm font-medium">
                {project.category}
              </p>
            </div>
          </div>
          <span className="text-slate-400 text-sm whitespace-nowrap">
            {project.period}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-300 leading-relaxed mb-6 relative z-10">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="mb-6 relative z-10">
          <h4 className="text-white font-medium mb-3">Key Achievements</h4>
          <ul className="space-y-2">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-accent-blue rounded-full mt-2 flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="relative z-10 mb-6">
          <h4 className="text-white font-medium mb-3">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <span
                key={tech}
                className="px-3 py-1 bg-dark-bg/30 border border-dark-border rounded-full text-xs text-slate-300 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links Section */}
        <div className="relative z-10 flex flex-wrap gap-3">
          {/* GitHub Link */}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-blue/20 to-accent-mint/20 border border-accent-blue/30 rounded-lg text-accent-blue hover:text-white transition-all duration-300"
              style={{ 
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <Github size={16} />
              <span className="text-sm font-medium">GitHub</span>
              <ExternalLink size={14} />
            </a>
          )}

          {/* Demo Link */}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-mint/20 to-purple-500/20 border border-accent-mint/30 rounded-lg text-accent-mint hover:text-white transition-all duration-300"
              style={{ 
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <ExternalLink size={16} />
              <span className="text-sm font-medium">Live Demo</span>
              <ExternalLink size={14} />
            </a>
          )}

          {/* Demo Video Button */}
          {project.demoVideoUrl && (
            <button
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:text-white transition-all duration-300"
              style={{ 
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <Play size={16} />
              <span className="text-sm font-medium">Demo Video</span>
            </button>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-md">
          <div className="relative w-[90vw] max-w-4xl bg-dark-card rounded-2xl overflow-hidden shadow-2xl border border-dark-border">
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
              <button
                onClick={() => setShowVideo(false)}
                className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
              >
                <X size={24} />
              </button>
            </div>
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
          </div>
        </div>
      )}
    </div>
  )
}