
const fs = require('fs');
const path = require('path');

const siteConfig = {
  baseUrl: 'https://centennialhillshomesforsale.com',
  companyName: 'Centennial Hills Homes For Sale',
  phone: '+1-702-555-0123',
  address: {
    streetAddress: '10161 Park Run Dr',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89145',
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
  }
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
    "name": siteConfig.companyName,
    "description": "Expert real estate services in Centennial Hills, Las Vegas with over 10 years of local market experience",
    "url": siteConfig.baseUrl,
    "telephone": siteConfig.phone,
    "address": {
      "@type": "PostalAddress",
      ...siteConfig.address
    },
    "areaServed": {
      "@type": "Place",
      "name": "Centennial Hills, Las Vegas, Nevada",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": siteConfig.geo.latitude,
        "longitude": siteConfig.geo.longitude
      }
    },
    "serviceType": "Real Estate Sales",
    "priceRange": "$300,000 - $2,000,000",
    "aggregateRating": {
      "@type": "AggregateRating",
      ...siteConfig.aggregateRating
    }
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
