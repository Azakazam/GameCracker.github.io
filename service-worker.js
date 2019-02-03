var version = 'v1::';
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(function() {
    }, function() {
    });
} else {

}

self.addEventListener("install", function(event) {
    //console.log('WORKER: install event in progress.');
    event.waitUntil(

        caches

        .open(version)
        .then(function(cache) {


            return cache.addAll([
                '/',
                '/data',
                '/images',
                '/design.css',
                '/map.js',
                '/function.js',
                '/index.html',
                '/compare.html',
                '/stock.html',
                '/selection.html',
				'/mapImages',
				'/compare.js',
                '/manifest.webmanifest.json',
                '/game.html'
            ]);
        })
        .then(function() {
            console.log('WORKER: install completed');
        })
    );
});


self.addEventListener("fetch", function(event) {
   // console.log('WORKER: fetch event in progress.');
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches

        .match(event.request)
        .then(function(cached) {
            var networked = fetch(event.request)

                .then(fetchedFromNetwork, unableToResolve)

                .catch(unableToResolve);

            return cached || networked;

            function fetchedFromNetwork(response) {

                var cacheCopy = response.clone();

               // console.log('WORKER: fetch response from network.', event.request.url);

                caches
                    .open(version + 'pages')
                    .then(function add(cache) {
                        cache.put(event.request, cacheCopy);
                    })
                    .then(function() {
                        //console.log('WORKER: fetch response stored in cache.', event.request.url);
                    });

                return response;
            }

            function unableToResolve() {
                return new Response('<h1>This page does not exist</h1>', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({
                        'Content-Type': 'text/html'
                    })
                });
            }
        })
    );
});


self.addEventListener("activate", function(event) {

  //  console.log('WORKER: activate event in progress.');

    event.waitUntil(
        caches

        .keys()
        .then(function(keys) {

            return Promise.all(
                keys
                .filter(function(key) {

                    return !key.startsWith(version);
                })
                .map(function(key) {

                    return caches.delete(key);
                })
            );
        })
        .then(function() {
            console.log('WORKER: activate completed.');
        })
    );
});