// Unsplash API Configuration
const config = {
  accessKey: '123abc456def789ghi', // Replace with your actual Unsplash access key
  appName: 'CentennialHillsHomesForSale',
};

// Function to fetch real estate images
async function fetchRealEstateImages(query = 'Las Vegas real estate', count = 10) {
  try {
    const localQueries = [
      'Las Vegas luxury homes',
      'Nevada desert homes',
      'Las Vegas golf course homes',
      'Southwest architecture homes',
      'Las Vegas master planned community',
      'Nevada suburban homes',
      'Desert landscape homes Las Vegas',
      'Modern Las Vegas homes',
      'Las Vegas mountain view homes',
      'Southwest style real estate',
    ];

    const randomQuery = localQueries[Math.floor(Math.random() * localQueries.length)];
    const searchQuery = query.includes('Las Vegas') ? query : `${randomQuery} ${query}`;
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=${count}&orientation=landscape`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${config.accessKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    return [];
  }
}

// Function to fetch Centennial Hills specific images
async function _fetchCentennialHillsImages(count = 12) {
  const centennialHillsQueries = [
    'Las Vegas TPC golf course homes',
    'Nevada luxury gated community',
    'Las Vegas Red Rock Canyon homes',
    'Desert oasis luxury homes',
    'Las Vegas championship golf homes',
    'Southwest luxury real estate',
    'Nevada master planned community homes',
    'Las Vegas mountain view luxury homes',
    'Desert modern architecture homes',
    'Las Vegas upscale neighborhood',
    'Nevada golf course real estate',
    'Las Vegas premium homes',
  ];

  try {
    const results = [];
    const queries = centennialHillsQueries.slice(0, Math.min(count, centennialHillsQueries.length));

    for (const query of queries) {
      const images = await fetchRealEstateImages(query, 1);
      if (images.length > 0) {
        results.push(images[0]);
      }
    }

    return results;
  } catch (error) {
    console.error('Error fetching Centennial Hills images:', error);
    return [];
  }
}

// Function to render images
function displayRealEstateImages(images, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  images.forEach((image) => {
    const card = document.createElement('div');
    card.className = 'property-image-card';

    const img = document.createElement('img');
    const width = 800;
    const height = 600;

    img.src = `${image.urls.regular}&w=${width}&h=${height}&fit=crop`;
    img.style.backgroundImage = `url(${image.urls.thumb})`;
    img.style.backgroundSize = 'cover';
    img.style.backgroundPosition = 'center';

    img.alt = image.alt_description || 'Real estate property image';
    img.className = 'property-image';

    let locationText = '';
    if (image.location?.name) {
      locationText = `<div class="location-info">${image.location.name}</div>`;
    } else {
      locationText = `<div class="location-info">Centennial Hills Style Home</div>`;
    }

    const attribution = document.createElement('div');
    attribution.className = 'photo-attribution';
    attribution.innerHTML = `
      Photo by <a href="${image.user.links.html}?utm_source=${config.appName}&utm_medium=referral" target="_blank">${image.user.name}</a> 
      on <a href="https://unsplash.com/?utm_source=${config.appName}&utm_medium=referral" target="_blank">Unsplash</a>
      ${locationText}
    `;

    card.appendChild(img);
    card.appendChild(attribution);
    container.appendChild(card);
  });
}

// Function to get a single random featured image
async function _getRandomFeaturedImage(propertyType) {
  try {
    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(propertyType)}&orientation=landscape`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${config.accessKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching random image:', error);
    return null;
  }
}

// Function to load images for specific property types
function loadPropertyTypeImages(propertyType, containerId) {
  let query = 'real estate';

  switch (propertyType.toLowerCase()) {
    case 'luxury':
      query = 'luxury home mansion interior';
      break;
    case 'apartment':
      query = 'modern apartment condo interior';
      break;
    case 'rural':
      query = 'farm ranch countryside home';
      break;
    case 'commercial':
      query = 'commercial property office building';
      break;
    case 'beachfront':
      query = 'beach house ocean view';
      break;
    case 'mountain':
      query = 'mountain cabin home retreat';
      break;
    default:
      query = `${propertyType} home`;
  }

  fetchRealEstateImages(query, 6).then((images) => displayRealEstateImages(images, containerId));
}

// Function to create a property gallery slider
function createPropertyGallerySlider(propertyId, imageCount = 5) {
  const propertyType = document.getElementById(propertyId).getAttribute('data-property-type');
  const query = `${propertyType} real estate property`;

  fetchRealEstateImages(query, imageCount).then((images) => {
    const container = document.getElementById(`${propertyId}-slider`);
    if (!container) return;

    let sliderHtml = '<div class="property-slider">';
    sliderHtml += '<div class="slider-container">';

    images.forEach((image, index) => {
      sliderHtml += `
          <div class="slide ${index === 0 ? 'active' : ''}">
            <img src="${image.urls.regular}" alt="${image.alt_description || 'Property image'}" />
            <div class="attribution">
              Photo by <a href="${image.user.links.html}?utm_source=${config.appName}&utm_medium=referral" target="_blank">${image.user.name}</a> 
              on <a href="https://unsplash.com/?utm_source=${config.appName}&utm_medium=referral" target="_blank">Unsplash</a>
            </div>
          </div>
        `;
    });

    sliderHtml += '</div>';
    sliderHtml += '<button class="slider-nav prev">❮</button>';
    sliderHtml += '<button class="slider-nav next">❯</button>';
    sliderHtml += '</div>';

    container.innerHTML = sliderHtml;

    // Add event listeners for navigation
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');

    let currentSlide = 0;
    const slides = container.querySelectorAll('.slide');

    prevBtn.addEventListener('click', () => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
    });

    nextBtn.addEventListener('click', () => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    });
  });
}

// Initialize galleries when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Load general real estate images for the homepage
  fetchRealEstateImages('real estate home', 12).then((images) =>
    displayRealEstateImages(images, 'homepage-gallery')
  );

  // Load property-specific galleries
  document.querySelectorAll('[data-property-type]').forEach((element) => {
    const propertyType = element.getAttribute('data-property-type');
    const containerId = element.getAttribute('id');
    loadPropertyTypeImages(propertyType, containerId);
  });

  // Initialize property sliders
  document.querySelectorAll('[id^="property-"]').forEach((property) => {
    const propertyId = property.getAttribute('id');
    if (propertyId && !propertyId.endsWith('-slider')) {
      createPropertyGallerySlider(propertyId);
    }
  });
});
