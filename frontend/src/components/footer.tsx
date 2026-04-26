import { Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-semibold text-foreground">
              EKS
            </span>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-muted-foreground text-sm">
              Earthen Krisdian Setya
            </span>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Made with</span>
            <Heart className="w-4 h-4 text-accent hidden sm:inline fill-accent" />
            <span className="hidden sm:inline">& Next.js</span>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6">
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
