const https = require('https');
require('dotenv').config({ path: '.env.local' });

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const DOMAIN = 'centennialhillshomesforsale.com';

// Get Zone ID first
const getZoneId = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.cloudflare.com',
      path: `/client/v4/zones?name=${DOMAIN}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
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

// Configure Web Analytics
const configureAnalytics = async (zoneId) => {
  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/zones/${zoneId}/analytics/web`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    }
  };

  const data = JSON.stringify({
    enabled: true,
    settings: {
      // Performance metrics
      performance: {
        enabled: true,
        metrics: [
          'dns_lookup',
          'tcp_connection',
          'tls_handshake',
          'first_byte',
          'dom_interactive',
          'dom_complete',
          'load_time'
        ]
      },
      // User interaction events
      events: {
        enabled: true,
        tracking: [
          'page_views',
          'widget_interactions',
          'form_submissions',
          'property_searches',
          'property_views',
          'contact_requests'
        ]
      },
      // Real estate specific metrics
      real_estate: {
        enabled: true,
        metrics: [
          'property_type',
          'price_range',
          'location',
          'bedrooms',
          'bathrooms',
          'square_feet'
        ]
      },
      // Error tracking
      errors: {
        enabled: true,
        tracking: [
          'javascript_errors',
          'network_errors',
          'api_errors',
          'form_validation_errors'
        ]
      }
    }
  });

  await new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const response = JSON.parse(data);
        if (response.success) {
          console.log('Successfully configured analytics');
          resolve();
        } else {
          console.error('Failed to configure analytics:', response.errors);
          reject(new Error('Failed to configure analytics'));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
};

// Configure custom events
const configureCustomEvents = async (zoneId) => {
  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/zones/${zoneId}/analytics/events`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    }
  };

  const events = [
    {
      name: 'property_search',
      properties: ['query', 'filters', 'results_count']
    },
    {
      name: 'property_view',
      properties: ['property_id', 'property_type', 'price']
    },
    {
      name: 'contact_request',
      properties: ['property_id', 'contact_type', 'source']
    },
    {
      name: 'widget_interaction',
      properties: ['widget_type', 'action', 'property_id']
    }
  ];

  for (const event of events) {
    const data = JSON.stringify(event);

    await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          const response = JSON.parse(data);
          if (response.success) {
            console.log(`Successfully configured custom event: ${event.name}`);
            resolve();
          } else {
            console.error(`Failed to configure custom event: ${event.name}`, response.errors);
            reject(new Error(`Failed to configure custom event: ${event.name}`));
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
const setupAnalytics = async () => {
  try {
    console.log('Starting analytics setup...');
    const zoneId = await getZoneId();
    await configureAnalytics(zoneId);
    await configureCustomEvents(zoneId);
    console.log('Analytics setup completed successfully!');
  } catch (error) {
    console.error('Error during analytics setup:', error);
    process.exit(1);
  }
};

setupAnalytics(); 