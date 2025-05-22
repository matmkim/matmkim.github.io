---
title: "Curriculum Vitae"
permalink: /cv/
---

--------

<div class="pdf-container">
  <div class="pdf-actions">
    <p class="last-updated">Last Updated: May 2025</p>
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
        document.getElementById('mobile-notice').style.display = 'block';
      }
    });
  </script>
  
  <!-- 모바일 기기를 위한 다운로드 안내 메시지 -->
  <!-- <div id="mobile-notice" class="mobile-pdf-notice" style="display: none;">
    <p>모바일 기기에서는 PDF 뷰어가 제한적으로 작동할 수 있습니다. 최적의 경험을 위해 PDF를 다운로드하여 확인하세요.</p>
  </div> -->
  
  <div class="pdf-viewer">
    <!-- 로딩 표시기 -->
    <div id="pdf-loading" class="pdf-loading">
      <div class="loading-spinner"></div>
      <p>PDF를 불러오는 중입니다...</p>
    </div>
    
    <!-- Google Docs PDF 뷰어 사용 -->
    <iframe id="pdf-iframe" src="https://docs.google.com/viewer?url=https://matmkim.github.io/assets/files/Matthew_Kim_CV.pdf&embedded=true" 
      class="pdf-object" frameborder="0" scrolling="auto"></iframe>
    
    <!-- 대체 링크 -->
    <div id="pdf-fallback" class="mobile-fallback">
      <p>PDF를 불러오는 중 문제가 발생했거나 보이지 않는 경우, <a href="/assets/files/Matthew_Kim_CV.pdf" target="_blank">여기를 클릭하여 직접 열어보세요</a>.</p>
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
  
  /* 로딩 표시기 스타일 */
  .pdf-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    z-index: 10;
  }
  .loading-spinner {
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #3498db;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin-bottom: 15px;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* 모바일 기기를 위한 추가 스타일 */
  @media (max-width: 767px) {
    .pdf-viewer {
      height: 500px; /* 모바일에서는 고정 높이로 변경 */
      overflow: hidden;
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
</style>

<script>
  // PDF 로딩 개선 스크립트
  document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('pdf-iframe');
    const fallback = document.getElementById('pdf-fallback');
    const loading = document.getElementById('pdf-loading');
    let retryCount = 0;
    const maxRetries = 3;
    
    // PDF 미리 로드 - 페이지 로드 즉시 PDF 파일을 미리 가져옵니다
    fetch('/assets/files/Matthew_Kim_CV.pdf', {
      method: 'GET',
      cache: 'no-cache', // 캐시 무시하고 항상 새로 가져오기
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    }).then(response => {
      console.log('PDF 미리 로드 완료');
    }).catch(error => {
      console.error('PDF 미리 로드 실패:', error);
    });
    
    // iframe 로드 완료 이벤트
    iframe.onload = function() {
      // 로딩 표시기 숨기기
      setTimeout(() => {
        loading.style.display = 'none';
      }, 500); // 약간의 지연으로 전환 부드럽게
    };
    
    // 오류 처리 및 재시도 기능
    function checkIframeLoaded() {
      try {
        // iframe 내용 접근 시도
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        
        // 내용이 비어있거나 로드되지 않은 경우
        if (!iframeDoc || iframeDoc.body.innerHTML === '') {
          throw new Error('PDF 로드 실패');
        }
        
        // 로딩 표시기 숨기기
        loading.style.display = 'none';
      } catch (e) {
        console.error('PDF 로드 오류:', e);
        
        // 최대 재시도 횟수에 도달하지 않았으면 재시도
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`PDF 로딩 재시도 ${retryCount}/${maxRetries}`);
          
          // URL에 타임스탬프 추가하여 캐시 방지
          const timestamp = new Date().getTime();
          iframe.src = `https://docs.google.com/viewer?url=https://matmkim.github.io/assets/files/Matthew_Kim_CV.pdf&embedded=true&t=${timestamp}`;
          
          // 3초 후 다시 확인
          setTimeout(checkIframeLoaded, 3000);
        } else {
          // 최대 재시도 횟수 초과 시 대체 메시지 표시
          loading.style.display = 'none';
          fallback.style.display = 'block';
          
          // 직접 PDF 임베드 시도
          iframe.src = '/assets/files/Matthew_Kim_CV.pdf';
        }
      }
    }
    
    // 5초 후 PDF 로드 상태 확인
    setTimeout(checkIframeLoaded, 5000);
  });
</script> 