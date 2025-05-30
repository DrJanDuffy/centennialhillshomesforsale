// Enhanced button and interaction fixes
(function() {
  'use strict';

  function initializeButtons() {
    console.log('🔧 Initializing button functionality...');

    // Fix all buttons and clickable elements
    const clickableSelectors = [
      'button',
      '.btn',
      '[role="button"]',
      'a[href]',
      '.button',
      '.btn-primary',
      '.btn-secondary',
      '.btn-outline',
      '.cta-buttons a',
      '.contact-button',
      '.nav-link',
      '.menu__link'
    ];

    clickableSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);

      elements.forEach(element => {
        // Ensure elements are clickable
        element.style.pointerEvents = 'auto';
        element.style.cursor = 'pointer';
        element.style.userSelect = 'auto';
        element.style.touchAction = 'manipulation';

        // Remove any existing click handlers to avoid conflicts
        element.removeEventListener('click', handleButtonClick);

        // Add universal click handler
        element.addEventListener('click', handleButtonClick, { passive: false });

        // Add hover effects
        element.addEventListener('mouseenter', function() {
          if (!this.disabled) {
            this.style.transform = 'translateY(-1px)';
            this.style.transition = 'all 0.2s ease';
          }
        });

        element.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
        });
      });
    });

    console.log('✅ Button fixes applied to all clickable elements');
  }

  function handleButtonClick(e) {
    console.log('Button clicked:', this.textContent?.trim() || this.className);

    // Don't interfere with normal link navigation
    if (this.tagName === 'A' && this.href && !this.href.includes('javascript:')) {
      return true;
    }

    // Prevent double clicks
    if (this.disabled || this.classList.contains('processing')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Add visual feedback
    this.classList.add('processing');
    this.style.opacity = '0.8';

    setTimeout(() => {
      this.classList.remove('processing');
      this.style.opacity = '';
    }, 500);

    // Handle specific button types
    const buttonText = this.textContent?.toLowerCase() || '';
    const buttonClass = this.className?.toLowerCase() || '';

    // Phone call buttons
    if (buttonText.includes('call') || buttonText.includes('phone') || this.href?.includes('tel:')) {
      if (!this.href?.includes('tel:')) {
        window.location.href = 'tel:+17029031952';
        e.preventDefault();
      }
      return;
    }

    // Contact buttons
    if (buttonText.includes('contact') || buttonText.includes('get in touch')) {
      window.location.href = '/contact';
      e.preventDefault();
      return;
    }

    // Listings buttons
    if (buttonText.includes('browse') || buttonText.includes('view') || buttonText.includes('listing')) {
      window.location.href = '/listings';
      e.preventDefault();
      return;
    }

    // Schedule buttons
    if (buttonText.includes('schedule') || buttonText.includes('appointment')) {
      window.location.href = '/contact';
      e.preventDefault();
      return;
    }

    // Form submit buttons
    if (this.type === 'submit' || buttonClass.includes('submit')) {
      // Let form handle submission
      return true;
    }
  }

  // Fix RealScout widget interactions
  function fixRealScoutInteractions() {
    const realscoutWidgets = document.querySelectorAll('realscout-office-listings');

    realscoutWidgets.forEach(widget => {
      widget.style.pointerEvents = 'auto';
      widget.style.userSelect = 'auto';
      widget.style.touchAction = 'manipulation';
      widget.style.position = 'relative';
      widget.style.zIndex = '2';

      // Monitor for dynamically added content
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(node => {
              if (node.nodeType === 1) {
                fixElementInteractions(node);
              }
            });
          }
        });
      });

      observer.observe(widget, { childList: true, subtree: true });
    });
  }

  function fixElementInteractions(element) {
    // Make sure the element and its children are interactive
    element.style.pointerEvents = 'auto';

    const interactiveElements = element.querySelectorAll('a, button, [role="button"], .listing-card, .property-card');
    interactiveElements.forEach(el => {
      el.style.pointerEvents = 'auto';
      el.style.cursor = 'pointer';
      el.style.userSelect = 'auto';
      el.style.touchAction = 'manipulation';
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initializeButtons();
      fixRealScoutInteractions();
    });
  } else {
    initializeButtons();
    fixRealScoutInteractions();
  }

  // Re-initialize for dynamic content
  const observer = new MutationObserver(function(mutations) {
    let shouldReinitialize = false;

    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1 && (node.querySelector('button, .btn, a') || node.matches('button, .btn, a'))) {
            shouldReinitialize = true;
          }
        });
      }
    });

    if (shouldReinitialize) {
      setTimeout(initializeButtons, 100);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('🚀 Enhanced button fixes loaded successfully!');
})();