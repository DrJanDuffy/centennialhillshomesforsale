import React from 'react';
import Head from 'next/head';
import Hero from '../components/home/Hero';
import { motion } from 'framer-motion';
import { HomeIcon, ChartBarIcon, UserGroupIcon, MapIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { fetchRealEstateImages, getRandomFeaturedImage } from '../utils/unsplash';
import { UnsplashImage } from '../types/unsplash';

const features = [
  {
    name: 'Extensive Property Listings',
    description: 'Browse through our carefully curated selection of homes in Centennial Hills.',
    icon: HomeIcon,
  },
  {
    name: 'Market Analysis',
    description: 'Get detailed market insights and property valuations.',
    icon: ChartBarIcon,
  },
  {
    name: 'Expert Guidance',
    description: 'Work with experienced real estate professionals who know the area.',
    icon: UserGroupIcon,
  },
  {
    name: 'Neighborhood Insights',
    description: 'Discover detailed information about local amenities and community features.',
    icon: MapIcon,
  },
];

const HomePage = () => {
  const [featuredImages, setFeaturedImages] = useState<UnsplashImage[]>([]);
  const [articleImages, setArticleImages] = useState<UnsplashImage[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      // Fetch featured property images
      const images = await fetchRealEstateImages('luxury home', 3);
      setFeaturedImages(images);

      // Fetch article images
      const articleImgs = await fetchRealEstateImages('real estate market', 3);
      setArticleImages(articleImgs);
    };

    loadImages();
  }, []);

  return (
    <>
      <Head>
        <title>Centennial Hills Homes For Sale | Las Vegas Real Estate</title>
        <meta
          name="description"
          content="Find your dream home in Centennial Hills, Las Vegas. Browse our exclusive listings of houses, condos, and luxury properties."
        />
      </Head>

      <Hero />

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-[#0A2540] sm:text-4xl"
            >
              Why Choose Centennial Hills Homes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
            >
              Experience the best in Las Vegas real estate with our comprehensive services
              and local expertise.
            </motion.p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card relative flex flex-col items-center p-6 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F7F9FC] text-[#3A8DDE]">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#0A2540]">{feature.name}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0A2540] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Find Your Dream Home?
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Let us help you navigate the Centennial Hills real estate market. Our experts
                are ready to guide you through every step of your home buying journey.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="btn-primary bg-[#3A8DDE] hover:bg-[#16B286]">
                  Schedule a Viewing
                </button>
                <button className="btn-secondary border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#0A2540]">
                  Contact Us
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                <img
                  src="/images/luxury-home.jpg"
                  alt="Luxury Home Interior"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Homebot Valuation Widget */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#0A2540] sm:text-4xl">
              Get Your Home's Value
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Discover what your home is worth with our advanced valuation tool.
            </p>
          </div>
          <div className="mt-8">
            <div className="homebot-widget">
              {/* Homebot widget will be loaded here */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage; 