// 서비스 워커 - 버전 기반 캐시 버스팅
const CACHE_VERSION = 'v2';
const CACHE_NAME = 'site-cache-' + CACHE_VERSION + '-{{ site.site_version }}';

// 중요한 자산 파일 목록 
const CRITICAL_ASSETS = [
  '/assets/css/main.css',
  '/assets/css/custom-spacing.css',
  '/assets/js/main.min.js',
  '/index.html',
  '/'
];

// 네트워크 우선, 캐시 폴백 전략을 사용할 URL 패턴
const NETWORK_FIRST_PATTERNS = [
  /\/$/, // 홈페이지 및 하위 경로
  /\.html$/, // HTML 파일
  /\.js$/, // JavaScript 파일
  /\.css$/ // CSS 파일
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
          return cacheName.startsWith('site-cache-') && cacheName !== CACHE_NAME;
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

// URL이 네트워크 우선 패턴과 일치하는지 확인
function shouldUseNetworkFirst(url) {
  const path = new URL(url).pathname;
  return NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(path));
}

// 네트워크 요청 처리
self.addEventListener('fetch', function(event) {
  // 다른 출처의 요청은 무시
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // HTML, CSS, JS 등 중요 자산은 네트워크 우선 전략 사용
  if (shouldUseNetworkFirst(event.request.url)) {
    event.respondWith(
      fetch(event.request)
        .then(function(networkResponse) {
          // 응답이 유효하면 캐시에 저장
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(function() {
          // 네트워크 실패 시 캐시에서 가져오기
          return caches.match(event.request).then(function(response) {
            return response || caches.match('/offline.html');
          });
        })
    );
  } else {
    // 그 외 자원은 캐시 우선 전략 사용
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request).then(function(networkResponse) {
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