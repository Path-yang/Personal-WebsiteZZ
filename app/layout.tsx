import type { Metadata } from 'next'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}

