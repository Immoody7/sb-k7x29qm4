// Offline + tez khulna. index.html badlo toh neeche version badha do (v5 -> v6).
const CACHE = 'smartbudget-v5';
const FILES = ['./', 'index.html', 'manifest.json', 'app-icon-192.png', 'app-icon-512.png', 'icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Pehle saved copy turant do, peeche se naya version download karo (agli baar dikhega).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(cached => {
    const net = fetch(e.request).then(res => {
      if (res && res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => cached);
    e.waitUntil(net.catch(() => {}));
    return cached || net;
  }));
});
