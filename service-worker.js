self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
        "/", // Cache the root URL
        "/manifest.json", // Cache the manifest file
        "/favicon.ico", // Cache the favicon
        // Add more URLs of your application's assets to cache here
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
