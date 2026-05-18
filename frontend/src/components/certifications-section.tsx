'use client'

/**
 * CertificationsSection
 *
 * Backend integration guide:
 * ---------------------------
 * Replace the `CERTIFICATIONS` array below with data fetched from your API.
 * Each certification object follows the `Certification` type.
 *
 * Fields:
 *   id            — unique string key
 *   title         — certification name
 *   issuer        — issuing organization
 *   date          — human-readable issue date
 *   category      — 'professional' | 'technology' | 'design'
 *   credentialId  — (optional) credential ID string shown on hover
 *   credentialUrl — (optional) external verification URL
 *   imageUrl      — (optional) issuer logo or badge image
 *                   If omitted, the emoji `icon` field is used as fallback.
 *   icon          — emoji fallback when imageUrl is absent
 *
 * Example API swap (Next.js server component pattern):
 *   const certifications = await fetch('/api/certifications').then(r => r.json())
 *   Pass the result as a prop: <CertificationsSection certifications={certifications} />
 */

import { useEffect, useRef, useState } from 'react'
import { Award, ExternalLink, ShieldCheck } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type CertCategory = 'professional' | 'technology' | 'design'

export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  category: CertCategory
  credentialId?: string
  credentialUrl?: string
  /** URL to an issuer logo or badge image. Falls back to `icon` if absent. */
  imageUrl?: string
  /** Emoji fallback when imageUrl is not provided. */
  icon: string
}

// ─── Static data (replace with API data when backend is ready) ────────────────

const CERTIFICATIONS: Certification[] = [
  {
    id: 'aws-solutions-architect',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'Issued Mar 2024',
    category: 'professional',
    credentialId: 'AWS-SA-20240315',
    credentialUrl: 'https://aws.amazon.com/certification',
    icon: '☁️',
  },
  {
    id: 'google-cloud-architect',
    title: 'Google Cloud Architect',
    issuer: 'Google Cloud',
    date: 'Issued Feb 2024',
    category: 'professional',
    credentialId: 'GCA-20240210',
    credentialUrl: 'https://cloud.google.com/certification',
    icon: '🔵',
  },
  {
    id: 'ux-design-cert',
    title: 'Advanced UX/UI Design',
    issuer: 'Interaction Design Foundation',
    date: 'Issued Jan 2024',
    category: 'design',
    credentialId: 'IDF-UX-2024',
    credentialUrl: 'https://www.interaction-design.org',
    icon: '🎨',
  },
  {
    id: 'typescript-advanced',
    title: 'TypeScript Advanced Patterns',
    issuer: 'Total TypeScript',
    date: 'Issued Dec 2023',
    category: 'technology',
    credentialId: 'TT-2023-1215',
    credentialUrl: 'https://totaltypescript.com',
    icon: '📘',
  },
  {
    id: 'react-patterns',
    title: 'React Design Patterns Mastery',
    issuer: 'egghead.io',
    date: 'Issued Nov 2023',
    category: 'technology',
    credentialId: 'EGG-REACT-2023',
    credentialUrl: 'https://egghead.io',
    icon: '⚛️',
  },
  {
    id: 'system-design',
    title: 'System Design for Scale',
    issuer: 'ByteByteGo',
    date: 'Issued Oct 2023',
    category: 'professional',
    credentialId: 'BBG-SYS-2023',
    credentialUrl: 'https://bytebytego.com',
    icon: '🏗️',
  },
]

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORY_STYLES: Record<CertCategory, { label: string; className: string }> = {
  professional: {
    label: 'Professional',
    className: 'cert-badge cert-badge--professional',
  },
  design: {
    label: 'Design',
    className: 'cert-badge cert-badge--design',
  },
  technology: {
    label: 'Technology',
    className: 'cert-badge cert-badge--technology',
  },
}

// ─── Parallax depth per card index (subtle, not distracting) ─────────────────
//   Cards alternate between 3 depth layers. Adjust multipliers to taste.
const DEPTH_LAYER = [0.018, 0.012, 0.022, 0.016, 0.024, 0.014]

// ─── CertCard ─────────────────────────────────────────────────────────────────

interface CertCardProps {
  cert: Certification
  index: number
  hoveredId: string | null
  onHover: (id: string | null) => void
  scrollY: number
}

function CertCard({ cert, index, hoveredId, onHover, scrollY }: CertCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger each card reveal based on its index
          const timer = setTimeout(() => setRevealed(true), index * 110)
          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  const isHovered = hoveredId === cert.id
  const isDeemphasized = hoveredId !== null && !isHovered
  const parallaxY = -(scrollY * DEPTH_LAYER[index % DEPTH_LAYER.length])

  const category = CATEGORY_STYLES[cert.category]

  return (
    <div
      ref={cardRef}
      className="cert-card-wrapper"
      style={{
        opacity: revealed ? 1 : 0,
        transform: `translateY(${revealed ? parallaxY : parallaxY + 36}px)`,
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 0.07}s`,
        willChange: 'transform, opacity',
      }}
    >
      <div
        className={[
          'cert-card',
          isHovered ? 'cert-card--hovered' : '',
          isDeemphasized ? 'cert-card--deemphasized' : '',
        ]
          .join(' ')
          .trim()}
        onMouseEnter={() => onHover(cert.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(cert.id)}
        onBlur={() => onHover(null)}
        tabIndex={0}
        role="article"
        aria-label={`${cert.title} by ${cert.issuer}`}
      >
        {/* Sheen layer — animates on hover */}
        <div className="cert-card__sheen" aria-hidden="true" />

        {/* Accent bar at bottom */}
        <div className="cert-card__accent-bar" aria-hidden="true" />

        {/* Top row: icon + badge */}
        <div className="cert-card__top">
          <div className={`cert-icon ${isHovered ? 'cert-icon--hovered' : ''}`}>
            {cert.imageUrl ? (
              <img src={cert.imageUrl} alt={`${cert.issuer} logo`} className="cert-icon__img" />
            ) : (
              <span className="cert-icon__emoji" role="img" aria-label={cert.issuer}>
                {cert.icon}
              </span>
            )}
          </div>
          <span className={category.className}>{category.label}</span>
        </div>

        {/* Body: title + issuer + credential id */}
        <div className="cert-card__body">
          <h3 className="cert-card__title">{cert.title}</h3>
          <p className="cert-card__issuer">{cert.issuer}</p>

          {/* Credential ID — slides in on hover */}
          <div
            className="cert-card__credential"
            style={{
              maxHeight: isHovered ? '2rem' : '0',
              opacity: isHovered ? 1 : 0,
              transition: 'max-height 0.3s ease, opacity 0.3s ease',
            }}
          >
            {cert.credentialId && (
              <span className="cert-card__credential-id">
                <ShieldCheck size={11} aria-hidden="true" />
                {cert.credentialId}
              </span>
            )}
          </div>
        </div>

        {/* Footer: date + verify link */}
        <div className="cert-card__footer">
          <span className="cert-card__date">{cert.date}</span>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`cert-card__verify ${isHovered ? 'cert-card__verify--visible' : ''}`}
              tabIndex={isHovered ? 0 : -1}
              aria-label={`Verify ${cert.title} credential`}
            >
              Verify <ExternalLink size={11} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── CertificationsSection ────────────────────────────────────────────────────

/**
 * Props allow easy backend integration:
 * Pass a `certifications` array fetched from your API to replace static data.
 */
interface CertificationsSectionProps {
  certifications?: Certification[]
}

export function CertificationsSection({
  certifications = CERTIFICATIONS,
}: CertificationsSectionProps) {
  const [sectionVisible, setSectionVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isLocked, setIsLocked] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Reveal section header
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setSectionVisible(true),
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Scroll tracking for parallax + sticky lock
  useEffect(() => {
    let rafId: number
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY)

        if (gridRef.current) {
          const rect = gridRef.current.getBoundingClientRect()
          const viewportMid = window.innerHeight / 2
          // Lock when grid centre is within 220px of viewport centre
          const gridMid = rect.top + rect.height / 2
          setIsLocked(Math.abs(gridMid - viewportMid) < 220 && rect.top > -80)
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* ── Scoped styles ── */}
      <style>{SECTION_STYLES}</style>

      <section ref={sectionRef} className="cert-section" aria-label="Licenses and certifications">
        <div className="cert-section__inner">

          {/* Header */}
          <header
            className="cert-header"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <div className="cert-header__eyebrow">
              <Award size={16} aria-hidden="true" />
              <span>Credentials</span>
            </div>
            <h2 className="cert-header__title">
              Licenses &amp; <em>Certifications</em>
            </h2>
            <p className="cert-header__subtitle">
              Credentials validating expertise across cloud architecture,
              system design, and modern development practices.
            </p>
          </header>

          {/* Grid */}
          <div
            ref={gridRef}
            className={`cert-grid ${isLocked ? 'cert-grid--locked' : ''}`}
            role="list"
          >
            {certifications.map((cert, index) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={index}
                hoveredId={hoveredId}
                onHover={setHoveredId}
                scrollY={scrollY}
              />
            ))}
          </div>

          {/* Bottom divider */}
          <div
            className="cert-section__divider"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
            }}
            aria-hidden="true"
          />
        </div>
      </section>
    </>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
// Kept separate for readability and easy theming.
// Accent colour is sourced from --accent in globals.css.

const SECTION_STYLES = `
  .cert-section {
    padding: 6rem 1rem;
  }

  .cert-section__inner {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* ── Header ── */
  .cert-header {
    margin-bottom: 3.5rem;
  }

  .cert-header__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent-foreground);
    background: var(--accent);
    padding: 0.3rem 0.75rem;
    border-radius: 100px;
    margin-bottom: 1.25rem;
  }

  .cert-header__title {
    font-family: var(--font-serif, Georgia, serif);
    font-size: clamp(2rem, 5vw, 3.25rem);
    font-weight: 700;
    color: var(--foreground);
    line-height: 1.1;
    margin: 0 0 1rem;
  }

  .cert-header__title em {
    font-style: italic;
    color: var(--muted-foreground);
  }

  .cert-header__subtitle {
    font-size: 1rem;
    color: var(--muted-foreground);
    max-width: 36rem;
    line-height: 1.65;
    margin: 0;
  }

  /* ── Grid ── */
  .cert-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    transition: top 0.3s ease;
  }

  .cert-grid--locked {
    position: sticky;
    top: 5rem;
  }

  @media (min-width: 640px) {
    .cert-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .cert-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* ── Card wrapper ── */
  .cert-card-wrapper {
    /* animation state managed via inline style */
  }

  /* ── Card ── */
  .cert-card {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    border: 1px solid var(--border);
    background: var(--card);
    padding: 1.4rem;
    cursor: pointer;
    outline: none;
    transition:
      box-shadow 0.35s ease,
      border-color 0.35s ease,
      opacity 0.35s ease,
      transform 0.35s cubic-bezier(0.22,1,0.36,1);
  }

  .cert-card:focus-visible {
    box-shadow: 0 0 0 3px var(--ring);
  }

  .cert-card--hovered {
    border-color: var(--ring);
    box-shadow:
      0 0 0 1px var(--ring),
      0 12px 40px -8px color-mix(in oklab, var(--foreground) 12%, transparent);
    transform: translateY(-3px);
  }

  .cert-card--deemphasized {
    opacity: 0.38;
  }

  /* Sheen sweep on hover */
  .cert-card__sheen {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 40%,
      color-mix(in oklab, var(--foreground) 4%, transparent) 50%,
      transparent 60%
    );
    transform: translateX(-100%);
    transition: transform 0s;
    pointer-events: none;
  }

  .cert-card--hovered .cert-card__sheen {
    transform: translateX(100%);
    transition: transform 0.55s ease;
  }

  /* Bottom accent line */
  .cert-card__accent-bar {
    position: absolute;
    bottom: 0;
    left: 10%;
    right: 10%;
    height: 2px;
    border-radius: 2px 2px 0 0;
    background: var(--foreground);
    opacity: 0;
    transition: opacity 0.3s ease, left 0.3s ease, right 0.3s ease;
  }

  .cert-card--hovered .cert-card__accent-bar {
    opacity: 0.7;
    left: 20%;
    right: 20%;
  }

  /* ── Top row ── */
  .cert-card__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1.1rem;
  }

  /* Icon */
  .cert-icon {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 0.6rem;
    border: 1px solid var(--border);
    background: var(--secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease;
    flex-shrink: 0;
  }

  .cert-icon--hovered {
    transform: scale(1.15) rotate(-4deg);
    border-color: var(--ring);
  }

  .cert-icon__emoji {
    font-size: 1.35rem;
    line-height: 1;
  }

  .cert-icon__img {
    width: 1.75rem;
    height: 1.75rem;
    object-fit: contain;
    border-radius: 0.25rem;
  }

  /* Category badge */
  .cert-badge {
    font-size: 0.67rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.25rem 0.6rem;
    border-radius: 100px;
    border: 1px solid transparent;
  }

  .cert-badge--professional {
    background: color-mix(in oklab, var(--foreground) 8%, transparent);
    color: var(--foreground);
    border-color: color-mix(in oklab, var(--foreground) 16%, transparent);
  }

  .cert-badge--design {
    background: color-mix(in oklab, #60a5fa 12%, transparent);
    color: #3b82f6;
    border-color: color-mix(in oklab, #60a5fa 30%, transparent);
  }

  .cert-badge--technology {
    background: color-mix(in oklab, #a78bfa 12%, transparent);
    color: #7c3aed;
    border-color: color-mix(in oklab, #a78bfa 30%, transparent);
  }

  /* ── Body ── */
  .cert-card__body {
    margin-bottom: 1rem;
  }

  .cert-card__title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--foreground);
    line-height: 1.35;
    margin: 0 0 0.3rem;
  }

  .cert-card__issuer {
    font-size: 0.8rem;
    color: var(--muted-foreground);
    margin: 0;
  }

  /* Credential ID reveal */
  .cert-card__credential {
    overflow: hidden;
    margin-top: 0.5rem;
  }

  .cert-card__credential-id {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.7rem;
    font-family: var(--font-mono, monospace);
    color: var(--muted-foreground);
    background: var(--secondary);
    border: 1px solid var(--border);
    padding: 0.2rem 0.5rem;
    border-radius: 0.3rem;
  }

  /* ── Footer ── */
  .cert-card__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cert-card__date {
    font-size: 0.72rem;
    color: var(--muted-foreground);
  }

  .cert-card__verify {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--muted-foreground);
    text-decoration: none;
    opacity: 0;
    transition: opacity 0.25s ease, color 0.25s ease;
  }

  .cert-card__verify--visible {
    opacity: 1;
    color: var(--foreground);
  }

  .cert-card__verify:hover {
    text-decoration: underline;
  }

  /* ── Bottom divider ── */
  .cert-section__divider {
    margin-top: 4rem;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      var(--border) 30%,
      var(--border) 70%,
      transparent
    );
    transform-origin: center;
  }

  /* ── Mobile adjustments ── */
  @media (max-width: 639px) {
    .cert-section {
      padding: 4rem 0;
    }

    .cert-grid--locked {
      position: static; /* disable sticky lock on mobile — too aggressive */
    }

    .cert-card {
      padding: 1.1rem;
    }

    .cert-card--deemphasized {
      opacity: 1; /* no dim on mobile touch */
    }
  }
`