/**
 * Improve Cloudflare Setup
 * This script optimizes your Cloudflare configuration for better performance, security, and SEO
 */

const https = require('https');

// Your Cloudflare credentials
const API_KEY = '006a036208c6527a48175ccf9393d794509e3';
const EMAIL = 'drduffy@bhhsnv.com';
const ZONE_ID = 'ee98107e4df3984ca1593206046598da';

async function improveCloudflareSetup() {
  console.log('🚀 Improving Cloudflare Setup for Centennial Hills Homes...\n');

  try {
    // 1. Get current zone settings
    console.log('1️⃣ Getting current zone settings...');
    const zoneResponse = await makeRequest(`/client/v4/zones/${ZONE_ID}`, 'GET');

    if (zoneResponse.status === 200 && zoneResponse.data.success) {
      console.log('✅ Zone info retrieved');
      console.log(`   Domain: ${zoneResponse.data.result.name}`);
      console.log(`   Status: ${zoneResponse.data.result.status}`);
      console.log(`   Plan: ${zoneResponse.data.result.plan.name}`);
    }

    // 2. Optimize Page Rules for better performance
    console.log('\n2️⃣ Setting up Page Rules for performance...');
    await setupPageRules();

    // 3. Configure Security Settings
    console.log('\n3️⃣ Configuring security settings...');
    await configureSecuritySettings();

    // 4. Set up Caching Rules
    console.log('\n4️⃣ Setting up caching rules...');
    await setupCachingRules();

    // 5. Configure SSL/TLS Settings
    console.log('\n5️⃣ Configuring SSL/TLS...');
    await configureSSLTLS();

    // 6. Set up Speed Optimizations
    console.log('\n6️⃣ Setting up speed optimizations...');
    await setupSpeedOptimizations();

    // 7. Configure DNS Records for better performance
    console.log('\n7️⃣ Optimizing DNS records...');
    await optimizeDNSRecords();

    console.log('\n🎉 Cloudflare setup improvement completed!');
    console.log('\n📋 Next steps:');
    console.log('   - Wait 5-10 minutes for changes to propagate');
    console.log('   - Test your site performance');
    console.log('   - Monitor analytics in Cloudflare dashboard');
  } catch (error) {
    console.error('❌ Error improving setup:', error.message);
  }
}

async function setupPageRules() {
  const pageRules = [
    {
      priority: 1,
      status: 'active',
      target: 'url',
      constraint: {
        operator: 'matches',
        value: 'centennialhillshomesforsale.com/*',
      },
      actions: [
        {
          id: 'always_online',
          value: 'on',
        },
        {
          id: 'browser_check',
          value: 'on',
        },
        {
          id: 'security_level',
          value: 'medium',
        },
        {
          id: 'ssl',
          value: 'full',
        },
        {
          id: 'cache_level',
          value: 'aggressive',
        },
        {
          id: 'edge_cache_ttl',
          value: 14400,
        },
      ],
    },
    {
      priority: 2,
      status: 'active',
      target: 'url',
      constraint: {
        operator: 'matches',
        value: 'centennialhillshomesforsale.com/api/*',
      },
      actions: [
        {
          id: 'cache_level',
          value: 'bypass',
        },
        {
          id: 'edge_cache_ttl',
          value: 0,
        },
      ],
    },
    {
      priority: 3,
      status: 'active',
      target: 'url',
      constraint: {
        operator: 'matches',
        value: 'centennialhillshomesforsale.com/_next/*',
      },
      actions: [
        {
          id: 'cache_level',
          value: 'aggressive',
        },
        {
          id: 'edge_cache_ttl',
          value: 31536000,
        },
        {
          id: 'browser_cache_ttl',
          value: 31536000,
        },
      ],
    },
  ];

  for (const rule of pageRules) {
    try {
      const response = await makeRequest(`/client/v4/zones/${ZONE_ID}/pagerules`, 'POST', rule);
      if (response.status === 200 && response.data.success) {
        console.log(`   ✅ Page rule created for: ${rule.constraint.value}`);
      }
    } catch (error) {
      console.log(`   ⚠️ Page rule creation skipped: ${error.message}`);
    }
  }
}

async function configureSecuritySettings() {
  const securitySettings = [
    {
      id: 'security_level',
      value: 'medium',
    },
    {
      id: 'challenge_ttl',
      value: 1800,
    },
    {
      id: 'browser_check',
      value: 'on',
    },
    {
      id: 'min_tls_version',
      value: '1.2',
    },
    {
      id: 'opportunistic_encryption',
      value: 'on',
    },
    {
      id: 'tls_1_3',
      value: 'on',
    },
    {
      id: 'automatic_https_rewrites',
      value: 'on',
    },
  ];

  for (const setting of securitySettings) {
    try {
      const response = await makeRequest(
        `/client/v4/zones/${ZONE_ID}/settings/${setting.id}`,
        'PATCH',
        {
          value: setting.value,
        }
      );
      if (response.status === 200 && response.data.success) {
        console.log(`   ✅ Security setting updated: ${setting.id} = ${setting.value}`);
      }
    } catch (error) {
      console.log(`   ⚠️ Security setting update skipped: ${error.message}`);
    }
  }
}

async function setupCachingRules() {
  const cacheSettings = [
    {
      id: 'cache_level',
      value: 'aggressive',
    },
    {
      id: 'browser_cache_ttl',
      value: 14400,
    },
    {
      id: 'always_online',
      value: 'on',
    },
    {
      id: 'development_mode',
      value: 'off',
    },
  ];

  for (const setting of cacheSettings) {
    try {
      const response = await makeRequest(
        `/client/v4/zones/${ZONE_ID}/settings/${setting.id}`,
        'PATCH',
        {
          value: setting.value,
        }
      );
      if (response.status === 200 && response.data.success) {
        console.log(`   ✅ Cache setting updated: ${setting.id} = ${setting.value}`);
      }
    } catch (error) {
      console.log(`   ⚠️ Cache setting update skipped: ${error.message}`);
    }
  }
}

async function configureSSLTLS() {
  const sslSettings = [
    {
      id: 'ssl',
      value: 'full',
    },
    {
      id: 'min_tls_version',
      value: '1.2',
    },
    {
      id: 'opportunistic_encryption',
      value: 'on',
    },
    {
      id: 'tls_1_3',
      value: 'on',
    },
    {
      id: 'automatic_https_rewrites',
      value: 'on',
    },
    {
      id: 'http2',
      value: 'on',
    },
    {
      id: 'http3',
      value: 'on',
    },
    {
      id: '0rtt',
      value: 'on',
    },
  ];

  for (const setting of sslSettings) {
    try {
      const response = await makeRequest(
        `/client/v4/zones/${ZONE_ID}/settings/${setting.id}`,
        'PATCH',
        {
          value: setting.value,
        }
      );
      if (response.status === 200 && response.data.success) {
        console.log(`   ✅ SSL/TLS setting updated: ${setting.id} = ${setting.value}`);
      }
    } catch (error) {
      console.log(`   ⚠️ SSL/TLS setting update skipped: ${error.message}`);
    }
  }
}

async function setupSpeedOptimizations() {
  const speedSettings = [
    {
      id: 'minify',
      value: {
        css: 'on',
        html: 'on',
        js: 'on',
      },
    },
    {
      id: 'brotli',
      value: 'on',
    },
    {
      id: 'early_hints',
      value: 'on',
    },
    {
      id: 'h2_prioritization',
      value: 'on',
    },
    {
      id: 'rocket_loader',
      value: 'on',
    },
    {
      id: 'mirage',
      value: 'on',
    },
  ];

  for (const setting of speedSettings) {
    try {
      const response = await makeRequest(
        `/client/v4/zones/${ZONE_ID}/settings/${setting.id}`,
        'PATCH',
        {
          value: setting.value,
        }
      );
      if (response.status === 200 && response.data.success) {
        console.log(`   ✅ Speed setting updated: ${setting.id}`);
      }
    } catch (error) {
      console.log(`   ⚠️ Speed setting update skipped: ${error.message}`);
    }
  }
}

async function optimizeDNSRecords() {
  // Get current DNS records
  try {
    const dnsResponse = await makeRequest(`/client/v4/zones/${ZONE_ID}/dns_records`, 'GET');

    if (dnsResponse.status === 200 && dnsResponse.data.success) {
      console.log(`   📋 Found ${dnsResponse.data.result.length} DNS records`);

      // Check for A record pointing to Vercel
      const aRecord = dnsResponse.data.result.find(
        (record) => record.type === 'A' && record.name === 'centennialhillshomesforsale.com'
      );

      if (aRecord) {
        console.log('   ✅ A record found for main domain');
      } else {
        console.log('   ⚠️ A record not found - you may need to add one pointing to Vercel');
      }

      // Check for CNAME record for www
      const wwwRecord = dnsResponse.data.result.find(
        (record) => record.type === 'CNAME' && record.name === 'www.centennialhillshomesforsale.com'
      );

      if (wwwRecord) {
        console.log('   ✅ CNAME record found for www subdomain');
      } else {
        console.log('   ⚠️ CNAME record for www not found');
      }
    }
  } catch (error) {
    console.log(`   ⚠️ DNS records check skipped: ${error.message}`);
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

// Run the improvement script
improveCloudflareSetup();
