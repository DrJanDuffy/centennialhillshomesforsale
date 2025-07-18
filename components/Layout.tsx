import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import ErrorBoundaryWrapper from './ErrorBoundaryWrapper';
import EnhancedSEO from './EnhancedSEO';
import SEOAdvanced from './SEOAdvanced';
import GenerativeEngineOptimizer from './GenerativeEngineOptimizer';
import GoogleBusinessProfileOptimizer from './GoogleBusinessProfileOptimizer';
import GoogleAnalytics from './GoogleAnalytics';
import GoogleSearchConsole from './GoogleSearchConsole';
import LocalBusinessSchema from './LocalBusinessSchema';
import PerformanceMonitor from './PerformanceMonitor';
import { AwesomePerformanceBar } from './AwesomePerformanceBar';
import PWAInstallPrompt from './PWAInstallPrompt';
import SafeGoogleAnalytics from './SafeGoogleAnalytics';
import SystemHealthMonitor from './SystemHealthMonitor';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  noindex?: boolean;
  pageType?: 'website' | 'article' | 'property' | 'neighborhood' | 'home' | 'service';
  neighborhood?: string;
  propertyData?: unknown;
  canonicalUrl?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Centennial Hills Homes For Sale | Dr. Jan Duff",
  description = "Find your dream home in Centennial Hills, Providence, and Skye Canyon. Expert real estate services by Dr. Jan Duff.",
  canonical,
  keywords = "Centennial Hills homes, Las Vegas real estate, Providence homes, Skye Canyon properties",
  ogImage = "/images/centennial-hills-og.jpg",
  noindex = false,
  pageType = 'website',
  neighborhood = 'Centennial Hills',
  propertyData = null,
  canonicalUrl
}) => {
  const fullTitle = title.includes('|') ? title : `${title} | Dr. Jan Duff Real Estate`;

  return (
    <ErrorBoundaryWrapper>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Canonical */}
        {canonical && <link rel="canonical" href={canonical} />}

        {/* Robots */}
        {noindex && <meta name="robots" content="noindex,nofollow" />}

        {/* App Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        <Navigation />
        <main className="flex-1">
          <EnhancedSEO 
            title={title}
            description={description}
            keywords={keywords}
            canonicalUrl={canonicalUrl}
            pageType={pageType as 'website' | 'article' | 'property' | 'neighborhood'}
            neighborhood={neighborhood}
            propertyData={propertyData as { [key: string]: unknown; price?: number } | undefined}
          />
          <SEOAdvanced
            title={title}
            description={description}
            keywords={keywords}
            canonicalUrl={canonicalUrl}
            pageType={pageType as 'home' | 'neighborhood' | 'property' | 'service'}
            neighborhood={neighborhood}
            propertyData={propertyData as { [key: string]: unknown; price?: number } | undefined}
          />
          <GenerativeEngineOptimizer
            pageType={pageType as 'neighborhood' | 'property' | 'service' | 'home' | 'agent'}
            neighborhood={neighborhood}
            propertyData={propertyData}
          />
          <GoogleBusinessProfileOptimizer
            pageType={pageType as 'home' | 'about' | 'contact' | 'services' | 'neighborhood'}
            neighborhood={neighborhood}
            showWidget={pageType === 'home'}
          />
          <GoogleAnalytics />
          <GoogleSearchConsole />
          {children}
        </main>
        <Footer />

        <PerformanceMonitor />
        <AwesomePerformanceBar />
        <PWAInstallPrompt />
        <SafeGoogleAnalytics />
        <SystemHealthMonitor />
      </div>
    </ErrorBoundaryWrapper>
  );
};

export default Layout;