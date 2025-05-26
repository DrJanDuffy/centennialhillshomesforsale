import { UnsplashImage } from '../types/unsplash';

// Unsplash API Configuration
const config = {
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '',
  appName: 'Centennial Hills Homes For Sale',
};

// Fallback images for when API fails
const fallbackImages: UnsplashImage[] = [
  {
    id: 'fallback-1',
    urls: {
      regular: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=150&fit=crop'
    },
    alt_description: 'Beautiful modern home',
    user: {
      name: 'Unsplash',
      links: {
        html: 'https://unsplash.com'
      }
    },
    location: null
  },
  {
    id: 'fallback-2',
    urls: {
      regular: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=200&h=150&fit=crop'
    },
    alt_description: 'Luxury house exterior',
    user: {
      name: 'Unsplash',
      links: {
        html: 'https://unsplash.com'
      }
    },
    location: null
  },
  {
    id: 'fallback-3',
    urls: {
      regular: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
      thumb: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&h=150&fit=crop'
    },
    alt_description: 'Modern home interior',
    user: {
      name: 'Unsplash',
      links: {
        html: 'https://unsplash.com'
      }
    },
    location: null
  }
];

// Function to fetch real estate images
export async function fetchRealEstateImages(query = 'real estate', count = 10): Promise<UnsplashImage[]> {
  // If no access key, return fallback images
  if (!config.accessKey || config.accessKey.length < 10) {
    console.log('Using fallback images - no valid Unsplash API key');
    return fallbackImages.slice(0, Math.min(count, fallbackImages.length));
  }

  try {
    const searchQuery = `${query} house property interior`;
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=${count}&orientation=landscape`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Client-ID ${config.accessKey}`
      }
    });
    
    if (!response.ok) {
      console.warn(`Unsplash API error: ${response.status}, using fallback images`);
      return fallbackImages.slice(0, Math.min(count, fallbackImages.length));
    }
    
    const data = await response.json();
    return data.results || fallbackImages.slice(0, Math.min(count, fallbackImages.length));
  } catch (error) {
    console.warn('Error fetching images from Unsplash, using fallback images:', error);
    return fallbackImages.slice(0, Math.min(count, fallbackImages.length));
  }
}

// Function to get a single random featured image
export async function getRandomFeaturedImage(propertyType: string): Promise<UnsplashImage | null> {
  // If no access key, return a fallback image
  if (!config.accessKey || config.accessKey.length < 10) {
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  }

  try {
    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(propertyType)}&orientation=landscape`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Client-ID ${config.accessKey}`
      }
    });
    
    if (!response.ok) {
      console.warn(`Unsplash API error: ${response.status}, using fallback image`);
      return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Error fetching random image, using fallback:', error);
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  }
}

// Function to get property type specific query
export function getPropertyTypeQuery(propertyType: string): string {
  switch(propertyType.toLowerCase()) {
    case 'luxury':
      return 'luxury home mansion interior';
    case 'apartment':
      return 'modern apartment condo interior';
    case 'rural':
      return 'farm ranch countryside home';
    case 'commercial':
      return 'commercial property office building';
    case 'beachfront':
      return 'beach house ocean view';
    case 'mountain':
      return 'mountain cabin home retreat';
    default:
      return `${propertyType} home`;
  }
} 