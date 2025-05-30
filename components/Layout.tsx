import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import LocalBusinessSchema from './LocalBusinessSchema';
import PerformanceMonitor from './PerformanceMonitor';
import GoogleAnalytics from './GoogleAnalytics';

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
    <ErrorBoundary>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="/js/unsplash.js" defer></script>
        <script src="/js/centennial-hills-images.js" defer></script>
      </Head>
      <GoogleAnalytics />
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
      </div>
    </ErrorBoundary>
  );
};

export default Layout;