import { UnsplashImage } from '../types/unsplash';

// Unsplash API Configuration
const config = {
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '',
  appName: 'Centennial Hills Homes For Sale',
};

// Function to fetch real estate images
export async function fetchRealEstateImages(query = 'real estate', count = 10): Promise<UnsplashImage[]> {
  try {
    const searchQuery = `${query} house property interior`;
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=${count}&orientation=landscape`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Client-ID ${config.accessKey}`
      }
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

// Function to get a single random featured image
export async function getRandomFeaturedImage(propertyType: string): Promise<UnsplashImage | null> {
  try {
    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(propertyType)}&orientation=landscape`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Client-ID ${config.accessKey}`
      }
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