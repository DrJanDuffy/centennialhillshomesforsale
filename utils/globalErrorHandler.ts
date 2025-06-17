
import ErrorTracker from './errorTracking';

class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private isInitialized = false;

  static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    const errorTracker = ErrorTracker.getInstance();

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      errorTracker.trackError(
        new Error(`Unhandled promise rejection: ${event.reason}`),
        'Promise'
      );
      
      // Prevent the default browser behavior
      event.preventDefault();
    });

    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error || event.message);
      errorTracker.trackError(
        event.error || new Error(event.message),
        event.filename ? `${event.filename}:${event.lineno}` : 'Unknown'
      );
    });

    // Handle resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        const target = event.target as HTMLElement;
        const tagName = target.tagName?.toLowerCase();
        
        if (tagName === 'img' || tagName === 'script' || tagName === 'link') {
          errorTracker.trackError(
            new Error(`Failed to load ${tagName}: ${(target as any).src || (target as any).href}`),
            'ResourceLoading'
          );
        }
      }
    }, true);

    // Monitor console errors in development
    if (process.env.NODE_ENV === 'development') {
      const originalError = console.error;
      console.error = (...args) => {
        errorTracker.trackError(
          new Error(`Console error: ${args.join(' ')}`),
          'Console'
        );
        originalError.apply(console, args);
      };
    }

    this.isInitialized = true;
    console.log('Global error handler initialized');
  }

  // Method to manually report errors
  reportError(error: Error, context?: string): void {
    const errorTracker = ErrorTracker.getInstance();
    errorTracker.trackError(error, context || 'Manual');
  }

  // Method to get error summary
  getErrorSummary(): { totalErrors: number; recentErrors: any[] } {
    const errorTracker = ErrorTracker.getInstance();
    const errors = errorTracker.getErrors();
    
    return {
      totalErrors: errors.length,
      recentErrors: errors.slice(-5) // Last 5 errors
    };
  }
}

export default GlobalErrorHandler;
