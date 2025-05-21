// Skin Switcher for Minimal Mistakes Theme
document.addEventListener('DOMContentLoaded', function() {
  // Create the toggle button
  const toggleButton = document.createElement('button');
  toggleButton.id = 'skin-toggle';
  toggleButton.setAttribute('aria-label', 'Toggle Dark/Light Mode');
  toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
  toggleButton.title = 'Toggle Dark/Light Mode';
  document.body.appendChild(toggleButton);
  
  // Check for saved preference
  const currentSkin = localStorage.getItem('mm-skin') || 'default';
  
  // Apply the saved skin
  applySkin(currentSkin);
  
  // Update button icon based on current skin
  updateButtonIcon(currentSkin);
  
  // Add click event to toggle button
  toggleButton.addEventListener('click', function() {
    const currentSkin = document.body.getAttribute('data-skin') || 'default';
    const newSkin = currentSkin === 'dark' ? 'default' : 'dark';
    
    applySkin(newSkin);
    updateButtonIcon(newSkin);
    
    // Save preference to localStorage
    localStorage.setItem('mm-skin', newSkin);
  });
  
  // Function to apply skin
  function applySkin(skin) {
    // Remove existing skin stylesheet
    const existingLink = document.querySelector('link[data-skin]');
    if (existingLink) {
      existingLink.remove();
    }
    
    // Add new skin stylesheet
    if (skin !== 'default') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `/assets/css/skins/${skin}.css`;
      link.setAttribute('data-skin', skin);
      document.head.appendChild(link);
    }
    
    // Set data attribute on body
    document.body.setAttribute('data-skin', skin);
  }
  
  // Function to update button icon
  function updateButtonIcon(skin) {
    if (skin === 'dark') {
      toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
      toggleButton.title = 'Switch to Light Mode';
    } else {
      toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
      toggleButton.title = 'Switch to Dark Mode';
    }
  }
}); 