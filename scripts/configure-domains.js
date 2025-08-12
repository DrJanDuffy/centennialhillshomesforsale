const https = require('node:https');
require('dotenv').config({ path: '.env.local' });

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const DOMAIN = 'centennialhillshomesforsale.com';

const options = {
  hostname: 'api.cloudflare.com',
  path: `/client/v4/zones`,
  method: 'POST',
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
};

const data = JSON.stringify({
  name: DOMAIN,
  account: { id: ACCOUNT_ID },
  jump_start: true,
});

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const response = JSON.parse(data);
    if (response.success) {
      console.log(`Successfully configured domain: ${DOMAIN}`);
      console.log('Zone ID:', response.result.id);
    } else {
      console.error('Failed to configure domain:', response.errors);
    }
  });
});

req.on('error', (error) => {
  console.error('Error configuring domain:', error);
});

req.write(data);
req.end();
