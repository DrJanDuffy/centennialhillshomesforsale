
import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import NeighborhoodBar from '../components/NeighborhoodBar';
import SchoolInfo from '../components/SchoolInfo';
import LocalAmenities from '../components/LocalAmenities';

type NeighborhoodName = 'Centennial Hills' | 'The Trails' | 'Tournament Hills' | 'Skye Canyon' | 'Sun City Aliante';

export default function CentennialHills() {
  const [currentNeighborhood, setCurrentNeighborhood] = React.useState<NeighborhoodName>('Centennial Hills');

  return (
    <Layout>
      <Head>
        <title>Centennial Hills Las Vegas Homes for Sale | Real Estate Guide 2024</title>
        <meta name="description" content="Find homes for sale in Centennial Hills Las Vegas. Master-planned community with luxury homes, TPC Las Vegas Golf, top schools. Browse listings & neighborhood info." />
        <meta name="keywords" content="Centennial Hills homes for sale, Las Vegas real estate, TPC Las Vegas, master-planned community, luxury homes Las Vegas" />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/centennial-hills" />
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
            <h1>Centennial Hills Las Vegas Real Estate</h1>
            <p className="hero-subtitle">
              Discover luxury living in Las Vegas&apos;s premier master-planned community. 
              Featuring championship golf, top-rated schools, and stunning desert homes.
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
            <h2>About Centennial Hills</h2>
            <div className="overview-grid">
              <div className="overview-content">
                <p>
                  Centennial Hills represents the pinnacle of Las Vegas luxury living. This master-planned 
                  community offers an unparalleled lifestyle with championship golf at TPC Las Vegas, 
                  A+ rated schools, and stunning custom homes ranging from $500K to $3M+.
                </p>
                <p>
                  Located in the northwest valley, Centennial Hills provides easy access to Downtown 
                  Summerlin, Red Rock Canyon, and the Las Vegas Strip while maintaining a peaceful, 
                  family-friendly atmosphere.
                </p>
              </div>
              <div className="quick-stats">
                <h3>Quick Stats</h3>
                <ul>
                  <li><strong>Zip Codes:</strong> 89149, 89166</li>
                  <li><strong>Median Home Price:</strong> $650,000</li>
                  <li><strong>Average Square Feet:</strong> 2,800</li>
                  <li><strong>Built:</strong> 2005-2020</li>
                  <li><strong>Population:</strong> ~45,000</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <SchoolInfo neighborhood="Centennial Hills" />
        
        <LocalAmenities />

        <motion.section 
          className="market-insights"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="container">
            <h2>Centennial Hills Market Insights</h2>
            <div className="insights-grid">
              <div className="insight-card">
                <h3>Market Trends</h3>
                <p>Home values have increased 8.2% year-over-year, with strong demand for golf course properties and new construction.</p>
              </div>
              <div className="insight-card">
                <h3>Popular Features</h3>
                <p>Buyers seek golf course views, gated communities, pools, and proximity to TPC Las Vegas and shopping.</p>
              </div>
              <div className="insight-card">
                <h3>Investment Potential</h3>
                <p>Strong rental market with vacation rental opportunities near championship golf courses.</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="photo-gallery-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="container">
            <h2>Centennial Hills Property Gallery</h2>
            <div id="centennial-images" className="property-images-grid">
              <div className="loading-placeholder">Loading Centennial Hills property images...</div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="listings-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="container">
            <h2>Current Homes for Sale in Centennial Hills</h2>
            <div className="realscout-widget-container">
              <realscout-office-listings 
                agent-encoded-id="QWdlbnQtMjI1MDUw" 
                sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
                listing-status="For Sale" 
                property-types="SFR,MF,TC" 
                price-min="450000">
              </realscout-office-listings>
            </div>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
