
const fs = require('fs');
const path = require('path');

const siteConfig = {
  baseUrl: 'https://centennialhillshomesforsale.com',
  companyName: 'Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®',
  agentName: 'Dr. Jan Duffy',
  phone: '+1-702-903-1952',
  email: 'contact@centennialhillshomesforsale.com',
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
    website: 'https://www.searchforhomeslasvegas.com/',
    facebook: 'https://www.facebook.com/centennialhillshomes',
    instagram: 'https://www.instagram.com/drjanduffy_realtor'
  },
  businessSince: '1993-09-01',
  businessDescription: 'Looking for homes for sale in North Las Vegas, Centennial Hills, or Lone Mountain? Dr. Jan Duffy, REALTOR® with Berkshire Hathaway HomeServices, is your trusted expert in luxury and new-build Las Vegas homes. With 20+ years of experience in master-planned communities, Dr. Duffy specializes in top neighborhoods like Skye Canyon, Providence, Aliante, Centennial Hills, Tule Springs, El Dorado, Lone Mountain, and Summerlin. Ranked in the Top 1% of Las Vegas REALTORS®, Dr. Duffy offers expert guidance, same-day showings, and a free market analysis. Available 24/7, Dr. Duffy provides personalized service to make buying or selling your Las Vegas home easy.',
  specialties: [
    'Building lot sales',
    'Buying agent services', 
    'Commercial property buying & sales',
    'First-time home buyer services',
    'Luxury property buying & sales',
    'New construction homes',
    'Investment property consultation',
    'Relocation services',
    'Short sale assistance',
    'Foreclosure assistance'
  ],
  serviceAreas: [
    'North Las Vegas',
    'Centennial Hills',
    'Lone Mountain',
    'Skye Canyon',
    'Providence',
    'Aliante',
    'Tule Springs',
    'El Dorado',
    'Summerlin',
    'Downtown Summerlin',
    'The Hills',
    'Queensridge',
    'Red Rock Country Club'
  ],
  businessHours: {
    monday: '06:00-21:00',
    tuesday: '06:00-21:00',
    wednesday: '06:00-21:00',
    thursday: '06:00-21:00',
    friday: '06:00-21:00',
    saturday: '06:00-21:00',
    sunday: '06:00-21:00'
  }
};

const marketData = {
  medianPrice: 635000,
  priceChange: 8.2,
  daysOnMarket: 18,
  inventoryMonths: 1.8,
  soldLastMonth: 127,
  activeListings: 89,
  averageHomeSize: 2850,
  pricePerSqFt: 223,
  yearBuilt: 2018,
  appreciation5Year: 42.3
};

function generateEnhancedRealEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.baseUrl}/#realestateagent`,
    "name": siteConfig.agentName,
    "alternateName": siteConfig.companyName,
    "description": siteConfig.businessDescription,
    "url": siteConfig.baseUrl,
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "foundingDate": siteConfig.businessSince,
    "address": {
      "@type": "PostalAddress",
      ...siteConfig.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.geo.latitude,
      "longitude": siteConfig.geo.longitude
    },
    "areaServed": siteConfig.serviceAreas.map(area => ({
      "@type": "Place",
      "name": `${area}, Las Vegas, NV`,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": siteConfig.geo.latitude,
        "longitude": siteConfig.geo.longitude
      }
    })),
    "serviceType": siteConfig.specialties,
    "priceRange": "$300,000 - $5,000,000",
    "aggregateRating": {
      "@type": "AggregateRating",
      ...siteConfig.aggregateRating
    },
    "openingHours": Object.entries(siteConfig.businessHours).map(([day, hours]) => 
      `${day.substring(0, 2).charAt(0).toUpperCase() + day.substring(0, 2).slice(1)} ${hours}`
    ),
    "sameAs": Object.values(siteConfig.socialProfiles),
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
    "knowsAbout": siteConfig.serviceAreas.concat([
      "Real Estate Market Analysis",
      "Home Valuation",
      "Property Investment",
      "Mortgage Assistance",
      "Home Staging",
      "Market Trends"
    ])
  };
}

function generateEnhancedLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.baseUrl}/#localbusiness`,
    "name": siteConfig.companyName,
    "description": "Premier real estate services in Centennial Hills with local market expertise",
    "url": siteConfig.baseUrl,
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "address": {
      "@type": "PostalAddress",
      ...siteConfig.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.geo.latitude,
      "longitude": siteConfig.geo.longitude
    },
    "openingHours": Object.entries(siteConfig.businessHours).map(([day, hours]) => 
      `${day.substring(0, 2).charAt(0).toUpperCase() + day.substring(0, 2).slice(1)} ${hours}`
    ),
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      ...siteConfig.aggregateRating
    },
    "sameAs": Object.values(siteConfig.socialProfiles),
    "paymentAccepted": "Cash, Check, Credit Card, Bank Transfer",
    "currenciesAccepted": "USD",
    "hasMap": `https://www.google.com/maps/place/${encodeURIComponent(siteConfig.address.streetAddress + ' ' + siteConfig.address.addressLocality + ' ' + siteConfig.address.addressRegion)}`,
    "isAccessibleForFree": true,
    "smokingAllowed": false
  };
}

function generateServiceAreaSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.baseUrl}/#service`,
    "name": "Real Estate Services in Centennial Hills",
    "description": "Comprehensive real estate services covering buying, selling, and property management in Centennial Hills and surrounding areas",
    "provider": {
      "@type": "RealEstateAgent",
      "name": siteConfig.agentName,
      "url": siteConfig.baseUrl
    },
    "areaServed": siteConfig.serviceAreas.map(area => ({
      "@type": "Place",
      "name": `${area}, Las Vegas, NV`
    })),
    "serviceType": siteConfig.specialties,
    "offers": [
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
      }
    ]
  };
}

function generateEnhancedMarketDataSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${siteConfig.baseUrl}/#marketdata`,
    "name": "Centennial Hills Real Estate Market Data",
    "description": "Current real estate market statistics for Centennial Hills, Las Vegas",
    "dateModified": new Date().toISOString().split('T')[0],
    "creator": {
      "@type": "Organization",
      "name": siteConfig.companyName
    },
    "keywords": "real estate, market data, Centennial Hills, Las Vegas, home prices, market trends",
    "variableMeasured": [
      {
        "@type": "PropertyValue",
        "name": "Median Home Price",
        "value": marketData.medianPrice,
        "unitCode": "USD",
        "description": "Current median home price in Centennial Hills"
      },
      {
        "@type": "PropertyValue",
        "name": "Price Change Year Over Year",
        "value": marketData.priceChange,
        "unitCode": "P1",
        "description": "Annual price appreciation percentage"
      },
      {
        "@type": "PropertyValue",
        "name": "Average Days on Market",
        "value": marketData.daysOnMarket,
        "unitCode": "DAY",
        "description": "Average time properties spend on the market"
      },
      {
        "@type": "PropertyValue",
        "name": "Inventory Level",
        "value": marketData.inventoryMonths,
        "unitCode": "MON",
        "description": "Months of housing supply available"
      },
      {
        "@type": "PropertyValue",
        "name": "Price Per Square Foot",
        "value": marketData.pricePerSqFt,
        "unitCode": "USD",
        "description": "Average price per square foot"
      }
    ]
  };
}

function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.baseUrl}/#organization`,
    "name": siteConfig.companyName,
    "alternateName": "Centennial Hills Homes",
    "url": siteConfig.baseUrl,
    "logo": `${siteConfig.baseUrl}/apple-touch-icon.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.phone,
      "contactType": "Customer Service",
      "areaServed": "US",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      ...siteConfig.address
    },
    "sameAs": Object.values(siteConfig.socialProfiles),
    "foundingDate": siteConfig.businessSince,
    "numberOfEmployees": "1-10",
    "slogan": "Your Trusted Real Estate Expert in Centennial Hills"
  };
}

function generateSchemaForPage(pageType, additionalData = {}) {
  const baseSchemas = [
    generateEnhancedRealEstateAgentSchema(),
    generateEnhancedLocalBusinessSchema(),
    generateOrganizationSchema()
  ];

  switch (pageType) {
    case 'home':
      return [
        ...baseSchemas,
        generateEnhancedMarketDataSchema(),
        generateServiceAreaSchema()
      ];
    case 'listings':
      return [
        ...baseSchemas,
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Homes for Sale in Centennial Hills",
          "description": "Current real estate listings in Centennial Hills, Las Vegas",
          "numberOfItems": marketData.activeListings,
          "itemListElement": []
        }
      ];
    case 'market-update':
      return [
        ...baseSchemas,
        generateEnhancedMarketDataSchema()
      ];
    case 'neighborhoods':
      return [
        ...baseSchemas,
        generateServiceAreaSchema()
      ];
    default:
      return baseSchemas;
  }
}

// Export for use in Next.js pages
module.exports = {
  generateSchemaForPage,
  generateEnhancedRealEstateAgentSchema,
  generateEnhancedLocalBusinessSchema,
  generateEnhancedMarketDataSchema,
  generateServiceAreaSchema,
  generateOrganizationSchema,
  siteConfig,
  marketData
};

console.log('Enhanced SEO schema generation script created successfully!');
console.log('Use this in your pages by importing: const { generateSchemaForPage } = require("../scripts/generate-schema");');
