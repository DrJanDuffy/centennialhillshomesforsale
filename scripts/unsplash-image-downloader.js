#!/usr/bin/env node

/**
 * Unsplash Image Downloader for Real Estate
 * Downloads high-quality real estate images from Unsplash API
 */

const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');

console.log('📸 Unsplash Real Estate Image Downloader');
console.log('========================================\n');

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'demo_key';
const UNSPLASH_API_URL = 'https://api.unsplash.com';

// Image specifications
const imageRequests = [
  // Hero Images
  {
    category: 'hero',
    filename: 'luxury-mountain-view.jpg',
    searchQuery: 'luxury home exterior mountain view',
    width: 1920,
    height: 1080,
    description: 'Luxury home with mountain views',
  },
  {
    category: 'hero',
    filename: 'golf-course-living.jpg',
    searchQuery: 'golf course home luxury community',
    width: 1920,
    height: 1080,
    description: 'Golf course community home',
  },
  {
    category: 'hero',
    filename: 'new-construction.jpg',
    searchQuery: 'new construction modern home exterior',
    width: 1920,
    height: 1080,
    description: 'New construction modern home',
  },

  // Property Exteriors
  {
    category: 'properties/exteriors',
    filename: 'luxury-estate-exterior-main.jpg',
    searchQuery: 'luxury estate exterior modern architecture',
    width: 1600,
    height: 1200,
    description: 'Luxury estate exterior',
  },
  {
    category: 'properties/exteriors',
    filename: 'modern-home-exterior-main.jpg',
    searchQuery: 'modern home exterior contemporary',
    width: 1600,
    height: 1200,
    description: 'Modern home exterior',
  },
  {
    category: 'properties/exteriors',
    filename: 'providence-villa-exterior-main.jpg',
    searchQuery: 'luxury villa exterior gated community',
    width: 1600,
    height: 1200,
    description: 'Providence villa exterior',
  },

  // Property Interiors
  {
    category: 'properties/interiors',
    filename: 'luxury-estate-kitchen.jpg',
    searchQuery: 'luxury kitchen modern appliances',
    width: 1600,
    height: 1200,
    description: 'Luxury estate kitchen',
  },
  {
    category: 'properties/interiors',
    filename: 'luxury-estate-living-room.jpg',
    searchQuery: 'luxury living room modern fireplace',
    width: 1600,
    height: 1200,
    description: 'Luxury estate living room',
  },
  {
    category: 'properties/interiors',
    filename: 'luxury-estate-master-bedroom.jpg',
    searchQuery: 'luxury master bedroom modern',
    width: 1600,
    height: 1200,
    description: 'Luxury master bedroom',
  },
  {
    category: 'properties/interiors',
    filename: 'luxury-estate-bathroom.jpg',
    searchQuery: 'luxury bathroom modern vanity',
    width: 1600,
    height: 1200,
    description: 'Luxury master bathroom',
  },
  {
    category: 'properties/interiors',
    filename: 'modern-home-kitchen.jpg',
    searchQuery: 'modern kitchen island contemporary',
    width: 1600,
    height: 1200,
    description: 'Modern home kitchen',
  },
  {
    category: 'properties/interiors',
    filename: 'modern-home-living-room.jpg',
    searchQuery: 'modern living room open concept',
    width: 1600,
    height: 1200,
    description: 'Modern home living room',
  },
  {
    category: 'properties/interiors',
    filename: 'modern-home-bedroom.jpg',
    searchQuery: 'modern bedroom contemporary design',
    width: 1600,
    height: 1200,
    description: 'Modern home bedroom',
  },

  // Neighborhood Images
  {
    category: 'neighborhoods',
    filename: 'centennial-hills-aerial.jpg',
    searchQuery: 'aerial view residential neighborhood',
    width: 1920,
    height: 1080,
    description: 'Centennial Hills aerial view',
  },
  {
    category: 'neighborhoods',
    filename: 'providence-entrance.jpg',
    searchQuery: 'gated community entrance luxury',
    width: 1920,
    height: 1080,
    description: 'Providence community entrance',
  },
  {
    category: 'neighborhoods',
    filename: 'skye-canyon-landscape.jpg',
    searchQuery: 'mountain community natural landscape',
    width: 1920,
    height: 1080,
    description: 'Skye Canyon landscape',
  },
];

// Create directories
function createDirectories() {
  console.log('📁 Creating directories...');

  const directories = [
    'public/images/hero',
    'public/images/properties/exteriors',
    'public/images/properties/interiors',
    'public/images/neighborhoods',
  ];

  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`   ✅ Created: ${dir}`);
    }
  });
}

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        } else {
          reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        }
      })
      .on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(err);
      });
  });
}

// Search Unsplash for images
async function searchUnsplash(query, width, height) {
  return new Promise((resolve, reject) => {
    const encodedQuery = encodeURIComponent(query);
    const url = `${UNSPLASH_API_URL}/search/photos?query=${encodedQuery}&per_page=10&orientation=landscape&w=${width}&h=${height}`;

    const options = {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        'Accept-Version': 'v1',
      },
    };

    https
      .get(url, options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (result.results && result.results.length > 0) {
              resolve(result.results[0]); // Return first result
            } else {
              reject(new Error('No images found'));
            }
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', reject);
  });
}

// Download all images
async function downloadAllImages() {
  console.log('\n📸 Downloading images from Unsplash...\n');

  if (UNSPLASH_ACCESS_KEY === 'demo_key') {
    console.log('⚠️  Demo mode: No Unsplash API key provided');
    console.log(
      '   To download real images, get a free API key from: https://unsplash.com/developers'
    );
    console.log('   Then set UNSPLASH_ACCESS_KEY environment variable\n');

    // Generate demo instructions instead
    generateDemoInstructions();
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  for (const request of imageRequests) {
    try {
      console.log(`🔍 Searching: ${request.description}`);
      console.log(`   Query: "${request.searchQuery}"`);

      const imageData = await searchUnsplash(request.searchQuery, request.width, request.height);

      const filepath = path.join('public/images', request.category, request.filename);
      const imageUrl = `${imageData.urls.raw}&w=${request.width}&h=${request.height}&fit=crop`;

      console.log(`   📥 Downloading: ${request.filename}`);
      await downloadImage(imageUrl, filepath);

      console.log(`   ✅ Saved: ${filepath}`);
      successCount++;

      // Add small delay to respect rate limits
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      errorCount++;
    }

    console.log('');
  }

  console.log(`\n📊 Download Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📁 Total: ${imageRequests.length}`);
}

// Generate demo instructions
function generateDemoInstructions() {
  console.log('📋 MANUAL DOWNLOAD INSTRUCTIONS');
  console.log('===============================\n');

  console.log('🌐 Go to these sites and search for:');
  console.log('\n📸 Hero Images (1920x1080):');
  console.log('   1. Unsplash.com → Search: "luxury home exterior mountain view"');
  console.log('   2. Unsplash.com → Search: "golf course home luxury community"');
  console.log('   3. Unsplash.com → Search: "new construction modern home exterior"');

  console.log('\n🏠 Property Images (1600x1200):');
  console.log(
    '   Exteriors: "luxury estate exterior", "modern home exterior", "luxury villa exterior"'
  );
  console.log(
    '   Interiors: "luxury kitchen modern", "luxury living room", "luxury master bedroom"'
  );
  console.log('   More: "luxury bathroom", "modern kitchen island", "modern living room"');

  console.log('\n🏘️ Neighborhood Images (1920x1080):');
  console.log('   1. "aerial view residential neighborhood"');
  console.log('   2. "gated community entrance luxury"');
  console.log('   3. "mountain community natural landscape"');

  console.log('\n💡 Tips:');
  console.log('   • Filter by "Free to use" or "Unsplash License"');
  console.log('   • Download highest resolution available');
  console.log('   • Save with exact filenames specified');
  console.log('   • Use WebP format for best performance');
}

// Main execution
async function main() {
  try {
    createDirectories();
    await downloadAllImages();

    console.log('\n✅ Image download process complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Verify all images downloaded correctly');
    console.log('   2. Optimize images for web (compress, convert to WebP)');
    console.log('   3. Update component references to use new images');
    console.log('   4. Test image loading and performance');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
