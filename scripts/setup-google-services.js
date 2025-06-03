
const fs = require('fs');
const path = require('path');

// Google Services Configuration
const googleConfig = {
  searchConsole: {
    siteUrl: 'https://centennialhillshomesforsale.com',
    verificationMethods: [
      'HTML file upload',
      'HTML tag',
      'DNS record',
      'Google Analytics',
      'Google Tag Manager'
    ],
    sitemapUrls: [
      'https://centennialhillshomesforsale.com/sitemap.xml',
      'https://centennialhillshomesforsale.com/sitemap-news.xml'
    ]
  },
  analytics: {
    measurementId: 'G-9CKG30GVQR',
    propertyName: 'Centennial Hills Homes',
    industryCategory: 'Real Estate',
    reportingTimeZone: 'America/Los_Angeles',
    currency: 'USD'
  },
  businessProfile: {
    name: 'Dr. Jan Duffy, REALTOR®',
    address: 'Providence Skye Canyon Dr, Las Vegas, NV 89166',
    phone: '(702) 903-1952',
    website: 'https://centennialhillshomesforsale.com',
    category: 'Real Estate Agent',
    serviceAreas: [
      'Centennial Hills, Las Vegas, NV',
      'Providence, Las Vegas, NV',
      'Skye Canyon, Las Vegas, NV',
      'Northwest Las Vegas, NV',
      'Las Vegas, NV 89149',
      'Las Vegas, NV 89166'
    ]
  }
};

// Generate Google Search Console verification file
function generateVerificationFile() {
  const verificationContent = `google-site-verification: google${Date.now()}.html`;
  
  const htmlVerification = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Google Site Verification</title>
</head>
<body>
  <p>Google site verification for Centennial Hills Homes</p>
</body>
</html>`;

  // Save verification file
  fs.writeFileSync(
    path.join(__dirname, '../public/google-site-verification.html'), 
    htmlVerification
  );

  console.log('✅ Google Search Console verification file created');
}

// Generate robots.txt with sitemap references
function generateRobotsTxt() {
  const robotsContent = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${googleConfig.searchConsole.siteUrl}/sitemap.xml
Sitemap: ${googleConfig.searchConsole.siteUrl}/sitemap-news.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Block sensitive areas
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# Allow important real estate pages
Allow: /listings/
Allow: /neighborhoods/
Allow: /centennial-hills/
Allow: /providence-las-vegas/
Allow: /skye-canyon/
`;

  fs.writeFileSync(
    path.join(__dirname, '../public/robots.txt'), 
    robotsContent
  );

  console.log('✅ Enhanced robots.txt created');
}

// Create Google Analytics enhanced tracking
function generateAnalyticsConfig() {
  const analyticsConfig = {
    measurement_id: googleConfig.analytics.measurementId,
    enhanced_ecommerce: true,
    custom_dimensions: {
      property_type: 'custom_dimension_1',
      neighborhood: 'custom_dimension_2',
      price_range: 'custom_dimension_3',
      user_type: 'custom_dimension_4',
      search_query: 'custom_dimension_5'
    },
    custom_events: [
      'property_search',
      'property_view',
      'contact_form_submit',
      'phone_call_click',
      'property_favorite',
      'mortgage_calculator_use',
      'map_interaction'
    ],
    conversion_goals: [
      'contact_form_completion',
      'phone_call_initiated',
      'property_inquiry_sent',
      'newsletter_signup',
      'property_tour_request'
    ]
  };

  fs.writeFileSync(
    path.join(__dirname, '../config/analytics-config.json'), 
    JSON.stringify(analyticsConfig, null, 2)
  );

  console.log('✅ Analytics configuration created');
}

// Generate indexing request for all pages
function generateIndexingRequests() {
  const pages = [
    '',
    '/about',
    '/listings',
    '/contact',
    '/centennial-hills',
    '/providence-las-vegas',
    '/skye-canyon',
    '/neighborhoods',
    '/las-vegas-89149',
    '/las-vegas-89166',
    '/northwest-las-vegas',
    '/market-update',
    '/services',
    '/faq',
    '/testimonials'
  ];

  const indexingRequests = pages.map(page => ({
    url: `${googleConfig.searchConsole.siteUrl}${page}`,
    type: 'URL_UPDATED',
    priority: page === '' ? 'HIGH' : page.includes('listings') ? 'HIGH' : 'MEDIUM'
  }));

  fs.writeFileSync(
    path.join(__dirname, '../config/indexing-requests.json'), 
    JSON.stringify(indexingRequests, null, 2)
  );

  console.log('✅ Indexing requests generated for', pages.length, 'pages');
}

// Create structured data for Google
function generateStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${googleConfig.searchConsole.siteUrl}/#website`,
        "url": googleConfig.searchConsole.siteUrl,
        "name": "Centennial Hills Homes For Sale",
        "description": "Find luxury homes in Centennial Hills, Providence & Skye Canyon with Dr. Jan Duffy, top-rated REALTOR®",
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${googleConfig.searchConsole.siteUrl}/listings?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": `${googleConfig.searchConsole.siteUrl}/#organization`,
        "name": googleConfig.businessProfile.name,
        "url": googleConfig.searchConsole.siteUrl,
        "telephone": googleConfig.businessProfile.phone,
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
          "latitude": 36.268,
          "longitude": -115.328
        },
        "areaServed": googleConfig.businessProfile.serviceAreas.map(area => ({
          "@type": "Place",
          "name": area
        })),
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Real Estate Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "Home Buying Services",
              "description": "Professional assistance for home buyers in Las Vegas"
            },
            {
              "@type": "Offer", 
              "name": "Home Selling Services",
              "description": "Expert home selling services with proven results"
            }
          ]
        }
      }
    ]
  };

  fs.writeFileSync(
    path.join(__dirname, '../public/structured-data.json'), 
    JSON.stringify(structuredData, null, 2)
  );

  console.log('✅ Structured data schema created');
}

// Main setup function
function setupGoogleServices() {
  console.log('🚀 Setting up Google Services for Centennial Hills Homes...\n');

  // Create config directory if it doesn't exist
  const configDir = path.join(__dirname, '../config');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  try {
    generateVerificationFile();
    generateRobotsTxt();
    generateAnalyticsConfig();
    generateIndexingRequests();
    generateStructuredData();

    console.log('\n🎉 Google Services setup completed successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Add your Google Analytics Measurement ID to Secrets: G-9CKG30GVQR');
    console.log('2. Add your Google Search Console verification code to Secrets');
    console.log('3. Submit sitemaps to Google Search Console');
    console.log('4. Request indexing for all pages');
    console.log('5. Set up Google Analytics conversion tracking');

  } catch (error) {
    console.error('❌ Error during setup:', error);
  }
}

// Run setup
setupGoogleServices();

module.exports = {
  googleConfig,
  setupGoogleServices
};
