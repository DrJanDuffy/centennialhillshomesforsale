// Performance optimization utilities for real estate website

// Debounce function for performance optimization
export function debounce<T extends (...args: unknown[]) => unknown>(
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
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Intersection Observer utility for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options,
  });
}

// Performance measurement utility
export function measurePerformance<T>(name: string, fn: () => T): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
}

// Memory usage utility
export function getMemoryUsage(): string {
  if (typeof performance !== 'undefined' && 'memory' in performance) {
    const memory = (performance as Performance & { memory: PerformanceMemory }).memory;
    return `Used: ${Math.round(memory.usedJSHeapSize / 1048576)}MB, Total: ${Math.round(memory.totalJSHeapSize / 1048576)}MB`;
  }
  return 'Memory API not supported';
}

interface PerformanceMemory {
  totalJSHeapSize: number;
  usedJSHeapSize: number;
  jsHeapSizeLimit: number;
}

// Bundle size optimization helper
export function optimizeImports<T>(imports: T[]): T[] {
  return imports.filter(Boolean);
}

// Cache utility for expensive operations
export function createCache<K, V>(_maxSize: number = 100): Map<K, V> {
  return new Map<K, V>();
}

// Performance budget checker
export function checkPerformanceBudget(metric: string, value: number, budget: number): boolean {
  const isWithinBudget = value <= budget;
  if (!isWithinBudget) {
    console.warn(`Performance budget exceeded for ${metric}: ${value} > ${budget}`);
  }
  return isWithinBudget;
}
