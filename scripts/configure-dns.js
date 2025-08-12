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

// Configure DNS records
const configureDNS = async (zoneId) => {
  const records = [
    {
      type: 'A',
      name: '@',
      content: '76.76.21.21',
      proxied: true,
    },
    {
      type: 'CNAME',
      name: 'www',
      content: 'cname.vercel-dns.com',
      proxied: true,
    },
  ];

  for (const record of records) {
    const options = {
      hostname: 'api.cloudflare.com',
      path: `/client/v4/zones/${zoneId}/dns_records`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    const data = JSON.stringify(record);

    await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          const response = JSON.parse(data);
          if (response.success) {
            console.log(`Successfully configured DNS record: ${record.type} ${record.name}`);
            resolve();
          } else {
            console.error(
              `Failed to configure DNS record: ${record.type} ${record.name}`,
              response.errors
            );
            reject(new Error(`Failed to configure DNS record: ${record.type} ${record.name}`));
          }
        });
      });

      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }
};

// Main execution
const setupDNS = async () => {
  try {
    console.log('Starting DNS setup...');
    const zoneId = await getZoneId();
    await configureDNS(zoneId);
    console.log('DNS setup completed successfully!');
  } catch (error) {
    console.error('Error during DNS setup:', error);
    process.exit(1);
  }
};

setupDNS();
