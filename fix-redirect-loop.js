#!/usr/bin/env node

/**
 * Redirect Loop Fix Script
 * This script helps diagnose and fix redirect loop issues
 */

const dns = require('node:dns').promises;
const https = require('node:https');
const http = require('node:http');

const DOMAIN = 'centennialhillshomesforsale.com';
const WWW_DOMAIN = `www.${DOMAIN}`;

async function checkDNS() {
  console.log('🔍 Checking DNS configuration...\n');

  try {
    // Check A records
    const aRecords = await dns.resolve4(DOMAIN);
    console.log(`✅ A records for ${DOMAIN}:`, aRecords);

    const wwwARecords = await dns.resolve4(WWW_DOMAIN);
    console.log(`✅ A records for ${WWW_DOMAIN}:`, wwwARecords);

    // Check CNAME records
    try {
      const cnameRecords = await dns.resolveCname(WWW_DOMAIN);
      console.log(`✅ CNAME records for ${WWW_DOMAIN}:`, cnameRecords);
    } catch (_error) {
      console.log(`ℹ️  No CNAME records for ${WWW_DOMAIN}`);
    }
  } catch (error) {
    console.error('❌ DNS resolution error:', error.message);
  }
}

async function testRedirects() {
  console.log('\n🔍 Testing redirects...\n');

  const testUrls = [
    `https://${DOMAIN}`,
    `https://${WWW_DOMAIN}`,
    `http://${DOMAIN}`,
    `http://${WWW_DOMAIN}`,
  ];

  for (const url of testUrls) {
    try {
      await new Promise((resolve, _reject) => {
        const client = url.startsWith('https') ? https : http;
        const req = client.get(
          url,
          {
            timeout: 10000,
            followRedirect: false,
          },
          (res) => {
            console.log(`${url}: ${res.statusCode} ${res.statusMessage}`);
            if (res.headers.location) {
              console.log(`  → Redirects to: ${res.headers.location}`);
            }
            resolve();
          }
        );

        req.on('error', (error) => {
          console.log(`${url}: ❌ Error - ${error.message}`);
          resolve();
        });

        req.on('timeout', () => {
          console.log(`${url}: ⏰ Timeout`);
          req.destroy();
          resolve();
        });
      });
    } catch (error) {
      console.log(`${url}: ❌ Failed - ${error.message}`);
    }
  }
}

function provideRecommendations() {
  console.log('\n📋 Recommendations to fix redirect loops:\n');

  console.log('1. ✅ REMOVED www redirect from middleware.js');
  console.log('2. ✅ ADDED www redirect rule to vercel.json');
  console.log('3. 🔄 Deploy changes to Vercel');
  console.log('4. 🧹 Clear browser cache and cookies');
  console.log('5. 🔍 Test with incognito/private browsing');

  console.log('\n📝 Additional steps if issue persists:');
  console.log('- Check Vercel dashboard for domain configuration');
  console.log('- Verify DNS settings in your domain registrar');
  console.log('- Ensure no conflicting redirects in Cloudflare (if using)');
  console.log('- Check for any CDN redirect rules');

  console.log('\n🚀 To deploy the fix:');
  console.log('git add .');
  console.log('git commit -m "Fix redirect loop by removing www redirect from middleware"');
  console.log('git push origin main');
}

async function main() {
  console.log('🔄 Redirect Loop Diagnostic Tool\n');
  console.log('Domain:', DOMAIN);
  console.log('WWW Domain:', WWW_DOMAIN);
  console.log('='.repeat(50));

  await checkDNS();
  await testRedirects();
  provideRecommendations();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkDNS, testRedirects, provideRecommendations };
