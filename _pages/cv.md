---
title: "Curriculum Vitae"
permalink: /cv/
---

--------

<div class="pdf-container">
  <div class="pdf-actions">
    <p class="last-updated">Last Updated: Oct 2025</p>
    <a href="/assets/files/Matthew_Kim_CV.pdf" class="btn btn--primary" download>Download CV</a>
  </div>
  
  <!-- 모바일 기기 감지를 위한 스크립트 -->
  <script>
    // 모바일 기기인지 확인하는 함수
    function isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    document.addEventListener('DOMContentLoaded', function() {
      // 모바일 기기에서는 다운로드 권장 메시지 표시
      if (isMobile()) {
        var mobileNoticeEl = document.getElementById('mobile-notice');
        if (mobileNoticeEl) {
          mobileNoticeEl.style.display = 'block';
        }
      }
    });
  </script>
  
  <!-- 모바일 기기를 위한 다운로드 안내 메시지 -->
  <!-- <div id="mobile-notice" class="mobile-pdf-notice" style="display: none;">
    <p>모바일 기기에서는 PDF 뷰어가 제한적으로 작동할 수 있습니다. 최적의 경험을 위해 PDF를 다운로드하여 확인하세요.</p>
  </div> -->
  
  <div class="pdf-viewer">
    <!-- Native browser PDF viewer with preloading -->
    <iframe id="pdf-iframe" src="/assets/files/Matthew_Kim_CV.pdf#toolbar=1&navpanes=0&scrollbar=1&view=FitH&pagemode=none" 
      class="pdf-object" frameborder="0" scrolling="auto" 
      onload="handlePdfLoad()" onerror="handlePdfError()"></iframe>
    <!-- 대체 링크 -->
    <div class="mobile-fallback" id="pdf-fallback" style="display: none;">
      <p>PDF를 불러오는 중 문제가 발생했거나 보이지 않는 경우, <a href="/assets/files/Matthew_Kim_CV.pdf" target="_blank">여기를 클릭하여 직접 열어보세요</a>.</p>
    </div>
    <!-- 로딩 인디케이터 -->
    <div class="pdf-loading" id="pdf-loading">
      <p>PDF를 불러오는 중...</p>
    </div>
  </div>
</div>

<style>
  .pdf-container {
    margin: 0 auto;
    padding: 0;
    width: 100%;
  }
  .pdf-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 0;
    margin-bottom: 10px;
  }
  .last-updated {
    text-align: left;
    font-style: italic;
  }
  .pdf-viewer {
    width: 100%;
    height: 800px; /* PC에서는 고정 높이 사용 */
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    background-color: white; /* PDF 배경색을 흰색으로 고정 */
  }
  .pdf-object {
    display: block;
    border: none;
    width: 100%;
    height: 100%;
  }
  .btn {
    display: inline-block;
    padding: 0.5em 1em;
    font-weight: bold;
    text-decoration: none;
    border-radius: 4px;
    border: 0.5px solid rgb(241.7, 242.5, 243.1) !important;
  }
  .mobile-pdf-notice {
    background-color:rgb(158, 58, 0);
    border: 1px solid #ffeeba;
    color:rgb(188, 188, 188);
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 15px;
    font-size: 0.9em;
    text-align: center;
  }
  .fallback-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 80%;
  }
  
  /* 다크모드 버튼 스타일 직접 지정 (이 부분은 _dark.scss로 이동했으므로 제거) */
  /*
  body[data-skin="dark"] .btn--primary {
    background-color: #6c757d !important; 
    color: #f8f9fa !important; 
  }
  
  body[data-skin="dark"] .btn--primary:hover {
    background-color: #5a6268 !important; 
    color: #ffffff !important;
  }
  */
  
  /* 모바일 기기를 위한 추가 스타일 */
  @media (max-width: 767px) {
    .pdf-viewer {
      height: 500px; /* 모바일에서는 고정 높이로 변경 */
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    .pdf-object {
      height: 100%;
      width: 100%;
    }
    .mobile-fallback {
      display: block; /* 모바일에서는 대체 메시지 표시 */
    }
    .pdf-actions {
      flex-direction: column;
      align-items: flex-start;
    }
    .pdf-actions .btn {
      margin-top: 10px;
      width: 100%;
      text-align: center;
    }
  }
  .mobile-fallback {
    display: none;
    padding: 20px;
    text-align: center;
    background-color: #f8f9fa;
    border-radius: 4px;
    margin-top: 10px;
    font-size: 14px;
  }
  
  .pdf-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 4px;
    z-index: 10;
  }
  
  .pdf-loading.hidden {
    display: none;
  }
</style>

<script>
  // PDF 로딩 상태 관리
  let pdfLoadTimeout;
  let pdfLoaded = false;
  
  // PDF 로드 성공 핸들러
  function handlePdfLoad() {
    console.log('PDF loaded successfully');
    pdfLoaded = true;
    clearTimeout(pdfLoadTimeout);
    document.getElementById('pdf-loading').classList.add('hidden');
  }
  
  // PDF 로드 오류 핸들러
  function handlePdfError() {
    console.log('PDF failed to load');
    clearTimeout(pdfLoadTimeout);
    document.getElementById('pdf-loading').classList.add('hidden');
    document.getElementById('pdf-fallback').style.display = 'block';
  }
  
  // PDF 프리로딩 및 로딩 상태 관리
  document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('pdf-iframe');
    const loading = document.getElementById('pdf-loading');
    const fallback = document.getElementById('pdf-fallback');
    const isIOS = function () { return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; };
    
    // iOS는 Google Docs Viewer 사용 (멀티페이지 지원)
    const pdfAbs = location.origin + '/assets/files/Matthew_Kim_CV.pdf';
    if (isIOS()) {
      iframe.src = 'https://docs.google.com/viewer?embedded=true&url=' + encodeURIComponent(pdfAbs);
    } else {
      // 캐시 버스팅을 위한 타임스탬프 추가 + 네이티브 뷰어
      const timestamp = new Date().getTime();
      const pdfUrl = `/assets/files/Matthew_Kim_CV.pdf?t=${timestamp}#toolbar=1&navpanes=0&scrollbar=1&view=FitH&pagemode=none`;
      iframe.src = pdfUrl;
    }
    
    // Chrome에서 썸네일 숨기기 위한 추가 처리
    iframe.addEventListener('load', function() {
      try {
        // Chrome에서 썸네일 패널 강제 숨김
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc) {
          // 썸네일 패널 요소 찾아서 숨김
          const thumbnails = iframeDoc.querySelectorAll('[data-testid="thumbnails"], .thumbnails, #thumbnails');
          thumbnails.forEach(thumb => {
            thumb.style.display = 'none';
          });
        }
      } catch (e) {
        // 크로스 오리진 정책으로 접근 불가능한 경우 무시
        console.log('PDF iframe access restricted');
      }
    });
    
    // PDF 프리로딩을 위한 링크 생성
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = `/assets/files/Matthew_Kim_CV.pdf?t=${timestamp}`;
    preloadLink.as = 'document';
    document.head.appendChild(preloadLink);
    
    // 10초 후에도 로드되지 않으면 대체 메시지 표시
    pdfLoadTimeout = setTimeout(function() {
      if (!pdfLoaded) {
        console.log('PDF loading timeout');
        loading.classList.add('hidden');
        fallback.style.display = 'block';
      }
    }, 10000);
    
    // iframe 로드 이벤트 리스너 추가
    iframe.addEventListener('load', function() {
      // 추가 검증을 위해 잠시 후 체크
      setTimeout(function() {
        try {
          // iframe이 정상적으로 로드되었는지 확인
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          if (iframeDoc && iframeDoc.readyState === 'complete') {
            handlePdfLoad();
          }
        } catch (e) {
          // 크로스 오리진 정책으로 인한 접근 제한은 정상적인 경우
          // PDF가 로드되었다고 가정
          handlePdfLoad();
        }
      }, 1000);
    });
    
    iframe.addEventListener('error', handlePdfError);
  });
</script> 