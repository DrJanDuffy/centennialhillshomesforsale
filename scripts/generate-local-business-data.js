
const fs = require('fs');
const path = require('path');

const businessData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Dr. Jan Duffy, REALTOR®",
  "alternateName": "Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®",
  "description": "Looking for homes for sale in North Las Vegas, Centennial Hills, or Lone Mountain? Dr. Jan Duffy, REALTOR® with Berkshire Hathaway HomeServices, is your trusted expert in luxury and new-build Las Vegas homes. With 20+ years of experience in master-planned communities.",
  "url": "https://centennialhillshomesforsale.com",
  "telephone": "(702) 903-1952",
  "email": "jan@centennialhillshomes.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Providence Skye Canyon Dr",
    "addressLocality": "Las Vegas",
    "addressRegion": "NV",
    "postalCode": "89166",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "36.268",
    "longitude": "-115.328"
  },
  "openingHours": [
    "Mo-Su 06:00-21:00"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "4"
  },
  "areaServed": [
    {
      "@type": "Place",
      "name": "Centennial Hills, Las Vegas, NV",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "36.268",
        "longitude": "-115.328"
      }
    },
    {
      "@type": "Place", 
      "name": "Providence, Las Vegas, NV",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "36.265",
        "longitude": "-115.310"
      }
    },
    {
      "@type": "Place",
      "name": "Skye Canyon, Las Vegas, NV", 
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "36.257",
        "longitude": "-115.325"
      }
    },
    {
      "@type": "Place",
      "name": "Summerlin, Las Vegas, NV",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "36.150",
        "longitude": "-115.325"
      }
    },
    {
      "@type": "Place",
      "name": "Lone Mountain, Las Vegas, NV",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "36.245",
        "longitude": "-115.295"
      }
    },
    {
      "@type": "Place",
      "name": "Aliante, Las Vegas, NV",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "36.275",
        "longitude": "-115.315"
      }
    }
  ],
  "serviceType": [
    "Real Estate Sales",
    "Real Estate Buying Services", 
    "Real Estate Consultation",
    "Property Valuation",
    "Market Analysis",
    "First-Time Home Buyer Services",
    "Luxury Property Sales",
    "Commercial Property Services",
    "Building Lot Sales"
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
    "Summerlin Real Estate",
    "Las Vegas Luxury Homes",
    "New Construction Homes",
    "Master-Planned Communities",
    "Investment Properties",
    "First-Time Home Buying",
    "Commercial Real Estate"
  ]
};

// Generate NAP (Name, Address, Phone) consistency data
const napData = {
  businessName: "Dr. Jan Duffy, REALTOR®",
  alternateName: "Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®",
  address: "Providence Skye Canyon Dr, Las Vegas, NV 89166",
  phone: "(702) 903-1952",
  website: "https://centennialhillshomesforsale.com",
  consistency: {
    nameVariations: [
      "Dr. Jan Duffy, REALTOR®",
      "Jan Duffy Real Estate",
      "Centennial Hills Homes",
      "Dr. Jan Duffy Berkshire Hathaway"
    ],
    phoneFormats: [
      "(702) 903-1952",
      "702-903-1952", 
      "7029031952",
      "+1-702-903-1952"
    ],
    addressFormats: [
      "Providence Skye Canyon Dr, Las Vegas, NV 89166",
      "Las Vegas, Nevada 89166",
      "North Las Vegas, NV",
      "Centennial Hills, Las Vegas"
    ]
  }
};

// Save business data
fs.writeFileSync(
  path.join(__dirname, '../public/business-data.json'),
  JSON.stringify(businessData, null, 2)
);

// Save NAP data  
fs.writeFileSync(
  path.join(__dirname, '../public/nap-data.json'),
  JSON.stringify(napData, null, 2)
);

console.log('Local business data generated successfully!');
console.log('- business-data.json: Complete structured data');
console.log('- nap-data.json: NAP consistency information');

module.exports = {
  businessData,
  napData
};
