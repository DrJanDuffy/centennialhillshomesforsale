#!/usr/bin/env node

/**
 * Trigger Vercel Deployment
 * This script will help diagnose and fix Vercel deployment issues
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Vercel Deployment Troubleshooter\n');

// Check if .vercel directory exists
if (fs.existsSync('.vercel')) {
  console.log('✅ .vercel directory found - project is linked');
} else {
  console.log('❌ .vercel directory not found - project needs to be linked');
  console.log('💡 Run: vercel link');
}

// Check git configuration
try {
  const gitEmail = execSync('git config --global user.email', { encoding: 'utf8' }).trim();
  const gitName = execSync('git config --global user.name', { encoding: 'utf8' }).trim();
  
  console.log(`\n📧 Git Email: ${gitEmail}`);
  console.log(`👤 Git Name: ${gitName}`);
  
  // Check if email matches Vercel account
  if (gitEmail.includes('DrDuffy') || gitEmail.includes('bhhsnv')) {
    console.log('✅ Git email appears to match Vercel account');
  } else {
    console.log('⚠️  Git email may not match Vercel account');
  }
} catch (error) {
  console.log('❌ Error checking git configuration:', error.message);
}

// Check recent commits
try {
  const lastCommit = execSync('git log -1 --pretty=format:"%h %an <%ae> %s"', { encoding: 'utf8' }).trim();
  console.log(`\n📝 Last Commit: ${lastCommit}`);
} catch (error) {
  console.log('❌ Error checking git log:', error.message);
}

// Check if we can access Vercel CLI
try {
  const vercelVersion = execSync('vercel --version', { encoding: 'utf8' }).trim();
  console.log(`\n🔧 Vercel CLI: ${vercelVersion}`);
} catch (error) {
  console.log('❌ Vercel CLI not accessible:', error.message);
}

console.log('\n🛠️  Solutions to try:');
console.log('1. Go to https://vercel.com/dashboard');
console.log('2. Find your project: centennialhillshomesforsale');
console.log('3. Click "Deployments" tab');
console.log('4. Click "Deploy" button for manual deployment');
console.log('5. Check "Settings" > "Git" to verify GitHub integration');
console.log('6. Ensure webhook is active in GitHub repository settings');

console.log('\n🌐 Your site should be at: https://www.centennialhillshomesforsale.com');
