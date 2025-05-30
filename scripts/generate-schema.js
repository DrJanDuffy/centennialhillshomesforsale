const fs = require('fs');
const path = require('path');

const siteConfig = {
  baseUrl: 'https://centennialhillshomesforsale.com',
  companyName: 'Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®',
  agentName: 'Dr. Jan Duffy',
  phone: '+1-702-903-1952',
  address: {
    streetAddress: 'Providence Skye Canyon Dr',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89166',
    addressCountry: 'US'
  },
  geo: {
    latitude: '36.268',
    longitude: '-115.328'
  },
  aggregateRating: {
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5'
  },
  socialProfiles: {
    pinterest: 'https://www.pinterest.com/DrJanDuffy/',
    linkedin: 'https://www.linkedin.com/company/california-to-vegas-homes',
    youtube: 'https://www.youtube.com/@DrDuffy',
    website: 'https://www.searchforhomeslasvegas.com/'
  },
  businessSince: '1993-09-01',
  specialties: [
    'Luxury Property Buying & Sales',
    'New Construction Sales & Leasing', 
    'Building Lot Sales',
    'First-time Home Buyer Services',
    'Commercial Property Buying & Sales',
    'Buying Agent Services'
  ]
};

const marketData = {
  medianPrice: 635000,
  priceChange: 8.2,
  daysOnMarket: 18,
  inventoryMonths: 1.8,
  soldLastMonth: 127,
  activeListings: 89
};

function generateRealEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Dr. Jan Duffy, REALTOR®",
    "description": "Looking for homes for sale in North Las Vegas, Centennial Hills, or Lone Mountain? Dr. Jan Duffy, REALTOR® with Berkshire Hathaway HomeServices, is your trusted expert in luxury and new-build Las Vegas homes. With 20+ years of experience in master-planned communities, specializing in Skye Canyon, Providence, Aliante, Centennial Hills, Tule Springs, El Dorado, Lone Mountain, and Summerlin. Ranked in the Top 1% of Las Vegas REALTORS®, offering expert guidance, same-day showings, and free market analysis. Available 24/7 with personalized service. 4.9/5 star rating.",
    "url": siteConfig.baseUrl,
    "telephone": siteConfig.phone,
    "address": {
      "@type": "PostalAddress",
      ...siteConfig.address
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
      },
      {
        "@type": "Place",
        "name": "Lone Mountain, Las Vegas, NV"
      },
      {
        "@type": "Place",
        "name": "Aliante, Las Vegas, NV"
      },
      {
        "@type": "Place",
        "name": "Tule Springs, Las Vegas, NV"
      }
    ],
    "serviceType": [
      "Real Estate Agent",
      "Real Estate Agency", 
      "Real Estate Consultant",
      "Property Management Company",
      "Building Lot Sales",
      "Buying Agent Services",
      "Commercial Property Buying & Sales",
      "First-time Home Buyer Services",
      "Luxury Property Buying & Sales",
      "New Construction Sales"
    ],
    "priceRange": "$300,000 - $5,000,000",
    "aggregateRating": {
      "@type": "AggregateRating",
      ...siteConfig.aggregateRating
    },
    "openingHours": [
      "Mo 06:00-21:00",
      "Tu 06:00-21:00", 
      "We 06:00-21:00",
      "Th 06:00-21:00",
      "Fr 06:00-21:00",
      "Sa 06:00-21:00",
      "Su 06:00-21:00"
    ],
    "sameAs": Object.values(siteConfig.socialProfiles)
  };
}

function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.baseUrl}/#business`,
    "name": siteConfig.companyName,
    "description": "Premier real estate services in Centennial Hills with local market expertise",
    "url": siteConfig.baseUrl,
    "telephone": siteConfig.phone,
    "address": {
      "@type": "PostalAddress",
      ...siteConfig.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.geo.latitude,
      "longitude": siteConfig.geo.longitude
    },
    "openingHours": "Mo-Su 08:00-20:00",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      ...siteConfig.aggregateRating
    }
  };
}

function generateMarketDataSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Centennial Hills Real Estate Market Data",
    "description": "Current real estate market statistics for Centennial Hills, Las Vegas",
    "dateModified": new Date().toISOString().split('T')[0],
    "creator": {
      "@type": "Organization",
      "name": siteConfig.companyName
    },
    "keywords": "real estate, market data, Centennial Hills, Las Vegas, home prices",
    "variableMeasured": [
      {
        "@type": "PropertyValue",
        "name": "Median Home Price",
        "value": marketData.medianPrice,
        "unitCode": "USD"
      },
      {
        "@type": "PropertyValue",
        "name": "Price Change Year Over Year",
        "value": marketData.priceChange,
        "unitCode": "P1"
      },
      {
        "@type": "PropertyValue",
        "name": "Average Days on Market",
        "value": marketData.daysOnMarket,
        "unitCode": "DAY"
      }
    ]
  };
}

function generateSchemaForPage(pageType, additionalData = {}) {
  const baseSchemas = [
    generateRealEstateAgentSchema(),
    generateLocalBusinessSchema()
  ];

  switch (pageType) {
    case 'home':
      return [
        ...baseSchemas,
        generateMarketDataSchema()
      ];
    case 'listings':
      return [
        ...baseSchemas,
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Homes for Sale in Centennial Hills",
          "description": "Current real estate listings in Centennial Hills, Las Vegas",
          "numberOfItems": marketData.activeListings
        }
      ];
    case 'market-update':
      return [
        ...baseSchemas,
        generateMarketDataSchema()
      ];
    default:
      return baseSchemas;
  }
}

// Export for use in Next.js pages
module.exports = {
  generateSchemaForPage,
  generateRealEstateAgentSchema,
  generateLocalBusinessSchema,
  generateMarketDataSchema,
  siteConfig,
  marketData
};

console.log('Schema generation script created successfully!');
console.log('Use this in your pages by importing: const { generateSchemaForPage } = require("../scripts/generate-schema");');