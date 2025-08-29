'use client';

import { getMemoryUsage } from '@/utils/performance';
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  memory: string;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const measureMetrics = () => {
      if ('performance' in window) {
        const perf = performance;
        
        // Measure Core Web Vitals
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              setMetrics(prev => prev ? { ...prev, lcp: entry.startTime } : null);
            }
            if (entry.entryType === 'first-input') {
              const eventEntry = entry as PerformanceEventTiming;
              setMetrics(prev => prev ? { ...prev, fid: eventEntry.processingStart - eventEntry.startTime } : null);
            }
          }
        });

        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });

        // Measure other metrics
        const navigation = perf.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const fcp = perf.getEntriesByName('first-contentful-paint')[0] as PerformanceEntry;
          
          setMetrics({
            fcp: fcp ? fcp.startTime : 0,
            lcp: 0,
            fid: 0,
            cls: 0,
            ttfb: navigation.responseStart - navigation.requestStart,
            memory: getMemoryUsage(),
          });
        }

        // Measure CLS
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift') {
              const shift = entry as any;
              if (!shift.hadRecentInput) {
                clsValue += shift.value;
              }
            }
          }
          setMetrics(prev => prev ? { ...prev, cls: clsValue } : null);
        });

        clsObserver.observe({ entryTypes: ['layout-shift'] });

        return () => {
          observer.disconnect();
          clsObserver.disconnect();
        };
      }
    };

    const cleanup = measureMetrics();
    return cleanup;
  }, []);

  if (process.env.NODE_ENV !== 'development' || !metrics) return null;

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleVisibility}
        className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="Toggle Performance Monitor"
      >
        📊
      </button>
      
      {isVisible && (
        <div className="absolute bottom-16 right-0 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-80">
          <h3 className="font-semibold text-gray-800 mb-3">Performance Metrics</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">FCP:</span>
              <span className={metrics.fcp < 1800 ? 'text-green-600' : 'text-red-600'}>
                {metrics.fcp.toFixed(0)}ms
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">LCP:</span>
              <span className={metrics.lcp < 2500 ? 'text-green-600' : 'text-red-600'}>
                {metrics.lcp.toFixed(0)}ms
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">FID:</span>
              <span className={metrics.fid < 100 ? 'text-green-600' : 'text-red-600'}>
                {metrics.fid.toFixed(0)}ms
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">CLS:</span>
              <span className={metrics.cls < 0.1 ? 'text-green-600' : 'text-red-600'}>
                {metrics.cls.toFixed(3)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">TTFB:</span>
              <span className={metrics.ttfb < 600 ? 'text-green-600' : 'text-red-600'}>
                {metrics.ttfb.toFixed(0)}ms
              </span>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <span className="text-gray-600 text-xs">{metrics.memory}</span>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-gray-500">
            <p>Green: Good | Red: Needs improvement</p>
          </div>
        </div>
      )}
    </div>
  );
}
