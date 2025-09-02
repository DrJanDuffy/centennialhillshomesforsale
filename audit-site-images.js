#!/usr/bin/env node

/**
 * Comprehensive Site Image Audit
 * This script audits all images on the site and identifies missing/broken images
 */

const fs = require('node:fs');
const path = require('node:path');

console.log('🔍 Starting Comprehensive Site Image Audit...\n');

// Track issues
const issues = {
  missingImages: [],
  brokenReferences: [],
  optimizationIssues: [],
  accessibilityIssues: []
};

// Check if image exists
function checkImageExists(imagePath) {
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  return fs.existsSync(fullPath);
}

// Get image size
function getImageSize(imagePath) {
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    return {
      size: stats.size,
      sizeKB: Math.round(stats.size / 1024),
      sizeMB: Math.round(stats.size / (1024 * 1024) * 100) / 100
    };
  }
  return null;
}

// Audit property gallery images
function auditPropertyGallery() {
  console.log('📸 Auditing Property Gallery Images...');
  
  const galleryPath = 'public/assets/images/property-gallery/index.json';
  if (!fs.existsSync(galleryPath)) {
    issues.brokenReferences.push('Property gallery index.json not found');
    return;
  }

  const galleryData = JSON.parse(fs.readFileSync(galleryPath, 'utf8'));
  
  // Check property images
  galleryData.properties.forEach(property => {
    property.images.forEach(image => {
      const imagePath = image.src.replace('/assets/images/', 'assets/images/');
      if (!checkImageExists(imagePath)) {
        issues.missingImages.push({
          type: 'property-gallery',
          property: property.title,
          image: image.id,
          path: image.src,
          alt: image.alt
        });
      } else {
        const size = getImageSize(imagePath);
        if (size && size.sizeMB > 2) {
          issues.optimizationIssues.push({
            type: 'large-image',
            path: image.src,
            size: `${size.sizeMB}MB`,
            recommendation: 'Optimize image size'
          });
        }
      }
    });
  });

  // Check neighborhood images
  galleryData.neighborhoods.forEach(neighborhood => {
    const imagePath = neighborhood.heroImage.src.replace('/assets/images/', 'assets/images/');
    if (!checkImageExists(imagePath)) {
      issues.missingImages.push({
        type: 'neighborhood',
        name: neighborhood.name,
        path: neighborhood.heroImage.src,
        alt: neighborhood.heroImage.alt
      });
    }
  });
}

// Audit hero images
function auditHeroImages() {
  console.log('🎨 Auditing Hero Images...');
  
  const heroImagePath = 'images/hero-image.jpg';
  if (checkImageExists(heroImagePath)) {
    const size = getImageSize(heroImagePath);
    console.log(`✅ Hero image found: ${size.sizeMB}MB`);
    
    if (size.sizeMB > 1.5) {
      issues.optimizationIssues.push({
        type: 'hero-image-large',
        path: '/images/hero-image.jpg',
        size: `${size.sizeMB}MB`,
        recommendation: 'Consider compressing hero image'
      });
    }
  } else {
    issues.missingImages.push({
      type: 'hero',
      path: '/images/hero-image.jpg',
      description: 'Main hero image missing'
    });
  }
}

// Audit component image references
function auditComponentImages() {
  console.log('🧩 Auditing Component Image References...');
  
  const componentsDir = 'components';
  if (!fs.existsSync(componentsDir)) return;

  const componentFiles = fs.readdirSync(componentsDir)
    .filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'));

  componentFiles.forEach(file => {
    const filePath = path.join(componentsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for image references
    const imageMatches = content.match(/src=["']([^"']*\.(jpg|jpeg|png|webp|gif|svg))["']/g);
    if (imageMatches) {
      imageMatches.forEach(match => {
        const srcMatch = match.match(/src=["']([^"']*)["']/);
        if (srcMatch) {
          const imagePath = srcMatch[1];
          if (imagePath.startsWith('/')) {
            const publicPath = imagePath.substring(1);
            if (!checkImageExists(publicPath)) {
              issues.brokenReferences.push({
                component: file,
                path: imagePath,
                type: 'missing-image'
              });
            }
          }
        }
      });
    }

    // Check for alt text
    const altMatches = content.match(/alt=["']([^"']*)["']/g);
    if (altMatches) {
      altMatches.forEach(match => {
        const altMatch = match.match(/alt=["']([^"']*)["']/);
        if (altMatch && (altMatch[1] === '' || altMatch[1] === 'image')) {
          issues.accessibilityIssues.push({
            component: file,
            issue: 'Empty or generic alt text',
            alt: altMatch[1]
          });
        }
      });
    }
  });
}

// Generate report
function generateReport() {
  console.log('\n📊 AUDIT REPORT');
  console.log('================\n');

  // Missing Images
  if (issues.missingImages.length > 0) {
    console.log('❌ MISSING IMAGES:');
    issues.missingImages.forEach(issue => {
      console.log(`   • ${issue.type}: ${issue.path}`);
      if (issue.property) console.log(`     Property: ${issue.property}`);
      if (issue.image) console.log(`     Image: ${issue.image}`);
      if (issue.alt) console.log(`     Alt: ${issue.alt}`);
    });
    console.log('');
  }

  // Broken References
  if (issues.brokenReferences.length > 0) {
    console.log('🔗 BROKEN REFERENCES:');
    issues.brokenReferences.forEach(issue => {
      if (typeof issue === 'string') {
        console.log(`   • ${issue}`);
      } else {
        console.log(`   • ${issue.component}: ${issue.path}`);
      }
    });
    console.log('');
  }

  // Optimization Issues
  if (issues.optimizationIssues.length > 0) {
    console.log('⚡ OPTIMIZATION ISSUES:');
    issues.optimizationIssues.forEach(issue => {
      console.log(`   • ${issue.path}: ${issue.size} - ${issue.recommendation}`);
    });
    console.log('');
  }

  // Accessibility Issues
  if (issues.accessibilityIssues.length > 0) {
    console.log('♿ ACCESSIBILITY ISSUES:');
    issues.accessibilityIssues.forEach(issue => {
      console.log(`   • ${issue.component}: ${issue.issue}`);
    });
    console.log('');
  }

  // Summary
  const totalIssues = issues.missingImages.length + 
                     issues.brokenReferences.length + 
                     issues.optimizationIssues.length + 
                     issues.accessibilityIssues.length;

  if (totalIssues === 0) {
    console.log('✅ No issues found! Your images are properly configured.');
  } else {
    console.log(`📈 SUMMARY: ${totalIssues} issues found`);
    console.log(`   • Missing Images: ${issues.missingImages.length}`);
    console.log(`   • Broken References: ${issues.brokenReferences.length}`);
    console.log(`   • Optimization Issues: ${issues.optimizationIssues.length}`);
    console.log(`   • Accessibility Issues: ${issues.accessibilityIssues.length}`);
  }

  return issues;
}

// Main execution
async function main() {
  try {
    auditHeroImages();
    auditPropertyGallery();
    auditComponentImages();
    
    const report = generateReport();
    
    // Save report to file
    const reportPath = 'image-audit-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  }
}

main();
