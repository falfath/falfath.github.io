importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
	{ url: "/", revision: "1" },
	{ url: "/index.html", revision: "1" },
	{ url: "/team-detail.html", revision: "1" },
	{ url: "/nav.html", revision: "1" },
	{ url: "/pages/about.html", revision: "1" },
	{ url: "/pages/favorites.html", revision: "1" },
	{ url: "/pages/home.html", revision: "1" },
	{ url: "/pages/matches.html", revision: "1" },
	{ url: "/pages/standings.html", revision: "1" },
	{ url: "/pages/teams.html", revision: "1" },
	{ url: "/assets/css/custom.css", revision: "1" },
	{ url: "/assets/css/materialize.min.css", revision: "1" },
	{ url: "/assets/js/api.js", revision: "1" },
	{ url: "/assets/js/db.js", revision: "1" },
	{ url: "/assets/js/detail.js", revision: "1" },
	{ url: "/assets/js/helper.js", revision: "1" },
	{ url: "/assets/js/idb.js", revision: "1" },
	{ url: "/assets/js/main.js", revision: "1" },
	{ url: "/assets/js/materialize.min.js", revision: "1" },
	{ url: "/assets/images/about-me.jpg", revision: "1" },
	{ url: "/assets/images/icons/favicon.ico", revision: "1" },
	{ url: "/assets/images/icons/icon-72x72.png", revision: "1" },
	{ url: "/assets/images/icons/icon-96x96.png", revision: "1" },
	{ url: "/assets/images/icons/icon-128x128.png", revision: "1" },
	{ url: "/assets/images/icons/icon-144x144.png", revision: "1" },
	{ url: "/assets/images/icons/icon-152x152.png", revision: "1" },
	{ url: "/assets/images/icons/icon-192x192.png", revision: "1" },
	{ url: "/assets/images/icons/icon-384x384.png", revision: "1" },
	{ url: "/assets/images/icons/icon-512x512.png", revision: "1" },
	{ url: "/manifest.json", revision: "1" },
	{ url: "/register.js", revision: "1" },
]);

workbox.routing.registerRoute(
	new RegExp('/pages/'),
	  workbox.strategies.staleWhileRevalidate({
		  cacheName: 'bundesliga-app-v2'
	  })
  );

// const CACHE_NAME 	= "bundesliga-app-v1";
// var urlsToCache		= [
// 	"/",
// 	"/index.html",
// 	"/team-detail.html",
// 	"/nav.html",
// 	"/pages/about.html",
// 	"/pages/favorites.html",
// 	"/pages/home.html",
// 	"/pages/matches.html",
// 	"/pages/standings.html",
// 	"/pages/teams.html",
// 	"/assets/css/custom.css",
// 	"/assets/css/materialize.min.css",
// 	"/assets/js/api.js",
// 	"/assets/js/db.js",
// 	"/assets/js/detail.js",
// 	"/assets/js/helper.js",
// 	"/assets/js/idb.js",
// 	"/assets/js/main.js",
// 	"/assets/js/materialize.min.js",
// 	"/assets/images/about-me.jpg",
// 	"/assets/images/icons/favicon.ico",
// 	"/assets/images/icons/icon-72x72.png",
// 	"/assets/images/icons/icon-96x96.png",
// 	"/assets/images/icons/icon-128x128.png",
// 	"/assets/images/icons/icon-144x144.png",
// 	"/assets/images/icons/icon-152x152.png",
// 	"/assets/images/icons/icon-192x192.png",
// 	"/assets/images/icons/icon-384x384.png",
// 	"/assets/images/icons/icon-512x512.png",
// 	"/manifest.json",
// 	"/register.js"
// ];

// self.addEventListener("install", event => {
// 	event.waitUntil(
// 		caches.open(CACHE_NAME).then(cache => {
// 			return cache.addAll(urlsToCache);
// 		})
// 	);
// });

// self.addEventListener("fetch", (event) => {
// 	let base_url	= "https://api.football-data.org/v2/";

// 	if (event.request.url.indexOf(base_url) > -1) {
// 		event.respondWith(
// 			caches.open(CACHE_NAME).then((cache) => {
// 				return fetch(event.request).then((response) => {
// 					cache.put(event.request.url, response.clone());
					
// 					return response;
// 				})
// 			})
// 		);
// 	} else {
// 		event.respondWith(
// 			caches.match(event.request, { ignoreSearch: true }).then((response) => {
// 				return response || fetch (event.request);
// 			})
// 		)
// 	}
// });

// self.addEventListener("activate", (event) => {
// 	event.waitUntil(
// 		caches.keys().then((cacheNames) => {
// 			return Promise.all(
// 				cacheNames.map((cacheName) => {
// 					if (cacheName != CACHE_NAME) {
// 						console.log("ServiceWorker: cache " + cacheName + " deleted.");

// 						return caches.delete(cacheName);
// 					}
// 				})
// 			);
// 		})
// 	);
// });

// self.addEventListener('push', (event) => {
// 	let body;

// 	if (event.data) {
// 		body = event.data.text();
// 	} else {
// 		body = 'Push message no payload';
// 	}
// 	var options = {
// 		body: body,
// 		icon: 'assets/images/icon-72x72.png',
// 		vibrate: [100, 50, 100],
// 		data: {
// 		dateOfArrival: Date.now(),
// 			primaryKey: 1
// 		}
// 	};
// 	event.waitUntil(
// 	  self.registration.showNotification('Push Notification', options)
// 	);
// });