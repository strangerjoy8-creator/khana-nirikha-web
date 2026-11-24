const CACHE='khana-nirikha-preview-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./fonts/kalpurush.woff2','./img/dss-logo.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin===location.origin && !u.pathname.includes('/api/')){
    e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request)));
  }
});
