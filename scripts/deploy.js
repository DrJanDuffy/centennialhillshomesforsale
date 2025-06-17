
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 AWESOME CENTENNIAL HILLS DEPLOYMENT');
console.log('=====================================');

const deploymentConfig = {
  buildDir: 'out',
  port: 5000,
  host: '0.0.0.0'
};

try {
  // Step 1: Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  ['out', '.next', 'public'].forEach(dir => {
    if (fs.existsSync(dir)) {
      execSync(`rm -rf ${dir}`, { stdio: 'inherit' });
    }
  });

  // Step 2: Install dependencies with optimization
  console.log('📦 Installing dependencies...');
  execSync('npm ci --production=false --silent', { stdio: 'inherit' });

  // Step 3: Build with optimizations
  console.log('🔨 Building optimized production site...');
  process.env.NODE_ENV = 'production';
  execSync('npm run build', { stdio: 'inherit' });

  // Step 4: Verify critical files
  console.log('📊 Verifying deployment assets...');
  const criticalFiles = ['index.html', 'manifest.json', 'robots.txt', 'sitemap.xml'];
  const buildPath = deploymentConfig.buildDir;
  
  if (!fs.existsSync(buildPath)) {
    throw new Error(`Build directory ${buildPath} not found`);
  }

  const fileCount = fs.readdirSync(buildPath).length;
  console.log(`✅ Build successful: ${fileCount} files generated`);

  criticalFiles.forEach(file => {
    const filePath = path.join(buildPath, file);
    if (fs.existsSync(filePath)) {
      const size = Math.round(fs.statSync(filePath).size / 1024);
      console.log(`📄 ${file}: ${size}KB ✅`);
    } else {
      console.log(`⚠️  ${file}: Missing`);
    }
  });

  // Step 5: Performance audit
  console.log('⚡ Running performance audit...');
  const indexPath = path.join(buildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    const indexSize = fs.statSync(indexPath).size;
    if (indexSize < 500000) { // 500KB threshold
      console.log(`✅ Index.html size optimized: ${Math.round(indexSize/1024)}KB`);
    } else {
      console.log(`⚠️  Index.html is large: ${Math.round(indexSize/1024)}KB - consider optimization`);
    }
  }

  // Step 6: Start production server
  console.log('🌐 Starting production server...');
  console.log(`🔗 Server will be available at: http://${deploymentConfig.host}:${deploymentConfig.port}`);
  
  execSync(`npx serve ${buildPath} -s -l ${deploymentConfig.port} --cors --host ${deploymentConfig.host}`, { 
    stdio: 'inherit' 
  });

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  console.log('🔄 Attempting emergency fallback...');
  
  try {
    execSync('npm run dev', { stdio: 'inherit' });
  } catch (fallbackError) {
    console.error('❌ Emergency fallback failed:', fallbackError.message);
    process.exit(1);
  }
}
