'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const inputVariants = {
    hidden: { opacity: 0, x: -50, rotateY: -15 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.1,
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: "easeOut"
      }
    })
  }

  const buttonVariants = {
    idle: { 
      scale: 1,
      rotateY: 0,
      boxShadow: '0 10px 30px rgba(96, 165, 250, 0.2)'
    },
    sending: { 
      scale: 0.95,
      rotateY: 10,
      boxShadow: '0 5px 15px rgba(96, 165, 250, 0.4)'
    },
    success: { 
      scale: 1.05,
      rotateY: 0,
      boxShadow: '0 15px 40px rgba(52, 211, 153, 0.4)'
    }
  }

  return (
    <motion.div 
      className="max-w-2xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.form 
        onSubmit={handleSubmit}
        className="space-y-6 bg-gradient-to-br from-dark-card/60 to-dark-card/30 backdrop-blur-sm border border-dark-border rounded-2xl p-8"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}
        whileHover={prefersReducedMotion ? {} : {
          rotateY: 2,
          boxShadow: '0 30px 60px rgba(96, 165, 250, 0.1)',
          transition: { duration: 0.3 }
        }}
      >
        <motion.h3 
          className="heading text-2xl md:text-3xl font-semibold text-center mb-8 text-accent-blue"
          variants={inputVariants}
          custom={0}
        >
          Let's Build Something Amazing
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={inputVariants} custom={1}>
            <motion.input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-4 bg-dark-bg/50 border border-dark-border rounded-xl text-white placeholder-slate-400 focus:border-accent-blue focus:outline-none transition-all duration-300"
              whileFocus={prefersReducedMotion ? {} : {
                scale: 1.02,
                boxShadow: '0 0 30px rgba(96, 165, 250, 0.3)',
                transition: { duration: 0.2 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
          </motion.div>

          <motion.div variants={inputVariants} custom={2}>
            <motion.input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-4 bg-dark-bg/50 border border-dark-border rounded-xl text-white placeholder-slate-400 focus:border-accent-blue focus:outline-none transition-all duration-300"
              whileFocus={prefersReducedMotion ? {} : {
                scale: 1.02,
                boxShadow: '0 0 30px rgba(96, 165, 250, 0.3)',
                transition: { duration: 0.2 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            />
          </motion.div>
        </div>

        <motion.div variants={inputVariants} custom={3}>
          <motion.input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 bg-dark-bg/50 border border-dark-border rounded-xl text-white placeholder-slate-400 focus:border-accent-blue focus:outline-none transition-all duration-300"
            whileFocus={prefersReducedMotion ? {} : {
              scale: 1.02,
              boxShadow: '0 0 30px rgba(96, 165, 250, 0.3)',
              transition: { duration: 0.2 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
          />
        </motion.div>

        <motion.div variants={inputVariants} custom={4}>
          <motion.textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-4 bg-dark-bg/50 border border-dark-border rounded-xl text-white placeholder-slate-400 focus:border-accent-blue focus:outline-none transition-all duration-300 resize-none"
            whileFocus={prefersReducedMotion ? {} : {
              scale: 1.02,
              boxShadow: '0 0 30px rgba(96, 165, 250, 0.3)',
              transition: { duration: 0.2 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
          />
        </motion.div>

        <motion.div 
          className="text-center"
          variants={inputVariants} 
          custom={5}
        >
          <motion.button
            type="submit"
            disabled={status === 'sending'}
            className="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-mint text-white font-semibold rounded-xl flex items-center gap-3 mx-auto overflow-hidden relative"
            variants={buttonVariants}
            animate={status}
            whileHover={prefersReducedMotion ? {} : { 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent-mint to-accent-blue"
              initial={{ x: '-100%' }}
              animate={{ x: status === 'sending' ? '100%' : '-100%' }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            
            <div className="relative flex items-center gap-3">
              {status === 'idle' && (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
              {status === 'sending' && (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Send size={20} />
                  </motion.div>
                  Sending...
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle size={20} />
                  Message Sent!
                </>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle size={20} />
                  Try Again
                </>
              )}
            </div>
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  )
}
