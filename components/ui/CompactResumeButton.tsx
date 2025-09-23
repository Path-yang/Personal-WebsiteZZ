'use client'

import { FileText, ExternalLink } from 'lucide-react'

export function CompactResumeButton() {
  return (
    <a
      href="/Yang-Zhenzhao-Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-mint to-green-500 text-white rounded-xl font-semibold text-sm shadow-lg hover:from-green-500 hover:to-accent-mint transition-all duration-300 relative overflow-hidden border border-accent-mint/30"
      title="View My Resume"
      style={{ 
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        minHeight: '44px',
        minWidth: '44px',
        cursor: 'pointer',
        pointerEvents: 'auto'
      }}
    >
      <FileText size={16} />
      <span className="font-bold">Resume</span>
      <ExternalLink size={12} />
    </a>
  )
}
