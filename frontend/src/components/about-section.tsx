'use client'

import { useEffect, useRef, useState } from 'react'
import { Code2, Zap, Grid3X3 } from 'lucide-react'
import { cn } from '@/lib/utils'

import { getIcon } from '@/lib/icon-map'

export function AboutSection({ philosophy }: { philosophy: any }) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTrait, setActiveTrait] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const isHovering = activeTrait !== null

  // Fallbacks if data is missing
  const defaultText = "I am a systems builder who finds clarity in structure and intentional architecture. I view my work as a digital garden where technical integrity and long term value grow together. My focus is on creating software that is not just functional but structurally sound and built to endure.\n\nBy combining systems architecture with procedural logic, I bridge the gap between technical execution and business goals. Whether I am solving complex data problems or mentoring others my mission is to transform difficult challenges into elegant solutions. I believe the best digital tools are those that are robust in their foundation and intuitive to use."
  const philosophyText = philosophy?.philosophyText || defaultText
  const paragraphs = philosophyText.split('\n\n')
  
  const defaultTraits = [
    { title: 'System Architect', description: 'Designing scalable, maintainable systems with programming excellence', icon: 'Grid3X3' },
    { title: 'Full Stack Developer', description: 'Specialized in end-to-end development and modern architectures', icon: 'Code2' },
    { title: 'INTJ Personality', description: 'Strategic thinker who finds clarity in structure and systems', icon: 'Zap' },
  ]
  const traits = philosophy?.traits?.length ? philosophy.traits : defaultTraits

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 lg:py-28 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Traits */}
          <div
            className={cn(
              'space-y-8 transition-all duration-1000',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            )}
          >
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">About Me</span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground">
                Clarity Through
                <span className="block text-accent">Structure</span>
              </h2>
            </div>

            {/* Core Traits */}
            <div className="space-y-4 pt-4">
              {traits.map((trait: any, idx: number) => {
                const Icon = getIcon(trait.icon) || Grid3X3
                const isActive = activeTrait === idx
                const isFaded = isHovering && !isActive
                
                return (
                  <div
                    key={trait.title}
                    onMouseEnter={() => setActiveTrait(idx)}
                    onMouseLeave={() => setActiveTrait(null)}
                    className={cn(
                      'glass p-4 rounded-lg border border-secondary/30',
                      'transition-all duration-700 hover:border-accent/50 hover:bg-secondary/30 group',
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
                      isFaded && 'opacity-50 scale-95 blur-[0.5px]'
                    )}
                    style={{ transitionDelay: `${idx * 150}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm">{trait.title}</h3>
                        <p className="text-muted-foreground text-sm font-light leading-relaxed">
                          {trait.description || trait.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right - Conclusion */}
          <div
            className={cn(
              'transition-all duration-1000 delay-300',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            )}
          >
            <div className="glass p-8 lg:p-10 rounded-2xl border border-secondary/30 space-y-6">
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 -m-1">
                <div className="absolute top-4 right-4 w-12 h-[1px] bg-accent/30" />
                <div className="absolute top-4 right-4 w-[1px] h-12 bg-accent/30" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-foreground">
                My Philosophy
              </h3>

              <div className="space-y-4 text-muted-foreground/90 font-light leading-relaxed text-sm sm:text-base">
                {paragraphs.map((para: string, idx: number) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Decorative Corner */}
              <div className="absolute bottom-0 left-0 w-20 h-20 -m-1">
                <div className="absolute bottom-4 left-4 w-12 h-[1px] bg-accent/30" />
                <div className="absolute bottom-4 left-4 w-[1px] h-12 bg-accent/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}