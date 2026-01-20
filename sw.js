const CACHE_NAME = 'dcs-pro-v60'; // Promeni ovo svaki put kad menjaš kod
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Roboto:wght@700;900&display=swap'
];

// Instalacija - čuvanje fajlova
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Forsira aktivaciju odmah
});

// Aktivacija - brisanje starog keša
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch - služenje fajlova iz keša kad nema neta
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
