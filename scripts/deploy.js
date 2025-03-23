const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const PROJECT_NAME = 'centennialhillshomesforsale';
const DOMAIN = 'centennialhillshomesforsale.com';

// Build the project first
const buildCommand = 'npm run build';
const { execSync } = require('child_process');

try {
  console.log('Building project...');
  execSync(buildCommand, { stdio: 'inherit' });
  
  // Read the built files
  const buildDir = path.join(process.cwd(), 'out');
  const files = [];
  
  function readDir(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        readDir(fullPath);
      } else {
        const relativePath = path.relative(buildDir, fullPath);
        files.push({
          name: relativePath,
          content: fs.readFileSync(fullPath, 'utf-8')
        });
      }
    }
  }
  
  readDir(buildDir);
  
  // Create deployment
  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    }
  };

  const data = JSON.stringify({
    files,
    production: true
  });

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const response = JSON.parse(data);
      if (response.success) {
        console.log('Deployment successful!');
        console.log('URL:', `https://${DOMAIN}`);
      } else {
        console.error('Deployment failed:', response.errors);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error deploying:', error);
  });

  req.write(data);
  req.end();
} catch (error) {
  console.error('Error during deployment:', error);
} 