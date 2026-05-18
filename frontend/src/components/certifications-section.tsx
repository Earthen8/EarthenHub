'use client'

/**
 * CertificationsSection — Accordion Slider with A4 Lightbox Viewer
 *
 * Backend integration guide:
 * ---------------------------
 * Replace the `CERTIFICATIONS` array below with data fetched from your API.
 * Each certification object follows the `Certification` type.
 *
 * Fields:
 *   id            — unique string key
 *   title         — certification name
 *   imageUrl      — certificate/badge image URL (shown in card + A4 lightbox viewer)
 *
 * Example API swap (Next.js server component pattern):
 *   const certifications = await fetch('/api/certifications').then(r => r.json())
 *   Pass the result as a prop: <CertificationsSection certifications={certifications} />
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { Award } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Certification {
  id: string
  title: string
  /** URL to the certificate image (shown in card thumbnail and A4 lightbox). */
  imageUrl?: string
}

// ─── Static data (replace with API data when backend is ready) ────────────────

const CERTIFICATIONS: Certification[] = [
  { id: 'aws-solutions-architect', title: 'AWS Certified Solutions Architect' },
  { id: 'google-cloud-architect', title: 'Google Cloud Professional Architect' },
  { id: 'ux-design-cert', title: 'Advanced UX/UI Design' },
  { id: 'typescript-advanced', title: 'TypeScript Advanced Patterns' },
  { id: 'react-specialist', title: 'React Developer Specialist' },
  { id: 'docker-certified', title: 'Docker Certified Associate' },
]

// ─── Colour palette per card (cycles) ────────────────────────────────────────

const CARD_PALETTES = [
  { bg: '#0f172a', accent: '#38bdf8', text: '#e0f2fe' },
  { bg: '#1a0a2e', accent: '#a78bfa', text: '#ede9fe' },
  { bg: '#0a1a0f', accent: '#4ade80', text: '#dcfce7' },
  { bg: '#1a0f0a', accent: '#fb923c', text: '#ffedd5' },
  { bg: '#0a1020', accent: '#60a5fa', text: '#dbeafe' },
  { bg: '#1a0a14', accent: '#f472b6', text: '#fce7f3' },
]

// ─── A4 Lightbox ──────────────────────────────────────────────────────────────

interface LightboxProps {
  certifications: Certification[]
  activeIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

function A4Lightbox({ certifications, activeIndex, onClose, onNavigate }: LightboxProps) {
  const thumbsRef = useRef<HTMLDivElement>(null)
  const cert = certifications[activeIndex]
  const palette = CARD_PALETTES[activeIndex % CARD_PALETTES.length]

  // Scroll active thumbnail into view
  useEffect(() => {
    const container = thumbsRef.current
    if (!container) return
    const activeThumb = container.querySelector<HTMLElement>('[data-active="true"]')
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeIndex])

  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((activeIndex + 1) % certifications.length)
      if (e.key === 'ArrowLeft') onNavigate((activeIndex - 1 + certifications.length) % certifications.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIndex, certifications.length, onClose, onNavigate])

  return (
    <div className="lb-overlay" onClick={onClose} role="dialog" aria-modal aria-label="Certificate viewer">
      <div className="lb-container" onClick={(e) => e.stopPropagation()}>

        {/* Close button */}
        <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>

        {/* A4 Horizontal Certificate Viewer */}
        <div className="lb-stage">
          {/* Prev */}
          <button
            className="lb-nav lb-nav--prev"
            onClick={() => onNavigate((activeIndex - 1 + certifications.length) % certifications.length)}
            aria-label="Previous certificate"
          >
            ‹
          </button>

          {/* A4 paper — always horizontal (landscape) */}
          <div className="lb-a4" style={{ borderColor: palette.accent + '55' }}>
            {cert.imageUrl ? (
              <img
                src={cert.imageUrl}
                alt={`${cert.title} certificate`}
                className="lb-a4__img"
              />
            ) : (
              <div className="lb-a4__placeholder" style={{ '--accent': palette.accent } as React.CSSProperties}>
                <div className="lb-a4__placeholder-inner">
                  <div className="lb-a4__deco-corner lb-a4__deco-corner--tl" />
                  <div className="lb-a4__deco-corner lb-a4__deco-corner--tr" />
                  <div className="lb-a4__deco-corner lb-a4__deco-corner--bl" />
                  <div className="lb-a4__deco-corner lb-a4__deco-corner--br" />
                  <div className="lb-a4__badge-ring" style={{ borderColor: palette.accent }}>
                    <Award size={32} color={palette.accent} />
                  </div>
                  <p className="lb-a4__cert-title">{cert.title}</p>
                  <p className="lb-a4__cert-sub">Certificate of Completion</p>
                  <div className="lb-a4__divider" style={{ background: palette.accent }} />
                  <p className="lb-a4__cert-num">{cert.id}</p>
                </div>
              </div>
            )}

            {/* Index badge */}
            <span className="lb-a4__index" style={{ background: palette.accent }}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(certifications.length).padStart(2, '0')}
            </span>
          </div>

          {/* Next */}
          <button
            className="lb-nav lb-nav--next"
            onClick={() => onNavigate((activeIndex + 1) % certifications.length)}
            aria-label="Next certificate"
          >
            ›
          </button>
        </div>

        {/* Title */}
        <p className="lb-title">{cert.title}</p>

        {/* Horizontal thumbnail strip — scrollable */}
        <div ref={thumbsRef} className="lb-thumbs" role="tablist">
          {certifications.map((c, i) => {
            const p = CARD_PALETTES[i % CARD_PALETTES.length]
            return (
              <button
                key={c.id + i}
                className={`lb-thumb ${i === activeIndex ? 'lb-thumb--active' : ''}`}
                style={{
                  '--thumb-accent': p.accent,
                  '--thumb-bg': p.bg,
                  borderColor: i === activeIndex ? p.accent : 'transparent',
                } as React.CSSProperties}
                onClick={() => onNavigate(i)}
                data-active={i === activeIndex}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={c.title}
              >
                {c.imageUrl ? (
                  <img src={c.imageUrl} alt={c.title} className="lb-thumb__img" />
                ) : (
                  <span className="lb-thumb__num">{String(i + 1).padStart(2, '0')}</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── CertificationsSection ────────────────────────────────────────────────────

interface CertificationsSectionProps {
  certifications?: Certification[]
}

export function CertificationsSection({
  certifications = CERTIFICATIONS,
}: CertificationsSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [sectionVisible, setSectionVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  // Section reveal
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

  // Track viewport size
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  // Scroll active card into view inside track container
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const track = trackRef.current
    if (!track) return
    const container = track.parentElement
    if (!container) return
    const activeCard = track.querySelector<HTMLElement>('[data-active="true"]')
    if (activeCard) {
      const containerWidth = container.clientWidth
      const cardOffset = activeCard.offsetLeft
      const cardWidth = activeCard.clientWidth
      const targetScroll = cardOffset - (containerWidth / 2) + (cardWidth / 2)
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      })
    }
  }, [activeIndex])

  // Keyboard navigation on track
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % certifications.length)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => (i - 1 + certifications.length) % certifications.length)
      }
    },
    [certifications.length]
  )

  const count = certifications.length

  // How many cards are visible in the accordion at once
  // Cap at 8 visible; extras are reachable via horizontal scroll on the track
  const VISIBLE_CAP = 8

  return (
    <>
      <style>{SECTION_STYLES}</style>

      {lightboxIndex !== null && (
        <A4Lightbox
          certifications={certifications}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => setLightboxIndex(i)}
        />
      )}

      <section
        ref={sectionRef}
        className="cs-section"
        aria-label="Licenses and certifications"
      >
        <div className="cs-inner">

          {/* ── Header ── */}
          <header
            className="cs-header"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <div className="cs-eyebrow">
              <Award size={14} aria-hidden="true" />
              <span>Credentials</span>
            </div>
            <h2 className="cs-title">
              Licenses &amp; <em>Certifications</em>
            </h2>
            {count > VISIBLE_CAP && (
              <p className="cs-subtitle">
                Showing {VISIBLE_CAP} of {count} — scroll to see more
              </p>
            )}
          </header>

          {/* ── Accordion Slider — horizontally scrollable ── */}
          <div
            className="cs-track-wrapper"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'none' : 'translateY(40px)',
              transition: 'opacity 0.9s ease 0.15s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s',
            }}
          >
            <div
              ref={trackRef}
              className="cs-track"
              role="group"
              aria-label="Certification cards"
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              {certifications.map((cert, i) => {
                const palette = CARD_PALETTES[i % CARD_PALETTES.length]
                const isActive = activeIndex === i
                const isPast = i < activeIndex

                return (
                  <button
                    key={cert.id + i}
                    data-active={isActive}
                    className={[
                      'cs-card',
                      isActive ? 'cs-card--active' : '',
                      isPast ? 'cs-card--past' : '',
                    ].join(' ').trim()}
                    style={{
                      '--card-bg': palette.bg,
                      '--card-accent': palette.accent,
                      '--card-text': palette.text,
                      flex: isActive ? (isMobile ? '3' : '4') : '1',
                      minWidth: isActive ? (isMobile ? '160px' : '220px') : '44px',
                      transform: isActive
                        ? 'perspective(1000px) rotateY(0deg) skewY(0deg)'
                        : isPast
                        ? `perspective(1000px) rotateY(${isMobile ? 8 : 12}deg) skewY(${isMobile ? -3 : -5}deg)`
                        : `perspective(1000px) rotateY(${isMobile ? -8 : -12}deg) skewY(${isMobile ? 3 : 5}deg)`,
                      background: palette.bg,
                      zIndex: isActive ? count + 1 : count - i,
                    } as React.CSSProperties}
                    onClick={() => {
                      if (isActive) {
                        // Second click opens lightbox
                        setLightboxIndex(i)
                      } else {
                        setActiveIndex(i)
                      }
                    }}
                    onDoubleClick={() => setLightboxIndex(i)}
                    aria-pressed={isActive}
                    aria-label={`${cert.title}${isActive ? ' — click to view certificate' : ''}`}
                  >
                    {/* Full-bleed background image */}
                    {cert.imageUrl && (
                      <img
                        src={cert.imageUrl}
                        alt={`${cert.title} certificate`}
                        className="cs-card__bg-img"
                        aria-hidden="true"
                      />
                    )}

                    {/* Glow layer */}
                    <span
                      className="cs-card__glow"
                      aria-hidden="true"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${palette.accent}44 0%, transparent 70%)` }}
                    />

                    {/* Glass shimmer highlight */}
                    <span className="cs-card__shimmer" aria-hidden="true" />

                    {/* Index number */}
                    <span className="cs-card__num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Placeholder icon when no image */}
                    {!cert.imageUrl && (
                      <div className="cs-card__placeholder-icon">
                        <Award size={isMobile ? 28 : 40} color={palette.accent} strokeWidth={1.2} />
                      </div>
                    )}

                    {/* View hint on active */}
                    {isActive && (
                      <span className="cs-card__hint" aria-hidden="true">
                        tap to view
                      </span>
                    )}

                    {/* Liquid Glass title panel */}
                    <div className="cs-card__glass">
                      <span className="cs-card__glass-edge" aria-hidden="true" />
                      <span className="cs-card__title">{cert.title}</span>
                    </div>

                    {/* Bottom accent line */}
                    <span
                      className="cs-card__bar"
                      aria-hidden="true"
                      style={{ background: palette.accent }}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Dot indicators — scrollable when many ── */}
          <div
            className="cs-dots-wrapper"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transition: 'opacity 0.9s ease 0.3s',
            }}
          >
            <div className="cs-dots" role="tablist" aria-label="Select certification">
              {certifications.map((cert, i) => (
                <button
                  key={cert.id + i}
                  className={`cs-dot ${activeIndex === i ? 'cs-dot--active' : ''}`}
                  style={
                    activeIndex === i
                      ? { background: CARD_PALETTES[i % CARD_PALETTES.length].accent }
                      : {}
                  }
                  onClick={() => setActiveIndex(i)}
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-label={cert.title}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const SECTION_STYLES = `
  /* ── Section ── */
  .cs-section {
    padding: 6rem 1rem;
    background: var(--background);
    overflow: hidden;
  }

  .cs-inner {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* ── Header ── */
  .cs-header {
    margin-bottom: 3rem;
  }

  .cs-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent-foreground);
    background: var(--accent);
    padding: 0.3rem 0.75rem;
    border-radius: 100px;
    margin-bottom: 1.1rem;
  }

  .cs-title {
    font-family: var(--font-serif, Georgia, serif);
    font-size: clamp(1.75rem, 4.5vw, 3rem);
    font-weight: 700;
    color: var(--foreground);
    line-height: 1.1;
    margin: 0 0 0.5rem;
  }

  .cs-title em {
    font-style: italic;
    color: var(--muted-foreground);
  }

  .cs-subtitle {
    font-size: 0.75rem;
    color: var(--muted-foreground);
    margin: 0.5rem 0 0;
  }

  /* ── Track Wrapper — enables horizontal scroll on overflow ── */
  .cs-track-wrapper {
    width: 100%;
    overflow-x: auto;
    overflow-y: visible;
    /* Hide scrollbar visually but keep it functional */
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding-bottom: 0.5rem;
    /* Extra room for 3D skew not to clip */
    padding-top: 4px;
  }
  .cs-track-wrapper::-webkit-scrollbar {
    display: none;
  }

  /* ── Accordion Track ── */
  .cs-track {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 0.5rem;
    height: 420px;
    /* Min width ensures cards don't shrink below usable size */
    min-width: min-content;
    outline: none;
    overflow: visible;
  }

  /* ── Card ── */
  .cs-card {
    position: relative;
    overflow: hidden;
    border-radius: 1.25rem;
    border: 1px solid rgba(255,255,255,0.06);
    cursor: pointer;
    padding: 0;
    background: var(--card-bg, #0f172a);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    flex-shrink: 0;

    transition:
      flex 0.55s cubic-bezier(0.22, 1, 0.36, 1),
      min-width 0.55s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 0.35s ease,
      border-color 0.35s ease;

    appearance: none;
    -webkit-appearance: none;
    outline: none;
    font: inherit;
    color: inherit;
    text-align: left;
  }

  .cs-card:focus-visible {
    outline: 2px solid var(--card-accent, #38bdf8);
    outline-offset: 3px;
  }

  .cs-card--active {
    border-color: rgba(255,255,255,0.18);
    box-shadow:
      0 30px 80px -20px rgba(0,0,0,0.7),
      0 0 0 1px rgba(255,255,255,0.08),
      inset 0 1px 0 rgba(255,255,255,0.12);
  }

  /* ── Full-bleed background image ── */
  .cs-card__bg-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    opacity: 0;
    scale: 1.08;
    transition: opacity 0.6s ease, scale 0.8s cubic-bezier(0.22,1,0.36,1);
    pointer-events: none;
  }

  .cs-card--active .cs-card__bg-img {
    opacity: 1;
    scale: 1;
  }

  /* ── Glow ── */
  .cs-card__glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.5s ease;
  }

  .cs-card--active .cs-card__glow {
    opacity: 1;
  }

  /* ── Animated glass shimmer ── */
  .cs-card__shimmer {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    opacity: 0;
    background: linear-gradient(
      115deg,
      transparent 30%,
      rgba(255,255,255,0.06) 45%,
      rgba(255,255,255,0.12) 50%,
      rgba(255,255,255,0.06) 55%,
      transparent 70%
    );
    background-size: 250% 100%;
    transition: opacity 0.5s ease;
  }

  .cs-card--active .cs-card__shimmer {
    opacity: 1;
    animation: cs-shimmer 4s ease-in-out infinite;
  }

  @keyframes cs-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -50% 0; }
  }

  /* ── Index number ── */
  .cs-card__num {
    position: absolute;
    top: 1.25rem;
    left: 1.25rem;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.2);
    font-variant-numeric: tabular-nums;
    transition: color 0.3s ease;
    z-index: 5;
  }

  .cs-card--active .cs-card__num {
    color: rgba(255,255,255,0.85);
    text-shadow: 0 1px 4px rgba(0,0,0,0.5);
  }

  /* ── Placeholder icon (no image) ── */
  .cs-card__placeholder-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    z-index: 3;
    opacity: 0;
    scale: 0.7;
    transition: opacity 0.4s ease 0.15s, scale 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.15s;
  }

  .cs-card--active .cs-card__placeholder-icon {
    opacity: 0.6;
    scale: 1;
  }

  /* ── "tap to view" hint ── */
  .cs-card__hint {
    position: absolute;
    top: 1.1rem;
    right: 1.1rem;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.8);
    text-shadow: 0 1px 4px rgba(0,0,0,0.5);
    opacity: 0.75;
    z-index: 5;
    pointer-events: none;
  }

  /* ── Apple Liquid Glass title panel ── */
  .cs-card__glass {
    position: relative;
    z-index: 4;
    width: 100%;
    padding: 1.4rem 1.5rem;
    /* Multi-layer frosted glass */
    background:
      linear-gradient(
        180deg,
        rgba(255,255,255,0.08) 0%,
        rgba(255,255,255,0.04) 100%
      );
    backdrop-filter: blur(24px) saturate(1.6) brightness(1.1);
    -webkit-backdrop-filter: blur(24px) saturate(1.6) brightness(1.1);
    /* Specular top edge */
    border-top: 1px solid rgba(255,255,255,0.18);
    /* Subtle inner glow */
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.12),
      inset 0 -1px 0 rgba(0,0,0,0.06),
      0 -8px 30px rgba(0,0,0,0.15);
    transition: padding 0.4s ease, backdrop-filter 0.4s ease;
  }

  /* Specular highlight edge (refraction line) */
  .cs-card__glass-edge {
    position: absolute;
    top: -1px;
    left: 8%;
    right: 8%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255,255,255,0.35) 30%,
      rgba(255,255,255,0.5) 50%,
      rgba(255,255,255,0.35) 70%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.4s ease 0.2s;
    pointer-events: none;
  }

  .cs-card--active .cs-card__glass-edge {
    opacity: 1;
  }

  /* Collapsed cards: minimal glass, vertical text */
  .cs-card:not(.cs-card--active) .cs-card__glass {
    background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-top-color: transparent;
    box-shadow: none;
    padding: 1.1rem 1rem;
  }

  .cs-card__title {
    display: block;
    font-size: 0.78rem;
    font-weight: 700;
    color: rgba(255,255,255,0.85);
    line-height: 1.35;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.01em;
    transition: font-size 0.4s ease, white-space 0.2s ease, color 0.3s ease;
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  .cs-card--active .cs-card__title {
    font-size: 1.05rem;
    white-space: normal;
    color: #fff;
    writing-mode: horizontal-tb;
    text-shadow: 0 1px 6px rgba(0,0,0,0.4);
  }

  /* ── Bottom accent bar ── */
  .cs-card__bar {
    position: absolute;
    bottom: 0;
    left: 20%;
    right: 20%;
    height: 3px;
    border-radius: 3px 3px 0 0;
    opacity: 0;
    z-index: 5;
    transition: opacity 0.4s ease, left 0.4s ease, right 0.4s ease;
  }

  .cs-card--active .cs-card__bar {
    opacity: 1;
    left: 8%;
    right: 8%;
  }

  /* ── Dots — scrollable strip when many ── */
  .cs-dots-wrapper {
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-top: 1.75rem;
  }
  .cs-dots-wrapper::-webkit-scrollbar { display: none; }

  .cs-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    min-width: min-content;
    padding: 0 0.5rem;
  }

  .cs-dot {
    width: 6px;
    height: 6px;
    border-radius: 100px;
    border: none;
    background: var(--border);
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
    transition: width 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s ease;
  }

  .cs-dot--active {
    width: 22px;
  }

  /* ─────────────────────────────────────────────────────────────────
     LIGHTBOX
  ───────────────────────────────────────────────────────────────── */

  .lb-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.88);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: lb-fade-in 0.25s ease forwards;
  }

  @keyframes lb-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .lb-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    width: min(92vw, 900px);
    max-height: 95vh;
    padding: 1rem;
    animation: lb-slide-up 0.3s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  @keyframes lb-slide-up {
    from { transform: translateY(20px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }

  .lb-close {
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.7);
    font-size: 0.85rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, color 0.2s;
    z-index: 10;
  }
  .lb-close:hover { background: rgba(255,255,255,0.18); color: #fff; }

  /* ── Stage (nav + A4 paper) ── */
  .lb-stage {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
  }

  .lb-nav {
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.8);
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }
  .lb-nav:hover { background: rgba(255,255,255,0.15); }

  /* ── A4 Paper — always landscape (297:210 ≈ 1.414:1) ── */
  .lb-a4 {
    position: relative;
    flex: 1;
    /* Landscape A4 ratio */
    aspect-ratio: 297 / 210;
    border-radius: 4px;
    border: 1px solid;
    background: #1a1a2e;
    overflow: hidden;
    box-shadow:
      0 40px 80px -20px rgba(0,0,0,0.8),
      inset 0 1px 0 rgba(255,255,255,0.05);
    /* Prevent the paper from growing too tall on small screens */
    max-height: 55vh;
    width: auto;
  }

  .lb-a4__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  /* Placeholder certificate layout */
  .lb-a4__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5%;
  }

  .lb-a4__placeholder-inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    padding: 8%;
  }

  /* Decorative corner brackets */
  .lb-a4__deco-corner {
    position: absolute;
    width: 1.25rem;
    height: 1.25rem;
    border-color: var(--accent, #38bdf8);
    border-style: solid;
    opacity: 0.5;
  }
  .lb-a4__deco-corner--tl { top: 0.5rem; left: 0.5rem; border-width: 1px 0 0 1px; }
  .lb-a4__deco-corner--tr { top: 0.5rem; right: 0.5rem; border-width: 1px 1px 0 0; }
  .lb-a4__deco-corner--bl { bottom: 0.5rem; left: 0.5rem; border-width: 0 0 1px 1px; }
  .lb-a4__deco-corner--br { bottom: 0.5rem; right: 0.5rem; border-width: 0 1px 1px 0; }

  .lb-a4__badge-ring {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    border: 1.5px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.25rem;
  }

  .lb-a4__cert-title {
    font-size: clamp(0.7rem, 2vw, 1.1rem);
    font-weight: 700;
    color: rgba(255,255,255,0.9);
    text-align: center;
    margin: 0;
    line-height: 1.3;
  }

  .lb-a4__cert-sub {
    font-size: clamp(0.55rem, 1.2vw, 0.75rem);
    color: rgba(255,255,255,0.4);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin: 0;
  }

  .lb-a4__divider {
    width: 30%;
    height: 1px;
    opacity: 0.4;
    margin: 0.25rem 0;
  }

  .lb-a4__cert-num {
    font-size: clamp(0.5rem, 1vw, 0.65rem);
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.1em;
    margin: 0;
    font-variant-numeric: tabular-nums;
  }

  /* Index badge on A4 */
  .lb-a4__index {
    position: absolute;
    bottom: 0.6rem;
    right: 0.6rem;
    padding: 0.2rem 0.5rem;
    border-radius: 100px;
    font-size: 0.6rem;
    font-weight: 800;
    color: #000;
    letter-spacing: 0.08em;
    font-variant-numeric: tabular-nums;
  }

  /* ── Title ── */
  .lb-title {
    font-size: clamp(0.85rem, 2vw, 1rem);
    font-weight: 600;
    color: rgba(255,255,255,0.8);
    text-align: center;
    margin: 0;
    letter-spacing: 0.01em;
  }

  /* ── Thumbnail Strip — horizontally scrollable ── */
  .lb-thumbs {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    overflow-x: auto;
    width: 100%;
    padding-bottom: 0.25rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.2) transparent;
  }
  .lb-thumbs::-webkit-scrollbar { height: 3px; }
  .lb-thumbs::-webkit-scrollbar-track { background: transparent; }
  .lb-thumbs::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }

  .lb-thumb {
    flex-shrink: 0;
    width: 3.5rem;
    height: 2.5rem;
    /* Landscape A4-ish ratio */
    border-radius: 4px;
    border: 1.5px solid;
    background: var(--thumb-bg, #0f172a);
    cursor: pointer;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s, opacity 0.2s, transform 0.2s;
    opacity: 0.5;
    padding: 0;
  }

  .lb-thumb:hover { opacity: 0.8; transform: translateY(-1px); }
  .lb-thumb--active { opacity: 1; transform: translateY(-2px); }

  .lb-thumb__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .lb-thumb__num {
    font-size: 0.6rem;
    font-weight: 800;
    color: var(--thumb-accent);
    font-variant-numeric: tabular-nums;
  }

  /* ── Mobile ── */
  @media (max-width: 639px) {
    .cs-section {
      padding: 4rem 0.5rem;
    }

    .cs-track {
      height: 300px;
      gap: 0.3rem;
    }

    .cs-card__glass {
      padding: 0.9rem 1rem;
    }

    .cs-card__num {
      top: 0.75rem;
      left: 0.75rem;
    }

    .cs-card__placeholder-icon {
      transform: translate(-50%, -55%);
    }

    .lb-nav {
      width: 2rem;
      height: 2rem;
      font-size: 1.2rem;
    }

    .lb-a4 {
      max-height: 45vw;
    }

    .lb-thumb {
      width: 2.75rem;
      height: 2rem;
    }
  }
`