import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'Earthen Krisdian Setya | Full Stack Developer, Designer & Photographer',
  description: 'Multi-disciplinary professional specializing in full stack development, UI/UX design, and photography. Building digital experiences that blend technology and artistry.',
  keywords: ['Full Stack Developer', 'UI/UX Designer', 'Photographer', 'Next.js', 'React', 'Django', 'Portfolio'],
  authors: [{ name: 'Earthen Krisdian Setya' }],
  openGraph: {
    title: 'Earthen Krisdian Setya | Full Stack Developer, Designer & Photographer',
    description: 'Multi-disciplinary professional specializing in full stack development, UI/UX design, and photography.',
    type: 'website',
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        <div className="film-grain" aria-hidden="true" />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
