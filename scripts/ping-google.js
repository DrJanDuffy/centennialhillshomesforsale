const axios = require('axios');

const urls = [
  'https://centennialhillshomesforsale.com/buyers',
  'https://centennialhillshomesforsale.com/blog',
  'https://centennialhillshomesforsale.com/neighborhoods',
  'https://centennialhillshomesforsale.com/properties',
  'https://centennialhillshomesforsale.com/market-data',
  'https://centennialhillshomesforsale.com/area-explorer',
  'https://centennialhillshomesforsale.com/faq-schema',
];

async function pingGoogle() {
  console.log('🚀 Starting Google ping process...\n');

  for (const url of urls) {
    try {
      // First, check if the page is accessible
      const response = await axios.get(url);
      console.log(`✅ Page accessible: ${url} (Status: ${response.status})`);

      // Ping Google about the page
      const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(url)}`;
      await axios.get(pingUrl);
      console.log(`✅ Pinged Google for: ${url}`);
    } catch (error) {
      if (error.response) {
        console.error(`❌ Page error ${error.response.status}: ${url}`);
      } else {
        console.error(`❌ Failed to ping: ${url} - ${error.message}`);
      }
    }
  }

  // Ping Google about the main sitemap
  try {
    const sitemapUrl = 'https://centennialhillshomesforsale.com/sitemap.xml';
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    await axios.get(pingUrl);
    console.log(`\n✅ Pinged Google about updated sitemap: ${sitemapUrl}`);
  } catch (error) {
    console.error(`❌ Failed to ping sitemap: ${error.message}`);
  }

  console.log('\n🎯 Google ping process completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Go to Google Search Console');
  console.log('2. Use URL Inspection tool for each page');
  console.log('3. Request indexing for each URL');
  console.log('4. Submit updated sitemap.xml');
  console.log('5. Monitor 404 errors in Coverage report');
}

// Run the ping process
pingGoogle().catch(console.error);
