self.addEventListener("install", event => {
    console.log("Service Worker installed");
    event.waitUntil(
        caches.open("shorts-cache").then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/manifest.json",
                "/icon.png"
            ]);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
