
import React, { useEffect } from 'react';
import Head from 'next/head';

interface GoogleSearchConsoleProps {
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
  structuredData?: any;
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

const GoogleSearchConsole: React.FC<GoogleSearchConsoleProps> = ({
  pageTitle = "Centennial Hills Homes For Sale | Dr. Jan Duffy | Las Vegas Luxury Real Estate",
  pageDescription = "Discover luxury homes for sale in Centennial Hills, Las Vegas. Dr. Jan Duffy, Top 1% REALTOR®, specializes in Providence, Skye Canyon, and Northwest Las Vegas luxury real estate.",
  pageUrl = "https://centennialhillshomesforsale.com",
  structuredData,
  isPropertyPage = false,
  propertyData
}) => {
  useEffect(() => {
    // Google Search Console tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_title: pageTitle,
        page_location: pageUrl,
        custom_map: {
          'cd1': 'userType',
          'cd2': 'pageType',
          'cd3': 'neighborhood',
          'cd4': 'propertyType'
        }
      });
    }
  }, [pageTitle, pageUrl]);

  // Generate structured data for real estate agent
  const realEstateAgentSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Dr. Jan Duffy",
    "description": "Top 1% REALTOR® specializing in luxury real estate in Centennial Hills, Providence, and Skye Canyon, Las Vegas",
    "url": "https://centennialhillshomesforsale.com",
    "telephone": "+1-702-903-1952",
    "email": "jan@centennialhillshomesforsale.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Centennial Hills",
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "postalCode": "89149",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.2089,
      "longitude": -115.2644
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Las Vegas"
      },
      {
        "@type": "Place",
        "name": "Centennial Hills"
      },
      {
        "@type": "Place", 
        "name": "Providence"
      },
      {
        "@type": "Place",
        "name": "Skye Canyon"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Luxury Homes for Sale",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "House",
            "name": "Centennial Hills Luxury Homes"
          }
        }
      ]
    },
    "award": "Top 1% REALTOR®",
    "brand": {
      "@type": "Brand",
      "name": "Berkshire Hathaway HomeServices"
    },
    "image": "https://centennialhillshomesforsale.com/images/dr-jan-duffy-realtor.jpg"
  };

  // Generate structured data for local business
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Dr. Jan Duffy Real Estate",
    "description": "Luxury real estate specialist in Centennial Hills, Las Vegas",
    "url": "https://centennialhillshomesforsale.com",
    "telephone": "+1-702-903-1952",
    "email": "jan@centennialhillshomesforsale.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Centennial Hills",
      "addressLocality": "Las Vegas", 
      "addressRegion": "NV",
      "postalCode": "89149",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.2089,
      "longitude": -115.2644
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "$$$",
    "paymentAccepted": "Cash, Credit Card, Financing",
    "currenciesAccepted": "USD",
    "areaServed": {
      "@type": "City",
      "name": "Las Vegas"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 36.2089,
        "longitude": -115.2644
      },
      "geoRadius": "50000"
    }
  };

  // Generate structured data for property listings
  const propertySchema = propertyData ? {
    "@context": "https://schema.org",
    "@type": "House",
    "name": `${propertyData.address} - ${propertyData.neighborhood}`,
    "description": `Luxury ${propertyData.bedrooms} bedroom, ${propertyData.bathrooms} bathroom home for sale in ${propertyData.neighborhood}, Las Vegas`,
    "url": pageUrl,
    "image": propertyData.images,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": propertyData.address,
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "postalCode": "89149",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.2089,
      "longitude": -115.2644
    },
    "numberOfRooms": propertyData.bedrooms,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": propertyData.sqft,
      "unitCode": "SQFT"
    },
    "offers": {
      "@type": "Offer",
      "price": propertyData.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "RealEstateAgent",
        "name": "Dr. Jan Duffy"
      }
    }
  } : null;

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://centennialhillshomesforsale.com"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Centennial Hills",
        "item": "https://centennialhillshomesforsale.com/centennial-hills"
      }
    ]
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content="Centennial Hills homes for sale, Las Vegas luxury real estate, Providence homes, Skye Canyon properties, Dr. Jan Duffy REALTOR" />
      <meta name="author" content="Dr. Jan Duffy" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="Centennial Hills Homes For Sale" />
      <meta property="og:image" content="https://centennialhillshomesforsale.com/images/og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content="https://centennialhillshomesforsale.com/images/twitter-card.jpg" />

      {/* Local Business Meta Tags */}
      <meta name="geo.region" content="US-NV" />
      <meta name="geo.placename" content="Las Vegas" />
      <meta name="geo.position" content="36.2089;-115.2644" />
      <meta name="ICBM" content="36.2089, -115.2644" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(realEstateAgentSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />
      {propertySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(propertySchema)
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/images/hero-image.jpg" as="image" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//maps.googleapis.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />

      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="your-verification-code" />
    </Head>
  );
};

export default GoogleSearchConsole;
