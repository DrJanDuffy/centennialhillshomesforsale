const fs = require('node:fs');
const path = require('node:path');

// Comprehensive service areas with detailed information
const serviceAreas = [
  {
    name: 'Centennial Hills',
    type: 'Neighborhood',
    state: 'Nevada',
    zipCodes: ['89149', '89143'],
    population: '25,000+',
    medianHomePrice: '$635,000',
    schoolDistrict: 'Clark County School District',
    coordinates: { lat: '36.268', lng: '-115.328' },
    description: 'Master-planned community with luxury homes and family amenities',
  },
  {
    name: 'Providence',
    type: 'Neighborhood',
    state: 'Nevada',
    zipCodes: ['89166'],
    population: '15,000+',
    medianHomePrice: '$580,000',
    schoolDistrict: 'Clark County School District',
    coordinates: { lat: '36.275', lng: '-115.335' },
    description: 'Upscale community with new construction and modern amenities',
  },
  {
    name: 'Skye Canyon',
    type: 'Neighborhood',
    state: 'Nevada',
    zipCodes: ['89166', '89131'],
    population: '20,000+',
    medianHomePrice: '$595,000',
    schoolDistrict: 'Clark County School District',
    coordinates: { lat: '36.285', lng: '-115.325' },
    description: 'Growing community with hiking trails and outdoor recreation',
  },
  {
    name: 'Summerlin',
    type: 'Neighborhood',
    state: 'Nevada',
    zipCodes: ['89135', '89144', '89145'],
    population: '100,000+',
    medianHomePrice: '$750,000',
    schoolDistrict: 'Clark County School District',
    coordinates: { lat: '36.195', lng: '-115.325' },
    description: 'Premier master-planned community with golf courses and shopping',
  },
  {
    name: 'Lone Mountain',
    type: 'Neighborhood',
    state: 'Nevada',
    zipCodes: ['89149', '89131'],
    population: '18,000+',
    medianHomePrice: '$520,000',
    schoolDistrict: 'Clark County School District',
    coordinates: { lat: '36.255', lng: '-115.295' },
    description: 'Established community with mature landscaping and mountain views',
  },
  {
    name: 'Aliante',
    type: 'Neighborhood',
    state: 'Nevada',
    zipCodes: ['89084', '89131'],
    population: '35,000+',
    medianHomePrice: '$485,000',
    schoolDistrict: 'Clark County School District',
    coordinates: { lat: '36.285', lng: '-115.245' },
    description: 'Family-friendly community with parks and recreational facilities',
  },
];

function generateServiceAreaSchema() {
  const serviceAreaSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Dr. Jan Duffy, REALTOR®',
    serviceArea: serviceAreas.map((area) => ({
      '@type': area.type,
      name: area.name,
      addressRegion: area.state,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: area.coordinates.lat,
        longitude: area.coordinates.lng,
      },
      description: area.description,
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Median Home Price',
          value: area.medianHomePrice,
        },
        {
          '@type': 'PropertyValue',
          name: 'Population',
          value: area.population,
        },
        {
          '@type': 'PropertyValue',
          name: 'School District',
          value: area.schoolDistrict,
        },
        {
          '@type': 'PropertyValue',
          name: 'ZIP Codes',
          value: area.zipCodes.join(', '),
        },
      ],
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Real Estate Services by Location',
      itemListElement: serviceAreas.map((area) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `Real Estate Services in ${area.name}`,
          description: `Comprehensive real estate services including buying, selling, and market analysis in ${area.name}, ${area.state}`,
        },
        areaServed: {
          '@type': area.type,
          name: area.name,
          addressRegion: area.state,
        },
      })),
    },
  };

  // Save service area schema
  fs.writeFileSync(
    path.join(__dirname, '../public/service-area-schema.json'),
    JSON.stringify(serviceAreaSchema, null, 2)
  );

  console.log('Service area schema generated successfully!');
  console.log(`- ${serviceAreas.length} service areas structured`);
  console.log('Schema saved to: public/service-area-schema.json');

  return serviceAreaSchema;
}

// Generate service area schema
generateServiceAreaSchema();

module.exports = { generateServiceAreaSchema, serviceAreas };
