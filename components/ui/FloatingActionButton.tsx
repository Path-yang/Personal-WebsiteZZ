'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowUp, MessageCircle, Mail, Phone } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMobileOptimization } from '@/hooks/useMobileOptimization'

export function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { isClient } = useMobileOptimization()

  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsExpanded(false)
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
    setIsExpanded(false)
  }

  const contactEmail = () => {
    window.location.href = 'mailto:robertyzz02@gmail.com'
    setIsExpanded(false)
  }

  const contactPhone = () => {
    window.location.href = 'tel:+6593598155'
    setIsExpanded(false)
  }

  const buttonVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      rotate: -180
    },
    visible: { 
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  const actionButtonVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      y: 20
    },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }),
    exit: {
      scale: 0,
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  }

  // Don't render until client-side hydration is complete
  if (!isClient) return null

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Action Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[
              { icon: ArrowUp, action: scrollToTop, label: 'Back to Top', color: 'from-accent-blue to-blue-500' },
              { icon: MessageCircle, action: scrollToContact, label: 'Contact Form', color: 'from-accent-mint to-green-500' },
              { icon: Mail, action: contactEmail, label: 'Send Email', color: 'from-purple-500 to-pink-500' },
              { icon: Phone, action: contactPhone, label: 'Call Me', color: 'from-orange-500 to-red-500' }
            ].map((item, i) => (
              <motion.button
                key={item.label}
                onClick={item.action}
                className={`group relative p-3 bg-gradient-to-r ${item.color} rounded-full shadow-lg text-white overflow-hidden`}
                variants={actionButtonVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={i}
                whileHover={prefersReducedMotion ? {} : { 
                  scale: 1.1,
                  boxShadow: '0 10px 30px rgba(96, 165, 250, 0.3)',
                  transition: { duration: 0.2 }
                }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                title={item.label}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <item.icon size={20} className="relative z-10" />
                
                {/* Tooltip */}
                <motion.div
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-dark-card/90 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
                  initial={{ x: 10, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-dark-card/90" />
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative p-4 bg-gradient-to-r from-accent-blue to-accent-mint rounded-full shadow-2xl text-white overflow-hidden group"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover={prefersReducedMotion ? {} : { 
          scale: 1.1,
          boxShadow: '0 15px 40px rgba(96, 165, 250, 0.4)',
          transition: { duration: 0.3 }
        }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
        style={{
          background: isExpanded 
            ? 'linear-gradient(45deg, #EF4444, #F97316)' 
            : 'linear-gradient(45deg, #60A5FA, #34D399)'
        }}
      >
        {/* Rotating background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent-mint to-accent-blue rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />
        
        {/* Icon */}
        <motion.div
          className="relative z-10"
          animate={{ 
            rotate: isExpanded ? 45 : 0,
            scale: isExpanded ? 1.1 : 1
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        >
          {isExpanded ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              ✕
            </motion.div>
          ) : (
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </motion.div>

        {/* Pulse rings */}
        {!isExpanded && !prefersReducedMotion && (
          <>
            <motion.div
              className="absolute inset-0 border-2 border-accent-blue rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-accent-mint rounded-full"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.6, 0, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </>
        )}
      </motion.button>
    </div>
  )
}
