// 서비스 워커 - 버전 기반 캐시 버스팅
const CACHE_VERSION = 'v1-{{ site.site_version }}';
const CACHE_NAME = 'style-cache-' + CACHE_VERSION;

// 중요한 스타일 파일 목록 
const CRITICAL_ASSETS = [
  '/assets/css/main.css',
  '/assets/css/custom-spacing.css',
  '/assets/css/skins/dark.css'
];

// 서비스 워커 설치
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('캐시 생성:', CACHE_NAME);
      return cache.addAll(CRITICAL_ASSETS);
    }).then(function() {
      // 즉시 활성화
      return self.skipWaiting();
    })
  );
});

// 활성화 시 이전 캐시 제거
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // 현재 버전이 아닌 캐시 삭제
          return cacheName.startsWith('style-cache-') && cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          console.log('이전 캐시 삭제:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      // 제어하는 모든 클라이언트에 대한 제어권 획득
      return self.clients.claim();
    })
  );
});

// 네트워크 요청 처리 (캐시 우선, 실패 시 네트워크)
self.addEventListener('fetch', function(event) {
  // CSS 파일 요청만 처리
  if (event.request.url.includes('/assets/css/')) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        // 캐시에 있으면 캐시에서 응답
        if (response) {
          return response;
        }
        
        // 캐시에 없으면 네트워크에서 가져오기
        return fetch(event.request).then(function(networkResponse) {
          // 응답이 유효하면 캐시에 저장
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
  }
}); 