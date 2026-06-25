#!/usr/bin/env node
/**
 * RealScout integration verifier — run in CI or before production push.
 * Exit 0 = pass, 1 = fail.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function fileExists(rel) {
  return fs.existsSync(path.join(root, rel));
}

// 1. Single script loader in Layout
const layout = read('components/Layout.tsx');
if (!layout.includes('RealScoutScript')) {
  errors.push('components/Layout.tsx must import and render <RealScoutScript />');
}

// 2. No duplicate script tag in _document
const doc = read('pages/_document.tsx');
if (doc.includes('realscout-web-components.umd.js') && doc.includes('<script')) {
  errors.push('pages/_document.tsx must not load realscout-web-components.umd.js (use RealScoutScript only)');
}

// 3. Central config
if (!fileExists('lib/realscout-config.ts')) {
  errors.push('lib/realscout-config.ts is missing');
}

// 4. Client wrapper exists
if (!fileExists('components/RealScoutOfficeListings.tsx')) {
  errors.push('components/RealScoutOfficeListings.tsx is missing');
}

// 5. Section uses client wrapper
const section = read('components/RealScoutListingsSection.tsx');
if (!section.includes('RealScoutOfficeListings')) {
  errors.push('RealScoutListingsSection must use RealScoutOfficeListings client wrapper');
}

// 6. Marketing pages: RealScoutListingsSection present
const pagesDir = path.join(root, 'pages');
const skipPages = new Set(['_app.tsx', '_document.tsx', '404.tsx', 'luxury-hero-test.tsx', 'shadcn-test.tsx']);
const marketingPages = fs
  .readdirSync(pagesDir)
  .filter((f) => f.endsWith('.tsx') && !skipPages.has(f));

const missingWidget = [];
const missingBelowHero = [];

for (const file of marketingPages) {
  const content = read(path.join('pages', file));
  if (!content.includes('RealScoutListingsSection')) {
    missingWidget.push(file);
    continue;
  }

  const heroIdx = Math.max(
    content.indexOf('className="hero-section"'),
    content.indexOf('{/* Hero Section */}'),
    content.indexOf('<HomeHero'),
    content.indexOf('className="business-hero"'),
    content.indexOf('className="verification-hero"'),
    content.indexOf('className="testimonials-hero"')
  );
  const sectionIdx = content.indexOf('<RealScoutListingsSection');

  if (heroIdx !== -1 && sectionIdx !== -1 && sectionIdx < heroIdx) {
    missingBelowHero.push(file);
  }
}

if (missingWidget.length) {
  warnings.push(`Pages without RealScoutListingsSection: ${missingWidget.join(', ')}`);
}
if (missingBelowHero.length) {
  errors.push(`RealScout section appears before hero on: ${missingBelowHero.join(', ')}`);
}

// 7. Raw custom elements outside wrapper (excluding listings.tsx your-listings widget)
const rawWidgetPages = [];
for (const file of marketingPages) {
  const content = read(path.join('pages', file));
  if (content.includes('<realscout-office-listings') && file !== 'listings.tsx') {
    rawWidgetPages.push(file);
  }
}
if (rawWidgetPages.length) {
  warnings.push(`Raw <realscout-office-listings> in pages (prefer RealScoutListingsSection): ${rawWidgetPages.join(', ')}`);
}

console.log('RealScout verification');
console.log('─'.repeat(40));
if (warnings.length) {
  console.log('Warnings:');
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}
if (errors.length) {
  console.log('Errors:');
  for (const e of errors) console.log(`  ✗ ${e}`);
  process.exit(1);
}

console.log(`✓ Passed (${marketingPages.length} marketing pages checked)`);
process.exit(0);
