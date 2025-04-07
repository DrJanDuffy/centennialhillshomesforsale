import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, ShareIcon, HomeIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Property } from '../../store/propertyStore';
import { initPropertyMap, addPropertyMarkers } from '../../utils/mapbox';
import { initHomebotWidget } from '../../utils/homebot';
import 'mapbox-gl/dist/mapbox-gl.css';

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const valuationContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = initPropertyMap({
        containerId: mapContainerRef.current.id,
        center: [-115.2551, 36.2473], // This should come from property coordinates
        zoom: 15,
      });

      addPropertyMarkers(map, [
        {
          property,
          coordinates: [-115.2551, 36.2473], // This should come from property coordinates
        },
      ]);
    }

    if (valuationContainerRef.current) {
      initHomebotWidget({
        containerId: valuationContainerRef.current.id,
        address: property.address,
        propertyType: property.type === 'house' ? 'single_family' : property.type,
      });
    }
  }, [property]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white">
      {/* Property Images */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button className="rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-[#3A8DDE] hover:text-white">
            <HeartIcon className="h-6 w-6" />
          </button>
          <button className="rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-[#3A8DDE] hover:text-white">
            <ShareIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Property Information */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-2 text-3xl font-bold text-[#0A2540]">{property.title}</h1>
              <div className="mb-6 flex items-center text-gray-600">
                <MapPinIcon className="mr-2 h-5 w-5" />
                <p>{property.address}</p>
              </div>

              <div className="mb-8 grid grid-cols-3 gap-4 border-b border-gray-200 pb-8">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-lg font-semibold text-[#16B286]">
                    {formatPrice(property.price)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Property Type</p>
                  <p className="text-lg font-semibold">{property.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Year Built</p>
                  <p className="text-lg font-semibold">{property.yearBuilt}</p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Property Details</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-[#F7F9FC] p-4">
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="text-lg font-semibold">{property.bedrooms}</p>
                  </div>
                  <div className="rounded-lg bg-[#F7F9FC] p-4">
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="text-lg font-semibold">{property.bathrooms}</p>
                  </div>
                  <div className="rounded-lg bg-[#F7F9FC] p-4">
                    <p className="text-sm text-gray-500">Square Feet</p>
                    <p className="text-lg font-semibold">{property.squareFeet.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg bg-[#F7F9FC] p-4">
                    <p className="text-sm text-gray-500">Garage</p>
                    <p className="text-lg font-semibold">{property.garage} Car</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Description</h2>
                <p className="text-gray-600">{property.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Features</h2>
                <ul className="grid grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <HomeIcon className="mr-2 h-5 w-5 text-[#3A8DDE]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map */}
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Location</h2>
                <div
                  id="property-map"
                  ref={mapContainerRef}
                  className="h-[400px] rounded-lg"
                />
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Schedule Viewing Form */}
              <div className="mb-8 rounded-lg border border-gray-200 p-6">
                <h3 className="mb-4 text-xl font-semibold">Schedule a Viewing</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#3A8DDE] focus:ring-[#3A8DDE]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#3A8DDE] focus:ring-[#3A8DDE]"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#3A8DDE] focus:ring-[#3A8DDE]"
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#3A8DDE] focus:ring-[#3A8DDE]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#0A2540] px-4 py-2 text-white transition-colors hover:bg-[#3A8DDE]"
                  >
                    Schedule Viewing
                  </button>
                </form>
              </div>

              {/* Homebot Valuation Widget */}
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-4 text-xl font-semibold">Property Valuation</h3>
                <div
                  id="homebot-widget"
                  ref={valuationContainerRef}
                  className="min-h-[400px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 