
'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Share2, 
  Eye, 
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  Home
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
  status: string;
  features: string[];
  daysOnMarket?: number;
  pricePerSqft?: number;
  lotSize?: string;
}

interface PropertyCardProps {
  property: Property;
  variant?: 'default' | 'featured' | 'compact';
  showActions?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  variant = 'default',
  showActions = true 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-accent-color text-white';
      case 'pending':
        return 'bg-warning-color text-white';
      case 'sold':
        return 'bg-secondary-color text-white';
      case 'new':
        return 'bg-primary-color text-white';
      default:
        return 'bg-tertiary text-secondary';
    }
  };

  const getDaysOnMarketColor = (days: number) => {
    if (days <= 7) return 'bg-accent-color text-white';
    if (days <= 14) return 'bg-warning-color text-white';
    return 'bg-secondary-color text-white';
  };

  const handleImageClick = () => {
    // This would typically open a modal or navigate to property details
    console.log('Opening property details for:', property.id);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: `${property.bedrooms} bed, ${property.bathrooms} bath in ${property.neighborhood.name}`,
        text: `Check out this ${formatPrice(property.price)} home in ${property.neighborhood.name}`,
        url: `/properties/${property.id}`
      });
    }
  };

  const cardClasses = {
    default: 'bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2',
    featured: 'bg-white rounded-2xl overflow-hidden shadow-2xl border-2 border-accent-color/20 hover:shadow-3xl transition-all duration-300 group hover:-translate-y-3',
    compact: 'bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group'
  };

  return (
    <div className={cardClasses[variant]}>
      {/* Property Image */}
      <div className="relative h-64 bg-gradient-to-br from-secondary-color to-accent-color overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[imageIndex]?.url || '/images/placeholder-home.jpg'}
            alt={property.images[imageIndex]?.alt || 'Property image'}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
            onClick={handleImageClick}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Home className="w-16 h-16 text-white opacity-20" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(property.status)}`}>
            {property.status}
          </span>
        </div>

        {/* Days on Market */}
        {property.daysOnMarket && (
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDaysOnMarketColor(property.daysOnMarket)}`}>
              {property.daysOnMarket} days
            </span>
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={handleLike}
              className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
                isLiked 
                  ? 'bg-accent-color text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
              title={isLiked ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              aria-label="Share property"
              title="Share property"
            >
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        )}

        {/* Image Navigation */}
        {property.images && property.images.length > 1 && (
          <div className="absolute bottom-4 left-4 flex gap-1">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === imageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Price Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="text-white">
            <div className="text-2xl font-bold">{formatPrice(property.price)}</div>
            {property.pricePerSqft && (
              <div className="text-sm opacity-80">
                ${property.pricePerSqft}/sq ft
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        {/* Address and Neighborhood */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-1">
            {property.address}
          </h3>
          <div className="flex items-center gap-2 text-secondary">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{property.neighborhood.name}</span>
          </div>
        </div>

        {/* Property Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Bed className="w-4 h-4 text-secondary" />
              <span className="text-lg font-bold text-primary">{property.bedrooms}</span>
            </div>
            <div className="text-xs text-secondary">Beds</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Bath className="w-4 h-4 text-secondary" />
              <span className="text-lg font-bold text-primary">{property.bathrooms}</span>
            </div>
            <div className="text-xs text-secondary">Baths</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Square className="w-4 h-4 text-secondary" />
              <span className="text-lg font-bold text-primary">{property.sqft.toLocaleString()}</span>
            </div>
            <div className="text-xs text-secondary">Sq Ft</div>
          </div>
        </div>

        {/* Features */}
        {property.features && property.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {property.features.slice(0, 3).map((feature, index) => (
                <span 
                  key={index} 
                  className="bg-tertiary text-secondary px-2 py-1 rounded text-xs font-medium"
                >
                  {feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="bg-secondary-color/10 text-secondary-color px-2 py-1 rounded text-xs font-medium">
                  +{property.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="flex items-center justify-between text-sm text-secondary mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Listed {new Date(property.listDate).toLocaleDateString()}</span>
          </div>
          {property.lotSize && (
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>{property.lotSize}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            className="btn btn-primary flex-1 group"
            onClick={handleImageClick}
          >
            <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            View Details
          </button>
          {showActions && (
            <button 
              className="btn btn-outline"
              onClick={handleShare}
              aria-label="Share property"
              title="Share property"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* MLS Number */}
        <div className="mt-3 text-xs text-secondary text-center">
          MLS #{property.mlsNumber}
        </div>
      </div>
    </div>
  );
};
