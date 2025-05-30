import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import LocalBusinessSchema from './LocalBusinessSchema';
import PerformanceMonitor from './PerformanceMonitor';
import ErrorHandler from './ErrorHandler'; // Added import for ErrorHandler
import AnalyticsDashboard from './AnalyticsDashboard'; // Import the AnalyticsDashboard
import SafeGoogleAnalytics from './SafeGoogleAnalytics';
import EnterpriseAnalytics from '../utils/enterpriseAnalytics';
import ErrorBoundaryWrapper from './ErrorBoundaryWrapper';
import ErrorReportingSystem from '../utils/errorReporting';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  pageType?: 'home' | 'about' | 'contact' | 'services' | 'neighborhood';
  neighborhood?: string;
  additionalServices?: string[];
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Centennial Hills Homes For Sale',
  description = 'Find your dream home in Centennial Hills, Las Vegas. Browse luxury homes, condos, and townhomes with experienced real estate agents.',
  pageType = 'home',
  neighborhood,
  additionalServices = []
}) => {
  return (

    <ErrorHandler>
      <ErrorBoundary>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SafeGoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <LocalBusinessSchema 
          pageType={pageType}
          neighborhood={neighborhood}
          additionalServices={additionalServices}
        />
        <PerformanceMonitor />
        <div className="layout">
          <Header />
          <main className="main-content">
            {children}
          </main>
          <Footer />
          <SafeGoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
          <AnalyticsDashboard isAdmin={true} />
        </div>

        <Script 
          src="/js/unsplash.js" 
          strategy="lazyOnload"
        />
        <Script 
          src="/js/centennial-hills-images.js" 
          strategy="lazyOnload"
        />
      </ErrorBoundary>
    </ErrorHandler>
  );
};

    export default Layout;