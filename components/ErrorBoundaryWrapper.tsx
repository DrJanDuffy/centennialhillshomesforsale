import React, { ReactNode, Component, ErrorInfo } from 'react';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import ErrorTracker from '../utils/errorTracking';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  showInProduction?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

class ErrorBoundaryWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    const errorId = Date.now().toString();
    return { 
      hasError: true, 
      error,
      errorId 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Track error in our system
    const errorTracker = ErrorTracker.getInstance();
    errorTracker.trackError(error, 'ErrorBoundary');

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundaryWrapper caught an error:', error, errorInfo);
    }

    // Send to analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_map: {
          component: 'ErrorBoundary',
          errorId: this.state.errorId
        }
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Don't show error UI in production unless explicitly enabled
      if (process.env.NODE_ENV === 'production' && !this.props.showInProduction) {
        return this.props.children; // Fail silently in production
      }

      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-md w-full mx-4 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 text-center">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              We're working to fix this issue. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left text-xs text-gray-500 mb-4 p-2 bg-gray-100 rounded">
                <summary className="cursor-pointer">Error Details</summary>
                <pre className="mt-2 whitespace-pre-wrap">{this.state.error.message}</pre>
              </details>
            )}
            <div className="flex gap-2 justify-center">
              <button
                onClick={this.handleRetry}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                <ArrowPathIcon className="h-4 w-4 mr-1 inline-block" aria-hidden="true" />
                Refresh
              </button>
            </div>
            {this.state.errorId && (
              <p className="text-xs text-gray-400 mt-4">Error ID: {this.state.errorId}</p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWrapper;