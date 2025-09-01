# Bing API Integration Guide

This document explains how to use the Bing Search API integration in the Centennial Hills real estate website.

## Overview

The Bing API integration provides search functionality for:
- General web searches
- Real estate specific searches
- Local real estate news
- Property image searches

## Security Setup

### 1. Environment Variables

Add your Bing API key to your `.env.local` file:

```bash
# Bing Search API Configuration
BING_API_KEY=ffa071c950ed46a88eff81fe85836214
```

**Important Security Notes:**
- Never commit your `.env.local` file to version control
- The API key is kept server-side only for security
- Client-side requests go through secure API routes

### 2. Vercel Deployment

For production deployment, add the environment variable in your Vercel dashboard:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add `BING_API_KEY` with your API key value
4. Deploy to apply the changes

## Usage

### 1. Using the React Hook

```tsx
import { useBingSearch } from '../hooks/useBingSearch';

function MyComponent() {
  const {
    results,
    isLoading,
    error,
    search,
    searchRealEstate,
    searchNews,
    clearResults,
  } = useBingSearch({ count: 10 });

  const handleSearch = async () => {
    await search('homes for sale Centennial Hills');
  };

  const handleRealEstateSearch = async () => {
    await searchRealEstate('Centennial Hills, Las Vegas', 'single family');
  };

  return (
    <div>
      <button onClick={handleSearch}>Search</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {results.map(result => (
        <div key={result.id}>
          <h3>{result.name}</h3>
          <p>{result.snippet}</p>
          <a href={result.url}>Visit</a>
        </div>
      ))}
    </div>
  );
}
```

### 2. Direct API Calls

For server-side usage, import the utility directly:

```tsx
import { bingAPI } from '../utils/bing';

// In a server-side function or API route
const results = await bingAPI.search('homes for sale Centennial Hills');
const realEstateResults = await bingAPI.searchRealEstate('Centennial Hills, Las Vegas');
const newsResults = await bingAPI.searchRealEstateNews('Centennial Hills, Las Vegas');
```

### 3. API Route Usage

Make direct calls to the API route:

```tsx
// Web search
const response = await fetch('/api/bing/search?query=homes for sale Centennial Hills');

// Real estate search
const response = await fetch('/api/bing/search?type=real-estate&location=Centennial Hills, Las Vegas');

// News search
const response = await fetch('/api/bing/search?type=news&location=Centennial Hills, Las Vegas');

// Image search
const response = await fetch('/api/bing/search?type=images&query=Centennial Hills homes');
```

## API Reference

### Hook Options

```tsx
interface UseBingSearchOptions {
  count?: number;        // Number of results (default: 10)
  offset?: number;       // Pagination offset (default: 0)
  enabled?: boolean;     // Whether search is enabled
}
```

### Search Methods

#### `search(query: string)`
General web search for any query.

#### `searchRealEstate(location: string, propertyType?: string)`
Search for real estate listings in a specific location.

#### `searchNews(location: string)`
Search for real estate news and market updates.

#### `searchImages(query: string)`
Search for property images and visual content.

### Response Structure

```tsx
interface BingSearchResult {
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

interface BingSearchResponse {
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
```

## Example Components

### Basic Search Component

```tsx
import React, { useState } from 'react';
import { useBingSearch } from '../hooks/useBingSearch';

export default function SearchComponent() {
  const [query, setQuery] = useState('');
  const { results, isLoading, error, search } = useBingSearch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await search(query);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for homes..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {error && <p>Error: {error}</p>}
      
      {results.map(result => (
        <div key={result.id}>
          <h3>{result.name}</h3>
          <p>{result.snippet}</p>
        </div>
      ))}
    </div>
  );
}
```

### Real Estate Search Component

```tsx
import React, { useState } from 'react';
import { useBingSearch } from '../hooks/useBingSearch';

export default function RealEstateSearch() {
  const [location, setLocation] = useState('Centennial Hills, Las Vegas');
  const [propertyType, setPropertyType] = useState('');
  
  const { results, isLoading, searchRealEstate } = useBingSearch({ count: 20 });

  const handleSearch = async () => {
    await searchRealEstate(location, propertyType || undefined);
  };

  return (
    <div>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input
        type="text"
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        placeholder="Property type (optional)"
      />
      <button onClick={handleSearch} disabled={isLoading}>
        Search Real Estate
      </button>
      
      {results.map(result => (
        <div key={result.id}>
          <h3>{result.name}</h3>
          <p>{result.snippet}</p>
        </div>
      ))}
    </div>
  );
}
```

## Error Handling

The integration includes comprehensive error handling:

1. **API Key Missing**: Warns if API key is not configured
2. **Network Errors**: Handles fetch failures gracefully
3. **Rate Limiting**: Respects Bing API rate limits
4. **Invalid Responses**: Validates API responses

## Rate Limiting

Bing API has rate limits. The integration includes:
- Automatic retry logic for transient failures
- Proper error messages for rate limit exceeded
- Configurable request delays

## Best Practices

1. **Caching**: Consider caching search results for frequently searched terms
2. **Pagination**: Use the offset parameter for pagination
3. **Error Boundaries**: Wrap search components in error boundaries
4. **Loading States**: Always show loading indicators during searches
5. **Input Validation**: Validate user input before searching

## Troubleshooting

### Common Issues

1. **"Bing API key is required"**
   - Check that `BING_API_KEY` is set in your environment variables
   - Verify the key is correct and active

2. **"Search failed"**
   - Check network connectivity
   - Verify API key permissions
   - Check rate limits

3. **No results returned**
   - Verify search query is valid
   - Check if results exist for the query
   - Try different search terms

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your environment variables.

## Support

For issues with the Bing API integration:
1. Check the browser console for error messages
2. Verify environment variable configuration
3. Test API key directly with Bing's API documentation
4. Check Vercel deployment logs for server-side errors
