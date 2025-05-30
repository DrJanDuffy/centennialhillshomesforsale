import '../styles/globals.css';
import '../styles/realscout.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Layout from '../components/Layout';
import { setupGlobalErrorHandling } from '../utils/errorTracking';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure we're on the client side
    setIsClient(true);

    // Remove server-side injected CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // Setup global error handling
    setupGlobalErrorHandling();

    // Fix common hydration issues
    const fixHydrationIssues = () => {
      try {
        // Fix date/time related hydration mismatches
        const dateElements = document.querySelectorAll('[data-date], .date-display');
        dateElements.forEach(el => {
          if (el.textContent && el.textContent.includes('Invalid Date')) {
            el.textContent = new Date().toLocaleDateString();
          }
        });

        // Fix random number hydration mismatches
        const randomElements = document.querySelectorAll('[data-random]');
        randomElements.forEach(el => {
          const seed = el.getAttribute('data-seed') || '12345';
          el.textContent = seed;
        });

        // Fix environment-specific content
        const envElements = document.querySelectorAll('[data-env]');
        envElements.forEach(el => {
          (el as HTMLElement).style.display = 'block';
        });

      } catch (error) {
        console.error('Error fixing hydration issues:', error);
      }
    };

    // Apply fixes after a short delay
    setTimeout(fixHydrationIssues, 100);

  }, []);

  // For static export, always render the component
  if (typeof window === 'undefined') {
    // Server-side rendering
    return (
      <ErrorBoundary>
        <div suppressHydrationWarning={true}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </ErrorBoundary>
    );
  }

  // Client-side rendering with loading state
  if (!isClient) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div suppressHydrationWarning={true}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ErrorBoundary>
  );
}