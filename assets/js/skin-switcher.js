(function () {
  const STORAGE_KEY = "mm-skin";
  const DARK_SKIN = "dark";
  const DEFAULT_SKIN = "default";
  const scriptUrl = document.currentScript && document.currentScript.src;
  const skinBaseUrl = scriptUrl ? new URL("../css/skins/", scriptUrl).toString() : "/assets/css/skins/";

  function normalizeSkin(skin) {
    return skin === DARK_SKIN ? DARK_SKIN : DEFAULT_SKIN;
  }

  function storedSkin() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function saveSkin(skin) {
    try {
      localStorage.setItem(STORAGE_KEY, skin);
    } catch (error) {
      // Ignore storage errors in private browsing or restricted contexts.
    }
  }

  function skinStylesheetUrl(skin) {
    return new URL(skin + ".css", skinBaseUrl).toString();
  }

  function applySkin(skin) {
    skin = normalizeSkin(skin);

    const existingLink = document.querySelector("link[data-skin]");
    if (existingLink) {
      existingLink.remove();
    }

    if (skin !== DEFAULT_SKIN) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = skinStylesheetUrl(skin);
      link.setAttribute("data-skin", skin);
      document.head.appendChild(link);
    }

    if (document.body) {
      document.body.setAttribute("data-skin", skin);
    }
  }

  function preferredSkin() {
    return normalizeSkin(storedSkin());
  }

  // Apply stored skin as early as possible to reduce mode-switch flash.
  applySkin(preferredSkin());

  document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.createElement("button");
    toggleButton.id = "skin-toggle";
    toggleButton.setAttribute("aria-label", "Toggle dark and light mode");
    toggleButton.title = "Toggle dark and light mode";
    document.body.appendChild(toggleButton);

    function updateButtonIcon(skin) {
      if (skin === DARK_SKIN) {
        toggleButton.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
        toggleButton.setAttribute("aria-label", "Switch to light mode");
        toggleButton.title = "Switch to light mode";
      } else {
        toggleButton.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
        toggleButton.setAttribute("aria-label", "Switch to dark mode");
        toggleButton.title = "Switch to dark mode";
      }
    }

    let skin = preferredSkin();
    applySkin(skin);
    updateButtonIcon(skin);

    toggleButton.addEventListener("click", function () {
      const currentSkin = normalizeSkin(document.body.getAttribute("data-skin"));
      const newSkin = currentSkin === DARK_SKIN ? DEFAULT_SKIN : DARK_SKIN;
      applySkin(newSkin);
      updateButtonIcon(newSkin);
      saveSkin(newSkin);
    });
  });
})();
