
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  Eye, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Star,
  TrendingUp,
  Home,
  Car,
  TreePine,
  Wifi,
  Shield,
  Zap
} from 'lucide-react';

interface PropertyImage {
  url: string;
  alt: string;
}

interface Neighborhood {
  name: string;
}

interface Property {
  id: string;
  mlsNumber: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: PropertyImage[];
  neighborhood: Neighborhood;
  listDate: string;
  status: 'active' | 'pending' | 'sold';
  features: string[];
  daysOnMarket: number;
  pricePerSqft: number;
  lotSize: string;
}

interface PropertyCardProps {
  property: Property;
  className?: string;
  onFavorite?: (propertyId: string) => void;
  onShare?: (property: Property) => void;
  onViewDetails?: (propertyId: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  className = '',
  onFavorite,
  onShare,
  onViewDetails
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite?.(property.id);
  };

  const handleShare = () => {
    onShare?.(property);
  };

  const handleViewDetails = () => {
    onViewDetails?.(property.id);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const getStatusColor = () => {
    switch (property.status) {
      case 'active': return 'bg-accent-color';
      case 'pending': return 'bg-warning-color';
      case 'sold': return 'bg-secondary-color';
      default: return 'bg-accent-color';
    }
  };

  const getStatusText = () => {
    switch (property.status) {
      case 'active': return 'Active';
      case 'pending': return 'Pending';
      case 'sold': return 'Sold';
      default: return 'Active';
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  const getFeatureIcon = (feature: string) => {
    const featureIcons: { [key: string]: React.ComponentType<any> } = {
      'Pool': Bath,
      'Mountain Views': TreePine,
      'Gourmet Kitchen': Home,
      'Smart Home': Zap,
      'Guest House': Home,
      'Wine Cellar': Shield,
      'Home Theater': Eye,
      'Casita': Home,
      'Open Floor Plan': Square,
      'Upgraded Kitchen': Home,
      'Large Yard': TreePine,
      'Garage': Car,
      'High-Speed Internet': Wifi
    };
    return featureIcons[feature] || Home;
  };

  return (
    <motion.div
      className={`bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Gallery */}
      <div className="relative h-64 bg-gradient-to-br from-secondary-color to-accent-color overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <div className="w-full h-full bg-gradient-to-br from-secondary-color/80 to-accent-color/80 flex items-center justify-center">
              <Home className="w-16 h-16 text-white opacity-30" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Image Navigation */}
        {property.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevImage}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Previous image"
              title="Previous image"
            >
              <motion.div
                animate={{ x: isHovered ? -2 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ←
              </motion.div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextImage}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Next image"
              title="Next image"
            >
              <motion.div
                animate={{ x: isHovered ? 2 : 0 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.div>
            </motion.button>
          </div>
        )}

        {/* Image Indicators */}
        {property.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {property.images.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`${getStatusColor()} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
            {getStatusText()}
          </span>
        </div>

        {/* Days on Market */}
        <div className="absolute top-4 right-4">
          <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.daysOnMarket} days
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-16 right-4 flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavorite}
            className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
              isFavorited 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <motion.div
              animate={isFavorited ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </motion.div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Share property"
            title="Share property"
          >
            <Share2 className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Price Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg"
        >
          <div className="text-2xl font-bold text-primary">{formatPrice(property.price)}</div>
          <div className="text-sm text-secondary">${property.pricePerSqft}/sqft</div>
        </motion.div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1">
              {property.address}
            </h3>
            <p className="text-secondary flex items-center text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {property.neighborhood.name}
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-secondary-color/10 text-secondary-color px-3 py-1 rounded-full text-sm font-semibold"
          >
            {property.neighborhood.name}
          </motion.div>
        </div>

        {/* Property Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div 
            className="text-center p-3 bg-tertiary rounded-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-center mb-1">
              <Bed className="w-4 h-4 text-accent-color mr-1" />
              <div className="text-lg font-bold text-primary">{property.bedrooms}</div>
            </div>
            <div className="text-xs text-secondary">Beds</div>
          </motion.div>
          
          <motion.div 
            className="text-center p-3 bg-tertiary rounded-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-center mb-1">
              <Bath className="w-4 h-4 text-secondary-color mr-1" />
              <div className="text-lg font-bold text-primary">{property.bathrooms}</div>
            </div>
            <div className="text-xs text-secondary">Baths</div>
          </motion.div>
          
          <motion.div 
            className="text-center p-3 bg-tertiary rounded-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-center mb-1">
              <Square className="w-4 h-4 text-warning-color mr-1" />
              <div className="text-lg font-bold text-primary">{property.sqft.toLocaleString()}</div>
            </div>
            <div className="text-xs text-secondary">Sq Ft</div>
          </motion.div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-primary mb-3">Key Features</h4>
          <div className="flex flex-wrap gap-2">
            {property.features.slice(0, 4).map((feature, idx) => {
              const IconComponent = getFeatureIcon(feature);
              return (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-tertiary text-secondary px-3 py-1 rounded-full text-xs flex items-center gap-1 hover:bg-secondary-color/10 transition-colors"
                >
                  <IconComponent className="w-3 h-3" />
                  {feature}
                </motion.span>
              );
            })}
            {property.features.length > 4 && (
              <span className="bg-accent-color/10 text-accent-color px-3 py-1 rounded-full text-xs">
                +{property.features.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            className="btn btn-primary flex-1 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewDetails}
          >
            <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            View Details
          </motion.button>
          
          <motion.button
            className="btn btn-outline group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            aria-label="Share property"
            title="Share property"
          >
            <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </motion.button>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-tertiary">
          <div className="flex justify-between text-xs text-secondary">
            <span>MLS: {property.mlsNumber}</span>
            <span>Lot: {property.lotSize}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
