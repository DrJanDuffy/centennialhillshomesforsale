
import Head from 'next/head';
import GoogleAnalytics from './GoogleAnalytics';
import GoogleSearchConsole from './GoogleSearchConsole';

interface EnhancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  pageType?: 'website' | 'article' | 'property' | 'neighborhood';
  neighborhood?: string;
  propertyData?: {
    price?: number;
    [key: string]: unknown;
  };
  structuredData?: object[];
}

export default function EnhancedSEO({
  title = "Centennial Hills Homes For Sale | Dr. Jan Duffy REALTOR®",
  description = "Find luxury homes in Centennial Hills, Providence & Skye Canyon with Dr. Jan Duffy, top-rated REALTOR® with 30+ years experience. Free market analysis.",
  keywords = "Centennial Hills homes, Las Vegas real estate, Providence, Skye Canyon, Dr Jan Duffy REALTOR, luxury homes Las Vegas",
  canonicalUrl,
  ogImage = "/apple-touch-icon.png",
  pageType = 'website',
  neighborhood,
  propertyData,
  structuredData = []
}: EnhancedSEOProps) {

  const siteUrl = 'https://centennialhillshomesforsale.com';
  const fullCanonicalUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : siteUrl);
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Enhanced structured data
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": pageType === 'property' ? 'Product' : 'WebPage',
    "name": title,
    "description": description,
    "url": fullCanonicalUrl,
    "image": fullOgImage,
    "publisher": {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`
    },
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`
    },
    ...(neighborhood && {
      "about": {
        "@type": "Place",
        "name": `${neighborhood}, Las Vegas, NV`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Las Vegas",
          "addressRegion": "NV",
          "addressCountry": "US"
        }
      }
    }),
    ...(propertyData && {
      "offers": {
        "@type": "Offer",
        "price": propertyData.price,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    })
  };

  const allStructuredData = [defaultStructuredData, ...structuredData];

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={fullCanonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={pageType} />
        <meta property="og:url" content={fullCanonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={fullOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Centennial Hills Homes For Sale" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={fullCanonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullOgImage} />
        
        {/* Enhanced SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
        
        {/* Geographic */}
        <meta name="geo.region" content="US-NV" />
        <meta name="geo.placename" content="Las Vegas, Nevada" />
        <meta name="geo.position" content="36.268;-115.328" />
        <meta name="ICBM" content="36.268, -115.328" />
        
        {/* Mobile */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Structured Data */}
        {allStructuredData.map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(data)
            }}
          />
        ))}
      </Head>
      
      {/* Google Services */}
      <GoogleAnalytics />
      <GoogleSearchConsole />
    </>
  );
}
