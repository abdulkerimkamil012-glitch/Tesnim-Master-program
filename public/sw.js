// Deliberately does NOT cache anything. Its only job is to satisfy the
// browser's "installable web app" checklist (Chrome/Android's "Add to
// Home Screen"). If it cached files, a data.js fix could get stuck
// behind a stale cache — the opposite of what we want. Every request
// still goes straight to the network as normal.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
