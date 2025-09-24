'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Phone, MapPin, MessageCircle, Send, Heart } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { ContactForm } from '@/components/ui/ContactForm'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'robertyzz02@gmail.com',
    href: 'mailto:robertyzz02@gmail.com',
    primary: true
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+65 9359 8155',
    href: 'tel:+6593598155',
    primary: false
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Singapore',
    href: null,
    primary: false
  }
]

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/Zhenzha0',
    color: 'hover:text-white'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/zhenzhao-yang-6b30b2165',
    color: 'hover:text-blue-400'
  }
]

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <Section 
      id="contact" 
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)' }}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(96, 165, 250, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating Contact Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { Icon: MessageCircle, x: '10%', y: '20%', delay: 0 },
          { Icon: Send, x: '85%', y: '30%', delay: 0.5 },
          { Icon: Heart, x: '15%', y: '70%', delay: 1 },
          { Icon: Mail, x: '80%', y: '80%', delay: 1.5 }
        ].map(({ Icon, x, y, delay }, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 0.08, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="p-4 text-accent-blue"
              animate={{
                y: [-8, 8, -8],
                rotate: [0, 3, 0, -3, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            >
              <Icon size={40} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="container-max section-padding relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.h2 
            className="heading text-3xl md:text-4xl lg:text-5xl mb-8 text-accent-blue"
            variants={itemVariants}
          >
            Let's Connect
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed"
            variants={itemVariants}
          >
            Ready to collaborate on cutting-edge AI solutions? Let's discuss how we can 
            build intelligent systems that push the boundaries of technology together.
          </motion.p>

          {/* Contact Form */}
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            <ContactForm />
          </motion.div>

          {/* Contact Methods */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            variants={itemVariants}
          >
            {contactMethods.map((method) => {
              const Icon = method.icon
              const content = (
                <div className={`p-6 bg-slate-800 border border-slate-700 rounded-2xl transition-all duration-300 shadow-lg ${method.href ? 'hover:border-accent-blue/50 hover:bg-slate-750 cursor-pointer' : ''}`}>
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-3 rounded-xl mb-4 ${method.primary ? 'bg-accent-blue/20 text-accent-blue' : 'bg-dark-border/50 text-slate-400'}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="font-medium text-white mb-2">{method.label}</h3>
                    <p className="text-slate-300 text-sm">{method.value}</p>
                  </div>
                </div>
              )

              return method.href ? (
                <motion.a
                  key={method.label}
                  href={method.href}
                  className="block"
                  whileHover={prefersReducedMotion ? {} : { 
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  {content}
                </motion.a>
              ) : (
                <div key={method.label}>
                  {content}
                </div>
              )
            })}
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-6"
            variants={itemVariants}
          >
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-slate-800 border border-slate-700 rounded-2xl text-slate-400 transition-all duration-300 hover:border-accent-blue/50 hover:bg-slate-750 shadow-lg"
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.1,
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                  aria-label={`Visit ${social.label} profile`}
                >
                  <Icon size={28} />
                </motion.a>
              )
            })}
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="mt-16 pt-8 border-t border-dark-border text-center"
            variants={itemVariants}
          >
            <p className="text-slate-500 text-xs">
              © 2025 Yang Zhenzhao. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Visual Separator - Transition to Skills Section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <motion.div 
          className="w-full h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.3) 50%, rgba(15, 23, 42, 0.95) 100%)'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Animated Dots Separator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-accent-blue rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
