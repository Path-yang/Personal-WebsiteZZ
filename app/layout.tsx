import type { Metadata } from 'next'
import './globals.css'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { Navigation } from '@/components/ui/Navigation'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { FloatingActionButton } from '@/components/ui/FloatingActionButton'
import { KeyboardShortcuts } from '@/components/ui/KeyboardShortcuts'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { CursorEffects } from '@/components/ui/CursorEffects'
import { ErrorBoundary } from '@/components/providers/ErrorBoundary'
import { ClientOnly } from '@/components/providers/ClientOnly'

export const metadata: Metadata = {
  title: 'Yang Zhenzhao - AI Engineer & Full-Stack Developer',
  description: 'Computer Engineering student at NUS specializing in AI/ML, full-stack development, and innovative tech solutions.',
  keywords: ['Yang Zhenzhao', 'AI Engineer', 'Full-Stack Developer', 'Computer Engineering', 'NUS', 'Machine Learning'],
  authors: [{ name: 'Yang Zhenzhao' }],
  openGraph: {
    title: 'Yang Zhenzhao - AI Engineer & Full-Stack Developer',
    description: 'Computer Engineering student at NUS specializing in AI/ML, full-stack development, and innovative tech solutions.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F172A',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <ErrorBoundary>
          <ClientOnly fallback={<div className="min-h-screen bg-slate-900" />}>
            <LoadingScreen />
            <CursorEffects />
          </ClientOnly>
          <SmoothScrollProvider>
            <ClientOnly fallback={<div className="fixed top-0 left-0 w-full h-1 bg-slate-800" />}>
              <ScrollProgress />
            </ClientOnly>
            <ClientOnly fallback={<div className="fixed top-0 left-0 right-0 h-16 bg-slate-900/90 backdrop-blur-sm z-50" />}>
              <Navigation />
            </ClientOnly>
            {children}
            <ClientOnly>
              <FloatingActionButton />
              <KeyboardShortcuts />
            </ClientOnly>
          </SmoothScrollProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

