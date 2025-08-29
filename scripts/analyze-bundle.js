#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes Next.js bundle size and provides optimization recommendations
 */

const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

console.log('🔍 Analyzing bundle size...\n');

try {
  // Check if .next directory exists
  if (!fs.existsSync('.next')) {
    console.log('❌ .next directory not found. Building project first...');
    execSync('npm run build', { stdio: 'inherit' });
  }

  // Analyze bundle size
  console.log('📊 Running bundle analysis...');
  execSync('npm run analyze', { stdio: 'inherit' });

  // Check bundle sizes
  const staticDir = path.join('.next', 'static', 'chunks');
  if (fs.existsSync(staticDir)) {
    const files = fs.readdirSync(staticDir);
    const jsFiles = files.filter((file) => file.endsWith('.js'));

    console.log('\n📦 Bundle sizes:');
    jsFiles.forEach((file) => {
      const filePath = path.join(staticDir, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`  ${file}: ${sizeKB} KB`);
    });
  }

  // Performance recommendations
  console.log('\n💡 Performance Optimization Recommendations:');
  console.log('  1. Use dynamic imports for large components');
  console.log('  2. Implement code splitting with React.lazy()');
  console.log('  3. Optimize images with Next.js Image component');
  console.log('  4. Use Tree Shaking for unused code elimination');
  console.log('  5. Implement proper caching strategies');
  console.log('  6. Use CDN for static assets');
  console.log('  7. Minimize third-party dependencies');
  console.log('  8. Implement proper error boundaries');

  console.log('\n✅ Bundle analysis complete!');
  console.log('📁 Check .next/analyze/ for detailed reports');
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
  process.exit(1);
}
