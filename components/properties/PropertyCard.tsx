import React from 'react';
import Image from 'next/image';
import { HeartIcon, MapPinIcon, HomeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    address: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    imageUrl: string;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl">
      {/* Image Container */}
      <div className="relative h-64 w-full">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <button
          className="absolute right-4 top-4 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-[#3A8DDE] hover:text-white"
          aria-label="Add to favorites"
        >
          <HeartIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="mb-2 text-xl font-semibold text-[#0A2540]">{property.title}</h3>
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="mr-2 h-4 w-4" />
            <p className="text-sm">{property.address}</p>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center text-[#16B286]">
            <CurrencyDollarIcon className="mr-1 h-5 w-5" />
            <span className="text-lg font-bold">{formatPrice(property.price)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <HomeIcon className="mr-1 h-4 w-4" />
            <span className="text-sm">{property.squareFeet} sq ft</span>
          </div>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <div>
            <span className="font-semibold">{property.bedrooms}</span> Beds
          </div>
          <div>
            <span className="font-semibold">{property.bathrooms}</span> Baths
          </div>
          <button
            className="rounded-lg bg-[#F7F9FC] px-4 py-2 font-medium text-[#0A2540] transition-colors hover:bg-[#3A8DDE] hover:text-white"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 