import Head from 'next/head';
import { useRouter } from 'next/router';
import type React from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  structuredData?: Record<string, unknown>;
  isPropertyPage?: boolean;
  propertyData?: {
    address: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    neighborhood: string;
    images: string[];
  };
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Centennial Hills Homes For Sale | Dr. Jan Duffy | Las Vegas Luxury Real Estate',
  description = 'Discover luxury homes for sale in Centennial Hills, Las Vegas. Dr. Jan Duffy, Top 1% REALTOR®, specializes in Providence, Skye Canyon, and Northwest Las Vegas luxury real estate.',
  canonical,
  structuredData,
  isPropertyPage = false,
  propertyData,
}) => {
  const router = useRouter();
  const currentUrl = canonical || `https://centennialhillshomesforsale.com${router.asPath}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={currentUrl} />
        
        {/* Basic SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dr. Jan Duffy" />
        <meta name="keywords" content="Centennial Hills homes for sale, Las Vegas luxury real estate, Dr. Jan Duffy REALTOR" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Centennial Hills Homes For Sale" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        
        {/* RSS Feed Autodiscovery */}
        <link rel="alternate" type="application/rss+xml" title="Centennial Hills Market Insights RSS Feed" href="https://centennialhillshomesforsale.com/api/rss-feed" />
        <link rel="alternate" type="application/atom+xml" title="Centennial Hills Market Insights Atom Feed" href="https://centennialhillshomesforsale.com/api/rss-feed" />
        <link rel="feed" type="application/rss+xml" title="Real Estate Market Insights" href="https://www.simplifyingthemarket.com/en/feed?a=956758-ef2edda2f940e018328655620ea05f18" />
        
        {/* Structured Data */}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
