'use client'

import { useState } from 'react'
import {
  Code2,
  Camera,
  Palette,
  BarChart3,
  ExternalLink,
  Aperture,
  Layers,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface BentoCardProps {
  title: string
  description: string
  icon: React.ElementType
  className?: string
  children?: React.ReactNode
  metadata?: React.ReactNode
}

function BentoCard({
  title,
  description,
  icon: Icon,
  className,
  children,
  metadata,
}: BentoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        'group relative glass rounded-2xl overflow-hidden',
        'transition-all duration-500',
        'hover:shadow-xl hover:shadow-accent/5',
        'hover:border-accent/20',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Content */}
      <div className="relative h-full p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-secondary/50 text-accent">
            <Icon className="w-6 h-6" />
          </div>
          <ExternalLink
            className={cn(
              'w-5 h-5 text-muted-foreground transition-all duration-300',
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            )}
          />
        </div>

        {/* Title & Description */}
        <div className="flex-1">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Visual Content */}
        <div className="mt-4 flex-1 min-h-0">{children}</div>

        {/* Hover Metadata */}
        <div
          className={cn(
            'absolute inset-0 glass-strong flex items-center justify-center p-6',
            'transition-all duration-300',
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          {metadata}
        </div>
      </div>
    </div>
  )
}

function CodeSnippetVisual() {
  return (
    <div className="h-full flex flex-col gap-2 font-mono text-xs">
      <div className="flex gap-1.5 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
      </div>
      <div className="space-y-1.5 text-muted-foreground/80">
        <div>
          <span className="text-purple-400">const</span>{' '}
          <span className="text-blue-400">Portfolio</span>{' '}
          <span className="text-foreground">=</span> {'() => {'}
        </div>
        <div className="pl-4">
          <span className="text-purple-400">return</span> (
        </div>
        <div className="pl-8">
          <span className="text-accent">{'<Experience'}</span>
        </div>
        <div className="pl-12">
          <span className="text-green-400">skills</span>
          <span className="text-foreground">=</span>
          <span className="text-orange-400">{'"infinite"'}</span>
        </div>
        <div className="pl-12">
          <span className="text-green-400">passion</span>
          <span className="text-foreground">=</span>
          <span className="text-blue-400">{'true'}</span>
        </div>
        <div className="pl-8">
          <span className="text-accent">{'/>'}</span>
        </div>
        <div className="pl-4">)</div>
        <div>{'}'}</div>
      </div>
    </div>
  )
}

function PhotoGalleryVisual() {
  return (
    <div className="h-full grid grid-cols-3 gap-2">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={cn(
            'rounded-lg bg-gradient-to-br',
            i % 3 === 0
              ? 'from-accent/30 to-secondary'
              : i % 3 === 1
              ? 'from-secondary to-accent/20'
              : 'from-accent/20 to-secondary/80',
            i === 0 && 'col-span-2 row-span-2'
          )}
        />
      ))}
    </div>
  )
}

function WireframeVisual() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-[140px] space-y-2">
        {/* Mini wireframe */}
        <div className="h-4 bg-secondary rounded" />
        <div className="flex gap-2">
          <div className="h-8 flex-1 bg-secondary/60 rounded" />
          <div className="h-8 flex-1 bg-accent/30 rounded" />
        </div>
        <div className="h-6 bg-secondary/40 rounded" />
        <div className="flex gap-1">
          <div className="h-3 w-3 bg-accent/50 rounded-full" />
          <div className="h-3 flex-1 bg-secondary/30 rounded" />
        </div>
      </div>
    </div>
  )
}

function ChartVisual() {
  const data = [40, 65, 45, 80, 55, 70, 90]
  const max = Math.max(...data)

  return (
    <div className="h-full flex items-end gap-1 pb-4">
      {data.map((value, i) => (
        <div
          key={i}
          className="flex-1 bg-gradient-to-t from-accent/60 to-accent/20 rounded-t transition-all duration-300 hover:from-accent hover:to-accent/40"
          style={{ height: `${(value / max) * 100}%` }}
        />
      ))}
    </div>
  )
}

export function BentoGrid() {
  return (
    <section id="worlds" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            My <span className="text-accent">Worlds</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A multi-disciplinary approach to creating meaningful digital experiences
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Featured Tech Projects - Large Card */}
          <BentoCard
            title="Featured Tech Projects"
            description="Full-stack applications built with modern technologies"
            icon={Code2}
            className="md:col-span-2 md:row-span-2"
            metadata={
              <div className="text-center space-y-4">
                <div className="flex flex-wrap justify-center gap-2">
                  {['Next.js', 'React', 'TypeScript', 'Node.js', 'Django', 'PostgreSQL'].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
                <p className="text-muted-foreground text-sm">12+ Production Projects</p>
              </div>
            }
          >
            <CodeSnippetVisual />
          </BentoCard>

          {/* Photography Gallery - Medium Card */}
          <BentoCard
            title="Photography"
            description="Capturing moments through a creative lens"
            icon={Camera}
            className="md:row-span-2"
            metadata={
              <div className="text-center space-y-3">
                <Aperture className="w-10 h-10 text-accent mx-auto" />
                <div className="space-y-1">
                  <p className="text-foreground font-medium">Canon R100</p>
                  <p className="text-muted-foreground text-sm">RF 50mm f/1.8</p>
                  <p className="text-muted-foreground text-xs">ISO 400 • f/2.8 • 1/250s</p>
                </div>
              </div>
            }
          >
            <PhotoGalleryVisual />
          </BentoCard>

          {/* UI/UX Case Studies - Small Card */}
          <BentoCard
            title="UI/UX Design"
            description="User-centered design solutions"
            icon={Palette}
            metadata={
              <div className="text-center space-y-3">
                <Layers className="w-10 h-10 text-accent mx-auto" />
                <div className="space-y-1">
                  <p className="text-foreground font-medium">Figma Expert</p>
                  <p className="text-muted-foreground text-sm">8 Case Studies</p>
                </div>
              </div>
            }
          >
            <WireframeVisual />
          </BentoCard>

          {/* SME Data Analytics - Small Card */}
          <BentoCard
            title="Data Analytics"
            description="SME insights & visualizations"
            icon={BarChart3}
            metadata={
              <div className="text-center space-y-3">
                <TrendingUp className="w-10 h-10 text-accent mx-auto" />
                <div className="space-y-1">
                  <p className="text-foreground font-medium">Growth Analytics</p>
                  <p className="text-muted-foreground text-sm">+45% Avg. Improvement</p>
                </div>
              </div>
            }
          >
            <ChartVisual />
          </BentoCard>
        </div>
      </div>
    </section>
  )
}
