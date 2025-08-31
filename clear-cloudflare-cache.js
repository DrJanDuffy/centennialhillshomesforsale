/**
 * Clear Cloudflare Cache
 * This script clears the Cloudflare cache for your domain
 */

const https = require('https');

// Your Cloudflare credentials
const API_KEY = '006a036208c6527a48175ccf9393d794509e3';
const EMAIL = 'drduffy@bhhsnv.com';
const ZONE_ID = 'ee98107e4df3984ca1593206046598da';

async function clearCloudflareCache() {
  console.log('🧹 Clearing Cloudflare Cache...\n');

  try {
    // Clear entire cache
    console.log('1️⃣ Clearing entire Cloudflare cache...');
    const purgeResponse = await makeRequest(`/client/v4/zones/${ZONE_ID}/purge_cache`, 'POST', {
      purge_everything: true,
    });

    if (purgeResponse.status === 200 && purgeResponse.data.success) {
      console.log('✅ Cache cleared successfully!');
      console.log('   Response:', purgeResponse.data.result);
    } else {
      console.log('❌ Cache clear failed');
      console.log('   Status:', purgeResponse.status);
      console.log('   Response:', purgeResponse.data);
    }

    // Get zone info to confirm
    console.log('\n2️⃣ Verifying zone status...');
    const zoneResponse = await makeRequest(`/client/v4/zones/${ZONE_ID}`, 'GET');

    if (zoneResponse.status === 200 && zoneResponse.data.success) {
      console.log('✅ Zone verified');
      console.log(`   Domain: ${zoneResponse.data.result.name}`);
      console.log(`   Status: ${zoneResponse.data.result.status}`);
    }

    console.log('\n🎉 Cloudflare cache clear operation completed!');
  } catch (error) {
    console.error('❌ Error clearing cache:', error.message);
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
          reject(new Error(`Failed to parse response: ${error.message}`));
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

// Run the cache clear
clearCloudflareCache();
