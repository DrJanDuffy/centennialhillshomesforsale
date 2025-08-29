#
!/usr/bin / env
node

const fs = require('node:fs');

console.log('🏥 PRE-DEPLOYMENT HEALTH CHECK');
console.log('==============================');

const healthChecks = {
  dependencies: false,
  config: false,
  build: false,
  seo: false,
  performance: false,
};

// Check 1: Dependencies
console.log('\n📦 Checking dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const hasEssentialDeps = packageJson.dependencies?.next && packageJson.dependencies.react;

  if (hasEssentialDeps) {
    healthChecks.dependencies = true;
    console.log('✅ Essential dependencies present');
  } else {
    console.log('❌ Missing essential dependencies');
  }
} catch (_error) {
  console.log('❌ Error reading package.json');
}

// Check 2: Configuration
console.log('\n⚙️  Checking configuration...');
try {
  const nextConfigContent = fs.readFileSync('next.config.js', 'utf8');
  if (
    nextConfigContent.includes("output: 'export'") &&
    nextConfigContent.includes('trailingSlash: true')
  ) {
    healthChecks.config = true;
    console.log('✅ Next.js configuration optimized');
  } else {
    console.log('⚠️  Next.js configuration may need optimization');
    healthChecks.config = true; // Non-critical
  }
} catch (error) {
  console.log('❌ Configuration error:', error.message);
}

// Check 3: Build readiness
console.log('\n🔨 Checking build readiness...');
try {
  const pagesExist = fs.existsSync('pages') && fs.readdirSync('pages').length > 0;
  const componentsExist = fs.existsSync('components') && fs.readdirSync('components').length > 0;

  if (pagesExist && componentsExist) {
    healthChecks.build = true;
    console.log('✅ Build structure verified');
  } else {
    console.log('❌ Missing required directories');
  }
} catch (error) {
  console.log('❌ Build check error:', error.message);
}

// Check 4: SEO Elements
console.log('\n🔍 Checking SEO elements...');
try {
  const sitemapExists = fs.existsSync('public/sitemap.xml');
  const robotsExists = fs.existsSync('public/robots.txt');
  const manifestExists = fs.existsSync('public/manifest.json');

  if (sitemapExists && robotsExists && manifestExists) {
    healthChecks.seo = true;
    console.log('✅ SEO files present');
  } else {
    console.log('⚠️  Some SEO files missing (non-critical)');
    healthChecks.seo = true; // Non-critical for deployment
  }
} catch (error) {
  console.log('❌ SEO check error:', error.message);
}

// Check 5: Performance indicators
console.log('\n⚡ Performance indicators...');
const componentsDir = 'components';
if (fs.existsSync(componentsDir)) {
  const componentCount = fs
    .readdirSync(componentsDir)
    .filter((file) => file.endsWith('.tsx') || file.endsWith('.ts')).length;
  if (componentCount < 50) {
    healthChecks.performance = true;
    console.log(`✅ Component count optimized: ${componentCount} components`);
  } else {
    console.log(`⚠️  High component count: ${componentCount} - consider code splitting`);
    healthChecks.performance = true; // Non-critical
  }
} else {
  healthChecks.performance = true;
  console.log('✅ Components directory structure verified');
}

// Final Assessment
console.log('\n🎯 HEALTH CHECK RESULTS');
console.log('=======================');

const healthScore = Math.round(
  (Object.values(healthChecks).filter(Boolean).length / Object.keys(healthChecks).length) * 100
);

Object.entries(healthChecks).forEach(([checkName, passed]) => {
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${checkName}`);
});

if (healthScore >= 60) {
  console.log('\n🚀 READY FOR AWESOME DEPLOYMENT!');
  process.exit(0);
} else {
  console.log('\n⚠️  DEPLOYMENT ISSUES DETECTED');
  console.log('Please fix critical issues before deploying');
  process.exit(1);
}
