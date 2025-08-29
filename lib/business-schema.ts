// lib/business-schema.ts
// Comprehensive business schema for Dr. Jan Duffy and Centennial Hills Homes

export const BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': 'https://centennialhillshomesforsale.com/#realestateagent',
  name: 'Dr. Jan Duffy',
  alternateName: 'Centennial Hills Homes for Sale',
  description:
    'Looking for a homes for sale in North Las Vegas, Centennial Hills, or Lone Mountain? 🏠 Dr. Jan Duffy, REALTOR® with Berkshire Hathaway HomeServices, is your trusted expert in luxury and new-build Las Vegas homes. 📍 With 20+ years of experience in master-planned communities, Dr. Duffy specializes in top neighborhoods like Skye Canyon, Providence, Aliante, Centennial Hills, Tule Springs, El Dorado, Lone Mountain, and Summerlin. ⭐ Ranked in the Top 1% of Las Vegas REALTORS®, Dr. Duffy offers expert guidance, same-day showings, and a free market analysis. 📱 Available 24/7, Dr. Duffy provides personalized service to make buying or selling your Las Vegas home easy. 4.9/5 ⭐',
  url: 'https://centennialhillshomesforsale.com/',
  telephone: '(702) 903-1952',
  email: 'jan@centennialhillshomes.com',
  foundingDate: '1993-09-01',
  openingHours: ['Mo-Su 06:00-21:00'],
  specialHours: [
    {
      date: '2025-05-26',
      description: 'Closed',
    },
    {
      date: '2025-07-04',
      description: '4th of July - Closed',
    },
    {
      date: '2025-09-01',
      description: 'Labor Day - Closed',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1490 Center Crossing Rd',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89144',
    addressCountry: 'US',
  },
  areaServed: [
    {
      '@type': 'Place',
      name: 'Lone Mountain, NV, USA',
    },
    {
      '@type': 'Place',
      name: 'North Las Vegas, NV, USA',
    },
    {
      '@type': 'Place',
      name: 'Summerlin South, NV, USA',
    },
    {
      '@type': 'Place',
      name: 'Summerlin, Las Vegas, NV, USA',
    },
    {
      '@type': 'Place',
      name: 'Providence, Las Vegas, NV, USA',
    },
    {
      '@type': 'Place',
      name: 'Kyle Canyon, Las Vegas, NV, USA',
    },
    {
      '@type': 'Place',
      name: 'Tule Springs, Las Vegas, NV, USA',
    },
    {
      '@type': 'Place',
      name: 'Elkhorn, Las Vegas, NV 89131, USA',
    },
    {
      '@type': 'Place',
      name: 'Antelope, Las Vegas, NV 89149, USA',
    },
    {
      '@type': 'Place',
      name: 'Summerlin West, Las Vegas, NV, USA',
    },
    {
      '@type': 'Place',
      name: 'Summerlin North, Las Vegas, NV, USA',
    },
    {
      '@type': 'Place',
      name: 'Centennial Hills, Las Vegas, NV, USA',
    },
    {
      '@type': 'Place',
      name: 'Los Prados, Las Vegas, NV 89130, USA',
    },
    {
      '@type': 'Place',
      name: 'The Springs, Las Vegas, NV 89130, USA',
    },
    {
      '@type': 'Place',
      name: 'Wyeth Ranch, Las Vegas, NV 89131, USA',
    },
    {
      '@type': 'Place',
      name: 'La Madre Foothills, Las Vegas, NV, USA',
    },
    {
      '@type': 'Place',
      name: 'Carmel Canyon, Las Vegas, NV 89131, USA',
    },
    {
      '@type': 'Place',
      name: 'Silverstone Ranch, Las Vegas, NV 89131, USA',
    },
    {
      '@type': 'Place',
      name: 'Iron Mountain Ranch, Las Vegas, NV 89131, USA',
    },
    {
      '@type': 'Place',
      name: 'Lone Mountain Heights, Las Vegas, NV 89129, USA',
    },
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 36.1699,
      longitude: -115.1398,
    },
    geoRadius: '50000',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Las Vegas Luxury Real Estate Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Luxury Home Sales',
          description: 'Expert guidance for selling luxury homes in master-planned communities',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'New Construction Home Sales',
          description: 'Specialized knowledge of new-build homes and developments',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Buyer Representation',
          description: 'Comprehensive buyer services with same-day showings',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Market Analysis',
          description: 'Free market analysis and property valuation',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Investment Property Guidance',
          description: 'Expert advice for real estate investment opportunities',
        },
      },
    ],
  },
  knowsAbout: [
    'Luxury Homes',
    'New Construction Homes',
    'Master-Planned Communities',
    'Centennial Hills Real Estate',
    'Providence Neighborhood',
    'Skye Canyon Development',
    'Summerlin Properties',
    'North Las Vegas Real Estate',
    'Lone Mountain Homes',
    'Tule Springs Development',
    'El Dorado Neighborhood',
    'Aliante Community',
    'Property Valuation',
    'Market Analysis',
    'Real Estate Investment',
    'VA Loans',
    'Conventional Financing',
    'First-Time Buyers',
    'Luxury Home Marketing',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional License',
      name: 'Nevada Real Estate License',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'Top 1% REALTOR®',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'Certified Luxury Home Marketing Specialist',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'Certified Residential Specialist (CRS)',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: "Accredited Buyer's Representative (ABR)",
    },
  ],
  memberOf: [
    {
      '@type': 'Organization',
      name: 'Berkshire Hathaway HomeServices',
    },
    {
      '@type': 'Organization',
      name: 'Greater Las Vegas Association of REALTORS',
    },
    {
      '@type': 'Organization',
      name: 'Nevada Association of REALTORS',
    },
    {
      '@type': 'Organization',
      name: 'National Association of REALTORS®',
    },
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Berkshire Hathaway HomeServices',
    url: 'https://www.berkshirehathawayhs.com/',
  },
  sameAs: [
    'https://www.pinterest.com/DrJanDuffy/',
    'https://www.linkedin.com/company/california-to-vegas-homes',
    'https://www.youtube.com/@DrDuffy',
    'https://www.instagram.com/drjanduffy/',
    'https://www.facebook.com/SummerlinNewHomesBHHS',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '500',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Satisfied Client',
      },
      reviewBody:
        'Dr. Duffy is the best real estate agent in Las Vegas. Her knowledge of the market and dedication to clients is unmatched.',
    },
  ],
  priceRange: '$$$',
  currenciesAccepted: 'USD',
  paymentAccepted: ['Cash', 'Credit Card', 'Check', 'Bank Transfer'],
};

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://centennialhillshomesforsale.com/#organization',
  name: 'Centennial Hills Homes for Sale',
  alternateName: 'Dr. Jan Duffy Real Estate',
  description:
    'Premier real estate agency specializing in luxury homes and master-planned communities throughout the Las Vegas Valley',
  url: 'https://centennialhillshomesforsale.com/',
  logo: 'https://centennialhillshomesforsale.com/logo.png',
  foundingDate: '1993-09-01',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1490 Center Crossing Rd',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89144',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '(702) 903-1952',
    contactType: 'customer service',
    availableLanguage: ['English', 'Spanish'],
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '06:00',
      closes: '21:00',
    },
  },
  sameAs: [
    'https://www.pinterest.com/DrJanDuffy/',
    'https://www.linkedin.com/company/california-to-vegas-homes',
    'https://www.youtube.com/@DrDuffy',
    'https://www.instagram.com/drjanduffy/',
    'https://www.facebook.com/SummerlinNewHomesBHHS',
  ],
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://centennialhillshomesforsale.com/#website',
  name: 'Centennial Hills Homes for Sale',
  description:
    'Your trusted source for luxury homes in Centennial Hills, Las Vegas. Expert real estate services from Dr. Jan Duffy, Top 1% REALTOR®.',
  url: 'https://centennialhillshomesforsale.com',
  publisher: {
    '@type': 'RealEstateAgent',
    '@id': 'https://centennialhillshomesforsale.com/#realestateagent',
    name: 'Dr. Jan Duffy',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://centennialhillshomesforsale.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-US',
  isAccessibleForFree: true,
};

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://centennialhillshomesforsale.com/#localbusiness',
  name: 'Centennial Hills Homes for Sale',
  description:
    'Premier real estate agency serving Centennial Hills and the greater Las Vegas area with luxury homes and expert guidance.',
  url: 'https://centennialhillshomesforsale.com/',
  telephone: '(702) 903-1952',
  email: 'jan@centennialhillshomes.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1490 Center Crossing Rd',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89144',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 36.1699,
    longitude: -115.1398,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '06:00',
      closes: '21:00',
    },
  ],
  priceRange: '$$$',
  currenciesAccepted: 'USD',
  paymentAccepted: ['Cash', 'Credit Card', 'Check', 'Bank Transfer'],
  areaServed: [
    'Centennial Hills, Las Vegas, NV',
    'Providence, Las Vegas, NV',
    'Skye Canyon, Las Vegas, NV',
    'Summerlin, Las Vegas, NV',
    'North Las Vegas, NV',
    'Lone Mountain, NV',
  ],
};

// Helper function to get schema based on page type
export function getPageSchema(pageType: string, additionalData?: any) {
  const baseSchemas = {
    home: [BUSINESS_SCHEMA, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA],
    about: [BUSINESS_SCHEMA, ORGANIZATION_SCHEMA],
    contact: [BUSINESS_SCHEMA, LOCAL_BUSINESS_SCHEMA],
    services: [BUSINESS_SCHEMA, ORGANIZATION_SCHEMA],
    properties: [BUSINESS_SCHEMA, ORGANIZATION_SCHEMA],
    neighborhoods: [BUSINESS_SCHEMA, ORGANIZATION_SCHEMA],
    blog: [BUSINESS_SCHEMA, ORGANIZATION_SCHEMA],
    market: [BUSINESS_SCHEMA, ORGANIZATION_SCHEMA],
  };

  const schemas = baseSchemas[pageType] || [BUSINESS_SCHEMA];

  if (additionalData) {
    return [...schemas, additionalData];
  }

  return schemas;
}
