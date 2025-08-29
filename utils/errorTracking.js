// Error tracking utility for monitoring 404s and other issues

export function track404Error(url, referrer = '') {
  const errorData = {
    type: '404',
    url: url,
    referrer: referrer,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
    pathname: typeof window !== 'undefined' ? window.location.pathname : 'server',
  };

  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: `404_error: ${url}`,
      fatal: false,
      custom_map: {
        cd1: 'error_type',
        cd2: 'error_url',
        cd3: 'referrer',
      },
      custom_parameters: {
        error_type: '404',
        error_url: url,
        referrer: referrer,
      },
    });
  }

  // Send to error tracking service in production
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData),
    }).catch((err) => {
      console.error('Failed to log error:', err);
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('404 Error tracked:', errorData);
  }

  return errorData;
}

export function trackPageError(error, pageInfo = {}) {
  const errorData = {
    type: 'page_error',
    error: error.message || error.toString(),
    stack: error.stack,
    pageInfo: pageInfo,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
  };

  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: `Page error: ${error.message || error}`,
      fatal: true,
      custom_parameters: {
        error_type: 'page_error',
        error_message: error.message || error.toString(),
        page_url: pageInfo.url || 'unknown',
      },
    });
  }

  // Send to error tracking service in production
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData),
    }).catch((err) => {
      console.error('Failed to log error:', err);
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Page Error tracked:', errorData);
  }

  return errorData;
}

export function trackPerformanceIssue(metric, value, threshold) {
  const issueData = {
    type: 'performance_issue',
    metric: metric,
    value: value,
    threshold: threshold,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : 'server',
  };

  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'performance_issue', {
      custom_parameters: {
        metric: metric,
        value: value,
        threshold: threshold,
      },
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.warn('Performance issue tracked:', issueData);
  }

  return issueData;
}

export function trackUserJourney(step, data = {}) {
  const journeyData = {
    type: 'user_journey',
    step: step,
    data: data,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : 'server',
    sessionId: getSessionId(),
  };

  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_journey', {
      custom_parameters: {
        step: step,
        session_id: getSessionId(),
        ...data,
      },
    });
  }

  // Store in localStorage for session tracking
  if (typeof window !== 'undefined') {
    const journey = JSON.parse(localStorage.getItem('userJourney') || '[]');
    journey.push(journeyData);
    localStorage.setItem('userJourney', JSON.stringify(journey.slice(-50))); // Keep last 50 steps
  }

  return journeyData;
}

function getSessionId() {
  if (typeof window === 'undefined') return 'server';

  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

export function getErrorSummary() {
  if (typeof window === 'undefined') return null;

  const errors = JSON.parse(localStorage.getItem('errorLog') || '[]');
  const summary = {
    totalErrors: errors.length,
    errorTypes: {},
    recentErrors: errors.slice(-10),
    lastError: errors[errors.length - 1] || null,
  };

  errors.forEach((error) => {
    summary.errorTypes[error.type] = (summary.errorTypes[error.type] || 0) + 1;
  });

  return summary;
}

export function clearErrorLog() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('errorLog');
    localStorage.removeItem('userJourney');
    localStorage.removeItem('sessionId');
  }
}

// Proper ErrorTracker class implementation
class ErrorTracker {
  constructor() {
    this.errors = [];
    this.maxErrors = 100;
  }

  static getInstance() {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  trackError(error, context) {
    const errorData = {
      message: error.message || error.toString(),
      context: context,
      timestamp: new Date().toISOString(),
      stack: error.stack,
      url: typeof window !== 'undefined' ? window.location.href : 'server',
    };

    // Store error in localStorage
    if (typeof window !== 'undefined') {
      this.errors.push(errorData);
      if (this.errors.length > this.maxErrors) {
        this.errors = this.errors.slice(-this.maxErrors);
      }
      localStorage.setItem('errorLog', JSON.stringify(this.errors));
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', errorData);
    }

    return errorData;
  }

  getErrors() {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem('errorLog');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to parse stored errors:', error);
      return [];
    }
  }

  clearErrors() {
    this.errors = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('errorLog');
    }
  }
}

// Create singleton instance
ErrorTracker.instance = null;

export default ErrorTracker;
