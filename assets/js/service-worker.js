---
layout: null
---
// 서비스 워커 - 버전 기반 캐시 버스팅
const CACHE_VERSION = 'v6';
// 타임스탬프 추가하여 항상 고유한 캐시 이름 사용
const TIMESTAMP = '{{ site.time | date: "%s" }}';
const SITE_VERSION = '{{ site.site_version }}';
const CACHE_NAME = `site-cache-${CACHE_VERSION}-${SITE_VERSION}-${TIMESTAMP}`;

// 중요한 자산 파일 목록 
const CRITICAL_ASSETS = [
  '/assets/css/main.css',
  '/assets/css/custom-spacing.css',
  '/assets/js/main.min.js',
  '/index.html',
  '/',
  '/offline.html'
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
  console.log('[ServiceWorker] 설치중... 버전:', CACHE_VERSION, '사이트 버전:', SITE_VERSION);
  
  // 즉시 활성화를 위한 대기 건너뛰기
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[ServiceWorker] 캐시 생성:', CACHE_NAME);
      return cache.addAll(CRITICAL_ASSETS);
    })
  );
});

// 활성화 시 이전 캐시 제거
self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] 활성화...');
  
  // 모든 클라이언트에 대한 제어권 획득
  event.waitUntil(self.clients.claim());
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // 현재 버전이 아닌 캐시 삭제
          return cacheName.startsWith('site-cache-') && cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          console.log('[ServiceWorker] 이전 캐시 삭제:', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// URL이 네트워크 우선 패턴과 일치하는지 확인
function shouldUseNetworkFirst(url) {
  const path = new URL(url).pathname;
  return NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(path));
}

// 모바일 디바이스를 위한 특별 처리
function isMobileBrowser(userAgent) {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

// 네트워크 요청 처리
self.addEventListener('fetch', function(event) {
  // 다른 출처의 요청은 무시
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // 모바일 브라우저 감지
  const isMobile = event.request.headers.get('user-agent') && 
                   isMobileBrowser(event.request.headers.get('user-agent'));
  
  // HTML, CSS, JS 등 중요 자산 또는 모바일 브라우저는 네트워크 우선 전략 사용
  if (shouldUseNetworkFirst(event.request.url) || isMobile) {
    console.log(`[ServiceWorker] 네트워크 우선 전략: ${event.request.url} (모바일:${isMobile})`);
    
    event.respondWith(
      fetch(event.request, {
        // 캐시 무시 - 항상 네트워크에서 가져오기
        cache: 'no-store',
        // 브라우저에서 보낸 캐시 헤더 무시
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      .then(function(networkResponse) {
        // 응답이 유효하면 캐시에 저장
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            // 요청을 그대로 캐시 (URL 파라미터 제거하지 않음)
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(function() {
        // 네트워크 실패 시 캐시에서 가져오기
        console.log('[ServiceWorker] 네트워크 실패, 캐시에서 가져오기:', event.request.url);
        return caches.match(event.request).then(function(response) {
          return response || caches.match('/offline.html');
        });
      })
    );
  } else {
    // 그 외 자원은 캐시 우선 전략 사용
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(function(networkResponse) {
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