(function () {
  const PDF_LOAD_TIMEOUT_MS = 10000;
  const PDF_VIEW_OPTIONS = "toolbar=1&navpanes=0&scrollbar=1&view=FitH&pagemode=none";

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  function isGoogleDrivePreview(url) {
    return /^https:\/\/drive\.google\.com\/file\/d\/[^/]+\/preview/i.test(url);
  }

  function init() {
    const container = document.querySelector(".pdf-container[data-pdf-url]");
    const iframe = document.getElementById("pdf-iframe");
    const loading = document.getElementById("pdf-loading");
    const fallback = document.getElementById("pdf-fallback");

    if (!container || !iframe || !loading || !fallback) {
      return;
    }

    let pdfLoaded = false;

    const loadTimeout = setTimeout(function () {
      if (!pdfLoaded) {
        loading.classList.add("hidden");
        fallback.style.display = "block";
      }
    }, PDF_LOAD_TIMEOUT_MS);

    iframe.addEventListener("load", function () {
      pdfLoaded = true;
      clearTimeout(loadTimeout);
      loading.classList.add("hidden");
    });

    // The iframe already points at the PDF from the HTML. Google Drive previews
    // work everywhere as-is; only a self-hosted PDF needs a different viewer.
    const pdfPath = container.getAttribute("data-pdf-url");
    if (isGoogleDrivePreview(pdfPath)) {
      return;
    }

    const pdfUrl = new URL(pdfPath, window.location.href).href;
    if (isIOS()) {
      // iOS Safari cannot scroll a multi-page PDF inside an iframe.
      iframe.src = "https://docs.google.com/viewer?embedded=true&url=" + encodeURIComponent(pdfUrl);
    } else {
      iframe.src = pdfUrl + "#" + PDF_VIEW_OPTIONS;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
