import { motion } from 'framer-motion';
import { useState } from 'react';

interface SearchFilters {
  priceMin: number;
  priceMax: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: string;
  neighborhood: string;
}

export default function AdvancedSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    priceMin: 0,
    priceMax: 2000000,
    bedrooms: 0,
    bathrooms: 0,
    sqft: 0,
    propertyType: 'all',
    neighborhood: 'all',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof SearchFilters, value: number | string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching with filters:', filters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Advanced Property Search</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange('priceMin', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => handleFilterChange('priceMax', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="bedrooms-select" className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms
          </label>
          <select
            id="bedrooms-select"
            value={filters.bedrooms}
            onChange={(e) => handleFilterChange('bedrooms', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select minimum number of bedrooms"
          >
            <option value={0}>Any</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
            <option value={5}>5+</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="bathrooms-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Bathrooms
          </label>
          <select
            id="bathrooms-select"
            value={filters.bathrooms}
            onChange={(e) => handleFilterChange('bathrooms', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select minimum number of bathrooms"
          >
            <option value={0}>Any</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="property-type-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Property Type
          </label>
          <select
            id="property-type-select"
            value={filters.propertyType}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select property type"
          >
            <option value="all">All Types</option>
            <option value="single-family">Single Family</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
            <option value="new-construction">New Construction</option>
          </select>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Square Footage</label>
            <input
              type="number"
              placeholder="Min sqft"
              value={filters.sqft}
              onChange={(e) => handleFilterChange('sqft', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="neighborhood-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Neighborhood
            </label>
            <select
              id="neighborhood-select"
              value={filters.neighborhood}
              onChange={(e) => handleFilterChange('neighborhood', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select preferred neighborhood"
            >
              <option value="all">All Neighborhoods</option>
              <option value="centennial-hills">Centennial Hills</option>
              <option value="providence">Providence</option>
              <option value="skye-canyon">Skye Canyon</option>
              <option value="summerlin">Summerlin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Pool
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Mountain Views
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Golf Course
              </label>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex justify-center">
        <motion.button
          onClick={handleSearch}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          Search Properties
        </motion.button>
      </div>
    </motion.div>
  );
}
