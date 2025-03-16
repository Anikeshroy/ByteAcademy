const CACHE_NAME = 'byte-academy-v1';
const urlsToCache = [
  '/',
  '/about',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install a service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache resources:', error);
      })
  );
  
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                // Don't cache if it's an API request or similar
                if (event.request.url.includes('/api/')) {
                  return;
                }
                cache.put(event.request, responseToCache);
              })
              .catch(error => {
                console.error('Failed to put in cache:', error);
              });

            return response;
          })
          .catch(error => {
            console.error('Fetch failed:', error);
            // If the request is for a page navigation, show the offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/offline');
            }
            
            // For image requests, you could return a default image
            if (event.request.destination === 'image') {
              return caches.match('/icons/icon-192x192.png');
            }
            
            // Otherwise just propagate the error
            throw error;
          });
      })
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
    .then(() => {
      // Take control of all clients as soon as the service worker activates
      return self.clients.claim();
    })
  );
}); 