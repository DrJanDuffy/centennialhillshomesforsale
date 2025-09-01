'use client';

import {
  ArrowLeftIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

export default function Custom404() {
  const { isDark } = useTheme();

  const helpfulLinks = [
    {
      title: 'Browse Homes',
      description: 'Explore our current listings',
      icon: HomeIcon,
      href: '/listings',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Search Properties',
      description: 'Find your dream home',
      icon: MagnifyingGlassIcon,
      href: '/properties',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Neighborhoods',
      description: 'Discover local areas',
      icon: MapPinIcon,
      href: '/neighborhoods',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="relative mb-8"
        >
          <div className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
            404
          </div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-sm font-bold">!</span>
          </motion.div>
        </motion.div>

        {/* Main Message */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Oops! Page Not Found
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
          >
            The page you're looking for seems to have wandered off into the Las Vegas desert. Don't
            worry though - we've got plenty of amazing homes waiting for you!
          </motion.p>

          {/* Back Button */}
          <motion.div variants={itemVariants}>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-semibold text-gray-900 dark:text-white mb-8"
          >
            Here's Where You Can Go Instead
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {helpfulLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <Link
                    href={link.href}
                    className="block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${link.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {link.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{link.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700"
        >
          <motion.h3
            variants={itemVariants}
            className="text-xl font-semibold text-gray-900 dark:text-white mb-6"
          >
            🏠 Fun Real Estate Facts
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <motion.div variants={itemVariants} className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Centennial Hills</strong> is one of Las Vegas's fastest-growing areas,
                  with new homes being built every month.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">
                  The average home in <strong>Providence</strong> sells within 15 days, making it
                  one of the most competitive markets.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Skye Canyon</strong> offers some of the best mountain views in the entire
                  Las Vegas valley.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">
                  Dr. Jan Duffy has helped over <strong>500 families</strong> find their dream homes
                  in these neighborhoods.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12"
        >
          <motion.div variants={itemVariants}>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Need help finding your dream home?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Contact Dr. Jan Duffy
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
