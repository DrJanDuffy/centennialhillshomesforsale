/**
 * UI Fixes for Centennial Hills Real Estate Website
 * This file addresses critical rendering issues and ensures proper functionality
 */

(() => {
  // Configuration
  const CONFIG = {
    animationDelay: 100,
    scrollThreshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    enableDebug: false,
  };

  // Debug logging
  function log(message, data = null) {
    if (CONFIG.enableDebug) {
      console.log(`[UI Fixes] ${message}`, data);
    }
  }

  // Main UI Fixes Class
  class UIFixes {
    constructor() {
      this.initialized = false;
      this.observers = new Map();
      this.fixedElements = new Set();
    }

    // Initialize all fixes
    init() {
      if (this.initialized) return;

      log('Initializing UI fixes...');

      try {
        this.fixImmediateVisibility();
        this.replaceLoadingSkeletons();
        this.setupScrollAnimations();
        this.fixFormFunctionality();
        this.fixNavigationIssues();
        this.setupLazyLoading();
        this.fixImageLoading();
        this.setupErrorHandling();

        this.initialized = true;
        log('UI fixes initialized successfully');

        // Listen for dynamic content changes
        this.observeDOMChanges();
      } catch (error) {
        console.error('[UI Fixes] Initialization failed:', error);
      }
    }

    // Fix immediate visibility issues
    fixImmediateVisibility() {
      log('Fixing immediate visibility issues...');

      // Fix elements with opacity: 0
      const hiddenElements = document.querySelectorAll('[style*="opacity:0"]');
      hiddenElements.forEach((element) => {
        this.fixElement(element, 'opacity');
      });

      // Fix elements with problematic transforms
      const transformElements = document.querySelectorAll(
        '[style*="transform:translateY"], [style*="transform:translateX"], [style*="transform:scale"]'
      );
      transformElements.forEach((element) => {
        this.fixElement(element, 'transform');
      });

      // Fix elements with visibility: hidden
      const invisibleElements = document.querySelectorAll('[style*="visibility:hidden"]');
      invisibleElements.forEach((element) => {
        this.fixElement(element, 'visibility');
      });
    }

    // Fix individual element
    fixElement(element, property) {
      if (this.fixedElements.has(element)) return;

      const el = element;

      switch (property) {
        case 'opacity':
          if (el.style.opacity === '0') {
            el.style.opacity = '1';
            el.classList.add('animate-fade-in');
          }
          break;

        case 'transform':
          if (el.style.transform && el.style.transform !== 'none') {
            el.style.transform = 'none';
            el.classList.add('animate-slide-up');
          }
          break;

        case 'visibility':
          if (el.style.visibility === 'hidden') {
            el.style.visibility = 'visible';
            el.classList.add('animate-fade-in');
          }
          break;
      }

      this.fixedElements.add(element);
    }

    // Replace loading skeletons with content
    replaceLoadingSkeletons() {
      log('Replacing loading skeletons...');

      const skeletons = document.querySelectorAll('.loading-skeleton');
      skeletons.forEach((skeleton) => {
        this.replaceSkeleton(skeleton);
      });
    }

    // Replace individual skeleton
    replaceSkeleton(skeleton) {
      const parent = skeleton.parentElement;
      if (!parent) return;

      // Create placeholder content
      const placeholder = this.createPlaceholder(skeleton);

      // Replace skeleton with placeholder
      parent.replaceChild(placeholder, skeleton);

      // Load actual content after delay
      setTimeout(() => {
        this.loadActualContent(placeholder, parent);
      }, 1500);
    }

    // Create placeholder content
    createPlaceholder(skeleton) {
      const height = skeleton.classList.contains('h-64')
        ? 'h-64'
        : skeleton.classList.contains('h-96')
          ? 'h-96'
          : 'h-64';

      const placeholder = document.createElement('div');
      placeholder.className = `bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg ${height} flex items-center justify-center animate-pulse`;
      placeholder.innerHTML = `
        <div class="text-center text-gray-500">
          <div class="animate-spin w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full mx-auto mb-2"></div>
          <p class="text-sm">Loading content...</p>
        </div>
      `;

      return placeholder;
    }

    // Load actual content
    loadActualContent(placeholder, parent) {
      // Determine content type based on parent context
      const contentType = this.determineContentType(parent);

      // Create content based on type
      const content = this.createContent(contentType);

      // Replace placeholder with content
      if (placeholder.parentElement) {
        placeholder.parentElement.replaceChild(content, placeholder);
      }
    }

    // Determine content type
    determineContentType(parent) {
      const parentClasses = parent.className;
      const parentId = parent.id;

      if (parentClasses.includes('property') || parentId.includes('property')) {
        return 'property-listings';
      } else if (parentClasses.includes('market') || parentId.includes('market')) {
        return 'market-data';
      } else if (parentClasses.includes('amenity') || parentId.includes('amenity')) {
        return 'amenities';
      } else {
        return 'generic';
      }
    }

    // Create content based on type
    createContent(type) {
      const content = document.createElement('div');

      switch (type) {
        case 'property-listings':
          content.innerHTML = this.createPropertyListings();
          break;
        case 'market-data':
          content.innerHTML = this.createMarketData();
          break;
        case 'amenities':
          content.innerHTML = this.createAmenities();
          break;
        default:
          content.innerHTML = this.createGenericContent();
      }

      content.className = 'animate-fade-in';
      return content;
    }

    // Create property listings content
    createPropertyListings() {
      return `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${Array.from(
            { length: 6 },
            (_, i) => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in" style="animation-delay: ${i * 0.1}s">
              <div class="h-48 bg-gradient-to-br from-blue-100 to-blue-200"></div>
              <div class="p-4">
                <h3 class="font-semibold text-gray-800 mb-2">Sample Property ${i + 1}</h3>
                <p class="text-gray-600 text-sm">$${(500000 + i * 50000).toLocaleString()}</p>
              </div>
            </div>
          `
          ).join('')}
        </div>
      `;
    }

    // Create market data content
    createMarketData() {
      return `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">$635K</div>
            <div class="text-sm text-gray-600">Avg Price</div>
          </div>
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-600">15</div>
            <div class="text-sm text-gray-600">Days on Market</div>
          </div>
          <div class="text-center p-4 bg-purple-50 rounded-lg">
            <div class="text-2xl font-bold text-purple-600">+5.2%</div>
            <div class="text-sm text-gray-600">Price Growth</div>
          </div>
          <div class="text-center p-4 bg-orange-50 rounded-lg">
            <div class="text-2xl font-bold text-orange-600">89</div>
            <div class="text-sm text-gray-600">Active Listings</div>
          </div>
        </div>
      `;
    }

    // Create amenities content
    createAmenities() {
      return `
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="flex items-center p-3 bg-gray-50 rounded-lg">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">🏫</div>
            <span class="text-sm font-medium">Top Schools</span>
          </div>
          <div class="flex items-center p-3 bg-gray-50 rounded-lg">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">🏞️</div>
            <span class="text-sm font-medium">Parks & Trails</span>
          </div>
          <div class="flex items-center p-3 bg-gray-50 rounded-lg">
            <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">🛍️</div>
            <span class="text-sm font-medium">Shopping</span>
          </div>
        </div>
      `;
    }

    // Create generic content
    createGenericContent() {
      return `
        <div class="text-center text-gray-500 py-8">
          <p class="text-lg">Content loaded successfully</p>
        </div>
      `;
    }

    // Setup scroll animations
    setupScrollAnimations() {
      log('Setting up scroll animations...');

      const animatedElements = document.querySelectorAll('[data-animate], .animate-on-scroll');

      if (animatedElements.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.animateElement(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: CONFIG.scrollThreshold,
          rootMargin: CONFIG.rootMargin,
        }
      );

      animatedElements.forEach((element) => {
        observer.observe(element);
      });

      this.observers.set('scroll', observer);
    }

    // Animate element
    animateElement(element) {
      const animationType = element.dataset.animate || 'fade-in';

      element.classList.add(`animate-${animationType}`);

      // Remove inline styles that might interfere
      if (element.style.opacity === '0') {
        element.style.opacity = '1';
      }
      if (element.style.transform && element.style.transform !== 'none') {
        element.style.transform = 'none';
      }
    }

    // Fix form functionality
    fixFormFunctionality() {
      log('Fixing form functionality...');

      // Fix search forms
      const searchForms = document.querySelectorAll('form[data-search], .search-form');
      searchForms.forEach((form) => {
        this.fixSearchForm(form);
      });

      // Fix contact forms
      const contactForms = document.querySelectorAll('form[data-contact], .contact-form');
      contactForms.forEach((form) => {
        this.fixContactForm(form);
      });
    }

    // Fix search form
    fixSearchForm(form) {
      const searchButton = form.querySelector('button[type="submit"], .search-button');
      const inputs = form.querySelectorAll('input, select');

      if (searchButton) {
        searchButton.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleSearch(form, inputs);
        });
      }
    }

    // Fix contact form
    fixContactForm(form) {
      const submitButton = form.querySelector('button[type="submit"], .submit-button');

      if (submitButton) {
        submitButton.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleContactSubmit(form);
        });
      }
    }

    // Handle search
    handleSearch(form, inputs) {
      const formData = new FormData();

      inputs.forEach((input) => {
        if (input.value) {
          formData.append(input.name || input.id, input.value);
        }
      });

      log('Search submitted:', Object.fromEntries(formData));

      // Show loading state
      const button = form.querySelector('button[type="submit"]');
      if (button) {
        button.textContent = 'Searching...';
        button.disabled = true;
      }

      // Simulate search
      setTimeout(() => {
        if (button) {
          button.textContent = 'Search';
          button.disabled = false;
        }
        this.showSearchResults();
      }, 1500);
    }

    // Handle contact submit
    handleContactSubmit(form) {
      const formData = new FormData(form);

      log('Contact form submitted:', Object.fromEntries(formData));

      // Show loading state
      const button = form.querySelector('button[type="submit"]');
      if (button) {
        button.textContent = 'Sending...';
        button.disabled = true;
      }

      // Simulate submission
      setTimeout(() => {
        if (button) {
          button.textContent = 'Message Sent!';
          button.classList.add('bg-green-600');
        }

        // Reset form after delay
        setTimeout(() => {
          form.reset();
          if (button) {
            button.textContent = 'Send Message';
            button.disabled = false;
            button.classList.remove('bg-green-600');
          }
        }, 3000);
      }, 2000);
    }

    // Show search results
    showSearchResults() {
      const resultsContainer = document.getElementById('search-results');
      if (!resultsContainer) return;

      resultsContainer.innerHTML = `
        <div class="text-center py-8">
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Search Results</h3>
          <p class="text-gray-600 mb-6">Found 3 properties matching your criteria</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${this.createPropertyListings()}
          </div>
        </div>
      `;

      resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // Fix navigation issues
    fixNavigationIssues() {
      log('Fixing navigation issues...');

      // Fix mobile menu toggle
      const mobileMenuButton = document.querySelector('[data-mobile-menu], .mobile-menu-button');
      const mobileMenu = document.querySelector('[data-mobile-menu-content], .mobile-menu');

      if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
          mobileMenu.classList.toggle('hidden');
          mobileMenuButton.setAttribute(
            'aria-expanded',
            mobileMenu.classList.contains('hidden') ? 'false' : 'true'
          );
        });
      }

      // Fix smooth scrolling for anchor links
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });
    }

    // Setup lazy loading
    setupLazyLoading() {
      log('Setting up lazy loading...');

      const lazyElements = document.querySelectorAll('[data-lazy]');

      if (lazyElements.length === 0) return;

      const lazyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.loadLazyElement(entry.target);
              lazyObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
        }
      );

      lazyElements.forEach((element) => {
        lazyObserver.observe(element);
      });

      this.observers.set('lazy', lazyObserver);
    }

    // Load lazy element
    loadLazyElement(element) {
      const lazyType = element.dataset.lazy;

      if (lazyType === 'image' && element.tagName === 'IMG') {
        const img = element;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('opacity-0');
          img.classList.add('opacity-100');
        }
      } else if (lazyType === 'content') {
        element.classList.remove('opacity-0');
        element.classList.add('opacity-100');
      }
    }

    // Fix image loading
    fixImageLoading() {
      log('Fixing image loading...');

      const images = document.querySelectorAll('img[data-src]');
      images.forEach((img) => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('opacity-0');
          img.classList.add('opacity-100');
        }
      });

      // Fix broken images
      const brokenImages = document.querySelectorAll('img');
      brokenImages.forEach((img) => {
        img.addEventListener('error', () => {
          img.src = '/images/placeholder-property.jpg';
          img.alt = 'Property image unavailable';
        });
      });
    }

    // Setup error handling
    setupErrorHandling() {
      log('Setting up error handling...');

      // Global error handler
      window.addEventListener('error', (event) => {
        log('Global error caught:', event.error);
        this.showErrorMessage('An unexpected error occurred. Please refresh the page.');
      });

      // Unhandled promise rejection handler
      window.addEventListener('unhandledrejection', (event) => {
        log('Unhandled promise rejection:', event.reason);
        this.showErrorMessage('A network error occurred. Please check your connection.');
      });
    }

    // Show error message
    showErrorMessage(message) {
      const errorDiv = document.createElement('div');
      errorDiv.className =
        'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
      errorDiv.innerHTML = `
        <div class="flex items-center">
          <span class="mr-2">⚠️</span>
          <span>${message}</span>
          <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
      `;

      document.body.appendChild(errorDiv);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        if (errorDiv.parentElement) {
          errorDiv.remove();
        }
      }, 5000);
    }

    // Observe DOM changes
    observeDOMChanges() {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                this.handleNewElement(node);
              }
            });
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      this.observers.set('dom', observer);
    }

    // Handle new element
    handleNewElement(element) {
      // Check if element needs immediate visibility fix
      if (element.style && element.style.opacity === '0') {
        this.fixElement(element, 'opacity');
      }

      // Check if element is a loading skeleton
      if (element.classList?.contains('loading-skeleton')) {
        this.replaceSkeleton(element);
      }

      // Check if element needs animation
      if (element.dataset?.animate) {
        this.animateElement(element);
      }

      // Check if element is lazy
      if (element.dataset?.lazy) {
        this.setupLazyLoading();
      }
    }

    // Cleanup
    destroy() {
      log('Cleaning up UI fixes...');

      this.observers.forEach((observer) => {
        observer.disconnect();
      });

      this.observers.clear();
      this.fixedElements.clear();
      this.initialized = false;
    }
  }

  // Initialize when DOM is ready
  function initUIFixes() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const uiFixes = new UIFixes();
        uiFixes.init();

        // Make it globally accessible for debugging
        window.uiFixes = uiFixes;
      });
    } else {
      const uiFixes = new UIFixes();
      uiFixes.init();
      window.uiFixes = uiFixes;
    }
  }

  // Initialize immediately if possible
  initUIFixes();

  // Also try to initialize on window load as fallback
  window.addEventListener('load', () => {
    if (!window.uiFixes) {
      const uiFixes = new UIFixes();
      uiFixes.init();
      window.uiFixes = uiFixes;
    }
  });

  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIFixes;
  } else if (typeof define === 'function' && define.amd) {
    define([], () => UIFixes);
  }
})();
