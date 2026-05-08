// Nome della cache — cambia versione quando aggiorni l'app
const CACHE_NAME = "wine-inventory-v1";

// File da mettere in cache
const FILES_TO_CACHE = [
  "/wine-inventory/",
  "/wine-inventory/index.html",
  "/wine-inventory/style.css",
  "/wine-inventory/script.js",
  "/wine-inventory/manifest.json"
];

// INSTALL — salva i file in cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// ACTIVATE — pulisce le cache vecchie
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// FETCH — serve i file dalla cache quando offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});