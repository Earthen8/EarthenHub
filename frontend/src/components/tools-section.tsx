'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Code2,
  Server,
  Container,
  Database,
  Camera,
  Cpu,
  Layers,
  Figma,
  Laptop,
  Github,
  Smartphone,
  Terminal,
  Sparkles,
  Atom,
  HardDrive,
  Network,
  Gamepad2,
  Box,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ToolItem {
  name: string
  category: 'dev' | 'infra' | 'design' | 'hardware'
  icon: React.ElementType
  description: string
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced'
  specifications?: string
}

// Data comes from API
import { getIcon } from '@/lib/icon-map'

const categories = [
  { key: 'all', label: 'All Tools' },
  { key: 'dev', label: 'Development' },
  { key: 'infra', label: 'Infrastructure' },
  { key: 'design', label: 'Design' },
  { key: 'hardware', label: 'Hardware' },
]

// Mobile (1 col): 3 × 160 + 2 × 12 = 504px
// Tablet (2 col): 3 × 160 + 2 × 12 = 504px
// Desktop (3 col): 3 × 160 + 2 × 12 = 504px
const COLLAPSED_HEIGHT = 504

// Thresholds
// Mobile  = 1 col → >3 items
// Tablet  = 2 col → >6 items
// Desktop = 3 col → >9 items

function useBreakpointThreshold() {
  const [threshold, setThreshold] = useState(9)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setThreshold(3)
      else if (w < 1024) setThreshold(6)
      else setThreshold(9)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return threshold
}

function ToolCard({ item }: { item: ToolItem }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = getIcon(item.icon as unknown as string)

  const getProficiencyColor = (level?: string) => {
    switch (level) {
      case 'Advanced':
        return 'bg-accent/20 text-accent border border-accent/30'
      case 'Intermediate':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
      case 'Beginner':
        return 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
      default:
        return ''
    }
  }

  return (
    <div
      className={cn(
        'group relative glass rounded-xl p-5 transition-all duration-300',
        'hover:shadow-xl hover:shadow-accent/10 hover:border-accent/40',
        'border border-secondary/50'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className={cn(
              'p-2.5 rounded-lg transition-all duration-300 flex-shrink-0',
              isHovered
                ? 'bg-accent/20 text-accent scale-110'
                : 'bg-secondary/40 text-accent'
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
          {item.proficiency && (
            <span
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-300 whitespace-nowrap',
                getProficiencyColor(item.proficiency)
              )}
            >
              {item.proficiency}
            </span>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-sm leading-tight">{item.name}</h3>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            {item.description}
            {item.specifications && <span className="block mt-1 opacity-70">{item.specifications}</span>}
          </p>
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transition-all duration-300',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  )
}

export function ToolsSection({ tools }: { tools: ToolItem[] }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isExpanded, setIsExpanded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const threshold = useBreakpointThreshold()
  
  const toolsData = tools || []

  const filteredTools =
    activeCategory === 'all'
      ? toolsData
      : toolsData.filter((item) => item.category === activeCategory)

  // Show toggle on "All Tools" tab when items exceed threshold
  const showToggle = activeCategory === 'all' && filteredTools.length > threshold

  // Reset expansion when switching categories
  const handleCategoryChange = (key: string) => {
    setActiveCategory(key)
    setIsExpanded(false)
  }

  const handleToggle = () => {
    if (isExpanded) {
      // Collapsing: scroll back to section header smoothly
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Small delay so scroll starts before height animates
      setTimeout(() => setIsExpanded(false), 80)
    } else {
      setIsExpanded(true)
    }
  }

  return (
    <section ref={sectionRef} id="tools" className="py-16 lg:py-28 relative">
      {/* Background Accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Cpu className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">{"What's in my bag"}</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Tools & <span className="text-accent">Gear</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The technologies and equipment I use to bring ideas to life
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                activeCategory === cat.key
                  ? 'bg-accent text-accent-foreground'
                  : 'glass text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tools Grid Wrapper */}
        <div
          className="relative transition-[max-height] duration-700 ease-in-out overflow-hidden"
          style={{
            maxHeight: showToggle && !isExpanded ? `${COLLAPSED_HEIGHT}px` : '4000px',
          }}
        >
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTools.map((item) => (
              <ToolCard key={item.name} item={item} />
            ))}
          </div>

          {/* Gradient fade mask */}
          {showToggle && !isExpanded && (
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, var(--background) 0%, color-mix(in srgb, var(--background) 85%, transparent) 40%, transparent 100%)',
              }}
            />
          )}
        </div>

        {/* Toggle Button */}
        {showToggle && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleToggle}
              className={cn(
                'group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium',
                'glass border border-secondary/50 text-muted-foreground',
                'hover:text-foreground hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10',
                'transition-all duration-300'
              )}
            >
              {/* Subtle animated accent ring on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    'radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 70%)',
                }}
              />
              <span className="relative flex items-center gap-2">
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    Show Less
                  </>
                ) : (
                  <>
                    Show All{' '}
                    <span className="text-accent font-semibold">{filteredTools.length}</span> Tools
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </>
                )}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}