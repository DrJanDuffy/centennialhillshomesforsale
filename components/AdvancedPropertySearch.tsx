'use client';

import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  MapPinIcon, 
  HomeIcon, 
  CurrencyDollarIcon,
  StarIcon,
  HeartIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  neighborhood: string;
  features: string[];
  image: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  daysOnMarket: number;
  pricePerSqft: number;
}

interface SearchFilters {
  priceRange: [number, number];
  beds: number;
  baths: number;
  sqft: [number, number];
  type: string[];
  neighborhood: string[];
  features: string[];
  sortBy: string;
}

const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Mountain View Estate',
    address: '11773 Golden Moments Ave, Las Vegas, NV 89149',
    price: 1250000,
    beds: 5,
    baths: 4.5,
    sqft: 4200,
    type: 'Single Family',
    neighborhood: 'Centennial Hills',
    features: ['Mountain Views', 'Pool', 'Gourmet Kitchen', 'Wine Cellar', 'Home Theater'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    coordinates: { lat: 36.274, lng: -115.32 },
    rating: 4.9,
    daysOnMarket: 12,
    pricePerSqft: 298
  },
  {
    id: '2',
    title: 'Modern Family Home',
    address: '5678 Centennial Hills Blvd, Las Vegas, NV 89149',
    price: 850000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: 'Single Family',
    neighborhood: 'Centennial Hills',
    features: ['Open Floor Plan', 'Granite Countertops', 'Large Backyard', '2-Car Garage'],
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
    coordinates: { lat: 36.25, lng: -115.34 },
    rating: 4.7,
    daysOnMarket: 8,
    pricePerSqft: 304
  },
  {
    id: '3',
    title: 'Providence Luxury Villa',
    address: '1234 Providence Way, Las Vegas, NV 89149',
    price: 1650000,
    beds: 6,
    baths: 5.5,
    sqft: 5800,
    type: 'Luxury Estate',
    neighborhood: 'Providence',
    features: ['Custom Design', 'Private Pool', 'Wine Cellar', 'Home Office', 'Guest Suite'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    coordinates: { lat: 36.285, lng: -115.271 },
    rating: 5.0,
    daysOnMarket: 5,
    pricePerSqft: 284
  },
  {
    id: '4',
    title: 'Skye Canyon Family Home',
    address: '7890 Skye Canyon Dr, Las Vegas, NV 89149',
    price: 750000,
    beds: 3,
    baths: 2.5,
    sqft: 2200,
    type: 'Single Family',
    neighborhood: 'Skye Canyon',
    features: ['Family Room', 'Eat-in Kitchen', 'Patio', 'Storage Shed'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    coordinates: { lat: 36.287, lng: -115.275 },
    rating: 4.6,
    daysOnMarket: 15,
    pricePerSqft: 341
  }
];

const propertyTypes = ['Single Family', 'Luxury Estate', 'Townhouse', 'Condominium', 'Investment Property'];
const neighborhoods = ['Centennial Hills', 'Providence', 'Skye Canyon', 'The Trails', 'Tournament Hills'];
const availableFeatures = ['Mountain Views', 'Pool', 'Gourmet Kitchen', 'Wine Cellar', 'Home Theater', 'Open Floor Plan', 'Granite Countertops', 'Large Backyard', '2-Car Garage', 'Custom Design', 'Private Pool', 'Home Office', 'Guest Suite', 'Family Room', 'Eat-in Kitchen', 'Patio'];

export default function AdvancedPropertySearch() {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    priceRange: [500000, 2000000],
    beds: 0,
    baths: 0,
    sqft: [1000, 10000],
    type: [],
    neighborhood: [],
    features: [],
    sortBy: 'price-asc'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Filter and search properties
  const filteredProperties = useMemo(() => {
    let filtered = mockProperties.filter(property => {
      // Text search
      if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !property.address.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Price filter
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }

      // Beds filter
      if (filters.beds > 0 && property.beds < filters.beds) {
        return false;
      }

      // Baths filter
      if (filters.baths > 0 && property.baths < filters.baths) {
        return false;
      }

      // Sqft filter
      if (property.sqft < filters.sqft[0] || property.sqft > filters.sqft[1]) {
        return false;
      }

      // Type filter
      if (filters.type.length > 0 && !filters.type.includes(property.type)) {
        return false;
      }

      // Neighborhood filter
      if (filters.neighborhood.length > 0 && !filters.neighborhood.includes(property.neighborhood)) {
        return false;
      }

      // Features filter
      if (filters.features.length > 0 && !filters.features.some(feature => property.features.includes(feature))) {
        return false;
      }

      return true;
    });

    // Sort properties
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'sqft-asc':
        filtered.sort((a, b) => a.sqft - b.sqft);
        break;
      case 'sqft-desc':
        filtered.sort((a, b) => b.sqft - a.sqft);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'days-asc':
        filtered.sort((a, b) => a.daysOnMarket - b.daysOnMarket);
        break;
    }

    return filtered;
  }, [searchQuery, filters]);

  const toggleFavorite = (propertyId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId);
    } else {
      newFavorites.add(propertyId);
    }
    setFavorites(newFavorites);
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [500000, 2000000],
      beds: 0,
      baths: 0,
      sqft: [1000, 10000],
      type: [],
      neighborhood: [],
      features: [],
      sortBy: 'price-asc'
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Find Your Dream Home
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Advanced search with AI-powered recommendations to help you discover the perfect property 
            in Centennial Hills, Providence, and Skye Canyon.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search by address, neighborhood, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 transition-all duration-200"
            >
              <FunnelIcon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
              Filters
              <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                {filters.type.length + filters.neighborhood.length + filters.features.length}
              </span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                List
              </button>
            </div>

            {/* Sort Options */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="sqft-asc">Size: Small to Large</option>
              <option value="sqft-desc">Size: Large to Small</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="days-asc">Newest Listings</option>
            </select>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
        </motion.div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto mb-8 overflow-hidden"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Price Range
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="500000"
                        max="2000000"
                        step="50000"
                        value={filters.priceRange[1]}
                        onChange={(e) => setFilters(prev => ({ 
                          ...prev, 
                          priceRange: [prev.priceRange[0], parseInt(e.target.value)] 
                        }))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{formatPrice(filters.priceRange[0])}</span>
                        <span>{formatPrice(filters.priceRange[1])}</span>
                      </div>
                    </div>
                  </div>

                  {/* Beds & Baths */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Bedrooms
                    </label>
                    <select
                      value={filters.beds}
                      onChange={(e) => setFilters(prev => ({ ...prev, beds: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Bathrooms
                    </label>
                    <select
                      value={filters.baths}
                      onChange={(e) => setFilters(prev => ({ ...prev, baths: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Property Type
                    </label>
                                         <div className="space-y-2 max-h-32 overflow-y-auto">
                       {propertyTypes.map((type) => (
                         <label key={type} className="flex items-center">
                           <input
                             id={`type-${type}`}
                             type="checkbox"
                             checked={filters.type.includes(type)}
                             onChange={(e) => {
                               if (e.target.checked) {
                                 setFilters(prev => ({ ...prev, type: [...prev.type, type] }));
                               } else {
                                 setFilters(prev => ({ ...prev, type: prev.type.filter(t => t !== type) }));
                               }
                             }}
                             className="mr-2 text-blue-600 focus:ring-blue-500"
                           />
                           <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
                         </label>
                       ))}
                     </div>
                  </div>
                </div>

                {/* Neighborhoods and Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Neighborhoods
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {neighborhoods.map((neighborhood) => (
                        <label key={neighborhood} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.neighborhood.includes(neighborhood)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters(prev => ({ ...prev, neighborhood: [...prev.neighborhood, neighborhood] }));
                              } else {
                                setFilters(prev => ({ ...prev, neighborhood: prev.neighborhood.filter(n => n !== neighborhood) }));
                              }
                            }}
                            className="mr-2 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{neighborhood}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Features
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {availableFeatures.map((feature) => (
                        <label key={feature} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.features.includes(feature)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters(prev => ({ ...prev, features: [...prev.features, feature] }));
                              } else {
                                setFilters(prev => ({ ...prev, features: prev.features.filter(f => f !== feature) }));
                              }
                            }}
                            className="mr-2 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto mb-6"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Found <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredProperties.length}</span> properties
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </motion.div>

        {/* Property Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {filteredProperties.length === 0 ? (
            <div className="text-center py-16">
              <HomeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No properties found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Property Image */}
                  <div className={`relative ${viewMode === 'list' ? 'w-80 h-60' : 'h-64'}`}>
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => toggleFavorite(property.id)}
                        className={`p-2 rounded-full transition-all duration-200 ${
                          favorites.has(property.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 text-gray-600 hover:bg-white'
                        }`}
                      >
                        <HeartIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white transition-all duration-200">
                        <EyeIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {formatPrice(property.price)}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-yellow-400">
                        <StarIcon className="w-5 h-5 fill-current" />
                        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                          {property.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.neighborhood}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {property.beds}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Beds</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {property.baths}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Baths</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {property.sqft.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Sq Ft</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ${property.pricePerSqft}/sqft
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {property.daysOnMarket} days on market
                      </span>
                    </div>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {property.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          +{property.features.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                        View Details
                      </button>
                      <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 rounded-lg font-medium">
                        Contact Agent
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
