'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';

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
        fatal: false
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '400px',
            padding: '2rem',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            background: '#fff'
          }}>
            <h2>Something went wrong</h2>
            <p>Please try refreshing the page or contact support if the issue persists.</p>
            <button 
              onClick={this.handleRetry}
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
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorHandler;