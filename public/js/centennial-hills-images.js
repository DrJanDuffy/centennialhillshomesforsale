
// Centennial Hills specific image loader
const centennialHillsImages = [
  {
    src: '/images/centennial-hills/centennial-hills-hero.jpg',
    alt: 'Centennial Hills Community Overview',
    title: 'Beautiful Centennial Hills Neighborhood'
  },
  {
    src: '/images/centennial-hills/providence-community.jpg',
    alt: 'Providence Master Planned Community',
    title: 'Providence Luxury Homes'
  },
  {
    src: '/images/centennial-hills/skye-canyon-homes.jpg',
    alt: 'Skye Canyon Residential Area',
    title: 'Skye Canyon Family Homes'
  },
  {
    src: '/images/centennial-hills/tpc-las-vegas-golf.jpg',
    alt: 'TPC Las Vegas Golf Course',
    title: 'Golf Course Community Living'
  },
  {
    src: '/images/centennial-hills/red-rock-canyon-view.jpg',
    alt: 'Red Rock Canyon Views',
    title: 'Homes with Mountain Views'
  },
  {
    src: '/images/centennial-hills/downtown-summerlin.jpg',
    alt: 'Downtown Summerlin Shopping',
    title: 'Close to Downtown Summerlin'
  }
];

function loadCentennialHillsImages() {
  const container = document.getElementById('centennial-images');
  if (!container) return;

  container.innerHTML = '';
  
  centennialHillsImages.forEach((image, index) => {
    const imageElement = document.createElement('div');
    imageElement.className = 'property-image-item';
    imageElement.innerHTML = `
      <img src="${image.src}" alt="${image.alt}" loading="lazy" />
      <div class="image-overlay">
        <h3>${image.title}</h3>
      </div>
    `;
    container.appendChild(imageElement);
  });
}

// Load images when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCentennialHillsImages);
} else {
  loadCentennialHillsImages();
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.loadCentennialHillsImages = loadCentennialHillsImages;
}
