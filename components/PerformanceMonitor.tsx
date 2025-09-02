import { useEffect } from 'react';

// Type definitions for Performance API
interface PerformanceEntryWithProcessingStart extends PerformanceEntry {
  processingStart?: number;
}

interface PerformanceEntryWithValue extends PerformanceEntry {
  value?: number;
  hadRecentInput?: boolean;
}

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log('LCP:', entry.startTime);
          // Send to analytics
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const fidEntry = entry as PerformanceEntryWithProcessingStart;
          if (fidEntry.processingStart) {
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
            // Send to analytics
          }
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const clsEntry = entry as PerformanceEntryWithValue;
          if (!clsEntry.hadRecentInput && clsEntry.value !== undefined) {
            console.log('CLS:', clsEntry.value);
            // Send to analytics
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }, []);

  return null;
};