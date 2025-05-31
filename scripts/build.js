
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Cleaning previous build...');
if (fs.existsSync('public')) {
  fs.rmSync('public', { recursive: true, force: true });
}

console.log('🔨 Building Next.js application...');
execSync('next build', { stdio: 'inherit' });

console.log('📁 Copying files to public directory...');
// Create public directory
fs.mkdirSync('public', { recursive: true });

// Copy files from out to public
function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`❌ Source directory ${src} does not exist`);
    return;
  }
  
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir('out', 'public');
console.log('✅ Build complete! Files ready in public/ directory');

// Verify the build
const outFiles = fs.existsSync('out') ? fs.readdirSync('out').length : 0;
const publicFiles = fs.existsSync('public') ? fs.readdirSync('public').length : 0;

console.log(`📊 Build summary:`);
console.log(`   - Out directory: ${outFiles} items`);
console.log(`   - Public directory: ${publicFiles} items`);

if (fs.existsSync('public/index.html')) {
  console.log('🌐 Ready for deployment - index.html found in public/');
} else {
  console.log('⚠️  Warning: index.html not found in public/');
}
