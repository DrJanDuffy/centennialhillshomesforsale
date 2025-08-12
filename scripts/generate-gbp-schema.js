const fs = require('node:fs');
const path = require('node:path');

// Google Business Profile Schema for Local SEO
const generateGoogleBusinessSchema = () => {
  const gbpSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': 'https://centennialhillshomesforsale.com/#realestate-agent',
    name: 'Dr. Jan Duffy, REALTOR®',
    alternateName: 'Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®',
    description:
      'Looking for homes for sale in North Las Vegas, Centennial Hills, or Lone Mountain? Dr. Jan Duffy, REALTOR® with Berkshire Hathaway HomeServices, is your trusted expert in luxury and new-build Las Vegas homes. With 20+ years of experience in master-planned communities, specializing in Skye Canyon, Providence, Aliante, Centennial Hills, Tule Springs, El Dorado, Lone Mountain, and Summerlin.',
    url: 'https://centennialhillshomesforsale.com',
    telephone: '(702) 903-1952',
    email: 'contact@centennialhillshomesforsale.com',
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
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '06:00',
      closes: '21:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
    },
    foundingDate: '1993-09-01',
    priceRange: '$300,000 - $5,000,000',
    currenciesAccepted: 'USD',
    paymentAccepted: ['Cash', 'Check', 'Credit Card'],
    serviceType: [
      'Building lot sales',
      'Buying agent services',
      'Commercial property buying & sales',
      'First-time home buyer services',
      'Luxury property buying & sales',
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'North Las Vegas',
        addressRegion: 'NV',
      },
      {
        '@type': 'Neighborhood',
        name: 'Centennial Hills',
        addressRegion: 'NV',
      },
      {
        '@type': 'Neighborhood',
        name: 'Lone Mountain',
        addressRegion: 'NV',
      },
      {
        '@type': 'Neighborhood',
        name: 'Skye Canyon',
        addressRegion: 'NV',
      },
      {
        '@type': 'Neighborhood',
        name: 'Providence',
        addressRegion: 'NV',
      },
      {
        '@type': 'Neighborhood',
        name: 'Aliante',
        addressRegion: 'NV',
      },
      {
        '@type': 'Neighborhood',
        name: 'Summerlin',
        addressRegion: 'NV',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Real Estate Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Luxury Property Sales',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'First-time Home Buyer Services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Commercial Property Services',
          },
        },
      ],
    },
    sameAs: [
      'https://www.pinterest.com/DrJanDuffy/',
      'https://www.linkedin.com/company/california-to-vegas-homes',
      'https://www.youtube.com/@DrDuffy',
      'https://www.searchforhomeslasvegas.com/',
    ],
    knowsAbout: [
      'Las Vegas Real Estate Market',
      'Master-Planned Communities',
      'Luxury Home Sales',
      'New Construction',
      'Investment Properties',
      'Relocation Services',
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'Berkshire Hathaway HomeServices',
    },
  };

  // Write the schema to public directory
  fs.writeFileSync(
    path.join(__dirname, '../public/gbp-schema.json'),
    JSON.stringify(gbpSchema, null, 2)
  );

  console.log('Google Business Profile schema generated successfully!');
  console.log('Schema saved to: public/gbp-schema.json');
};

// Generate the schema
generateGoogleBusinessSchema();

module.exports = { generateGoogleBusinessSchema };
