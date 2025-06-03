
import React, { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

const PerformanceOptimizer: React.FC = () => {
  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    // Preload critical fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];

    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = () => {
        link.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });

    // Preload critical images
    const criticalImages = [
      '/images/hero-background.jpg',
      '/images/logo.png',
      '/icon-192x192.png',
      '/icon-512x512.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  // Lazy load non-critical images
  const setupLazyLoading = useCallback(() => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      // Observe all images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }, []);

  // Optimize bundle loading
  const optimizeBundleLoading = useCallback(() => {
    // Preload next page chunks for common navigation
    const commonRoutes = ['/listings', '/neighborhoods', '/contact'];
    
    commonRoutes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  }, []);

  // Monitor Core Web Vitals
  const monitorWebVitals = useCallback(() => {
    const metrics: PerformanceMetrics = {};

    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
              console.log('FCP:', entry.startTime);
            }
          }
        });
        observer.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('Performance Observer not supported');
      }
    }

    // Time to First Byte
    if (window.performance && window.performance.timing) {
      const { responseStart, requestStart } = window.performance.timing;
      metrics.ttfb = responseStart - requestStart;
      console.log('TTFB:', metrics.ttfb);
    }

    return metrics;
  }, []);

  // Service Worker registration for caching
  const registerServiceWorker = useCallback(async () => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.warn('Service Worker registration failed:', error);
      }
    }
  }, []);

  // Optimize third-party scripts
  const optimizeThirdPartyScripts = useCallback(() => {
    // Defer non-critical scripts
    const scripts = document.querySelectorAll('script[data-defer]');
    scripts.forEach(script => {
      script.setAttribute('defer', '');
    });

    // Load analytics after user interaction
    let analyticsLoaded = false;
    const loadAnalytics = () => {
      if (analyticsLoaded) return;
      analyticsLoaded = true;
      
      // Load Google Analytics or other analytics here
      console.log('Loading analytics after user interaction');
    };

    // Load on first user interaction
    ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
      document.addEventListener(event, loadAnalytics, { once: true, passive: true });
    });
  }, []);

  // Resource hints for better loading
  const addResourceHints = useCallback(() => {
    // DNS prefetch for external domains
    const domains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'www.google-analytics.com'
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });

    // Preconnect to critical external resources
    const criticalDomains = ['fonts.googleapis.com'];
    criticalDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = `https://${domain}`;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  // Memory management
  const optimizeMemoryUsage = useCallback(() => {
    // Clear unused images from memory
    const cleanupImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isVisible && img.dataset.cleanup !== 'false') {
          // Remove src to free memory for off-screen images
          if (img.src && !img.dataset.src) {
            img.dataset.src = img.src;
            img.src = '';
          }
        }
      });
    };

    // Run cleanup on scroll with throttling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          cleanupImages();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Optimize images with intersection observer
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img');
    
    images.forEach((img, index) => {
      // Add lazy loading attribute
      if (!img.loading) {
        img.loading = 'lazy';
      }
      
      // Add async decoding
      if (!img.decoding) {
        img.decoding = 'async';
      }
      
      // Check for large unoptimized images
      if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
        console.warn(`Large unoptimized image ${index + 1} (${img.naturalWidth}x${img.naturalHeight})`);
      }
    });
  }, []);

  // Initialize all optimizations
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const initOptimizations = async () => {
      try {
        // Run immediately
        preloadCriticalResources();
        addResourceHints();
        monitorWebVitals();
        optimizeImages();

        // Run after a short delay to avoid blocking initial render
        setTimeout(() => {
          setupLazyLoading();
          optimizeBundleLoading();
          optimizeThirdPartyScripts();
        }, 100);

        // Run after page is fully loaded
        const handleLoad = () => {
          registerServiceWorker();
          optimizeMemoryUsage();
        };

        if (document.readyState === 'complete') {
          handleLoad();
        } else {
          window.addEventListener('load', handleLoad, { once: true });
        }

      } catch (error) {
        console.warn('Performance optimization failed:', error);
      }
    };

    initOptimizations();

    // Cleanup on unmount
    return () => {
      // Remove any event listeners if needed
    };
  }, [
    preloadCriticalResources,
    addResourceHints,
    monitorWebVitals,
    optimizeImages,
    setupLazyLoading,
    optimizeBundleLoading,
    optimizeThirdPartyScripts,
    registerServiceWorker,
    optimizeMemoryUsage
  ]);

  // Component is invisible - it only performs optimizations
  return null;
};

export default PerformanceOptimizer;
