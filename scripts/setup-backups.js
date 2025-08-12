const https = require('node:https');
const fs = require('node:fs');
const path = require('node:path');
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

// Configure automated backups
const configureBackups = async (zoneId) => {
  const options = {
    hostname: 'api.cloudflare.com',
    path: `/client/v4/zones/${zoneId}/backup`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  const data = JSON.stringify({
    enabled: true,
    settings: {
      frequency: 'daily',
      retention: 30, // days
      encryption: true,
      notifications: {
        email: true,
        slack: true,
      },
    },
  });

  await new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        const response = JSON.parse(data);
        if (response.success) {
          console.log('Successfully configured automated backups');
          resolve();
        } else {
          console.error('Failed to configure automated backups:', response.errors);
          reject(new Error('Failed to configure automated backups'));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
};

// Create backup script
const createBackupScript = () => {
  const script = `#!/bin/bash

# Backup directory
BACKUP_DIR="/var/backups/centennialhillshomesforsale"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Function to backup a project
backup_project() {
  local project=$1
  local backup_file="$BACKUP_DIR/${project}_${TIMESTAMP}.tar.gz"
  
  echo "Starting backup for $project..."
  
  # Create backup
  tar -czf $backup_file -C /var/www/$project .
  
  # Upload to Cloudflare R2
  aws s3 cp $backup_file s3://centennialhillshomesforsale-backups/ --endpoint-url https://$ACCOUNT_ID.r2.cloudflarestorage.com
  
  # Clean up old backups (keep last 30 days)
  find $BACKUP_DIR -name "${project}_*.tar.gz" -mtime +30 -delete
  
  echo "Backup completed for $project"
}

# Backup main project
backup_project "centennialhillshomesforsale"

# Log backup completion
echo "Backup completed at $(date)" >> /var/log/backup.log
`;

  fs.writeFileSync(path.join(process.cwd(), 'scripts', 'backup-projects.sh'), script);
  fs.chmodSync(path.join(process.cwd(), 'scripts', 'backup-projects.sh'), '755');
};

// Main execution
const setupBackups = async () => {
  try {
    console.log('Starting backup setup...');
    const zoneId = await getZoneId();
    await configureBackups(zoneId);
    createBackupScript();
    console.log('Backup setup completed successfully!');
    console.log('To schedule automated backups, add the following to your crontab:');
    console.log('0 2 * * * /path/to/scripts/backup-projects.sh >> /var/log/backup.log 2>&1');
  } catch (error) {
    console.error('Error during backup setup:', error);
    process.exit(1);
  }
};

setupBackups();
