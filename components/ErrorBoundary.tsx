import React, { ReactNode, Component, ErrorInfo } from 'react';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-md w-full mx-4 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-gray-900">Something went wrong.</h2>
          <p className="mt-4 text-gray-500">We're working to fix this issue. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2 inline-block" aria-hidden="true" />
            Refresh Page
          </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;