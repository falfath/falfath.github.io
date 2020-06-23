if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
		.register("/service-worker.js")
		.then(() => {
			console.log("ServiceWorker registered successfully.");
		})
		.catch(() => {
			console.log("ServiceWorker register failed.");
		});
	});

} else {
	console.log("ServiceWorker is not supported.");
}

if ("Notification" in window) {
	Notification.requestPermission().then((result) => {
        if (result === "denied") {
          console.log("Notification feature is not allowed.");
          return;
        } else if (result === "default") {
          console.error("Permission request dialog closed by user.");
          return;
		}
		
		if (('PushManager' in window)) {
			navigator.serviceWorker.getRegistration().then((registration) => {
				registration.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array("BDc1rx4F_Gd2anygj7RitO2_MrQPeggmR9305YQOuKrT8kJ0yIqAuJ2oLbSyyu4E1bVmqxQCn7ifqc7ACR40ZZM")
				}).then((subscribe) => {
					console.log('Successfully subscribed with endpoint: ', subscribe.endpoint);
					console.log('Successfully subscribed with p256dh key: ', btoa(String.fromCharCode.apply(
						null, new Uint8Array(subscribe.getKey('p256dh')))));
					console.log('Successfully subscribed with auth key: ', btoa(String.fromCharCode.apply(
						null, new Uint8Array(subscribe.getKey('auth')))));
				}).catch((e) => {
					console.error('Unable to subscribe ', e.message);
				});
			});
		}
	});
} else {
	console.error("Notifications is not supported.");
}