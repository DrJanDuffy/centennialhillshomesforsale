// Enhanced button and interaction fixes
(function() {
  'use strict';

  console.log('🔧 Loading comprehensive button fixes...');

// Add error handling wrapper
try {

  // Global button fix configuration
  const BUTTON_CONFIG = {
    selectors: [
      'button',
      '.btn',
      '.button',
      '[role="button"]',
      'a[href]',
      '.btn-primary',
      '.btn-secondary',
      '.btn-outline',
      '.cta-buttons a',
      '.contact-button',
      '.nav-link',
      '.menu__link',
      '.phone-number',
      '.contact-buttons a',
      '.fallback-buttons a',
      '.area-tag',
      '.neighborhood-link',
      '.quick-search-card',
      '.menu-toggle',
      'input[type="submit"]',
      'input[type="button"]',
      '.form-button',
      '.search-button',
      '.submit-button'
    ],
    excludeSelectors: [
      '.disabled',
      '[disabled]',
      '.non-interactive'
    ]
  };

  // Universal button fixer
  function makeElementClickable(element) {
    if (!element || element.dataset.buttonFixed === 'true') return;

    // Skip if explicitly excluded
    const isExcluded = BUTTON_CONFIG.excludeSelectors.some(selector => 
      element.matches(selector) || element.closest(selector)
    );
    if (isExcluded) return;

    // Core interaction properties
    element.style.pointerEvents = 'auto';
    element.style.cursor = 'pointer';
    element.style.userSelect = 'auto';
    element.style.touchAction = 'manipulation';
    element.style.position = element.style.position || 'relative';
    element.style.zIndex = element.style.zIndex || '1';

    // Remove conflicting CSS that might block interactions
    element.style.webkitTouchCallout = 'default';
    element.style.webkitUserSelect = 'auto';
    element.style.mozUserSelect = 'auto';
    element.style.msUserSelect = 'auto';

    // Ensure the element is not behind overlays
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.position === 'static') {
      element.style.position = 'relative';
    }

    // Mark as fixed
    element.dataset.buttonFixed = 'true';

    // Add event listener if not already present
    if (!element.dataset.clickHandlerAdded) {
      element.addEventListener('click', handleUniversalClick, { passive: false });
      element.dataset.clickHandlerAdded = 'true';
    }

    // Add hover effects for better UX
    if (!element.dataset.hoverAdded) {
      element.addEventListener('mouseenter', function() {
        if (!this.disabled && !this.classList.contains('disabled')) {
          this.style.transform = 'translateY(-1px)';
          this.style.transition = 'all 0.2s ease';
        }
      });

      element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });

      element.dataset.hoverAdded = 'true';
    }
  }

  // Universal click handler
  function handleUniversalClick(e) {
    const element = e.currentTarget;

    console.log('🖱️ Button clicked:', {
      element: element.tagName,
      text: element.textContent?.trim().substring(0, 50) || 'No text',
      className: element.className,
      href: element.href,
      type: element.type
    });

    // Prevent double clicks on disabled elements
    if (element.disabled || element.classList.contains('disabled') || element.classList.contains('processing')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Handle different element types appropriately
    const tagName = element.tagName.toLowerCase();
    const elementType = element.type?.toLowerCase();
    const href = element.href;
    const buttonText = element.textContent?.toLowerCase().trim() || '';

    // Handle form submissions
    if (elementType === 'submit' || element.closest('form')) {
      if (tagName === 'button' && elementType === 'submit') {
        // Let form handle submission naturally
        return true;
      }
    }

    // Handle navigation links
    if (tagName === 'a' && href) {
      // Phone links
      if (href.includes('tel:')) {
        window.location.href = href;
        return true;
      }

      // Email links
      if (href.includes('mailto:')) {
        window.location.href = href;
        return true;
      }

      // External links
      if (href.startsWith('http') && !href.includes(window.location.hostname)) {
        window.open(href, '_blank', 'noopener,noreferrer');
        e.preventDefault();
        return false;
      }

      // Internal navigation - let Next.js handle it
      if (href.startsWith('/') || href.includes(window.location.hostname)) {
        return true;
      }
    }

    // Handle special button actions based on text content
    if (buttonText.includes('call') || buttonText.includes('phone')) {
      window.location.href = 'tel:+17029031952';
      e.preventDefault();
      return false;
    }

    if (buttonText.includes('contact') || buttonText.includes('get in touch')) {
      window.location.href = '/contact';
      e.preventDefault();
      return false;
    }

    if (buttonText.includes('listing') || buttonText.includes('browse') || buttonText.includes('view properties')) {
      window.location.href = '/listings';
      e.preventDefault();
      return false;
    }

    if (buttonText.includes('schedule') || buttonText.includes('appointment')) {
      window.location.href = '/contact';
      e.preventDefault();
      return false;
    }

    // Handle refresh buttons
    if (buttonText.includes('refresh') || buttonText.includes('reload')) {
      window.location.reload();
      e.preventDefault();
      return false;
    }

    // Add visual feedback for any button click
    addClickFeedback(element);

    return true;
  }

  // Add visual feedback for button clicks
  function addClickFeedback(element) {
    if (element.classList.contains('processing')) return;

    element.classList.add('processing');
    element.style.opacity = '0.8';
    element.style.transform = 'scale(0.98)';

    setTimeout(() => {
      element.classList.remove('processing');
      element.style.opacity = '';
      element.style.transform = '';
    }, 200);
  }

  // Fix all buttons on the page
  function initializeAllButtons() {
    console.log('🔧 Initializing all button interactions...');

    // Get all potential clickable elements
    const allElements = [];

    BUTTON_CONFIG.selectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        allElements.push(...elements);
      } catch (error) {
        console.warn('Invalid selector:', selector, error);
      }
    });

    // Remove duplicates
    const uniqueElements = [...new Set(allElements)];

    console.log(`🎯 Found ${uniqueElements.length} potential clickable elements`);

    // Fix each element
    uniqueElements.forEach(element => {
      try {
        makeElementClickable(element);
      } catch (error) {
        console.warn('Error fixing element:', element, error);
      }
    });

    console.log('✅ All button interactions initialized');
  }

  // RealScout widget specific fixes
  function fixRealScoutWidgets() {
    const widgets = document.querySelectorAll('realscout-office-listings');

    widgets.forEach(widget => {
      // Make the widget container interactive
      widget.style.pointerEvents = 'auto';
      widget.style.userSelect = 'auto';
      widget.style.touchAction = 'manipulation';
      widget.style.position = 'relative';
      widget.style.zIndex = '2';

      // Monitor for dynamic content
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
              makeElementClickable(node);

              // Fix all interactive elements within the node
              const interactiveElements = node.querySelectorAll('a, button, [role="button"], .listing-card, .property-card');
              interactiveElements.forEach(makeElementClickable);
            }
          });
        });
      });

      observer.observe(widget, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      });

      // Initial fix for existing content
      const existingInteractives = widget.querySelectorAll('a, button, [role="button"], .listing-card, .property-card');
      existingInteractives.forEach(makeElementClickable);
    });
  }

  // Navigation menu fixes
  function fixNavigationMenus() {
    // Mobile menu toggle
    const menuToggles = document.querySelectorAll('.menu-toggle');
    menuToggles.forEach(toggle => {
      makeElementClickable(toggle);

      // Ensure menu toggle functionality
      if (!toggle.dataset.menuHandlerAdded) {
        toggle.addEventListener('click', function(e) {
          e.preventDefault();
          const nav = document.querySelector('.nav');
          const overlay = document.querySelector('.nav-overlay');

          if (nav) {
            nav.classList.toggle('nav--open');
            this.classList.toggle('active');

            if (overlay) {
              overlay.style.display = nav.classList.contains('nav--open') ? 'block' : 'none';
            }
          }
        });
        toggle.dataset.menuHandlerAdded = 'true';
      }
    });

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(makeElementClickable);

    // Close mobile menu when clicking overlay
    const overlays = document.querySelectorAll('.nav-overlay');
    overlays.forEach(overlay => {
      overlay.addEventListener('click', function() {
        const nav = document.querySelector('.nav');
        const toggle = document.querySelector('.menu-toggle');

        if (nav) nav.classList.remove('nav--open');
        if (toggle) toggle.classList.remove('active');
        this.style.display = 'none';
      });
    });
  }

  // Fix form elements
  function fixFormElements() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      const submitButtons = form.querySelectorAll('button[type="submit"], input[type="submit"], .submit-button');
      submitButtons.forEach(button => {
        makeElementClickable(button);

        // Ensure form submission works
        if (!button.dataset.formHandlerAdded) {
          button.addEventListener('click', function(e) {
            if (this.type === 'submit' || this.classList.contains('submit-button')) {
              // Let the browser handle form submission
              return true;
            }
          });
          button.dataset.formHandlerAdded = 'true';
        }
      });
    });
  }

  // Monitor for dynamically added content
  function setupDynamicContentMonitoring() {
    const observer = new MutationObserver(mutations => {
      let hasNewButtons = false;

      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            // Check if the node itself is a button
            const isButton = BUTTON_CONFIG.selectors.some(selector => {
              try {
                return node.matches && node.matches(selector);
              } catch (e) {
                return false;
              }
            });

            if (isButton) {
              makeElementClickable(node);
              hasNewButtons = true;
            }

            // Check for buttons within the node
            BUTTON_CONFIG.selectors.forEach(selector => {
              try {
                const buttons = node.querySelectorAll ? node.querySelectorAll(selector) : [];
                if (buttons.length > 0) {
                  buttons.forEach(makeElementClickable);
                  hasNewButtons = true;
                }
              } catch (e) {
                console.warn('Error selecting with:', selector, e);
              }
            });
          }
        });
      });

      if (hasNewButtons) {
        console.log('🔄 Fixed newly added buttons');
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'disabled']
    });

    console.log('👀 Dynamic content monitoring active');
  }

  // Initial scan and fix
  function runComprehensiveFixes() {
    console.log('🔍 Running comprehensive button fixes...');

    // Fix all existing elements
    BUTTON_CONFIG.selectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(makeElementClickable);
        console.log('✅ Fixed', elements.length, 'elements for selector:', selector);
      } catch (error) {
        console.warn(`⚠️ Error with selector ${selector}:`, error);
      }
    });

    // Special fixes for common issues
    fixNavigationMenus();
    fixFormElements();
    fixRealScoutInteractions();
    fixOverlayIssues();
    fixCTAButtons();
    fixContactButtons();

    console.log('✅ Comprehensive fixes completed');
  }

  // Fix CTA and contact buttons specifically
  function fixCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-buttons a, .cta-buttons button, .contact-button, .contact-buttons a, .contact-buttons button, .fallback-buttons a, .fallback-buttons button');

    ctaButtons.forEach(button => {
      // Remove any blocking CSS
      button.style.pointerEvents = 'auto';
      button.style.cursor = 'pointer';
      button.style.userSelect = 'auto';
      button.style.touchAction = 'manipulation';
      button.style.position = 'relative';
      button.style.zIndex = '99';
      button.style.display = 'inline-block';
      button.style.opacity = '1';
      button.style.visibility = 'visible';

      // Ensure proper sizing on mobile
      if (window.innerWidth <= 768) {
        button.style.minHeight = '48px';
        button.style.minWidth = '48px';
        button.style.padding = '0.75rem 1rem';
      }

      // Add event listener if not present
      if (!button.dataset.ctaFixed) {
        button.addEventListener('click', function(e) {
          console.log('🎯 CTA button clicked:', this.textContent);
          // Let the default behavior continue
        }, { passive: false });
        button.dataset.ctaFixed = 'true';
      }
    });
  }

  // Fix contact-specific buttons
  function fixContactButtons() {
    const contactButtons = document.querySelectorAll('.contact-buttons a, .contact-buttons button, .contact-button, .phone-number, .email-link');
    
    contactButtons.forEach(button => {
      button.style.pointerEvents = 'auto';
      button.style.cursor = 'pointer';
      button.style.zIndex = '100';
      button.style.position = 'relative';
      
      if (!button.dataset.contactFixed) {
        button.addEventListener('click', function(e) {
          console.log('📞 Contact button clicked:', this.textContent);
        }, { passive: false });
        button.dataset.contactFixed = 'true';
      }
    });
  }

  // Initialize all fixes when DOM is ready
  function initializeAllFixes() {
    fixCTAButtons();
    fixContactButtons();
    fixNavigationMenus();
    fixFormElements();
    fixRealScoutInteractions();
    fixOverlayIssues();
    
    console.log('✅ All comprehensive fixes applied');
  }

  // Run fixes immediately and on DOM changes
  initializeAllFixes();
  
  // Watch for dynamic content changes
  if (window.MutationObserver) {
    const observer = new MutationObserver(function(mutations) {
      let shouldRunFixes = false;
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0) {
          shouldRunFixes = true;
        }
      });
      
      if (shouldRunFixes) {
        setTimeout(initializeAllFixes, 100);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }t.ctaFixed = 'true';
      }
    });

    console.log(`✅ Fixed ${ctaButtons.length} CTA/Contact buttons`);
  }

  // Fix contact-specific buttons
  function fixContactButtons() {
    const contactSelectors = [
      '.phone-number',
      'a[href^="tel:"]',
      'a[href^="mailto:"]',
      '.btn-primary',
      '.btn-secondary',
      '.btn-outline'
    ];

    contactSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.pointerEvents = 'auto';
        element.style.cursor = 'pointer';
        element.style.userSelect = 'auto';
        element.style.touchAction = 'manipulation';
        element.style.position = 'relative';
        element.style.zIndex = '100';

        // For phone and email links, ensure proper handling
        if (element.href && (element.href.startsWith('tel:') || element.href.startsWith('mailto:'))) {
          element.addEventListener('click', function(e) {
            console.log('📞 Contact link clicked:', this.href);
            // Allow default behavior
          });
        }
      });
    });
  }

  // Main initialization function
  function initialize() {
    console.log('🚀 Starting comprehensive button fixes...');

    // Initial fixes
    initializeAllButtons();
    fixRealScoutWidgets();
    fixNavigationMenus();
    fixFormElements();
    runComprehensiveFixes();

    // Setup monitoring for dynamic content
    setupDynamicContentMonitoring();

    // Re-run fixes periodically to catch any missed elements
    setInterval(() => {
      const unfixedButtons = document.querySelectorAll(BUTTON_CONFIG.selectors.join(','));
      const needsFixing = [...unfixedButtons].filter(btn => !btn.dataset.buttonFixed);

      if (needsFixing.length > 0) {
        console.log(`🔧 Fixing ${needsFixing.length} missed buttons`);
        needsFixing.forEach(makeElementClickable);
      }
    }, 3000);

    console.log('✅ Comprehensive button fixes completed');
  }

  // Initialize fixes when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Loading comprehensive button fixes...');
    initializeAllButtons();
  });

  // Also run on window load for any late-loading content
  window.addEventListener('load', () => {
    setTimeout(initialize, 1000);
  });

  console.log('🔧 Button fixes script loaded successfully');

} catch (error) {
  console.error('❌ Error in button fixes script:', error);
}
})();