'use client'

import { useEffect, useRef, useCallback } from 'react'

// ─── Constants ───

const CURSOR_SIZE = 32
const LERP_SPEED = 0.15
const STRETCH_MULTIPLIER = 0.004
const MAX_STRETCH = 0.45
const HOVER_SCALE = 2.2
const MAGNET_STRENGTH = 0.3
const MAGNET_DISTANCE = 80

const INTERACTIVE_SELECTOR = 'a, button, [data-cursor-hover]'
const MAGNETIC_SELECTOR = '[data-cursor-magnet]'

// ─── Utility ───

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

// ─── Component ───

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)
  const isVisible = useRef(false)
  const magnetTarget = useRef<{ x: number; y: number } | null>(null)
  const rafId = useRef<number>(0)

  const updateCursor = useCallback(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    const targetX = magnetTarget.current ? magnetTarget.current.x : mouse.current.x
    const targetY = magnetTarget.current ? magnetTarget.current.y : mouse.current.y

    const prevX = pos.current.x
    const prevY = pos.current.y

    pos.current.x = lerp(pos.current.x, targetX, LERP_SPEED)
    pos.current.y = lerp(pos.current.y, targetY, LERP_SPEED)

    velocity.current.x = pos.current.x - prevX
    velocity.current.y = pos.current.y - prevY

    const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2)
    const stretch = clamp(speed * STRETCH_MULTIPLIER, 0, MAX_STRETCH)
    const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI)

    const scaleX = 1 + stretch
    const scaleY = 1 - stretch * 0.5
    const hoverMultiplier = isHovering.current ? HOVER_SCALE : 1

    const flatness = clamp(stretch * 3, 0, 0.2)
    const borderRadius = `${50 - flatness * 15}% ${50 + flatness * 5}% ${50 - flatness * 10}% ${50 + flatness * 10}% / ${50 + flatness * 10}% ${50 - flatness * 10}% ${50 + flatness * 5}% ${50 - flatness * 15}%`

    const translateX = pos.current.x - CURSOR_SIZE / 2
    const translateY = pos.current.y - CURSOR_SIZE / 2

    cursor.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${speed > 1 ? angle : 0}deg) scale(${scaleX * hoverMultiplier}, ${scaleY * hoverMultiplier})`
    cursor.style.borderRadius = borderRadius
    cursor.style.opacity = isVisible.current ? '1' : '0'

    dot.style.transform = `translate3d(${mouse.current.x - 4}px, ${mouse.current.y - 4}px, 0)`
    dot.style.opacity = isVisible.current ? '1' : '0'

    rafId.current = requestAnimationFrame(updateCursor)
  }, [])

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    document.documentElement.style.cursor = 'none'

    pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    // ─── Event Handlers ───

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (!isVisible.current) isVisible.current = true
    }

    const handleMouseLeave = () => {
      isVisible.current = false
    }

    const handleMouseEnter = () => {
      isVisible.current = true
    }

    const handleHoverIn = () => {
      isHovering.current = true
    }

    const handleHoverOut = () => {
      isHovering.current = false
      magnetTarget.current = null
    }

    const handleMagnetMove = (e: MouseEvent) => {
      const target = (e.currentTarget as HTMLElement)
      const rect = target.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const dist = Math.sqrt(distX ** 2 + distY ** 2)

      if (dist < MAGNET_DISTANCE) {
        magnetTarget.current = {
          x: centerX + distX * MAGNET_STRENGTH,
          y: centerY + distY * MAGNET_STRENGTH,
        }
      }
    }

    // ─── Bind Events ───

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    const interactiveElements = document.querySelectorAll(INTERACTIVE_SELECTOR)
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverIn)
      el.addEventListener('mouseleave', handleHoverOut)
    })

    const magneticElements = document.querySelectorAll(MAGNETIC_SELECTOR)
    magneticElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverIn)
      el.addEventListener('mouseleave', handleHoverOut)
      el.addEventListener('mousemove', handleMagnetMove as EventListener)
    })

    rafId.current = requestAnimationFrame(updateCursor)

    // ─── Mutation Observer (for dynamic elements) ───

    const observer = new MutationObserver(() => {
      const freshInteractive = document.querySelectorAll(INTERACTIVE_SELECTOR)
      freshInteractive.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverIn)
        el.removeEventListener('mouseleave', handleHoverOut)
        el.addEventListener('mouseenter', handleHoverIn)
        el.addEventListener('mouseleave', handleHoverOut)
      })

      const freshMagnetic = document.querySelectorAll(MAGNETIC_SELECTOR)
      freshMagnetic.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverIn)
        el.removeEventListener('mouseleave', handleHoverOut)
        el.removeEventListener('mousemove', handleMagnetMove as EventListener)
        el.addEventListener('mouseenter', handleHoverIn)
        el.addEventListener('mouseleave', handleHoverOut)
        el.addEventListener('mousemove', handleMagnetMove as EventListener)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.documentElement.style.cursor = ''
      observer.disconnect()

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverIn)
        el.removeEventListener('mouseleave', handleHoverOut)
      })

      magneticElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverIn)
        el.removeEventListener('mouseleave', handleHoverOut)
        el.removeEventListener('mousemove', handleMagnetMove as EventListener)
      })
    }
  }, [updateCursor])

  return (
    <>
      {/* Outer ring — liquid shape */}
      <div
        ref={cursorRef}
        className="cursor-ring"
        aria-hidden="true"
      />
      {/* Inner dot — precise position */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
      />
    </>
  )
}
