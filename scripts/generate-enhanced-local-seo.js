const fs = require('node:fs');
const path = require('node:path');

const enhancedBusinessData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'RealEstateAgent',
      '@id': 'https://centennialhillshomesforsale.com/#realestateagent',
      name: 'Dr. Jan Duffy, REALTOR®',
      alternateName: 'Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®',
      description:
        'Looking for homes for sale in North Las Vegas, Centennial Hills, or Lone Mountain? Dr. Jan Duffy, REALTOR® with Berkshire Hathaway HomeServices, is your trusted expert in luxury and new-build Las Vegas homes. With 20+ years of experience in master-planned communities.',
      url: 'https://centennialhillshomesforsale.com',
      telephone: '(702) 903-1952',
      email: 'jan@centennialhillshomes.com',
      foundingDate: '1993-09-01',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Providence Skye Canyon Dr',
        addressLocality: 'Las Vegas',
        addressRegion: 'NV',
        postalCode: '89166',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '36.268',
        longitude: '-115.328',
      },
      openingHours: ['Mo-Su 06:00-21:00'],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127',
        bestRating: '5',
        worstRating: '4',
      },
      areaServed: [
        {
          '@type': 'Place',
          name: 'Centennial Hills, Las Vegas, NV',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '36.268',
            longitude: '-115.328',
          },
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: 'Las Vegas, Nevada',
          },
        },
        {
          '@type': 'Place',
          name: 'Providence, Las Vegas, NV',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '36.265',
            longitude: '-115.310',
          },
        },
        {
          '@type': 'Place',
          name: 'Skye Canyon, Las Vegas, NV',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '36.257',
            longitude: '-115.325',
          },
        },
      ],
      serviceType: [
        'Real Estate Sales',
        'Real Estate Buying Services',
        'Real Estate Consultation',
        'Property Valuation',
        'Market Analysis',
        'First-Time Home Buyer Services',
        'Luxury Property Sales',
        'Commercial Property Services',
        'Building Lot Sales',
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Professional License',
          name: 'Nevada Real Estate License',
        },
      ],
      memberOf: [
        {
          '@type': 'Organization',
          name: 'Las Vegas Board of REALTORS®',
        },
        {
          '@type': 'Organization',
          name: 'National Association of REALTORS®',
        },
      ],
      affiliation: {
        '@type': 'Organization',
        name: 'Berkshire Hathaway HomeServices',
        url: 'https://www.bhhsnv.com',
      },
      sameAs: [
        'https://g.co/kgs/4qQ8DsY',
        'https://www.facebook.com/centennialhillshomes',
        'https://www.instagram.com/drjanduffy_realtor',
        'https://www.linkedin.com/company/california-to-vegas-homes',
      ],
      priceRange: '$300,000 - $5,000,000',
      paymentAccepted: 'Cash, Check, Credit Card, Bank Transfer',
      currenciesAccepted: 'USD',
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://centennialhillshomesforsale.com/#localbusiness',
      name: 'Centennial Hills Homes | Providence & Skye Canyon',
      description: 'Premier real estate services in Centennial Hills with local market expertise',
      url: 'https://centennialhillshomesforsale.com',
      telephone: '(702) 903-1952',
      email: 'jan@centennialhillshomes.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Providence Skye Canyon Dr',
        addressLocality: 'Las Vegas',
        addressRegion: 'NV',
        postalCode: '89166',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '36.268',
        longitude: '-115.328',
      },
      openingHours: ['Mo-Su 06:00-21:00'],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127',
        bestRating: '5',
      },
      hasMap: 'https://www.google.com/maps/place/Providence+Skye+Canyon+Dr,+Las+Vegas,+NV+89166',
      isAccessibleForFree: true,
      smokingAllowed: false,
    },
    {
      '@type': 'Organization',
      '@id': 'https://centennialhillshomesforsale.com/#organization',
      name: 'Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®',
      url: 'https://centennialhillshomesforsale.com',
      logo: 'https://centennialhillshomesforsale.com/apple-touch-icon.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '(702) 903-1952',
        contactType: 'Customer Service',
        areaServed: 'US',
        availableLanguage: 'English',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Providence Skye Canyon Dr',
        addressLocality: 'Las Vegas',
        addressRegion: 'NV',
        postalCode: '89166',
        addressCountry: 'US',
      },
      foundingDate: '1993-09-01',
      slogan: 'Your Trusted Real Estate Expert in Centennial Hills',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://centennialhillshomesforsale.com/#website',
      url: 'https://centennialhillshomesforsale.com',
      name: 'Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®',
      description:
        'Find homes for sale in Centennial Hills, Providence, and Skye Canyon. Expert real estate services by Dr. Jan Duffy, REALTOR®',
      publisher: {
        '@id': 'https://centennialhillshomesforsale.com/#organization',
      },
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate:
              'https://centennialhillshomesforsale.com/listings?search={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://centennialhillshomesforsale.com/#breadcrumbs',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://centennialhillshomesforsale.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Neighborhoods',
          item: 'https://centennialhillshomesforsale.com/neighborhoods',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Listings',
          item: 'https://centennialhillshomesforsale.com/listings',
        },
      ],
    },
  ],
};

const localCitationData = {
  napConsistency: {
    businessName: 'Dr. Jan Duffy, REALTOR®',
    alternateName: 'Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®',
    address: 'Providence Skye Canyon Dr, Las Vegas, NV 89166',
    phone: '(702) 903-1952',
    website: 'https://centennialhillshomesforsale.com',
  },
  citationSources: [
    {
      platform: 'Google My Business',
      url: 'https://g.co/kgs/4qQ8DsY',
      status: 'Active',
      category: 'Real Estate Agent',
    },
    {
      platform: 'Yelp',
      url: 'https://www.yelp.com/biz/dr-jan-duffy-realtor-las-vegas',
      status: 'Pending',
      category: 'Real Estate Services',
    },
    {
      platform: 'Better Business Bureau',
      url: 'https://www.bbb.org/us/nv/las-vegas/profile/real-estate-agents/dr-jan-duffy-realtor',
      status: 'Pending',
      category: 'Real Estate Agent',
    },
    {
      platform: 'Zillow',
      url: 'https://www.zillow.com/profile/drjanduffy',
      status: 'Active',
      category: 'Real Estate Professional',
    },
    {
      platform: 'Realtor.com',
      url: 'https://www.realtor.com/realestateagents/dr-jan-duffy',
      status: 'Active',
      category: 'REALTOR®',
    },
  ],
};

// Save enhanced business data
fs.writeFileSync(
  path.join(__dirname, '../public/enhanced-business-schema.json'),
  JSON.stringify(enhancedBusinessData, null, 2)
);

// Save local citation data
fs.writeFileSync(
  path.join(__dirname, '../public/local-citations-enhanced.json'),
  JSON.stringify(localCitationData, null, 2)
);

console.log('✅ Enhanced local SEO schemas generated successfully!');
console.log('📄 Files created:');
console.log('   • enhanced-business-schema.json');
console.log('   • local-citations-enhanced.json');

module.exports = {
  enhancedBusinessData,
  localCitationData,
};
