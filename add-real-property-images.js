#!/usr/bin/env node

/**
 * Add Real Property Images to Replace Placeholders
 * This script helps organize and add real property images to the gallery
 */

const fs = require('node:fs');
const _path = require('node:path');

console.log('🏠 Adding Real Property Images to Gallery...\n');

// Define the real images you want to add
const realImages = [
  // Luxury Estate Images
  {
    category: 'luxury-estate',
    type: 'exterior',
    filename: 'luxury-estate-exterior-main.jpg',
    description: 'Luxury estate with modern architecture and mountain views',
    alt: 'Luxury estate exterior with modern design and landscaping',
  },
  {
    category: 'luxury-estate',
    type: 'kitchen',
    filename: 'luxury-estate-kitchen.jpg',
    description: 'Gourmet kitchen with dark granite and white cabinets',
    alt: 'Modern gourmet kitchen with dark countertops and stainless appliances',
  },
  {
    category: 'luxury-estate',
    type: 'living-room',
    filename: 'luxury-estate-living-room.jpg',
    description: 'Open concept living room with fireplace and modern finishes',
    alt: 'Spacious living room with built-in fireplace and modern design',
  },
  {
    category: 'luxury-estate',
    type: 'bedroom',
    filename: 'luxury-estate-master-bedroom.jpg',
    description: 'Master bedroom with walk-in closet and en-suite bathroom',
    alt: 'Master bedroom with built-in closet and modern bathroom access',
  },
  {
    category: 'luxury-estate',
    type: 'bathroom',
    filename: 'luxury-estate-bathroom.jpg',
    description: 'Luxury bathroom with double vanity and modern fixtures',
    alt: 'Master bathroom with double vanity and contemporary design',
  },
  {
    category: 'luxury-estate',
    type: 'hallway',
    filename: 'luxury-estate-hallway.jpg',
    description: 'Elegant hallway with staircase and natural lighting',
    alt: 'Interior hallway with wooden staircase and plantation shutters',
  },

  // Modern Family Home Images
  {
    category: 'modern-home',
    type: 'exterior',
    filename: 'modern-home-exterior-main.jpg',
    description: 'Contemporary family home with clean lines',
    alt: 'Modern family home exterior with contemporary architecture',
  },
  {
    category: 'modern-home',
    type: 'kitchen',
    filename: 'modern-home-kitchen.jpg',
    description: 'Modern kitchen with island and premium appliances',
    alt: 'Contemporary kitchen with large island and black appliances',
  },
  {
    category: 'modern-home',
    type: 'living-room',
    filename: 'modern-home-living-room.jpg',
    description: 'Open living space with modern fireplace and large windows',
    alt: 'Open concept living room with modern fireplace and natural light',
  },
  {
    category: 'modern-home',
    type: 'bedroom',
    filename: 'modern-home-bedroom.jpg',
    description: 'Spacious bedroom with modern finishes and natural light',
    alt: 'Modern bedroom with neutral colors and contemporary design',
  },

  // Providence Villa Images
  {
    category: 'providence-villa',
    type: 'exterior',
    filename: 'providence-villa-exterior-main.jpg',
    description: 'Luxury villa in exclusive Providence community',
    alt: 'Luxury villa exterior in prestigious Providence neighborhood',
  },
  {
    category: 'providence-villa',
    type: 'kitchen',
    filename: 'providence-villa-kitchen.jpg',
    description: 'Gourmet kitchen with premium finishes and appliances',
    alt: 'Luxury kitchen with high-end appliances and custom cabinetry',
  },
  {
    category: 'providence-villa',
    type: 'living-room',
    filename: 'providence-villa-living-room.jpg',
    description: 'Grand living space with modern fireplace and open design',
    alt: 'Spacious living room with modern fireplace and open floor plan',
  },

  // Neighborhood Images
  {
    category: 'neighborhood',
    type: 'centennial-hills',
    filename: 'centennial-hills-hero.jpg',
    description: 'Aerial view of Centennial Hills community',
    alt: 'Aerial view of Centennial Hills residential community',
  },
  {
    category: 'neighborhood',
    type: 'providence',
    filename: 'providence-hero.jpg',
    description: 'Exclusive Providence community entrance',
    alt: 'Providence gated community entrance and landscaping',
  },
  {
    category: 'neighborhood',
    type: 'skye-canyon',
    filename: 'skye-canyon-hero.jpg',
    description: 'Skye Canyon natural landscape and trails',
    alt: 'Skye Canyon community with natural landscape and hiking trails',
  },
];

// Create directories for organized images
function createImageDirectories() {
  const directories = [
    'public/assets/images/property-gallery',
    'public/assets/images/neighborhoods',
    'public/assets/images/interior-photos',
  ];

  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
}

// Generate image organization guide
function generateImageGuide() {
  console.log('📋 IMAGE ORGANIZATION GUIDE');
  console.log('==========================\n');

  console.log('🏠 PROPERTY GALLERY IMAGES:');
  console.log('   Location: public/assets/images/property-gallery/');
  console.log('   Categories: luxury-estate, modern-home, providence-villa\n');

  console.log('🏘️  NEIGHBORHOOD IMAGES:');
  console.log('   Location: public/assets/images/neighborhoods/');
  console.log('   Categories: centennial-hills, providence, skye-canyon\n');

  console.log('📸 INTERIOR PHOTOS:');
  console.log('   Location: public/assets/images/interior-photos/');
  console.log('   Categories: kitchen, living-room, bedroom, bathroom, hallway\n');

  console.log('📝 RECOMMENDED IMAGE SPECIFICATIONS:');
  console.log('   • Format: JPG or WebP');
  console.log('   • Exterior images: 1920x1080px (16:9 ratio)');
  console.log('   • Interior images: 1600x1200px (4:3 ratio)');
  console.log('   • File size: 500KB - 1MB per image');
  console.log('   • Quality: 85-90% compression\n');

  console.log('🛠️  OPTIMIZATION TOOLS:');
  console.log('   • Online: TinyPNG, Squoosh.app, ImageOptim');
  console.log('   • Desktop: Photoshop, GIMP, ImageMagick');
  console.log('   • Command line: sharp, imagemin\n');
}

// Generate updated JSON structure
function generateUpdatedJSON() {
  const updatedGallery = {
    properties: [
      {
        id: 'luxury-mountain-view-estate',
        title: 'Luxury Mountain View Estate',
        description: 'Stunning 5-bedroom estate with panoramic mountain views in Centennial Hills',
        images: [
          {
            id: 'exterior-main',
            src: '/assets/images/property-gallery/luxury-estate-exterior-main.jpg',
            alt: 'Luxury estate exterior with modern design and landscaping',
            width: 1920,
            height: 1080,
            priority: true,
            category: 'exterior',
          },
          {
            id: 'kitchen',
            src: '/assets/images/property-gallery/luxury-estate-kitchen.jpg',
            alt: 'Modern gourmet kitchen with dark countertops and stainless appliances',
            width: 1600,
            height: 1200,
            priority: false,
            category: 'interior',
          },
          {
            id: 'living-room',
            src: '/assets/images/property-gallery/luxury-estate-living-room.jpg',
            alt: 'Spacious living room with built-in fireplace and modern design',
            width: 1600,
            height: 1200,
            priority: false,
            category: 'interior',
          },
          {
            id: 'master-bedroom',
            src: '/assets/images/property-gallery/luxury-estate-master-bedroom.jpg',
            alt: 'Master bedroom with built-in closet and modern bathroom access',
            width: 1600,
            height: 1200,
            priority: false,
            category: 'interior',
          },
          {
            id: 'bathroom',
            src: '/assets/images/property-gallery/luxury-estate-bathroom.jpg',
            alt: 'Master bathroom with double vanity and contemporary design',
            width: 1600,
            height: 1200,
            priority: false,
            category: 'interior',
          },
          {
            id: 'hallway',
            src: '/assets/images/property-gallery/luxury-estate-hallway.jpg',
            alt: 'Interior hallway with wooden staircase and plantation shutters',
            width: 1600,
            height: 1200,
            priority: false,
            category: 'interior',
          },
        ],
        neighborhood: 'Centennial Hills',
        price: 1250000,
        beds: 5,
        baths: 4.5,
        sqft: 4200,
      },
      {
        id: 'modern-family-home',
        title: 'Modern Family Home',
        description: 'Contemporary 4-bedroom home with open floor plan and modern amenities',
        images: [
          {
            id: 'exterior-main',
            src: '/assets/images/property-gallery/modern-home-exterior-main.jpg',
            alt: 'Modern family home exterior with contemporary architecture',
            width: 1920,
            height: 1080,
            priority: true,
            category: 'exterior',
          },
          {
            id: 'kitchen',
            src: '/assets/images/property-gallery/modern-home-kitchen.jpg',
            alt: 'Contemporary kitchen with large island and black appliances',
            width: 1600,
            height: 1200,
            priority: false,
            category: 'interior',
          },
          {
            id: 'living-room',
            src: '/assets/images/property-gallery/modern-home-living-room.jpg',
            alt: 'Open concept living room with modern fireplace and natural light',
            width: 1600,
            height: 1200,
            priority: false,
            category: 'interior',
          },
          {
            id: 'bedroom',
            src: '/assets/images/property-gallery/modern-home-bedroom.jpg',
            alt: 'Modern bedroom with neutral colors and contemporary design',
            width: 1600,
            height: 1200,
            priority: false,
            category: 'interior',
          },
        ],
        neighborhood: 'Centennial Hills',
        price: 850000,
        beds: 4,
        baths: 3,
        sqft: 2800,
      },
      {
        id: 'providence-luxury-villa',
        title: 'Providence Luxury Villa',
        description: 'Exclusive 6-bedroom villa in the prestigious Providence community',
        images: [
          {
            id: 'exterior-main',
            src: '/assets/images/property-gallery/providence-villa-exterior-main.jpg',
            alt: 'Luxury villa exterior in prestigious Providence neighborhood',
            width: 1920,
            height: 1080,
            priority: true,
            category: 'exterior',
          },
          {
            id: 'kitchen',
            src: '/assets/images/property-gallery/providence-villa-kitchen.jpg',
            alt: 'Luxury kitchen with high-end appliances and custom cabinetry',
            width: 1600,
            height: 1200,
            priority: false,
            category: 'interior',
          },
          {
            id: 'living-room',
            src: '/assets/images/property-gallery/providence-villa-living-room.jpg',
            alt: 'Spacious living room with modern fireplace and open floor plan',
            width: 1600,
            height: 1200,
            priority: false,
            category: 'interior',
          },
        ],
        neighborhood: 'Providence',
        price: 1650000,
        beds: 6,
        baths: 5.5,
        sqft: 5800,
      },
    ],
    neighborhoods: [
      {
        id: 'centennial-hills',
        name: 'Centennial Hills',
        description: 'Master-planned community with mountain views and family amenities',
        heroImage: {
          src: '/assets/images/neighborhoods/centennial-hills-hero.jpg',
          alt: 'Aerial view of Centennial Hills residential community',
          width: 1920,
          height: 1080,
        },
        amenities: ['Parks', 'Schools', 'Shopping', 'Dining', 'Recreation'],
      },
      {
        id: 'providence',
        name: 'Providence',
        description: 'Exclusive gated community with luxury homes and resort-style living',
        heroImage: {
          src: '/assets/images/neighborhoods/providence-hero.jpg',
          alt: 'Providence gated community entrance and landscaping',
          width: 1920,
          height: 1080,
        },
        amenities: ['Gated Community', 'Clubhouse', 'Pool', 'Tennis', 'Golf'],
      },
      {
        id: 'skye-canyon',
        name: 'Skye Canyon',
        description: 'Nature-inspired community with hiking trails and outdoor recreation',
        heroImage: {
          src: '/assets/images/neighborhoods/skye-canyon-hero.jpg',
          alt: 'Skye Canyon community with natural landscape and hiking trails',
          width: 1920,
          height: 1080,
        },
        amenities: ['Hiking Trails', 'Parks', 'Community Center', 'Fitness', 'Nature'],
      },
    ],
    optimization: {
      formats: ['webp', 'avif', 'jpeg'],
      breakpoints: [320, 640, 768, 1024, 1280, 1920],
      quality: 85,
      compression: 'progressive',
      lazyLoading: true,
      priorityImages: ['hero', 'exterior-main'],
      placeholderTypes: ['shimmer', 'empty', 'blur'],
    },
  };

  // Save the updated JSON
  const jsonPath = 'public/assets/images/property-gallery/index.json';
  fs.writeFileSync(jsonPath, JSON.stringify(updatedGallery, null, 2));
  console.log('✅ Updated property gallery JSON with real image references');
}

// Generate file naming guide
function generateFileNamingGuide() {
  console.log('📝 FILE NAMING GUIDE');
  console.log('===================\n');

  console.log('🏠 PROPERTY GALLERY FILES:');
  realImages
    .filter((img) => img.category !== 'neighborhood')
    .forEach((img) => {
      console.log(`   ${img.filename} - ${img.description}`);
    });

  console.log('\n🏘️  NEIGHBORHOOD FILES:');
  realImages
    .filter((img) => img.category === 'neighborhood')
    .forEach((img) => {
      console.log(`   ${img.filename} - ${img.description}`);
    });

  console.log('\n📋 NEXT STEPS:');
  console.log('   1. Save your images with the exact filenames listed above');
  console.log('   2. Place them in the correct directories');
  console.log('   3. Optimize images to recommended sizes');
  console.log('   4. Run the image audit to verify everything is working');
  console.log('   5. Test the property gallery on your website\n');
}

// Main execution
async function main() {
  try {
    createImageDirectories();
    generateImageGuide();
    generateUpdatedJSON();
    generateFileNamingGuide();

    console.log('🎉 Real property images setup complete!');
    console.log('\n💡 TIP: Use the file naming guide above to organize your images.');
    console.log('   The JSON has been updated to reference real images instead of placeholders.');
  } catch (error) {
    console.error('❌ Failed to setup real property images:', error.message);
    process.exit(1);
  }
}

main();
