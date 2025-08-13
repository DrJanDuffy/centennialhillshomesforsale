const axios = require('axios');

// URLs that need to be re-indexed after fixing redirects
const urlsToReindex = [
  'https://centennialhillshomesforsale.com/',
  'https://centennialhillshomesforsale.com/about',
  'https://centennialhillshomesforsale.com/contact',
  'https://centennialhillshomesforsale.com/listings',
  'https://centennialhillshomesforsale.com/properties',
  'https://centennialhillshomesforsale.com/neighborhoods',
  'https://centennialhillshomesforsale.com/market-data',
  'https://centennialhillshomesforsale.com/area-explorer',
  'https://centennialhillshomesforsale.com/faq-schema'
];

// Test URLs to verify redirects are working
const redirectTestUrls = [
  'http://centennialhillshomesforsale.com/',
  'http://www.centennialhillshomesforsale.com/',
  'https://www.centennialhillshomesforsale.com/'
];

async function testRedirects() {
  console.log('🔍 Testing redirects...\n');
  
  for (const url of redirectTestUrls) {
    try {
      const response = await axios.get(url, {
        maxRedirects: 5,
        validateStatus: (status) => status < 400
      });
      
      const finalUrl = response.request.res.responseUrl || url;
      console.log(`✅ ${url} → ${finalUrl} (${response.status})`);
      
      // Verify it redirects to the canonical HTTPS non-www version
      if (finalUrl.startsWith('https://centennialhillshomesforsale.com/')) {
        console.log(`   ✅ Correctly redirects to canonical URL`);
      } else {
        console.log(`   ❌ Should redirect to canonical URL`);
      }
    } catch (error) {
      console.log(`❌ ${url} - Error: ${error.message}`);
    }
  }
}

async function pingGoogleForReindexing() {
  console.log('\n📡 Pinging Google for re-indexing...\n');
  
  for (const url of urlsToReindex) {
    try {
      // Test if the page is accessible
      const response = await axios.get(url);
      
      if (response.status === 200) {
        console.log(`✅ ${url} - Accessible (${response.status})`);
        
        // Ping Google about this URL
        const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent('https://centennialhillshomesforsale.com/sitemap.xml')}`;
        
        try {
          await axios.get(pingUrl);
          console.log(`   📡 Google ping successful`);
        } catch (pingError) {
          console.log(`   ⚠️  Google ping failed: ${pingError.message}`);
        }
      } else {
        console.log(`❌ ${url} - Status: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${url} - Error: ${error.message}`);
    }
  }
}

async function submitSitemapToGoogle() {
  console.log('\n🗺️  Submitting sitemap to Google...\n');
  
  try {
    // Test sitemap accessibility
    const sitemapUrl = 'https://centennialhillshomesforsale.com/sitemap.xml';
    const response = await axios.get(sitemapUrl);
    
    if (response.status === 200) {
      console.log(`✅ Sitemap accessible: ${sitemapUrl}`);
      
      // Submit sitemap to Google
      const submitUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
      
              try {
          await axios.get(submitUrl);
          console.log(`✅ Sitemap submitted to Google successfully`);
        } catch (submitError) {
        console.log(`❌ Failed to submit sitemap: ${submitError.message}`);
      }
    } else {
      console.log(`❌ Sitemap not accessible: ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ Error accessing sitemap: ${error.message}`);
  }
}

async function generateGoogleSearchConsoleActions() {
  console.log('\n📋 Google Search Console Actions Required:\n');
  
  console.log('1. URL Inspection Tool:');
  urlsToReindex.forEach(url => {
    console.log(`   - Inspect: ${url}`);
  });
  
  console.log('\n2. Request Indexing:');
  urlsToReindex.forEach(url => {
    console.log(`   - Request indexing for: ${url}`);
  });
  
  console.log('\n3. Sitemap Submission:');
  console.log('   - Submit: https://centennialhillshomesforsale.com/sitemap.xml');
  
  console.log('\n4. Monitor Redirects:');
  redirectTestUrls.forEach(url => {
    console.log(`   - Verify redirect from: ${url}`);
  });
}

async function main() {
  console.log('🚀 Google Search Console Indexing Fix Script\n');
  console.log('This script will help fix the indexing issues identified in Google Search Console.\n');
  
  try {
    // Test redirects
    await testRedirects();
    
    // Test page accessibility
    await pingGoogleForReindexing();
    
    // Submit sitemap
    await submitSitemapToGoogle();
    
    // Generate manual actions
    await generateGoogleSearchConsoleActions();
    
    console.log('\n✅ Script completed successfully!');
    console.log('\n📝 Next Steps:');
    console.log('1. Wait for Vercel deployment to complete');
    console.log('2. Test redirects manually in browser');
    console.log('3. Use Google Search Console URL Inspection Tool');
    console.log('4. Request indexing for affected pages');
    console.log('5. Submit updated sitemap');
    console.log('6. Monitor indexing status over next few days');
    
  } catch (error) {
    console.error('\n❌ Script failed:', error.message);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  testRedirects,
  pingGoogleForReindexing,
  submitSitemapToGoogle,
  generateGoogleSearchConsoleActions
};
