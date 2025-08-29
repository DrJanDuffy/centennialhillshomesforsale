#!/usr/bin/env node

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

console.log('🚀 Vercel Project Setup Script');
console.log('===============================\n');

// Check if Vercel CLI is installed
function checkVercelCLI() {
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    console.log('✅ Vercel CLI is installed');
    return true;
  } catch {
    console.log('❌ Vercel CLI is not installed');
    console.log('📦 Installing Vercel CLI...');
    try {
      execSync('npm install -g vercel', { stdio: 'inherit' });
      console.log('✅ Vercel CLI installed successfully');
      return true;
    } catch {
      console.log('❌ Failed to install Vercel CLI');
      console.log('💡 Please install manually: npm install -g vercel');
      return false;
    }
  }
}

// Check if project is already linked
function checkProjectLink() {
  const vercelDir = path.join(process.cwd(), '.vercel');
  if (fs.existsSync(vercelDir)) {
    try {
      const projectJson = JSON.parse(fs.readFileSync(path.join(vercelDir, 'project.json'), 'utf8'));
      console.log('✅ Project is already linked to Vercel');
      console.log(`   Project ID: ${projectJson.projectId}`);
      console.log(`   Org ID: ${projectJson.orgId}`);
      return true;
    } catch {
      console.log('⚠️  Project directory exists but may be corrupted');
      return false;
    }
  }
  return false;
}

// Link project to Vercel
function linkProject() {
  console.log('🔗 Linking project to Vercel...');
  try {
    execSync('vercel link --yes', { stdio: 'inherit' });
    console.log('✅ Project linked successfully');
    return true;
  } catch {
    console.log('❌ Failed to link project');
    return false;
  }
}

// Deploy preview
function deployPreview() {
  console.log('🚀 Deploying preview...');
  try {
    execSync('vercel --prod=false', { stdio: 'inherit' });
    console.log('✅ Preview deployment successful');
    return true;
  } catch {
    console.log('❌ Preview deployment failed');
    return false;
  }
}

// Get project information
function getProjectInfo() {
  try {
    const projectJson = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), '.vercel', 'project.json'), 'utf8')
    );
    console.log('\n📊 Project Information:');
    console.log(`   Project ID: ${projectJson.projectId}`);
    console.log(`   Org ID: ${projectJson.orgId}`);
    console.log(`   Project Name: ${projectJson.projectName}`);

    // Read .vercelignore
    const vercelignorePath = path.join(process.cwd(), '.vercelignore');
    if (fs.existsSync(vercelignorePath)) {
      const ignoredFiles = fs
        .readFileSync(vercelignorePath, 'utf8')
        .split('\n')
        .filter((line) => line.trim() && !line.startsWith('#')).length;
      console.log(`   Ignored Files: ${ignoredFiles} patterns`);
    }

    return projectJson;
  } catch {
    console.log('❌ Could not read project information');
    return null;
  }
}

// Setup environment variables
function setupEnvironmentVariables() {
  console.log('\n🔐 Environment Variables Setup:');
  console.log('1. Go to Vercel Dashboard → Project Settings → Environment Variables');
  console.log('2. Add the following variables:');
  console.log('');
  console.log('   Production:');
  console.log('   - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');
  console.log('   - PERPLEXITY_API_KEY');
  console.log('   - NEXT_PUBLIC_GA_MEASUREMENT_ID');
  console.log('   - NEXT_PUBLIC_VERCEL_ENV=production');
  console.log('');
  console.log('   Preview:');
  console.log('   - NEXT_PUBLIC_VERCEL_ENV=preview');
  console.log('');
  console.log('   Development:');
  console.log('   - NEXT_PUBLIC_VERCEL_ENV=development');
}

// Setup GitHub Secrets
function setupGitHubSecrets() {
  console.log('\n🔑 GitHub Secrets Setup:');
  console.log('1. Go to GitHub → Repository → Settings → Secrets and variables → Actions');
  console.log('2. Add the following secrets:');
  console.log('');
  console.log('   - VERCEL_TOKEN');
  console.log('   - VERCEL_ORG_ID');
  console.log('   - VERCEL_PROJECT_ID');
  console.log('');
  console.log('3. Get these values from:');
  console.log('   - VERCEL_TOKEN: https://vercel.com/account/tokens');
  console.log('   - VERCEL_ORG_ID: Vercel Dashboard → Organization Settings');
  console.log('   - VERCEL_PROJECT_ID: Vercel Dashboard → Project Settings');
}

// Main setup function
async function main() {
  console.log('Starting Vercel project setup...\n');

  // Check Vercel CLI
  if (!checkVercelCLI()) {
    console.log('\n❌ Setup cannot continue without Vercel CLI');
    process.exit(1);
  }

  // Check if already linked
  if (checkProjectLink()) {
    const projectInfo = getProjectInfo();
    if (projectInfo) {
      setupEnvironmentVariables();
      setupGitHubSecrets();
      console.log('\n✅ Project is already set up!');
      return;
    }
  }

  // Link project
  if (!linkProject()) {
    console.log('\n❌ Setup failed at linking step');
    process.exit(1);
  }

  // Get project info
  const projectInfo = getProjectInfo();
  if (!projectInfo) {
    console.log('\n❌ Could not retrieve project information');
    process.exit(1);
  }

  // Setup instructions
  setupEnvironmentVariables();
  setupGitHubSecrets();

  // Deploy preview
  console.log('\n🚀 Deploying preview deployment...');
  if (deployPreview()) {
    console.log('\n🎉 Setup completed successfully!');
    console.log('\n📝 Next Steps:');
    console.log('1. Set up environment variables in Vercel Dashboard');
    console.log('2. Configure GitHub Secrets for CI/CD');
    console.log('3. Push to GitHub to trigger automated deployments');
    console.log('4. Monitor deployments in Vercel Dashboard');
  } else {
    console.log('\n⚠️  Setup completed but preview deployment failed');
    console.log('💡 You can try deploying manually with: vercel --prod=false');
  }
}

// Run setup
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  });
}

module.exports = {
  checkVercelCLI,
  checkProjectLink,
  linkProject,
  deployPreview,
  getProjectInfo,
  setupEnvironmentVariables,
  setupGitHubSecrets,
};
