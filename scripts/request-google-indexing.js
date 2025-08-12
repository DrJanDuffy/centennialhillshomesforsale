const _https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');

// Google Indexing API setup
const _INDEXING_API_ENDPOINT = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
const SITE_URL = 'https://centennialhillshomesforsale.com';

// Pages to request indexing for
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
  '/testimonials',
];

async function requestIndexing() {
  console.log('🔍 Requesting Google indexing for all pages...\n');

  const requests = pages.map((page) => {
    const fullUrl = `${SITE_URL}${page}`;

    return {
      url: fullUrl,
      type: 'URL_UPDATED',
    };
  });

  // Save indexing requests for manual submission
  const indexingData = {
    site: SITE_URL,
    timestamp: new Date().toISOString(),
    pages: requests.length,
    requests: requests,
  };

  fs.writeFileSync(
    path.join(__dirname, '../config/indexing-requests.json'),
    JSON.stringify(indexingData, null, 2)
  );

  console.log(`✅ Generated indexing requests for ${requests.length} pages`);
  console.log('📝 Saved to config/indexing-requests.json');
  console.log('\n🔗 Submit these URLs manually in Google Search Console:');

  requests.forEach((req) => {
    console.log(`   - ${req.url}`);
  });

  console.log('\n📋 Google Search Console Manual Steps:');
  console.log('1. Go to https://search.google.com/search-console');
  console.log('2. Select your property: centennialhillshomesforsale.com');
  console.log('3. Go to URL Inspection tool');
  console.log('4. Test each URL and request indexing');
  console.log('5. Submit sitemaps:');
  console.log('   - https://centennialhillshomesforsale.com/sitemap.xml');
  console.log('   - https://centennialhillshomesforsale.com/sitemap-news.xml');
}

// Create sitemap ping requests
function pingSitemaps() {
  const sitemapUrls = [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/sitemap-news.xml`];

  console.log('\n🗺️ Sitemap URLs for Google Search Console:');
  sitemapUrls.forEach((url) => {
    console.log(`   - ${url}`);
  });

  // Generate ping URLs for search engines
  const pingUrls = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrls[0])}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrls[0])}`,
  ];

  console.log('\n📡 Search Engine Ping URLs:');
  pingUrls.forEach((url) => {
    console.log(`   - ${url}`);
  });
}

// Main execution
async function main() {
  try {
    await requestIndexing();
    pingSitemaps();

    console.log('\n🎉 Indexing setup completed!');
    console.log('\n⚡ Quick Actions:');
    console.log('• Add NEXT_PUBLIC_GA_MEASUREMENT_ID=G-9CKG30GVQR to Secrets');
    console.log('• Add Google Search Console verification code to Secrets');
    console.log('• Deploy your site to make it accessible to Google');
    console.log('• Submit sitemaps in Google Search Console');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();
