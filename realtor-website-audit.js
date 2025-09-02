#!/usr/bin/env node

/**
 * Real Estate Website Expert Audit
 * Comprehensive analysis from a realtor's perspective
 */

const fs = require('node:fs');
const path = require('node:path');

console.log('🏠 REAL ESTATE WEBSITE EXPERT AUDIT');
console.log('===================================\n');

// Track issues and recommendations
const auditResults = {
  critical: [],
  high: [],
  medium: [],
  low: [],
  recommendations: []
};

// Check if file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Check if directory exists
function dirExists(dirPath) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

// 1. AUDIT HOMEPAGE AND CORE PAGES
function auditCorePages() {
  console.log('📄 AUDITING CORE PAGES');
  console.log('======================\n');
  
  const criticalPages = [
    { path: 'pages/index.tsx', name: 'Homepage', priority: 'critical' },
    { path: 'pages/listings.tsx', name: 'Property Listings', priority: 'critical' },
    { path: 'pages/contact.tsx', name: 'Contact', priority: 'critical' },
    { path: 'pages/about.tsx', name: 'About', priority: 'high' },
    { path: 'pages/services.tsx', name: 'Services', priority: 'high' },
    { path: 'pages/testimonials.tsx', name: 'Testimonials', priority: 'high' }
  ];
  
  criticalPages.forEach(page => {
    if (fileExists(page.path)) {
      const stats = fs.statSync(page.path);
      console.log(`✅ ${page.name}: ${stats.size} bytes`);
    } else {
      console.log(`❌ ${page.name}: MISSING`);
      auditResults.critical.push(`Missing critical page: ${page.name}`);
    }
  });
  console.log('');
}

// 2. AUDIT NEIGHBORHOOD PAGES
function auditNeighborhoodPages() {
  console.log('🏘️  AUDITING NEIGHBORHOOD PAGES');
  console.log('===============================\n');
  
  const neighborhoods = [
    'centennial-hills',
    'providence-las-vegas', 
    'skye-canyon',
    'the-trails',
    'tournament-hills',
    'northwest-las-vegas'
  ];
  
  neighborhoods.forEach(neighborhood => {
    const pagePath = `pages/${neighborhood}.tsx`;
    if (fileExists(pagePath)) {
      const stats = fs.statSync(pagePath);
      console.log(`✅ ${neighborhood}: ${stats.size} bytes`);
    } else {
      console.log(`❌ ${neighborhood}: MISSING`);
      auditResults.high.push(`Missing neighborhood page: ${neighborhood}`);
    }
  });
  console.log('');
}

// 3. AUDIT LEAD CAPTURE FORMS
function auditLeadCapture() {
  console.log('📝 AUDITING LEAD CAPTURE');
  console.log('========================\n');
  
  // Check for lead capture components
  const leadComponents = [
    'components/FollowUpBossForm.tsx',
    'components/LeadCaptureForm.tsx',
    'components/EnhancedContactForm.tsx'
  ];
  
  leadComponents.forEach(component => {
    if (fileExists(component)) {
      const stats = fs.statSync(component);
      console.log(`✅ ${path.basename(component)}: ${stats.size} bytes`);
    } else {
      console.log(`❌ ${path.basename(component)}: MISSING`);
      auditResults.critical.push(`Missing lead capture component: ${path.basename(component)}`);
    }
  });
  
  // Check for Follow Up Boss integration
  if (fileExists('lib/follow-up-boss.ts')) {
    console.log('✅ Follow Up Boss API integration: Present');
  } else {
    console.log('❌ Follow Up Boss API integration: MISSING');
    auditResults.critical.push('Missing Follow Up Boss API integration');
  }
  console.log('');
}

// 4. AUDIT PROPERTY DISPLAY
function auditPropertyDisplay() {
  console.log('🏠 AUDITING PROPERTY DISPLAY');
  console.log('============================\n');
  
  // Check property gallery
  const galleryPath = 'public/assets/images/property-gallery';
  if (dirExists(galleryPath)) {
    const files = fs.readdirSync(galleryPath);
    const imageFiles = files.filter(f => f.endsWith('.svg') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
    console.log(`✅ Property Gallery: ${imageFiles.length} images`);
    
    if (imageFiles.length < 10) {
      auditResults.medium.push('Property gallery needs more images (recommended: 15-20)');
    }
  } else {
    console.log('❌ Property Gallery: MISSING');
    auditResults.critical.push('Missing property gallery directory');
  }
  
  // Check property components
  const propertyComponents = [
    'components/PropertyCard.tsx',
    'components/ModernFeaturedProperties.tsx',
    'components/SimpleInteriorGallery.tsx'
  ];
  
  propertyComponents.forEach(component => {
    if (fileExists(component)) {
      const stats = fs.statSync(component);
      console.log(`✅ ${path.basename(component)}: ${stats.size} bytes`);
    } else {
      console.log(`❌ ${path.basename(component)}: MISSING`);
      auditResults.high.push(`Missing property component: ${path.basename(component)}`);
    }
  });
  console.log('');
}

// 5. AUDIT SEO AND LOCAL SEARCH
function auditSEO() {
  console.log('🔍 AUDITING SEO & LOCAL SEARCH');
  console.log('==============================\n');
  
  // Check SEO components
  const seoComponents = [
    'components/GoogleSearchConsole.tsx',
    'components/SEOOptimized.tsx',
    'components/SEOAdvanced.tsx',
    'components/LocalSEOBooster.tsx'
  ];
  
  seoComponents.forEach(component => {
    if (fileExists(component)) {
      const stats = fs.statSync(component);
      console.log(`✅ ${path.basename(component)}: ${stats.size} bytes`);
    } else {
      console.log(`❌ ${path.basename(component)}: MISSING`);
      auditResults.high.push(`Missing SEO component: ${path.basename(component)}`);
    }
  });
  
  // Check for structured data
  if (fileExists('public/structured-data.json')) {
    console.log('✅ Structured Data: Present');
  } else {
    console.log('❌ Structured Data: MISSING');
    auditResults.high.push('Missing structured data for local business');
  }
  
  // Check for sitemap
  if (fileExists('public/sitemap.xml')) {
    console.log('✅ Sitemap: Present');
  } else {
    console.log('❌ Sitemap: MISSING');
    auditResults.medium.push('Missing XML sitemap');
  }
  
  // Check for robots.txt
  if (fileExists('public/robots.txt')) {
    console.log('✅ Robots.txt: Present');
  } else {
    console.log('❌ Robots.txt: MISSING');
    auditResults.medium.push('Missing robots.txt');
  }
  console.log('');
}

// 6. AUDIT MOBILE RESPONSIVENESS
function auditMobileResponsiveness() {
  console.log('📱 AUDITING MOBILE RESPONSIVENESS');
  console.log('=================================\n');
  
  // Check if Tailwind CSS is properly configured
  if (fileExists('tailwind.config.js')) {
    console.log('✅ Tailwind CSS: Configured');
  } else {
    console.log('❌ Tailwind CSS: MISSING');
    auditResults.critical.push('Missing Tailwind CSS configuration');
  }
  
  // Check for responsive components
  const responsiveComponents = [
    'components/EnhancedNavigation.tsx',
    'components/ModernHero.tsx',
    'components/PropertyCard.tsx'
  ];
  
  responsiveComponents.forEach(component => {
    if (fileExists(component)) {
      const content = fs.readFileSync(component, 'utf8');
      if (content.includes('sm:') || content.includes('md:') || content.includes('lg:')) {
        console.log(`✅ ${path.basename(component)}: Responsive classes found`);
      } else {
        console.log(`⚠️  ${path.basename(component)}: Limited responsive classes`);
        auditResults.medium.push(`${path.basename(component)} needs more responsive design`);
      }
    }
  });
  console.log('');
}

// 7. AUDIT PERFORMANCE AND ANALYTICS
function auditPerformance() {
  console.log('⚡ AUDITING PERFORMANCE & ANALYTICS');
  console.log('===================================\n');
  
  // Check for analytics
  const analyticsComponents = [
    'components/GoogleAnalytics.tsx',
    'components/GoogleTagManager.tsx',
    'components/SafeGoogleAnalytics.tsx'
  ];
  
  analyticsComponents.forEach(component => {
    if (fileExists(component)) {
      const stats = fs.statSync(component);
      console.log(`✅ ${path.basename(component)}: ${stats.size} bytes`);
    } else {
      console.log(`❌ ${path.basename(component)}: MISSING`);
      auditResults.high.push(`Missing analytics component: ${path.basename(component)}`);
    }
  });
  
  // Check for image optimization
  if (fileExists('components/OptimizedImage.tsx')) {
    console.log('✅ Image Optimization: Present');
  } else {
    console.log('❌ Image Optimization: MISSING');
    auditResults.high.push('Missing image optimization component');
  }
  
  // Check for performance config
  if (fileExists('public/performance-config.json')) {
    console.log('✅ Performance Config: Present');
  } else {
    console.log('❌ Performance Config: MISSING');
    auditResults.medium.push('Missing performance configuration');
  }
  console.log('');
}

// 8. AUDIT REAL ESTATE SPECIFIC FEATURES
function auditRealEstateFeatures() {
  console.log('🏡 AUDITING REAL ESTATE FEATURES');
  console.log('================================\n');
  
  // Check for mortgage calculator
  if (fileExists('components/MortgageCalculator.tsx')) {
    console.log('✅ Mortgage Calculator: Present');
  } else {
    console.log('❌ Mortgage Calculator: MISSING');
    auditResults.high.push('Missing mortgage calculator - critical for real estate');
  }
  
  // Check for property search
  if (fileExists('components/EnhancedPropertySearch.tsx')) {
    console.log('✅ Property Search: Present');
  } else {
    console.log('❌ Mortgage Calculator: MISSING');
    auditResults.critical.push('Missing property search functionality');
  }
  
  // Check for market data
  if (fileExists('pages/market-data.tsx')) {
    console.log('✅ Market Data: Present');
  } else {
    console.log('❌ Market Data: MISSING');
    auditResults.high.push('Missing market data page');
  }
  
  // Check for RealScout integration
  if (fileExists('components/RealScoutListings.tsx')) {
    console.log('✅ RealScout Integration: Present');
  } else {
    console.log('❌ RealScout Integration: MISSING');
    auditResults.high.push('Missing RealScout MLS integration');
  }
  
  // Check for interactive map
  if (fileExists('components/InteractivePropertyMap.tsx')) {
    console.log('✅ Interactive Map: Present');
  } else {
    console.log('❌ Interactive Map: MISSING');
    auditResults.high.push('Missing interactive property map');
  }
  console.log('');
}

// 9. GENERATE RECOMMENDATIONS
function generateRecommendations() {
  console.log('💡 EXPERT RECOMMENDATIONS');
  console.log('=========================\n');
  
  // Critical recommendations
  if (auditResults.critical.length > 0) {
    console.log('🚨 CRITICAL ISSUES (Fix Immediately):');
    auditResults.critical.forEach(issue => {
      console.log(`   • ${issue}`);
    });
    console.log('');
  }
  
  // High priority recommendations
  if (auditResults.high.length > 0) {
    console.log('⚠️  HIGH PRIORITY (Fix This Week):');
    auditResults.high.forEach(issue => {
      console.log(`   • ${issue}`);
    });
    console.log('');
  }
  
  // Medium priority recommendations
  if (auditResults.medium.length > 0) {
    console.log('📋 MEDIUM PRIORITY (Fix This Month):');
    auditResults.medium.forEach(issue => {
      console.log(`   • ${issue}`);
    });
    console.log('');
  }
  
  // Expert recommendations
  console.log('🎯 EXPERT REAL ESTATE RECOMMENDATIONS:');
  console.log('   • Add virtual tour integration (Matterport/3D tours)');
  console.log('   • Implement IDX/MLS feed integration');
  console.log('   • Add neighborhood school ratings and data');
  console.log('   • Create buyer/seller guides and resources');
  console.log('   • Add property comparison tool');
  console.log('   • Implement automated email drip campaigns');
  console.log('   • Add social proof (recent sales, testimonials)');
  console.log('   • Create neighborhood-specific landing pages');
  console.log('   • Add property valuation tool');
  console.log('   • Implement chat bot for instant lead qualification');
  console.log('');
}

// 10. GENERATE AUDIT REPORT
function generateAuditReport() {
  const report = {
    timestamp: new Date().toISOString(),
    totalIssues: auditResults.critical.length + auditResults.high.length + auditResults.medium.length + auditResults.low.length,
    critical: auditResults.critical.length,
    high: auditResults.high.length,
    medium: auditResults.medium.length,
    low: auditResults.low.length,
    issues: {
      critical: auditResults.critical,
      high: auditResults.high,
      medium: auditResults.medium,
      low: auditResults.low
    },
    recommendations: auditResults.recommendations
  };
  
  fs.writeFileSync('realtor-audit-report.json', JSON.stringify(report, null, 2));
  console.log('📊 Detailed audit report saved to: realtor-audit-report.json');
}

// Main execution
async function main() {
  try {
    auditCorePages();
    auditNeighborhoodPages();
    auditLeadCapture();
    auditPropertyDisplay();
    auditSEO();
    auditMobileResponsiveness();
    auditPerformance();
    auditRealEstateFeatures();
    generateRecommendations();
    generateAuditReport();
    
    console.log('🎉 Real Estate Website Audit Complete!');
    console.log('💡 Focus on critical and high priority issues first.');
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  }
}

main();
