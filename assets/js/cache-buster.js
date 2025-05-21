// 캐시 버스팅을 위한 클라이언트 사이드 스크립트
(function() {
  // 마지막 방문 시간 저장 키
  const LAST_VISIT_KEY = 'site_last_visit';
  // 현재 사이트 버전
  const SITE_VERSION = '{{ site.site_version }}';
  // 마지막으로 확인한 사이트 버전
  const LAST_VERSION_KEY = 'site_version';
  // 확인 간격 (6시간 = 21600000 밀리초)
  const CHECK_INTERVAL = 21600000;
  
  // 현재 시간
  const now = new Date().getTime();
  
  // 저장된 마지막 방문 시간과 버전 가져오기
  const lastVisit = localStorage.getItem(LAST_VISIT_KEY) || 0;
  const lastVersion = localStorage.getItem(LAST_VERSION_KEY) || '';
  
  // 현재 방문 시간 저장
  localStorage.setItem(LAST_VISIT_KEY, now);
  
  // 버전이 다르거나 마지막 방문 후 일정 시간이 지났으면 페이지 새로고침
  if (lastVersion !== SITE_VERSION || (now - lastVisit > CHECK_INTERVAL)) {
    // 사용자 경험 향상을 위해 페이지 로드 후에 새로고침
    window.addEventListener('load', function() {
      // 현재 버전 저장
      localStorage.setItem(LAST_VERSION_KEY, SITE_VERSION);
      
      // 페이지가 이미 캐시에서 로드된 경우 새로고침
      if (performance.navigation.type !== 1) {  // 1은 새로고침을 의미
        // URL에 타임스탬프 쿼리 파라미터 추가하여 캐시 우회
        const reloadUrl = location.href.split('?')[0] + '?t=' + now;
        location.replace(reloadUrl);
      }
    });
  }
})(); 