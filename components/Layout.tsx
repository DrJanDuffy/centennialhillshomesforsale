
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import PWAInstallPrompt from './PWAInstallPrompt';
import ErrorBoundary from './ErrorBoundary';
import PerformanceMonitor from './PerformanceMonitor';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  pageClass?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Centennial Hills Homes For Sale | Dr. Jan Duff | Las Vegas Real Estate",
  description = "Find your dream home in Centennial Hills, Providence, and Skye Canyon with Dr. Jan Duff. Expert real estate agent specializing in Northwest Las Vegas luxury communities.",
  canonical = "https://centennialhillshomesforsale.com",
  ogImage = "/images/centennial-hills-homes-og.jpg",
  pageClass = ""
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    setIsLoading(false);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fullTitle = title.includes('Centennial Hills') 
    ? title 
    : `${title} | Centennial Hills Homes For Sale`;

  return (
    <ErrorBoundary>
      <Head>
        {/* Essential Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="Centennial Hills Homes For Sale" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Business Verification */}
        <meta name="google-site-verification" content="centennial-hills-homes-verification" />
        <meta name="business-verification" content="dr-jan-duffy-realtor" />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Dr. Jan Duff",
              "url": "https://centennialhillshomesforsale.com",
              "logo": "https://centennialhillshomesforsale.com/images/jan-duff-logo.png",
              "image": "https://centennialhillshomesforsale.com/images/jan-duff-realtor.jpg",
              "description": "Expert real estate agent specializing in Centennial Hills, Providence, and Skye Canyon communities in Northwest Las Vegas",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Las Vegas",
                "addressRegion": "NV",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-702-903-1952",
                "contactType": "customer service",
                "email": "jan@centennialhillshomesforsale.com"
              },
              "areaServed": [
                "Centennial Hills",
                "Providence",
                "Skye Canyon",
                "Northwest Las Vegas",
                "89149",
                "89166"
              ],
              "serviceType": [
                "Home Buying",
                "Home Selling",
                "Property Valuation",
                "Market Analysis",
                "Investment Properties"
              ]
            })
          }}
        />

        {/* Performance Hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Head>

      <div className={`min-h-screen flex flex-col bg-gray-50 ${pageClass}`}>
        <PerformanceMonitor />
        
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-50 flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-blue-600 font-semibold">Loading Centennial Hills Homes...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Header />
        
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {children}
          </motion.div>
        </main>
        
        <Footer />
        
        <PWAInstallPrompt />

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* AI Chat Widget */}
        <div className="fixed bottom-8 left-8 z-40">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span className="font-semibold">AI Assistant</span>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
