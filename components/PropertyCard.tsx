
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  HeartIcon, 
  ShareIcon, 
  CameraIcon, 
  MapPinIcon,
  BanknotesIcon,
  HomeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface Property {
  id: string;
  mlsNumber: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: { url: string; alt: string }[];
  neighborhood: { name: string };
  listDate: string;
  status: string;
  features?: string[];
}

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className = '' }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${className}`}
    >
      {/* Image Gallery */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.images[currentImageIndex]?.url || '/images/placeholder-home.jpg'}
          alt={property.images[currentImageIndex]?.alt || property.address}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              →
            </button>
          </>
        )}

        {/* Image Counter */}
        {property.images.length > 1 && (
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <CameraIcon className="w-3 h-3" />
            {currentImageIndex + 1}/{property.images.length}
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            property.status === 'active' 
              ? 'bg-green-500 text-white' 
              : property.status === 'pending'
              ? 'bg-yellow-500 text-white'
              : 'bg-red-500 text-white'
          }`}>
            {property.status.toUpperCase()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            {isFavorited ? (
              <HeartSolidIcon className="w-4 h-4 text-red-500" />
            ) : (
              <HeartIcon className="w-4 h-4 text-gray-600" />
            )}
          </button>
          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors">
            <ShareIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-bold text-gray-900">
            {formatPrice(property.price)}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4" />
            {formatDate(property.listDate)}
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 mb-4">
          <MapPinIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-gray-800 font-medium">{property.address}</p>
            <p className="text-sm text-gray-500">{property.neighborhood.name}</p>
          </div>
        </div>

        {/* Property Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-lg font-semibold text-gray-900">
              <HomeIcon className="w-4 h-4" />
              {property.bedrooms}
            </div>
            <p className="text-xs text-gray-500">Bedrooms</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {property.bathrooms}
            </div>
            <p className="text-xs text-gray-500">Bathrooms</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {property.sqft.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Sq Ft</p>
          </div>
        </div>

        {/* Features */}
        {property.features && property.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {property.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                >
                  {feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{property.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/properties/${property.id}`}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
          >
            View Details
          </Link>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <BanknotesIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
