const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/index.js',
];

self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage('Service Worker is installing');
          });
        });
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removing old cache', cacheName);
            self.clients.matchAll().then(clients => {
              clients.forEach(client => {
                client.postMessage('Service Worker is activating');
              });
            });
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetching', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
