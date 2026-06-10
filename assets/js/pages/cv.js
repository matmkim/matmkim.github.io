(function () {
  const PDF_LOAD_TIMEOUT_MS = 10000;
  const PDF_LOAD_SETTLE_MS = 1000;
  const PDF_VIEW_OPTIONS = "toolbar=1&navpanes=0&scrollbar=1&view=FitH&pagemode=none";
  const DEFAULT_PDF_PATH = "/assets/files/Matthew_Kim_CV.pdf";

  function hideLoading(loadingEl) {
    if (loadingEl) {
      loadingEl.classList.add("hidden");
    }
  }

  function showFallback(loadingEl, fallbackEl) {
    hideLoading(loadingEl);
    if (fallbackEl) {
      fallbackEl.style.display = "block";
    }
  }

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  function pdfUrlWithCacheBust(pdfPath) {
    const url = new URL(pdfPath, window.location.href);
    url.searchParams.set("t", Date.now());
    return url;
  }

  function hideNativePdfSidebar(iframe) {
    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      if (!iframeDoc) {
        return;
      }

      const thumbnails = iframeDoc.querySelectorAll("[data-testid='thumbnails'], .thumbnails, #thumbnails");
      thumbnails.forEach(function (thumb) {
        thumb.style.display = "none";
      });
    } catch (error) {
      // Ignore cross-origin restrictions from embedded PDF viewers.
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".pdf-container[data-pdf-url]");
    const iframe = document.getElementById("pdf-iframe");
    const loading = document.getElementById("pdf-loading");
    const fallback = document.getElementById("pdf-fallback");

    if (!container || !iframe || !loading || !fallback) {
      return;
    }

    const pdfPath = container.getAttribute("data-pdf-url") || DEFAULT_PDF_PATH;
    const pdfUrl = pdfUrlWithCacheBust(pdfPath);
    const pdfDocumentUrl = pdfUrl.toString();
    let pdfLoaded = false;

    function finishLoad() {
      pdfLoaded = true;
      clearTimeout(loadTimeout);
      hideLoading(loading);
    }

    if (isIOS()) {
      iframe.src = "https://docs.google.com/viewer?embedded=true&url=" + encodeURIComponent(pdfDocumentUrl);
    } else {
      pdfUrl.hash = PDF_VIEW_OPTIONS;
      iframe.src = pdfUrl.toString();
    }

    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.href = pdfDocumentUrl;
    preloadLink.as = "document";
    document.head.appendChild(preloadLink);

    const loadTimeout = setTimeout(function () {
      if (!pdfLoaded) {
        showFallback(loading, fallback);
      }
    }, PDF_LOAD_TIMEOUT_MS);

    iframe.addEventListener("load", function () {
      hideNativePdfSidebar(iframe);

      setTimeout(function () {
        finishLoad();
      }, PDF_LOAD_SETTLE_MS);
    });

    iframe.addEventListener("error", function () {
      clearTimeout(loadTimeout);
      showFallback(loading, fallback);
    });
  });
})();
