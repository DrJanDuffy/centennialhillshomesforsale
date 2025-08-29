import { Home, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react';

interface Neighborhood {
  name: string;
  description: string;
  image: string;
  href: string;
  features: string[];
  priceRange: string;
  homesCount: number;
  rating: number;
}

const ModernNeighborhoods: React.FC = () => {
  const neighborhoods = useMemo(
    (): Neighborhood[] => [
      {
        name: 'Centennial Hills',
        description:
          'Las Vegas&apos; most prestigious master-planned community featuring luxury homes with mountain views and world-class amenities.',
        image:
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&q=75',
        href: '/centennial-hills',
        features: ['Mountain Views', 'Golf Course Access', 'Top Schools', 'Shopping Centers'],
        priceRange: '$750k - $2M+',
        homesCount: 150,
        rating: 4.9,
      },
      {
        name: 'Providence',
        description:
          'Family-friendly neighborhood with excellent schools, parks, and community events in a safe, welcoming environment.',
        image:
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=75',
        href: '/providence-las-vegas',
        features: ['Family-Oriented', 'Excellent Schools', 'Community Parks', 'Walking Trails'],
        priceRange: '$500k - $1.2M',
        homesCount: 89,
        rating: 4.8,
      },
      {
        name: 'Skye Canyon',
        description:
          'Outdoor lifestyle community with hiking trails, parks, and active living opportunities for nature enthusiasts.',
        image:
          'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop&q=75',
        href: '/skye-canyon',
        features: ['Hiking Trails', 'Outdoor Recreation', 'Modern Homes', 'Community Events'],
        priceRange: '$600k - $1.5M',
        homesCount: 75,
        rating: 4.7,
      },
      {
        name: 'Northwest Las Vegas',
        description:
          'Growing area with new construction, shopping centers, and easy access to major highways and attractions.',
        image:
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=75',
        href: '/northwest-las-vegas',
        features: ['New Construction', 'Shopping Centers', 'Easy Access', 'Growth Area'],
        priceRange: '$400k - $1M',
        homesCount: 200,
        rating: 4.6,
      },
    ],
    []
  );

  const handleNeighborhoodClick = useCallback((neighborhoodName: string) => {
    // Analytics tracking could be added here
    console.log(`User clicked on ${neighborhoodName} neighborhood`);
  }, []);

  return (
    <section className="section bg-gradient-soft">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
            Explore Our
            <span className="block text-secondary-color mt-2">Featured Neighborhoods</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the unique character and lifestyle each community offers in the Centennial
            Hills area
          </p>
        </div>

        {/* Neighborhoods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {neighborhoods.map((neighborhood) => (
            <Link
              key={neighborhood.name}
              href={neighborhood.href}
              className="card block transform hover:-translate-y-2 overflow-hidden group"
              onClick={() => handleNeighborhoodClick(neighborhood.name)}
            >
              {/* Image with Lazy Loading */}
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <Image
                  src={neighborhood.image}
                  alt={`${neighborhood.name} neighborhood`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-900">{neighborhood.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-secondary-color" />
                  <h3 className="text-xl lg:text-2xl font-bold text-primary-color">
                    {neighborhood.name}
                  </h3>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  {neighborhood.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.features.slice(0, 2).map((feature) => (
                      <span
                        key={feature}
                        className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    <span>{neighborhood.homesCount} homes</span>
                  </div>
                  <div className="font-semibold text-secondary-color">
                    {neighborhood.priceRange}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="w-full bg-secondary-color hover:bg-secondary-dark text-white text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary-color focus:ring-offset-2">
                  Explore {neighborhood.name}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-secondary-color to-secondary-dark rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Find Your Perfect Neighborhood?
            </h3>
            <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let Dr. Jan Duffy guide you through the best communities in Centennial Hills and help
              you find your dream home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
              <Link
                href="/contact"
                className="bg-white text-secondary-color hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-secondary-color text-base lg:text-lg"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/listings"
                className="border-2 border-white text-white hover:bg-white hover:text-secondary-color px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-secondary-color text-base lg:text-lg"
              >
                View All Listings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernNeighborhoods;
