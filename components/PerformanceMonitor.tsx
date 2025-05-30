
import { useEffect } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  renderTime: number;
  interactionDelay: number;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          const metrics: PerformanceMetrics = {
            pageLoadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
            renderTime: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            interactionDelay: navEntry.responseEnd - navEntry.requestStart
          };
          
          // Log metrics for monitoring
          console.log('Performance Metrics:', metrics);
          
          // Store in localStorage for analytics
          localStorage.setItem('performance-metrics', JSON.stringify(metrics));
        }
      }
    });

    observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });

    // Cleanup observer
    return () => observer.disconnect();
  }, []);

  return null; // This component doesn't render anything
}
