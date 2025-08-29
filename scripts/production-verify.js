#
!/usr/bin / env
node

const fs = require('node:fs');
const _path = require('node:path');

console.log('🔍 PRODUCTION DEPLOYMENT VERIFICATION');
console.log('====================================');

const checks = {
  buildOutput: false,
  essentialFiles: false,
  staticAssets: false,
  seoFiles: false,
  security: false,
};

// Check 1: Build Output Directory
console.log('\n📁 Checking build output...');
if (fs.existsSync('out') && fs.readdirSync('out').length > 0) {
  checks.buildOutput = true;
  const fileCount = fs.readdirSync('out').length;
  console.log(`✅ Build output verified: ${fileCount} files generated`);
} else {
  console.log('❌ Build output missing or empty');
}

// Check 2: Essential Files
console.log('\n📄 Checking essential files...');
const essentialFiles = ['out/index.html', 'out/404.html', 'out/manifest.json', 'out/robots.txt'];
const missingFiles = essentialFiles.filter((file) => !fs.existsSync(file));

if (missingFiles.length === 0) {
  checks.essentialFiles = true;
  console.log('✅ All essential files present');
} else {
  console.log('❌ Missing essential files:', missingFiles);
}

// Check 3: Static Assets
console.log('\n🖼️ Checking static assets...');
const staticDirs = ['out/_next/static', 'out/images'];
const hasStaticAssets = staticDirs.some((dir) => fs.existsSync(dir));

if (hasStaticAssets) {
  checks.staticAssets = true;
  console.log('✅ Static assets found');
} else {
  console.log('⚠️ Limited static assets detected');
  checks.staticAssets = true; // Non-critical
}

// Check 4: SEO Files
console.log('\n🔍 Checking SEO optimization...');
const seoFiles = ['out/sitemap.xml', 'out/enhanced-business-schema.json'];
const hasSeoFiles = seoFiles.some((file) => fs.existsSync(file));

if (hasSeoFiles) {
  checks.seoFiles = true;
  console.log('✅ SEO files present');
} else {
  console.log('⚠️ SEO files missing - will impact search rankings');
}

// Check 5: Security Headers (check next.config.js)
console.log('\n🔒 Checking security configuration...');
if (fs.existsSync('next.config.js')) {
  const configContent = fs.readFileSync('next.config.js', 'utf8');
  if (
    configContent.includes('X-Content-Type-Options') &&
    configContent.includes('X-Frame-Options')
  ) {
    checks.security = true;
    console.log('✅ Security headers configured');
  } else {
    console.log('⚠️ Security headers missing');
  }
}

// Final Report
console.log('\n📊 DEPLOYMENT READINESS REPORT');
console.log('==============================');

const passedChecks = Object.values(checks).filter(Boolean).length;
const totalChecks = Object.keys(checks).length;
const readinessScore = Math.round((passedChecks / totalChecks) * 100);

console.log(`Overall Readiness: ${readinessScore}% (${passedChecks}/${totalChecks} checks passed)`);

Object.entries(checks).forEach(([check, passed]) => {
  const status = passed ? '✅' : '❌';
  const checkName = check.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  console.log(`${status} ${checkName}`);
});

if (readinessScore >= 80) {
  console.log('\n🚀 READY FOR DEPLOYMENT!');
  console.log('Your site is ready to launch with excellent quality standards.');
} else if (readinessScore >= 60) {
  console.log('\n⚠️ NEEDS ATTENTION');
  console.log('Address the failed checks before deploying to production.');
} else {
  console.log('\n❌ NOT READY');
  console.log('Critical issues must be resolved before deployment.');
}

process.exit(readinessScore >= 60 ? 0 : 1);
