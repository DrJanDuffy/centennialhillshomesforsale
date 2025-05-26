
import { UnsplashPhoto, UnsplashSearchResponse, UnsplashConfig, PropertyImage } from '../types/unsplash';

const config: UnsplashConfig = {
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '',
  fallbackEnabled: true,
};

const fallbackImages: PropertyImage[] = [
  {
    id: 'fallback-1',
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    alt: 'Beautiful modern home exterior',
    description: 'Modern family home with landscaping',
    photographer: 'Unsplash Stock'
  },
  {
    id: 'fallback-2',
    url: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    alt: 'Luxury home with pool',
    description: 'Luxury home with swimming pool',
    photographer: 'Unsplash Stock'
  },
  {
    id: 'fallback-3',
    url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    alt: 'Contemporary house design',
    description: 'Contemporary architectural design',
    photographer: 'Unsplash Stock'
  },
  {
    id: 'fallback-4',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    alt: 'Family home with garden',
    description: 'Family home with beautiful garden',
    photographer: 'Unsplash Stock'
  },
  {
    id: 'fallback-5',
    url: 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    alt: 'Desert home architecture',
    description: 'Desert contemporary home design',
    photographer: 'Unsplash Stock'
  }
];

const isValidAccessKey = (): boolean => {
  return config.accessKey && config.accessKey.length > 10 && config.accessKey !== 'your_valid_unsplash_access_key_here';
};

export const searchImages = async (query: string, count: number = 6): Promise<PropertyImage[]> => {
  if (!isValidAccessKey()) {
    console.log('Unsplash API key not configured, using fallback images');
    return fallbackImages.slice(0, Math.min(count, fallbackImages.length));
  }

  try {
    const searchQuery = `${query} house property interior exterior`;
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=${count}&orientation=landscape&order_by=relevant`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Client-ID ${config.accessKey}`,
        'Accept-Version': 'v1'
      }
    });

    if (!response.ok) {
      console.warn(`Unsplash API error: ${response.status} ${response.statusText}, using fallback images`);
      return fallbackImages.slice(0, Math.min(count, fallbackImages.length));
    }

    const data: UnsplashSearchResponse = await response.json();
    
    if (!data.results || data.results.length === 0) {
      console.log('No Unsplash results found, using fallback images');
      return fallbackImages.slice(0, Math.min(count, fallbackImages.length));
    }

    return data.results.map((photo: UnsplashPhoto): PropertyImage => ({
      id: photo.id,
      url: photo.urls.regular,
      alt: photo.alt_description || photo.description || `Property image by ${photo.user.name}`,
      description: photo.description,
      photographer: photo.user.name
    }));
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    console.log('Using fallback property images');
    return fallbackImages.slice(0, Math.min(count, fallbackImages.length));
  }
};

export const getRandomImage = async (propertyType: string = 'house'): Promise<PropertyImage> => {
  if (!isValidAccessKey()) {
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  }

  try {
    const query = getQueryForPropertyType(propertyType);
    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Client-ID ${config.accessKey}`,
        'Accept-Version': 'v1'
      }
    });

    if (!response.ok) {
      console.warn(`Unsplash API error: ${response.status}, using fallback image`);
      return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    }

    const photo: UnsplashPhoto = await response.json();
    return {
      id: photo.id,
      url: photo.urls.regular,
      alt: photo.alt_description || photo.description || `${propertyType} by ${photo.user.name}`,
      description: photo.description,
      photographer: photo.user.name
    };
  } catch (error) {
    console.warn('Error fetching random image, using fallback:', error);
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  }
};

const getQueryForPropertyType = (propertyType: string): string => {
  const queries: Record<string, string> = {
    'single-family': 'single family house home',
    'condo': 'condominium apartment modern',
    'townhouse': 'townhouse row house',
    'villa': 'villa luxury house',
    'apartment': 'apartment building modern',
    'luxury': 'luxury mansion estate',
  };
  
  return queries[propertyType.toLowerCase()] || `${propertyType} house home`;
};

export default {
  searchImages,
  getRandomImage,
  isValidAccessKey
};
