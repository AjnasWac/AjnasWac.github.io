'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "cee75bc5c57a715587ffe08f99cbd79f",
"assets/assets/images/account.png": "cafd32bbf665ae5d095c3fc652691fef",
"assets/assets/images/banner1.png": "e9c6628f6e607834a432314b91fa414a",
"assets/assets/images/banner2.png": "6890f42e7e4eeefed89240da932dbbcc",
"assets/assets/images/cart.png": "7e9ec70401a1e0b3b49331689cb44f0f",
"assets/assets/images/categories.png": "cac26b45838facf1ed1d874a59c9dfa4",
"assets/assets/images/facebook.png": "3133b1f8af88b9ffabc67475227a183d",
"assets/assets/images/fav_icon.png": "16c5101d1b824e91178582d294a3f05a",
"assets/assets/images/google.png": "42e6f2d2b917e62257d37a1272f982ec",
"assets/assets/images/home.png": "ca55350fd780ae4b57edf42b4f47e94a",
"assets/assets/images/ic_category1.png": "27c7d16c12b6a5cc837b7587cac29b2c",
"assets/assets/images/ic_category2.png": "da5da9923622c1ebfe6b53c98f494f21",
"assets/assets/images/ic_category3.png": "7517ccdad3553b1758c2c3597613466e",
"assets/assets/images/ic_category4.png": "22e285d68fb442fe9f86fd87f298c11e",
"assets/assets/images/kuwait.png": "ea2ad44c38437ae0af4e4676344f4aea",
"assets/assets/images/new_badge.png": "9cbfdb1018e86b2b7b9884cf7b29806b",
"assets/assets/images/offers.png": "05305c6fe98c678886a08493b2f67f45",
"assets/assets/images/place_holder.png": "ae82bf64558084eb29d2605cb0781b9c",
"assets/assets/images/product_dummy_image.png": "ef799acbd811dfac894bf5c437b75807",
"assets/assets/images/product_dummy_image_wm.png": "f1aec2c8d3547ccdd23988cfc9892868",
"assets/assets/images/search_grey.png": "c46f959e6c3d87d1ed6f7970c9459395",
"assets/assets/images/single_banner1.png": "9a3d6687b4307dd2ba7a3ef2f77c7a7b",
"assets/assets/images/single_banner2.png": "83a95bdcc94eb7d856c6fbade0c6390c",
"assets/assets/images/top_banner.png": "5598331c4d58b9bc0eca4608f87fed86",
"assets/assets/images/trikart_logo.png": "7f09cc6f31b8d4bab5bc16fd0c53e42e",
"assets/assets/images/triKart_logo_1x.png": "720532d7de7153f08905c6be086ceebc",
"assets/assets/images/uae.png": "9fbfc3523e6ce8be4d6f04c055ea9634",
"assets/assets/images/un_fav_icon.png": "d5470db0c5dfd7002fe40326097d1e18",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/NOTICES": "021b771779e32bc41302987413d0a089",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "d8f8e6c7266706ada2e7bd1b5e6c5b9d",
"/": "d8f8e6c7266706ada2e7bd1b5e6c5b9d",
"main.dart.js": "62c84cfa9417e6bdc2d77f4ee9a0396d",
"manifest.json": "0b7f0e9f1bd5381d2a226f5a002300c7",
"version.json": "ad40c4504ce5e32c4303bc6fa8a89209"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
