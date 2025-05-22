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
    <!-- PDF 표시를 위해 iframe 태그 사용 -->
    <iframe src="/assets/files/Matthew_Kim_CV.pdf" width="100%" height="100%" class="pdf-object" frameborder="0">
      <div class="fallback-message">
        <p>PDF를 표시할 수 없습니다. <a href="/assets/files/Matthew_Kim_CV.pdf" download>여기를 클릭하여 PDF 파일을 다운로드하세요.</a></p>
      </div>
    </iframe>
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
    margin-top: 10px !important;
    text-align: left;
    font-style: italic;
  }
  .pdf-viewer {
    width: 100%;
    height: 800px; /* 고정 높이 설정 */
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
      height: 500px; /* 모바일에서는 더 작은 고정 높이 */
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
</style> 