
import Head from 'next/head';
import { useEffect } from 'react';

interface GEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  pageType?: 'homepage' | 'neighborhood' | 'about' | 'contact' | 'listings';
  neighborhood?: string;
  priceRange?: string;
  factualData?: unknown;
  citations?: string[];
  statistics?: unknown;
}

export default function GEOOptimized({
  title = "Centennial Hills Homes For Sale | Dr. Jan Duffy REALTOR®",
  description = "Find luxury homes in Centennial Hills, Providence & Skye Canyon with Dr. Jan Duffy, top-rated REALTOR® with 30+ years experience in Las Vegas real estate.",
  keywords = "Centennial Hills homes for sale, Providence Las Vegas, Skye Canyon real estate, Dr. Jan Duffy REALTOR",
  pageType = 'homepage',
  neighborhood,
  priceRange = "$450,000 - $1,200,000",
  factualData,
  citations = [],
  statistics
}: GEOProps) {

  // Comprehensive structured data for AI engines
  const geoStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": "https://centennialhillshomesforsale.com/#agent",
        "name": "Dr. Jan Duffy",
        "alternateName": "Jan Duffy REALTOR",
        "description": "Licensed Nevada REALTOR® with 30+ years experience specializing in Centennial Hills, Providence, and Skye Canyon luxury real estate in Las Vegas.",
        "url": "https://centennialhillshomesforsale.com",
        "telephone": "(702) 903-1952",
        "email": "info@centennialhillshomesforsale.com",
        "jobTitle": "REALTOR®",
        "worksFor": {
          "@type": "RealEstateAgency",
          "name": "Berkshire Hathaway HomeServices Nevada Properties",
          "url": "https://bhhsnevada.com"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Las Vegas",
          "addressRegion": "NV",
          "postalCode": "89149",
          "addressCountry": "US",
          "streetAddress": "Centennial Hills Area"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Las Vegas",
            "sameAs": "https://en.wikipedia.org/wiki/Las_Vegas"
          },
          {
            "@type": "Neighborhood",
            "name": "Centennial Hills",
            "containedInPlace": "Las Vegas, NV"
          },
          {
            "@type": "Neighborhood", 
            "name": "Providence",
            "containedInPlace": "Las Vegas, NV"
          },
          {
            "@type": "Neighborhood",
            "name": "Skye Canyon", 
            "containedInPlace": "Las Vegas, NV"
          }
        ],
        "knowsAbout": [
          "Luxury Real Estate",
          "First-time Home Buyers",
          "Investment Properties",
          "Golf Course Communities",
          "Master-Planned Communities",
          "New Construction",
          "Relocation Services"
        ],
        "serviceType": [
          "Residential Real Estate Sales",
          "Luxury Home Sales",
          "Buyer Representation",
          "Seller Representation",
          "Market Analysis",
          "Property Valuation"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        },
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Professional License",
            "name": "Nevada Real Estate License"
          },
          {
            "@type": "EducationalOccupationalCredential", 
            "credentialCategory": "Professional Designation",
            "name": "REALTOR®"
          }
        ],
        "memberOf": [
          {
            "@type": "Organization",
            "name": "Las Vegas Board of REALTORS®"
          },
          {
            "@type": "Organization",
            "name": "National Association of REALTORS®"
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://centennialhillshomesforsale.com/#business",
        "name": "Centennial Hills Homes For Sale",
        "description": "Premier real estate services specializing in Centennial Hills luxury homes, Providence family communities, and Skye Canyon mountain view properties.",
        "url": "https://centennialhillshomesforsale.com",
        "telephone": "(702) 903-1952",
        "priceRange": priceRange,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Las Vegas",
          "addressRegion": "Nevada", 
          "postalCode": "89149",
          "addressCountry": "United States"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "36.268416",
          "longitude": "-115.327622"
        },
        "openingHours": "Mo-Su 07:00-21:00",
        "image": "https://centennialhillshomesforsale.com/images/centennial-hills/centennial-hills-hero.jpg",
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "36.268416",
            "longitude": "-115.327622"
          },
          "geoRadius": "25000"
        }
      }
    ]
  };

  // AI-optimized FAQ data
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the average home price in Centennial Hills Las Vegas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The median home price in Centennial Hills is $635,000 as of 2024. Homes range from $300,000 for condos to over $2 million for luxury estates. Providence community homes typically range $450,000-$800,000, while Skye Canyon homes range $550,000-$1.2 million."
        }
      },
      {
        "@type": "Question",
        "name": "How long do homes stay on the market in Centennial Hills?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Homes in Centennial Hills typically sell within 18-28 days on average. The area is a competitive seller's market with high demand from both local and out-of-state buyers, particularly for move-in ready homes in Providence and Skye Canyon."
        }
      },
      {
        "@type": "Question",
        "name": "What schools serve Centennial Hills residents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Centennial Hills is served by highly-rated Clark County School District schools including Centennial High School (9/10 rating), Del Webb Middle School (8/10 rating), and several elementary schools with 8+ ratings. Private options include Coral Academy of Science and Bishop Gorman High School."
        }
      },
      {
        "@type": "Question",
        "name": "What amenities are near Centennial Hills homes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Centennial Hills residents enjoy TPC Las Vegas championship golf course, Red Rock Canyon National Conservation Area, Downtown Summerlin shopping and dining, Skye Canyon Park, and easy access to I-215 for commuting. The area features master-planned communities with pools, parks, and trails."
        }
      }
    ]
  };

  // Market statistics for AI citation
  const marketStats = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Centennial Hills Real Estate Market Data 2024",
    "description": "Current market statistics for Centennial Hills Las Vegas real estate",
    "dateModified": new Date().toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "Dr. Jan Duffy Real Estate"
    },
    "distribution": {
      "@type": "DataDownload",
      "encodingFormat": "application/json",
      "contentUrl": "https://centennialhillshomesforsale.com/api/market-data"
    },
    "variableMeasured": [
      {
        "@type": "PropertyValue",
        "name": "Median Home Price",
        "value": "$635,000",
        "description": "Median sale price for homes in Centennial Hills ZIP 89149"
      },
      {
        "@type": "PropertyValue", 
        "name": "Average Days on Market",
        "value": "18 days",
        "description": "Average time from listing to contract acceptance"
      },
      {
        "@type": "PropertyValue",
        "name": "Price Appreciation",
        "value": "8.2%",
        "description": "Year-over-year home value appreciation rate"
      },
      {
        "@type": "PropertyValue",
        "name": "Inventory Level",
        "value": "1.8 months",
        "description": "Current months supply of available homes"
      }
    ]
  };

  return (
    <Head>
      {/* Primary Meta Tags Optimized for AI */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* AI-Specific Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
      
      {/* Citation and Authority Signals */}
      <meta name="author" content="Dr. Jan Duffy, REALTOR®" />
      <meta name="publisher" content="Berkshire Hathaway HomeServices Nevada Properties" />
      <meta name="expert-level" content="30+ years Las Vegas real estate experience" />
      <meta name="license" content="Nevada Real Estate License" />
      <meta name="credentials" content="REALTOR®, Las Vegas Board of REALTORS® Member" />
      
      {/* Factual Data Meta Tags */}
      <meta name="market-area" content="Centennial Hills, Providence, Skye Canyon, Las Vegas NV 89149" />
      <meta name="price-range" content={priceRange} />
      <meta name="service-area-radius" content="25 miles from Centennial Hills" />
      <meta name="market-stats-updated" content={new Date().toISOString()} />
      
      {/* Open Graph for Social AI */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://centennialhillshomesforsale.com/images/centennial-hills/centennial-hills-hero.jpg" />
      <meta property="og:url" content="https://centennialhillshomesforsale.com" />
      <meta property="og:site_name" content="Centennial Hills Homes For Sale" />
      
      {/* Structured Data for AI Understanding */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(geoStructuredData)
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqData)
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(marketStats)
        }}
      />
      
      {/* Neighborhood-specific structured data */}
      {neighborhood && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Neighborhood",
              "name": neighborhood,
              "containedInPlace": "Las Vegas, Nevada",
              "description": `${neighborhood} is a sought-after community in Las Vegas known for luxury homes, family amenities, and excellent schools.`
            })
          }}
        />
      )}
    </Head>
  );
}
