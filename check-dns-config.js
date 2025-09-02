/**
 * Check DNS Configuration
 * This script checks DNS records to ensure they're properly configured for Vercel
 */

const https = require('node:https');

// Your Cloudflare credentials
const API_KEY = '006a036208c6527a48175ccf9393d794509e3';
const EMAIL = 'drduffy@bhhsnv.com';
const ZONE_ID = 'ee98107e4df3984ca1593206046598da';

async function checkDNSConfig() {
  console.log('🔍 Checking DNS Configuration...\n');

  try {
    // Get all DNS records
    const dnsResponse = await makeRequest(`/client/v4/zones/${ZONE_ID}/dns_records`, 'GET');

    if (dnsResponse.status === 200 && dnsResponse.data.success) {
      const records = dnsResponse.data.result;
      console.log(`📋 Found ${records.length} DNS records:\n`);

      for (const record of records) {
        console.log(`   ${record.type} | ${record.name} | ${record.content}`);

        // Check for potential issues
        if (record.type === 'A' && record.name === 'centennialhillshomesforsale.com') {
          if (record.content.includes('76.76.19.34')) {
            console.log(`   ✅ A record correctly points to Vercel`);
          } else {
            console.log(`   ⚠️ A record may not point to Vercel`);
          }
        }

        if (record.type === 'CNAME' && record.name === 'www.centennialhillshomesforsale.com') {
          if (record.content === 'centennialhillshomesforsale.com') {
            console.log(`   ✅ CNAME record correctly points to main domain`);
          } else {
            console.log(`   ⚠️ CNAME record may cause redirect loop`);
          }
        }
      }

      // Check for common redirect loop causes
      console.log('\n🔍 Checking for redirect loop causes...');

      const aRecord = records.find(
        (r) => r.type === 'A' && r.name === 'centennialhillshomesforsale.com'
      );
      const wwwRecord = records.find(
        (r) => r.type === 'CNAME' && r.name === 'www.centennialhillshomesforsale.com'
      );

      if (!aRecord) {
        console.log('   ❌ Missing A record for main domain');
        console.log('   💡 You need an A record pointing to Vercel');
      }

      if (wwwRecord && wwwRecord.content === 'centennialhillshomesforsale.com') {
        console.log('   ⚠️ CNAME record points to main domain - this can cause redirect loops');
        console.log('   💡 Consider changing to point directly to Vercel or remove it');
      }

      // Check for conflicting records
      const conflictingRecords = records.filter(
        (r) => r.name === 'centennialhillshomesforsale.com' && r.type !== 'A'
      );

      if (conflictingRecords.length > 0) {
        console.log('   ⚠️ Found conflicting records for main domain:');
        conflictingRecords.forEach((r) => {
          console.log(`      ${r.type}: ${r.content}`);
        });
      }
    } else {
      console.log('❌ Failed to get DNS records');
    }

    console.log('\n📋 Recommendations:');
    console.log('   1. Ensure A record points to Vercel (76.76.19.34)');
    console.log('   2. Remove or fix CNAME record for www subdomain');
    console.log('   3. Remove any conflicting records');
    console.log('   4. Wait 5-10 minutes for DNS changes to propagate');
  } catch (error) {
    console.error('❌ Error checking DNS:', error.message);
  }
}

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.cloudflare.com',
      path: path,
      method: method,
      headers: {
        'X-Auth-Key': API_KEY,
        'X-Auth-Email': EMAIL,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: response });
        } catch (error) {
          resolve({ status: res.statusCode, data: { success: false, error: error.message } });
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Run the check
checkDNSConfig();
