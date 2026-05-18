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
  link?: string
}

// Data comes from API

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

export function FeaturedProjects({ projects: apiProjects }: { projects?: ProjectDetails[] }) {
  const [active, setActive] = useState<number>(0)
  
  const projectsList = apiProjects && apiProjects.length > 0 ? apiProjects : []
  
  if (projectsList.length === 0) {
    return null; // Don't render if no projects
  }
  const project = projectsList[active]

  return (
    /* Fixed-height panel: no page scroll as project count grows */
    <div className="glass border border-secondary/40 rounded-xl overflow-hidden flex flex-col md:flex-row h-[500px] md:h-[400px]">

        {/* Tab list — vertical on md+, horizontal scroll on mobile */}
        <div className="flex md:flex-col border-b md:border-b-0 md:border-r border-secondary/40 overflow-x-auto md:overflow-x-visible md:overflow-y-auto md:w-52 shrink-0">
          {projectsList.map((p, i) => (
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
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`Visit ${project.title} website`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
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
          <div className="hidden md:flex aspect-square h-full shrink-0 bg-secondary/10 border-l border-secondary/30 overflow-hidden">
            <ProjectImage imageUrl={project.imageUrl} title={project.title} />
          </div>
        </div>
      </div>
  )
}