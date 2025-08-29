'use client';

import { ChevronDownIcon, HomeIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function EnhancedHero() {
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
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            isDark ? 'from-gray-900 via-blue-900 to-gray-900' : 'from-blue-50 via-white to-green-50'
          }`}
        />

        {/* Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/2 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
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
            <button
              type="button"
              className="btn btn-primary text-lg px-8 py-4 rounded-xl shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300"
            >
              View Available Properties
            </button>
            <button
              type="button"
              className="btn btn-outline text-lg px-8 py-4 rounded-xl border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 shadow-xl hover:shadow-white/25 transform hover:-translate-y-1 transition-all duration-300"
            >
              Schedule Consultation
            </button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
                         {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="group relative"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative p-8 rounded-2xl glass backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300">
                    {/* Icon Background */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-h4 text-white mb-3 font-semibold">{feature.title}</h3>
                    <p className="text-body-small text-white/80 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { number: '500+', label: 'Homes Sold' },
              { number: '$2.5B+', label: 'Total Value' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '15+', label: 'Years Experience' },
                         ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm text-white/70 uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDownIcon className="w-6 h-6" />
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400/60 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-green-400/50 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  );
}
