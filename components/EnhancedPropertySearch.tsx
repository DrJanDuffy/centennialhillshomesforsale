'use client';

import { motion } from 'framer-motion';
import { Filter, Heart, Home, MapPin, Search, Star } from 'lucide-react';
import Image from 'next/image';
import type React from 'react';
import { useEffect, useState } from 'react';
import { EnhancedButton, EnhancedFormField } from './EnhancedAnimations';

interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  location: string;
  propertyType: string;
  image: string;
  features: string[];
}

interface PropertyFilters {
  location: string;
  priceRange: string;
  bedrooms: string;
  propertyType: string;
  bathrooms?: string;
  sqft?: string;
  lotSize?: string;
  features?: string[];
}

interface PropertySearchProps {
  onSearch?: (filters: PropertyFilters) => void;
  className?: string;
  showAdvanced?: boolean;
}

export const EnhancedPropertySearch: React.FC<PropertySearchProps> = ({
  onSearch,
  className = '',
  showAdvanced = false,
}) => {
  const [filters, setFilters] = useState<PropertyFilters>({
    location: '',
    priceRange: '',
    bedrooms: '',
    propertyType: '',
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(showAdvanced);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Location options
  const locationOptions = [
    { value: 'centennial-hills', label: 'Centennial Hills' },
    { value: 'providence', label: 'Providence' },
    { value: 'skye-canyon', label: 'Skye Canyon' },
    { value: 'northwest-las-vegas', label: 'Northwest Las Vegas' },
    { value: 'all-areas', label: 'All Areas' },
  ];

  // Price range options
  const priceRangeOptions = [
    { value: '300-500', label: '$300K - $500K' },
    { value: '500-750', label: '$500K - $750K' },
    { value: '750-1000', label: '$750K - $1M' },
    { value: '1000-1500', label: '$1M - $1.5M' },
    { value: '1500+', label: '$1.5M+' },
    { value: 'any-price', label: 'Any Price' },
  ];

  // Bedroom options
  const bedroomOptions = [
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5+', label: '5+' },
    { value: 'any', label: 'Any' },
  ];

  // Property type options
  const propertyTypeOptions = [
    { value: 'single-family', label: 'Single Family' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'condo', label: 'Condo' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'new-construction', label: 'New Construction' },
    { value: 'all-types', label: 'All Types' },
  ];

  // Bathroom options
  const bathroomOptions = [
    { value: '1', label: '1+' },
    { value: '1.5', label: '1.5+' },
    { value: '2', label: '2+' },
    { value: '2.5', label: '2.5+' },
    { value: '3', label: '3+' },
    { value: 'any', label: 'Any' },
  ];

  // Square footage options
  const sqftOptions = [
    { value: '1000-1500', label: '1,000 - 1,500 sq ft' },
    { value: '1500-2000', label: '1,500 - 2,000 sq ft' },
    { value: '2000-2500', label: '2,000 - 2,500 sq ft' },
    { value: '2500-3000', label: '2,500 - 3,000 sq ft' },
    { value: '3000+', label: '3,000+ sq ft' },
    { value: 'any', label: 'Any Size' },
  ];

  // Feature options
  const featureOptions = [
    { value: 'pool', label: 'Pool & Spa' },
    { value: 'mountain-views', label: 'Mountain Views' },
    { value: 'gourmet-kitchen', label: 'Gourmet Kitchen' },
    { value: 'smart-home', label: 'Smart Home' },
    { value: 'guest-house', label: 'Guest House' },
    { value: 'wine-cellar', label: 'Wine Cellar' },
    { value: 'home-theater', label: 'Home Theater' },
    { value: 'casita', label: 'Casita' },
  ];

  const handleFilterChange = (name: keyof PropertyFilters, value: string | string[]) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    if (!filters.location && !filters.priceRange && !filters.bedrooms && !filters.propertyType) {
      // Show validation message
      alert('Please select at least one search criteria');
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock search results
      const mockResults = generateMockResults(filters);
      setSearchResults(mockResults);

      // Call parent callback if provided
      if (onSearch) {
        onSearch(filters);
      }

      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('search-results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const generateMockResults = (searchFilters: PropertyFilters) => {
    // Generate mock results based on filters
    const baseProperties = [
      {
        id: '1',
        address: '11773 Golden Moments Avenue',
        price: 850000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 3200,
        location: 'Centennial Hills',
        propertyType: 'Single Family',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        features: ['Pool & Spa', 'Mountain Views', 'Gourmet Kitchen'],
      },
      {
        id: '2',
        address: '5678 Centennial Hills Blvd',
        price: 1200000,
        bedrooms: 5,
        bathrooms: 4,
        sqft: 4100,
        location: 'Centennial Hills',
        propertyType: 'Luxury',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        features: ['Guest House', 'Wine Cellar', 'Home Theater'],
      },
      {
        id: '3',
        address: '9012 Skye Canyon Road',
        price: 650000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2800,
        location: 'Skye Canyon',
        propertyType: 'Single Family',
        image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
        features: ['Open Floor Plan', 'Mountain Views', 'Large Yard'],
      },
    ];

    // Filter based on search criteria
    return baseProperties.filter((property) => {
      if (searchFilters.location && searchFilters.location !== 'all-areas') {
        if (!property.location.toLowerCase().includes(searchFilters.location.toLowerCase())) {
          return false;
        }
      }

      if (searchFilters.bedrooms && searchFilters.bedrooms !== 'any') {
        const minBedrooms = parseInt(searchFilters.bedrooms);
        if (property.bedrooms < minBedrooms) {
          return false;
        }
      }

      if (searchFilters.propertyType && searchFilters.propertyType !== 'all-types') {
        if (property.propertyType.toLowerCase() !== searchFilters.propertyType.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      priceRange: '',
      bedrooms: '',
      propertyType: '',
    });
    setSearchResults([]);
    setHasSearched(false);
  };

  const resetSearch = () => {
    clearFilters();
    setShowAdvancedFilters(false);
  };

  // Favorites functionality
  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  const getFilteredResults = () => {
    if (showFavoritesOnly) {
      return searchResults.filter((property) => favorites.has(property.id));
    }
    return searchResults;
  };

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('propertyFavorites');
    if (savedFavorites) {
      try {
        const favoritesArray = JSON.parse(savedFavorites);
        setFavorites(new Set(favoritesArray));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('propertyFavorites', JSON.stringify([...favorites]));
  }, [favorites]);

  return (
    <div className={`enhanced-property-search ${className}`}>
      {/* Search Form */}
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 mb-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Find Your Perfect Home</h2>
          <p className="text-gray-600">
            Use our advanced search to find properties that match your criteria
          </p>
        </div>

        {/* Basic Search Fields */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <EnhancedFormField
            label="Location"
            name="location"
            type="select"
            value={filters.location}
            onChange={(value) => handleFilterChange('location', value)}
            options={locationOptions}
            placeholder="Select location"
          />

          <EnhancedFormField
            label="Price Range"
            name="priceRange"
            type="select"
            value={filters.priceRange}
            onChange={(value) => handleFilterChange('priceRange', value)}
            options={priceRangeOptions}
            placeholder="Select price range"
          />

          <EnhancedFormField
            label="Bedrooms"
            name="bedrooms"
            type="select"
            value={filters.bedrooms}
            onChange={(value) => handleFilterChange('bedrooms', value)}
            options={bedroomOptions}
            placeholder="Select bedrooms"
          />

          <EnhancedFormField
            label="Property Type"
            name="propertyType"
            type="select"
            value={filters.propertyType}
            onChange={(value) => handleFilterChange('propertyType', value)}
            options={propertyTypeOptions}
            placeholder="Select property type"
          />
        </div>

        {/* Advanced Filters Toggle */}
        <div className="text-center mb-6">
          <button
            type="button"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
          </button>
        </div>

        {/* Advanced Search Fields */}
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-3 gap-6 mb-6 p-6 bg-gray-50 rounded-lg"
          >
            <EnhancedFormField
              label="Bathrooms"
              name="bathrooms"
              type="select"
              value={filters.bathrooms || ''}
              onChange={(value) => handleFilterChange('bathrooms', value)}
              options={bathroomOptions}
              placeholder="Select bathrooms"
            />

            <EnhancedFormField
              label="Square Footage"
              name="sqft"
              type="select"
              value={filters.sqft || ''}
              onChange={(value) => handleFilterChange('sqft', value)}
              options={sqftOptions}
              placeholder="Select square footage"
            />

            <div className="form-field">
              <div className="block text-sm font-medium text-gray-700 mb-2">Features</div>
              <div className="grid grid-cols-2 gap-2">
                {featureOptions.map((feature) => (
                  <label key={feature.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`feature-${feature.value}`}
                      checked={filters.features?.includes(feature.value) || false}
                      onChange={(e) => {
                        const currentFeatures = filters.features || [];
                        if (e.target.checked) {
                          handleFilterChange('features', [...currentFeatures, feature.value]);
                        } else {
                          handleFilterChange(
                            'features',
                            currentFeatures.filter((f) => f !== feature.value)
                          );
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{feature.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <EnhancedButton
            onClick={handleSearch}
            loading={isSearching}
            variant="primary"
            size="lg"
            className="min-w-[200px]"
          >
            <Search className="w-5 h-5 mr-2" />
            {isSearching ? 'Searching...' : 'Search Properties'}
          </EnhancedButton>

          <EnhancedButton onClick={clearFilters} variant="outline" size="lg" disabled={isSearching}>
            Clear Filters
          </EnhancedButton>

          <EnhancedButton
            onClick={resetSearch}
            variant="secondary"
            size="lg"
            disabled={isSearching}
          >
            Reset All
          </EnhancedButton>
        </div>
      </motion.div>

      {/* Search Results */}
      {hasSearched && (
        <motion.div
          id="search-results"
          className="search-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Search Results</h3>
            <p className="text-gray-600 mb-4">
              Found {searchResults.length} properties matching your criteria
            </p>

            {/* Favorites Toggle */}
            <div className="flex justify-center items-center gap-4 mb-4">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  showFavoritesOnly
                    ? 'bg-red-100 text-red-700 border-2 border-red-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 mr-2 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                {showFavoritesOnly ? 'Show All' : 'Show Favorites'} ({favorites.size})
              </button>
            </div>
          </div>

          {getFilteredResults().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredResults().map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 bg-gray-200 relative">
                    <Image
                      src={property.image}
                      alt={property.address}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-semibold">
                      ${property.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{property.address}</h4>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <div className="font-bold text-gray-800">{property.bedrooms}</div>
                        <div className="text-xs text-gray-600">Beds</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{property.bathrooms}</div>
                        <div className="text-xs text-gray-600">Baths</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">
                          {property.sqft.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">Sq Ft</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <EnhancedButton variant="primary" size="sm" className="flex-1">
                        View Details
                      </EnhancedButton>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(property.id);
                        }}
                        className={`p-2 rounded-lg border transition-colors ${
                          favorites.has(property.id)
                            ? 'bg-red-50 border-red-200 text-red-600'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                        aria-label={
                          favorites.has(property.id) ? 'Remove from favorites' : 'Add to favorites'
                        }
                      >
                        <Heart
                          className={`w-4 h-4 ${favorites.has(property.id) ? 'fill-current' : ''}`}
                        />
                      </button>
                      <EnhancedButton variant="outline" size="sm">
                        Compare
                      </EnhancedButton>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Properties Found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria or expanding your search area
              </p>
              <EnhancedButton onClick={clearFilters} variant="primary">
                Modify Search
              </EnhancedButton>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedPropertySearch;
