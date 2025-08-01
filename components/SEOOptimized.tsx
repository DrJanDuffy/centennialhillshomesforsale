import Head from 'next/head';
import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
  pageType?: 'website' | 'article' | 'realestate' | 'local-business';
  neighborhood?: string;
  priceRange?: string;
}

export default function SEOOptimized({ 
  title = "Centennial Hills Homes For Sale | Dr. Jan Duffy REALTOR®",
  description = "Find luxury homes in Centennial Hills, Providence & Skye Canyon with Dr. Jan Duffy, top-rated REALTOR® at Berkshire Hathaway HomeServices Nevada Properties.",
  keywords = "Centennial Hills homes, Las Vegas real estate, Providence, Skye Canyon, Dr Jan Duff",
  ogImage = "/icon-512x512.png",
  canonicalUrl,
  structuredData,
  pageType = 'website',
  neighborhood,
  priceRange = "$450,000 - $1,200,000"
}: SEOProps) {

  useEffect(() => {
    // Google Analytics page view tracking
    if (typeof window !== 'undefined' && (window as unknown as { gtag: (command: string, targetId: string, config: Record<string, unknown>) => void }).gtag) {
      (window as unknown as { gtag: (command: string, targetId: string, config: Record<string, unknown>) => void }).gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: title,
        page_location: window.location.href
      });
    }

    // Google Search Console page indexing request
    if (navigator.serviceWorker && 'indexNow' in window) {
      navigator.serviceWorker.ready.then(() => {
        // Request immediate indexing for new content
        fetch('/api/request-indexing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: window.location.href })
        });
      });
    }
  }, [title]);

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": pageType === 'local-business' ? 'RealEstateAgent' : 'WebPage',
    "name": title,
    "description": description,
    "url": canonicalUrl || (typeof window !== 'undefined' ? window.location.href : ''),
    ...(neighborhood && {
      "about": {
        "@type": "Place",
        "name": `${neighborhood}, Las Vegas, NV`,
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "36.268",
          "longitude": "-115.328"
        }
      }
    }),
    ...(pageType === 'realestate' && {
      "serviceType": "Real Estate Sales",
      "areaServed": "Las Vegas, Nevada",
      "priceRange": priceRange,
      "provider": {
        "@type": "RealEstateAgent",
        "name": "Dr. Jan Duffy",
        "telephone": "(702) 903-1952"
      }
    })
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={canonicalUrl || ''} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Centennial Hills Homes For Sale" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl || ''} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      <meta name="format-detection" content="telephone=no" />

      {/* Geo Tags */}
      <meta name="geo.region" content="US-NV" />
      <meta name="geo.placename" content="Las Vegas, Nevada" />
      <meta name="geo.position" content="36.268;-115.328" />
      <meta name="ICBM" content="36.268, -115.328" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData)
        }}
      />

      {/* Google Search Console */}
      <meta name="google-site-verification" content="centennial-hills-homes-verification" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="format-detection" content="telephone=yes" />

      {/* Performance Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Additional Icons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Head>
  );
}