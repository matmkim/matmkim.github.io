// Skin Switcher for Minimal Mistakes Theme
(function () {
  function applySkin(skin) {
    const existingLink = document.querySelector("link[data-skin]");
    if (existingLink) {
      existingLink.remove();
    }

    if (skin !== "default") {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/assets/css/skins/" + skin + ".css";
      link.setAttribute("data-skin", skin);
      document.head.appendChild(link);
    }

    if (document.body) {
      document.body.setAttribute("data-skin", skin);
    }
  }

  function preferredSkin() {
    return localStorage.getItem("mm-skin") || "default";
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
      if (skin === "dark") {
        toggleButton.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
        toggleButton.title = "Switch to light mode";
      } else {
        toggleButton.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
        toggleButton.title = "Switch to dark mode";
      }
    }

    let skin = preferredSkin();
    applySkin(skin);
    updateButtonIcon(skin);

    toggleButton.addEventListener("click", function () {
      const currentSkin = document.body.getAttribute("data-skin") || "default";
      const newSkin = currentSkin === "dark" ? "default" : "dark";
      applySkin(newSkin);
      updateButtonIcon(newSkin);
      localStorage.setItem("mm-skin", newSkin);
    });
  });
})();