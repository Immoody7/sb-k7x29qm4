// Offline + tez khulna. Update ke baad neeche version badhao (6.4 -> 6.5).
const CACHE = 'smartbudget-6.4';
const FILES = ['./', 'index.html', 'style.css', 'app.js', 'manifest.json', 'app-icon-192.png', 'app-icon-512.png', 'icon-maskable-512.png'];
const fresh = (u) => fetch(new Request(u, { cache: 'reload' }));  // GitHub ki purani copy ko chhodo

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(u => fresh(u).then(r => { if (!r.ok) throw new Error(u); return c.put(u, r); })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Saved copy turant, peeche se naya version (agli baar dikhega).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(cached => {
    const net = fresh(e.request.url).then(res => {
      if (res && res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => cached);
    e.waitUntil(net.catch(() => {}));
    return cached || net;
  }));
});
