
interface ErrorReport {
  timestamp: string;
  error: Error | string;
  component?: string;
  page?: string;
  userAgent?: string;
  url?: string;
  stack?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

class ErrorReportingSystem {
  private static instance: ErrorReportingSystem;
  private errors: ErrorReport[] = [];
  private maxErrors = 100;

  static getInstance(): ErrorReportingSystem {
    if (!ErrorReportingSystem.instance) {
      ErrorReportingSystem.instance = new ErrorReportingSystem();
    }
    return ErrorReportingSystem.instance;
  }

  initialize(): void {
    if (typeof window === 'undefined') return;

    // Global error handler for unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.reportError({
        error: event.error || event.message,
        component: 'Global',
        severity: 'high',
        stack: event.error?.stack,
        url: window.location.href
      });
    });

    // Promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        error: event.reason,
        component: 'Promise',
        severity: 'medium',
        url: window.location.href
      });
    });

    // Console error override
    const originalConsoleError = console.error;
    console.error = (...args) => {
      this.reportError({
        error: args.join(' '),
        component: 'Console',
        severity: 'medium',
        url: window.location.href
      });
      originalConsoleError.apply(console, args);
    };
  }

  reportError(errorData: Partial<ErrorReport>): void {
    const report: ErrorReport = {
      timestamp: new Date().toISOString(),
      error: errorData.error || 'Unknown error',
      component: errorData.component || 'Unknown',
      page: typeof window !== 'undefined' ? window.location.pathname : 'Server',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
      url: errorData.url || (typeof window !== 'undefined' ? window.location.href : ''),
      stack: errorData.stack,
      severity: errorData.severity || 'medium'
    };

    this.errors.push(report);

    // Keep only the most recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Store in localStorage for persistence
    try {
      localStorage.setItem('error_reports', JSON.stringify(this.errors));
    } catch (e) {
      // localStorage might be full or unavailable
    }

    // Send to analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: String(report.error),
        fatal: report.severity === 'critical'
      });
    }

    // Log critical errors immediately
    if (report.severity === 'critical') {
      this.sendCriticalErrorReport(report);
    }

    // Development logging
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error Report [${report.severity.toUpperCase()}]`);
      console.log('Component:', report.component);
      console.log('Error:', report.error);
      console.log('Stack:', report.stack);
      console.log('URL:', report.url);
      console.groupEnd();
    }
  }

  private sendCriticalErrorReport(report: ErrorReport): void {
    // In a real application, you would send this to your error tracking service
    // For now, we'll just log it prominently
    console.error('🔥 CRITICAL ERROR DETECTED:', report);
  }

  getErrors(): ErrorReport[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
    try {
      localStorage.removeItem('error_reports');
    } catch (e) {
      // Ignore localStorage errors
    }
  }

  getErrorSummary(): { [key: string]: number } {
    const summary: { [key: string]: number } = {};
    this.errors.forEach(error => {
      const key = `${error.component}: ${String(error.error).substring(0, 50)}`;
      summary[key] = (summary[key] || 0) + 1;
    });
    return summary;
  }

  // Specific error fixers
  fixCommonErrors(): void {
    // Fix GoogleAnalytics not defined errors
    if (typeof window !== 'undefined' && !window.GoogleAnalytics) {
      window.GoogleAnalytics = () => null; // Fallback component
    }

    // Fix gtag not defined errors
    if (typeof window !== 'undefined' && !window.gtag) {
      window.gtag = function() {
        console.log('gtag called but not loaded:', arguments);
      };
    }

    // Fix other common undefined variables
    const commonUndefinedVars = ['dataLayer'];
    commonUndefinedVars.forEach(varName => {
      if (typeof window !== 'undefined' && !window[varName]) {
        window[varName] = [];
      }
    });
  }
}

export default ErrorReportingSystem;
