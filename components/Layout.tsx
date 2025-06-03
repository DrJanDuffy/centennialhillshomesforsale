import Head from 'next/head';
import Script from 'next/script';
import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import LocalBusinessSchema from './LocalBusinessSchema';
import PerformanceMonitor from './PerformanceMonitor';
import PageErrorChecker from './PageErrorChecker';
import AIRealEstateChat from './AIRealEstateChat';
import MortgageCalculator from './MortgageCalculator';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Centennial Hills Homes for Sale | Jan Duff Real Estate',
  description = 'Find your dream home in Centennial Hills, Las Vegas. Expert real estate services by Jan Duff. Browse luxury homes, condos, and townhomes in this premier northwest Las Vegas community.',
  keywords = "Centennial Hills homes, Las Vegas real estate, Jan Duff realtor, northwest Las Vegas, luxury homes, Providence, Skye Canyon",
  canonicalUrl
}) => {
  return (
    <>
      <Head>
        <title>{title || 'Centennial Hills Homes For Sale | Las Vegas Real Estate'}</title>
        <meta name="description" content={description || 'Find your dream home in Centennial Hills, Las Vegas. Expert real estate services with Dr. Jan Duffy, REALTOR®.'} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <Script
        src="https://realscout-web-components.s3.amazonaws.com/realscout-web-components.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('RealScout script loaded successfully');
        }}
        onError={(e) => {
          console.error('Failed to load RealScout script:', e);
        }}
      />

      <PerformanceMonitor />
      <LocalBusinessSchema />

      <motion.div 
        className="app-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Header />
        <motion.main 
          className="main-content" 
          suppressHydrationWarning={true}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </motion.main>
        <Footer />
        <AIRealEstateChat />
      </motion.div>
    </>
  );
};

export default Layout;