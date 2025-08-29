import { motion } from 'framer-motion';
import type React from 'react';
import { useId, useState } from 'react';

interface SearchFilters {
  priceMin: number;
  priceMax: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: string;
  neighborhood: string;
  features: string[];
}

export default function AdvancedSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: '',
    bedrooms: 0,
    bathrooms: 0,
    propertyType: 'all',
    squareFootage: '',
    neighborhood: 'all',
  });

  // Generate unique IDs for form elements
  const priceRangeId = useId();
  const bedroomsId = useId();
  const bathroomsId = useId();
  const propertyTypeId = useId();
  const squareFootageId = useId();
  const neighborhoodId = useId();

  const handleFilterChange = (filter: string, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: value,
    }));
  };

  const handleSearch = () => {
    // Search logic here
    console.log('Searching with filters:', filters);
  };

  const featuresId = 'features-select';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Advanced Search</h2>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Price Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label
                htmlFor={priceRangeId}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  id={priceRangeId}
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label htmlFor={bedroomsId} className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <select
                id={bedroomsId}
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', parseInt(e.target.value, 10))}
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

            {/* Bathrooms */}
            <div>
              <label htmlFor={bathroomsId} className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>
              <select
                id={bathroomsId}
                value={filters.bathrooms}
                onChange={(e) => handleFilterChange('bathrooms', parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select minimum number of bathrooms"
              >
                <option value={0}>Any</option>
                <option value={1}>1+</option>
                <option value={2}>2+</option>
                <option value={3}>3+</option>
                <option value={4}>4+</option>
                <option value={5}>5+</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label
                htmlFor={propertyTypeId}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Property Type
              </label>
              <select
                id={propertyTypeId}
                value={filters.propertyType}
                onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select property type"
              >
                <option value="all">All Types</option>
                <option value="single-family">Single Family</option>
                <option value="townhouse">Townhouse</option>
                <option value="condo">Condo</option>
                <option value="new-construction">New Construction</option>
              </select>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={squareFootageId}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Square Footage
              </label>
              <input
                type="number"
                id={squareFootageId}
                placeholder="Min sq ft"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.squareFootage}
                onChange={(e) => handleFilterChange('squareFootage', e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor={neighborhoodId}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Neighborhood
              </label>
              <select
                id={neighborhoodId}
                value={filters.neighborhood}
                onChange={(e) => handleFilterChange('neighborhood', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select preferred neighborhood"
              >
                <option value="all">All Neighborhoods</option>
                <option value="centennial-hills">Centennial Hills</option>
                <option value="providence">Providence</option>
                <option value="skye-canyon">Skye Canyon</option>
                <option value="northwest-las-vegas">Northwest Las Vegas</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSearch}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Search Properties
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
