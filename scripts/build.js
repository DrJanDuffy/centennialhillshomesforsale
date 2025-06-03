#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 PRODUCTION BUILD - CENTENNIAL HILLS WEBSITE');
console.log('===============================================');

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('out')) {
    execSync('rm -rf out', { stdio: 'inherit' });
  }
  if (fs.existsSync('.next')) {
    execSync('rm -rf .next', { stdio: 'inherit' });
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });

  // Build the site
  console.log('🔨 Building optimized production site...');
  execSync('npm run build', { stdio: 'inherit' });

  // Verify build output
  console.log('📊 Verifying build output...');
  if (fs.existsSync('out') && fs.readdirSync('out').length > 0) {
    const fileCount = fs.readdirSync('out').length;
    console.log(`✅ Build successful: ${fileCount} files generated`);

    // Check file sizes
    const indexPath = path.join('out', 'index.html');
    if (fs.existsSync(indexPath)) {
      const indexSize = Math.round(fs.statSync(indexPath).size / 1024);
      console.log(`📄 index.html: ${indexSize}KB`);
    }

    // Check critical files
    const criticalFiles = ['index.html', '404.html', 'manifest.json', 'robots.txt'];
    criticalFiles.forEach(file => {
      const filePath = path.join('out', file);
      if (fs.existsSync(filePath)) {
        const size = Math.round(fs.statSync(filePath).size / 1024);
        console.log(`📄 ${file}: ${size}KB`);
      } else {
        console.log(`⚠️ Missing: ${file}`);
      }
    });

    console.log('🚀 Production build ready for deployment!');
  } else {
    throw new Error('Build output directory is empty or missing');
  }

} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.log('🔄 Attempting fallback build...');

  try {
    execSync('npx next build', { stdio: 'inherit' });
    console.log('✅ Fallback build completed');
  } catch (fallbackError) {
    console.error('❌ Fallback build also failed:', fallbackError.message);
    process.exit(1);
  }
}