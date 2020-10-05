import envConfig from './config';
const {baseUrl} = envConfig();

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: 'workbox-v4.3.1/'})

// cache name
workbox.core.setCacheNameDetails({
    prefix: 'cacheData',
    precache: 'precache',
    runtime: 'runtime',
  });
  
// runtime cache
// 1. stylesheet
workbox.routing.registerRoute(
    new RegExp('\.css$'),
    workbox.strategies.cacheFirst({
        cacheName: 'cacheData-Stylesheets',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
                maxEntries: 20,                 // only cache 20 request
                purgeOnQuotaError: true
            })
        ]
    })
);
// 2. images
workbox.routing.registerRoute(
    new RegExp('\.(png|svg|jpg|jpeg)$'),
    workbox.strategies.cacheFirst({
        cacheName: 'cacheData-Images',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 7,
                maxEntries: 50,
                purgeOnQuotaError: true
            })
        ]
    })
);

// 3. cache api results
workbox.routing.registerRoute(
    new RegExp(baseUrl),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cacheData-api',
        cacheExpiration: {
            maxAgeSeconds: 60 * 30      //cache the API content for 30mn
        }
    })
);

// 4. cache google fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

const precacheManifest = [];
workbox.precaching.precacheAndRoute(precacheManifest);

