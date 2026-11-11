'use client'

import { useEffect, useRef } from 'react'

type Star = { x: number; y: number; radius: number; vx: number; vy: number; phase: number }

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let width = 0
    let height = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const count = width < 768 ? 90 : 140
    const stars: Star[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      phase: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      ctx.fillStyle = '#0a0a0f'
      ctx.fillRect(0, 0, width, height)

      for (const star of stars) {
        if (!reduceMotion) {
          star.x += star.vx
          star.y += star.vy
          star.phase += 0.02
          if (star.x < 0) star.x = width
          if (star.x > width) star.x = 0
          if (star.y < 0) star.y = height
          if (star.y > height) star.y = 0
        }
        const alpha = 0.45 + Math.sin(star.phase) * 0.45
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()
      }

      if (!reduceMotion) frame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: '#0a0a0f' }}
      aria-hidden
    />
  )
}
