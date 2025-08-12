interface ErrorReport {
  error: string;
  component: string;
  severity: 'low' | 'medium' | 'high';
  stack?: string;
}

class ErrorReportingSystem {
  private static instance: ErrorReportingSystem;
  private errors: ErrorReport[] = [];

  static getInstance(): ErrorReportingSystem {
    if (!ErrorReportingSystem.instance) {
      ErrorReportingSystem.instance = new ErrorReportingSystem();
    }
    return ErrorReportingSystem.instance;
  }

  reportError(errorReport: ErrorReport): void {
    this.errors.push({
      ...errorReport,
      timestamp: new Date().toISOString(),
    } as any);

    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reported:', errorReport);
    }
  }

  fixCommonErrors(): void {
    // Placeholder for common error fixes
    if (process.env.NODE_ENV === 'development') {
      console.log('Running common error fixes...');
    }
  }

  getErrors(): ErrorReport[] {
    return this.errors;
  }

  clearErrors(): void {
    this.errors = [];
  }
}

export default ErrorReportingSystem;
