const CACHE_NAME = 'dcs-v70-github';
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// Instalacija i keširanje fajlova
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Skladištenje fajlova u keš...');
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); // Forsira aktivaciju nove verzije odmah
});

// Čišćenje starih keševa (važno da bi se uklonio stari Vercel keš)
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch strategija (prvo gleda keš, ako nema, ide na mrežu)
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
