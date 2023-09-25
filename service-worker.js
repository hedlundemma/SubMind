const cacheVersion = 'v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheVersion).then((cache) => {
      return cache.addAll([
        '/',
        '/manifest.json',
        '/favicon.ico',
        '/css/styles.css',
        '/js/main.js',
        // Add more assets to cache here
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Serve cached assets if available, or fetch from network
      return response || fetch(event.request).then((fetchResponse) => {
        // Cache the fetched response for future use
        return caches.open(cacheVersion).then((cache) => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheVersion) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
