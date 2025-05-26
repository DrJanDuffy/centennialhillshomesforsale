import { UnsplashImage, UnsplashResponse } from '../types/unsplash';

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com';

export async function searchPhotos(query: string, page = 1, perPage = 12): Promise<UnsplashImage[]> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('Unsplash API key not found, using fallback images');
    return getFallbackImages(query);
  }

  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: UnsplashResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
    return getFallbackImages(query);
  }
}

function getFallbackImages(query: string): UnsplashImage[] {
  const fallbackImages = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
    'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
  ];

  return fallbackImages.map((url, index) => ({
    id: `fallback-${index}`,
    urls: {
      regular: `${url}?w=1080&q=80`,
      small: `${url}?w=400&q=80`,
      thumb: `${url}?w=200&q=80`,
      full: url,
    },
    alt_description: `${query} property`,
    description: `Beautiful ${query} home`,
    user: {
      name: 'Centennial Hills Homes',
      username: 'centennialhills',
    },
    width: 1080,
    height: 720,
  }));
}