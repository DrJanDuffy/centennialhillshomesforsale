import type React from 'react';
import { useEffect } from 'react';

interface PerformanceOptimizerProps {
  enableMonitoring?: boolean;
  enablePreloading?: boolean;
  enableLazyLoading?: boolean;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  enableMonitoring = true,
  enablePreloading = true,
  enableLazyLoading = true,
}) => {
  useEffect(() => {
    if (enableMonitoring && typeof window !== 'undefined') {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
            // Send to analytics
            if (window.gtag) {
              window.gtag('event', 'core_web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'LCP',
                value: Math.round(entry.startTime),
              });
            }
          }

          if (entry.entryType === 'first-input') {
            const fidEntry = entry as PerformanceEventTiming;
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
            if (window.gtag) {
              window.gtag('event', 'core_web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'FID',
                value: Math.round(fidEntry.processingStart - fidEntry.startTime),
              });
            }
          }

          if (entry.entryType === 'layout-shift') {
            const clsEntry = entry as unknown as { value: number };
            console.log('CLS:', clsEntry.value);
            if (window.gtag) {
              window.gtag('event', 'core_web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'CLS',
                value: Math.round(clsEntry.value * 1000),
              });
            }
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

      return () => observer.disconnect();
    }
  }, [enableMonitoring]);

  useEffect(() => {
    if (enablePreloading && typeof window !== 'undefined') {
      // Preload critical resources
      const preloadLinks = [
        { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2' },
        { href: '/images/hero-image.jpg', as: 'image' },
        { href: '/images/dr-jan-duffy-realtor.jpg', as: 'image' },
      ];

      preloadLinks.forEach((link) => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'preload';
        linkElement.href = link.href;
        if (link.as) linkElement.setAttribute('as', link.as);
        if (link.type) linkElement.setAttribute('type', link.type);
        linkElement.crossOrigin = 'anonymous';
        document.head.appendChild(linkElement);
      });
    }
  }, [enablePreloading]);

  useEffect(() => {
    if (enableLazyLoading && typeof window !== 'undefined') {
      // Intersection Observer for lazy loading images
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01,
        }
      );

      // Observe all lazy images
      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
      });

      return () => imageObserver.disconnect();
    }
  }, [enableLazyLoading]);

  useEffect(() => {
    // DNS prefetch for external domains
    const domains = [
      '//www.google-analytics.com',
      '//maps.googleapis.com',
      '//images.unsplash.com',
      '//fonts.googleapis.com',
      '//fonts.gstatic.com',
    ];

    domains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    // Preconnect to critical domains
    const criticalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://images.unsplash.com',
    ];

    criticalDomains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = '';
      document.head.appendChild(link);
    });
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;
