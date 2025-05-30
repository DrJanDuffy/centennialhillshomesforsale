import React, { Component, ReactNode, ErrorInfo } from 'react';
import ErrorReportingSystem from '../utils/errorReporting';

interface Props {
  children: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error });

    // Report error to our error reporting system
    const errorReporter = ErrorReportingSystem.getInstance();
    errorReporter.reportError({
      error: error.message,
      component: this.props.componentName || 'ErrorBoundaryWrapper',
      severity: 'high',
      stack: error.stack
    });

    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundaryWrapper caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
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