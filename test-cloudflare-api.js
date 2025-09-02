/**
 * Test Cloudflare API Integration
 * This script tests the API endpoints that you can control through Cursor.ai
 */

const https = require('node:https');

// Your Cloudflare credentials
const API_KEY = '006a036208c6527a48175ccf9393d794509e3';
const EMAIL = 'drduffy@bhhsnv.com';
const ZONE_ID = 'ee98107e4df3984ca1593206046598da';

function testAPI() {
  console.log('🧪 Testing Cloudflare API Integration for Cursor.ai Control...\n');

  // Test 1: Get DNS Records
  console.log('1️⃣ Testing DNS Records API...');
  makeRequest(`/client/v4/zones/${ZONE_ID}/dns_records`, 'GET')
    .then((response) => {
      if (response.status === 200 && response.data.success) {
        console.log('✅ DNS Records API working');
        console.log(`   Found ${response.data.result.length} DNS records`);
      } else {
        console.log('❌ DNS Records API failed');
      }
    })
    .catch((error) => console.log('❌ Error:', error.message));

  // Test 2: Get Zone Info
  console.log('\n2️⃣ Testing Zone Info API...');
  makeRequest(`/client/v4/zones/${ZONE_ID}`, 'GET')
    .then((response) => {
      if (response.status === 200 && response.data.success) {
        console.log('✅ Zone Info API working');
        console.log(`   Domain: ${response.data.result.name}`);
      } else {
        console.log('❌ Zone Info API failed');
      }
    })
    .catch((error) => console.log('❌ Error:', error.message));

  // Test 3: Test Cache Purge (dry run)
  console.log('\n3️⃣ Testing Cache Purge API...');
  makeRequest(`/client/v4/zones/${ZONE_ID}/purge_cache`, 'POST', {
    purge_everything: false,
    files: [],
  })
    .then((response) => {
      if (response.status === 200 && response.data.success) {
        console.log('✅ Cache Purge API working');
      } else {
        console.log('❌ Cache Purge API failed');
      }
    })
    .catch((error) => console.log('❌ Error:', error.message));
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

// Run the test
testAPI();
