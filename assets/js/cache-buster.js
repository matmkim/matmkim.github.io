// 캐시 버스팅을 위한 클라이언트 사이드 스크립트
(function() {
  // 마지막 방문 시간 저장 키
  const LAST_VISIT_KEY = 'site_last_visit';
  // 현재 사이트 버전
  const SITE_VERSION = '{{ site.site_version }}' || '1.0.0';
  // 마지막으로 확인한 사이트 버전
  const LAST_VERSION_KEY = 'site_version';
  // 확인 간격 (1시간 = 3600000 밀리초) - 더 짧게 설정
  const CHECK_INTERVAL = 3600000;
  
  // 현재 시간
  const now = new Date().getTime();
  
  try {
    // 저장된 마지막 방문 시간과 버전 가져오기
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY) || 0;
    const lastVersion = localStorage.getItem(LAST_VERSION_KEY) || '';
    
    // 현재 방문 시간 저장
    localStorage.setItem(LAST_VISIT_KEY, now);
    
    // 강제 새로고침 함수
    function forceRefresh() {
      // 현재 버전 저장
      localStorage.setItem(LAST_VERSION_KEY, SITE_VERSION);
      
      // URL에 타임스탬프 쿼리 파라미터 추가하여 캐시 우회
      const reloadUrl = location.href.split('?')[0] + 
        (location.href.split('?')[0].includes('?') ? '&' : '?') + 
        't=' + now;
      
      // 페이지 교체
      location.replace(reloadUrl);
    }
    
    // 버전이 다르거나 마지막 방문 후 일정 시간이 지났으면 페이지 새로고침
    if (lastVersion !== SITE_VERSION || (now - parseInt(lastVisit, 10) > CHECK_INTERVAL)) {
      // 문서가 이미 로드되었으면 바로 새로고침, 아니면 로드 이벤트 후 실행
      if (document.readyState === 'complete') {
        forceRefresh();
      } else {
        window.addEventListener('load', forceRefresh);
      }
    }
  } catch (err) {
    console.error('캐시 버스팅 오류:', err);
  }
})(); 