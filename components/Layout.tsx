import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import PerformanceOptimizer from './PerformanceOptimizer';
import PWAInstallPrompt from './PWAInstallPrompt';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  const siteTitle = title ? `${title} | Centennial Hills Homes For Sale` : 'Centennial Hills Homes For Sale';
  const siteDescription = description || 'Find your dream home in Centennial Hills, Las Vegas with Dr. Jan Duffy. Expert real estate services in Providence, Skye Canyon, and Northwest Las Vegas.';

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PerformanceOptimizer />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <PWAInstallPrompt />
      </div>
    </>
  );
}