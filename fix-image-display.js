#!/usr/bin/env node

/**
 * Fix Image Display Issue
 * This script temporarily reverts to SVG placeholders until real JPG images are added
 */

const fs = require('node:fs');
const path = require('node:path');

console.log('🔧 Fixing Image Display Issue...\n');

// Check what images actually exist
function checkExistingImages() {
  console.log('📋 Checking existing images...\n');
  
  const propertyGalleryDir = 'public/assets/images/property-gallery';
  const neighborhoodsDir = 'public/assets/images/neighborhoods';
  
  // Check property gallery
  if (fs.existsSync(propertyGalleryDir)) {
    const files = fs.readdirSync(propertyGalleryDir);
    const jpgFiles = files.filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
    const svgFiles = files.filter(f => f.endsWith('.svg'));
    
    console.log(`🏠 Property Gallery Directory: ${propertyGalleryDir}`);
    console.log(`   JPG files: ${jpgFiles.length} (${jpgFiles.join(', ') || 'none'})`);
    console.log(`   SVG files: ${svgFiles.length} (${svgFiles.join(', ') || 'none'})\n`);
  }
  
  // Check neighborhoods
  if (fs.existsSync(neighborhoodsDir)) {
    const files = fs.readdirSync(neighborhoodsDir);
    const jpgFiles = files.filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
    const svgFiles = files.filter(f => f.endsWith('.svg'));
    
    console.log(`🏘️  Neighborhoods Directory: ${neighborhoodsDir}`);
    console.log(`   JPG files: ${jpgFiles.length} (${jpgFiles.join(', ') || 'none'})`);
    console.log(`   SVG files: ${svgFiles.length} (${svgFiles.join(', ') || 'none'})\n`);
  }
}

// Revert JSON to use SVG placeholders temporarily
function revertToSVGPlaceholders() {
  console.log('🔄 Reverting to SVG placeholders...\n');
  
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
    console.log('✅ Reverted property gallery JSON to use SVG placeholders');
    console.log('   This will fix the broken image display temporarily\n');
  } else {
    console.log('ℹ️  JSON already uses SVG references\n');
  }
}

// Generate instructions for adding real images
function generateImageInstructions() {
  console.log('📝 INSTRUCTIONS FOR ADDING REAL IMAGES');
  console.log('=====================================\n');
  
  console.log('🔍 CURRENT SITUATION:');
  console.log('   • JSON is looking for JPG files');
  console.log('   • Only SVG placeholder files exist');
  console.log('   • This causes broken image display\n');
  
  console.log('✅ SOLUTION - Add your real images:');
  console.log('   1. Save your property photos with these exact filenames:');
  console.log('      📁 public/assets/images/property-gallery/');
  console.log('         • luxury-estate-exterior-main.jpg');
  console.log('         • luxury-estate-kitchen.jpg');
  console.log('         • luxury-estate-living-room.jpg');
  console.log('         • luxury-estate-master-bedroom.jpg');
  console.log('         • luxury-estate-bathroom.jpg');
  console.log('         • luxury-estate-hallway.jpg');
  console.log('         • modern-home-exterior-main.jpg');
  console.log('         • modern-home-kitchen.jpg');
  console.log('         • modern-home-living-room.jpg');
  console.log('         • modern-home-bedroom.jpg');
  console.log('         • providence-villa-exterior-main.jpg');
  console.log('         • providence-villa-kitchen.jpg');
  console.log('         • providence-villa-living-room.jpg\n');
  
  console.log('      📁 public/assets/images/neighborhoods/');
  console.log('         • centennial-hills-hero.jpg');
  console.log('         • providence-hero.jpg');
  console.log('         • skye-canyon-hero.jpg\n');
  
  console.log('   2. After adding JPG files, run this command to update JSON:');
  console.log('      node update-image-references.js\n');
  
  console.log('   3. Test your website to see the real images\n');
  
  console.log('💡 TIP: You can use any image editing software to:');
  console.log('   • Resize images to recommended dimensions');
  console.log('   • Compress images to 500KB-1MB each');
  console.log('   • Save as JPG format with 85-90% quality\n');
}

// Main execution
async function main() {
  try {
    checkExistingImages();
    revertToSVGPlaceholders();
    generateImageInstructions();
    
    console.log('🎉 Image display issue fixed temporarily!');
    console.log('   Your site will now show SVG placeholders instead of broken images.');
    console.log('   Follow the instructions above to add your real property photos.');
    
  } catch (error) {
    console.error('❌ Failed to fix image display:', error.message);
    process.exit(1);
  }
}

main();
