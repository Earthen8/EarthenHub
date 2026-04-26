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
  proficiency?: number
}

const gearData: GearItem[] = [
  // Tech Stack
  {
    name: 'Next.js',
    category: 'tech',
    icon: Code2,
    description: 'React framework for production',
    proficiency: 95,
  },
  {
    name: 'Django',
    category: 'tech',
    icon: Server,
    description: 'Python web framework',
    proficiency: 90,
  },
  {
    name: 'Docker',
    category: 'tech',
    icon: Container,
    description: 'Containerization platform',
    proficiency: 85,
  },
  {
    name: 'PostgreSQL',
    category: 'tech',
    icon: Database,
    description: 'Relational database',
    proficiency: 88,
  },
  {
    name: 'TypeScript',
    category: 'tech',
    icon: Code2,
    description: 'Type-safe JavaScript',
    proficiency: 92,
  },
  {
    name: 'React',
    category: 'tech',
    icon: Layers,
    description: 'UI component library',
    proficiency: 95,
  },
  // Creative Tools
  {
    name: 'Figma',
    category: 'creative',
    icon: Figma,
    description: 'Design & prototyping',
    proficiency: 90,
  },
  {
    name: 'Adobe Suite',
    category: 'creative',
    icon: Palette,
    description: 'Photo & video editing',
    proficiency: 85,
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

  return (
    <div
      className={cn(
        'group glass rounded-2xl p-6 transition-all duration-300',
        'hover:shadow-lg hover:shadow-accent/5 hover:border-accent/20'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'p-3 rounded-xl transition-all duration-300',
            isHovered ? 'bg-accent text-accent-foreground' : 'bg-secondary/50 text-accent'
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">{item.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>

          {/* Proficiency Bar */}
          {item.proficiency && (
            <div className="mt-3">
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-700 ease-out"
                  style={{
                    width: isHovered ? `${item.proficiency}%` : '0%',
                  }}
                />
              </div>
              <span
                className={cn(
                  'text-xs text-accent mt-1 block transition-opacity duration-300',
                  isHovered ? 'opacity-100' : 'opacity-0'
                )}
              >
                {item.proficiency}% proficiency
              </span>
            </div>
          )}
        </div>
      </div>
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
    <section id="gear" className="py-20 lg:py-32 relative">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGear.map((item) => (
            <GearCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
