const axios = require('axios');

// All pages that should be accessible
const pagesToTest = [
  { url: 'https://centennialhillshomesforsale.com/', name: 'Homepage' },
  { url: 'https://centennialhillshomesforsale.com/about', name: 'About' },
  { url: 'https://centennialhillshomesforsale.com/contact', name: 'Contact' },
  { url: 'https://centennialhillshomesforsale.com/properties', name: 'Properties' },
  { url: 'https://centennialhillshomesforsale.com/neighborhoods', name: 'Neighborhoods' },
  { url: 'https://centennialhillshomesforsale.com/market-data', name: 'Market Data' },
  { url: 'https://centennialhillshomesforsale.com/area-explorer', name: 'Area Explorer' },
  { url: 'https://centennialhillshomesforsale.com/buyers', name: 'Buyers Guide' },
  { url: 'https://centennialhillshomesforsale.com/blog', name: 'Blog' },
  { url: 'https://centennialhillshomesforsale.com/faq', name: 'FAQ' },
  { url: 'https://centennialhillshomesforsale.com/faq-schema', name: 'FAQ Schema' },
  { url: 'https://centennialhillshomesforsale.com/services', name: 'Services' },
  { url: 'https://centennialhillshomesforsale.com/testimonials', name: 'Testimonials' },
  { url: 'https://centennialhillshomesforsale.com/listings', name: 'Listings' },
  { url: 'https://centennialhillshomesforsale.com/market-update', name: 'Market Update' },
  { url: 'https://centennialhillshomesforsale.com/featured-home', name: 'Featured Home' },
  { url: 'https://centennialhillshomesforsale.com/centennial-hills', name: 'Centennial Hills' },
  { url: 'https://centennialhillshomesforsale.com/providence-las-vegas', name: 'Providence' },
  { url: 'https://centennialhillshomesforsale.com/skye-canyon', name: 'Skye Canyon' },
  { url: 'https://centennialhillshomesforsale.com/northwest-las-vegas', name: 'Northwest LV' },
  { url: 'https://centennialhillshomesforsale.com/las-vegas-89149', name: 'LV 89149' },
  { url: 'https://centennialhillshomesforsale.com/las-vegas-89166', name: 'LV 89166' },
  {
    url: 'https://centennialhillshomesforsale.com/business-verification',
    name: 'Business Verification',
  },
  {
    url: 'https://centennialhillshomesforsale.com/local-business-optimization',
    name: 'Local Business Opt',
  },
  { url: 'https://centennialhillshomesforsale.com/seo-improvements', name: 'SEO Improvements' },
  { url: 'https://centennialhillshomesforsale.com/taskmaster', name: 'Taskmaster' },
];

// Test redirects
const redirectsToTest = [
  { from: '/buyer', to: '/buyers' },
  { from: '/neighborhood', to: '/neighborhoods' },
  { from: '/blogs', to: '/blog' },
  { from: '/property', to: '/properties' },
  { from: '/market', to: '/market-data' },
  { from: '/explorer', to: '/area-explorer' },
  { from: '/faqs', to: '/faq-schema' },
  { from: '/about-us', to: '/about' },
  { from: '/contact-us', to: '/contact' },
];

// Test search blocking
const searchUrlsToTest = [
  'https://centennialhillshomesforsale.com/search',
  'https://centennialhillshomesforsale.com/search?q=test',
  'https://centennialhillshomesforsale.com/search?q=property',
];

async function testPage(url, name) {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
      validateStatus: (status) => status < 500, // Accept 2xx, 3xx, 4xx but not 5xx
    });

    if (response.status === 200) {
      console.log(`✅ ${name}: ${response.status} - ${url}`);
      return { status: 'success', code: response.status };
    } else if (response.status >= 300 && response.status < 400) {
      console.log(`🔄 ${name}: ${response.status} (Redirect) - ${url}`);
      return { status: 'redirect', code: response.status };
    } else if (response.status === 404) {
      console.log(`❌ ${name}: ${response.status} (404 Error) - ${url}`);
      return { status: 'error', code: response.status };
    } else {
      console.log(`⚠️  ${name}: ${response.status} - ${url}`);
      return { status: 'warning', code: response.status };
    }
  } catch (error) {
    if (error.response) {
      console.log(`❌ ${name}: ${error.response.status} - ${url}`);
      return { status: 'error', code: error.response.status };
    } else {
      console.log(`💥 ${name}: Network Error - ${url}`);
      return { status: 'network_error', code: 0 };
    }
  }
}

async function testRedirect(from, to) {
  try {
    const response = await axios.get(`https://centennialhillshomesforsale.com${from}`, {
      timeout: 10000,
      maxRedirects: 0,
      validateStatus: (status) => status >= 300 && status < 400,
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.location;
      if (location && location.includes(to)) {
        console.log(`✅ Redirect ${from} → ${to}: ${response.status}`);
        return { status: 'success', code: response.status };
      } else {
        console.log(`⚠️  Redirect ${from} → ${location}: ${response.status}`);
        return { status: 'warning', code: response.status };
      }
    } else {
      console.log(`❌ No redirect for ${from}: ${response.status}`);
      return { status: 'error', code: response.status };
    }
  } catch (error) {
    if (error.response && error.response.status >= 300 && error.response.status < 400) {
      const location = error.response.headers.location;
      if (location && location.includes(to)) {
        console.log(`✅ Redirect ${from} → ${to}: ${error.response.status}`);
        return { status: 'success', code: error.response.status };
      } else {
        console.log(`⚠️  Redirect ${from} → ${location}: ${error.response.status}`);
        return { status: 'warning', code: error.response.status };
      }
    } else {
      console.log(`💥 Redirect test failed for ${from}: ${error.message}`);
      return { status: 'network_error', code: 0 };
    }
  }
}

async function testSearchBlocking(url) {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
      maxRedirects: 0,
    });

    if (response.status === 200) {
      console.log(`⚠️  Search URL accessible: ${url} (${response.status})`);
      return { status: 'warning', code: response.status };
    } else if (response.status >= 300 && response.status < 400) {
      console.log(`✅ Search URL redirected: ${url} (${response.status})`);
      return { status: 'success', code: response.status };
    } else {
      console.log(`❌ Search URL error: ${url} (${response.status})`);
      return { status: 'error', code: response.status };
    }
  } catch (error) {
    if (error.response && error.response.status >= 300 && error.response.status < 400) {
      console.log(`✅ Search URL redirected: ${url} (${error.response.status})`);
      return { status: 'success', code: error.response.status };
    } else {
      console.log(`💥 Search URL test failed: ${url}: ${error.message}`);
      return { status: 'network_error', code: 0 };
    }
  }
}

async function runValidation() {
  console.log('🚀 Starting 404 Fix Validation...\n');

  // Test all pages
  console.log('📄 Testing Page Accessibility:');
  console.log('================================');
  const pageResults = [];
  for (const page of pagesToTest) {
    const result = await testPage(page.url, page.name);
    pageResults.push({ ...page, result });
    await new Promise((resolve) => setTimeout(resolve, 500)); // Rate limiting
  }

  console.log('\n🔄 Testing Redirects:');
  console.log('======================');
  const redirectResults = [];
  for (const redirect of redirectsToTest) {
    const result = await testRedirect(redirect.from, redirect.to);
    redirectResults.push({ ...redirect, result });
    await new Promise((resolve) => setTimeout(resolve, 500)); // Rate limiting
  }

  console.log('\n🚫 Testing Search Blocking:');
  console.log('============================');
  const searchResults = [];
  for (const searchUrl of searchUrlsToTest) {
    const result = await testSearchBlocking(searchUrl);
    searchResults.push({ url: searchUrl, result });
    await new Promise((resolve) => setTimeout(resolve, 500)); // Rate limiting
  }

  // Summary
  console.log('\n📊 Validation Summary:');
  console.log('=======================');

  const successfulPages = pageResults.filter((p) => p.result.status === 'success').length;
  const totalPages = pageResults.length;
  console.log(`Pages: ${successfulPages}/${totalPages} successful`);

  const successfulRedirects = redirectResults.filter((r) => r.result.status === 'success').length;
  const totalRedirects = redirectResults.length;
  console.log(`Redirects: ${successfulRedirects}/${totalRedirects} successful`);

  const successfulSearchBlocks = searchResults.filter((s) => s.result.status === 'success').length;
  const totalSearchBlocks = searchResults.length;
  console.log(`Search Blocking: ${successfulSearchBlocks}/${totalSearchBlocks} successful`);

  // Recommendations
  console.log('\n💡 Recommendations:');
  console.log('===================');

  const failedPages = pageResults.filter((p) => p.result.status === 'error');
  if (failedPages.length > 0) {
    console.log('❌ Fix these 404 errors:');
    failedPages.forEach((page) => {
      console.log(`   - ${page.name}: ${page.url}`);
    });
  }

  const failedRedirects = redirectResults.filter((r) => r.result.status === 'error');
  if (failedRedirects.length > 0) {
    console.log('❌ Fix these redirects:');
    failedRedirects.forEach((redirect) => {
      console.log(`   - ${redirect.from} → ${redirect.to}`);
    });
  }

  if (successfulPages === totalPages && successfulRedirects === totalRedirects) {
    console.log('🎉 All tests passed! Your 404 fixes are working correctly.');
    console.log('\n📋 Next steps:');
    console.log('1. Submit updated sitemap.xml to Google Search Console');
    console.log('2. Request indexing for previously 404 pages');
    console.log('3. Monitor Coverage report for improvements');
    console.log('4. Run this validation again in 24-48 hours');
  } else {
    console.log('⚠️  Some issues remain. Please fix them before deploying.');
  }
}

// Run validation
runValidation().catch(console.error);
