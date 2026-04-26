'use client'

import { useState, useEffect } from 'react'
import { Home, Grid3X3, Briefcase, Wrench, Mail, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '#hero', icon: Home },
  { label: 'Worlds', href: '#worlds', icon: Grid3X3 },
  { label: 'Journey', href: '#timeline', icon: Briefcase },
  { label: 'Gear', href: '#gear', icon: Wrench },
  { label: 'Contact', href: '#contact', icon: Mail },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false)
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Desktop Floating Dock */}
      <nav
        className={cn(
          'fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex',
          'glass-strong rounded-full px-2 py-2',
          'transition-all duration-500',
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
      >
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.href.slice(1)
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  'group relative flex items-center justify-center',
                  'w-12 h-12 rounded-full transition-all duration-300',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                )}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" />
                <span
                  className={cn(
                    'absolute -top-10 px-2 py-1 rounded-md text-xs font-medium',
                    'bg-secondary text-foreground',
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
                    'pointer-events-none whitespace-nowrap'
                  )}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Mobile Header */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 md:hidden',
          'transition-all duration-300',
          isScrolled ? 'glass-strong' : 'bg-transparent'
        )}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <span className="font-serif text-lg font-semibold text-foreground">
            EKS
          </span>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'absolute top-full left-0 right-0 glass-strong',
            'transition-all duration-300 overflow-hidden',
            isMobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.href.slice(1)
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'flex items-center gap-3 w-full px-4 py-3 rounded-lg',
                    'transition-colors duration-200',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Initial Navigation - Visible before scroll */}
      <nav
        className={cn(
          'fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex',
          'glass rounded-full px-6 py-3',
          'transition-all duration-500',
          isScrolled ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
        )}
      >
        <div className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1)
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'text-accent'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
