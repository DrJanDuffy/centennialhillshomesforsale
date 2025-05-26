
export interface UnsplashPhoto {
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

export interface UnsplashSearchResponse {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}

export interface UnsplashConfig {
  accessKey: string;
  fallbackEnabled: boolean;
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  description?: string;
  photographer?: string;
}
