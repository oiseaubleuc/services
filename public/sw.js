// Service Worker for HohoSolutions PWA (bump version to invalidate cache after updates)
const CACHE_NAME = 'hohosolutions-v2'
const urlsToCache = [
  '/',
  '/services',
  '/contact',
  '/offer',
  '/about',
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
      .catch((err) => {
        console.error('Cache install failed:', err)
      })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - network first for HTML (so updates show in Safari), cache first for rest
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  if (event.request.url.includes('/api/') || !event.request.url.startsWith(self.location.origin)) return
  if (event.request.url.includes('/sw.js')) return

  const isDocument = event.request.mode === 'navigate' || event.request.destination === 'document'

  if (isDocument) {
    // Navigation/document: always try network first so Safari shows latest content
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const r = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, r)).catch(() => {})
          }
          return response
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('/')))
    )
    return
  }

  // Other assets: cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) return response
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') return response
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache)).catch(() => {})
          return response
        })
      })
      .catch(() => caches.match('/'))
  )
})
