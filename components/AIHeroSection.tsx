'use client';

import { ChevronDownIcon, HomeIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function AIHeroSection() {
  const { isDark } = useTheme();

  const features = [
    {
      icon: HomeIcon,
      title: 'Luxury Homes',
      description: 'Premium properties in master-planned communities',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: MapPinIcon,
      title: 'Prime Location',
      description: 'Centennial Hills, Las Vegas finest neighborhood',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: StarIcon,
      title: 'Expert Service',
      description: 'Dr. Jan Duffy, Top 1% REALTOR®',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* AI-Generated Hero Image Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-image.jpg"
          alt="Luxury real estate in Centennial Hills, Las Vegas with mountain views"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Gradient Overlay for Enhanced Visual Appeal */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            isDark ? 'from-gray-900/60 via-blue-900/40 to-gray-900/60' : 'from-blue-900/30 via-transparent to-green-900/30'
          }`}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container-responsive text-center">
        {/* Theme Toggle */}
        <div className="absolute top-8 right-8 z-20">
          <ThemeToggle />
        </div>

        {/* Main Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-white mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            Top 1% REALTOR® in Las Vegas
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="text-display text-white mb-6 leading-tight">
            Discover Your Dream Home in
            <span className="block text-gradient bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Centennial Hills
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-body-large text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience luxury living in Las Vegas' most prestigious master-planned community. Dr.
            Jan Duffy brings you exclusive access to premium properties with stunning mountain
            views.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.a
              href="tel:702-222-1964"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Call 702-222-1964</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
            
            <motion.a
              href="/properties"
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View Properties</span>
            </motion.a>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center text-white/60"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDownIcon className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
