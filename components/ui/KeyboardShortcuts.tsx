'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const shortcuts = [
  { key: '1', section: 'hero', label: 'Home' },
  { key: '2', section: 'about', label: 'About' },
  { key: '3', section: 'education', label: 'Education' },
  { key: '4', section: 'experience', label: 'Professional Journey' },
  { key: '5', section: 'projects', label: 'Projects' },
  { key: '6', section: 'skills', label: 'Skills' },
  { key: '7', section: 'contact', label: 'Contact' }
]

export function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false)
  const [recentShortcut, setRecentShortcut] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      try {
        // Toggle help with '?' or 'h'
        if (e.key === '?' || (e.key === 'h' && e.ctrlKey)) {
          e.preventDefault()
          setShowHelp(!showHelp)
          return
        }

        // Close help with escape
        if (e.key === 'Escape') {
          setShowHelp(false)
          return
        }

        // Navigation shortcuts (1-7)
        const shortcut = shortcuts.find(s => s.key === e.key)
        if (shortcut && !e.ctrlKey && !e.altKey && !e.metaKey) {
          e.preventDefault()
          
          const element = document.getElementById(shortcut.section)
          if (element) {
            const offsetTop = shortcut.section === 'hero' ? 0 : element.offsetTop - 80
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            })
            
            // Show visual feedback
            setRecentShortcut(shortcut.key)
            setTimeout(() => setRecentShortcut(null), 1500)
          }
        }

        // Back to top with Home key
        if (e.key === 'Home') {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setRecentShortcut('Home')
          setTimeout(() => setRecentShortcut(null), 1500)
        }

        // Scroll to bottom with End key
        if (e.key === 'End') {
          e.preventDefault()
          window.scrollTo({ 
            top: document.documentElement.scrollHeight, 
            behavior: 'smooth' 
          })
          setRecentShortcut('End')
          setTimeout(() => setRecentShortcut(null), 1500)
        }
      } catch (error) {
        console.warn('Error in keyboard shortcut handler:', error)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showHelp])

  return (
    <>
      {/* Keyboard Shortcut Indicator */}
      <AnimatePresence>
        {recentShortcut && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-dark-card/95 backdrop-blur-xl border border-accent-blue/50 rounded-2xl px-6 py-4 text-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent-blue/20 border border-accent-blue/50 rounded-lg flex items-center justify-center text-accent-blue font-mono text-sm">
                {recentShortcut}
              </div>
              <span className="text-white font-medium">
                {recentShortcut === 'Home' ? 'Scrolled to Top' : 
                 recentShortcut === 'End' ? 'Scrolled to Bottom' :
                 `Navigated to ${shortcuts.find(s => s.key === recentShortcut)?.label}`}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelp(false)}
            />
            
            {/* Help Panel */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-dark-card/95 backdrop-blur-xl border border-dark-border rounded-2xl p-8 max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <motion.h3 
                className="heading text-2xl font-semibold text-accent-blue mb-6 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Keyboard Shortcuts
              </motion.h3>
              
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Navigation shortcuts */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium text-sm uppercase tracking-wider">Navigation</h4>
                  {shortcuts.map((shortcut, i) => (
                    <motion.div
                      key={shortcut.key}
                      className="flex items-center justify-between py-2 px-3 bg-dark-bg/50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                    >
                      <span className="text-slate-300">{shortcut.label}</span>
                      <div className="w-6 h-6 bg-accent-blue/20 border border-accent-blue/50 rounded flex items-center justify-center text-accent-blue font-mono text-xs">
                        {shortcut.key}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Additional shortcuts */}
                <div className="space-y-3 pt-4 border-t border-dark-border">
                  <h4 className="text-white font-medium text-sm uppercase tracking-wider">Actions</h4>
                  {[
                    { key: 'Home', label: 'Scroll to Top' },
                    { key: 'End', label: 'Scroll to Bottom' },
                    { key: '?', label: 'Toggle This Help' },
                    { key: 'Esc', label: 'Close Help' }
                  ].map((item, i) => (
                    <motion.div
                      key={item.key}
                      className="flex items-center justify-between py-2 px-3 bg-dark-bg/50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                    >
                      <span className="text-slate-300">{item.label}</span>
                      <div className="px-2 h-6 bg-accent-mint/20 border border-accent-mint/50 rounded flex items-center justify-center text-accent-mint font-mono text-xs">
                        {item.key}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-slate-400 text-sm">
                  Press <span className="text-accent-blue font-mono">?</span> anytime to toggle this help
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Help Hint (bottom right) */}
      {!showHelp && (
        <motion.button
          onClick={() => setShowHelp(true)}
          className="fixed bottom-6 left-6 z-30 w-10 h-10 bg-dark-card/80 backdrop-blur-sm border border-dark-border rounded-full flex items-center justify-center text-slate-400 hover:text-accent-blue hover:border-accent-blue/50 transition-all duration-300"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          whileHover={prefersReducedMotion ? {} : { 
            scale: 1.1,
            boxShadow: '0 5px 20px rgba(96, 165, 250, 0.3)',
            transition: { duration: 0.2 }
          }}
          title="Keyboard Shortcuts (Press ? to toggle)"
        >
          <span className="font-mono text-sm font-bold">?</span>
        </motion.button>
      )}
    </>
  )
}
