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

  function isAbsoluteUrl(url) {
    return /^https?:\/\//i.test(url);
  }

  function isGoogleDrivePreview(url) {
    return /^https:\/\/drive\.google\.com\/file\/d\/[^/]+\/preview/i.test(url);
  }

  function toAbsoluteUrl(url) {
    return new URL(url, location.href).href;
  }

  function addCacheBuster(url, timestamp) {
    const separator = url.indexOf("?") === -1 ? "?" : "&";
    return url + separator + "t=" + timestamp;
  }

  function withPdfFragment(url) {
    return url + "#toolbar=1&navpanes=0&scrollbar=1&view=FitH&pagemode=none";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".pdf-container[data-pdf-url]");
    const iframe = document.getElementById("pdf-iframe");
    const loading = document.getElementById("pdf-loading");
    const fallback = document.getElementById("pdf-fallback");

    if (!container || !iframe || !loading || !fallback) {
      return;
    }

    const pdfPath = container.getAttribute("data-pdf-url") || "/assets/files/Matthew_Kim_CV.pdf";
    const pdfAbs = toAbsoluteUrl(pdfPath);
    const timestamp = Date.now();
    const isExternal = isAbsoluteUrl(pdfPath);

    if (isGoogleDrivePreview(pdfPath)) {
      iframe.src = pdfPath;
    } else if (isIOS()) {
      iframe.src = "https://docs.google.com/viewer?embedded=true&url=" + encodeURIComponent(pdfAbs);
    } else {
      iframe.src = withPdfFragment(addCacheBuster(pdfPath, timestamp));
    }

    iframe.addEventListener("load", function () {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc) {
          const thumbnails = iframeDoc.querySelectorAll("[data-testid='thumbnails'], .thumbnails, #thumbnails");
          thumbnails.forEach(function (thumb) {
            thumb.style.display = "none";
          });
        }
      } catch (e) {
        // Ignore cross-origin restrictions from embedded PDF viewers.
      }
    });

    if (!isExternal) {
      const preloadLink = document.createElement("link");
      preloadLink.rel = "preload";
      preloadLink.href = addCacheBuster(pdfPath, timestamp);
      preloadLink.as = "document";
      document.head.appendChild(preloadLink);
    }

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
