
import { useEffect } from 'react';

const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const optimizePerformance = () => {
      try {
        // Optimize images loading
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (!img.loading) {
            img.loading = 'lazy';
          }
          if (!img.decoding) {
            img.decoding = 'async';
          }
        });

        // Optimize font loading
        const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
        linkElements.forEach(link => {
          if (link instanceof HTMLLinkElement && !link.media) {
            link.media = 'print';
            link.onload = () => {
              link.media = 'all';
            };
          }
        });

        // Prefetch important pages
        const importantPages = ['/listings', '/neighborhoods', '/contact'];
        importantPages.forEach(page => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = page;
          document.head.appendChild(link);
        });

        // Remove unused CSS classes (basic cleanup)
        const unusedSelectors = ['.unused-class', '.debug-only'];
        unusedSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => el.remove());
        });

      } catch (error) {
        console.warn('Performance optimization failed:', error);
      }
    };

    // Run optimization after initial load
    const timeout = setTimeout(optimizePerformance, 2000);
    
    return () => clearTimeout(timeout);
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default PerformanceOptimizer;
import React, { useEffect } from 'react';

const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        '/icon-192x192.png',
        '/icon-512x512.png',
        '/manifest.json'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = resource.endsWith('.png') ? 'image' : 'fetch';
        link.href = resource;
        document.head.appendChild(link);
      });
    };

    // Optimize images with intersection observer
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    };

    preloadCriticalResources();
    optimizeImages();

    // Clean up function
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;
