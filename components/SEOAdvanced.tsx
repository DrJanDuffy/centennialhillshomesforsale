
import React from 'react';
import Head from 'next/head';

interface SEOAdvancedProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  pageType?: 'home' | 'neighborhood' | 'property' | 'service';
  neighborhood?: string;
  propertyData?: any;
}

export default function SEOAdvanced({
  title = "Centennial Hills Homes For Sale | Dr. Jan Duffy REALTOR® | Las Vegas NV",
  description = "Find luxury homes in Centennial Hills, Providence & Skye Canyon with Dr. Jan Duffy, top 1% Las Vegas REALTOR®. 30+ years experience, 4.9/5 rating, same-day showings. Call (702) 903-1952.",
  keywords = "Centennial Hills homes for sale, Providence Las Vegas, Skye Canyon real estate, Dr Jan Duffy REALTOR, luxury homes Las Vegas, Berkshire Hathaway, 89149, 89166",
  canonicalUrl,
  pageType = 'home',
  neighborhood,
  propertyData
}: SEOAdvancedProps) {

  const siteUrl = 'https://centennialhillshomesforsale.com';
  const fullCanonicalUrl = canonicalUrl || `${siteUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;

  // Enhanced E-A-T signals
  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr. Jan Duffy",
    "jobTitle": "REALTOR®",
    "description": "Licensed Nevada REALTOR® with 30+ years experience specializing in Centennial Hills luxury real estate",
    "telephone": "(702) 903-1952",
    "email": "jan@centennialhillshomes.com",
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Nevada Real Estate License",
        "issuedBy": "Nevada Real Estate Division"
      }
    ],
    "award": ["Top 1% Las Vegas REALTOR®", "5-Star Customer Rating"],
    "knowsAbout": ["Las Vegas Real Estate", "Luxury Properties", "Master-Planned Communities"],
    "workLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Las Vegas",
        "addressRegion": "NV",
        "postalCode": "89166"
      }
    }
  };

  // WebSite schema with search action
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": siteUrl,
    "name": "Centennial Hills Homes For Sale",
    "description": "Your trusted source for luxury homes in Centennial Hills, Providence, and Skye Canyon",
    "publisher": {
      "@type": "Person",
      "@id": `${siteUrl}/#DrJanDuffy`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "RealEstateAgent",
      "@id": `${siteUrl}/#realestateagent`
    }
  };

  // BreadcrumbList for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Las Vegas Real Estate",
        "item": `${siteUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": neighborhood || "Centennial Hills",
        "item": `${siteUrl}/${neighborhood?.toLowerCase().replace(' ', '-') || 'centennial-hills'}`
      }
    ]
  };

  // Service area schema
  const serviceAreaSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Real Estate Services",
    "description": "Comprehensive real estate services in Centennial Hills and surrounding areas",
    "provider": {
      "@type": "RealEstateAgent",
      "name": "Dr. Jan Duffy",
      "telephone": "(702) 903-1952"
    },
    "areaServed": [
      {
        "@type": "Place",
        "name": "Centennial Hills, Las Vegas, NV"
      },
      {
        "@type": "Place", 
        "name": "Providence, Las Vegas, NV"
      },
      {
        "@type": "Place",
        "name": "Skye Canyon, Las Vegas, NV"
      },
      {
        "@type": "Place",
        "name": "Summerlin, Las Vegas, NV"
      }
    ],
    "serviceType": [
      "Residential Real Estate Sales",
      "Luxury Property Sales", 
      "New Construction Sales",
      "Property Valuation",
      "Market Analysis"
    ]
  };

  return (
    <Head>
      {/* Enhanced Title and Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Advanced SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Enhanced Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:image" content={`${siteUrl}/apple-touch-icon.png`} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:site_name" content="Centennial Hills Homes For Sale" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/apple-touch-icon.png`} />
      
      {/* Local SEO Enhancement */}
      <meta name="geo.region" content="US-NV" />
      <meta name="geo.placename" content="Las Vegas, Nevada" />
      <meta name="geo.position" content="36.268;-115.328" />
      <meta name="ICBM" content="36.268, -115.328" />
      
      {/* Business Information */}
      <meta name="contact" content="(702) 903-1952" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreaSchema) }}
      />

      {/* Performance and Security */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Mobile and Accessibility */}
      <meta name="theme-color" content="#1a365d" />
      <meta name="msapplication-TileColor" content="#1a365d" />
      <meta name="application-name" content="Centennial Hills Homes" />
      <meta name="format-detection" content="telephone=yes" />
    </Head>
  );
}
