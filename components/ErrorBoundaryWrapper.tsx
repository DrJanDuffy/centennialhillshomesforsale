import React, { Component, ReactNode } from 'react';
import ErrorReportingSystem from '../utils/errorReporting';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

class ErrorBoundaryWrapper extends Component<Props, State> {
  private errorReporter: ErrorReportingSystem;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
    this.errorReporter = ErrorReportingSystem.getInstance();
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({ errorInfo });

    this.errorReporter.reportError({
      error: error.message,
      component: this.props.componentName || 'ErrorBoundary',
      severity: 'high',
      stack: error.stack
    });

    // Try to fix common errors automatically
    this.errorReporter.fixCommonErrors();

    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundaryWrapper caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Show minimal error UI in production
      if (process.env.NODE_ENV === 'production') {
        return this.props.fallback || (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Something went wrong</h2>
            <p>Please refresh the page or try again later.</p>
            <button onClick={() => window.location.reload()}>
              Refresh Page
            </button>
          </div>
        );
      }

      // Show detailed error in development only
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: '2rem',
          maxWidth: '600px',
          margin: '2rem auto',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          background: '#fef2f2'
        }}>
          <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>
            Development Error
          </h2>
          <details style={{ marginBottom: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              Error Details
            </summary>
            <pre style={{
              background: '#f9fafb',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.875rem',
              whiteSpace: 'pre-wrap'
            }}>
              {this.state.error?.message}
              {this.state.error?.stack}
            </pre>
          </details>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
          >
            Try Again
          </button>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWrapper;