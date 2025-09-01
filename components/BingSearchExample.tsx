import type React from 'react';
import { useState } from 'react';
import { useBingSearch } from '../hooks/useBingSearch';
import type { BingSearchResult } from '../utils/bing';

export default function BingSearchExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Centennial Hills, Las Vegas');
  const [propertyType, setPropertyType] = useState('');

  const { results, isLoading, error, search, searchRealEstate, searchNews, clearResults } =
    useBingSearch({ count: 10 });

  const handleWebSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await search(searchQuery);
    }
  };

  const handleRealEstateSearch = async () => {
    if (location.trim()) {
      await searchRealEstate(location, propertyType || undefined);
    }
  };

  const handleNewsSearch = async () => {
    if (location.trim()) {
      await searchNews(location);
    }
  };

  const formatUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + urlObj.pathname;
    } catch {
      return url;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bing Search Integration</h2>

        {/* Web Search */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Web Search</h3>
          <form onSubmit={handleWebSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for anything..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>

        {/* Real Estate Search */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Real Estate Search</h3>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (e.g., Centennial Hills, Las Vegas)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              placeholder="Property type (optional)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleRealEstateSearch}
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Search Real Estate'}
            </button>
            <button
              type="button"
              onClick={handleNewsSearch}
              disabled={isLoading}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Search News'}
            </button>
          </div>
        </div>

        {/* Clear Results */}
        {results.length > 0 && (
          <div className="mb-4">
            <button
              type="button"
              onClick={clearResults}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Clear Results
            </button>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}

        {/* Results Display */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Search Results ({results.length})
            </h3>
            <div className="space-y-4">
              {results.map((result: BingSearchResult) => (
                <div
                  key={result.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <a href={result.url} target="_blank" rel="noopener noreferrer" className="block">
                    <h4 className="text-lg font-medium text-blue-600 hover:text-blue-800 mb-1">
                      {result.name}
                    </h4>
                    <p className="text-sm text-green-600 mb-2">{formatUrl(result.url)}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{result.snippet}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
