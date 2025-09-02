'use client';

import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah & Michael Johnson',
    role: 'Homebuyers',
    image: '/api/placeholder/80/80',
    rating: 5,
    content:
      "Dr. Jan Duffy made our dream of owning a home in Centennial Hills a reality. Her expertise in the local market and attention to detail exceeded our expectations. We couldn't be happier with our new home!",
    property: 'Providence Luxury Home',
    price: '$875,000',
    neighborhood: 'Providence',
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Investor',
    image: '/api/placeholder/80/80',
    rating: 5,
    content:
      "As an out-of-state investor, I needed someone I could trust completely. Dr. Duffy's market knowledge and professional approach helped me secure an excellent investment property in Skye Canyon.",
    property: 'Skye Canyon Investment Property',
    price: '$650,000',
    neighborhood: 'Skye Canyon',
  },
  {
    id: 3,
    name: 'Jennifer Martinez',
    role: 'Seller',
    image: '/api/placeholder/80/80',
    rating: 5,
    content:
      'Selling our family home was emotional, but Dr. Duffy handled everything with care and professionalism. We sold above asking price in just 8 days! Her marketing strategy was brilliant.',
    property: 'Centennial Hills Family Home',
    price: '$725,000',
    neighborhood: 'Centennial Hills',
  },
  {
    id: 4,
    name: 'Robert & Lisa Thompson',
    role: 'Luxury Buyers',
    image: '/api/placeholder/80/80',
    rating: 5,
    content:
      'We were looking for something truly special, and Dr. Duffy found us the perfect luxury home with mountain views. Her network and access to off-market properties is incredible.',
    property: 'Mountain View Estate',
    price: '$1.2M',
    neighborhood: 'Centennial Hills',
  },
  {
    id: 5,
    name: 'Amanda Rodriguez',
    role: 'First-time Buyer',
    image: '/api/placeholder/80/80',
    rating: 5,
    content:
      "As a first-time buyer, I was nervous about the process. Dr. Duffy guided me through every step and found me a beautiful starter home in Providence. I couldn't recommend her enough!",
    property: 'Providence Starter Home',
    price: '$580,000',
    neighborhood: 'Providence',
  },
];

export default function InteractiveTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <div className="container-responsive">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 mb-6">What Our Clients Say</h2>
          <p className="text-body-large text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about
            their experience with Dr. Jan Duffy and the Centennial Hills Real Estate team.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Background Quote Icon */}
              <div className="absolute top-4 right-4 text-blue-100 dark:text-blue-900/20">
                <span className="text-6xl font-serif">"</span>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-body-large text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {currentTestimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {currentTestimonial.role}
                    </div>
                  </div>
                </div>

                {/* Property Info */}
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {currentTestimonial.neighborhood}
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {currentTestimonial.property}
                  </div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {currentTestimonial.price}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { number: '500+', label: 'Happy Clients', icon: '👥' },
            { number: '98%', label: 'Satisfaction Rate', icon: '⭐' },
            { number: '15+', label: 'Years Experience', icon: '🏆' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="text-center group"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <h3 className="text-h3 mb-4">Ready to Experience the Difference?</h3>
            <p className="text-body text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have found their dream homes in Centennial
              Hills. Let Dr. Jan Duffy guide you through your real estate journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button type="button" className="btn btn-primary text-lg px-8 py-4 rounded-xl">
                Schedule Consultation
              </button>
              <button type="button" className="btn btn-outline text-lg px-8 py-4 rounded-xl">
                View Properties
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
