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
    }
  ], []);

  return (
    <section className="section bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
            Featured
            <span className="block text-secondary-color mt-2">Luxury Properties</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover exceptional homes in Centennial Hills with premium amenities and prime locations
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16 lg:mb-20">
          {featuredProperties.map((property) => (
            <div key={property.id} className="card group overflow-hidden">
              {/* Image Gallery */}
              <div className="relative h-64 lg:h-72 overflow-hidden">
                <Image
                  src={property.images[0]}
                  alt={property.address}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                
                {/* Overlay with Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      type="button"
                      aria-label="Add to favorites"
                      onClick={() => toggleFavorite(property.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                        favorites.has(property.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.has(property.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      type="button"
                      aria-label="Share property"
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="text-2xl lg:text-3xl font-bold text-primary-color">
                      ${(property.price / 1000).toFixed(0)}k
                    </div>
                    <div className="text-sm text-gray-600">
                      ${property.pricePerSqft}/sqft
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6 lg:p-8">
                {/* Address & Neighborhood */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-secondary-color" />
                    <span className="text-sm text-secondary-color font-semibold">{property.neighborhood}</span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-primary-color line-clamp-2 leading-tight">{property.address}</h3>
                </div>

                {/* Key Stats */}
                <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
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
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {property.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between mb-8 text-sm text-gray-500">
                  <span>MLS: {property.mlsNumber}</span>
                  <span>{property.daysOnMarket} days on market</span>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/property/${property.id}`}
                    className="flex-1 bg-secondary-color hover:bg-secondary-dark text-white text-center py-3 lg:py-4 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-secondary-color focus:ring-offset-2 text-sm lg:text-base"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                  <button 
                    type="button"
                    aria-label="Contact about this property"
                    className="px-4 lg:px-6 py-3 lg:py-4 border-2 border-secondary-color text-secondary-color hover:bg-secondary-color hover:text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary-color focus:ring-offset-2 text-sm lg:text-base"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary-color to-primary-dark rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Don&apos;t See Your Dream Home?
            </h3>
            <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let us know what you&apos;re looking for and we&apos;ll find the perfect property for you in Centennial Hills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
              <Link
                href="/contact"
                className="bg-secondary-color hover:bg-secondary-dark text-white px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary-color focus:ring-offset-2 focus:ring-offset-primary-color text-base lg:text-lg"
              >
                Get Personalized Recommendations
              </Link>
              <Link
                href="/search"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-color px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-color text-base lg:text-lg"
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
