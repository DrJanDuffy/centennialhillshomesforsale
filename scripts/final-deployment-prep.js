
#!/usr/bin/env node

const fs = require('node:fs');
const _path = require('node:path');

console.log('🚀 FINAL DEPLOYMENT PREPARATION');
console.log('================================');

// Check critical files
const criticalFiles = [
  'public/manifest.json',
  'public/robots.txt', 
  'public/sitemap.xml',
  'public/apple-touch-icon.png',
  'public/enhanced-business-schema.json',
  'next.config.js'
];

console.log('📋 Checking critical files...');
let allFilesPresent = true;

criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ MISSING: ${file}`);
    allFilesPresent = false;
  }
});

// Verify build configuration
console.log('\n🔧 Verifying build configuration...');
try {
  const nextConfig = require('../next.config.js');
  if (nextConfig.output === 'export' && nextConfig.trailingSlash === true) {
    console.log('✅ Next.js export configuration correct');
  } else {
    console.log('❌ Next.js export configuration needs fixing');
    allFilesPresent = false;
  }
} catch (error) {
  console.log('❌ Error reading next.config.js:', error.message);
  allFilesPresent = false;
}

// Check environment variables
console.log('\n🔐 Environment variables check...');
const requiredEnvVars = [
  'NEXT_PUBLIC_GA_MEASUREMENT_ID'
];

requiredEnvVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar} is set`);
  } else {
    console.log(`⚠️  ${envVar} not set (add to Secrets)`);
  }
});

// Check package.json scripts
console.log('\n📦 Checking package.json scripts...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredScripts = ['build', 'start', 'dev'];
  requiredScripts.forEach(script => {
    if (packageJson.scripts?.[script]) {
      console.log(`✅ Script "${script}" present`);
    } else {
      console.log(`❌ Missing script: ${script}`);
      allFilesPresent = false;
    }
  });
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
  allFilesPresent = false;
}

// Final status
console.log(`\n${'='.repeat(50)}`);
if (allFilesPresent) {
  console.log('🎉 DEPLOYMENT READY!');
  console.log('✅ All critical files and configurations verified');
  console.log('\n🚀 Run workflow "AWESOME DEPLOY" to deploy!');
} else {
  console.log('⚠️  DEPLOYMENT ISSUES DETECTED');
  console.log('❌ Please fix the issues above before deploying');
}
console.log('='.repeat(50));

// Generate deployment summary
const deploymentSummary = {
  timestamp: new Date().toISOString(),
  status: allFilesPresent ? 'READY' : 'ISSUES_DETECTED',
  criticalFilesCheck: allFilesPresent,
  domain: 'centennialhillshomesforsale.com',
  features: {
    seo: true,
    pwa: true,
    analytics: true,
    localOptimization: true,
    generativeAI: true,
    performance: true
  },
  nextSteps: [
    'Click Run button to deploy',
    'Add domain in Replit deployment settings',
    'Submit sitemap to Google Search Console',
    'Verify analytics tracking'
  ]
};

fs.writeFileSync(
  'deployment-summary.json',
  JSON.stringify(deploymentSummary, null, 2)
);

console.log('\n📄 Deployment summary saved to deployment-summary.json');
