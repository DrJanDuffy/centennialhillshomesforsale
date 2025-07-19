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
    "Bear's Best Las Vegas Golf Club",
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