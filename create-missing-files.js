#!/usr/bin/env node

/**
 * Create Missing Essential Files
 * This script creates any missing essential configuration files
 */

const fs = require('node:fs');
const _path = require('node:path');

console.log('📝 CREATING MISSING ESSENTIAL FILES');
console.log('===================================\n');

// Create .env.example
function createEnvExample() {
  const envExample = `# Environment Variables Example
# Copy this file to .env.local and fill in your actual values

# OpenRouter API Key for AI image generation
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Follow Up Boss API Configuration
NEXT_PUBLIC_FUB_API_KEY=your_fub_api_key_here
NEXT_PUBLIC_FUB_ACCOUNT_ID=your_fub_account_id_here

# Google Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id_here

# Google Search Console
NEXT_PUBLIC_GSC_VERIFICATION=your_gsc_verification_code_here

# RealScout Integration
NEXT_PUBLIC_REALSCOUT_SCRIPT_URL=https://em.realscout.com/widgets/realscout-web-components.umd.js

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.centennialhillshomesforsale.com
NEXT_PUBLIC_SITE_NAME=Centennial Hills Homes for Sale
`;

  fs.writeFileSync('.env.example', envExample);
  console.log('✅ Created .env.example');
}

// Create .eslintrc.json
function createEslintConfig() {
  const eslintConfig = {
    extends: ['next/core-web-vitals', 'eslint:recommended', '@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'warn',
    },
    ignorePatterns: ['node_modules/', '.next/', 'out/', 'build/'],
  };

  fs.writeFileSync('.eslintrc.json', JSON.stringify(eslintConfig, null, 2));
  console.log('✅ Created .eslintrc.json');
}

// Create .prettierrc
function createPrettierConfig() {
  const prettierConfig = {
    semi: true,
    trailingComma: 'es5',
    singleQuote: true,
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
  };

  fs.writeFileSync('.prettierrc', JSON.stringify(prettierConfig, null, 2));
  console.log('✅ Created .prettierrc');
}

// Create .gitignore additions
function updateGitignore() {
  const gitignoreAdditions = `

# Cleanup and temporary files
*.log
*.tmp
*.temp
.DS_Store
Thumbs.db

# Documentation files (moved to docs/)
docs/

# Image generation scripts (temporary)
generate-hero-*.js
test-*.js
check-*.js
setup-*.js
find-*.js
trigger-*.js
improve-*.js
clear-*.js
fix-dns-*.js

# Audit reports
*-audit-report.json
image-audit-report.json
seo-audit-report.json

# Environment files
.env.local
.env.production
.env.development
`;

  const gitignorePath = '.gitignore';
  let content = '';

  if (fs.existsSync(gitignorePath)) {
    content = fs.readFileSync(gitignorePath, 'utf8');
  }

  if (!content.includes('# Cleanup and temporary files')) {
    fs.appendFileSync(gitignorePath, gitignoreAdditions);
    console.log('✅ Updated .gitignore');
  } else {
    console.log('ℹ️  .gitignore already up to date');
  }
}

// Create README.md if missing
function createReadme() {
  const readmePath = 'README.md';
  if (!fs.existsSync(readmePath)) {
    const readme = `# Centennial Hills Homes for Sale

A modern, responsive real estate website for Centennial Hills, Las Vegas, built with Next.js and deployed on Vercel.

## Features

- 🏠 Property listings and gallery
- 🗺️ Interactive neighborhood maps
- 📱 Mobile-responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔍 SEO optimized
- 📊 Market data and insights
- 🤖 AI-powered features

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Deployment**: Vercel
- **Analytics**: Google Analytics
- **CRM**: Follow Up Boss integration

## Getting Started

1. Clone the repository
2. Install dependencies: \`npm install\`
3. Copy \`.env.example\` to \`.env.local\` and fill in your API keys
4. Run development server: \`npm run dev\`
5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

This project is automatically deployed to Vercel when changes are pushed to the main branch.

## Documentation

See the \`docs/\` directory for detailed guides and setup instructions.

## License

Private project for Dr. Jan Duffy Real Estate.
`;

    fs.writeFileSync(readmePath, readme);
    console.log('✅ Created README.md');
  } else {
    console.log('ℹ️  README.md already exists');
  }
}

// Main execution
async function main() {
  try {
    createEnvExample();
    createEslintConfig();
    createPrettierConfig();
    updateGitignore();
    createReadme();

    console.log('\n🎉 All missing essential files created!');
    console.log('💡 Your project is now properly configured.');
  } catch (error) {
    console.error('❌ Failed to create missing files:', error.message);
    process.exit(1);
  }
}

main();
