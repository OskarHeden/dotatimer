// service-worker.js - Service Worker File

// Import pre-build environment variables
import { process } from './swenv.js';

// Cache version - change this value when you want to force an update
const CACHE_VERSION = process.env.VERCEL_GIT_COMMIT_SHA;
console.log(CACHE_VERSION);

// Cache names
const CACHE_STATIC_NAME = `static-${CACHE_VERSION}`;
const CACHE_DYNAMIC_NAME = `dynamic-${CACHE_VERSION}`;

// Assets to cache
const STATIC_ASSETS = ['/'];

// Install event
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_STATIC_NAME).then((cache) => {
			console.log('Caching static assets');
			return cache.addAll(STATIC_ASSETS);
		})
	);
});

// Activate event
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			console.log({ cacheNames });
			return Promise.all(
				cacheNames.map((cacheName) => {
					console.log({ cacheName });
					if (cacheName !== CACHE_STATIC_NAME && cacheName !== CACHE_DYNAMIC_NAME) {
						console.log('Removing old cache:', cacheName);
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

// Fetch event
self.addEventListener('fetch', (event) => {
	return fetch(event.request);
	// event.respondWith(
	// 	caches.match(event.request).then((response) => {
	// 		if (response) {
	// 			return response;
	// 		} else {
	// 			return fetch(event.request)
	// 				.then((res) => {
	// 					return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
	// 						cache.put(event.request.url, res.clone());
	// 						return res;
	// 					});
	// 				})
	// 				.catch(() => {
	// 					console.log('Fetch failed');
	// 					return null;
	// 				});
	// 		}
	// 	})
	// );
});

// Check for updates
self.addEventListener('message', (event) => {
	if (event.data.action === 'checkForUpdate') {
		console.log('Checking for updates...');
		fetch(self.registration.scope).then((response) => {
			if (response.status === 200) {
				response.text().then((text) => {
					if (text.indexOf(CACHE_VERSION) === -1) {
						console.log('Update available, notifying the app...');
						self.clients.matchAll().then((clients) => {
							clients.forEach((client) => client.postMessage({ action: 'updateAvailable' }));
						});
					} else {
						console.log('No update available');
					}
				});
			}
		});
	}
});
