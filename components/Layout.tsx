import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import LocalBusinessSchema from './LocalBusinessSchema';
import PerformanceMonitor from './PerformanceMonitor';
import ErrorReportingSystem from '../utils/errorReporting';
import PageErrorChecker from '../utils/pageErrorChecker';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Centennial Hills Homes For Sale | Jan Duff Real Estate",
  description = "Find your dream home in Centennial Hills, Las Vegas. Expert real estate services by Jan Duff. Browse luxury homes, condos, and townhomes in this premier northwest Las Vegas community.",
  keywords = "Centennial Hills homes, Las Vegas real estate, Jan Duff realtor, northwest Las Vegas, luxury homes, Providence, Skye Canyon",
  canonicalUrl
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Centennial Hills Homes For Sale" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {/* Performance Monitoring */}
      <PerformanceMonitor />

      {/* Local Business Schema */}
      <LocalBusinessSchema />

      <div className="app-container">
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;