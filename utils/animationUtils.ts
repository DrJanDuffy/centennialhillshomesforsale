// Animation Utility System for Centennial Hills Real Estate Website
// Fixes critical UI rendering issues with opacity and transform properties

export interface AnimationConfig {
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  distance?: number;
}

// Default animation configurations
export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  delay: 0,
  duration: 0.6,
  threshold: 0.1,
  triggerOnce: true,
  rootMargin: '0px 0px -50px 0px',
};

// Animation variants for Framer Motion
export const animationVariants = {
  // Fade animations
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },

  // Slide animations
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },

  slideDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },

  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },

  slideRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },

  // Scale animations
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },

  // Stagger animations
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },

  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
};

// Transition configurations
export const transitionConfigs = {
  fast: { duration: 0.3, ease: 'easeOut' },
  normal: { duration: 0.6, ease: 'easeOut' },
  slow: { duration: 0.9, ease: 'easeOut' },
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
  },
  bounce: {
    type: 'spring',
    stiffness: 200,
    damping: 10,
  },
};

// Utility function to create intersection observer
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = DEFAULT_ANIMATION_CONFIG
): IntersectionObserver {
  return new IntersectionObserver(callback, options);
}

// Utility function to animate elements on scroll
export function animateOnScroll(
  elements: NodeListOf<Element> | Element[],
  animationClass: string = 'animate-in',
  config: ScrollAnimationConfig = {}
): void {
  const observer = createIntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);

        // Remove inline styles that might be causing issues
        const element = entry.target as HTMLElement;
        if (element.style.opacity === '0') {
          element.style.opacity = '1';
        }
        if (element.style.transform && element.style.transform !== 'none') {
          element.style.transform = 'none';
        }
      }
    });
  }, config);

  elements.forEach((element) => observer.observe(element));
}

// Utility function to fix immediate visibility issues
export function fixImmediateVisibility(): void {
  // Fix all elements with opacity: 0
  const hiddenElements = document.querySelectorAll('[style*="opacity:0"]');
  hiddenElements.forEach((element) => {
    const el = element as HTMLElement;
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.classList.add('animate-fade-in');
  });

  // Fix elements with problematic transform properties
  const transformElements = document.querySelectorAll(
    '[style*="transform:translateY"], [style*="transform:translateX"], [style*="transform:scale"]'
  );
  transformElements.forEach((element) => {
    const el = element as HTMLElement;
    if (el.style.opacity === '0') {
      el.style.opacity = '1';
    }
    el.style.transform = 'none';
    el.classList.add('animate-slide-up');
  });
}

// Utility function to replace loading skeletons with content
export function replaceLoadingSkeletons(): void {
  const skeletons = document.querySelectorAll('.loading-skeleton');
  skeletons.forEach((skeleton) => {
    const parent = skeleton.parentElement;
    if (parent) {
      // Create placeholder content based on skeleton height
      const height = skeleton.classList.contains('h-64')
        ? 'h-64'
        : skeleton.classList.contains('h-96')
          ? 'h-96'
          : 'h-64';

      const placeholder = document.createElement('div');
      placeholder.className = `bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg ${height} flex items-center justify-center`;
      placeholder.innerHTML = `
        <div class="text-center text-gray-500">
          <div class="animate-spin w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full mx-auto mb-2"></div>
          <p class="text-sm">Loading content...</p>
        </div>
      `;

      parent.replaceChild(placeholder, skeleton);

      // Remove placeholder after a delay and show actual content
      setTimeout(() => {
        if (placeholder.parentElement) {
          placeholder.remove();
          // Trigger content loading if parent has data attributes
          const parentElement = placeholder.parentElement as HTMLElement;
          if (parentElement.dataset.loadContent) {
            loadDynamicContent(parentElement);
          }
        }
      }, 2000);
    }
  });
}

// Utility function to load dynamic content
export function loadDynamicContent(container: HTMLElement): void {
  const contentType = container.dataset.contentType;

  switch (contentType) {
    case 'property-listings':
      loadPropertyListings(container);
      break;
    case 'market-data':
      loadMarketData(container);
      break;
    case 'amenities':
      loadAmenities(container);
      break;
    default:
      // Default fallback content
      container.innerHTML = `
        <div class="text-center text-gray-500 py-8">
          <p class="text-lg">Content loaded successfully</p>
        </div>
      `;
  }
}

// Property listings loader
function loadPropertyListings(container: HTMLElement): void {
  container.innerHTML = `
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

// Market data loader
function loadMarketData(container: HTMLElement): void {
  container.innerHTML = `
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

// Amenities loader
function loadAmenities(container: HTMLElement): void {
  container.innerHTML = `
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div class="flex items-center p-3 bg-gray-50 rounded-lg">
        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          🏫
        </div>
        <span class="text-sm font-medium">Top Schools</span>
      </div>
      <div class="flex items-center p-3 bg-gray-50 rounded-lg">
        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
          🏞️
        </div>
        <span class="text-sm font-medium">Parks & Trails</span>
      </div>
      <div class="flex items-center p-3 bg-gray-50 rounded-lg">
        <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
          🛍️
        </div>
        <span class="text-sm font-medium">Shopping</span>
      </div>
    </div>
  `;
}

// Initialize all animations when DOM is ready
export function initializeAnimations(): void {
  // Fix immediate visibility issues
  fixImmediateVisibility();

  // Replace loading skeletons
  replaceLoadingSkeletons();

  // Set up scroll animations for all animated elements
  const animatedElements = document.querySelectorAll('[data-animate]');
  animateOnScroll(animatedElements);

  // Set up intersection observer for lazy loading
  setupLazyLoading();
}

// Set up lazy loading for images and content
function setupLazyLoading(): void {
  const lazyElements = document.querySelectorAll('[data-lazy]');

  const lazyObserver = createIntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        const lazyType = element.dataset.lazy;

        if (lazyType === 'image' && element.tagName === 'IMG') {
          const img = element as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('opacity-0');
            img.classList.add('opacity-100');
          }
        } else if (lazyType === 'content') {
          element.classList.remove('opacity-0');
          element.classList.add('opacity-100');
        }

        lazyObserver.unobserve(element);
      }
    });
  });

  lazyElements.forEach((element) => lazyObserver.observe(element));
}

// Export default configuration
export default {
  animationVariants,
  transitionConfigs,
  createIntersectionObserver,
  animateOnScroll,
  fixImmediateVisibility,
  replaceLoadingSkeletons,
  initializeAnimations,
};
