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

async function deployProject(project) {
  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${project.name}/deployments`,
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
          console.log(`Successfully deployed ${project.name} to ${project.domain}`);
          resolve(JSON.parse(data));
        } else {
          console.error(`Failed to deploy ${project.name}:`, data);
          reject(new Error(`Deployment failed with status ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error(`Error deploying ${project.name}:`, error);
      reject(error);
    });

    req.write(
      JSON.stringify({
        branch: 'main',
        build_config: {
          build_command: 'npm run build',
          destination_dir: 'out',
        },
      })
    );
    req.end();
  });
}

async function deployAll() {
  console.log('Starting deployment of all projects...');

  for (const project of projects) {
    try {
      await deployProject(project);
    } catch (error) {
      console.error(`Failed to deploy ${project.name}:`, error);
    }
  }

  console.log('Deployment process completed.');
}

deployAll();
