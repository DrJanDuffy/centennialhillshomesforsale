
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styles from './InteractivePropertyMap.module.css';

// Import icons with fallback handling
let MapPinIcon, HomeIcon, ArrowTrendingUpIcon, EyeIcon, HeartIcon, MagnifyingGlassIcon, FilterIcon;

try {
  const icons = require('@heroicons/react/24/outline');
  MapPinIcon = icons.MapPinIcon;
  HomeIcon = icons.HomeIcon;
  ArrowTrendingUpIcon = icons.ArrowTrendingUpIcon; // Correct icon name in v2
  EyeIcon = icons.EyeIcon;
  HeartIcon = icons.HeartIcon;
  MagnifyingGlassIcon = icons.MagnifyingGlassIcon;
  FilterIcon = icons.FunnelIcon; // Filter icon is called FunnelIcon in v2
} catch (e) {
  // Fallback SVG icons
  MapPinIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
  
  HomeIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
  
  ArrowTrendingUpIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  );
  
  EyeIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
  
  HeartIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
  
  MagnifyingGlassIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
  
  FilterIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );
}

interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  coordinates: { lat: number; lng: number };
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  pricePerSqft: number;
  yearBuilt: number;
  propertyType: 'single-family' | 'condo' | 'townhouse' | 'luxury';
  status: 'for-sale' | 'sold' | 'pending';
  marketTrend: 'up' | 'down' | 'stable';
}

interface PropertyFilters {
  priceRange: [number, number];
  bedrooms: number | null;
  bathrooms: number | null;
  propertyType: string;
  status: string;
}

const InteractivePropertyMap: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<PropertyFilters>({
    priceRange: [200000, 1000000],
    bedrooms: null,
    bathrooms: null,
    propertyType: 'all',
    status: 'all'
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Mock property data for Centennial Hills area
  const mockProperties: Property[] = [
    {
      id: '1',
      title: 'Luxury Modern Home',
      price: 750000,
      address: '123 Desert Vista Dr, Las Vegas, NV',
      coordinates: { lat: 36.2845, lng: -115.1969 },
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      imageUrl: '/api/placeholder/400/300',
      pricePerSqft: 268,
      yearBuilt: 2020,
      propertyType: 'single-family',
      status: 'for-sale',
      marketTrend: 'up'
    },
    {
      id: '2',
      title: 'Centennial Hills Estate',
      price: 925000,
      address: '456 Canyon Ridge Ln, Las Vegas, NV',
      coordinates: { lat: 36.2851, lng: -115.1975 },
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3500,
      imageUrl: '/api/placeholder/400/300',
      pricePerSqft: 264,
      yearBuilt: 2019,
      propertyType: 'luxury',
      status: 'for-sale',
      marketTrend: 'up'
    },
    {
      id: '3',
      title: 'Golf Course View Home',
      price: 680000,
      address: '789 Fairway Circle, Las Vegas, NV',
      coordinates: { lat: 36.2839, lng: -115.1963 },
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3100,
      imageUrl: '/api/placeholder/400/300',
      pricePerSqft: 219,
      yearBuilt: 2018,
      propertyType: 'single-family',
      status: 'for-sale',
      marketTrend: 'stable'
    },
    {
      id: '4',
      title: 'Contemporary Townhome',
      price: 485000,
      address: '321 Mountain View Ct, Las Vegas, NV',
      coordinates: { lat: 36.2857, lng: -115.1981 },
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2200,
      imageUrl: '/api/placeholder/400/300',
      pricePerSqft: 220,
      yearBuilt: 2021,
      propertyType: 'townhouse',
      status: 'for-sale',
      marketTrend: 'up'
    }
  ];

  // Filter properties based on current filters
  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      const { priceRange, bedrooms, bathrooms, propertyType, status } = filters;
      
      if (property.price < priceRange[0] || property.price > priceRange[1]) return false;
      if (bedrooms && property.bedrooms !== bedrooms) return false;
      if (bathrooms && property.bathrooms < bathrooms) return false;
      if (propertyType !== 'all' && property.propertyType !== propertyType) return false;
      if (status !== 'all' && property.status !== status) return false;
      
      return true;
    });
  }, [filters]);

  const toggleFavorite = useCallback((propertyId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowTrendingUpIcon className="h-4 w-4 text-red-500 transform rotate-180" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
    }
  };

  // Generate dynamic CSS classes for positioning
  const getPropertyPositionClass = (index: number) => {
    const left = 20 + (index * 15);
    const top = 30 + (index * 10);
    return `${styles.propertyMarkerDynamic} ${styles[`pos-${left}-${top}`]}`;
  };

  // Generate dynamic CSS classes for tooltip positioning
  const getTooltipPositionClass = (index: number) => {
    const left = 20 + (index * 15);
    const top = 30 + (index * 10);
    return `${styles.hoverTooltipDynamic} ${styles[`tooltip-${left}-${top}`]}`;
  };

  return (
    <div className="relative w-full h-screen bg-gray-100">
      {/* Map Container */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
        {/* Simulated Map Background */}
        <div className="w-full h-full relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-12 gap-4 h-full p-8">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="bg-gray-300 rounded opacity-30"></div>
              ))}
            </div>
          </div>
          
          {/* Property Markers */}
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className={`${getPropertyPositionClass(filteredProperties.indexOf(property))} cursor-pointer transition-all duration-200 hover:scale-110 z-10`}
              onClick={() => setSelectedProperty(property)}
              onMouseEnter={() => setHoveredProperty(property)}
              onMouseLeave={() => setHoveredProperty(null)}
            >
              <div className={`relative p-2 rounded-full shadow-lg transition-all ${
                selectedProperty?.id === property.id 
                  ? 'bg-blue-600 text-white scale-110' 
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}>
                <HomeIcon className="h-6 w-6" />
                <div className="absolute -top-2 -right-2">
                  {getTrendIcon(property.marketTrend)}
                </div>
              </div>
              
              {/* Price Badge */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs font-semibold text-gray-900 whitespace-nowrap">
                {formatPrice(property.price)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property Details Panel */}
      {selectedProperty && (
        <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-xl z-20 overflow-hidden">
          <div className="relative">
            <img
              src={selectedProperty.imageUrl}
              alt={selectedProperty.title}
              className="w-full h-48 object-cover"
            />
            <button
              onClick={() => toggleFavorite(selectedProperty.id)}
              className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
              aria-label={favorites.has(selectedProperty.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <HeartIcon 
                className={`h-5 w-5 ${
                  favorites.has(selectedProperty.id) 
                    ? 'text-red-500 fill-current' 
                    : 'text-gray-600'
                }`} 
              />
            </button>
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {selectedProperty.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 flex items-center">
              <MapPinIcon className="h-4 w-4 mr-1" />
              {selectedProperty.address}
            </p>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-blue-600">
                {formatPrice(selectedProperty.price)}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                {getTrendIcon(selectedProperty.marketTrend)}
                <span className="ml-1">
                  ${selectedProperty.pricePerSqft}/sqft
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-4 text-center">
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="text-lg font-semibold text-gray-900">
                  {selectedProperty.bedrooms}
                </div>
                <div className="text-xs text-gray-600">Bedrooms</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="text-lg font-semibold text-gray-900">
                  {selectedProperty.bathrooms}
                </div>
                <div className="text-xs text-gray-600">Bathrooms</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="text-lg font-semibold text-gray-900">
                  {selectedProperty.sqft.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Sq Ft</div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <EyeIcon className="h-4 w-4 mr-2" />
                View Details
              </button>
              <button 
                onClick={() => setSelectedProperty(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hover Tooltip */}
      {hoveredProperty && !selectedProperty && (
        <div className={`${getTooltipPositionClass(filteredProperties.indexOf(hoveredProperty))}`}>
          <div className="text-sm font-semibold">{hoveredProperty.title}</div>
          <div className="text-lg font-bold text-blue-600">
            {formatPrice(hoveredProperty.price)}
          </div>
          <div className="text-xs text-gray-600">
            {hoveredProperty.bedrooms} bed • {hoveredProperty.bathrooms} bath
          </div>
        </div>
      )}

      {/* Filter Panel */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center"
        >
          <FilterIcon className="h-5 w-5 mr-2" />
          Filters
        </button>
        
        {showFilters && (
          <div className="mt-2 bg-white rounded-lg shadow-xl p-4 w-64">
            <h3 className="font-semibold mb-3">Property Filters</h3>
            
            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [parseInt(e.target.value) || 0, prev.priceRange[1]]
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseInt(e.target.value) || 1000000]
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
            
            {/* Bedrooms */}
            <div className="mb-4">
              <label htmlFor="bedrooms-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <select
                id="bedrooms-filter"
                value={filters.bedrooms || ''}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  bedrooms: e.target.value ? parseInt(e.target.value) : null
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                aria-label="Select minimum number of bedrooms"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            
            {/* Property Type */}
            <div className="mb-4">
              <label htmlFor="property-type-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                id="property-type-filter"
                value={filters.propertyType}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  propertyType: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                aria-label="Select property type"
              >
                <option value="all">All Types</option>
                <option value="single-family">Single Family</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Property Count */}
      <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg z-20">
        <span className="text-sm font-medium">
          Showing {filteredProperties.length} of {mockProperties.length} properties
        </span>
      </div>
    </div>
  );
};

export default InteractivePropertyMap;
