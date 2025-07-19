
import React from 'react';
import Head from 'next/head';

// Define proper interfaces for different schema types
interface LocalBusinessSchema {
  "@context": string;
  "@type": string | string[];
  "@id": string;
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  foundingDate?: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    "@type": string;
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  openingHoursSpecification?: Array<{
    "@type": string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  priceRange?: string;
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    reviewCount: string;
    bestRating: string;
    worstRating: string;
  };
  areaServed?: Array<{
    "@type": string;
    name: string;
    geo?: {
      "@type": string;
      latitude: string;
      longitude: string;
    };
  }>;
  serviceType?: string[];
  hasCredential?: Array<{
    "@type": string;
    credentialCategory: string;
    name: string;
  }>;
  memberOf?: Array<{
    "@type": string;
    name: string;
  }>;
  affiliation?: {
    "@type": string;
    name: string;
    url: string;
  };
  knowsAbout?: string[];
  hasOfferCatalog?: {
    "@type": string;
    name: string;
    itemListElement: Array<{
      "@type": string;
      name: string;
      description: string;
      price?: string;
      priceCurrency?: string;
      availability?: string;
    }>;
  };
  sameAs: string[];
}

interface OrganizationSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  alternateName?: string;
  description?: string;
  url: string;
  logo: string;
  contactPoint: {
    "@type": string;
    telephone: string;
    contactType: string;
    areaServed?: string;
    availableLanguage: string;
  };
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  foundingDate?: string;
  numberOfEmployees?: string;
  slogan?: string;
}

interface DatasetSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  description: string;
  dateModified: string;
  creator: {
    "@type": string;
    name: string;
  };
  keywords: string;
  variableMeasured: Array<{
    "@type": string;
    name: string;
    value: number;
    unitCode: string;
    description: string;
  }>;
}

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
  };
  phone?: string;
  email?: string;
  website?: string;
  serviceArea?: string[];
  pageType?: 'home' | 'listings' | 'neighborhoods' | 'services';
}

export default function LocalBusinessSchema({
  name = "Dr. Jan Duffy, REALTOR®",
  description = "Top-rated Las Vegas REALTOR® specializing in Centennial Hills, Providence, and Skye Canyon. 30+ years experience in luxury and new construction homes with proven results.",
  address = {
    streetAddress: "Providence Skye Canyon Dr",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89166"
  },
  phone = "(702) 903-1952",
  email = "jan@centennialhillshomes.com",
  website = "https://centennialhillshomesforsale.com",
  serviceArea = ["Centennial Hills", "Providence", "Skye Canyon", "Northwest Las Vegas", "89149", "89166"],
  pageType = 'home'
}: LocalBusinessSchemaProps) {
  
  // Enhanced Real Estate Agent Schema
  const realEstateAgentSchema: LocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": `${website}/#realestateagent`,
    "name": name,
    "alternateName": "Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®",
    "description": description,
    "url": website,
    "telephone": phone,
    "email": email,
    "foundingDate": "1993-09-01",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.268,
      "longitude": -115.328
    },
    "areaServed": serviceArea.map(area => ({
      "@type": "Place",
      "name": `${area}, Las Vegas, NV`,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "36.268",
        "longitude": "-115.328"
      }
    })),
    "serviceType": [
      "Real Estate Sales",
      "Real Estate Buying Services",
      "Property Valuation",
      "Market Analysis",
      "First-Time Home Buyer Services",
      "Luxury Property Sales",
      "New Construction Homes",
      "Building Lot Sales",
      "Commercial Property Services",
      "Investment Property Consultation"
    ],
    "priceRange": "$300,000 - $5,000,000",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "4"
    },
    "openingHours": [
      "Mo-Su 06:00-21:00"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Professional License",
        "name": "Nevada Real Estate License"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Professional Designation",
        "name": "REALTOR® Designation"
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
      },
      {
        "@type": "Organization",
        "name": "Nevada Association of REALTORS®"
      }
    ],
    "affiliation": {
      "@type": "Organization",
      "name": "Berkshire Hathaway HomeServices",
      "url": "https://www.bhhsnv.com"
    },
    "knowsAbout": [
      "Centennial Hills Real Estate",
      "Providence Las Vegas Homes",
      "Skye Canyon Properties",
      "Las Vegas Luxury Homes",
      "New Construction Homes",
      "Master-Planned Communities",
      "Investment Properties",
      "First-Time Home Buying",
      "Commercial Real Estate",
      "Market Analysis",
      "Property Valuation"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Real Estate Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Free Market Analysis",
          "description": "Complimentary property valuation and market analysis",
          "price": "0",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "name": "Same Day Showings",
          "description": "Quick property viewings available same day",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "24/7 Availability",
          "description": "Round-the-clock real estate assistance",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    "sameAs": [
      website,
      "https://g.co/kgs/4qQ8DsY",
      "https://www.pinterest.com/DrJanDuffy/",
      "https://www.linkedin.com/compunknown/california-to-vegas-homes",
      "https://www.youtube.com/@DrDuffy",
      "https://www.searchforhomeslasvegas.com/",
      "https://www.facebook.com/centennialhillshomes",
      "https://www.instagram.com/drjanduffy_realtor"
    ]
  };

  // Market Data Schema
  const marketDataSchema: DatasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${website}/#marketdata`,
    "name": "Centennial Hills Real Estate Market Data",
    "description": "Current real estate market statistics for Centennial Hills, Las Vegas",
    "dateModified": new Date().toISOString().split('T')[0],
    "creator": {
      "@type": "Organization",
      "name": name
    },
    "keywords": "real estate, market data, Centennial Hills, Las Vegas, home prices, market trends",
    "variableMeasured": [
      {
        "@type": "PropertyValue",
        "name": "Median Home Price",
        "value": 635000,
        "unitCode": "USD",
        "description": "Current median home price in Centennial Hills"
      },
      {
        "@type": "PropertyValue",
        "name": "Price Change Year Over Year",
        "value": 8.2,
        "unitCode": "P1",
        "description": "Annual price appreciation percentage"
      },
      {
        "@type": "PropertyValue",
        "name": "Average Days on Market",
        "value": 18,
        "unitCode": "DAY",
        "description": "Average time properties spend on the market"
      },
      {
        "@type": "PropertyValue",
        "name": "Price Per Square Foot",
        "value": 223,
        "unitCode": "USD",
        "description": "Average price per square foot"
      }
    ]
  };

  // Organization Schema
  const organizationSchema: OrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${website}/#organization`,
    "name": "Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®",
    "alternateName": "Centennial Hills Homes",
    "url": website,
    "logo": `${website}/apple-touch-icon.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": phone,
      "contactType": "Customer Service",
      "areaServed": "US",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": "US"
    },
    "foundingDate": "1993-09-01",
    "numberOfEmployees": "1-10",
    "slogan": "Your Trusted Real Estate Expert in Centennial Hills"
  };

  // Separate schema arrays by type
  const businessSchemas = [realEstateAgentSchema];
  const organizationSchemas = [organizationSchema];
  const dataSchemas = pageType === 'home' ? [marketDataSchema] : [];

  return (
    <Head>
      {/* Business Schemas */}
      {businessSchemas.map((schema, index) => (
        <script
          key={`business-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
      {/* Organization Schemas */}
      {organizationSchemas.map((schema, index) => (
        <script
          key={`org-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
      {/* Data Schemas */}
      {dataSchemas.map((schema, index) => (
        <script
          key={`data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}
