const https = require('node:https');

const projects = [
  {
    name: 'centennialhillshomesforsale',
    domain: 'centennialhillshomes.com',
  },
  {
    name: 'waterfall-homes',
    domain: 'waterfallhomeslv.com',
  },
  {
    name: 'heritage-stonebridge',
    domain: 'heritagestonebridge.com',
  },
  {
    name: 'speedy-cash-home-offers',
    domain: 'speedycashhomes.com',
  },
  {
    name: 'realtimetouring',
    domain: 'realtimetouring.com',
  },
  {
    name: 'realestatelistings',
    domain: 'lasvegasrealestate.com',
  },
];

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

async function configureDomain(project) {
  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${project.name}/domains`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`Successfully configured domain ${project.domain} for ${project.name}`);
          resolve(JSON.parse(data));
        } else {
          console.error(`Failed to configure domain for ${project.name}:`, data);
          reject(new Error(`Domain configuration failed with status ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error(`Error configuring domain for ${project.name}:`, error);
      reject(error);
    });

    req.write(
      JSON.stringify({
        domain: project.domain,
        production: true,
      })
    );
    req.end();
  });
}

async function configureAllDomains() {
  console.log('Starting domain configuration for all projects...');

  for (const project of projects) {
    try {
      await configureDomain(project);
    } catch (error) {
      console.error(`Failed to configure domain for ${project.name}:`, error);
    }
  }

  console.log('Domain configuration process completed.');
}

configureAllDomains();
