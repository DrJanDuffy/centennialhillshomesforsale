import { Home, MapPin, Search, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useCallback, useMemo, useState } from 'react';

interface ModernHeroProps {
  onSearchSubmit?: (searchData: SearchData) => void;
}

interface SearchData {
  location: string;
  propertyType: string;
  priceRange: string;
}

const ModernHero: React.FC<ModernHeroProps> = ({ onSearchSubmit }) => {
  const [searchData, setSearchData] = useState<SearchData>({
    location: 'Centennial Hills',
    propertyType: 'All Properties',
    priceRange: 'Any Price',
  });

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearchSubmit?.(searchData);
    },
    [searchData, onSearchSubmit]
  );

  const popularAreas = useMemo(
    () => [
      { name: 'Centennial Hills', href: '/centennial-hills' },
      { name: 'Providence', href: '/providence-las-vegas' },
      { name: 'Skye Canyon', href: '/skye-canyon' },
      { name: 'Northwest Las Vegas', href: '/northwest-las-vegas' },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { value: '500+', label: 'Homes Sold' },
      { value: '$2.5B+', label: 'Total Volume' },
      { value: '15+', label: 'Years Experience' },
      { value: '98%', label: 'Client Satisfaction' },
    ],
    []
  );

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-color via-primary-dark to-primary-light overflow-hidden">
      {/* Background Image with Lazy Loading */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop&q=75"
          alt="Luxury homes in Centennial Hills, Las Vegas"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-color/80 via-primary-dark/60 to-primary-light/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container py-20 lg:py-32">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight">
            Discover Your Dream Home in
            <span className="block text-blue-200 mt-2">Centennial Hills</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Luxury homes in Las Vegas&apos; most prestigious master-planned community. Expert
            guidance from Dr. Jan Duffy, Top 1% REALTOR®.
          </p>

          {/* Search Form */}
          <div className="card bg-white/95 backdrop-blur-sm p-6 md:p-8 lg:p-10 shadow-2xl max-w-4xl mx-auto mb-16">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {/* Location */}
                <div className="relative">
                  <label htmlFor="location-select" className="sr-only">
                    Location
                  </label>
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="location-select"
                    value={searchData.location}
                    onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-color focus:border-transparent transition-all duration-300 text-sm lg:text-base"
                  >
                    <option value="Centennial Hills">Centennial Hills</option>
                    <option value="Providence">Providence</option>
                    <option value="Skye Canyon">Skye Canyon</option>
                    <option value="Northwest Las Vegas">Northwest Las Vegas</option>
                  </select>
                </div>

                {/* Property Type */}
                <div className="relative">
                  <label htmlFor="property-type-select" className="sr-only">
                    Property Type
                  </label>
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="property-type-select"
                    value={searchData.propertyType}
                    onChange={(e) => setSearchData({ ...searchData, propertyType: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-color focus:border-transparent transition-all duration-300 text-sm lg:text-base"
                  >
                    <option value="All Properties">All Properties</option>
                    <option value="Single Family">Single Family</option>
                    <option value="Luxury Homes">Luxury Homes</option>
                    <option value="New Construction">New Construction</option>
                    <option value="Golf Course Homes">Golf Course Homes</option>
                  </select>
                </div>

                {/* Price Range */}
                <div className="relative">
                  <label htmlFor="price-range-select" className="sr-only">
                    Price Range
                  </label>
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="price-range-select"
                    value={searchData.priceRange}
                    onChange={(e) => setSearchData({ ...searchData, priceRange: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-color focus:border-transparent transition-all duration-300 text-sm lg:text-base"
                  >
                    <option value="Any Price">Any Price</option>
                    <option value="$500k - $750k">$500k - $750k</option>
                    <option value="$750k - $1M">$750k - $1M</option>
                    <option value="$1M - $1.5M">$1M - $1.5M</option>
                    <option value="$1.5M+">$1.5M+</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-secondary-color hover:bg-secondary-dark text-white font-semibold py-3 lg:py-4 px-8 lg:px-12 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-secondary-color focus:ring-offset-2 text-base lg:text-lg"
              >
                <Search className="w-5 h-5" />
                Search Properties
              </button>
            </form>
          </div>

          {/* Popular Areas */}
          <div className="text-center">
            <p className="text-blue-100 mb-6 text-lg lg:text-xl">Popular Areas:</p>
            <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
              {popularAreas.map((area) => (
                <Link
                  key={area.name}
                  href={area.href}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-white/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm lg:text-base font-medium"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm">
        <div className="container py-6 lg:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="group">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-color group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
