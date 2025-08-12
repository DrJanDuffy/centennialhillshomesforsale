const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
    full: string;
  };
  alt_description: string | null;
  description: string | null;
  user: {
    name: string;
    username: string;
  };
  width: number;
  height: number;
}

export interface UnsplashResponse {
  results: UnsplashImage[];
  total: number;
  total_pages: number;
}

// Fallback images for when Unsplash API is not available
const FALLBACK_IMAGES = [
  {
    id: 'fallback-1',
    urls: {
      regular: '/images/agent1.jpg',
      small: '/images/agent1.jpg',
      thumb: '/images/agent1.jpg',
      full: '/images/agent1.jpg',
    },
    alt_description: 'Modern luxury home in Centennial Hills',
    description: 'Beautiful home with mountain views',
    user: { name: 'Real Estate Photos', username: 'realestate' },
    width: 800,
    height: 600,
  },
  {
    id: 'fallback-2',
    urls: {
      regular: '/images/agent2.jpg',
      small: '/images/agent2.jpg',
      thumb: '/images/agent2.jpg',
      full: '/images/agent2.jpg',
    },
    alt_description: 'Elegant home interior design',
    description: 'Spacious living area with modern finishes',
    user: { name: 'Real Estate Photos', username: 'realestate' },
    width: 800,
    height: 600,
  },
  {
    id: 'fallback-3',
    urls: {
      regular: '/images/agent3.jpg',
      small: '/images/agent3.jpg',
      thumb: '/images/agent3.jpg',
      full: '/images/agent3.jpg',
    },
    alt_description: 'Luxury home exterior with landscaping',
    description: 'Beautiful home with professional landscaping',
    user: { name: 'Real Estate Photos', username: 'realestate' },
    width: 800,
    height: 600,
  },
];

export async function searchUnsplashImages(
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<UnsplashImage[]> {
  // Return fallback images if no API key is configured
  if (!UNSPLASH_ACCESS_KEY) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Using fallback images - no Unsplash API key configured');
    }
    return FALLBACK_IMAGES.slice(0, perPage);
  }

  try {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data: UnsplashResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error loading images:', error);
    // Return fallback images on error
    return FALLBACK_IMAGES.slice(0, perPage);
  }
}

export async function getRandomUnsplashImage(
  query: string = 'real estate'
): Promise<UnsplashImage | null> {
  if (!UNSPLASH_ACCESS_KEY) {
    return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
  }

  try {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/photos/random?query=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error loading random image:', error);
    return FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)];
  }
}
