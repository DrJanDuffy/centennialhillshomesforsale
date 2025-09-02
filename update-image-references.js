#!/usr/bin/env node

/**
 * Update Image References in JSON Files
 * This script updates all image references from .jpg to .svg in the property gallery JSON
 */

const fs = require('node:fs');
const _path = require('node:path');

console.log('🔄 Updating Image References in JSON Files...\n');

// Update property gallery JSON
function updatePropertyGalleryJSON() {
  const jsonPath = 'public/assets/images/property-gallery/index.json';

  if (!fs.existsSync(jsonPath)) {
    console.log('❌ Property gallery JSON not found');
    return;
  }

  let content = fs.readFileSync(jsonPath, 'utf8');

  // Replace all .jpg references with .svg
  const originalContent = content;
  content = content.replace(/\.jpg/g, '.svg');

  if (content !== originalContent) {
    fs.writeFileSync(jsonPath, content);
    console.log('✅ Updated property gallery JSON references');
  } else {
    console.log('ℹ️  No changes needed in property gallery JSON');
  }
}

// Main execution
async function main() {
  try {
    updatePropertyGalleryJSON();
    console.log('\n🎉 Image references updated successfully!');
  } catch (error) {
    console.error('❌ Failed to update image references:', error.message);
    process.exit(1);
  }
}

main();
