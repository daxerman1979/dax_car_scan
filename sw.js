const CACHE_NAME = 'dcs-v1';
const assets = [
  'index.html',
  'manifest.json',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Roboto:wght@700;900&display=swap',
  'https://i.ibb.co/Lhb8Y6H/dcs-icon.png'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
