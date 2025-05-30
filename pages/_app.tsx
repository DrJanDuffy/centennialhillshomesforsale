import '../styles/globals.css';
import '../styles/realscout.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { setupGlobalErrorHandling } from '../utils/errorTracking';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove server-side injected CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // Setup global error handling
    setupGlobalErrorHandling();
  }, []);

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
} 