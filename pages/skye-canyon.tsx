import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import NeighborhoodBar from '../components/NeighborhoodBar';
import SchoolInfo from '../components/SchoolInfo';
import RealScoutListings from '../components/RealScoutListings';
import { motion } from 'framer-motion';

export default function SkyeCanyon() {
  const [currentNeighborhood, setCurrentNeighborhood] = useState<'Centennial Hills' | 'The Trails' | 'Tournament Hills' | 'Skye Canyon' | 'Sun City Aliante'>('Skye Canyon');

  return (
    <Layout>
      <Head>
        <title>Skye Canyon Las Vegas Homes for Sale | New Construction & Family Community</title>
        <meta name="description" content="Explore homes for sale in Skye Canyon Las Vegas. Newer master-planned community with family amenities, parks, and new construction. Browse current listings." />
        <meta name="keywords" content="Skye Canyon homes for sale, Las Vegas new construction, family community, Skye Canyon Park, 89166 homes" />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/skye-canyon" />
      </Head>

      <main>
        <NeighborhoodBar 
          currentNeighborhood={currentNeighborhood}
          onNeighborhoodChange={setCurrentNeighborhood}
        />

        <motion.section 
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h1>Skye Canyon Las Vegas Real Estate</h1>
            <p className="hero-subtitle">
              Discover modern family living in one of Las Vegas&apos;s newest master-planned communities. 
              Featuring new construction homes, world-class amenities, and mountain views.
            </p>
          </div>
        </motion.section>

        <motion.section 
          className="area-overview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="container">
            <h2>About Skye Canyon</h2>
            <div className="overview-grid">
              <div className="overview-content">
                <p>
                  Skye Canyon is a vibrant, newer master-planned community that has quickly become 
                  one of Las Vegas&apos;s most sought-after neighborhoods. With its family-focused amenities, 
                  stunning mountain views, and modern homes, Skye Canyon offers the perfect blend of 
                  suburban tranquility and urban convenience.
                </p>
                <p>
                  The community features the spectacular Skye Canyon Park with its state-of-the-art 
                  recreation center, pools, sports courts, and extensive trail system. New construction 
                  homes range from $400K to $1.2M, offering something for every family.
                </p>
              </div>
              <div className="quick-stats">
                <h3>Quick Stats</h3>
                <ul>
                  <li><strong>Zip Code:</strong> 89166</li>
                  <li><strong>Median Home Price:</strong> $590,000</li>
                  <li><strong>Average Square Feet:</strong> 2,700</li>
                  <li><strong>Built:</strong> 2010-2024</li>
                  <li><strong>Population:</strong> ~35,000</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="amenities-spotlight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="container">
            <h2>Skye Canyon Park & Amenities</h2>
            <div className="amenities-grid">
              <div className="amenity-card">
                <h3>🏊‍♀️ Aquatic Center</h3>
                <p>Resort-style pools, lap pool, water slides, and children&apos;s splash area</p>
              </div>
              <div className="amenity-card">
                <h3>🏋️‍♀️ Fitness Center</h3>
                <p>State-of-the-art gym equipment, group fitness classes, and personal training</p>
              </div>
              <div className="amenity-card">
                <h3>🏞️ Trail System</h3>
                <p>Miles of walking and biking trails connecting throughout the community</p>
              </div>
              <div className="amenity-card">
                <h3>⚽ Sports Complex</h3>
                <p>Multi-sport courts, soccer fields, and youth league facilities</p>
              </div>
            </div>
          </div>
        </motion.section>

        <SchoolInfo neighborhood="Skye Canyon" />

        <motion.section 
          className="listings-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="container">
            <h2>Current Homes for Sale in Skye Canyon</h2>
            <div className="realscout-widget-container">
              <RealScoutListings
                agentId="QWdlbnQtMjI1MDUw"
                sortOrder="STATUS_AND_SIGNIFICANT_CHANGE"
                listingStatus="For Sale"
                propertyTypes="SFR,MF,TC"
                priceMin={450000}
              />
            </div>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}