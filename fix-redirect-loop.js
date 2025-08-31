/**
 * Fix Redirect Loop
 * This script removes problematic Cloudflare page rules that are causing redirect loops
 */

const https = require('https');

// Your Cloudflare credentials
const API_KEY = '006a036208c6527a48175ccf9393d794509e3';
const EMAIL = 'drduffy@bhhsnv.com';
const ZONE_ID = 'ee98107e4df3984ca1593206046598da';

async function fixRedirectLoop() {
  console.log('🔧 Fixing Redirect Loop Issue...\n');

  try {
    // 1. Get all current page rules
    console.log('1️⃣ Getting current page rules...');
    const pageRulesResponse = await makeRequest(`/client/v4/zones/${ZONE_ID}/pagerules`, 'GET');

    if (pageRulesResponse.status === 200 && pageRulesResponse.data.success) {
      const pageRules = pageRulesResponse.data.result;
      console.log(`   📋 Found ${pageRules.length} page rules`);

      // 2. Remove all page rules that could cause redirect loops
      console.log('\n2️⃣ Removing problematic page rules...');
      for (const rule of pageRules) {
        try {
          console.log(
            `   🗑️ Removing rule: ${rule.target} -> ${rule.constraint?.value || 'unknown'}`
          );
          const deleteResponse = await makeRequest(
            `/client/v4/zones/${ZONE_ID}/pagerules/${rule.id}`,
            'DELETE'
          );

          if (deleteResponse.status === 200 && deleteResponse.data.success) {
            console.log(`   ✅ Rule removed successfully`);
          } else {
            console.log(`   ⚠️ Rule removal failed: ${deleteResponse.status}`);
          }
        } catch (error) {
          console.log(`   ⚠️ Error removing rule: ${error.message}`);
        }
      }
    }

    // 3. Clear Cloudflare cache to remove any cached redirects
    console.log('\n3️⃣ Clearing Cloudflare cache...');
    const purgeResponse = await makeRequest(`/client/v4/zones/${ZONE_ID}/purge_cache`, 'POST', {
      purge_everything: true,
    });

    if (purgeResponse.status === 200 && purgeResponse.data.success) {
      console.log('   ✅ Cache cleared successfully');
    } else {
      console.log('   ⚠️ Cache clear failed');
    }

    // 4. Set basic, safe settings
    console.log('\n4️⃣ Setting safe, basic settings...');
    await setSafeSettings();

    console.log('\n🎉 Redirect loop fix completed!');
    console.log('\n📋 Next steps:');
    console.log('   - Wait 2-3 minutes for changes to propagate');
    console.log('   - Clear your browser cookies and cache');
    console.log('   - Try accessing your site again');
    console.log('   - If still having issues, check DNS records in Cloudflare');
  } catch (error) {
    console.error('❌ Error fixing redirect loop:', error.message);
  }
}

async function setSafeSettings() {
  const safeSettings = [
    {
      id: 'ssl',
      value: 'full',
    },
    {
      id: 'cache_level',
      value: 'standard',
    },
    {
      id: 'browser_cache_ttl',
      value: 14400,
    },
    {
      id: 'security_level',
      value: 'medium',
    },
    {
      id: 'min_tls_version',
      value: '1.2',
    },
  ];

  for (const setting of safeSettings) {
    try {
      const response = await makeRequest(
        `/client/v4/zones/${ZONE_ID}/settings/${setting.id}`,
        'PATCH',
        {
          value: setting.value,
        }
      );
      if (response.status === 200 && response.data.success) {
        console.log(`   ✅ Safe setting applied: ${setting.id} = ${setting.value}`);
      }
    } catch (error) {
      console.log(`   ⚠️ Setting update skipped: ${error.message}`);
    }
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
fixRedirectLoop();
