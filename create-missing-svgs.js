#!/usr/bin/env node

/**
 * Create Missing SVG Placeholder Images
 * This script creates the specific missing SVG placeholders identified by the audit
 */

const fs = require('node:fs');
const path = require('node:path');

console.log('🎨 Creating Missing SVG Placeholder Images...\n');

// Create a simple SVG placeholder
function createSVGPlaceholder(width, height, text, bgColor = '#f3f4f6', textColor = '#6b7280') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="${textColor}" text-anchor="middle" dy=".3em">${text}</text>
</svg>`;
}

// Create the missing placeholder images
const missingImages = [
  {
    path: 'public/assets/images/property-gallery/luxury-estate-living-room.svg',
    width: 1600,
    height: 1200,
    text: 'Living Room',
    bgColor: '#7c3aed',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/property-gallery/luxury-estate-bathroom.svg',
    width: 1600,
    height: 1200,
    text: 'Bathroom',
    bgColor: '#0891b2',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/property-gallery/luxury-estate-hallway.svg',
    width: 1600,
    height: 1200,
    text: 'Hallway',
    bgColor: '#059669',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/property-gallery/modern-home-bedroom.svg',
    width: 1600,
    height: 1200,
    text: 'Bedroom',
    bgColor: '#dc2626',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/property-gallery/providence-villa-kitchen.svg',
    width: 1600,
    height: 1200,
    text: 'Kitchen',
    bgColor: '#16a34a',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/property-gallery/providence-villa-living-room.svg',
    width: 1600,
    height: 1200,
    text: 'Living Room',
    bgColor: '#ea580c',
    textColor: '#ffffff'
  }
];

async function createMissingImages() {
  let createdCount = 0;
  
  for (const image of missingImages) {
    const dirPath = path.dirname(image.path);
    
    // Ensure directory exists
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`📁 Created directory: ${dirPath}`);
    }
    
    // Create SVG placeholder
    const svgContent = createSVGPlaceholder(
      image.width, 
      image.height, 
      image.text, 
      image.bgColor, 
      image.textColor
    );
    
    // Write SVG file
    fs.writeFileSync(image.path, svgContent);
    console.log(`✅ Created: ${image.path}`);
    createdCount++;
  }
  
  console.log(`\n🎉 Successfully created ${createdCount} missing placeholder images!`);
}

// Main execution
async function main() {
  try {
    await createMissingImages();
  } catch (error) {
    console.error('❌ Failed to create missing images:', error.message);
    process.exit(1);
  }
}

main();
