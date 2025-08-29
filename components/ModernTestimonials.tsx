import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useEffect, useState } from 'react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  content: string;
  image: string;
  propertyType: string;
  salePrice: string;
}

const ModernTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah & Michael Johnson',
      location: 'Centennial Hills',
      rating: 5,
      content:
        'Dr. Jan Duffy made our home buying experience absolutely seamless. Her knowledge of the Centennial Hills market is unmatched, and she found us the perfect family home within our budget. We couldn&apos;t be happier!',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      propertyType: 'Luxury Family Home',
      salePrice: '$875,000',
    },
    {
      id: '2',
      name: 'David Chen',
      location: 'Providence',
      rating: 5,
      content:
        'As a first-time homebuyer, I was nervous about the process. Dr. Duffy guided me through every step with patience and expertise. She found me a beautiful home in Providence that exceeded my expectations.',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      propertyType: 'First Home',
      salePrice: '$650,000',
    },
    {
      id: '3',
      name: 'Jennifer & Robert Martinez',
      location: 'Skye Canyon',
      rating: 5,
      content:
        'We were looking to downsize and Dr. Duffy found us the perfect home in Skye Canyon. Her attention to detail and understanding of our needs made all the difference. Highly recommend!',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      propertyType: 'Downsized Home',
      salePrice: '$720,000',
    },
    {
      id: '4',
      name: 'Thomas Williams',
      location: 'Northwest Las Vegas',
      rating: 5,
      content:
        'Dr. Duffy helped me sell my home above asking price in just 8 days! Her marketing strategy and negotiation skills are incredible. She truly is the best REALTOR in the area.',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      propertyType: 'Sold Home',
      salePrice: '$1,200,000',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section bg-gradient-to-br from-primary-color via-primary-dark to-primary-light">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 lg:mb-8">
            What Our Clients
            <span className="block text-blue-200 mt-2">Say About Us</span>
          </h2>
          <p className="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t just take our word for it - hear from families who found their dream homes
            with Dr. Jan Duffy
          </p>
        </div>

        {/* Testimonial Display */}
        <div className="max-w-4xl mx-auto">
          <div className="card bg-white/95 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl relative">
            {/* Quote Icon */}
            <div className="absolute top-6 left-8 text-secondary-color opacity-20">
              <Quote className="w-12 h-12 lg:w-16 lg:h-16" />
            </div>

            {/* Testimonial Content */}
            <div className="text-center relative z-10">
              {/* Rating Stars */}
              <div className="flex justify-center mb-6 lg:mb-8">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star
                    key={`star-${currentTestimonial.id}-${i}`}
                    className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg lg:text-xl xl:text-2xl text-gray-800 mb-8 lg:mb-10 leading-relaxed italic">
                &quot;{currentTestimonial.content}&quot;
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-center gap-4 mb-6 lg:mb-8">
                <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden">
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 56px, 64px"
                  />
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900 text-base lg:text-lg">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-secondary-color text-sm lg:text-base">
                    {currentTestimonial.location}
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-blue-50 rounded-xl p-4 lg:p-6 inline-block">
                <div className="text-sm text-gray-600">Property Type</div>
                <div className="font-semibold text-primary-color text-base lg:text-lg">
                  {currentTestimonial.propertyType}
                </div>
                <div className="text-sm text-gray-600 mt-1 lg:mt-2">Sale Price</div>
                <div className="font-bold text-primary-color text-lg lg:text-xl">
                  {currentTestimonial.salePrice}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-secondary-color p-2 lg:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <button
              type="button"
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-secondary-color p-2 lg:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 lg:mt-10 gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={`dot-${testimonial.id}`}
                type="button"
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-white/20">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Join Our Happy Clients?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed text-base lg:text-lg">
              Let Dr. Jan Duffy help you find your perfect home in Centennial Hills and experience
              the same exceptional service our clients rave about.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
              <Link
                href="/contact"
                className="bg-white text-secondary-color hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105 text-base lg:text-lg"
              >
                Start Your Journey
              </Link>
              <Link
                href="/testimonials"
                className="border-2 border-white text-white hover:bg-white hover:text-secondary-color px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105 text-base lg:text-lg"
              >
                Read More Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernTestimonials;
