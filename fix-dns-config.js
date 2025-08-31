/**
 * Fix DNS Configuration
 * This script fixes the DNS records to resolve the redirect loop
 */

const https = require('https');

// Your Cloudflare credentials
const API_KEY = '006a036208c6527a48175ccf9393d794509e3';
const EMAIL = 'drduffy@bhhsnv.com';
const ZONE_ID = 'ee98107e4df3984ca1593206046598da';

async function fixDNSConfig() {
  console.log('🔧 Fixing DNS Configuration...\n');

  try {
    // 1. Get current DNS records
    console.log('1️⃣ Getting current DNS records...');
    const dnsResponse = await makeRequest(`/client/v4/zones/${ZONE_ID}/dns_records`, 'GET');

    if (dnsResponse.status === 200 && dnsResponse.data.success) {
      const records = dnsResponse.data.result;

      // 2. Fix A record to point to Vercel
      console.log('\n2️⃣ Fixing A record...');
      const aRecord = records.find(
        (r) => r.type === 'A' && r.name === 'centennialhillshomesforsale.com'
      );

      if (aRecord) {
        if (aRecord.content !== '76.76.19.34') {
          console.log(`   🔄 Updating A record from ${aRecord.content} to 76.76.19.34 (Vercel)`);

          const updateResponse = await makeRequest(
            `/client/v4/zones/${ZONE_ID}/dns_records/${aRecord.id}`,
            'PUT',
            {
              type: 'A',
              name: 'centennialhillshomesforsale.com',
              content: '76.76.19.34',
              ttl: 1,
              proxied: true,
            }
          );

          if (updateResponse.status === 200 && updateResponse.data.success) {
            console.log('   ✅ A record updated successfully');
          } else {
            console.log('   ❌ Failed to update A record');
          }
        } else {
          console.log('   ✅ A record already points to Vercel');
        }
      } else {
        console.log('   ❌ A record not found - creating new one');

        const createResponse = await makeRequest(
          `/client/v4/zones/${ZONE_ID}/dns_records`,
          'POST',
          {
            type: 'A',
            name: 'centennialhillshomesforsale.com',
            content: '76.76.19.34',
            ttl: 1,
            proxied: true,
          }
        );

        if (createResponse.status === 200 && createResponse.data.success) {
          console.log('   ✅ A record created successfully');
        } else {
          console.log('   ❌ Failed to create A record');
        }
      }

      // 3. Fix CNAME record to prevent redirect loop
      console.log('\n3️⃣ Fixing CNAME record...');
      const wwwRecord = records.find(
        (r) => r.type === 'CNAME' && r.name === 'www.centennialhillshomesforsale.com'
      );

      if (wwwRecord) {
        if (wwwRecord.content === 'centennialhillshomesforsale.com') {
          console.log('   🔄 Updating CNAME to point directly to Vercel');

          const updateResponse = await makeRequest(
            `/client/v4/zones/${ZONE_ID}/dns_records/${wwwRecord.id}`,
            'PUT',
            {
              type: 'CNAME',
              name: 'www.centennialhillshomesforsale.com',
              content: 'cname.vercel-dns.com',
              ttl: 1,
              proxied: true,
            }
          );

          if (updateResponse.status === 200 && updateResponse.data.success) {
            console.log('   ✅ CNAME record updated successfully');
          } else {
            console.log('   ❌ Failed to update CNAME record');
          }
        } else {
          console.log('   ✅ CNAME record already correct');
        }
      }

      // 4. Clear cache again
      console.log('\n4️⃣ Clearing Cloudflare cache...');
      const purgeResponse = await makeRequest(`/client/v4/zones/${ZONE_ID}/purge_cache`, 'POST', {
        purge_everything: true,
      });

      if (purgeResponse.status === 200 && purgeResponse.data.success) {
        console.log('   ✅ Cache cleared successfully');
      } else {
        console.log('   ⚠️ Cache clear failed');
      }
    } else {
      console.log('❌ Failed to get DNS records');
    }

    console.log('\n🎉 DNS configuration fix completed!');
    console.log('\n📋 Next steps:');
    console.log('   - Wait 5-10 minutes for DNS changes to propagate');
    console.log('   - Clear your browser cookies and cache');
    console.log('   - Try accessing your site again');
    console.log('   - Test both www and non-www versions');
  } catch (error) {
    console.error('❌ Error fixing DNS:', error.message);
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

// Run the fix
fixDNSConfig();
