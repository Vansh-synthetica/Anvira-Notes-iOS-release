// Anvira Notes' app-shell cache for the published PWA: an installed iPad or iPhone opens with no network.
// Only files under the app's own folder are cached; the account server's requests, photos and web fonts pass through.
const SHELL = 'anvira-shell-1'
const INDEX = new URL('./index.html', self.registration.scope).href
const BASE = new URL(self.registration.scope).pathname

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(SHELL).then((c) => c.add(INDEX)).catch(() => {}))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== SHELL) await caches.delete(key)
    await self.clients.claim()
  })())
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.origin || !url.href.startsWith(self.registration.scope)) return
  event.respondWith(
    (async () => {
      try {
        const fresh = await fetch(req)
        // hashed asset files and the app page are saved as they come; everything else stays online-only
        const tail = url.pathname.slice(BASE.length)
        const own = req.mode === 'navigate' || tail.startsWith('assets/') || ['favicon.png', 'apple-touch-icon.png', 'manifest.webmanifest'].includes(tail)
        if (fresh && fresh.ok && own) (await caches.open(SHELL)).put(req, fresh.clone())
        return fresh
      } catch {
        return (await caches.match(req)) ?? (req.mode === 'navigate' ? caches.match(INDEX) : Response.error())
      }
    })()
  )
})
