
// jshint esversion:6

var CACHE_STATIC_NAME='static-v1';
var CACHE_DYNAMIC_NAME='dynamic-v1';

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open('static-v4')
    .then((cache)=>{
      console.log("[Service Worker] prefetching App Shell");
      cache.addAll([
        '/',
        '/index.html',
        '/src/js/app.js',
        '/src/js/feed.js',
        '/src/css/app.css',
        '/src/css/feed.css',
        '/src/images/main-image.jpg',
        'https://fonts.googleapis.com/css?family=Roboto:400,700',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
        'https://code.getmdl.io/1.1.3/material.min.js'

      ]);

    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
    .then(function(keyList){
      return Promise.all(keyList.map((key)=>{
        if(key!='static-v4' && key!='dynamic-v2'){
          console.log("[Service Worker] Removing old cache", key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});



self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
      .then((response)=>{
        if(response){
            return response;
        }else{
          return fetch(event.request)
          .then(function(res){
            return caches.open('dynamic-v2')
            .then(function(cache){
              cache.put(event.request.url, res.clone());
                return res;
            });

          })
          .catch(function(err){

          });
          
      }
  

    })

    )
    
  });

  self.addEventListener('notificationclose', function(event){
    console.log("Notification was closed");
  });
  