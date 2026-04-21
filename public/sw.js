// Service worker with basic precaching and runtime caching.
const CACHE_NAME = 'app-shell-v1'
const OFFLINE_URL = '/offline.html'
const PRECACHE_URLS = [
  '/',
  '/index.html',
  OFFLINE_URL,
  '/favicon.svg',
  '/manifest.webmanifest'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key)
        })
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const requestUrl = new URL(event.request.url)

  // Handle navigation requests — SPA fallback to cache or offline page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Update the cache with the latest index.html
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put('/', copy))
          return response
        })
        .catch(() => caches.match(event.request).then((r) => r || caches.match(OFFLINE_URL)))
    )
    return
  }

  // For same-origin requests, try cache first then network and cache the result
  if (requestUrl.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type === 'opaque') return response
            const responseClone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone))
            return response
          })
          .catch(() => {
            // network failed and nothing in cache; for images or other assets we could return a fallback here
          })
      })
    )
  }
})
