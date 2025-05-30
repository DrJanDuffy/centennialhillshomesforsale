
'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { NextRouter } from 'next/router';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  router?: NextRouter;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
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
    this.setState({ errorInfo });
    
    // Log error details
    console.error('ErrorHandler caught an error:', error);
    console.error('Error info:', errorInfo);
    
    // Track error in analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_map: {
          error_component: errorInfo.componentStack?.split('\n')[1]?.trim()
        }
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-handler">
          <div className="error-content">
            <h2>Oops! Something went wrong</h2>
            <p>We're sorry for the inconvenience. Please try one of the options below:</p>
            
            <div className="error-actions">
              <button 
                onClick={this.handleRetry}
                className="btn-primary"
              >
                Try Again
              </button>
              <button 
                onClick={this.handleReload}
                className="btn-secondary"
              >
                Refresh Page
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Error Details (Development Only)</summary>
                <pre className="error-stack">
                  {this.state.error.message}
                  {this.state.error.stack}
                </pre>
                {this.state.errorInfo && (
                  <pre className="error-component-stack">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </details>
            )}
          </div>
          
          <style jsx>{`
            .error-handler {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 400px;
              padding: 2rem;
              text-align: center;
            }
            
            .error-content {
              max-width: 500px;
              padding: 2rem;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              background: #fff;
            }
            
            .error-actions {
              display: flex;
              gap: 1rem;
              justify-content: center;
              margin: 1.5rem 0;
            }
            
            .btn-primary, .btn-secondary {
              padding: 0.75rem 1.5rem;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-weight: 500;
            }
            
            .btn-primary {
              background: #2563eb;
              color: white;
            }
            
            .btn-secondary {
              background: #6b7280;
              color: white;
            }
            
            .error-details {
              margin-top: 1rem;
              text-align: left;
            }
            
            .error-stack, .error-component-stack {
              background: #f3f4f6;
              padding: 1rem;
              border-radius: 4px;
              font-size: 0.875rem;
              white-space: pre-wrap;
              overflow-x: auto;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorHandler;
