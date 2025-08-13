interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class Cache {
  private store = new Map<string, CacheEntry<any>>();
  private readonly defaultTTL = 3600000; // 1 hour in milliseconds

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    this.store.set(key, entry);
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.store.delete(key);
      return null;
    }

    return entry.data;
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  // Get stale data if available (useful for fallback)
  getStale<T>(key: string): T | null {
    const entry = this.store.get(key);
    return entry ? entry.data : null;
  }

  // Check if data is stale but still available
  isStale(key: string): boolean {
    const entry = this.store.get(key);
    if (!entry) return true;

    const now = Date.now();
    return now - entry.timestamp > entry.ttl;
  }

  // Get cache statistics
  getStats() {
    const now = Date.now();
    let validEntries = 0;
    let staleEntries = 0;

    this.store.forEach((entry) => {
      if (now - entry.timestamp > entry.ttl) {
        staleEntries++;
      } else {
        validEntries++;
      }
    });

    return {
      total: this.store.size,
      valid: validEntries,
      stale: staleEntries,
    };
  }
}

// Global cache instance
export const cache = new Cache();

// Cache keys
export const CACHE_KEYS = {
  KCM_FEED: 'kcm-feed',
  KCM_ARTICLES: 'kcm-articles',
  MARKET_INSIGHTS: 'market-insights',
} as const;

// Cache TTL values (in milliseconds)
export const CACHE_TTL = {
  FEED: 3600000, // 1 hour
  ARTICLES: 7200000, // 2 hours
  INSIGHTS: 1800000, // 30 minutes
} as const;

// Helper function to get cached data with fallback
export async function getCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = CACHE_TTL.FEED
): Promise<T> {
  // Try to get fresh data from cache
  const cached = cache.get<T>(key);
  if (cached) {
    return cached;
  }

  try {
    // Fetch fresh data
    const data = await fetchFn();
    cache.set(key, data, ttl);
    return data;
  } catch (error) {
    // If fetch fails, try to return stale data
    const staleData = cache.getStale<T>(key);
    if (staleData) {
      console.warn(`Using stale cache data for ${key} due to fetch error:`, error);
      return staleData;
    }
    
    // If no stale data available, re-throw the error
    throw error;
  }
}

  // Helper function to invalidate cache
  export function invalidateCache(pattern?: string): void {
    if (pattern) {
      // Delete keys matching pattern
      cache.store.forEach((_, key) => {
        if (key.includes(pattern)) {
          cache.delete(key);
        }
      });
    } else {
      // Clear all cache
      cache.clear();
    }
  }
