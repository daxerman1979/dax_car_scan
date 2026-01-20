const CACHE_NAME = 'dcs';
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Roboto:wght@700;900&display=swap',
  'https://i.ibb.co/Lhb8Y6H/dcs-icon.png'
];

// Instalacija i čuvanje fajlova u memoriji
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Skladištenje fajlova za offline rad...');
      return cache.addAll(assets);
    })
  );
});

// Aktivacija i čišćenje stare memorije
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Posluživanje fajlova kada nema interneta
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
