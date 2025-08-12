const https = require('node:https');
require('dotenv').config({ path: '.env.local' });

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const _ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const DOMAIN = 'centennialhillshomesforsale.com';

// Get Zone ID first
const getZoneId = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.cloudflare.com',
      path: `/client/v4/zones?name=${DOMAIN}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        const response = JSON.parse(data);
        if (response.success && response.result.length > 0) {
          resolve(response.result[0].id);
        } else {
          reject(new Error('Failed to get Zone ID'));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
};

// Configure WAF rules
const configureWAF = async (zoneId) => {
  const rules = [
    {
      description: 'Block SQL Injection',
      expression:
        'http.request.uri.query contains "select" or http.request.uri.query contains "union" or http.request.uri.query contains "insert" or http.request.uri.query contains "delete" or http.request.uri.query contains "update"',
      action: 'block',
    },
    {
      description: 'Block XSS Attempts',
      expression:
        'http.request.uri.query contains "<script>" or http.request.uri.query contains "javascript:"',
      action: 'block',
    },
    {
      description: 'Rate Limiting',
      expression: 'http.request.uri.path contains "/api/"',
      action: 'challenge',
      rate_limit: {
        requests_per_second: 10,
      },
    },
  ];

  for (const rule of rules) {
    const options = {
      hostname: 'api.cloudflare.com',
      path: `/client/v4/zones/${zoneId}/firewall/rules`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    const data = JSON.stringify(rule);

    await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          const response = JSON.parse(data);
          if (response.success) {
            console.log(`Successfully configured WAF rule: ${rule.description}`);
            resolve();
          } else {
            console.error(`Failed to configure WAF rule: ${rule.description}`, response.errors);
            reject(new Error('Failed to configure WAF rule'));
          }
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }
};

// Configure SSL/TLS settings
const configureSSL = async (zoneId) => {
  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/zones/${zoneId}/ssl/tls`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  const data = JSON.stringify({
    value: 'strict',
    min_tls_version: '1.2',
  });

  await new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        const response = JSON.parse(data);
        if (response.success) {
          console.log('Successfully configured SSL/TLS settings');
          resolve();
        } else {
          console.error('Failed to configure SSL/TLS settings:', response.errors);
          reject(new Error('Failed to configure SSL/TLS settings'));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
};

// Configure security headers
const configureHeaders = async (zoneId) => {
  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/zones/${zoneId}/rules/transform`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  const data = JSON.stringify({
    rules: [
      {
        expression: 'true',
        action: 'set_http_response_header',
        value: {
          name: 'X-Frame-Options',
          value: 'DENY',
        },
      },
      {
        expression: 'true',
        action: 'set_http_response_header',
        value: {
          name: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      },
      {
        expression: 'true',
        action: 'set_http_response_header',
        value: {
          name: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      },
      {
        expression: 'true',
        action: 'set_http_response_header',
        value: {
          name: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload',
        },
      },
    ],
  });

  await new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        const response = JSON.parse(data);
        if (response.success) {
          console.log('Successfully configured security headers');
          resolve();
        } else {
          console.error('Failed to configure security headers:', response.errors);
          reject(new Error('Failed to configure security headers'));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
};

// Main execution
const setupSecurity = async () => {
  try {
    console.log('Starting security setup...');
    const zoneId = await getZoneId();
    await configureWAF(zoneId);
    await configureSSL(zoneId);
    await configureHeaders(zoneId);
    console.log('Security setup completed successfully!');
  } catch (error) {
    console.error('Error during security setup:', error);
    process.exit(1);
  }
};

setupSecurity();
