#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 DEPLOYING AWESOME CENTENNIAL HILLS WEBSITE');
console.log('============================================');

try {
  // Step 1: Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('public')) {
    execSync('rm -rf public/*', { stdio: 'inherit' });
  }
  if (fs.existsSync('out')) {
    execSync('rm -rf out', { stdio: 'inherit' });
  }
  if (fs.existsSync('.next')) {
    execSync('rm -rf .next', { stdio: 'inherit' });
  }

  // Step 2: Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });

  // Step 3: Build static site
  console.log('🔨 Building static site...');
  execSync('npm run build-static', { stdio: 'inherit' });

  // Step 4: Verify build
  console.log('📁 Verifying build...');
  if (fs.existsSync('public') && fs.readdirSync('public').length > 0) {
    const fileCount = fs.readdirSync('public').length;
    console.log(`✅ Build successful! Generated ${fileCount} files in public directory`);

    // List key files
    const keyFiles = ['index.html', 'manifest.json', 'robots.txt'];
    keyFiles.forEach(file => {
      const filePath = path.join('public', file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        console.log(`📄 ${file}: ${Math.round(stats.size / 1024)}KB`);
      }
    });

    console.log('🌐 Starting production server...');
    execSync('npx serve public -s -l 5000 --cors --host 0.0.0.0', { stdio: 'inherit' });
  } else {
    throw new Error('Build failed - public directory empty or missing');
  }

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  console.log('🔄 Falling back to development server...');
  execSync('npm run dev', { stdio: 'inherit' });
}