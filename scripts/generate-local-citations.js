const fs = require('node:fs');
const path = require('node:path');

// NAP (Name, Address, Phone) consistency data
const napData = {
  businessName: 'Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®',
  alternateName: 'Dr. Jan Duffy, REALTOR®',
  address: {
    streetAddress: 'Providence Skye Canyon Dr',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89166',
    addressCountry: 'US',
  },
  phone: '(702) 903-1952',
  website: 'https://centennialhillshomesforsale.com',
  email: 'contact@centennialhillshomesforsale.com',
};

// Local citation sources for real estate
const citationSources = [
  {
    name: 'Google Business Profile',
    url: 'https://business.google.com',
    importance: 'Critical',
    status: 'Active',
  },
  {
    name: 'Realtor.com Agent Profile',
    url: 'https://realtor.com',
    importance: 'High',
    status: 'Required',
  },
  {
    name: 'Zillow Agent Profile',
    url: 'https://zillow.com',
    importance: 'High',
    status: 'Required',
  },
  {
    name: 'Yelp Business Listing',
    url: 'https://yelp.com',
    importance: 'Medium',
    status: 'Recommended',
  },
  {
    name: 'Facebook Business Page',
    url: 'https://facebook.com',
    importance: 'Medium',
    status: 'Active',
  },
  {
    name: 'Better Business Bureau',
    url: 'https://bbb.org',
    importance: 'Medium',
    status: 'Recommended',
  },
  {
    name: 'Las Vegas Board of REALTORS®',
    url: 'https://lvrealtors.com',
    importance: 'High',
    status: 'Required',
  },
  {
    name: 'Nevada Real Estate Commission',
    url: 'https://red.nv.gov',
    importance: 'Critical',
    status: 'Required',
  },
];

function generateLocalCitations() {
  const citations = {
    napConsistency: napData,
    sources: citationSources,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: napData.businessName,
      alternateName: napData.alternateName,
      telephone: napData.phone,
      email: napData.email,
      url: napData.website,
      address: {
        '@type': 'PostalAddress',
        ...napData.address,
      },
      sameAs: citationSources
        .filter((source) => source.status === 'Active')
        .map((source) => source.url),
    },
    generatedAt: new Date().toISOString(),
  };

  // Save citation data
  fs.writeFileSync(
    path.join(__dirname, '../public/local-citations.json'),
    JSON.stringify(citations, null, 2)
  );

  console.log('Local citations generated successfully!');
  console.log(`- ${citationSources.length} citation sources identified`);
  console.log(`- NAP consistency data created`);
  console.log('Citations saved to: public/local-citations.json');

  return citations;
}

// Generate citations
generateLocalCitations();

module.exports = { generateLocalCitations, napData, citationSources };
