//Example from Going Offline by Jeremy Keith

const version = '1.1';
const myCache = 'staticfiles';

addEventListener('install', installEvent => {
  installEvent.waitUntil(
    caches.open(myCache)
    .then( myCache => {
      console.log('caching');
      return myCache.addAll([
        '/assets/lucy.jpg',
        '/styles/main.css'
      ]); //end addAll
    }) //end open then
  ); //end wait until
}); //end event listener


addEventListener('fetch', fetchEvent => {
  const request = fetchEvent.request;
	fetchEvent.respondWith(
		caches.match(request)
		.then(responseFromCache => {
      //if the response is cached, grab from myCache
      if (responseFromCache) {
        console.log('returning from cache');
        return responseFromCache;
      } //end if
      //if response isn't in cache, continue with network request
      return fetch(request);
      console.log('returning from network');
	 	}) // end match then
	 	
	 ); // end respondWith
}); // end addEventListener

addEventListener('activate', activateEvent => {
  activateEvent.waitUntil(
    caches.keys()
    .then( cacheNames => {
      return Promise.all(
        cacheNames.map( cacheName => {
          if (cacheName != myCache) {
            return caches.delete(cacheName);
          } //end if
        }) //end map
      ); //end return Promise.all
    }) //end keys then
    .then ( () => {
      return clients.claim();
    }) //end then
  ); //end waitUntil
}); //end event listener