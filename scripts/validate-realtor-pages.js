#
!/usr/bin / env
node;

const fs = require('node:fs');
const path = require('node:path');

console.log('🏠 REALTOR WEBSITE CODE VALIDATION');
console.log('===================================');

const validationResults = {
  pages: 0,
  errors: 0,
  warnings: 0,
  seoIssues: 0,
  fixed: 0,
};

// Critical realtor website requirements
const _realtorRequirements = {
  seo: {
    required: ['title', 'meta description', 'h1', 'structured data'],
    realEstateSpecific: ['property schema', 'local business schema', 'agent schema'],
  },
  compliance: {
    required: ['license disclosure', 'MLS disclaimer', 'equal housing'],
    recommended: ['privacy policy', 'terms of service'],
  },
  functionality: {
    required: ['contact forms', 'property search', 'lead capture'],
    recommended: ['mortgage calculator', 'market reports'],
  },
};

// Get all pages to validate
const pagesDir = 'pages';
const pages = fs
  .readdirSync(pagesDir)
  .filter((file) => file.endsWith('.tsx'))
  .filter((file) => !file.startsWith('_'));

console.log(`📄 Found ${pages.length} pages to validate...`);

pages.forEach((pageFile) => {
  const pagePath = path.join(pagesDir, pageFile);
  const content = fs.readFileSync(pagePath, 'utf8');
  const pageName = pageFile.replace('.tsx', '');

  console.log(`\n🔍 Validating ${pageName}...`);
  validationResults.pages++;

  // Check for SEO elements
  const hasSEO = content.includes('<Head>') || content.includes('EnhancedSEO');
  const _hasTitle = content.includes('<title>') || content.includes('title=');
  const _hasDescription = content.includes('description=');

  if (!hasSEO) {
    console.log(`  ❌ Missing SEO component`);
    validationResults.seoIssues++;
  } else {
    console.log(`  ✅ SEO component present`);
  }

  // Check for realtor-specific content
  const hasAgentInfo = content.includes('Jan Duffy') || content.includes('REALTOR');
  const hasLocalFocus = content.includes('Centennial Hills') || content.includes('Las Vegas');
  const _hasLicenseInfo = content.includes('Nevada') || content.includes('license');

  if (!hasAgentInfo) {
    console.log(`  ⚠️  Missing agent information`);
    validationResults.warnings++;
  }

  if (!hasLocalFocus) {
    console.log(`  ⚠️  Missing local market focus`);
    validationResults.warnings++;
  }

  // Check for contact information
  const hasPhone = content.includes('702-903-1952') || content.includes('phone');
  const hasEmail = content.includes('jan@') || content.includes('email');

  if (!hasPhone && !hasEmail) {
    console.log(`  ❌ Missing contact information`);
    validationResults.errors++;
  } else {
    console.log(`  ✅ Contact information present`);
  }
});

// Check components for realtor compliance
console.log('\n🧩 Validating Components...');
const componentsDir = 'components';
const components = fs.readdirSync(componentsDir).filter((file) => file.endsWith('.tsx'));

let hasLeadCapture = false;
let hasMortgageCalc = false;
let hasPropertySearch = false;

components.forEach((componentFile) => {
  const componentContent = fs.readFileSync(path.join(componentsDir, componentFile), 'utf8');

  if (componentContent.includes('LeadCapture') || componentContent.includes('lead')) {
    hasLeadCapture = true;
  }
  if (componentContent.includes('Mortgage') || componentContent.includes('calculator')) {
    hasMortgageCalc = true;
  }
  if (componentContent.includes('PropertySearch') || componentContent.includes('search')) {
    hasPropertySearch = true;
  }
});

console.log(`  ${hasLeadCapture ? '✅' : '❌'} Lead capture functionality`);
console.log(`  ${hasMortgageCalc ? '✅' : '❌'} Mortgage calculator`);
console.log(`  ${hasPropertySearch ? '✅' : '❌'} Property search`);

// Check for required legal pages
console.log('\n⚖️  Checking Legal Compliance...');
const requiredLegalPages = ['privacy', 'terms', 'disclosures'];
let legalCompliance = 0;

requiredLegalPages.forEach((legalPage) => {
  const exists = pages.some((page) => page.toLowerCase().includes(legalPage));
  console.log(`  ${exists ? '✅' : '❌'} ${legalPage} page`);
  if (exists) legalCompliance++;
});

// Generate report
console.log('\n📊 VALIDATION SUMMARY');
console.log('=====================');
console.log(`📄 Pages validated: ${validationResults.pages}`);
console.log(`❌ Critical errors: ${validationResults.errors}`);
console.log(`⚠️  Warnings: ${validationResults.warnings}`);
console.log(`🔍 SEO issues: ${validationResults.seoIssues}`);
console.log(`⚖️  Legal compliance: ${legalCompliance}/3 pages`);

const overallScore = Math.round(
  ((validationResults.pages - validationResults.errors - validationResults.seoIssues) /
    validationResults.pages) *
    100
);

console.log(`\n🎯 Overall Score: ${overallScore}%`);

if (overallScore >= 90) {
  console.log('🏆 EXCELLENT - Website meets realtor industry standards!');
} else if (overallScore >= 75) {
  console.log('✅ GOOD - Minor improvements recommended');
} else if (overallScore >= 60) {
  console.log('⚠️  NEEDS IMPROVEMENT - Several issues to address');
} else {
  console.log('❌ CRITICAL - Major issues require immediate attention');
}

// Save detailed report
const detailedReport = {
  timestamp: new Date().toISOString(),
  score: overallScore,
  summary: validationResults,
  compliance: {
    legalPages: legalCompliance,
    seoCompliance: validationResults.pages - validationResults.seoIssues,
    functionalCompliance: hasLeadCapture + hasMortgageCalc + hasPropertySearch,
  },
  recommendations: [],
};

if (validationResults.errors > 0) {
  detailedReport.recommendations.push('Fix critical errors affecting functionality');
}
if (validationResults.seoIssues > 0) {
  detailedReport.recommendations.push('Implement SEO components on all pages');
}
if (legalCompliance < 3) {
  detailedReport.recommendations.push('Add missing legal compliance pages');
}

fs.writeFileSync('validation-report.json', JSON.stringify(detailedReport, null, 2));
console.log('\n📋 Detailed report saved to validation-report.json');
