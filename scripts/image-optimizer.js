#!/usr/bin/env node

/**
 * Image Optimization Script
 * Analyzes and optimizes images for better performance
 */

const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

console.log('🖼️  Centennial Hills Homes - Image Optimization');
console.log('================================================\n');

// Image optimization configuration
const config = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 85,
  formats: ['webp', 'avif'],
  directories: ['public', 'components', 'pages'],
  extensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
};

// Find all images in the project
function findImages(dir, extensions) {
  const images = [];

  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);

    items.forEach((item) => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('.') && !item.startsWith('node_modules')) {
        scanDirectory(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        if (extensions.includes(ext)) {
          images.push({
            path: fullPath,
            relativePath: path.relative(process.cwd(), fullPath),
            size: stat.size,
            extension: ext,
          });
        }
      }
    });
  }

  scanDirectory(dir);
  return images;
}

// Analyze image sizes and provide recommendations
function analyzeImages(images) {
  console.log('📊 Image Analysis Results');
  console.log('=========================\n');

  const totalSize = images.reduce((sum, img) => sum + img.size, 0);
  const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);

  console.log(`📦 Total Images: ${images.length}`);
  console.log(`💾 Total Size: ${totalSizeMB} MB\n`);

  // Group by extension
  const byExtension = images.reduce((acc, img) => {
    acc[img.extension] = acc[img.extension] || [];
    acc[img.extension].push(img);
    return acc;
  }, {});

  Object.entries(byExtension).forEach(([ext, imgs]) => {
    const extSize = imgs.reduce((sum, img) => sum + img.size, 0);
    const extSizeMB = (extSize / 1024 / 1024).toFixed(2);
    const avgSize = (extSize / imgs.length / 1024).toFixed(1);

    console.log(
      `${ext.toUpperCase()}: ${imgs.length} images, ${extSizeMB} MB (avg: ${avgSize} KB)`
    );
  });

  // Find large images
  const largeImages = images.filter((img) => img.size > 500 * 1024); // >500KB
  if (largeImages.length > 0) {
    console.log(`\n⚠️  Large Images (>500KB):`);
    largeImages.forEach((img) => {
      const sizeKB = (img.size / 1024).toFixed(1);
      console.log(`   • ${img.relativePath}: ${sizeKB} KB`);
    });
  }

  // Find images that could be converted to WebP
  const convertibleImages = images.filter((img) =>
    ['.jpg', '.jpeg', '.png'].includes(img.extension)
  );

  if (convertibleImages.length > 0) {
    console.log(`\n🔄 Convertible to WebP: ${convertibleImages.length} images`);
    console.log(`   Estimated size reduction: ${(convertibleImages.length * 0.3).toFixed(1)} MB`);
  }

  return {
    totalImages: images.length,
    totalSize: totalSize,
    largeImages: largeImages.length,
    convertibleImages: convertibleImages.length,
  };
}

// Generate optimization recommendations
function generateRecommendations(analysis) {
  console.log('\n💡 Optimization Recommendations');
  console.log('===============================\n');

  if (analysis.largeImages > 0) {
    console.log('📏 Large Images:');
    console.log('   • Compress images above 500KB');
    console.log('   • Use appropriate dimensions for display size');
    console.log('   • Consider lazy loading for below-the-fold images\n');
  }

  if (analysis.convertibleImages > 0) {
    console.log('🔄 WebP Conversion:');
    console.log('   • Convert JPG/PNG to WebP format');
    console.log('   • Provide fallback formats for older browsers');
    console.log('   • Use Next.js Image component for automatic optimization\n');
  }

  console.log('🚀 General Optimizations:');
  console.log('   • Use responsive images with srcset');
  console.log('   • Implement lazy loading with Intersection Observer');
  console.log('   • Optimize hero images with priority loading');
  console.log('   • Use appropriate image dimensions');
  console.log('   • Enable compression and caching headers');
  console.log('   • Consider using a CDN for image delivery\n');

  console.log('📱 Next.js Image Component:');
  console.log('   • Import and use the OptimizedImage component');
  console.log('   • Set appropriate quality and sizes attributes');
  console.log('   • Use fill prop for responsive images');
  console.log('   • Enable WebP format support\n');
}

// Generate optimization report
function generateReport(analysis) {
  const report = {
    timestamp: new Date().toISOString(),
    analysis,
    recommendations: {
      immediate: analysis.largeImages > 0 || analysis.convertibleImages > 0,
      priority: 'high',
      estimatedSavings: `${(analysis.convertibleImages * 0.3).toFixed(1)} MB`,
    },
    nextSteps: [
      'Run npm run images:optimize to apply optimizations',
      'Update components to use OptimizedImage component',
      'Configure Next.js image optimization settings',
      'Test performance improvements with Lighthouse',
    ],
  };

  const reportPath = path.join(process.cwd(), 'image-optimization-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log('📄 Report generated: image-optimization-report.json');
  return report;
}

// Main execution
try {
  console.log('🔍 Scanning for images...\n');

  const images = findImages(process.cwd(), config.extensions);

  if (images.length === 0) {
    console.log('✅ No images found to optimize!');
    process.exit(0);
  }

  const analysis = analyzeImages(images);
  generateRecommendations(analysis);
  generateReport(analysis);

  console.log('✅ Image analysis complete!');
  console.log('\n🚀 Next steps:');
  console.log('   1. Review the analysis above');
  console.log('   2. Check image-optimization-report.json for details');
  console.log('   3. Use the OptimizedImage component in your code');
  console.log('   4. Run npm run optimize:all for comprehensive optimization');
} catch (error) {
  console.error('❌ Error during image optimization:', error.message);
  process.exit(1);
}
