/**
 * CentennialHillsHomesForSale.com - Advanced Interactive Features
 * Enhanced user experience for luxury real estate browsing
 * @author Dr. Jan Duffy's Web Team
 * @version 2.0
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================
  // CONFIGURATION
  // =========================================
  const CONFIG = {
    animations: {
      duration: 400,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
      menuTransition: 300,
    },
    breakpoints: {
      mobile: 768,
      tablet: 1024,
    },
    scrolling: {
      offset: 100,
      threshold: 50,
    },
  };

  // =========================================
  // UTILITY FUNCTIONS
  // =========================================
  const UTILS = {
    // Animate elements with smooth transitions
    animate: (element, properties, duration = CONFIG.animations.duration) => {
      if (!element) return;

      element.style.transition = `all ${duration}ms ${CONFIG.animations.easing}`;

      Object.keys(properties).forEach((key) => {
        element.style[key] = properties[key];
      });

      return new Promise((resolve) => {
        setTimeout(resolve, duration);
      });
    },

    // Debounce function to improve performance
    debounce: (func, wait = 250) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    // Get viewport dimensions
    viewport: () => ({
      width: window.innerWidth || document.documentElement.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight,
      isMobile: window.innerWidth < CONFIG.breakpoints.mobile,
      isTablet:
        window.innerWidth >= CONFIG.breakpoints.mobile &&
        window.innerWidth < CONFIG.breakpoints.tablet,
    }),

    // Scroll to element with smooth animation
    scrollTo: (target, offset = CONFIG.scrolling.offset) => {
      if (!target) return;

      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    },
  };

  // =========================================
  // MENU NAVIGATION SYSTEM
  // =========================================
  const initNavigation = () => {
    const menuButton = document.querySelector('.icon-menu');
    const menuBody = document.querySelector('.menu__body');
    const body = document.body;
    const header = document.querySelector('.header');
    const dropdownMenus = document.querySelectorAll('.dropdown');

    // Initialize header state based on scroll position
    let lastScrollTop = 0;

    const handleScroll = UTILS.debounce(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Add sticky header on scroll
      if (scrollTop > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      // Hide/show header based on scroll direction
      if (scrollTop > lastScrollTop && scrollTop > 300) {
        // Scrolling down
        header.classList.add('header--hidden');
      } else {
        // Scrolling up
        header.classList.remove('header--hidden');
      }

      lastScrollTop = scrollTop;
    }, 10);

    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    if (menuButton && menuBody) {
      // Add ARIA attributes for accessibility
      menuButton.setAttribute('aria-label', 'Toggle Menu');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-controls', 'mobile-menu');

      if (menuBody) {
        menuBody.id = 'mobile-menu';
        menuBody.setAttribute('aria-hidden', 'true');
      }

      menuButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const isExpanded = body.classList.contains('menu-open');

        if (!isExpanded) {
          // Opening menu
          body.classList.add('menu-open');
          menuButton.setAttribute('aria-expanded', 'true');
          body.style.overflow = 'hidden';

          if (menuBody) {
            menuBody.setAttribute('aria-hidden', 'false');

            // Focus trap for accessibility
            const focusableElements = menuBody.querySelectorAll('a[href], button:not([disabled])');
            if (focusableElements.length) {
              setTimeout(() => focusableElements[0].focus(), CONFIG.animations.menuTransition);
            }
          }
        } else {
          // Closing menu
          closeMenu();
        }
      });

      // Close menu when pressing Escape key
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && body.classList.contains('menu-open')) {
          closeMenu();
        }
      });

      // Close menu function
      const closeMenu = () => {
        body.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';

        if (menuBody) {
          menuBody.setAttribute('aria-hidden', 'true');
        }

        // Return focus to menu button for accessibility
        menuButton.focus();
      };

      // Close menu when clicking outside
      document.addEventListener('click', (event) => {
        if (
          body.classList.contains('menu-open') &&
          !event.target.closest('.menu__body') &&
          !event.target.closest('.icon-menu')
        ) {
          closeMenu();
        }
      });
    }

    // Handle dropdown menus
    if (dropdownMenus.length) {
      dropdownMenus.forEach((dropdown) => {
        const link = dropdown.querySelector('.menu__link');
        const submenu = dropdown.querySelector('.dropdown-menu');

        if (link && submenu) {
          // Add accessibility attributes
          const submenuId = `submenu-${Math.random().toString(36).substring(2, 9)}`;
          submenu.id = submenuId;
          link.setAttribute('aria-haspopup', 'true');
          link.setAttribute('aria-expanded', 'false');
          link.setAttribute('aria-controls', submenuId);

          // Mobile handling
          if (UTILS.viewport().isMobile || UTILS.viewport().isTablet) {
            link.addEventListener('click', (e) => {
              // Prevent navigation on mobile
              e.preventDefault();

              const isExpanded = link.getAttribute('aria-expanded') === 'true';

              // Close other open dropdowns
              dropdownMenus.forEach((otherDropdown) => {
                if (otherDropdown !== dropdown) {
                  const otherLink = otherDropdown.querySelector('.menu__link');
                  const otherSubmenu = otherDropdown.querySelector('.dropdown-menu');

                  if (otherLink && otherSubmenu) {
                    otherLink.setAttribute('aria-expanded', 'false');
                    otherSubmenu.classList.remove('active');
                  }
                }
              });

              // Toggle current dropdown
              link.setAttribute('aria-expanded', !isExpanded);
              submenu.classList.toggle('active');
            });
          } else {
            // Desktop handling with hover
            dropdown.addEventListener('mouseenter', () => {
              link.setAttribute('aria-expanded', 'true');
              submenu.classList.add('active');
            });

            dropdown.addEventListener('mouseleave', () => {
              link.setAttribute('aria-expanded', 'false');
              submenu.classList.remove('active');
            });

            // Keyboard accessibility
            link.addEventListener('focus', () => {
              link.setAttribute('aria-expanded', 'true');
              submenu.classList.add('active');
            });

            dropdown.addEventListener('focusout', (e) => {
              if (!dropdown.contains(e.relatedTarget)) {
                link.setAttribute('aria-expanded', 'false');
                submenu.classList.remove('active');
              }
            });
          }
        }
      });
    }
  };

  // =========================================
  // ACCORDION/SPOLLER SYSTEM
  // =========================================
  const initAccordions = () => {
    const spollerGroups = document.querySelectorAll('[data-spollers]');

    if (!spollerGroups.length) return;

    spollerGroups.forEach((spollerGroup) => {
      const spollerItems = spollerGroup.querySelectorAll('[data-spoller]');
      const isOneSpoller = spollerGroup.dataset.oneSpoller !== undefined;

      spollerItems.forEach((item, index) => {
        const button = item.querySelector('.spollers-faq__button');
        const content = item.querySelector('.spollers-faq__text');

        if (!button || !content) return;

        // Generate unique IDs for accessibility
        const itemId = `spoller-${index}-${Math.random().toString(36).substring(2, 9)}`;
        const contentId = `content-${itemId}`;

        // Set up ARIA attributes
        button.setAttribute('id', itemId);
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', contentId);

        content.setAttribute('id', contentId);
        content.setAttribute('role', 'region');
        content.setAttribute('aria-labelledby', itemId);
        content.setAttribute('aria-hidden', 'true');

        // Set initial transition for smooth animations
        content.style.transition = `max-height ${CONFIG.animations.duration}ms ${CONFIG.animations.easing}`;
        content.style.overflow = 'hidden';
        content.style.maxHeight = '0px';

        // Handle click events
        button.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          // Close other open spollers in one-spoller groups
          if (isOneSpoller && !isActive) {
            spollerItems.forEach((otherItem) => {
              if (otherItem !== item && otherItem.classList.contains('active')) {
                toggleSpoller(otherItem, false);
              }
            });
          }

          // Toggle current spoller
          toggleSpoller(item, !isActive);
        });

        // Keyboard accessibility
        button.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
          }
        });

        // Open default active spollers
        if (item.classList.contains('active')) {
          toggleSpoller(item, true, false);
        }
      });
    });

    // Toggle spoller state with animation
    function toggleSpoller(item, activate, animate = true) {
      const button = item.querySelector('.spollers-faq__button');
      const content = item.querySelector('.spollers-faq__text');

      if (!button || !content) return;

      if (activate) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        content.setAttribute('aria-hidden', 'false');

        if (animate) {
          // Measure content height and animate
          content.style.display = 'block';
          const height = content.scrollHeight;
          content.style.display = '';

          setTimeout(() => {
            content.style.maxHeight = `${height}px`;
          }, 10);
        } else {
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      } else {
        item.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
        content.setAttribute('aria-hidden', 'true');

        if (animate) {
          UTILS.animate(content, { maxHeight: '0px' });
        } else {
          content.style.maxHeight = '0px';
        }
      }
    }
  };

  // =========================================
  // PROPERTY LISTING ENHANCEMENTS
  // =========================================
  const initPropertyFeatures = () => {
    const propertyCards = document.querySelectorAll('.property-card');

    if (!propertyCards.length) return;

    propertyCards.forEach((card) => {
      // Add hover animations
      card.addEventListener('mouseenter', () => {
        UTILS.animate(card, {
          transform: 'translateY(-10px)',
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
        });
      });

      card.addEventListener('mouseleave', () => {
        UTILS.animate(card, {
          transform: 'translateY(0)',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        });
      });

      // Add quick preview functionality
      const propertyImage = card.querySelector('.property-image');
      const propertyLink = card.querySelector('.item-services__button');

      if (propertyImage && propertyLink) {
        // Create quick view button
        const quickViewBtn = document.createElement('button');
        quickViewBtn.className = 'property-quickview';
        quickViewBtn.innerHTML = '<span>Quick View</span>';
        quickViewBtn.setAttribute('aria-label', 'Quick property preview');
        propertyImage.appendChild(quickViewBtn);

        quickViewBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          // Get property details
          const title =
            card.querySelector('.item-services__title')?.textContent || 'Property Details';
          const price = card.querySelector('.property-price')?.textContent || '';
          const details = card.querySelector('.property-details')?.textContent || '';
          const image = card.querySelector('.property-image img')?.src || '';
          const perks = card.querySelector('.property-neighborhood-perks')?.innerHTML || '';

          // Create modal with property details
          createPropertyModal(title, price, details, image, perks, propertyLink.href);
        });
      }
    });

    // Create and show property modal
    function createPropertyModal(title, price, details, image, perks, link) {
      // Create modal elements
      const modal = document.createElement('div');
      modal.className = 'property-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'modal-title');

      // Modal content
      modal.innerHTML = `
        <div class="property-modal__content">
          <button class="property-modal__close" aria-label="Close modal">&times;</button>
          <div class="property-modal__image">
            <img src="${image}" alt="${title}">
          </div>
          <div class="property-modal__details">
            <h3 id="modal-title">${title}</h3>
            <p class="property-modal__price">${price}</p>
            <p class="property-modal__info">${details}</p>
            <div class="property-modal__perks">${perks}</div>
            <a href="${link}" class="button property-modal__link">View Full Details</a>
          </div>
        </div>
      `;

      // Add to page and show with animation
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';

      // Animate in
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);

      // Close button functionality
      const closeBtn = modal.querySelector('.property-modal__close');
      closeBtn.addEventListener('click', () => {
        closePropertyModal(modal);
      });

      // Close on outside click
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closePropertyModal(modal);
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          closePropertyModal(modal);
          document.removeEventListener('keydown', escHandler);
        }
      });

      // Focus trap for accessibility
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      firstElement.focus();

      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      });
    }

    // Close and remove property modal
    function closePropertyModal(modal) {
      modal.classList.remove('active');

      setTimeout(() => {
        document.body.style.overflow = '';
        modal.remove();
      }, CONFIG.animations.duration);
    }
  };

  // =========================================
  // NEIGHBORHOOD GUIDE MAP
  // =========================================
  const initNeighborhoodMap = () => {
    const mapContainer = document.querySelector('.interactive-map');

    if (!mapContainer) return;

    // Create map functionality
    const mapPoints = [
      {
        lat: 36.243,
        lng: -115.2899,
        title: 'Centennial Hills',
        category: 'community',
        description: 'Family-friendly master-planned community',
      },
      {
        lat: 36.2755,
        lng: -115.3089,
        title: 'Skye Canyon',
        category: 'community',
        description: 'Active lifestyle community with outdoor focus',
      },
      {
        lat: 36.297,
        lng: -115.263,
        title: 'Providence',
        category: 'community',
        description: 'Quiet community with mountain views',
      },
      {
        lat: 36.224,
        lng: -115.2818,
        title: 'Centennial Hills Hospital',
        category: 'healthcare',
        description: '24-hour emergency care',
      },
      {
        lat: 36.24,
        lng: -115.292,
        title: 'Centennial Center',
        category: 'shopping',
        description: 'Premier shopping destination',
      },
      {
        lat: 36.261,
        lng: -115.283,
        title: 'Centennial Hills Park',
        category: 'recreation',
        description: 'Largest park in the area',
      },
    ];

    // Create map filters
    const mapFilters = document.createElement('div');
    mapFilters.className = 'map-filters';
    mapFilters.innerHTML = `
      <h4>Filter Map Points</h4>
      <div class="filter-options">
        <label><input type="checkbox" data-filter="community" checked> Communities</label>
        <label><input type="checkbox" data-filter="healthcare" checked> Healthcare</label>
        <label><input type="checkbox" data-filter="shopping" checked> Shopping</label>
        <label><input type="checkbox" data-filter="recreation" checked> Recreation</label>
      </div>
    `;

    mapContainer.appendChild(mapFilters);

    // Create map points
    const mapPointsContainer = document.createElement('div');
    mapPointsContainer.className = 'map-points';

    mapPoints.forEach((point) => {
      const pointElement = document.createElement('div');
      pointElement.className = `map-point map-point--${point.category}`;
      pointElement.setAttribute('data-category', point.category);
      pointElement.style.left = `${((point.lng + 115.32) / 0.1) * 100}%`;
      pointElement.style.top = `${((36.31 - point.lat) / 0.1) * 100}%`;

      pointElement.innerHTML = `
        <div class="map-point__icon"></div>
        <div class="map-point__tooltip">
          <h4>${point.title}</h4>
          <p>${point.description}</p>
        </div>
      `;

      mapPointsContainer.appendChild(pointElement);

      // Show tooltip on hover/focus
      pointElement.addEventListener('mouseenter', () => {
        pointElement.classList.add('active');
      });

      pointElement.addEventListener('mouseleave', () => {
        pointElement.classList.remove('active');
      });

      // Make points focusable for accessibility
      pointElement.setAttribute('tabindex', '0');
      pointElement.addEventListener('focus', () => {
        pointElement.classList.add('active');
      });

      pointElement.addEventListener('blur', () => {
        pointElement.classList.remove('active');
      });
    });

    mapContainer.appendChild(mapPointsContainer);

    // Filter functionality
    const filterInputs = mapFilters.querySelectorAll('input[type="checkbox"]');

    filterInputs.forEach((input) => {
      input.addEventListener('change', () => {
        updateMapFilters();
      });
    });

    function updateMapFilters() {
      const activeFilters = Array.from(filterInputs)
        .filter((input) => input.checked)
        .map((input) => input.dataset.filter);

      const points = mapPointsContainer.querySelectorAll('.map-point');

      points.forEach((point) => {
        const category = point.getAttribute('data-category');

        if (activeFilters.includes(category)) {
          point.style.display = '';
        } else {
          point.style.display = 'none';
        }
      });
    }
  };

  // =========================================
  // NEIGHBORHOOD SELECTOR
  // =========================================
  const initNeighborhoodSelector = () => {
    const neighborhoodBar = document.querySelector('.neighborhood-bar');
    const selector = document.getElementById('neighborhood-select');
    const changeBtn = document.querySelector('.change-neighborhood');

    if (neighborhoodBar && changeBtn) {
      // Create dropdown selector
      const dropdownContainer = document.createElement('div');
      dropdownContainer.className = 'neighborhood-dropdown';
      dropdownContainer.style.display = 'none';

      const neighborhoods = [
        { value: 'centennial-hills', label: 'Centennial Hills' },
        { value: 'skye-canyon', label: 'Skye Canyon' },
        { value: 'providence', label: 'Providence' },
        { value: 'lone-mountain', label: 'Lone Mountain' },
        { value: 'summerlin', label: 'Summerlin' },
        { value: 'tule-springs', label: 'Tule Springs' },
      ];

      dropdownContainer.innerHTML = `
        <select id="neighborhood-selector" aria-label="Select neighborhood">
          ${neighborhoods.map((n) => `<option value="${n.value}">${n.label}</option>`).join('')}
        </select>
        <button type="button" class="button neighborhood-selector-btn">Go</button>
      `;

      neighborhoodBar.appendChild(dropdownContainer);

      // Toggle dropdown visibility
      changeBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (dropdownContainer.style.display === 'none') {
          dropdownContainer.style.display = 'flex';
          UTILS.animate(dropdownContainer, { opacity: 1 });

          document.getElementById('neighborhood-selector').focus();
        } else {
          UTILS.animate(dropdownContainer, { opacity: 0 }).then(() => {
            dropdownContainer.style.display = 'none';
          });
        }
      });

      // Handle neighborhood selection
      const selectorBtn = dropdownContainer.querySelector('.neighborhood-selector-btn');

      selectorBtn.addEventListener('click', () => {
        const selected = document.getElementById('neighborhood-selector').value;

        if (selected) {
          window.location.href = `${selected}.html`;
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (
          dropdownContainer.style.display !== 'none' &&
          !dropdownContainer.contains(e.target) &&
          e.target !== changeBtn
        ) {
          UTILS.animate(dropdownContainer, { opacity: 0 }).then(() => {
            dropdownContainer.style.display = 'none';
          });
        }
      });
    }

    // Existing select element functionality
    if (selector) {
      selector.addEventListener('change', function () {
        const selected = this.value;

        if (selected) {
          window.location.href = `${selected}.html`;
        }
      });
    }
  };

  // =========================================
  // SCROLL ANIMATIONS
  // =========================================
  const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!animatedElements.length) return;

    // Add initial classes
    animatedElements.forEach((element) => {
      element.classList.add('animate-ready');
    });

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    // Observe elements
    animatedElements.forEach((element) => {
      observer.observe(element);
    });

    // Handle scroll-to links
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    scrollLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();
          UTILS.scrollTo(targetElement);
        }
      });
    });
  };

  // =========================================
  // TESTIMONIAL SLIDER
  // =========================================
  const initTestimonialSlider = () => {
    const sliderContainer = document.querySelector('.testimonials-slider');
    const indicators = document.querySelectorAll('.testimonial-indicators .indicator');

    if (!sliderContainer || !indicators.length) return;

    const testimonials = sliderContainer.querySelectorAll('.testimonial');
    let currentIndex = 0;
    let autoplayInterval;

    // Initialize slider
    function initSlider() {
      // Hide all testimonials except first
      testimonials.forEach((item, index) => {
        if (index !== 0) {
          item.style.display = 'none';
          item.setAttribute('aria-hidden', 'true');
        } else {
          item.setAttribute('aria-hidden', 'false');
        }
      });

      // Update indicators
      updateIndicators();

      // Start autoplay
      startAutoplay();
    }

    // Show testimonial by index
    function showTestimonial(index) {
      // Hide current testimonial
      testimonials[currentIndex].style.opacity = '0';

      setTimeout(() => {
        testimonials[currentIndex].style.display = 'none';
        testimonials[currentIndex].setAttribute('aria-hidden', 'true');

        // Show new testimonial
        currentIndex = index;
        testimonials[currentIndex].style.display = 'block';
        testimonials[currentIndex].setAttribute('aria-hidden', 'false');

        setTimeout(() => {
          testimonials[currentIndex].style.opacity = '1';
        }, 50);

        // Update indicators
        updateIndicators();
      }, 300);
    }

    // Update indicator states
    function updateIndicators() {
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add('active');
          indicator.setAttribute('aria-current', 'true');
        } else {
          indicator.classList.remove('active');
          indicator.setAttribute('aria-current', 'false');
        }
      });
    }

    // Start autoplay
    function startAutoplay() {
      stopAutoplay();

      autoplayInterval = setInterval(() => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= testimonials.length) {
          nextIndex = 0;
        }

        showTestimonial(nextIndex);
      }, 5000);
    }

    // Stop autoplay
    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    }

    // Handle indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        if (index !== currentIndex) {
          showTestimonial(index);
          stopAutoplay();
          startAutoplay();
        }
      });

      // Accessibility
      indicator.setAttribute('role', 'button');
      indicator.setAttribute('aria-label', `Show testimonial ${index + 1}`);
      indicator.setAttribute('tabindex', '0');

      indicator.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          indicator.click();
        }
      });
    });

    // Pause autoplay on hover
    sliderContainer.addEventListener('mouseenter', stopAutoplay);
    sliderContainer.addEventListener('mouseleave', startAutoplay);

    // Initialize the slider
    initSlider();
  };

  // =========================================
  // CONTACT FORM VALIDATION
  // =========================================
  const initContactForm = () => {
    const forms = document.querySelectorAll('form');

    if (!forms.length) return;

    forms.forEach((form) => {
      const submitButton = form.querySelector('button[type="submit"]');
      const fields = form.querySelectorAll('input, textarea, select');

      // Add validation styles and attributes
      fields.forEach((field) => {
        if (field.required) {
          const label = field.previousElementSibling;

          if (label && label.tagName === 'LABEL') {
            label.innerHTML += ' <span class="required">*</span>';
          }

          // Add aria attributes
          field.setAttribute('aria-required', 'true');

          // Create error message element
          const errorElement = document.createElement('div');
          errorElement.className = 'form-error';
          errorElement.id = `error-${field.id || Math.random().toString(36).substring(2, 9)}`;
          errorElement.setAttribute('aria-live', 'polite');
          field.parentNode.appendChild(errorElement);

          field.setAttribute('aria-describedby', errorElement.id);
        }

        // Validate on blur
        field.addEventListener('blur', () => {
          validateField(field);
        });

        // Clear error on input
        field.addEventListener('input', () => {
          clearFieldError(field);
        });
      });

      // Form submission
      form.addEventListener('submit', (e) => {
        let isValid = true;

        // Validate all fields
        fields.forEach((field) => {
          if (!validateField(field)) {
            isValid = false;
          }
        });

        // Prevent submission if invalid
        if (!isValid) {
          e.preventDefault();

          // Focus first invalid field
          const firstInvalid = form.querySelector('.invalid');
          if (firstInvalid) {
            firstInvalid.focus();
          }

          // Scroll to form
          UTILS.scrollTo(form);
        } else if (form.classList.contains('ajax-form')) {
          // Handle AJAX submission
          e.preventDefault();

          // Show loading state
          if (submitButton) {
            const _originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner"></span> Sending...';

            // Simulate AJAX submission (replace with actual AJAX)
            setTimeout(() => {
              // Show success message
              form.innerHTML = `
                  <div class="form-success">
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. Dr. Jan Duffy will contact you shortly.</p>
                  </div>
                `;

              // Reset form after delay
              setTimeout(() => {
                form.reset();
                form.innerHTML = form.originalHTML;
                initContactForm(); // Reinitialize form
              }, 5000);
            }, 1500);
          }
        }
      });

      // Store original HTML for reset
      form.originalHTML = form.innerHTML;
    });

    // Field validation function
    function validateField(field) {
      // Skip disabled fields
      if (field.disabled) return true;

      const errorElement = field.parentNode.querySelector('.form-error');
      let isValid = true;
      let errorMessage = '';

      // Clear previous error
      clearFieldError(field);

      // Required validation
      if (field.required && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
      }

      // Email validation
      if (field.type === 'email' && field.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
      }

      // Phone validation
      if (field.type === 'tel' && field.value.trim()) {
        // Allow various phone formats
        const phonePattern = /^(\+\d{1,3})?\s*(\(\d{3}\)|\d{3})[- .]?\d{3}[- .]?\d{4}$/;
        if (!phonePattern.test(field.value)) {
          isValid = false;
          errorMessage = 'Please enter a valid phone number';
        }
      }

      // Show error if invalid
      if (!isValid && errorElement) {
        field.classList.add('invalid');
        field.setAttribute('aria-invalid', 'true');
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
      }

      return isValid;
    }

    // Clear field error
    function clearFieldError(field) {
      const errorElement = field.parentNode.querySelector('.form-error');

      if (errorElement) {
        field.classList.remove('invalid');
        field.setAttribute('aria-invalid', 'false');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
      }
    }
  };

  // =========================================
  // LAZY LOADING IMAGES
  // =========================================
  const initLazyLoading = () => {
    // Use native lazy loading if supported
    if ('loading' in HTMLImageElement.prototype) {
      document.querySelectorAll('img:not([loading])').forEach((img) => {
        img.loading = 'lazy';
      });
    } else {
      // Fallback to IntersectionObserver
      const lazyImages = document.querySelectorAll('img.lazy');

      if (!lazyImages.length) return;

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;

            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }

            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach((img) => {
        imageObserver.observe(img);
      });
    }
  };

  // =========================================
  // HOMEBOT INTEGRATION ENHANCEMENTS
  // =========================================
  const initHomebot = () => {
    const homebotContainer = document.getElementById('homebot_homeowner');

    if (!homebotContainer) return;

    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'homebot-loading';
    loadingIndicator.innerHTML = `
      <div class="loading-spinner"></div>
      <p>Loading Home Value Tracker...</p>
    `;

    homebotContainer.appendChild(loadingIndicator);

    // Check for Homebot errors
    window.addEventListener('message', (event) => {
      // Check if message is from Homebot
      if (event.data && event.data.type === 'homebotError') {
        // Hide loading indicator
        loadingIndicator.style.display = 'none';

        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'homebot-error';
        errorMessage.innerHTML = `
          <h3>Unable to load Home Value Tracker</h3>
          <p>Please refresh the page or try again later. If the problem persists, contact us for a personalized home valuation.</p>
          <a href="contact.html" class="button">Request Manual Valuation</a>
        `;

        homebotContainer.appendChild(errorMessage);
      } else if (event.data && event.data.type === 'homebotLoaded') {
        // Hide loading indicator when loaded
        loadingIndicator.style.display = 'none';
      }
    });
  };

  // =========================================
  // REALSCOUT INTEGRATION ENHANCEMENTS
  // =========================================
  const initRealScout = () => {
    const realscoutContainers = document.querySelectorAll('realscout-office-listings');

    if (!realscoutContainers.length) return;

    realscoutContainers.forEach((container) => {
      // Add loading state
      const loadingIndicator = document.createElement('div');
      loadingIndicator.className = 'realscout-loading';
      loadingIndicator.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading properties...</p>
      `;

      container.parentNode.insertBefore(loadingIndicator, container.nextSibling);

      // Hide loading when loaded
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Check if RealScout content has loaded
            const hasContent = container.shadowRoot?.querySelector('.rs-listing-card');

            if (hasContent) {
              loadingIndicator.style.display = 'none';
              observer.disconnect();
            }
          }
        });
      });

      // Start observing
      observer.observe(container, { childList: true, subtree: true });

      // Hide loading after timeout (fallback)
      setTimeout(() => {
        loadingIndicator.style.display = 'none';
      }, 5000);
    });
  };

  // =========================================
  // THEME SETTINGS & PREFERENCES
  // =========================================
  const initThemeSettings = () => {
    // Check for saved preferences
    const savedSettings = localStorage.getItem('centennialHillsPreferences');
    let preferences = {};

    if (savedSettings) {
      try {
        preferences = JSON.parse(savedSettings);
        applyPreferences(preferences);
      } catch (e) {
        console.error('Error parsing saved preferences:', e);
      }
    }

    // Create settings button
    const settingsButton = document.createElement('button');
    settingsButton.className = 'theme-settings-button';
    settingsButton.setAttribute('aria-label', 'Customize website settings');
    settingsButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 1l9.5 5.5v11L12 23l-9.5-5.5v-11L12 1zm0 2.311L4.5 7.653v8.694l7.5 4.342 7.5-4.342V7.653L12 3.311zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>';

    document.body.appendChild(settingsButton);

    // Create settings panel
    const settingsPanel = document.createElement('div');
    settingsPanel.className = 'theme-settings-panel';
    settingsPanel.setAttribute('aria-hidden', 'true');

    settingsPanel.innerHTML = `
      <div class="theme-settings-content">
        <button class="theme-settings-close" aria-label="Close settings">&times;</button>
        <h3>Website Preferences</h3>
        
        <div class="settings-section">
          <h4>Font Size</h4>
          <div class="setting-controls">
            <button data-font-size="small" aria-label="Small font size">A</button>
            <button data-font-size="medium" aria-label="Medium font size" class="active">A</button>
            <button data-font-size="large" aria-label="Large font size">A</button>
          </div>
        </div>
        
        <div class="settings-section">
          <h4>Color Theme</h4>
          <div class="setting-controls">
            <button data-theme="light" aria-label="Light theme" class="active">Light</button>
            <button data-theme="dark" aria-label="Dark theme">Dark</button>
            <button data-theme="high-contrast" aria-label="High contrast theme">High Contrast</button>
          </div>
        </div>
        
        <div class="settings-section">
          <h4>Animations</h4>
          <div class="setting-controls">
            <label>
              <input type="checkbox" id="reduce-motion" checked>
              Reduce animations
            </label>
          </div>
        </div>
        
        <button class="reset-settings">Reset to Defaults</button>
      </div>
    `;

    document.body.appendChild(settingsPanel);

    // Toggle settings panel
    settingsButton.addEventListener('click', () => {
      const isHidden = settingsPanel.getAttribute('aria-hidden') === 'true';

      if (isHidden) {
        settingsPanel.setAttribute('aria-hidden', 'false');
        UTILS.animate(settingsPanel, { opacity: 1, transform: 'translateX(0)' });
      } else {
        settingsPanel.setAttribute('aria-hidden', 'true');
        UTILS.animate(settingsPanel, { opacity: 0, transform: 'translateX(100%)' });
      }
    });

    // Close settings panel
    const closeButton = settingsPanel.querySelector('.theme-settings-close');

    closeButton.addEventListener('click', () => {
      settingsPanel.setAttribute('aria-hidden', 'true');
      UTILS.animate(settingsPanel, { opacity: 0, transform: 'translateX(100%)' });
    });

    // Font size settings
    const fontButtons = settingsPanel.querySelectorAll('[data-font-size]');

    fontButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const fontSize = this.getAttribute('data-font-size');

        // Remove active class from all buttons
        fontButtons.forEach((btn) => btn.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        // Apply font size
        document.documentElement.setAttribute('data-font-size', fontSize);

        // Save preference
        savePreference('fontSize', fontSize);
      });
    });

    // Theme settings
    const themeButtons = settingsPanel.querySelectorAll('[data-theme]');

    themeButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const theme = this.getAttribute('data-theme');

        // Remove active class from all buttons
        themeButtons.forEach((btn) => btn.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        // Apply theme
        document.documentElement.setAttribute('data-theme', theme);

        // Save preference
        savePreference('theme', theme);
      });
    });

    // Animation settings
    const reduceMotion = document.getElementById('reduce-motion');

    reduceMotion.addEventListener('change', function () {
      // Apply preference
      document.documentElement.setAttribute('data-reduce-motion', this.checked);

      // Save preference
      savePreference('reduceMotion', this.checked);
    });

    // Reset settings
    const resetButton = settingsPanel.querySelector('.reset-settings');

    resetButton.addEventListener('click', () => {
      // Reset to defaults
      document.documentElement.setAttribute('data-font-size', 'medium');
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.setAttribute('data-reduce-motion', 'false');

      // Update UI
      fontButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-font-size') === 'medium');
      });

      themeButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.getAttribute('data-theme') === 'light');
      });

      reduceMotion.checked = false;

      // Clear saved preferences
      localStorage.removeItem('centennialHillsPreferences');
    });

    // Save preference to localStorage
    function savePreference(key, value) {
      preferences[key] = value;
      localStorage.setItem('centennialHillsPreferences', JSON.stringify(preferences));
    }

    // Apply saved preferences
    function applyPreferences(prefs) {
      // Apply font size
      if (prefs.fontSize) {
        document.documentElement.setAttribute('data-font-size', prefs.fontSize);

        fontButtons.forEach((btn) => {
          btn.classList.toggle('active', btn.getAttribute('data-font-size') === prefs.fontSize);
        });
      }

      // Apply theme
      if (prefs.theme) {
        document.documentElement.setAttribute('data-theme', prefs.theme);

        themeButtons.forEach((btn) => {
          btn.classList.toggle('active', btn.getAttribute('data-theme') === prefs.theme);
        });
      }

      // Apply animation preference
      if (prefs.reduceMotion !== undefined) {
        document.documentElement.setAttribute('data-reduce-motion', prefs.reduceMotion);
        reduceMotion.checked = prefs.reduceMotion;
      }
    }
  };

  // =========================================
  // INITIALIZE EVERYTHING
  // =========================================
  // Add animation-ready class to body
  document.body.classList.add('js-enabled');

  // Initialize all components
  initNavigation();
  initAccordions();
  initPropertyFeatures();
  initNeighborhoodMap();
  initNeighborhoodSelector();
  initScrollAnimations();
  initTestimonialSlider();
  initContactForm();
  initLazyLoading();
  initHomebot();
  initRealScout();
  initThemeSettings();

  // Add animation classes to sections for scroll animations
  document
    .querySelectorAll(
      '.page__main, .page__services, .page__about, .page__testimonial, .page__outro, .page__events, .page__market'
    )
    .forEach((section) => {
      section.classList.add('animate-on-scroll');
    });

  // Show page when ready
  UTILS.animate(document.body, { opacity: 1 });

  // Log initialization complete
  console.log('CentennialHillsHomesForSale.com JS initialized successfully!');
});
