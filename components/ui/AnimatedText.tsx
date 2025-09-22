'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useEffect, useState } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  type?: 'typewriter' | 'reveal' | 'glitch' | 'build'
  highlightWords?: string[]
  onComplete?: () => void
}

export function AnimatedText({ 
  text, 
  className = "", 
  delay = 0, 
  type = 'typewriter',
  highlightWords = [],
  onComplete 
}: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const words = text.split(' ')
  const characters = text.split('')

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text)
      setIsComplete(true)
      onComplete?.()
      return
    }

    if (type === 'typewriter') {
      const timer = setTimeout(() => {
        if (currentIndex < characters.length) {
          setDisplayedText(prev => prev + characters[currentIndex])
          setCurrentIndex(prev => prev + 1)
        } else if (!isComplete) {
          setIsComplete(true)
          onComplete?.()
        }
      }, delay + currentIndex * 20)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, characters, delay, text, type, isComplete, onComplete, prefersReducedMotion])

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  if (type === 'typewriter') {
    return (
      <span className={className}>
        {displayedText}
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-accent-blue ml-1"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ display: isComplete ? 'none' : 'inline-block' }}
        />
      </span>
    )
  }

  if (type === 'reveal') {
    return (
      <span className={className}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.1,
              ease: [0.645, 0.045, 0.355, 1.000],
              type: "spring",
              stiffness: 100
            }}
            style={{ transformOrigin: 'center bottom' }}
          >
            {highlightWords.includes(word) ? (
              <span className="text-accent-blue">{word}</span>
            ) : (
              word
            )}
            {i < words.length - 1 && ' '}
          </motion.span>
        ))}
      </span>
    )
  }

  if (type === 'glitch') {
    return (
      <span className={className}>
        {characters.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ 
              opacity: 0, 
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: 0,
              rotate: Math.random() * 360
            }}
            animate={{ 
              opacity: 1, 
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0
            }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.03,
              ease: "easeOut",
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            whileHover={{
              scale: 1.2,
              color: '#60A5FA',
              textShadow: '0 0 20px rgba(96, 165, 250, 0.8)',
              transition: { duration: 0.2 }
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    )
  }

  if (type === 'build') {
    return (
      <span className={className}>
        {characters.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ 
              opacity: 0,
              scale: 0,
              y: -100,
              rotateY: -180
            }}
            animate={{ 
              opacity: 1,
              scale: [0, 1.3, 1],
              y: 0,
              rotateY: 0
            }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.05,
              ease: [0.645, 0.045, 0.355, 1.000],
              type: "spring",
              stiffness: 150,
              damping: 12
            }}
            whileHover={{
              scale: 1.1,
              y: -5,
              transition: { duration: 0.2 }
            }}
            style={{
              textShadow: highlightWords.some(word => word.includes(char)) 
                ? '0 0 30px rgba(96, 165, 250, 0.6)' 
                : 'none'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    )
  }

  return <span className={className}>{text}</span>
}

// Specialized component for the main hero title
export function HeroTitle({ firstName, lastName, delay = 0 }: {
  firstName: string
  lastName: string
  delay?: number
}) {
  const prefersReducedMotion = useReducedMotion()
  const [showSecondName, setShowSecondName] = useState(false)

  if (prefersReducedMotion) {
    return (
      <>
        <span>{firstName} </span>
        <span className="text-accent-blue font-medium">{lastName}</span>
      </>
    )
  }

  return (
    <>
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, x: -100, rotateY: -45 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{
          duration: 1.2,
          delay: delay,
          ease: [0.645, 0.045, 0.355, 1.000],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        onAnimationComplete={() => setShowSecondName(true)}
        whileHover={{
          scale: 1.05,
          rotateY: 5,
          textShadow: '0 0 40px rgba(255, 255, 255, 0.5)',
          transition: { duration: 0.3 }
        }}
      >
        {firstName.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + 0.3 + i * 0.1,
              ease: "easeOut"
            }}
          >
            {char === ',' ? ', ' : char}
          </motion.span>
        ))}
      </motion.span>
      {' '}
      <motion.span
        className="text-accent-blue font-medium inline-block"
        initial={{ opacity: 0, x: 100, rotateY: 45 }}
        animate={showSecondName ? { opacity: 1, x: 0, rotateY: 0 } : {}}
        transition={{
          duration: 1.2,
          delay: 0.5,
          ease: [0.645, 0.045, 0.355, 1.000],
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        whileHover={{
          scale: 1.05,
          rotateY: -5,
          textShadow: '0 0 40px rgba(96, 165, 250, 0.8)',
          transition: { duration: 0.3 }
        }}
      >
        {lastName.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 50, scale: 0 }}
            animate={showSecondName ? { 
              opacity: 1, 
              y: 0, 
              scale: [0, 1.2, 1] 
            } : {}}
            transition={{
              duration: 0.6,
              delay: 0.8 + i * 0.1,
              ease: "easeOut",
              type: "spring",
              stiffness: 150
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </>
  )
}
