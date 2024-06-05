importScripts('/js/indexedDBsw.js');
caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => {
        caches.delete(cacheName);
    });
});

localStorage.clear(); // Para limpiar todos los datos de localStorage
sessionStorage.clear(); // Para limpiar todos los datos de sessionStorage


const CACHE_NAME = 'mi-app-cache-v1';
// Archivos que se deben cachear
const urlsToCache = [
    '/',
    '/js/formRiesgo.js',
    '/icons/icon.png',
    '/js/indexedDB.js',
    '/js/indexedDBsw.js',
    '/js/serviceWorked.js',
    '/index.html'
];

// Instalación del Service Worker y almacenamiento en caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Cache abierto');
            return cache.addAll(urlsToCache);
        })
    );
});

// Intercepta las solicitudes de red y responde desde el caché
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                return response; // Si la respuesta está en caché, retorna desde ahí
            }
            return fetch(event.request); // Si no está en caché, realiza una solicitud de red
        })
    );
});

// Actualiza el Service Worker y gestiona el caché antiguo
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName); // Elimina los cachés antiguos
                    }
                })
            );
        })
    );
});