'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorHandler extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorHandler caught an error:', error);
      console.error('Error info:', errorInfo);
    }

    // Track error in analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="error-handler-container">
            <div className="error-handler-content">
              <h2>Something went wrong</h2>
              <p>Please try refreshing the page or contact support if the issue persists.</p>
              <button
                type="button"
                onClick={this.handleRetry}
                className="error-handler-btn error-handler-btn-primary"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="error-handler-btn error-handler-btn-secondary"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorHandler;
