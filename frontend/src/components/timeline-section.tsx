'use client'

import { useEffect, useRef, useState } from 'react'
import { GraduationCap, Briefcase, Award, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineItem {
  year: string
  title: string
  organization: string
  description: string
  type: 'education' | 'work' | 'achievement' | 'project'
}

const timelineData: TimelineItem[] = [
  {
    year: '2024',
    title: 'Lead Full Stack Developer',
    organization: 'Tech Innovation Labs',
    description: 'Leading a team of 5 developers, architecting scalable solutions, and driving product development.',
    type: 'work',
  },
  {
    year: '2023',
    title: 'Best Portfolio Award',
    organization: 'Design Excellence Awards',
    description: 'Recognized for outstanding UI/UX design and creative photography integration.',
    type: 'achievement',
  },
  {
    year: '2022',
    title: 'Senior Developer',
    organization: 'Digital Agency Co.',
    description: 'Developed 15+ client projects using React, Next.js, and Django.',
    type: 'work',
  },
  {
    year: '2021',
    title: 'Freelance Launch',
    organization: 'Self-Employed',
    description: 'Started freelance career combining development, design, and photography services.',
    type: 'project',
  },
  {
    year: '2020',
    title: 'Computer Science Degree',
    organization: 'University of Technology',
    description: 'Bachelor&apos;s degree with focus on Software Engineering and Human-Computer Interaction.',
    type: 'education',
  },
  {
    year: '2019',
    title: 'First Internship',
    organization: 'StartUp Studio',
    description: 'Gained hands-on experience in agile development and product design.',
    type: 'work',
  },
]

const iconMap = {
  education: GraduationCap,
  work: Briefcase,
  achievement: Award,
  project: Rocket,
}

function TimelineItem({
  item,
  index,
  isVisible,
}: {
  item: TimelineItem
  index: number
  isVisible: boolean
}) {
  const Icon = iconMap[item.type]
  const isEven = index % 2 === 0

  return (
    <div
      className={cn(
        'relative flex items-center gap-8',
        'transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center w-full">
        {/* Left Content */}
        <div className={cn('flex-1', isEven ? 'text-right pr-8' : 'order-3 text-left pl-8')}>
          {isEven && (
            <div className="glass p-6 rounded-2xl inline-block max-w-md text-left hover:border-accent/30 transition-colors">
              <span className="text-accent text-sm font-medium">{item.year}</span>
              <h3 className="font-serif text-xl font-semibold text-foreground mt-1">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-1">{item.organization}</p>
              <p className="text-muted-foreground/80 text-sm mt-3 leading-relaxed">
                {item.description}
              </p>
            </div>
          )}
        </div>

        {/* Center Line & Dot */}
        <div className="relative flex items-center justify-center z-10 order-2">
          <div className="w-12 h-12 rounded-full glass flex items-center justify-center border-2 border-accent/30 hover:border-accent transition-colors">
            <Icon className="w-5 h-5 text-accent" />
          </div>
        </div>

        {/* Right Content */}
        <div className={cn('flex-1', !isEven ? 'text-left pl-8' : 'order-1 text-right pr-8')}>
          {!isEven && (
            <div className="glass p-6 rounded-2xl inline-block max-w-md text-left hover:border-accent/30 transition-colors">
              <span className="text-accent text-sm font-medium">{item.year}</span>
              <h3 className="font-serif text-xl font-semibold text-foreground mt-1">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-1">{item.organization}</p>
              <p className="text-muted-foreground/80 text-sm mt-3 leading-relaxed">
                {item.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex items-start gap-4 w-full">
        <div className="relative flex flex-col items-center">
          <div className="w-10 h-10 rounded-full glass flex items-center justify-center border-2 border-accent/30">
            <Icon className="w-4 h-4 text-accent" />
          </div>
        </div>
        <div className="flex-1 glass p-5 rounded-2xl hover:border-accent/30 transition-colors">
          <span className="text-accent text-sm font-medium">{item.year}</span>
          <h3 className="font-serif text-lg font-semibold text-foreground mt-1">
            {item.title}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">{item.organization}</p>
          <p className="text-muted-foreground/80 text-sm mt-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function TimelineSection() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(timelineData.length).fill(false)
  )
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate items sequentially
            timelineData.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="timeline" className="py-20 lg:py-32 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            My <span className="text-accent">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of growth, learning, and meaningful milestones
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

          {/* Vertical Line - Mobile */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={`${item.year}-${item.title}`}
                item={item}
                index={index}
                isVisible={visibleItems[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
