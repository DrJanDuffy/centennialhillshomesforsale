/**
 * Bing API Utility
 * Handles Bing Search API calls for the real estate website
 */

export interface BingSearchResult {
  id: string;
  name: string;
  url: string;
  snippet: string;
  dateLastCrawled?: string;
  displayUrl?: string;
  isFamilyFriendly?: boolean;
  isNavigational?: boolean;
  language?: string;
}

export interface BingSearchResponse {
  _type: string;
  queryContext: {
    originalQuery: string;
  };
  webPages: {
    webSearchUrl: string;
    totalEstimatedMatches: number;
    value: BingSearchResult[];
  };
}

export interface BingSearchOptions {
  count?: number;
  offset?: number;
  mkt?: string;
  safeSearch?: 'Off' | 'Moderate' | 'Strict';
  responseFilter?: string[];
  textDecorations?: boolean;
  textFormat?: 'Raw' | 'HTML';
}

class BingAPI {
  private apiKey: string;
  private baseUrl = 'https://api.bing.microsoft.com/v7.0/search';

  constructor() {
    this.apiKey = process.env.BING_API_KEY || '';

    if (!this.apiKey) {
      console.warn(
        'Bing API key not found. Please set BING_API_KEY in your environment variables.'
      );
    }
  }

  /**
   * Perform a web search using Bing Search API
   */
  async search(query: string, options: BingSearchOptions = {}): Promise<BingSearchResponse> {
    if (!this.apiKey) {
      throw new Error('Bing API key is required');
    }

    const searchParams = new URLSearchParams({
      q: query,
      count: (options.count || 10).toString(),
      offset: (options.offset || 0).toString(),
      mkt: options.mkt || 'en-US',
      safeSearch: options.safeSearch || 'Moderate',
      textDecorations: (options.textDecorations !== false).toString(),
      textFormat: options.textFormat || 'HTML',
    });

    if (options.responseFilter) {
      options.responseFilter.forEach((filter) => {
        searchParams.append('responseFilter', filter);
      });
    }

    const url = `${this.baseUrl}?${searchParams.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': this.apiKey,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Bing API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data: BingSearchResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Bing API search error:', error);
      throw error;
    }
  }

  /**
   * Search for real estate related content
   */
  async searchRealEstate(
    location: string,
    propertyType?: string,
    options: BingSearchOptions = {}
  ): Promise<BingSearchResponse> {
    const query = propertyType
      ? `${propertyType} homes for sale ${location}`
      : `homes for sale ${location}`;

    return this.search(query, {
      count: options.count || 20,
      safeSearch: 'Moderate',
      ...options,
    });
  }

  /**
   * Search for local real estate news and market updates
   */
  async searchRealEstateNews(
    location: string,
    options: BingSearchOptions = {}
  ): Promise<BingSearchResponse> {
    const query = `real estate market news ${location} housing market`;

    return this.search(query, {
      count: options.count || 10,
      safeSearch: 'Moderate',
      ...options,
    });
  }

  /**
   * Search for property images and visual content
   */
  async searchPropertyImages(
    query: string,
    options: BingSearchOptions = {}
  ): Promise<BingSearchResponse> {
    return this.search(query, {
      count: options.count || 15,
      responseFilter: ['Images'],
      ...options,
    });
  }
}

// Export a singleton instance
export const bingAPI = new BingAPI();

// Export the class for testing purposes
export { BingAPI };
