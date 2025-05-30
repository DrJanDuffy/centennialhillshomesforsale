
// Centennial Hills Local Image Manager
// Automatically loads location-specific images for the website

document.addEventListener('DOMContentLoaded', function() {
  
  // Configuration for different page types
  const imageConfig = {
    home: {
      containerId: 'hero-images',
      query: 'Las Vegas luxury homes TPC golf',
      count: 6
    },
    neighborhoods: {
      containerId: 'neighborhood-images', 
      query: 'Las Vegas master planned community',
      count: 8
    },
    centennialHills: {
      containerId: 'centennial-images',
      query: 'Las Vegas Red Rock Canyon golf homes',
      count: 10
    },
    providence: {
      containerId: 'providence-images',
      query: 'Las Vegas family community homes',
      count: 6
    },
    skyeCanyon: {
      containerId: 'skye-canyon-images', 
      query: 'Las Vegas mountain view luxury homes',
      count: 8
    }
  };

  // Auto-detect page type and load appropriate images
  async function loadPageImages() {
    const pathname = window.location.pathname;
    let config;
    
    if (pathname.includes('centennial-hills')) {
      config = imageConfig.centennialHills;
    } else if (pathname.includes('providence')) {
      config = imageConfig.providence;
    } else if (pathname.includes('skye-canyon')) {
      config = imageConfig.skyeCanyon;
    } else if (pathname.includes('neighborhoods')) {
      config = imageConfig.neighborhoods;
    } else {
      config = imageConfig.home;
    }
    
    // Check if container exists
    const container = document.getElementById(config.containerId);
    if (!container) {
      console.log(`Image container ${config.containerId} not found on this page`);
      return;
    }
    
    try {
      const images = await fetchRealEstateImages(config.query, config.count);
      displayRealEstateImages(images, config.containerId);
    } catch (error) {
      console.error('Error loading local images:', error);
    }
  }

  // Load images if Unsplash functions are available
  if (typeof fetchRealEstateImages === 'function') {
    loadPageImages();
  } else {
    console.log('Unsplash integration not loaded');
  }
});

// Utility function to refresh images for a specific area
function refreshAreaImages(area) {
  const areaQueries = {
    'centennial-hills': 'Las Vegas TPC golf luxury homes',
    'providence': 'Las Vegas family community master planned',
    'skye-canyon': 'Las Vegas mountain desert luxury homes',
    'northwest': 'Las Vegas northwest suburbs homes'
  };
  
  const query = areaQueries[area] || 'Las Vegas luxury real estate';
  fetchRealEstateImages(query, 8).then(images => {
    const containerId = `${area}-images`;
    displayRealEstateImages(images, containerId);
  });
}
