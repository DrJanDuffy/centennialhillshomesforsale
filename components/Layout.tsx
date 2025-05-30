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

      <div className="app-container">
        <Header />
        <main className="main-content" suppressHydrationWarning={true}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;