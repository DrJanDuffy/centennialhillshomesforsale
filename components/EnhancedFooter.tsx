'use client';

import {
  BuildingOfficeIcon,
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const socialLinks = [
  { name: 'Facebook', href: '#', icon: '📘', color: 'hover:text-blue-600' },
  { name: 'Twitter', href: '#', icon: '🐦', color: 'hover:text-blue-400' },
  { name: 'Instagram', href: '#', icon: '📷', color: 'hover:text-pink-500' },
  { name: 'LinkedIn', href: '#', icon: '💼', color: 'hover:text-blue-700' },
  { name: 'YouTube', href: '#', icon: '📺', color: 'hover:text-red-600' },
];

const quickLinks = [
  { name: 'Properties', href: '/properties' },
  { name: 'Neighborhoods', href: '/neighborhoods' },
  { name: 'Market Data', href: '/market-data' },
  { name: 'About Dr. Jan Duffy', href: '/about' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Blog', href: '/blog' },
];

const services = [
  { name: 'Buying', href: '/services/buying' },
  { name: 'Selling', href: '/services/selling' },
  { name: 'Investing', href: '/services/investing' },
  { name: 'Property Management', href: '/services/management' },
  { name: 'Mortgage Services', href: '/services/mortgage' },
  { name: 'Home Staging', href: '/services/staging' },
];

export default function EnhancedFooter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <footer
      className={`relative overflow-hidden ${
        isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative container-responsive">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 md:py-20"
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BuildingOfficeIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">Centennial Hills</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Luxury Real Estate</div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Experience luxury living in Las Vegas' most prestigious master-planned community.
                Dr. Jan Duffy brings you exclusive access to premium properties.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <MapPinIcon className="w-5 h-5 text-blue-600" />
                  <span>Centennial Hills, Las Vegas, NV</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <PhoneIcon className="w-5 h-5 text-blue-600" />
                  <span>(702) 555-0123</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                  <span>jan@centennialhills.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                  <ClockIcon className="w-5 h-5 text-blue-600" />
                  <span>Mon-Fri: 9AM-6PM</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                Our Services
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                Stay Updated
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Get the latest property updates and market insights delivered to your inbox.
              </p>

              {!isSubscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center"
                >
                  <div className="text-green-800 dark:text-green-200 font-medium">
                    🎉 Successfully subscribed!
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-300 mt-1">
                    Welcome to our community!
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Social Media & Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Social Media Links */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Follow us:</span>
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900/20 ${social.color}`}
                    aria-label={social.name}
                  >
                    <span className="text-xl">{social.icon}</span>
                  </Link>
                ))}
              </div>

              {/* Copyright */}
              <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-right">
                © {new Date().getFullYear()} Centennial Hills Real Estate. All rights reserved.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute bottom-6 right-6"
      >
        <Link
          href="/contact"
          className="group inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300"
        >
          <span>Get Started</span>
          <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </motion.div>
    </footer>
  );
}
