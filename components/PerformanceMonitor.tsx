'use client';

import { useEffect, useState, useCallback } from 'react';
import type React from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  fmp: number | null;
}

interface PerformanceAlert {
  type: 'warning' | 'error' | 'info';
  metric: string;
  value: number;
  threshold: number;
  message: string;
  timestamp: Date;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fmp: null,
  });
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  // Performance thresholds (Google's recommended values)
  const thresholds = {
    fcp: { good: 1800, poor: 3000 },
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 },
    ttfb: { good: 800, poor: 1800 },
  };

  // Measure First Contentful Paint (FCP)
  const measureFCP = useCallback(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          const fcp = fcpEntry.startTime;
          setMetrics(prev => ({ ...prev, fcp }));
          checkThreshold('fcp', fcp, thresholds.fcp);
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    }
  }, []);

  // Measure Largest Contentful Paint (LCP)
  const measureLCP = useCallback(() => {
    if ('PerformanceObserver' in window) {
      let lcpValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          lcpValue = lastEntry.startTime;
          setMetrics(prev => ({ ...prev, lcp: lcpValue }));
          checkThreshold('lcp', lcpValue, thresholds.lcp);
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }, []);

  // Measure First Input Delay (FID)
  const measureFID = useCallback(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fid = entry.processingStart - entry.startTime;
          setMetrics(prev => ({ ...prev, fid }));
          checkThreshold('fid', fid, thresholds.fid);
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    }
  }, []);

  // Measure Cumulative Layout Shift (CLS)
  const measureCLS = useCallback(() => {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setMetrics(prev => ({ ...prev, cls: clsValue }));
            checkThreshold('cls', clsValue, thresholds.cls);
          }
        });
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }, []);

  // Measure Time to First Byte (TTFB)
  const measureTTFB = useCallback(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.entryType === 'navigation') {
            const ttfb = entry.responseStart - entry.requestStart;
            setMetrics(prev => ({ ...prev, ttfb }));
            checkThreshold('ttfb', ttfb, thresholds.ttfb);
          }
        });
      });
      observer.observe({ entryTypes: ['navigation'] });
    }
  }, []);

  // Check if metrics meet thresholds and generate alerts
  const checkThreshold = useCallback((metric: string, value: number, threshold: { good: number; poor: number }) => {
    let alertType: 'warning' | 'error' | 'info' = 'info';
    let message = '';

    if (value > threshold.poor) {
      alertType = 'error';
      message = `${metric.toUpperCase()} is poor (${value.toFixed(2)}). Consider optimization.`;
    } else if (value > threshold.good) {
      alertType = 'warning';
      message = `${metric.toUpperCase()} needs improvement (${value.toFixed(2)}).`;
    } else {
      alertType = 'info';
      message = `${metric.toUpperCase()} is good (${value.toFixed(2)}).`;
    }

    const alert: PerformanceAlert = {
      type: alertType,
      metric,
      value,
      threshold: threshold.good,
      message,
      timestamp: new Date(),
    };

    setAlerts(prev => [alert, ...prev.slice(0, 9)]); // Keep last 10 alerts
  }, []);

  // Start performance monitoring
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    measureFCP();
    measureLCP();
    measureFID();
    measureCLS();
    measureTTFB();
  }, [measureFCP, measureLCP, measureFID, measureCLS, measureTTFB]);

  // Stop performance monitoring
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  // Get performance score (0-100)
  const getPerformanceScore = useCallback(() => {
    const scores = Object.entries(metrics).map(([key, value]) => {
      if (!value || !thresholds[key as keyof typeof thresholds]) return 100;
      
      const threshold = thresholds[key as keyof typeof thresholds];
      if (value <= threshold.good) return 100;
      if (value <= threshold.poor) return 50;
      return 0;
    });

    const validScores = scores.filter(score => score !== 100);
    if (validScores.length === 0) return 100;
    
    return Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length);
  }, [metrics]);

  // Get metric status
  const getMetricStatus = useCallback((metric: string, value: number | null) => {
    if (!value || !thresholds[metric as keyof typeof thresholds]) return 'unknown';
    
    const threshold = thresholds[metric as keyof typeof thresholds];
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }, []);

  // Initialize monitoring on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      startMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [startMonitoring, stopMonitoring]);

  // Send performance data to analytics (if configured)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      Object.entries(metrics).forEach(([key, value]) => {
        if (value) {
          window.gtag('event', 'performance_metric', {
            metric_name: key,
            value: Math.round(value),
            performance_score: getPerformanceScore(),
          });
        }
      });
    }
  }, [metrics, getPerformanceScore]);

  return (
    <div className="performance-monitor bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Performance Monitor</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Score: <span className="font-semibold text-blue-600">{getPerformanceScore()}/100</span>
          </div>
          <button
            onClick={isMonitoring ? stopMonitoring : startMonitoring}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isMonitoring
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isMonitoring ? 'Stop' : 'Start'} Monitoring
          </button>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(metrics).map(([key, value]) => {
          const status = getMetricStatus(key, value);
          const statusColors = {
            good: 'text-green-600 bg-green-100',
            'needs-improvement': 'text-yellow-600 bg-yellow-100',
            poor: 'text-red-600 bg-red-100',
            unknown: 'text-gray-600 bg-gray-100',
          };

          return (
            <div key={key} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700 uppercase">{key}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
                  {status.replace('-', ' ')}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {value ? `${value.toFixed(2)}` : 'N/A'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {key === 'cls' ? 'Score' : key === 'fid' ? 'ms' : 'ms'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Alerts */}
      {alerts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Alerts</h3>
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'error'
                    ? 'bg-red-50 border-red-400 text-red-800'
                    : alert.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-400 text-yellow-800'
                    : 'bg-blue-50 border-blue-400 text-blue-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{alert.message}</span>
                  <span className="text-xs opacity-75">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Recommendations */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Optimization Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use Next.js Image component for automatic optimization</li>
          <li>• Implement lazy loading for below-the-fold content</li>
          <li>• Minimize JavaScript bundle size with code splitting</li>
          <li>• Enable compression and caching headers</li>
          <li>• Use WebP format for images when possible</li>
        </ul>
      </div>
    </div>
  );
}
