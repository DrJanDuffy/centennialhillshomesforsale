// RSS Feed Utility Functions

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)} months ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  } catch (error) {
    console.warn('Error formatting date:', error);
    return 'Recent';
  }
}

/**
 * Format read time for display
 * @param {number} minutes - Read time in minutes
 * @returns {string} Formatted read time
 */
export function formatReadTime(minutes) {
  if (!minutes || minutes < 1) return '1 min';
  if (minutes === 1) return '1 min';
  return `${minutes} min`;
}

/**
 * Generate excerpt from content
 * @param {string} content - Article content
 * @param {number} maxLength - Maximum excerpt length
 * @returns {string} Generated excerpt
 */
export function generateExcerpt(content, maxLength = 150) {
  if (!content) return '';
  
  try {
    const words = content.split(' ');
    if (words.length <= maxLength / 5) return content;
    
    return `${words.slice(0, Math.floor(maxLength / 5)).join(' ')}...`;
  } catch (error) {
    console.warn('Error generating excerpt:', error);
    return content || '';
  }
}

/**
 * Calculate read time from content
 * @param {string} content - Article content
 * @param {number} wordsPerMinute - Reading speed (default: 200)
 * @returns {number} Read time in minutes
 */
export function calculateReadTime(content, wordsPerMinute = 200) {
  try {
    const wordCount = content.split(' ').length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  } catch (error) {
    console.warn('Error calculating read time:', error);
    return 1;
  }
}

/**
 * Extract image URL from content
 * @param {string} content - HTML content
 * @returns {string|undefined} Image URL or undefined
 */
export function extractImageUrl(content) {
  try {
    const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
    return imgMatch ? imgMatch[1] : undefined;
  } catch (error) {
    console.warn('Error extracting image URL:', error);
    return undefined;
  }
}

/**
 * Sanitize HTML content
 * @param {string} content - HTML content
 * @returns {string} Sanitized content
 */
export function sanitizeContent(content) {
  if (!content) return '';
  
  try {
    // Remove script, style, and other potentially harmful tags
    let cleaned = content
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
      .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, '')
      .replace(/<embed[^>]*>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return cleaned;
  } catch (error) {
    console.warn('Error sanitizing content:', error);
    return content || '';
  }
}

/**
 * Decode HTML entities
 * @param {string} text - Text with HTML entities
 * @returns {string} Decoded text
 */
export function decodeHtmlEntities(text) {
  try {
    const entities = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&apos;': "'",
      '&nbsp;': ' ',
      '&hellip;': '...',
      '&mdash;': '—',
      '&ndash;': '–',
      '&copy;': '©',
      '&reg;': '®',
      '&trade;': '™'
    };

    return text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
      return entities[entity] || entity;
    });
  } catch (error) {
    console.warn('Error decoding HTML entities:', error);
    return text;
  }
}

/**
 * Track RSS feed analytics
 * @param {string} action - Action type (view, click, share)
 * @param {object} article - Article data
 * @param {object} context - Additional context
 */
export function trackRSSAnalytics(action, article, context = {}) {
  try {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: 'RSS Feed',
        event_label: article.title,
        value: article.readTime || 1,
        custom_parameters: {
          article_id: article.id,
          category: article.category,
          author: article.author,
          source: 'KCM',
          ...context
        }
      });
    }

    // Custom analytics tracking
    const analyticsData = {
      timestamp: new Date().toISOString(),
      action,
      article_id: article.id,
      title: article.title,
      category: article.category,
      source: 'KCM',
      user_agent: navigator.userAgent,
      referrer: document.referrer,
      ...context
    };

    // Send to analytics endpoint if available
    if (typeof window !== 'undefined') {
      fetch('/api/analytics/rss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analyticsData),
      }).catch(error => {
        console.warn('Analytics tracking failed:', error);
      });
    }

    console.log('RSS Analytics:', analyticsData);
  } catch (error) {
    console.warn('Error tracking RSS analytics:', error);
  }
}

/**
 * Performance monitoring for RSS feeds
 * @param {string} metric - Metric name
 * @param {number} value - Metric value
 * @param {object} context - Additional context
 */
export function trackRSSPerformance(metric, value, context = {}) {
  try {
    // Web Vitals tracking
    if (typeof window !== 'undefined' && window.performance) {
      const performanceData = {
        metric,
        value,
        timestamp: performance.now(),
        context: {
          component: 'RSS Feed',
          source: 'KCM',
          ...context
        }
      };

      // Store performance data
      if (!window.rssPerformanceData) {
        window.rssPerformanceData = [];
      }
      window.rssPerformanceData.push(performanceData);

      // Send to performance endpoint if available
      fetch('/api/performance/rss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(performanceData),
      }).catch(error => {
        console.warn('Performance tracking failed:', error);
      });
    }
  } catch (error) {
    console.warn('Error tracking RSS performance:', error);
  }
}

/**
 * Debounce function for search and filtering
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll events
 * @param {Function} func - Function to throttle
 * @param {number} limit - Throttle limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Generate unique ID for articles
 * @param {string} prefix - ID prefix
 * @returns {string} Unique ID
 */
export function generateUniqueId(prefix = 'article') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate RSS feed data
 * @param {object} feedData - RSS feed data
 * @returns {object} Validation result
 */
export function validateRSSFeed(feedData) {
  const errors = [];
  const warnings = [];

  if (!feedData) {
    errors.push('Feed data is missing');
    return { isValid: false, errors, warnings };
  }

  if (!feedData.title) {
    errors.push('Feed title is missing');
  }

  if (!feedData.articles || !Array.isArray(feedData.articles)) {
    errors.push('Feed articles are missing or invalid');
  } else if (feedData.articles.length === 0) {
    warnings.push('Feed contains no articles');
  }

  if (feedData.articles && Array.isArray(feedData.articles)) {
    feedData.articles.forEach((article, index) => {
      if (!article.title) {
        errors.push(`Article ${index + 1} is missing title`);
      }
      if (!article.link) {
        warnings.push(`Article ${index + 1} is missing link`);
      }
      if (!article.publishedAt) {
        warnings.push(`Article ${index + 1} is missing publication date`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    articleCount: feedData.articles?.length || 0
  };
}

/**
 * Cache RSS feed data in localStorage
 * @param {string} key - Cache key
 * @param {object} data - Data to cache
 * @param {number} ttl - Time to live in milliseconds
 */
export function cacheRSSData(key, data, ttl = 3600000) {
  try {
    if (typeof window !== 'undefined') {
      const cacheData = {
        data,
        timestamp: Date.now(),
        ttl
      };
      localStorage.setItem(`rss_${key}`, JSON.stringify(cacheData));
    }
  } catch (error) {
    console.warn('Error caching RSS data:', error);
  }
}

/**
 * Retrieve cached RSS data from localStorage
 * @param {string} key - Cache key
 * @returns {object|null} Cached data or null
 */
export function getCachedRSSData(key) {
  try {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(`rss_${key}`);
      if (cached) {
        const cacheData = JSON.parse(cached);
        const now = Date.now();
        
        if (now - cacheData.timestamp < cacheData.ttl) {
          return cacheData.data;
        } else {
          // Remove expired cache
          localStorage.removeItem(`rss_${key}`);
        }
      }
    }
    return null;
  } catch (error) {
    console.warn('Error retrieving cached RSS data:', error);
    return null;
  }
}

/**
 * Clear expired RSS cache entries
 */
export function clearExpiredRSSCache() {
  try {
    if (typeof window !== 'undefined') {
      const keys = Object.keys(localStorage);
      const now = Date.now();
      
      keys.forEach(key => {
        if (key.startsWith('rss_')) {
          try {
            const cached = JSON.parse(localStorage.getItem(key));
            if (now - cached.timestamp >= cached.ttl) {
              localStorage.removeItem(key);
            }
          } catch (error) {
            // Remove invalid cache entries
            localStorage.removeItem(key);
          }
        }
      });
    }
  } catch (error) {
    console.warn('Error clearing expired RSS cache:', error);
  }
}
