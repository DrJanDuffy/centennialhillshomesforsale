
// Universal button fix script
(function() {
  'use strict';
  
  function initializeButtons() {
    console.log('Initializing button functionality...');
    
    // Fix all buttons
    const buttons = document.querySelectorAll('button, .btn, [role="button"]');
    buttons.forEach(button => {
      // Ensure buttons are clickable
      button.style.cursor = 'pointer';
      button.style.pointerEvents = 'auto';
      
      // Add click handler if none exists
      if (!button.onclick && !button.getAttribute('href')) {
        button.addEventListener('click', function(e) {
          console.log('Button clicked:', this.textContent || this.className);
          
          // Handle specific button types
          if (this.textContent.includes('Call') || this.textContent.includes('📞')) {
            window.location.href = 'tel:+17029031952';
          } else if (this.textContent.includes('Contact')) {
            window.location.href = '/contact';
          } else if (this.textContent.includes('Browse') || this.textContent.includes('View')) {
            window.location.href = '/listings';
          } else if (this.textContent.includes('Schedule')) {
            window.location.href = '/contact';
          }
        });
      }
    });
    
    // Fix navigation buttons
    const navButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    navButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        if (this.tagName === 'A') return; // Let anchor tags work normally
        
        // Prevent double-clicks
        if (this.disabled) return;
        this.disabled = true;
        setTimeout(() => this.disabled = false, 1000);
        
        console.log('Navigation button clicked:', this.textContent);
      });
    });
    
    // Fix phone links
    const phoneLinks = document.querySelectorAll('a[href^="tel:"], [href*="903-1952"]');
    phoneLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        console.log('Phone link clicked:', this.href);
        // Force the call action
        window.location.href = this.href;
      });
    });
    
    // Fix form buttons
    const formButtons = document.querySelectorAll('form button, form .btn');
    formButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        console.log('Form button clicked:', this.type || 'button');
        if (this.type === 'submit') {
          // Let form handle submission
          return;
        }
      });
    });
    
    console.log('Button initialization complete!');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeButtons);
  } else {
    initializeButtons();
  }
  
  // Re-initialize for dynamic content
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        initializeButtons();
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
