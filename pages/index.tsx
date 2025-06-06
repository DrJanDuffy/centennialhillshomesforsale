import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AwesomeHero from '@/components/AwesomeHero';
import AwesomeFeatures from '@/components/AwesomeFeatures';
import AwesomeEnhancements from '@/components/AwesomeEnhancements';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import LocalAmenities from '@/components/LocalAmenities';
import MarketTrendChart from '@/components/MarketTrendChart';
import SmartPropertyRecommendations from '@/components/SmartPropertyRecommendations';
import SEOOptimized from '@/components/SEOOptimized';

import React from 'react';
import PropertyCard from '../components/PropertyCard';
import { motion } from 'framer-motion';
import { Star, MapPin, TrendingUp, Users, Award, Phone, Home } from 'lucide-react';
import { Suspense } from 'react';

// Lazy load heavy components for better performance
const AIAssistant = dynamic(() => import('../components/AIAssistant'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>,
  ssr: false
});

const InteractivePropertyMap = dynamic(() => import('../components/InteractivePropertyMap'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>,
  ssr: false
});

const HomePage: React.FC = () => {
  const featuredProperties = [
    {
      id: '1',
      title: 'Luxury Home in Providence',
      price: 850000,
      beds: 4,
      baths: 3.5,
      sqft: 3200,
      image: '/images/providence-luxury-home.jpg',
      neighborhood: 'Providence',
      status: 'Active',
      daysOnMarket: 12,
      features: ['Pool', 'Mountain Views', 'Gourmet Kitchen', 'Smart Home']
    },
    {
      id: '2',
      title: 'Modern Estate in Centennial Hills',
      price: 1200000,
      beds: 5,
      baths: 4,
      sqft: 4100,
      image: '/images/centennial-hills-modern-estate.jpg',
      neighborhood: 'Centennial Hills',
      status: 'Active',
      daysOnMarket: 5,
      features: ['Guest House', 'Wine Cellar', 'Home Theater', 'Casita']
    },
    {
      id: '3',
      title: 'Family Home in Skye Canyon',
      price: 650000,
      beds: 4,
      baths: 3,
      sqft: 2800,
      image: '/images/skye-canyon-family-home.jpg',
      neighborhood: 'Skye Canyon',
      status: 'Active',
      daysOnMarket: 8,
      features: ['Open Floor Plan', 'Mountain Views', 'Upgraded Kitchen', 'Large Yard']
    }
  ];

  const stats = [
    { icon: Home, label: 'Homes Sold', value: '500+', color: 'text-blue-600' },
    { icon: Users, label: 'Happy Families', value: '500+', color: 'text-green-600' },
    { icon: Award, label: 'Years Experience', value: '15+', color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Average Days on Market', value: '12', color: 'text-orange-600' }
  ];

  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Layout
      title="Centennial Hills Homes For Sale | AI-Powered Property Search | Dr. Jan Duff"
      description="Discover your dream home in Centennial Hills, Providence, and Skye Canyon with AI-powered search technology. Expert real estate services by Dr. Jan Duff - Northwest Las Vegas specialist."
      canonical="https://centennialhillshomesforsale.com"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <AwesomeHero />
      </motion.div>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awesome Features */}
      <AwesomeFeatures />
      <AwesomeEnhancements />

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exceptional homes in Centennial Hills' most desirable neighborhoods
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              View All Properties
            </button>
          </motion.div>
        </div>
      </section>

      {/* Smart Property Recommendations */}
      <SmartPropertyRecommendations />

      {/* Interactive Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore Neighborhoods
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interactive map of Centennial Hills, Providence, and Skye Canyon communities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <InteractivePropertyMap />
          </motion.div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Market Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with real-time market data and trends
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MarketTrendChart />
          </motion.div>
        </div>
      </section>

      {/* Local Amenities */}
      <LocalAmenities />

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from satisfied homeowners
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah & Mike Johnson",
                location: "Providence",
                text: "Dr. Jan helped us find our dream home in Providence. Her knowledge of the area and AI-powered search tools made the process seamless!",
                rating: 5
              },
              {
                name: "Robert Chen",
                location: "Centennial Hills",
                text: "Exceptional service! Jan's expertise in luxury homes and market analysis was invaluable. Highly recommend for anyone buying in Northwest Las Vegas.",
                rating: 5
              },
              {
                name: "Maria Rodriguez",
                location: "Skye Canyon",
                text: "Professional, knowledgeable, and caring. Jan went above and beyond to help us find the perfect family home. The AI search feature saved us so much time!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {testimonial.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's start your home buying journey with AI-powered search and expert guidance
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+17029031952"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center transform hover:scale-105"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (702) 903-1952
              </a>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                Start AI Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <LeadCaptureForm />

      {/* AI Chat Widget */}
      <AIAssistant />
    </Layout>
  );
};

export default HomePage;