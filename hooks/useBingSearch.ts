import { useCallback, useState } from 'react';
import type { BingSearchResponse, BingSearchResult } from '../utils/bing';

export interface UseBingSearchOptions {
  count?: number;
  offset?: number;
  enabled?: boolean;
}

export interface UseBingSearchReturn {
  data: BingSearchResponse | null;
  results: BingSearchResult[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  searchRealEstate: (location: string, propertyType?: string) => Promise<void>;
  searchNews: (location: string) => Promise<void>;
  searchImages: (query: string) => Promise<void>;
  clearResults: () => void;
}

export function useBingSearch(options: UseBingSearchOptions = {}): UseBingSearchReturn {
  const [data, setData] = useState<BingSearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const results = data?.webPages?.value || [];

  const makeRequest = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result: BingSearchResponse = await response.json();
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      console.error('Bing search error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const search = useCallback(
    async (query: string) => {
      const params = new URLSearchParams({
        query,
        count: (options.count || 10).toString(),
        offset: (options.offset || 0).toString(),
      });

      await makeRequest(`/api/bing/search?${params.toString()}`);
    },
    [makeRequest, options.count, options.offset]
  );

  const searchRealEstate = useCallback(
    async (location: string, propertyType?: string) => {
      const params = new URLSearchParams({
        type: 'real-estate',
        location,
        count: (options.count || 20).toString(),
        offset: (options.offset || 0).toString(),
      });

      if (propertyType) {
        params.append('propertyType', propertyType);
      }

      await makeRequest(`/api/bing/search?${params.toString()}`);
    },
    [makeRequest, options.count, options.offset]
  );

  const searchNews = useCallback(
    async (location: string) => {
      const params = new URLSearchParams({
        type: 'news',
        location,
        count: (options.count || 10).toString(),
        offset: (options.offset || 0).toString(),
      });

      await makeRequest(`/api/bing/search?${params.toString()}`);
    },
    [makeRequest, options.count, options.offset]
  );

  const searchImages = useCallback(
    async (query: string) => {
      const params = new URLSearchParams({
        type: 'images',
        query,
        count: (options.count || 15).toString(),
        offset: (options.offset || 0).toString(),
      });

      await makeRequest(`/api/bing/search?${params.toString()}`);
    },
    [makeRequest, options.count, options.offset]
  );

  const clearResults = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    data,
    results,
    isLoading,
    error,
    search,
    searchRealEstate,
    searchNews,
    searchImages,
    clearResults,
  };
}
