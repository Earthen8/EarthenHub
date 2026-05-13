'use client'

import { useState } from 'react'
import {
  Code2,
  Server,
  Container,
  Database,
  Palette,
  Camera,
  Monitor,
  Headphones,
  Cpu,
  Layers,
  Figma,
  Laptop,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface GearItem {
  name: string
  category: 'tech' | 'creative' | 'hardware'
  icon: React.ElementType
  description: string
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced'
}

const gearData: GearItem[] = [
  // Tech Stack
  {
    name: 'Next.js',
    category: 'tech',
    icon: Code2,
    description: 'React framework for production',
    proficiency: 'Advanced',
  },
  {
    name: 'Django',
    category: 'tech',
    icon: Server,
    description: 'Python web framework',
    proficiency: 'Advanced',
  },
  {
    name: 'Docker',
    category: 'tech',
    icon: Container,
    description: 'Containerization platform',
    proficiency: 'Intermediate',
  },
  {
    name: 'PostgreSQL',
    category: 'tech',
    icon: Database,
    description: 'Relational database',
    proficiency: 'Advanced',
  },
  {
    name: 'TypeScript',
    category: 'tech',
    icon: Code2,
    description: 'Type-safe JavaScript',
    proficiency: 'Advanced',
  },
  {
    name: 'React',
    category: 'tech',
    icon: Layers,
    description: 'UI component library',
    proficiency: 'Advanced',
  },
  // Creative Tools
  {
    name: 'Figma',
    category: 'creative',
    icon: Figma,
    description: 'Design & prototyping',
    proficiency: 'Advanced',
  },
  {
    name: 'Adobe Suite',
    category: 'creative',
    icon: Palette,
    description: 'Photo & video editing',
    proficiency: 'Intermediate',
  },
  {
    name: 'Canon R100',
    category: 'creative',
    icon: Camera,
    description: 'Mirrorless camera',
  },
  // Hardware
  {
    name: 'MacBook Pro 16"',
    category: 'hardware',
    icon: Laptop,
    description: 'M3 Pro • 36GB RAM',
  },
  {
    name: 'LG UltraFine 5K',
    category: 'hardware',
    icon: Monitor,
    description: '27" display',
  },
  {
    name: 'Sony WH-1000XM5',
    category: 'hardware',
    icon: Headphones,
    description: 'Noise-canceling',
  },
]

const categories = [
  { key: 'all', label: 'All Gear' },
  { key: 'tech', label: 'Tech Stack' },
  { key: 'creative', label: 'Creative' },
  { key: 'hardware', label: 'Hardware' },
]

function GearCard({ item }: { item: GearItem }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = item.icon

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
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{item.description}</p>
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

export function GearSection() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredGear =
    activeCategory === 'all'
      ? gearData
      : gearData.filter((item) => item.category === activeCategory)

  return (
    <section id="gear" className="py-16 lg:py-28 relative">
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
              onClick={() => setActiveCategory(cat.key)}
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

        {/* Gear Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredGear.map((item) => (
            <GearCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
