'use client'

import { useEffect, useRef, useState } from 'react'
import { Code2, Zap, Grid3X3 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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

  const traits = [
    {
      icon: Zap,
      title: 'INTJ Personality',
      description: 'Strategic thinker who finds clarity in structure and systems',
    },
    {
      icon: Code2,
      title: 'Full Stack Developer',
      description: 'Specialized in end-to-end development and modern architectures',
    },
    {
      icon: Grid3X3,
      title: 'System Architect',
      description: 'Designing scalable, maintainable systems with programming excellence',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 lg:py-32 overflow-hidden"
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
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;m an INTJ who thrives when systems make sense and architecture is intentional. Every line of code, every design decision, and every system I build reflects a deep commitment to clarity and excellence.
              </p>
            </div>

            {/* Core Traits */}
            <div className="space-y-4 pt-4">
              {traits.map((trait, index) => {
                const Icon = trait.icon
                return (
                  <div
                    key={trait.title}
                    className={cn(
                      'glass p-4 rounded-lg border border-secondary/30',
                      'transition-all duration-700 hover:border-accent/50 hover:bg-secondary/30 group',
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    )}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm">{trait.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{trait.description}</p>
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

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I believe great products emerge from the intersection of clear thinking, elegant architecture, and intentional design. Whether I&apos;m architecting a distributed system, crafting a user interface, or capturing a moment through a lens, the principle remains the same: clarity, purpose, and mastery in every detail.
                </p>

                <p>
                  As a full-stack developer and system architect, I specialize in building solutions that scale—not just in performance, but in maintainability and elegance. Every system I design is a reflection of how I think: structured, intentional, and built to endure. My approach combines technical rigor with creative problem-solving, ensuring that complex challenges transform into elegant, user-centric solutions.
                </p>

                <p className="text-base pt-4 border-t border-secondary/30">
                  Beyond code, I explore the world through photography and design, bringing the same architectural mindset to every medium. I&apos;m driven by the challenge of creating systems and experiences that feel effortless to use, yet sophisticated in their foundation.
                </p>
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