const CACHE_NAME = 'unchain-voice-v4.2';
const OFFLINE_URL = 'offline.html';

// cache files
const PRECACHE_FILES = [
    './',
    './index.html',
    './lib/crypto-js.min.js',
    './assets/fonts/Vazir.woff2',
    './assets/fonts/Vazir.woff',
    './manifest.json',
    './assets/js/script.js',
    './assets/css/style.css'
];

// install = service worker
self.addEventListener('install', (event) => {
    console.log('🛠 در حال نصب...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 کش کردن فایل‌های ضروری');
                return cache.addAll(PRECACHE_FILES);
            })
            .then(() => {
                console.log('✅ نصب کامل شد');
                return self.skipWaiting();
            })
    );
});

// init - service worker
self.addEventListener('activate', (event) => {
    console.log('🚀 فعال شد');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(`🗑 حذف کش قدیمی: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ فعال‌سازی کامل شد');
            return self.clients.claim();
        })
    );
});

// req management
self.addEventListener('fetch', (event) => {
    // only get management
    if (event.request.method !== 'GET') return;
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // if it was in the cache, remove it from the cache
                if (cachedResponse) {
                    console.log(' استفاده از کش:', event.request.url);
                    return cachedResponse;
                }
                
                // else get it from the network
                return fetch(event.request)
                    .then((response) => {
                        // req sanitize
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // cache response for next req
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // if offline
                        if (event.request.mode === 'navigate') {
                            return caches.match(OFFLINE_URL);
                        }
                        return new Response('دسترسی به اینترنت موجود نیست', {
                            status: 503,
                            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
                        });
                    });
            })
    );
});

// get messages
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
