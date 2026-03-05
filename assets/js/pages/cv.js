(function () {
  let pdfLoadTimeout;
  let pdfLoaded = false;

  function handlePdfLoad(loadingEl) {
    pdfLoaded = true;
    clearTimeout(pdfLoadTimeout);
    if (loadingEl) {
      loadingEl.classList.add("hidden");
    }
  }

  function handlePdfError(loadingEl, fallbackEl) {
    clearTimeout(pdfLoadTimeout);
    if (loadingEl) {
      loadingEl.classList.add("hidden");
    }
    if (fallbackEl) {
      fallbackEl.style.display = "block";
    }
  }

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
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
    const pdfAbs = location.origin + pdfPath;
    const timestamp = Date.now();

    if (isIOS()) {
      iframe.src = "https://docs.google.com/viewer?embedded=true&url=" + encodeURIComponent(pdfAbs);
    } else {
      iframe.src = pdfPath + "?t=" + timestamp + "#toolbar=1&navpanes=0&scrollbar=1&view=FitH&pagemode=none";
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

    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.href = pdfPath + "?t=" + timestamp;
    preloadLink.as = "document";
    document.head.appendChild(preloadLink);

    pdfLoadTimeout = setTimeout(function () {
      if (!pdfLoaded) {
        loading.classList.add("hidden");
        fallback.style.display = "block";
      }
    }, 10000);

    iframe.addEventListener("load", function () {
      setTimeout(function () {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          if (iframeDoc && iframeDoc.readyState === "complete") {
            handlePdfLoad(loading);
          }
        } catch (e) {
          handlePdfLoad(loading);
        }
      }, 1000);
    });

    iframe.addEventListener("error", function () {
      handlePdfError(loading, fallback);
    });
  });
})();
