'use client'

import { useEffect, useRef, useState } from 'react'
import { GraduationCap, Briefcase, Award, Rocket, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineItem {
  year: string
  title: string
  organization: string
  description: string
  type: 'education' | 'work' | 'achievement' | 'project'
}

const timelineData: TimelineItem[] = [
  // year, title, organization, description, type
  // work, achievement, project, education

  {
    year: 'Present',
    title: 'Undergraduate Software Engineering Student',
    organization: 'Universitas Prasetiya Mulya',
    description: 'Studying software engineering with a focus on systems architecture and full-stack development.',
    type: 'education',
  },
  {
    year: 'May 2026',
    title: 'Full Stack Developer',
    organization: 'SwiftTrip',
    description: 'Developing an AI-powered travel-tech application, leading the development from UI design to deployment.',
    type: 'project',
  },
  {
    year: 'Apr 2026',
    title: 'Head of Secretariat',
    organization: 'SISO Prasmul',
    description: 'Detail-oriented leadership position essential for maintaining the organization\'s structural integrity and operational efficiency.',
    type: 'work',
  },
  {
    year: 'Oct 2025',
    title: 'Roblox 3D Modeler',
    organization: 'Prasetiya Mulya Virtual Campus',
    description: 'Developed a digital twin virtual campus environment that accumulated over 1,200 visits.',
    type: 'project',
  },
  {
    year: 'Sep 2025',
    title: 'Certified Associate',
    organization: 'Oracle Cloud',
    description: 'Earned the Oracle Cloud AI Foundations Associate 2025 certification.',
    type: 'education',
  },
  {
    year: 'Aug 2025',
    title: 'Documentation Coordinator',
    organization: 'ICN 2026',
    description: 'Architecting the end-to-end documentation strategy for ICN 2026, ensuring all institutional knowledge, media assets, and project milestones are captured and categorized.',
    type: 'work',
  },
  {
    year: 'Jul 2025',
    title: 'Secretary',
    organization: 'P3rspective 2025/2026',
    description: 'Directing the administrative framework for P3rspective 2025/2026, ensuring seamless coordination between the Executive Board (BPH) and various divisions.',
    type: 'work',
  },
  {
    year: 'Jun 2025',
    title: '6th Place Global Finalist',
    organization: 'HackFest 2025 UI/UX International Competition',
    description: 'Designed and presented CarbonMate, an AI-powered carbon tracking application.',
    type: 'achievement',
  },
  {
    year: 'May 2025',
    title: 'Owner & Operator',
    organization: 'TemanRasa',
    description: 'Successfully scaled a highly rated e-commerce store to generate over 35 million IDR in revenue by leveraging data-driven market analysis, optimizing inventory, and maintaining exceptional operational efficiency and customer service standards.',
    type: 'work',
  },
  {
    year: 'Apr 2025',
    title: 'UI/UX Designer',
    organization: 'Universitas Prasetiya Mulya',
    description: 'Designed the user interface and experience for Wastella, a gamified eco-conscious mobile app using Figma.',
    type: 'project',
  },
  {
    year: 'Aug 2024',
    title: 'Lead Documentation Specialist',
    organization: 'SISO Prasmul',
    description: 'Managed end-to-end documentation workflows for five major institutional events, ensuring 100% capture of key milestones and media assets.',
    type: 'work',
  },
]

/** Number of items visible before "See More" is shown */
const INITIAL_VISIBLE_COUNT = 5

const iconMap = {
  education: GraduationCap,
  work: Briefcase,
  achievement: Award,
  project: Rocket,
}

/** Subtle type-badge label map for accessibility and visual clarity */
const typeLabelMap: Record<TimelineItem['type'], string> = {
  education: 'Education',
  work: 'Work',
  achievement: 'Achievement',
  project: 'Project',
}

/** Tailwind color classes per type — kept in a lookup so they're statically
 *  analysable by the Tailwind compiler (no dynamic string construction). */
const typeBadgeClasses: Record<TimelineItem['type'], string> = {
  education: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  work: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  achievement: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  project: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
}

const typeIconBgClasses: Record<TimelineItem['type'], string> = {
  education: 'border-blue-400/40 bg-blue-500/10 text-blue-400',
  work: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-400',
  achievement: 'border-amber-400/40 bg-amber-500/10 text-amber-400',
  project: 'border-violet-400/40 bg-violet-500/10 text-violet-400',
}

// ---------------------------------------------------------------------------
// TimelineCard — shared card content, extracted to avoid duplication
// ---------------------------------------------------------------------------
function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    /*
     * The outer <div> carries the glassmorphism surface.
     * backdrop-blur and bg-white/5 require the parent stack to have
     * a non-transparent background (provided by the page body).
     */
    <div
      className={cn(
        'group relative p-5 sm:p-6 rounded-2xl text-left',
        'bg-white/[0.04] backdrop-blur-md',
        'border border-white/10',
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]',
        'hover:bg-white/[0.07] hover:border-white/20',
        'hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_32px_rgba(0,0,0,0.2)]',
        'transition-all duration-300 ease-out',
        'cursor-default'
      )}
    >
      {/* Top row: year + type badge */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className="text-accent text-xs font-semibold tracking-wide uppercase">
          {item.year}
        </span>
        <span
          className={cn(
            'text-[10px] font-medium px-2 py-0.5 rounded-full border',
            typeBadgeClasses[item.type]
          )}
          aria-label={`Type: ${typeLabelMap[item.type]}`}
        >
          {typeLabelMap[item.type]}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground leading-snug">
        {item.title}
      </h3>

      {/* Organization */}
      <p className="text-muted-foreground text-sm mt-1 font-medium">
        {item.organization}
      </p>

      {/* Description */}
      <p className="text-muted-foreground/70 text-sm mt-3 leading-relaxed">
        {item.description}
      </p>

      {/* Subtle decorative corner accent */}
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 w-16 h-16 rounded-2xl pointer-events-none overflow-hidden"
      >
        <span className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 rounded-tr-2xl" />
      </span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// TimelineItem — handles layout (desktop alternating / mobile single-column)
// ---------------------------------------------------------------------------
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
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* ── Desktop Layout ────────────────────────────────────────────── */}
      <div className="hidden md:flex items-center w-full">

        {/* Left slot */}
        <div className={cn('flex-1', isEven ? 'text-right pr-10' : 'order-3 text-left pl-10')}>
          {isEven && (
            <div className="inline-block max-w-md w-full">
              <TimelineCard item={item} />
            </div>
          )}
        </div>

        {/* Centre node */}
        <div className="relative flex items-center justify-center z-10 order-2 flex-shrink-0">
          {/* Pulse ring on hover */}
          <div
            aria-hidden="true"
            className={cn(
              'absolute w-14 h-14 rounded-full',
              'border border-accent/20',
              'scale-100 group-hover:scale-110 transition-transform duration-500'
            )}
          />
          <div
            className={cn(
              'w-11 h-11 rounded-full flex items-center justify-center',
              'backdrop-blur-md',
              'border-2',
              typeIconBgClasses[item.type],
              'shadow-[0_0_0_4px_rgba(255,255,255,0.04)]',
              'transition-all duration-300 hover:scale-110'
            )}
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
          </div>
        </div>

        {/* Right slot */}
        <div className={cn('flex-1', !isEven ? 'text-left pl-10' : 'order-1 text-right pr-10')}>
          {!isEven && (
            <div className="inline-block max-w-md w-full">
              <TimelineCard item={item} />
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Layout ─────────────────────────────────────────────── */}
      <div className="md:hidden flex items-start gap-4 w-full">
        {/* Icon node */}
        <div className="relative flex flex-col items-center flex-shrink-0 mt-1">
          <div
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center',
              'backdrop-blur-md border-2',
              typeIconBgClasses[item.type]
            )}
          >
            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
        </div>

        {/* Card */}
        <div className="flex-1 min-w-0">
          <TimelineCard item={item} />
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// TimelineSection — main export, unchanged public API + new expand mechanism
// ---------------------------------------------------------------------------
export function TimelineSection() {
  const totalItems = timelineData.length
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(totalItems).fill(false)
  )
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCollapsingDone, setIsCollapsingDone] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLDivElement>(null)

  /** Items to render — always render all so exit animations work,
   *  but clip visibility with CSS for items beyond the fold. */
  const visibleCount = isExpanded ? totalItems : INITIAL_VISIBLE_COUNT
  const hasMore = totalItems > INITIAL_VISIBLE_COUNT

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate items sequentially — original core logic preserved
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

  function handleToggle() {
    if (isExpanded) {
      // Collapse: scroll back toward the top of the section
      setIsExpanded(false)
      setIsCollapsingDone(false)
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setIsCollapsingDone(true)
      }, 400)
    } else {
      setIsExpanded(true)
    }
  }

  return (
    <section
      id="timeline"
      className="py-20 lg:py-32 relative"
      ref={sectionRef}
      aria-label="Journey timeline"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            My <span className="text-accent">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of growth, learning, and meaningful milestones
          </p>

          {/* Legend */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
            role="list"
            aria-label="Timeline legend"
          >
            {(Object.entries(typeLabelMap) as [TimelineItem['type'], string][]).map(
              ([type, label]) => {
                const Icon = iconMap[type]
                return (
                  <div
                    key={type}
                    role="listitem"
                    className={cn(
                      'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5',
                      'rounded-full border',
                      typeBadgeClasses[type]
                    )}
                  >
                    <Icon className="w-3 h-3" aria-hidden="true" />
                    {label}
                  </div>
                )
              }
            )}
          </div>
        </div>

        {/* ── Timeline ──────────────────────────────────────────────── */}
        <div className="relative">
          {/* Vertical guide line — Desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent"
          />

          {/* Vertical guide line — Mobile */}
          <div
            aria-hidden="true"
            className="md:hidden absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent"
          />

          {/* Items container with overflow clipping when collapsed */}
          <div
            className={cn(
              'relative overflow-hidden transition-all duration-500 ease-in-out'
            )}
          >
            {/* Fade-out gradient mask at the bottom when collapsed */}
            {!isExpanded && hasMore && (
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10"
              />
            )}

            <div className="space-y-10 sm:space-y-12">
              {timelineData.map((item, index) => {
                const isBeyondFold = index >= visibleCount
                return (
                  <div
                    key={`${item.year}-${item.title}`}
                    className={cn(
                      'transition-all duration-500 ease-in-out',
                      isBeyondFold
                        ? 'opacity-0 max-h-0 overflow-hidden pointer-events-none'
                        : 'opacity-100 max-h-[800px]'
                    )}
                    aria-hidden={isBeyondFold}
                  >
                    <TimelineItem
                      item={item}
                      index={index}
                      isVisible={visibleItems[index]}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── See More / See Less Toggle ─────────────────────────── */}
          {hasMore && (
            <div
              ref={toggleRef}
              className={cn(
                'relative flex flex-col items-center gap-3 mt-8',
                !isExpanded && '-mt-4'
              )}
            >
              <button
                onClick={handleToggle}
                aria-expanded={isExpanded}
                aria-controls="timeline-items"
                className={cn(
                  'group relative flex items-center gap-2 px-6 py-3',
                  'text-sm font-medium text-foreground/80',
                  'bg-white/[0.05] backdrop-blur-md',
                  'border border-white/10 rounded-full',
                  'hover:bg-white/[0.09] hover:border-white/20 hover:text-foreground',
                  'active:scale-95',
                  'transition-all duration-200 ease-out',
                  'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60'
                )}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp
                      className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                      aria-hidden="true"
                    />
                    {`See ${totalItems - INITIAL_VISIBLE_COUNT} More Experiences`}
                  </>
                )}
              </button>

              {/* Remaining count indicator when collapsed */}
              {!isExpanded && (
                <p className="text-xs text-muted-foreground/50">
                  {totalItems - INITIAL_VISIBLE_COUNT} more entries hidden
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}