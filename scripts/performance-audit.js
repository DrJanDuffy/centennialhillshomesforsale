#
!/usr/bin / env
node;

const fs = require('node:fs');
const path = require('node:path');

console.log('⚡ REALTOR WEBSITE PERFORMANCE AUDIT');
console.log('====================================');

const performanceMetrics = {
  bundleSize: 0,
  imageOptimization: 0,
  codeEfficiency: 0,
  loadingStrategy: 0,
};

// Check bundle size and dependencies
console.log('📦 Analyzing bundle size...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const depCount = Object.keys(packageJson.dependencies || {}).length;
  const devDepCount = Object.keys(packageJson.devDependencies || {}).length;

  console.log(`  📋 Dependencies: ${depCount}`);
  console.log(`  🛠️  Dev dependencies: ${devDepCount}`);

  // Check for heavy dependencies
  const heavyDeps = ['lodash', 'moment', 'jquery'];
  const foundHeavyDeps = heavyDeps.filter((dep) => packageJson.dependencies?.[dep]);

  if (foundHeavyDeps.length > 0) {
    console.log(`  ⚠️  Heavy dependencies found: ${foundHeavyDeps.join(', ')}`);
    performanceMetrics.bundleSize = 60;
  } else {
    console.log(`  ✅ No heavy dependencies detected`);
    performanceMetrics.bundleSize = 90;
  }
} catch (_error) {
  console.log('  ❌ Error reading package.json');
  performanceMetrics.bundleSize = 50;
}

// Check image optimization
console.log('\n🖼️  Checking image optimization...');
const publicDir = 'public';
let totalImages = 0;
let optimizedImages = 0;

if (fs.existsSync(publicDir)) {
  const files = fs.readdirSync(publicDir, { recursive: true });
  const imageFiles = files.filter(
    (file) => typeof file === 'string' && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
  );

  totalImages = imageFiles.length;
  optimizedImages = imageFiles.filter(
    (file) => file.includes('.webp') || file.includes('-optimized') || file.includes('@2x')
  ).length;

  console.log(`  📊 Total images: ${totalImages}`);
  console.log(`  ✅ Optimized images: ${optimizedImages}`);

  if (totalImages > 0) {
    const optimizationRate = (optimizedImages / totalImages) * 100;
    performanceMetrics.imageOptimization = optimizationRate;
    console.log(`  🎯 Optimization rate: ${Math.round(optimizationRate)}%`);
  }
}

// Check component efficiency
console.log('\n⚙️  Analyzing component efficiency...');
const componentsDir = 'components';
let efficientComponents = 0;
let totalComponents = 0;

if (fs.existsSync(componentsDir)) {
  const componentFiles = fs.readdirSync(componentsDir).filter((file) => file.endsWith('.tsx'));

  totalComponents = componentFiles.length;

  componentFiles.forEach((file) => {
    const content = fs.readFileSync(path.join(componentsDir, file), 'utf8');

    // Check for performance optimizations
    const hasUseMemo = content.includes('useMemo');
    const hasUseCallback = content.includes('useCallback');
    const hasLazyLoading = content.includes('lazy') || content.includes('Suspense');
    const hasDynamicImport = content.includes('dynamic');

    const optimizations = [hasUseMemo, hasUseCallback, hasLazyLoading, hasDynamicImport].filter(
      Boolean
    ).length;

    if (optimizations >= 1) {
      efficientComponents++;
    }
  });

  const efficiencyRate = totalComponents > 0 ? (efficientComponents / totalComponents) * 100 : 0;
  performanceMetrics.codeEfficiency = efficiencyRate;

  console.log(`  📋 Total components: ${totalComponents}`);
  console.log(`  ⚡ Optimized components: ${efficientComponents}`);
  console.log(`  🎯 Efficiency rate: ${Math.round(efficiencyRate)}%`);
}

// Check loading strategies
console.log('\n🚀 Checking loading strategies...');
const indexPath = 'pages/index.tsx';
let loadingScore = 0;

if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');

  const strategies = {
    'Code splitting': indexContent.includes('dynamic') || indexContent.includes('lazy'),
    'Image optimization': indexContent.includes('next/image') || indexContent.includes('loading='),
    'Font optimization':
      indexContent.includes('next/font') || indexContent.includes('font-display'),
    Preloading: indexContent.includes('preload') || indexContent.includes('prefetch'),
    'Error boundaries': indexContent.includes('ErrorBoundary'),
  };

  Object.entries(strategies).forEach(([strategy, implemented]) => {
    console.log(`  ${implemented ? '✅' : '❌'} ${strategy}`);
    if (implemented) loadingScore += 20;
  });

  performanceMetrics.loadingStrategy = loadingScore;
}

// Calculate overall performance score
const overallScore = Math.round(
  (performanceMetrics.bundleSize +
    performanceMetrics.imageOptimization +
    performanceMetrics.codeEfficiency +
    performanceMetrics.loadingStrategy) /
    4
);

console.log('\n📊 PERFORMANCE SUMMARY');
console.log('======================');
console.log(`📦 Bundle optimization: ${Math.round(performanceMetrics.bundleSize)}%`);
console.log(`🖼️  Image optimization: ${Math.round(performanceMetrics.imageOptimization)}%`);
console.log(`⚙️  Code efficiency: ${Math.round(performanceMetrics.codeEfficiency)}%`);
console.log(`🚀 Loading strategy: ${Math.round(performanceMetrics.loadingStrategy)}%`);
console.log(`\n🎯 Overall Performance Score: ${overallScore}%`);

// Performance recommendations for realtor websites
console.log('\n💡 REALTOR WEBSITE RECOMMENDATIONS');
console.log('===================================');

if (performanceMetrics.imageOptimization < 80) {
  console.log('📸 PRIORITY: Optimize property images with WebP format');
  console.log('   • Use next/image for automatic optimization');
  console.log('   • Implement lazy loading for property galleries');
  console.log('   • Add responsive image sizes for mobile');
}

if (performanceMetrics.loadingStrategy < 60) {
  console.log('🚀 PRIORITY: Implement progressive loading');
  console.log('   • Add loading states for property search');
  console.log('   • Implement skeleton screens for listings');
  console.log('   • Use code splitting for non-critical features');
}

if (performanceMetrics.bundleSize < 70) {
  console.log('📦 PRIORITY: Reduce bundle size');
  console.log('   • Remove unused dependencies');
  console.log('   • Use tree shaking for external libraries');
  console.log('   • Consider lighter alternatives for heavy libraries');
}

// Save performance report
const performanceReport = {
  timestamp: new Date().toISOString(),
  score: overallScore,
  metrics: performanceMetrics,
  recommendations: {
    critical: overallScore < 70 ? ['Bundle size optimization', 'Image optimization'] : [],
    medium: overallScore < 85 ? ['Loading strategy improvement', 'Code efficiency'] : [],
    low: ['Progressive enhancement', 'Advanced caching'],
  },
};

fs.writeFileSync('performance-report.json', JSON.stringify(performanceReport, null, 2));
console.log('\n📋 Performance report saved to performance-report.json');

if (overallScore >= 90) {
  console.log('\n🏆 EXCELLENT - Website performance optimized for real estate!');
} else if (overallScore >= 75) {
  console.log('\n✅ GOOD - Minor performance improvements recommended');
} else {
  console.log('\n⚠️  NEEDS OPTIMIZATION - Performance issues may affect lead generation');
}
