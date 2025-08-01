
import React from 'react';
import Head from 'next/head';

interface LocalSEOBoosterProps {
  neighborhood?: string;
  zipCode?: string;
  pageType?: 'neighborhood' | 'zipcode' | 'service';
}

export default function LocalSEOBooster({
  neighborhood = "Centennial Hills",
  zipCode
}: LocalSEOBoosterProps) {

  // Local citation data
  const localCitations = [
    {
      platform: "Google My Business",
      url: "https://g.page/centennial-hills-homes",
      status: "verified"
    },
    {
      platform: "Yelp",
      url: "https://yelp.com/biz/centennial-hills-homes",
      status: "claimed"
    },
    {
      platform: "Facebook",
      url: "https://facebook.com/CentennialHillsHomes",
      status: "active"
    }
  ];

  // Local area schema for neighborhoods
  const neighborhoodSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": `${neighborhood}, Las Vegas, Nevada`,
    "description": `Luxury master-planned community in Las Vegas featuring beautiful homes, excellent schools, and resort-style amenities`,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": neighborhood === "Providence" ? "36.275" : neighborhood === "Skye Canyon" ? "36.285" : "36.268",
      "longitude": neighborhood === "Providence" ? "-115.332" : neighborhood === "Skye Canyon" ? "-115.315" : "-115.328"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Las Vegas",
      "addressRegion": "Nevada",
      "addressCountry": "US",
      ...(zipCode && { "postalCode": zipCode })
    },
    "containedInPlace": {
      "@type": "City",
      "name": "Las Vegas",
      "addressRegion": "Nevada"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Golf Course",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification", 
        "name": "Community Parks",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Shopping Centers",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Top-Rated Schools",
        "value": true
      }
    ]
  };

  // Local market statistics schema
  const marketStatsSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${neighborhood} Real Estate Market Data`,
    "description": `Current market statistics and trends for ${neighborhood} real estate`,
    "creator": {
      "@type": "Person",
      "name": "Dr. Jan Duffy"
    },
    "dateModified": new Date().toISOString().split('T')[0],
    "spatialCoverage": {
      "@type": "Place",
      "name": `${neighborhood}, Las Vegas, NV`
    },
    "about": [
      "Real Estate Prices",
      "Market Trends",
      "Property Values",
      "Home Sales Data"
    ]
  };

  return (
    <Head>
      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(neighborhoodSchema) }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(marketStatsSchema) }}
      />

      {/* Local SEO Meta Tags */}
      <meta name="geo.placename" content={`${neighborhood}, Las Vegas, Nevada`} />
      <meta name="geo.region" content="US-NV" />
      <meta name="geo.position" content="36.268;-115.328" />
      
      {/* Local Business Information */}
      <meta property="business:contact_data:locality" content="Las Vegas" />
      <meta property="business:contact_data:region" content="Nevada" />
      <meta property="business:contact_data:postal_code" content={zipCode || "89149"} />
      <meta property="business:contact_data:country_name" content="United States" />
      
      {/* Local Citations Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Local Business Citations",
            "itemListElement": localCitations.map((citation, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": citation.url,
              "name": citation.platform
            }))
          })
        }}
      />
    </Head>
  );
}
