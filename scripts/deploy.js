
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 EMERGENCY BACKUP DEPLOY SCRIPT');
console.log('This script will create a working site even if the build fails');

// Emergency fallback HTML content
const emergencyHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Centennial Hills Homes For Sale</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
    .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    h1 { color: #2c5282; text-align: center; }
    .contact { background: #e2e8f0; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .button { display: inline-block; background: #3182ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🏠 Centennial Hills Homes For Sale</h1>
    <p>Welcome to your trusted source for real estate in Centennial Hills, Las Vegas!</p>
    
    <div class="contact">
      <h2>Contact Dr. Jan Duff</h2>
      <p><strong>Phone:</strong> (702) 903-1952</p>
      <p><strong>Email:</strong> jan@centennialhillshomesforsale.com</p>
      <p><strong>Service Areas:</strong> Centennial Hills, Providence, Skye Canyon, Northwest Las Vegas</p>
    </div>
    
    <h2>Our Services</h2>
    <ul>
      <li>Home Buying & Selling</li>
      <li>Market Analysis</li>
      <li>Property Valuation</li>
      <li>Neighborhood Expertise</li>
    </ul>
    
    <a href="tel:+17029031952" class="button">📞 Call Now</a>
    <a href="mailto:jan@centennialhillshomesforsale.com" class="button">📧 Email Us</a>
    
    <p><em>Site temporarily in maintenance mode. Full site will be restored shortly.</em></p>
  </div>
</body>
</html>
`;

function createEmergencyDeploy() {
  console.log('🚨 Creating emergency fallback site...');
  
  // Remove existing public directory
  if (fs.existsSync('public')) {
    fs.rmSync('public', { recursive: true, force: true });
  }
  
  // Create fresh public directory
  fs.mkdirSync('public', { recursive: true });
  
  // Write emergency HTML
  fs.writeFileSync('public/index.html', emergencyHTML);
  fs.writeFileSync('public/404.html', emergencyHTML);
  
  console.log('✅ Emergency site created successfully!');
  console.log('📁 Files in public:', fs.readdirSync('public'));
  
  return true;
}

function attemptBuild() {
  console.log('🔨 Attempting to build Next.js app...');
  
  try {
    // Try building the app
    execSync('npm run build-static', { stdio: 'inherit' });
    
    // Check if build output exists
    if (fs.existsSync('out') && fs.readdirSync('out').length > 0) {
      console.log('✅ Build successful! Copying files...');
      
      // Remove existing public directory
      if (fs.existsSync('public')) {
        fs.rmSync('public', { recursive: true, force: true });
      }
      
      // Create fresh public directory
      fs.mkdirSync('public', { recursive: true });
      
      // Copy files from out to public
      function copyDir(src, dest) {
        const entries = fs.readdirSync(src, { withFileTypes: true });
        
        for (let entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          
          if (entry.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyDir(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      }
      
      copyDir('out', 'public');
      console.log('✅ Files successfully copied to public/');
      return true;
    } else {
      throw new Error('Build output directory is empty');
    }
  } catch (error) {
    console.log('❌ Build failed:', error.message);
    return false;
  }
}

// Main deployment logic
console.log('Starting deployment process...');

const buildSuccess = attemptBuild();

if (!buildSuccess) {
  console.log('🚨 Build failed - falling back to emergency site');
  createEmergencyDeploy();
}

// Verify deployment is ready
if (fs.existsSync('public/index.html')) {
  console.log('🌐 Site is ready for deployment!');
  console.log('📊 Total files:', fs.readdirSync('public').length);
  
  // Start local server for testing
  console.log('🚀 Starting local server for testing...');
  try {
    const { spawn } = require('child_process');
    const server = spawn('npx', ['serve', 'public', '-s', '-l', '5000', '--host', '0.0.0.0'], {
      stdio: 'inherit'
    });
    
    console.log('✅ Server started on http://0.0.0.0:5000');
    console.log('🌐 Your site is now accessible!');
  } catch (serverError) {
    console.log('⚠️ Could not start server automatically');
    console.log('Run: npx serve public -s -l 5000 --host 0.0.0.0');
  }
} else {
  console.log('❌ Deployment failed completely');
  process.exit(1);
}
