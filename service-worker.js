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
], {
	ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
	new RegExp('https://api.football-data.org/'),
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'bundesliga-app-v2'
		})
);

workbox.routing.registerRoute(
	new RegExp('https://upload.wikimedia.org/'),
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'bundesliga-app-v2'
		})
);

workbox.routing.registerRoute(
	new RegExp('https://fonts.googleapis.com/icon?family=Material+Icons'),
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'bundesliga-app-v2'
		})
);

workbox.routing.registerRoute(
	new RegExp('https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'),
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'bundesliga-app-v2'
		})
);

workbox.routing.registerRoute(
	new RegExp('/pages/'),
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'bundesliga-app-v2'
		})
);

self.addEventListener('push', (event) => {
	let body;

	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	let options = {
		body: body,
		icon: 'assets/images/icon-72x72.png',
		vibrate: [100, 50, 100],
		data: {
		dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(
	  self.registration.showNotification('Push Notification', options)
	);
});