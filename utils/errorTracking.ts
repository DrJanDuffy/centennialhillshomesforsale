interface ErrorDetails {
  message: string;
  stack?: string;
  component?: string;
  url?: string;
  userAgent?: string;
  timestamp: string;
}

class ErrorTracker {
  private static instance: ErrorTracker;
  private errors: ErrorDetails[] = [];

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  trackError(error: Error, component?: string): void {
    const errorDetails: ErrorDetails = {
      message: error.message,
      stack: error.stack,
      component,
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      timestamp: new Date().toISOString(),
    };

    this.errors.push(errorDetails);

    // Keep only last 50 errors to prevent memory issues
    if (this.errors.length > 50) {
      this.errors = this.errors.slice(-50);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', errorDetails);
    }

    // Send to analytics if available
    this.sendToAnalytics(errorDetails);
  }

  private sendToAnalytics(errorDetails: ErrorDetails): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: errorDetails.message,
        fatal: false,
        custom_map: {
          component: errorDetails.component,
          url: errorDetails.url,
        },
      });
    }
  }

  getErrors(): ErrorDetails[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }
}

// Global error handler
export const setupGlobalErrorHandling = (): void => {
  if (typeof window === 'undefined') return;

  const errorTracker = ErrorTracker.getInstance();

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    errorTracker.trackError(new Error(`Unhandled promise rejection: ${event.reason}`), 'Promise');
  });

  // Handle JavaScript errors
  window.addEventListener('error', (event) => {
    errorTracker.trackError(
      new Error(event.message),
      event.filename ? `${event.filename}:${event.lineno}` : 'Unknown'
    );
  });
};

export default ErrorTracker;
