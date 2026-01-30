'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Don't track dashboard pages
    if (pathname?.startsWith('/dashboard')) {
      return
    }

    // Track page view
    const trackPageView = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: pathname,
            referer: document.referrer,
            userAgent: navigator.userAgent,
          }),
        })
      } catch (error) {
        // Silently fail - analytics shouldn't break the site
        console.error('Analytics error:', error)
      }
    }

    trackPageView()
  }, [pathname])

  return null
}
