import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import GoogleAnalytics from '../components/GoogleAnalytics'
import AdvancedSEOOptimizer from '../components/AdvancedSEOOptimizer'
import LocalSEOBooster from '../components/LocalSEOBooster'
import { useEffect } from 'react'
import GlobalErrorHandler from '../utils/globalErrorHandler'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="error-handler-container">
      <div className="error-handler-content">
        <h2>Something went wrong</h2>
        <p>Please try refreshing the page or contact support if the issue persists.</p>
        {process.env.NODE_ENV === 'development' && (
          <details className="error-handler-details">
            <summary>Error Details</summary>
            <pre>{error.message}</pre>
          </details>
        )}
        <button 
          onClick={resetErrorBoundary}
          className="error-handler-btn error-handler-btn-primary"
        >
          Try Again
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="error-handler-btn error-handler-btn-secondary"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize global error handling
    const globalErrorHandler = GlobalErrorHandler.getInstance();
    globalErrorHandler.initialize();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <GoogleAnalytics />
      <AdvancedSEOOptimizer />
      <LocalSEOBooster />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}