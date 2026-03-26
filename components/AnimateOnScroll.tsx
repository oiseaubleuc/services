'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'

type Variant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'fadeUpStagger'

interface AnimateOnScrollProps {
  children: ReactNode
  variant?: Variant
  delay?: number
  className?: string
  /** Fraction of element that must be visible (0-1). Default 0.15 */
  threshold?: number
  /** Root margin e.g. "0px 0px -50px 0px" to trigger a bit earlier */
  rootMargin?: string
  /** Only animate once (default true) */
  once?: boolean
}

export default function AnimateOnScroll({
  children,
  variant = 'fadeUp',
  delay = 0,
  className = '',
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let timeoutId: ReturnType<typeof setTimeout>
    let rafId: number
    let observer: IntersectionObserver | null = null

    rafId = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            timeoutId = setTimeout(() => setIsVisible(true), delay)
          } else if (!once) {
            setIsVisible(false)
          }
        },
        { threshold, rootMargin }
      )
      observer.observe(el)
    })

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timeoutId)
      observer?.disconnect()
    }
  }, [threshold, rootMargin, once, delay])

  return (
    <div
      ref={ref}
      className={`animate-on-scroll animate-on-scroll--${variant} ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
