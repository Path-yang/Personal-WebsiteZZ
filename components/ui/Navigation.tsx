'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Zap } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { CompactResumeButton } from '@/components/ui/CompactResumeButton'
import { Github, Linkedin } from 'lucide-react'

const navigationItems = [
  { label: 'Home', href: '#', sectionId: 'hero' },
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Education', href: '#education', sectionId: 'education' },
  { label: 'Professional Journey', href: '#experience', sectionId: 'experience' },
  { label: 'Projects', href: '#projects', sectionId: 'projects' },
  { label: 'Skills', href: '#skills', sectionId: 'skills' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' }
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isVisible, setIsVisible] = useState(true) // Always visible from start
  const prefersReducedMotion = useReducedMotion()

  // Navigation is always visible, no scroll transforms needed

  // Track scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      try {
        const scrollPosition = window.scrollY + 100
        setIsVisible(true) // Always visible now

        // Find active section
        const sections = navigationItems.map(item => ({
          id: item.sectionId,
          element: document.getElementById(item.sectionId)
        }))

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i]
          if (section.element) {
            const rect = section.element.getBoundingClientRect()
            const elementTop = rect.top + window.scrollY
            if (scrollPosition >= elementTop - 200) {
              setActiveSection(section.id)
              break
            }
          }
        }
      } catch (error) {
        console.warn('Error in navigation scroll handler:', error)
      }
    }

    // Set initial visibility and run scroll handler
    setIsVisible(true)
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    try {
      const element = document.getElementById(sectionId)
      if (element) {
        const offsetTop = sectionId === 'hero' ? 0 : element.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    } catch (error) {
      console.warn('Error scrolling to section:', error)
    }
    setIsOpen(false)
  }

  const navVariants = {
    hidden: { 
      opacity: 0, 
      y: -100,
      scale: 0.8,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 1.2,
        ease: [0.23, 1, 0.320, 1],
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  }

  const linkVariants = {
    inactive: { 
      color: '#94A3B8',
      scale: 1,
      textShadow: 'none'
    },
    active: { 
      color: '#60A5FA',
      scale: 1.05,
      textShadow: '0 0 20px rgba(96, 165, 250, 0.6)',
      transition: { duration: 0.3 }
    },
    hover: { 
      color: '#34D399',
      scale: 1.1,
      textShadow: '0 0 15px rgba(52, 211, 153, 0.5)',
      transition: { duration: 0.2 }
    }
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  }

  // Navigation is always visible now

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        variants={navVariants}
        initial="hidden"
        animate={isVisible || prefersReducedMotion ? "visible" : "hidden"}
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(96, 165, 250, 0.2)'
        }}
      >
        <motion.div 
          className="max-w-7xl mx-auto"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            className="bg-dark-card/80 backdrop-blur-xl border border-dark-border/50 rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(96, 165, 250, 0.1)'
            }}
            whileHover={prefersReducedMotion ? {} : {
              boxShadow: '0 25px 50px rgba(96, 165, 250, 0.15), 0 0 0 1px rgba(96, 165, 250, 0.2)',
              transition: { duration: 0.3 }
            }}
          >
            {/* Logo and Name */}
            <div className="flex items-center gap-4">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <motion.div
                  className="p-2 bg-gradient-to-br from-accent-blue/20 to-accent-mint/20 rounded-xl border border-accent-blue/30"
                  animate={prefersReducedMotion ? {} : {
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  whileHover={prefersReducedMotion ? {} : {
                    scale: 1.2,
                    rotate: 180,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Zap size={20} className="text-accent-blue" />
                </motion.div>
                <motion.span 
                  className="font-semibold text-white text-lg hidden sm:block"
                  whileHover={prefersReducedMotion ? {} : {
                    textShadow: '0 0 20px rgba(96, 165, 250, 0.6)',
                    transition: { duration: 0.3 }
                  }}
                >
                  Yang Zhenzhao
                </motion.span>
              </motion.div>

              {/* Social Buttons */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="hidden sm:flex items-center gap-3"
              >
                {/* LinkedIn Button */}
                <motion.a
                  href="https://www.linkedin.com/in/zhenzhao-yang-6b30b2165"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-br from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-lg backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300 group"
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.05,
                    y: -2,
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                  }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <Linkedin size={18} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                </motion.a>

                {/* GitHub Button */}
                <motion.a
                  href="https://github.com/Zhenzha0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-br from-gray-700/20 to-gray-600/20 border border-gray-500/30 rounded-lg backdrop-blur-sm hover:border-gray-400/50 transition-all duration-300 group"
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.05,
                    y: -2,
                    boxShadow: '0 8px 25px rgba(107, 114, 128, 0.3)'
                  }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <Github size={18} className="text-gray-400 group-hover:text-gray-300 transition-colors" />
                </motion.a>

                {/* Resume Button */}
                <CompactResumeButton />
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="relative px-4 py-2 rounded-xl font-medium transition-all duration-200"
                  variants={linkVariants}
                  initial="inactive"
                  animate={activeSection === item.sectionId ? "active" : "inactive"}
                  whileHover="hover"
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  {/* Active indicator */}
                  {activeSection === item.sectionId && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-mint/20 rounded-xl border border-accent-blue/30"
                      layoutId="activeTab"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                  
                  {/* Hover indicator */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent-mint/10 to-accent-blue/10 rounded-xl opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Active dot indicator */}
                  {activeSection === item.sectionId && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-1 h-1 bg-accent-blue rounded-full"
                      initial={{ scale: 0, x: '-50%' }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-accent-blue transition-colors duration-200"
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed top-20 left-0 right-0 z-40 px-6 md:hidden"
        variants={mobileMenuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <motion.div
          className="bg-dark-card/95 backdrop-blur-xl border border-dark-border/50 rounded-2xl p-6 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="space-y-3">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3"
                variants={mobileItemVariants}
                whileHover={prefersReducedMotion ? {} : {
                  scale: 1.02,
                  backgroundColor: 'rgba(96, 165, 250, 0.1)',
                  transition: { duration: 0.2 }
                }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                style={{
                  color: activeSection === item.sectionId ? '#60A5FA' : '#94A3B8'
                }}
              >
                {/* Active indicator */}
                <motion.div
                  className="w-2 h-2 rounded-full bg-accent-blue"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: activeSection === item.sectionId ? 1 : 0,
                    opacity: activeSection === item.sectionId ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <span>{item.label}</span>
              </motion.button>
            ))}
            
            {/* Mobile Social Buttons */}
            <motion.div
              className="pt-4 border-t border-dark-border/30"
              variants={mobileItemVariants}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                {/* LinkedIn Button */}
                <motion.a
                  href="https://www.linkedin.com/in/zhenzhao-yang-6b30b2165"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-to-br from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-lg backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300 group"
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.05,
                    y: -2,
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                  }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <Linkedin size={20} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                </motion.a>

                {/* GitHub Button */}
                <motion.a
                  href="https://github.com/Zhenzha0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-to-br from-gray-700/20 to-gray-600/20 border border-gray-500/30 rounded-lg backdrop-blur-sm hover:border-gray-400/50 transition-all duration-300 group"
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.05,
                    y: -2,
                    boxShadow: '0 8px 25px rgba(107, 114, 128, 0.3)'
                  }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <Github size={20} className="text-gray-400 group-hover:text-gray-300 transition-colors" />
                </motion.a>
              </div>
              
              {/* Resume Button */}
              <CompactResumeButton />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
