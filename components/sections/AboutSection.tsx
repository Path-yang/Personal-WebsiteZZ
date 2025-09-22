'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { useMobileOptimization } from '@/hooks/useMobileOptimization'

export function AboutSection() {
  const { shouldReduceAnimations } = useMobileOptimization()
  
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.320, 1]
      }
    }
  }

  return (
    <Section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gentle Gradient Animation */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 25%, rgba(15, 23, 42, 0.9) 50%, rgba(30, 41, 59, 0.7) 75%, rgba(15, 23, 42, 0.8) 100%)',
            backgroundSize: '400% 400%'
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating Light Orbs - Reduce count on mobile */}
        {[...Array(shouldReduceAnimations ? 3 : 6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${20 + i * 8}px`,
              height: `${20 + i * 8}px`,
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: `radial-gradient(circle, ${
                i % 3 === 0 
                  ? 'rgba(96, 165, 250, 0.1)' 
                  : i % 3 === 1 
                  ? 'rgba(52, 211, 153, 0.08)' 
                  : 'rgba(168, 85, 247, 0.06)'
              } 0%, transparent 70%)`,
              filter: 'blur(1px)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 2,
              delay: i * 0.3,
              ease: "easeOut"
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-8, 8, -8],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
        
        {/* Subtle Mesh Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(96, 165, 250, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96, 165, 250, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container-max section-padding relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Profile Picture */}
          <motion.div 
            className="mb-12"
            variants={itemVariants}
          >
            <motion.div
              className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated border ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(96, 165, 250, 0.8), rgba(52, 211, 153, 0.8), rgba(168, 85, 247, 0.8), rgba(96, 165, 250, 0.8))',
                  padding: '3px'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full bg-dark-bg rounded-full" />
              </motion.div>
              
              {/* Profile Image */}
              <motion.div
                className="absolute inset-3 rounded-full overflow-hidden bg-gradient-to-br from-accent-blue/10 to-accent-mint/10 backdrop-blur-sm border border-accent-blue/20"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <img
                  src="/profile.jpg"
                  alt="Yang Zhenzhao - AI Engineer & Full-Stack Developer"
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to a gradient background if image fails to load
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, rgba(96, 165, 250, 0.3) 0%, rgba(52, 211, 153, 0.3) 100%)'
                  }}
                />
              </motion.div>

            </motion.div>
          </motion.div>

          <motion.h2 
            className="heading text-3xl md:text-4xl lg:text-5xl mb-8 text-accent-blue"
            variants={itemVariants}
          >
            About Me
          </motion.h2>
          
          <motion.div 
            className="text-lg md:text-xl text-slate-300 leading-relaxed space-y-6"
            variants={itemVariants}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I'm a Computer Engineering student at the National University of Singapore, 
              passionate about building intelligent systems that solve real-world problems. 
              My experience spans from developing AI-powered process workflow platforms 
              to creating full-stack applications that impact thousands of users.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              With experience in AI/ML development, I have architected hybrid solutions 
              switching between cloud-based and locally optimized models. I thrive at 
              the intersection of cutting-edge research and practical implementation, 
              always seeking to push the boundaries of what's possible.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              When I'm not coding, you'll find me leading tech communities at NUS, 
              organizing startup events through the Computing Technopreneurship Society, 
              or collaborating with fellow innovators to tackle social impact challenges. 
              I believe in technology as a force for positive change.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}

