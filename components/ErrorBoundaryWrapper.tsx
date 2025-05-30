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
        <div className="error-boundary-fallback" style={{
          padding: '20px',
          margin: '10px',
          border: '1px solid #ff6b6b',
          borderRadius: '5px',
          backgroundColor: '#fff5f5',
          color: '#c92a2a'
        }}>
          <h3>🚨 Something went wrong</h3>
          <p>Component: {this.props.componentName || 'Unknown'}</p>
          <details style={{ marginTop: '10px' }}>
            <summary>Error details</summary>
            <pre style={{ fontSize: '12px', overflow: 'auto', marginTop: '10px' }}>
              {this.state.error?.message}
              {this.state.error?.stack}
            </pre>
          </details>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              backgroundColor: '#007cba',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWrapper;