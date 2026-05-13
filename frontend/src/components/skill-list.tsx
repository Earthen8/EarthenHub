'use client'

import { useState } from 'react'
import { Camera, Palette, BarChart3, Code2, Aperture, Layers, Blocks, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FeaturedProjects } from './featured-projects'

/* ─── Types ──────────────────────────────────────────────────── */

interface Skill {
  id: string
  index: string
  label: string
  icon: React.ElementType
  description: string
  stack: string[]
  accentColor: string
}

/* ─── Data ───────────────────────────────────────────────────── */

const skills: Skill[] = [
  {
    id: 'engineering',
    index: '01',
    label: 'Full-Stack Development',
    icon: Code2,
    description:
      'Building resilient and scalable web and mobile applications with a focus on optimized backend performance and clean API integration.',
    stack: ['Flutter', 'Dart', 'Django', 'REST Framework', 'React', 'Next.js', 'Node.js'],
    accentColor: '#6ee7b7',
  },
  {
    id: 'systems',
    index: '02',
    label: 'Systems Architecture',
    icon: Layers,
    description:
      'Designing structural blueprints for software infrastructure and implementing data pipelines to ensure operational excellence.',
    stack: ['Python', 'PostgreSQL', 'API Integration', 'Docker', 'Ubuntu Linux'],
    accentColor: '#fef08a',
  },
  {
    id: 'modelling',
    index: '03',
    label: '3D Environmental Modeling',
    icon: Blocks,
    description:
      'Creating immersive virtual environments and digital twins that bridge physical constraints with digital capabilities.',
    stack: ['Roblox Studio', '3D Modeling', 'Spatial Design', 'Virtual Environments'],
    accentColor: '#ff7300ff',
  },
  {
    id: 'photography',
    index: '04',
    label: 'Photography',
    icon: Camera,
    description:
      'Documenting light, people, and quiet moments. Shooting primarily with Canon R100 + RF 18-45mm — 2000+ frames and counting.',
    stack: ['Canon R100', 'Lightroom', 'Astrophotography', 'Portrait', 'Architecture'],
    accentColor: '#38bdf8',
  },
  {
    id: 'mentorship',
    index: '05',
    label: 'Technical Mentorship',
    icon: Users,
    description:
      'Guiding organizational leadership, managing project documentation, and mentoring peers in software engineering practices.',
    stack: ['Project Management', 'Agile Development', 'Technical Documentation', 'Leadership'],
    accentColor: '#c084fc',
  },
]

/* ─── Skill Row ──────────────────────────────────────────────── */

function SkillRow({ skill, isActive, onEnter, onLeave, onClick }: {
  skill: Skill
  isActive: boolean
  onEnter: () => void
  onLeave: () => void
  onClick: () => void
}) {
  const Icon = skill.icon

  return (
    <div
      className={cn(
        'group relative border-t border-white/[0.07] cursor-pointer select-none',
        'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isActive ? 'py-8 sm:py-10' : 'py-5 sm:py-6',
      )}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onEnter()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && onLeave()}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onClick}
      tabIndex={0}
      role="listitem"
      aria-expanded={isActive}
    >
      {/* Accent bar — slides in from left on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background: skill.accentColor,
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
        }}
      />

      {/* Main row */}
      <div className="flex items-center gap-4 sm:gap-6 pl-6 pr-2 sm:pl-8">

        {/* Index */}
        <span
          className="font-mono text-[11px] tracking-widest transition-colors duration-300 shrink-0 w-6"
          style={{ color: isActive ? skill.accentColor : 'rgba(255,255,255,0.2)' }}
        >
          {skill.index}
        </span>

        {/* Label */}
        <h3
          className={cn(
            'font-serif tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex-1',
            'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-none',
            isActive ? 'text-white' : 'text-white/30 group-hover:text-white/50',
          )}
        >
          {skill.label}
        </h3>

        {/* Icon — visible on hover */}
        <div
          className="shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateX(0) rotate(0deg)' : 'translateX(12px) rotate(-15deg)',
          }}
        >
          <Icon
            className="w-6 h-6 sm:w-7 sm:h-7"
            style={{ color: skill.accentColor }}
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Expanded content */}
      <div
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pl-6 sm:pl-8"
        style={{
          maxHeight: isActive ? '200px' : '0px',
          opacity: isActive ? 1 : 0,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-12 mt-5 ml-10 sm:ml-14 pr-4">

          {/* Description */}
          <p
            className="text-sm sm:text-base text-white/50 leading-relaxed max-w-md font-light"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {skill.description}
          </p>

          {/* Stack pills */}
          <div className="flex flex-wrap gap-1.5 sm:justify-end shrink-0">
            {skill.stack.map((tech, i) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wide border transition-all duration-300"
                style={{
                  borderColor: `${skill.accentColor}30`,
                  color: skill.accentColor,
                  background: `${skill.accentColor}08`,
                  transitionDelay: isActive ? `${i * 40}ms` : '0ms',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── SkillList ─────────────────────────────── */

export function SkillList() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <section id="worlds" className="py-16 lg:py-28">
      {/* Ambient glow behind the list — follows active skill color */}
      <div
        className="pointer-events-none fixed inset-0 transition-opacity duration-700"
        style={{ opacity: activeId ? 0.04 : 0 }}
        aria-hidden
      >
        <div
          className="absolute inset-0 blur-[120px]"
          style={{
            background: skills.find(s => s.id === activeId)?.accentColor ?? 'transparent',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ─────────────────────────────────────── */}
        <div className="mb-12 sm:mb-16">
          <p className="font-mono text-[11px] tracking-[0.25em] text-white/30 uppercase mb-4">
            Disciplines
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            My{' '}
            <span
              className="transition-colors duration-500"
              style={{ color: skills.find(s => s.id === activeId)?.accentColor ?? 'rgba(255,255,255,0.4)' }}
            >
              Worlds
            </span>
          </h2>
          <p className="text-white/30 text-sm mt-3 font-light max-w-sm">
            Hover to explore each discipline
          </p>
        </div>

        {/* ── Featured Projects ───────────────────────────────────── */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-baseline gap-3 mb-5">
            <p className="font-mono text-[11px] tracking-[0.25em] text-white/30 uppercase">
              Case studies
            </p>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <FeaturedProjects />
        </div>

        {/* ── Divider ────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-10 sm:mb-12">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <p className="font-mono text-[11px] tracking-[0.25em] text-white/20 uppercase shrink-0">
            Skills
          </p>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* ── Skill list ─────────────────────────────────────────── */}
        <div role="list" className="border-b border-white/[0.07]">
          {skills.map(skill => (
            <SkillRow
              key={skill.id}
              skill={skill}
              isActive={activeId === skill.id}
              onEnter={() => setActiveId(skill.id)}
              onLeave={() => setActiveId(null)}
              onClick={() => setActiveId(activeId === skill.id ? null : skill.id)}
            />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-[11px] font-mono text-white/15 tracking-widest uppercase">
          {skills.length} disciplines
        </p>

      </div>
    </section>
  )
}