import '../styles/globals.css';
import '../styles/realscout.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { setupGlobalErrorHandling } from '../utils/errorTracking';
// Add error dashboard to app
import AnalyticsDashboard from '../components/AnalyticsDashboard';
// Add error dashboard to app
import ErrorDashboard from '../components/ErrorDashboard';

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
    const EnterpriseAnalytics = require('../utils/enterpriseAnalytics').default;
    const analytics = EnterpriseAnalytics.getInstance();
    analytics.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  }, []);

  return (
    <ErrorBoundary>
      {/* Include error dashboard in app */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <AnalyticsDashboard isAdmin={false} />
      <ErrorDashboard />
    </ErrorBoundary>
  );
}