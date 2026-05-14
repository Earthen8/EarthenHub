import EKSlogo from '../../public/eks-logo-white-transparent.png'
import Image from 'next/image'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Image 
              src={EKSlogo} 
              alt="Earthen Krisdian Setya Logo" 
              className="h-10 w-auto sm:h-12 object-contain"
            />
          </div>

          {/* Copyright */}
          <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-muted-foreground">
            <span>© {currentYear}</span>
            <span>•</span>
            <span>Made with Next.js</span>
          </div>

          {/* Quick Links */}
          <div className="flex items-center justify-center sm:justify-end gap-6">
            <a
              href="#hero"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
