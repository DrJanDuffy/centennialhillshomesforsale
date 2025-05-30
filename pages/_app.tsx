
import '../styles/globals.css';
import '../styles/realscout.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { setupGlobalErrorHandling } from '../utils/errorTracking';

// Only import these components in development
const isDevelopment = process.env.NODE_ENV === 'development';
const AnalyticsDashboard = isDevelopment ? require('../components/AnalyticsDashboard').default : null;
const ErrorDashboard = isDevelopment ? require('../components/ErrorDashboard').default : null;

function Layout({ children }) {
  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove server-side injected CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // Setup global error handling
    setupGlobalErrorHandling();

    // Initialize enterprise analytics
    if (typeof window !== 'undefined') {
      const EnterpriseAnalytics = require('../utils/enterpriseAnalytics').default;
      const analytics = EnterpriseAnalytics.getInstance();
      analytics.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* Only render these components in development */}
      {isDevelopment && AnalyticsDashboard && <AnalyticsDashboard isAdmin={true} />}
      {isDevelopment && ErrorDashboard && <ErrorDashboard />}
    </ErrorBoundary>
  );
}
