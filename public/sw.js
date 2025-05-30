
const CACHE_NAME = 'centennial-hills-v1.2.0';
const urlsToCache = [
  '/',
  '/listings',
  '/neighborhoods',
  '/centennial-hills',
  '/providence-las-vegas',
  '/skye-canyon',
  '/market-update',
  '/faq',
  '/about',
  '/contact',
  '/styles/globals.css',
  '/images/centennial-hills-hero.jpg',
  '/manifest.json'
];

// Google Search Console IndexNow API support
const INDEXNOW_API_KEY = 'centennial-hills-indexnow-key';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          // Don't cache if not a successful response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Background sync for Google Search Console
self.addEventListener('sync', (event) => {
  if (event.tag === 'google-index-request') {
    event.waitUntil(requestGoogleIndexing());
  }
});

async function requestGoogleIndexing() {
  try {
    // Notify Google Search Console of content updates
    const response = await fetch('https://www.google.com/ping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `sitemap=https://centennialhillshomesforsale.com/sitemap.xml`
    });
    
    console.log('Google indexing request submitted');
  } catch (error) {
    console.error('Failed to request Google indexing:', error);
  }
}

// Handle push notifications for Google My Business updates
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'New real estate update available',
      icon: '/images/icon-192x192.png',
      badge: '/images/badge-72x72.png',
      tag: 'real-estate-update',
      data: {
        url: data.url || '/'
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Centennial Hills Homes', options)
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

// Update cache when new version is available
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
