import React from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

type SearchFormData = {
  location: string;
  propertyType: string;
  priceRange: string;
};

const Hero = () => {
  const { register, handleSubmit } = useForm<SearchFormData>();

  const onSubmit = (data: SearchFormData) => {
    console.log(data);
    // Handle search submission
  };

  return (
    <div className="relative h-[90vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Luxury Home"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Find Your Dream Home
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-3 text-xl text-gray-200 sm:mx-auto sm:mt-5 sm:max-w-xl"
          >
            Discover the perfect property in your desired location
          </motion.p>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 sm:mx-auto sm:max-w-xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 sm:flex sm:gap-4">
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
                <input
                  type="text"
                  {...register('location')}
                  placeholder="Location"
                  className="w-full rounded-lg border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
                />
                <select
                  {...register('propertyType')}
                  className="w-full rounded-lg border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Property Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                </select>
                <select
                  {...register('priceRange')}
                  className="w-full rounded-lg border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Price Range</option>
                  <option value="0-300000">$0 - $300,000</option>
                  <option value="300000-600000">$300,000 - $600,000</option>
                  <option value="600000-1000000">$600,000 - $1,000,000</option>
                  <option value="1000000+">$1,000,000+</option>
                </select>
              </div>
              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center rounded-lg bg-[#0A2540] px-8 py-3 text-white hover:bg-[#3A8DDE] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
              >
                <MagnifyingGlassIcon className="mr-2 h-5 w-5" />
                Search
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 