import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Cursor } from '@/components/cursor'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://earthen.my.id'),
  title: {
    default: 'EarthenHub',
    template: '%s | EarthenHub',
  },
  description: 'Earthen Krisdian Setya is a multi-disciplinary professional specializing in full stack development (Flutter, Dart, React, Next.js, Django, Python), UI/UX design, and photography. Explore digital experiences built with artistry and technical excellence.',
  keywords: [
    'Full Stack Developer',
    'UI/UX Designer',
    'Photographer',
    'Next.js Developer',
    'Django Developer',
    'Flutter Developer',
    'React Developer',
    'Dart Developer',
    'Python Developer',
    'Earthen Krisdian Setya',
    'EarthenHub',
    'Indonesia Web Developer',
    'Software Engineer',
    'Software Developer',
    'Mobile Developer',
    'Frontend Developer',
    'Backend Developer',
    'Web Developer',
  ],
  authors: [{ name: 'Earthen Krisdian Setya', url: 'https://earthen.my.id' }],
  creator: 'Earthen Krisdian Setya',
  publisher: 'Earthen Krisdian Setya',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'EarthenHub',
    description: 'Multi-disciplinary professional specializing in full stack development, UI/UX design, and photography.',
    url: 'https://earthen.my.id',
    siteName: 'EarthenHub',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EarthenHub Portfolio Overview',
      },
    ],
  },
  verification: {
    google: 'your-google-verification-code', // Replace this later
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <div className="film-grain" aria-hidden="true" />
        <Cursor />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
