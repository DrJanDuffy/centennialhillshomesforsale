import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

interface PageError {
  page: string;
  error: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

interface ErrorStats {
  totalErrors: number;
  criticalErrors: number;
  lastCheck: string;
}

export default function PageErrorChecker() {
  const router = useRouter();
  const [errors, setErrors] = useState<PageError[]>([]);
  const [stats, setStats] = useState<ErrorStats>({ totalErrors: 0, criticalErrors: 0, lastCheck: '' });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const checkPageErrors = useCallback(() => {
    if (!isClient || typeof window === 'undefined') return;

    const newErrors: PageError[] = [];

    try {
      // Check for missing images
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        if (img.naturalWidth === 0 && img.complete) {
          newErrors.push({
            page: router.pathname,
            error: `Missing image: ${img.src || img.alt || `Image ${index + 1}`}`,
            severity: 'medium',
            timestamp: new Date().toISOString()
          });
        }

        // Check for large unoptimized images
        if (img.naturalWidth > 2000 || img.naturalHeight > 2000) {
          newErrors.push({
            page: router.pathname,
            error: `Large unoptimized image: ${img.naturalWidth}x${img.naturalHeight}`,
            severity: 'medium',
            timestamp: new Date().toISOString()
          });
        }
      });

      // Check for broken links
      const links = document.querySelectorAll('a[href^="/"], a[href^="http"]');
      links.forEach((link) => {
        const href = link.getAttribute('href');
        if (href && href.includes('undefined') || href === '#') {
          newErrors.push({
            page: router.pathname,
            error: `Broken link: ${href}`,
            severity: 'high',
            timestamp: new Date().toISOString()
          });
        }
      });

      // Check for excessive DOM nodes
      const allElements = document.querySelectorAll('*');
      if (allElements.length > 1500) {
        newErrors.push({
          page: router.pathname,
          error: `Excessive DOM nodes: ${allElements.length} (recommended: <1500)`,
          severity: 'low',
          timestamp: new Date().toISOString()
        });
      }

      // Check for console errors
      const originalError = console.error;
      console.error = (...args) => {
        newErrors.push({
          page: router.pathname,
          error: `Console error: ${args.join(' ')}`,
          severity: 'high',
          timestamp: new Date().toISOString()
        });
        originalError.apply(console, args);
      };

    } catch (error) {
      newErrors.push({
        page: router.pathname,
        error: `Error checking failed: ${error instanceof Error ? error.message : String(error)}`,
        severity: 'low',
        timestamp: new Date().toISOString()
      });
    }

    setErrors(newErrors);
    setStats({
      totalErrors: newErrors.length,
      criticalErrors: newErrors.filter(e => e.severity === 'critical').length,
      lastCheck: new Date().toISOString()
    });

    // Store in localStorage for debugging
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('page-errors', JSON.stringify(newErrors));
      localStorage.setItem('error-stats', JSON.stringify(stats));
    }
  }, [isClient, router.pathname, stats]);

  useEffect(() => {
    if (isClient && router?.isReady) {
      const timeout = setTimeout(() => {
        checkPageErrors();
      }, 2000); // Increased delay for better stability

      return () => clearTimeout(timeout);
    }
  }, [isClient, router?.pathname, checkPageErrors, router?.isReady]);

  // Only show errors in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 max-w-sm z-50 shadow-lg">
      <div className="text-sm">
        <div className="font-semibold text-red-800 mb-2">Page Health Check</div>
        <div className="text-red-600">
          Total Issues: {stats.totalErrors}
          {stats.criticalErrors > 0 && (
            <span className="text-red-800 font-semibold ml-2">
              Critical: {stats.criticalErrors}
            </span>
          )}
        </div>
        {errors.slice(0, 3).map((error, index) => (
          <div key={index} className="text-xs text-red-500 mt-1 truncate">
            {error.error}
          </div>
        ))}
      </div>
    </div>
  );
}