'use client'

import { useState } from 'react'
import { ArrowUpRight, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectDetails {
  title: string
  tag: string
  problem: string
  solution: string
  techStack: string[]
  outcome: string[]
  /** URL supplied by the backend. Leave undefined until the API is ready. */
  imageUrl?: string
}

const projects: ProjectDetails[] = [
  {
    title: 'E-Commerce Platform',
    tag: 'Full-Stack',
    problem: 'Needed a scalable platform to handle 10K+ daily users with complex product filtering and real-time inventory.',
    solution: 'Built full-stack with Next.js, Django backend, and PostgreSQL. Implemented Redis caching for 60% faster load times.',
    techStack: ['Next.js', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
    outcome: ['99.9% uptime', '300ms avg response', '60% faster loads'],
  },
  {
    title: 'Real-time Analytics',
    tag: 'Data Viz',
    problem: 'Client needed live visualization for 50+ metrics across multiple data sources without overwhelming UX.',
    solution: 'TypeScript + React with WebSockets and time-series database. Smart caching and data aggregation pipeline.',
    techStack: ['React', 'TypeScript', 'WebSockets', 'Node.js', 'InfluxDB'],
    outcome: ['Sub-second updates', '95% faster insights', '50+ metrics'],
  },
  {
    title: 'Microservices Migration',
    tag: 'DevOps',
    problem: 'Legacy monolithic app caused deployment bottlenecks and scaling issues across 20+ engineers.',
    solution: 'Architected microservices with Docker and Kubernetes. Implemented API Gateway, message queues, and monitoring.',
    techStack: ['Docker', 'Kubernetes', 'Node.js', 'PostgreSQL', 'RabbitMQ'],
    outcome: ['70% faster deploys', '5x scalability', '20+ services'],
  },
]

/* ── Project image panel ─────────────────────────────────────────
   Renders the backend-supplied imageUrl when available.
   Falls back to a branded placeholder until the API is wired up.
──────────────────────────────────────────────────────────────── */
function ProjectImage({ imageUrl, title }: { imageUrl?: string; title: string }) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
      />
    )
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 select-none">
      <div className="p-4 rounded-2xl bg-secondary/40 border border-secondary/60">
        <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
      </div>
      <p className="text-xs text-muted-foreground/40 font-medium">Preview coming soon</p>
    </div>
  )
}

export function FeaturedProjects() {
  const [active, setActive] = useState(0)
  const project = projects[active]

  return (
    /* Fixed-height panel: no page scroll as project count grows */
    <div className="glass rounded-2xl border border-secondary/50 overflow-hidden">
      <div className="flex flex-col md:flex-row h-auto md:h-[420px]">

        {/* Tab list — vertical on md+, horizontal scroll on mobile */}
        <div className="flex md:flex-col border-b md:border-b-0 md:border-r border-secondary/40 overflow-x-auto md:overflow-x-visible md:overflow-y-auto md:w-52 shrink-0">
          {projects.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'flex-shrink-0 text-left px-4 py-3.5 transition-all duration-200 relative',
                'md:border-b md:border-secondary/30 last:border-0',
                'hover:bg-secondary/30',
                active === i
                  ? 'bg-secondary/40 text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {/* Active indicator */}
              <span
                className={cn(
                  'absolute md:left-0 md:top-0 md:h-full md:w-0.5 bottom-0 left-0 right-0 h-0.5 md:right-auto',
                  'bg-accent transition-opacity duration-200',
                  active === i ? 'opacity-100' : 'opacity-0'
                )}
              />
              <p className={cn('text-xs font-semibold mb-0.5 whitespace-nowrap', active === i ? 'text-accent' : 'text-muted-foreground/60')}>
                {p.tag}
              </p>
              <p className="text-sm font-medium whitespace-nowrap">{p.title}</p>
            </button>
          ))}
        </div>

        {/* Detail pane */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[340px] md:min-h-0">

          {/* Left: text content — narrowed to give image more room */}
          <div className="flex-1 md:max-w-[55%] p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">{project.tag}</span>
                <h3 className="font-serif text-xl font-bold text-foreground mt-0.5">{project.title}</h3>
              </div>
              <button className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">Challenge</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">Approach</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Outcomes */}
            <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-secondary/30">
              {project.outcome.map((o) => (
                <span key={o} className="px-2.5 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium border border-accent/20">
                  {o}
                </span>
              ))}
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md bg-secondary/50 text-foreground/70 text-xs border border-secondary/40">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: project image — wired to backend via imageUrl */}
          <div className="hidden sm:flex md:w-72 lg:w-80 shrink-0 bg-secondary/10 border-t md:border-t-0 md:border-l border-secondary/30 overflow-hidden">
            <ProjectImage imageUrl={project.imageUrl} title={project.title} />
          </div>
        </div>
      </div>
    </div>
  )
}