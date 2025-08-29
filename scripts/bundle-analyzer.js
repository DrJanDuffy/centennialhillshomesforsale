#!/usr/bin/env node

/**
 * Enhanced Bundle Analysis Script
 * Provides comprehensive insights into bundle sizes and optimization opportunities
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Centennial Hills Homes - Bundle Analysis');
console.log('============================================\n');

// Check if bundle analysis files exist
const bundlePath = path.join(process.cwd(), '.next/analyze');
const statsPath = path.join(process.cwd(), '.next/analyze/webpack-stats.json');

if (!fs.existsSync(bundlePath)) {
  console.log('❌ Bundle analysis files not found.');
  console.log('💡 Run "npm run analyze" first to generate bundle analysis.\n');
  process.exit(1);
}

try {
  // Read webpack stats
  const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));

  console.log('📊 Bundle Analysis Results');
  console.log('==========================\n');

  // Analyze chunks
  const chunks = stats.chunks || [];
  const totalChunkSize = chunks.reduce((sum, chunk) => sum + (chunk.size || 0), 0);

  console.log(`📦 Total Bundle Size: ${(totalChunkSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`🔢 Number of Chunks: ${chunks.length}\n`);

  // Sort chunks by size
  const sortedChunks = chunks
    .filter((chunk) => chunk.size)
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);

  console.log('🏆 Top 10 Largest Chunks:');
  sortedChunks.forEach((chunk, index) => {
    const sizeMB = (chunk.size / 1024 / 1024).toFixed(2);
    const percentage = ((chunk.size / totalChunkSize) * 100).toFixed(1);
    console.log(
      `  ${index + 1}. ${chunk.names?.join(', ') || chunk.id}: ${sizeMB} MB (${percentage}%)`
    );
  });

  // Analyze modules
  const modules = stats.modules || [];
  const totalModuleSize = modules.reduce((sum, module) => sum + (module.size || 0), 0);

  console.log(`\n📚 Total Modules: ${modules.length}`);
  console.log(`📏 Total Module Size: ${(totalModuleSize / 1024 / 1024).toFixed(2)} MB\n`);

  // Find largest modules
  const sortedModules = modules
    .filter((module) => module.size)
    .sort((a, b) => b.size - a.size)
    .slice(0, 15);

  console.log('🔍 Top 15 Largest Modules:');
  sortedModules.forEach((module, index) => {
    const sizeKB = (module.size / 1024).toFixed(1);
    const percentage = ((module.size / totalModuleSize) * 100).toFixed(1);
    const name = module.name || module.identifier || 'Unknown';
    console.log(`  ${index + 1}. ${name}: ${sizeKB} KB (${percentage}%)`);
  });

  // Analyze vendor modules
  const vendorModules = modules.filter(
    (module) => module.name && module.name.includes('node_modules')
  );
  const vendorSize = vendorModules.reduce((sum, module) => sum + (module.size || 0), 0);

  console.log(`\n📦 Vendor Modules: ${vendorModules.length}`);
  console.log(`💾 Vendor Size: ${(vendorSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📊 Vendor Percentage: ${((vendorSize / totalModuleSize) * 100).toFixed(1)}%\n`);

  // Performance recommendations
  console.log('💡 Optimization Recommendations:');
  console.log('================================\n');

  if (totalChunkSize > 2) {
    console.log('⚠️  Bundle size is large (>2MB). Consider:');
    console.log('   • Code splitting with dynamic imports');
    console.log('   • Tree shaking unused code');
    console.log('   • Lazy loading non-critical components');
  }

  if (chunks.length > 15) {
    console.log('⚠️  Too many chunks detected. Consider:');
    console.log('   • Consolidating small chunks');
    console.log('   • Adjusting splitChunks configuration');
  }

  const largeModules = sortedModules.filter((module) => module.size > 100 * 1024); // >100KB
  if (largeModules.length > 0) {
    console.log('⚠️  Large modules detected. Consider:');
    largeModules.forEach((module) => {
      const sizeKB = (module.size / 1024).toFixed(1);
      console.log(`   • ${module.name}: ${sizeKB} KB - Review for optimization`);
    });
  }

  // Check for duplicate modules
  const moduleNames = modules.map((m) => m.name).filter(Boolean);
  const duplicates = moduleNames.filter((name, index) => moduleNames.indexOf(name) !== index);
  if (duplicates.length > 0) {
    console.log('⚠️  Duplicate modules detected. Consider:');
    console.log('   • Consolidating duplicate imports');
    console.log('   • Using webpack alias for common modules');
  }

  console.log('\n✅ Bundle analysis complete!');
  console.log('📁 View detailed report: .next/analyze/bundle-analysis.html');
  console.log('📊 View stats: .next/analyze/webpack-stats.json');
} catch (error) {
  console.error('❌ Error analyzing bundle:', error.message);
  process.exit(1);
}
