#!/usr/bin/env node

/**
 * OpenRouter.ai Setup Helper
 * Helps configure OpenRouter.ai API key for hero image generation
 */

const fs = require('fs');
const path = require('path');

function createEnvFile() {
  const envContent = `# OpenRouter.ai API Configuration
# Get your API key from: https://openrouter.ai/keys
OPENROUTER_API_KEY=your-api-key-here

# Optional: Set default model for image generation
OPENROUTER_DEFAULT_MODEL=dall-e-3
`;

  const envPath = '.env.local';

  if (fs.existsSync(envPath)) {
    console.log('📄 .env.local already exists');
    console.log('   Please add your OPENROUTER_API_KEY manually');
  } else {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env.local file');
    console.log('   Please edit it and add your actual API key');
  }
}

function displaySetupInstructions() {
  console.log('\n🔑 OPENROUTER.AI SETUP INSTRUCTIONS\n');

  console.log('1. Get your API key:');
  console.log('   • Go to https://openrouter.ai/keys');
  console.log('   • Sign up or log in to your account');
  console.log('   • Create a new API key');
  console.log('   • Copy the key (it starts with "sk-or-...")\n');

  console.log('2. Set up your environment:');
  console.log('   Option A - Environment variable:');
  console.log('   export OPENROUTER_API_KEY="your-actual-api-key"\n');

  console.log('   Option B - .env.local file:');
  console.log('   • Edit .env.local');
  console.log('   • Replace "your-api-key-here" with your actual key\n');

  console.log('3. Test the setup:');
  console.log('   node generate-hero-openrouter.js --help\n');

  console.log('4. Generate your first hero image:');
  console.log('   node generate-hero-openrouter.js primary dall-e-3\n');

  console.log('💡 Available models:');
  console.log('   • dall-e-3 (recommended for real estate)');
  console.log('   • dall-e-2 (good alternative)');
  console.log('   • midjourney (excellent for architecture)');
  console.log('   • stable-diffusion-xl (free option)\n');

  console.log('🎨 Prompt types:');
  console.log('   • primary (main hero image)');
  console.log('   • aerial (drone view)');
  console.log('   • interior (inside luxury home)');
  console.log('   • lifestyle (family enjoying home)\n');
}

function checkApiKey() {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey || apiKey === 'your-api-key-here') {
    console.log('❌ OPENROUTER_API_KEY not set or using placeholder');
    console.log('   Please set your API key first\n');
    return false;
  }

  if (apiKey.startsWith('sk-or-')) {
    console.log('✅ OPENROUTER_API_KEY is set and looks valid');
    return true;
  } else {
    console.log('⚠️  OPENROUTER_API_KEY is set but format looks incorrect');
    console.log('   OpenRouter keys typically start with "sk-or-"');
    return false;
  }
}

// Main execution
const command = process.argv[2];

switch (command) {
  case 'init':
    createEnvFile();
    displaySetupInstructions();
    break;
  case 'check':
    checkApiKey();
    break;
  case 'help':
  default:
    console.log('\n🔧 OPENROUTER.AI SETUP HELPER\n');
    console.log('Usage: node setup-openrouter.js [command]\n');
    console.log('Commands:');
    console.log('  init   - Create .env.local and show setup instructions');
    console.log('  check  - Verify API key is configured correctly');
    console.log('  help   - Show this help message\n');
    console.log('Quick start:');
    console.log('  1. node setup-openrouter.js init');
    console.log('  2. Edit .env.local with your API key');
    console.log('  3. node setup-openrouter.js check');
    console.log('  4. node generate-hero-openrouter.js primary\n');
    break;
}

console.log('✨ Ready to generate amazing hero images! ✨\n');

