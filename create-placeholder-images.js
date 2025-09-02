#!/usr/bin/env node

/**
 * Create Placeholder Images for Missing Property Gallery Images
 * This script creates placeholder images for all missing property gallery images
 */

const fs = require('node:fs');
const path = require('node:path');

console.log('🎨 Creating Placeholder Images for Missing Property Gallery Images...\n');

// Create directories if they don't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

// Create a simple SVG placeholder
function createSVGPlaceholder(width, height, text, bgColor = '#f3f4f6', textColor = '#6b7280') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="${textColor}" text-anchor="middle" dy=".3em">${text}</text>
</svg>`;
}

// Create placeholder images
const placeholderImages = [
  // Property Gallery Images
  {
    path: 'public/assets/images/property-gallery/luxury-estate-exterior-main.jpg',
    width: 1920,
    height: 1080,
    text: 'Luxury Estate Exterior',
    bgColor: '#1e40af',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/property-gallery/luxury-estate-kitchen.jpg',
    width: 1600,
    height: 1200,
    text: 'Gourmet Kitchen',
    bgColor: '#059669',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/property-gallery/luxury-estate-master-bedroom.jpg',
    width: 1600,
    height: 1200,
    text: 'Master Bedroom',
    bgColor: '#7c3aed',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/property-gallery/luxury-estate-pool.jpg',
    width: 1600,
    height: 1200,
    text: 'Resort-Style Pool',
    bgColor: '#0891b2',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/property-gallery/modern-home-exterior-main.jpg',
    width: 1920,
    height: 1080,
    text: 'Modern Home Exterior',
    bgColor: '#dc2626',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/property-gallery/modern-home-living-room.jpg',
    width: 1600,
    height: 1200,
    text: 'Open Living Room',
    bgColor: '#ea580c',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/property-gallery/modern-home-kitchen.jpg',
    width: 1600,
    height: 1200,
    text: 'Modern Kitchen',
    bgColor: '#16a34a',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/property-gallery/providence-villa-exterior-main.jpg',
    width: 1920,
    height: 1080,
    text: 'Providence Villa',
    bgColor: '#9333ea',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/property-gallery/providence-villa-wine-cellar.jpg',
    width: 1600,
    height: 1200,
    text: 'Wine Cellar',
    bgColor: '#be123c',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/property-gallery/providence-villa-home-theater.jpg',
    width: 1600,
    height: 1200,
    text: 'Home Theater',
    bgColor: '#1f2937',
    textColor: '#ffffff'
  },
  // Neighborhood Images
  {
    path: 'public/assets/images/neighborhoods/centennial-hills-hero.jpg',
    width: 1920,
    height: 1080,
    text: 'Centennial Hills',
    bgColor: '#0f766e',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/neighborhoods/providence-hero.jpg',
    width: 1920,
    height: 1080,
    text: 'Providence',
    bgColor: '#7c2d12',
    textColor: '#ffffff'
  },
  {
    path: 'public/assets/images/neighborhoods/skye-canyon-hero.jpg',
    width: 1920,
    height: 1080,
    text: 'Skye Canyon',
    bgColor: '#365314',
    textColor: '#ffffff'
  }
];

async function createPlaceholderImages() {
  let createdCount = 0;
  
  for (const image of placeholderImages) {
    const dirPath = path.dirname(image.path);
    const fileName = path.basename(image.path, path.extname(image.path));
    const svgPath = path.join(dirPath, `${fileName}.svg`);
    
    // Ensure directory exists
    ensureDirectoryExists(dirPath);
    
    // Create SVG placeholder
    const svgContent = createSVGPlaceholder(
      image.width, 
      image.height, 
      image.text, 
      image.bgColor, 
      image.textColor
    );
    
    // Write SVG file
    fs.writeFileSync(svgPath, svgContent);
    console.log(`✅ Created: ${svgPath}`);
    createdCount++;
  }
  
  console.log(`\n🎉 Successfully created ${createdCount} placeholder images!`);
  console.log('\n📝 Note: These are SVG placeholders. For production, replace with actual high-quality images.');
  console.log('   The placeholders will prevent broken image errors and provide visual feedback.');
}

// Main execution
async function main() {
  try {
    await createPlaceholderImages();
  } catch (error) {
    console.error('❌ Failed to create placeholder images:', error.message);
    process.exit(1);
  }
}

main();
