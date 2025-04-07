import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import PropertyCard from '../components/properties/PropertyCard';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

// Mock data - replace with actual API call
const MOCK_PROPERTIES = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    address: '123 Centennial Hills Dr, Las Vegas, NV',
    price: 750000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    imageUrl: '/images/property-1.jpg',
  },
  // Add more mock properties here
];

interface FiltersState {
  priceRange: string;
  bedrooms: string;
  propertyType: string;
}

const PropertiesPage = () => {
  const [filters, setFilters] = useState<FiltersState>({
    priceRange: '',
    bedrooms: '',
    propertyType: '',
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Page Header */}
      <div className="bg-[#0A2540] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-4xl font-bold text-white">Available Properties</h1>
          <p className="mt-4 text-center text-gray-300">
            Discover your perfect home in Centennial Hills
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="mb-4 flex items-center rounded-lg bg-white px-4 py-2 text-[#0A2540] shadow-sm hover:bg-gray-50 md:hidden"
        >
          <AdjustmentsHorizontalIcon className="mr-2 h-5 w-5" />
          Filters
        </button>

        <div className={`mb-8 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <select
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
              className="w-full rounded-lg border-gray-300 px-4 py-2 focus:border-[#3A8DDE] focus:ring-[#3A8DDE]"
            >
              <option value="">Price Range</option>
              <option value="0-500000">Under $500,000</option>
              <option value="500000-1000000">$500,000 - $1,000,000</option>
              <option value="1000000+">$1,000,000+</option>
            </select>

            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleFilterChange}
              className="w-full rounded-lg border-gray-300 px-4 py-2 focus:border-[#3A8DDE] focus:ring-[#3A8DDE]"
            >
              <option value="">Bedrooms</option>
              <option value="1">1+ Bed</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
            </select>

            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
              className="w-full rounded-lg border-gray-300 px-4 py-2 focus:border-[#3A8DDE] focus:ring-[#3A8DDE]"
            >
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_PROPERTIES.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // In a real application, fetch properties from an API here
  return {
    props: {},
    revalidate: 60, // Revalidate every 60 seconds
  };
};

export default PropertiesPage; 