import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MapPinIcon, StarIcon, ClockIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { GlobeAltIcon } from '@heroicons/react/24/solid';

import { motion } from 'framer-motion';

const amenitiesData = {
  'Shopping & Dining': [
    'Downtown Summerlin (5 minutes)',
    'Red Rock Casino Resort (10 minutes)',
    'Boca Park Fashion Village (12 minutes)',
    'Las Vegas Premium Outlets North (8 minutes)',
    'Whole Foods Market (7 minutes)',
    'Target Centennial Hills (3 minutes)'
  ],
  'Recreation & Parks': [
    'TPC Las Vegas Golf Course',
    'Bear\'s Best Las Vegas Golf Club',
    'Centennial Hills Park',
    'Skye Canyon Park & Dog Park',
    'Floyd Lamb Park at Tule Springs',
    'Angel Park Golf Club'
  ],
  'Healthcare': [
    'Centennial Hills Hospital (5 minutes)',
    'Valley Health System (8 minutes)',
    'Quest Diagnostics (6 minutes)',
    'CVS Pharmacy (4 minutes)',
    'Walgreens (3 minutes)',
    'Northwest Medical Group (7 minutes)'
  ],
  'Transportation': [
    'McCarran International Airport (25 minutes)',
    'I-215 Beltway Access (5 minutes)',
    'US-95 Highway Access (8 minutes)',
    'Downtown Las Vegas (20 minutes)',
    'Las Vegas Strip (18 minutes)',
    'RTC Bus Routes Available'
  ]
};

export default function LocalAmenities() {
  return (
    <motion.section 
      className="amenities-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <h2>Local Amenities & Attractions</h2>
        <p className="amenities-intro">
          Centennial Hills offers convenient access to shopping, dining, recreation, and essential services. 
          Discover what makes this Las Vegas community so desirable.
        </p>

        <div className="amenities-grid">
          {Object.entries(amenitiesData).map(([category, items], index) => (
            <motion.div 
              key={category}
              className="amenity-category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <h3>{category}</h3>
              <ul>
                {items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="distance-note">
          <p>
            <strong>Note:</strong> Drive times are approximate and may vary based on traffic conditions. 
            Centennial Hills' strategic location provides easy access to all areas of Las Vegas.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
import React from 'react';
import { MapPin, GraduationCap, ShoppingBag, Coffee, TreePine, Car } from 'lucide-react';

const LocalAmenities: React.FC = () => {
  const amenities = [
    {
      icon: GraduationCap,
      title: 'Top-Rated Schools',
      description: 'Centennial High School, Desert Pines Elementary',
      distance: '0.5-2 miles'
    },
    {
      icon: ShoppingBag,
      title: 'Shopping Centers',
      description: 'Downtown Summerlin, Las Vegas North Premium Outlets',
      distance: '5-10 miles'
    },
    {
      icon: TreePine,
      title: 'Parks & Recreation',
      description: 'Centennial Hills Park, Desert Breeze Park',
      distance: '1-3 miles'
    },
    {
      icon: Coffee,
      title: 'Dining & Entertainment',
      description: 'Red Rock Casino, Local restaurants',
      distance: '3-7 miles'
    },
    {
      icon: Car,
      title: 'Transportation',
      description: 'Easy access to US-95, I-215 Beltway',
      distance: '2-5 miles'
    },
    {
      icon: MapPin,
      title: 'Medical Facilities',
      description: 'Centennial Hills Hospital, UMC',
      distance: '3-8 miles'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Local Amenities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need is nearby in Centennial Hills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <amenity.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{amenity.title}</h3>
              </div>
              <p className="text-gray-600 mb-3">{amenity.description}</p>
              <p className="text-sm text-blue-600 font-medium">{amenity.distance}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalAmenities;