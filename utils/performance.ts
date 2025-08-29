/**
 * Performance optimization utilities
 */

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for performance optimization
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
}

// Performance measurement utility
export function measurePerformance<T>(
  name: string,
  fn: () => T
): T {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start}ms`);
    return result;
  }
  return fn();
}

// Memory usage monitoring
export function getMemoryUsage(): string {
  if (typeof performance !== 'undefined' && 'memory' in performance) {
    const memory = (performance as any).memory;
    return `Used: ${Math.round(memory.usedJSHeapSize / 1048576)}MB, Total: ${Math.round(memory.totalJSHeapSize / 1048576)}MB`;
  }
  return 'Memory usage not available';
}

// Bundle size optimization helper
export function optimizeImports<T>(imports: T[]): T[] {
  return imports.filter(Boolean);
}

// Cache utility for expensive operations
export function createCache<K, V>(
  maxSize: number = 100
): Map<K, V> {
  return new Map<K, V>();
}

// Performance budget checker
export function checkPerformanceBudget(
  actual: number,
  budget: number,
  metric: string
): boolean {
  const isWithinBudget = actual <= budget;
  if (!isWithinBudget) {
    console.warn(
      `${metric} exceeded budget: ${actual}ms > ${budget}ms`
    );
  }
  return isWithinBudget;
}
