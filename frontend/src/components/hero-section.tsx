'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Code2, Camera, Palette } from 'lucide-react'
import { cn } from '@/lib/utils'

const taglines = [
  'Building Digital Experiences',
  'Crafting Visual Stories',
  'Designing with Purpose',
  'Engineering the Future',
]

const roles = [
  { icon: Code2, label: 'Full Stack Developer' },
  { icon: Palette, label: 'UI/UX Designer' },
  { icon: Camera, label: 'Photographer' },
]

export function HeroSection() {
  const [currentTagline, setCurrentTagline] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldStickPortrait, setShouldStickPortrait] = useState(true)
  const portraitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about')
      if (aboutSection && portraitRef.current) {
        const aboutRect = aboutSection.getBoundingClientRect()
        setShouldStickPortrait(aboutRect.top > window.innerHeight / 2)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const scrollToWorlds = () => {
    const element = document.getElementById('worlds')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Typography */}
          <div
            className={cn(
              'space-y-8 transition-all duration-1000',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            )}
          >
            {/* Role Badges */}
            <div className="flex flex-wrap gap-3">
              {roles.map((role, index) => {
                const Icon = role.icon
                return (
                  <div
                    key={role.label}
                    className={cn(
                      'glass flex items-center gap-2 px-4 py-2 rounded-full',
                      'text-sm text-muted-foreground',
                      'transition-all duration-500'
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <Icon className="w-4 h-4 text-accent" />
                    <span>{role.label}</span>
                  </div>
                )
              })}
            </div>

            {/* Name */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-foreground">
                <span className="block">Earthen</span>
                <span className="block text-accent">Krisdian</span>
                <span className="block">Setya</span>
              </h1>
            </div>

            {/* Dynamic Tagline */}
            <div className="h-8 relative overflow-hidden">
              {taglines.map((tagline, index) => (
                <p
                  key={tagline}
                  className={cn(
                    'absolute inset-0 text-xl text-muted-foreground transition-all duration-500',
                    currentTagline === index
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  )}
                >
                  {tagline}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToWorlds}
                className={cn(
                  'group flex items-center gap-2 px-6 py-3 rounded-full',
                  'bg-accent text-accent-foreground font-medium',
                  'hover:bg-accent/90 transition-all duration-300',
                  'hover:shadow-lg hover:shadow-accent/20'
                )}
              >
                Explore My Worlds
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
              <a
                href="#contact"
                className={cn(
                  'flex items-center gap-2 px-6 py-3 rounded-full',
                  'glass text-foreground font-medium',
                  'hover:bg-secondary transition-all duration-300'
                )}
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right Side - Portrait */}
          <div
            ref={portraitRef}
            className={cn(
              'transition-all duration-1000 delay-300',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10',
              shouldStickPortrait ? 'sticky top-20' : 'relative'
            )}
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 via-transparent to-accent/10 rounded-3xl blur-2xl" />
              <div className="absolute top-4 right-4 w-20 h-20 border border-accent/30 rounded-full" />
              <div className="absolute bottom-8 left-4 w-12 h-12 bg-accent/20 rounded-full animate-float" />
              
              {/* Portrait Container */}
              <div className="relative h-full glass rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-transparent to-accent/10" />
                
                {/* Portrait Placeholder with Professional Look */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto rounded-full bg-secondary/50 flex items-center justify-center">
                      <span className="font-serif text-5xl font-bold text-accent">E</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Professional Portrait</p>
                      <p className="text-xs text-muted-foreground/60">Coming Soon</p>
                    </div>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <div className="absolute top-4 left-4 w-8 h-[1px] bg-accent/50" />
                  <div className="absolute top-4 left-4 w-[1px] h-8 bg-accent/50" />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <div className="absolute bottom-4 right-4 w-8 h-[1px] bg-accent/50" />
                  <div className="absolute bottom-4 right-4 w-[1px] h-8 bg-accent/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
