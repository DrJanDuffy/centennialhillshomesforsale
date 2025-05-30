
const fs = require('fs');
const https = require('https');
const path = require('path');

// Centennial Hills specific image URLs from Unsplash
const centennialHillsImages = [
  {
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    filename: 'centennial-hills-hero.jpg',
    alt: 'Luxury home in Centennial Hills Las Vegas with mountain views'
  },
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    filename: 'tpc-las-vegas-golf.jpg',
    alt: 'TPC Las Vegas Golf Course in Centennial Hills'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    filename: 'providence-community.jpg',
    alt: 'Providence community homes in Centennial Hills'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    filename: 'skye-canyon-homes.jpg',
    alt: 'Skye Canyon luxury homes with desert landscaping'
  },
  {
    url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    filename: 'red-rock-canyon-view.jpg',
    alt: 'Red Rock Canyon view from Centennial Hills'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    filename: 'downtown-summerlin.jpg',
    alt: 'Downtown Summerlin shopping near Centennial Hills'
  },
  {
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    filename: 'luxury-pool-home.jpg',
    alt: 'Luxury home with pool in Centennial Hills'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    filename: 'modern-kitchen.jpg',
    alt: 'Modern kitchen in Centennial Hills home'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753051-7ad96c264e34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    filename: 'master-bedroom.jpg',
    alt: 'Master bedroom in Centennial Hills luxury home'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    filename: 'backyard-entertaining.jpg',
    alt: 'Backyard entertaining space in Centennial Hills'
  }
];

function downloadImage(imageData) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '..', 'public', 'images', 'centennial-hills', imageData.filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(imageData.url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${imageData.filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete incomplete file
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('Downloading Centennial Hills specific images...');
  
  try {
    for (const imageData of centennialHillsImages) {
      await downloadImage(imageData);
      // Small delay to be respectful to the server
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('All Centennial Hills images downloaded successfully!');
    
    // Create image manifest
    const manifest = {
      lastUpdated: new Date().toISOString(),
      images: centennialHillsImages.map(img => ({
        filename: img.filename,
        alt: img.alt,
        localPath: `/images/centennial-hills/${img.filename}`
      }))
    };
    
    fs.writeFileSync(
      path.join(__dirname, '..', 'public', 'images', 'centennial-hills', 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
    
    console.log('Image manifest created!');
    
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

// Run if called directly
if (require.main === module) {
  downloadAllImages();
}

module.exports = { downloadAllImages, centennialHillsImages };
