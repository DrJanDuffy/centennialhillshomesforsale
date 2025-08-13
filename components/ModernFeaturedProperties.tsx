import { Bath, Bed, Eye, Heart, MapPin, Share2, Square } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useMemo, useState } from 'react';

interface Property {
  id: string;
  mlsNumber: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: string[];
  neighborhood: string;
  status: string;
  features: string[];
  daysOnMarket: number;
  pricePerSqft: number;
  lotSize: string;
  isFeatured: boolean;
}

const ModernFeaturedProperties: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

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

  const featuredProperties = useMemo((): Property[] => [
    {
      id: 'featured-golden-moments',
      mlsNumber: 'GLVARTRESTLE-409',
      address: '11773 Golden Moments Avenue',
      price: 850000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&q=75',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=75',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=75',
      ],
      neighborhood: 'Golden Moments',
      status: 'active',
      features: ['Pool & Spa', 'Mountain Views', 'Gourmet Kitchen', 'Smart Home'],
      daysOnMarket: 15,
      pricePerSqft: 266,
      lotSize: '0.25 acres',
      isFeatured: true,
    },
    {
      id: 'centennial-hills-estate',
      mlsNumber: 'MLS-002',
      address: '5678 Centennial Hills Blvd',
      price: 1200000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4100,
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=75',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=75',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&q=75',
      ],
      neighborhood: 'Centennial Hills',
      status: 'active',
      features: ['Guest House', 'Wine Cellar', 'Home Theater', 'Casita'],
      daysOnMarket: 8,
      pricePerSqft: 293,
      lotSize: '0.5 acres',
      isFeatured: true,
    },
    {
      id: 'skye-canyon-family',
      mlsNumber: 'MLS-003',
      address: '9012 Skye Canyon Road',
      price: 650000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      images: [
        'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop&q=75',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&q=75',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=75',
      ],
      neighborhood: 'Skye Canyon',
      status: 'active',
      features: ['Open Floor Plan', 'Mountain Views', 'Upgraded Kitchen', 'Large Yard'],
      daysOnMarket: 15,
      pricePerSqft: 232,
      lotSize: '0.3 acres',
      isFeatured: true,
    },
  ], []);

  const formatPrice = useCallback((price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}k`;
    }
    return `$${price.toLocaleString()}`;
  }, []);

  const handleShare = useCallback((propertyId: string) => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: 'Check out this property',
        text: 'I found this amazing property in Centennial Hills!',
        url: `/property/${propertyId}`,
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/property/${propertyId}`);
    }
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured
            <span className="block text-blue-600">Luxury Homes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the finest properties currently available in Centennial Hills and surrounding areas
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Image Gallery with Lazy Loading */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={property.images[0]}
                  alt={`${property.address} - ${property.neighborhood}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
                />
                
                {/* Overlay Elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {property.status === 'active' ? 'Active' : 'Pending'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(property.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                      favorites.has(property.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                    } focus:outline-none focus:ring-2 focus:ring-white/50`}
                    aria-label={favorites.has(property.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(property.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleShare(property.id)}
                    className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-blue-500 hover:text-white backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Share this property"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold text-blue-600">{formatPrice(property.price)}</div>
                    <div className="text-sm text-gray-600">${property.pricePerSqft}/sqft</div>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                {/* Address & Neighborhood */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-semibold">{property.neighborhood}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{property.address}</h3>
                </div>

                {/* Key Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms} beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms} baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    <span>{property.sqft.toLocaleString()} sqft</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {property.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                  <span>MLS: {property.mlsNumber}</span>
                  <span>{property.daysOnMarket} days on market</span>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/property/${property.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                  <button 
                    type="button"
                    aria-label="Contact about this property"
                    className="px-4 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Don&apos;t See Your Dream Home?
            </h3>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Let us know what you&apos;re looking for and we&apos;ll find the perfect property for you in Centennial Hills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Get Personalized Recommendations
              </Link>
              <Link
                href="/search"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Search All Properties
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernFeaturedProperties;
