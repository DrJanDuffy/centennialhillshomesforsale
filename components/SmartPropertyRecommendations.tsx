
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  MapPin, 
  DollarSign, 
  Home, 
  Star, 
  TrendingUp,
  Filter,
  Sliders,
  Eye,
  Share2,
  MessageCircle,
  Clock,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface PropertyRecommendation {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  neighborhood: string;
  matchPercentage: number;
  reasons: string[];
  features: string[];
  daysOnMarket: number;
  pricePerSqft: number;
  image: string;
  status: 'active' | 'pending' | 'sold';
}

interface SmartPropertyRecommendationsProps {
  className?: string;
}

const SmartPropertyRecommendations: React.FC<SmartPropertyRecommendationsProps> = ({ 
  className = '' 
}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'match' | 'price' | 'date'>('match');

  const recommendations: PropertyRecommendation[] = [
    {
      id: '1',
      address: '1234 Providence Drive',
      price: 679000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      neighborhood: 'Providence',
      matchPercentage: 92,
      reasons: [
        'Within your budget range',
        'Recently renovated and move-in ready',
        'Includes 3D virtual tour',
        'Excellent school district'
      ],
      features: ['Pool', 'Mountain Views', 'Gourmet Kitchen', 'Smart Home'],
      daysOnMarket: 8,
      pricePerSqft: 243,
      image: '/images/providence-home-1.jpg',
      status: 'active'
    },
    {
      id: '2',
      address: '5678 Centennial Hills Blvd',
      price: 745000,
      bedrooms: 5,
      bathrooms: 3.5,
      sqft: 3200,
      neighborhood: 'Centennial Hills',
      matchPercentage: 88,
      reasons: [
        'Perfect for your growing family',
        'Large backyard with mountain views',
        'Recently updated kitchen',
        'Close to shopping and amenities'
      ],
      features: ['Guest House', 'Wine Cellar', 'Home Theater', 'Casita'],
      daysOnMarket: 12,
      pricePerSqft: 233,
      image: '/images/centennial-hills-home-1.jpg',
      status: 'active'
    },
    {
      id: '3',
      address: '9012 Skye Canyon Road',
      price: 595000,
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2200,
      neighborhood: 'Skye Canyon',
      matchPercentage: 85,
      reasons: [
        'Great starter home opportunity',
        'Low maintenance community',
        'Access to hiking trails',
        'Modern open floor plan'
      ],
      features: ['Open Floor Plan', 'Mountain Views', 'Upgraded Kitchen', 'Large Yard'],
      daysOnMarket: 15,
      pricePerSqft: 270,
      image: '/images/skye-canyon-home-1.jpg',
      status: 'active'
    }
  ];

  const filters = [
    { key: 'pool', label: 'Pool', icon: '🏊' },
    { key: 'mountain-views', label: 'Mountain Views', icon: '🏔️' },
    { key: 'smart-home', label: 'Smart Home', icon: '🏠' },
    { key: 'gourmet-kitchen', label: 'Gourmet Kitchen', icon: '👨‍🍳' },
    { key: 'guest-house', label: 'Guest House', icon: '🏡' },
    { key: 'wine-cellar', label: 'Wine Cellar', icon: '🍷' }
  ];

  const sortOptions = [
    { key: 'match', label: 'Best Match', icon: Star },
    { key: 'price', label: 'Price', icon: DollarSign },
    { key: 'date', label: 'Newest', icon: Clock }
  ];

  const filteredRecommendations = recommendations
    .filter(rec => {
      if (selectedFilters.length === 0) return true;
      return selectedFilters.some(filter => 
        rec.features.some(feature => 
          feature.toLowerCase().includes(filter.toLowerCase())
        )
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchPercentage - a.matchPercentage;
        case 'price':
          return a.price - b.price;
        case 'date':
          return a.daysOnMarket - b.daysOnMarket;
        default:
          return 0;
      }
    });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-accent-color';
    if (percentage >= 80) return 'text-warning-color';
    return 'text-secondary-color';
  };

  const getMatchBgColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-accent-color/10';
    if (percentage >= 80) return 'bg-warning-color/10';
    return 'bg-secondary-color/10';
  };

  return (
    <section className={`section bg-secondary ${className}`}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-accent-color" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Smart Property Recommendations
            </h2>
          </div>
          <p className="text-xl text-secondary max-w-3xl mx-auto mb-8">
            AI-powered suggestions based on your preferences and market analysis
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isEnabled ? 'text-secondary' : 'text-primary'}`}>
              AI Recommendations
            </span>
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ${
                isEnabled ? 'bg-accent-color' : 'bg-tertiary'
              }`}
              aria-label={`${isEnabled ? 'Disable' : 'Enable'} AI recommendations`}
              title={`${isEnabled ? 'Disable' : 'Enable'} AI recommendations`}
            >
              <motion.div
                className={`h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  isEnabled ? 'translate-x-9' : 'translate-x-1'
                }`}
                layout
              />
            </button>
            <span className={`text-sm font-medium ${isEnabled ? 'text-secondary' : 'text-primary'}`}>
              Manual Search
            </span>
          </div>
        </motion.div>

        {isEnabled && (
          <>
            {/* Filters and Sort */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg mb-8"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                {/* Filters */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2 px-4 py-2 bg-tertiary rounded-lg hover:bg-secondary-color/10 transition-colors"
                    >
                      <Filter className="w-4 h-4" />
                      <span className="text-sm font-medium">Filters</span>
                      {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {selectedFilters.length > 0 && (
                      <span className="text-sm text-secondary">
                        {selectedFilters.length} filter{selectedFilters.length !== 1 ? 's' : ''} applied
                      </span>
                    )}
                  </div>

                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-wrap gap-2"
                      >
                        {filters.map((filter) => (
                          <button
                            key={filter.key}
                            onClick={() => {
                              setSelectedFilters(prev =>
                                prev.includes(filter.key)
                                  ? prev.filter(f => f !== filter.key)
                                  : [...prev, filter.key]
                              );
                            }}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                              selectedFilters.includes(filter.key)
                                ? 'bg-accent-color text-white'
                                : 'bg-tertiary text-secondary hover:bg-secondary-color/10'
                            }`}
                          >
                            <span>{filter.icon}</span>
                            <span>{filter.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                                 {/* Sort */}
                 <div className="flex items-center gap-2">
                   <label htmlFor="sort-select" className="text-sm text-secondary">Sort by:</label>
                   <select
                     id="sort-select"
                     value={sortBy}
                     onChange={(e) => setSortBy(e.target.value as any)}
                     className="px-3 py-2 bg-tertiary rounded-lg text-sm border-none focus:ring-2 focus:ring-accent-color/50"
                     aria-label="Sort recommendations"
                   >
                     {sortOptions.map((option) => (
                       <option key={option.key} value={option.key}>
                         {option.label}
                       </option>
                     ))}
                   </select>
                 </div>
              </div>
            </motion.div>

            {/* Recommendations Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecommendations.map((recommendation, index) => (
                <motion.div
                  key={recommendation.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
                >
                  {/* Property Image */}
                  <div className="relative h-48 bg-gradient-to-br from-secondary-color to-accent-color">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Home className="w-16 h-16 text-white opacity-20" />
                    </div>
                    
                    {/* Match Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getMatchBgColor(recommendation.matchPercentage)} ${getMatchColor(recommendation.matchPercentage)}`}>
                        {recommendation.matchPercentage}% Match
                      </div>
                    </div>

                                         {/* Action Buttons */}
                     <div className="absolute top-4 right-4 flex gap-2">
                       <button 
                         className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                         aria-label="Add to favorites"
                         title="Add to favorites"
                       >
                         <Heart className="w-4 h-4 text-white" />
                       </button>
                       <button 
                         className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                         aria-label="Share property"
                         title="Share property"
                       >
                         <Share2 className="w-4 h-4 text-white" />
                       </button>
                     </div>

                    {/* Price Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="text-white">
                        <div className="text-2xl font-bold">{formatPrice(recommendation.price)}</div>
                        <div className="text-sm opacity-80">${recommendation.pricePerSqft}/sq ft</div>
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-6">
                    {/* Address and Neighborhood */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-1">
                        {recommendation.address}
                      </h3>
                      <div className="flex items-center gap-2 text-secondary">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{recommendation.neighborhood}</span>
                      </div>
                    </div>

                    {/* Property Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{recommendation.bedrooms}</div>
                        <div className="text-xs text-secondary">Beds</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{recommendation.bathrooms}</div>
                        <div className="text-xs text-secondary">Baths</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{recommendation.sqft.toLocaleString()}</div>
                        <div className="text-xs text-secondary">Sq Ft</div>
                      </div>
                    </div>

                    {/* Why We Recommend */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent-color" />
                        Why We Recommend This Property:
                      </h4>
                      <ul className="space-y-1">
                        {recommendation.reasons.slice(0, 2).map((reason, idx) => (
                          <li key={idx} className="text-xs text-secondary flex items-start gap-2">
                            <div className="w-1 h-1 bg-accent-color rounded-full mt-1.5 flex-shrink-0"></div>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {recommendation.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="bg-tertiary text-secondary px-2 py-1 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="btn btn-primary flex-1 group">
                        <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                                             <button 
                         className="btn btn-outline"
                         aria-label="Contact about this property"
                         title="Contact about this property"
                       >
                         <MessageCircle className="w-4 h-4" />
                       </button>
                    </div>

                    {/* Days on Market */}
                    <div className="mt-3 text-xs text-secondary text-center">
                      {recommendation.daysOnMarket} days on market
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredRecommendations.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">No properties match your filters</h3>
                <p className="text-secondary mb-4">Try adjusting your filters or contact us for personalized recommendations</p>
                <button 
                  onClick={() => setSelectedFilters([])}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <button className="btn btn-accent btn-lg group">
                <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Get More Recommendations
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </>
        )}

        {!isEnabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4">
              <Sliders className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Manual Search Mode</h3>
            <p className="text-secondary mb-4">Use our advanced search filters to find your perfect home</p>
            <button className="btn btn-primary">
              Start Manual Search
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SmartPropertyRecommendations;
