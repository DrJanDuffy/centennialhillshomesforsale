import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorHandler from '../components/ErrorHandler'
import GoogleAnalytics from '../components/GoogleAnalytics'
import AdvancedSEOOptimizer from '../components/AdvancedSEOOptimizer'
import LocalSEOBooster from '../components/LocalSEOBooster'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize global error handling
    const globalErrorHandler = GlobalErrorHandler.getInstance();
    globalErrorHandler.initialize();
  }, []);

  return (
    
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <GoogleAnalytics />
        <AdvancedSEOOptimizer />
        <LocalSEOBooster />
        <Component {...pageProps} />
      </ErrorBoundary>
    
  );
}