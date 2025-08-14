// lib/rss-utils.ts
// Utility functions for RSS feed components

// Date formatting utilities
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
    
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  } catch {
    return 'Unknown date';
  }
};

export const formatReadTime = (readTime: number): string => {
  if (readTime <= 0) return '';
  
  if (readTime < 1) {
    return '< 1 min read';
  } else if (readTime === 1) {
    return '1 min read';
  } else {
    return `${readTime} min read`;
  }
};

// RSS data caching utilities
const RSS_CACHE_PREFIX = 'rss_cache_';
const RSS_CACHE_TTL = 3600000; // 1 hour default

export const cacheRSSData = (key: string, data: any, ttl: number = RSS_CACHE_TTL): void => {
  try {
    const cacheKey = `${RSS_CACHE_PREFIX}${key}`;
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Failed to cache RSS data:', error);
  }
};

export const getCachedRSSData = (key: string): any | null => {
  try {
    const cacheKey = `${RSS_CACHE_PREFIX}${key}`;
    const cached = localStorage.getItem(cacheKey);
    
    if (!cached) return null;
    
    const cacheData = JSON.parse(cached);
    const now = Date.now();
    
    // Check if cache is expired
    if (now - cacheData.timestamp > cacheData.ttl) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    return cacheData.data;
  } catch (error) {
    console.warn('Failed to retrieve cached RSS data:', error);
    return null;
  }
};

export const clearRSSCache = (key?: string): void => {
  try {
    if (key) {
      const cacheKey = `${RSS_CACHE_PREFIX}${key}`;
      localStorage.removeItem(cacheKey);
    } else {
      // Clear all RSS cache
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith(RSS_CACHE_PREFIX)) {
          localStorage.removeItem(k);
        }
      });
    }
  } catch (error) {
    console.warn('Failed to clear RSS cache:', error);
  }
};

// Analytics tracking utilities
export const trackRSSAnalytics = (
  event: string, 
  data: any, 
  metadata: any = {}
): void => {
  try {
    // Google Analytics 4 event tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, {
        ...data,
        ...metadata,
        event_category: 'RSS_Feed',
        event_label: metadata.variant || 'default'
      });
    }
    
    // Custom analytics tracking
    const analyticsEvent = {
      event,
      data,
      metadata,
      timestamp: new Date().toISOString(),
      url: window?.location?.href || '',
      userAgent: window?.navigator?.userAgent || ''
    };
    
    // Send to custom analytics endpoint if available
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analyticsEvent)
      }).catch(() => {
        // Silently fail if analytics endpoint is unavailable
      });
    }
    
    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('RSS Analytics Event:', analyticsEvent);
    }
  } catch (error) {
    console.warn('Failed to track RSS analytics:', error);
  }
};

// Performance tracking utilities
export const trackRSSPerformance = (
  metric: string, 
  value: number, 
  metadata: any = {}
): void => {
  try {
    // Web Vitals tracking
    if (typeof window !== 'undefined' && window.webVitals) {
      window.webVitals.track(metric, value, metadata);
    }
    
    // Custom performance tracking
    const performanceEvent = {
      metric,
      value,
      metadata,
      timestamp: new Date().toISOString(),
      url: window?.location?.href || '',
      userAgent: window?.navigator?.userAgent || ''
    };
    
    // Send to performance monitoring endpoint if available
    if (process.env.NEXT_PUBLIC_PERFORMANCE_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_PERFORMANCE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(performanceEvent)
      }).catch(() => {
        // Silently fail if performance endpoint is unavailable
      });
    }
    
    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('RSS Performance Metric:', performanceEvent);
    }
  } catch (error) {
    console.warn('Failed to track RSS performance:', error);
  }
};

// RSS feed validation utilities
export const validateRSSData = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  if (!Array.isArray(data.articles)) return false;
  
  return data.articles.every(article => 
    article && 
    typeof article === 'object' &&
    typeof article.title === 'string' &&
    typeof article.link === 'string'
  );
};

// RSS feed error handling utilities
export const handleRSSError = (error: any, context: string = 'RSS Feed'): string => {
  console.error(`${context} Error:`, error);
  
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Network error. Please check your connection and try again.';
  }
  
  if (error.status === 404) {
    return 'Feed not found. Please try again later.';
  }
  
  if (error.status >= 500) {
    return 'Server error. Please try again later.';
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// RSS feed retry utilities
export const retryRSSFetch = async (
  fetchFn: () => Promise<any>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<any> => {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchFn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Exponential backoff
      const waitTime = delay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  throw lastError;
};

// Type definitions for better TypeScript support
export interface RSSAnalyticsEvent {
  event: string;
  data: any;
  metadata: any;
  timestamp: string;
  url: string;
  userAgent: string;
}

export interface RSSPerformanceMetric {
  metric: string;
  value: number;
  metadata: any;
  timestamp: string;
  url: string;
  userAgent: string;
}

export interface RSSCacheData {
  data: any;
  timestamp: number;
  ttl: number;
}

// Global type declarations for external libraries
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    webVitals?: {
      track: (metric: string, value: number, metadata?: any) => void;
    };
  }
}
