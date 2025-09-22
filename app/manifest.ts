import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Yang Zhenzhao - Portfolio',
    short_name: 'Yang Zhenzhao',
    description: 'AI Engineer & Full-Stack Developer portfolio showcasing innovative tech solutions',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F172A',
    theme_color: '#60A5FA',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}

