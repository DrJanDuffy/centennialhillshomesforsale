import { motion } from 'framer-motion'; // Single motion import
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import NeighborhoodBar from '../components/NeighborhoodBar';
import RealScoutListings from '../components/RealScoutListings';
import SchoolInfo from '../components/SchoolInfo';

export default function ProvidenceLasVegas() {
  const [currentNeighborhood, setCurrentNeighborhood] = useState<
    'Centennial Hills' | 'The Trails' | 'Tournament Hills' | 'Skye Canyon' | 'Sun City Aliante'
  >('Centennial Hills');

  return (
    <Layout>
      <Head>
        <title>Providence Las Vegas Homes for Sale | Family Community Real Estate</title>
        <meta
          name="description"
          content="Browse homes for sale in Providence Las Vegas. Family-friendly community with parks, schools, and convenient access to Centennial Hills amenities."
        />
        <meta
          name="keywords"
          content="Providence Las Vegas homes, Providence real estate, family community Las Vegas, 89149 Providence homes"
        />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/providence-las-vegas" />
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
            <h1>Providence Las Vegas Real Estate</h1>
            <p className="hero-subtitle">
              Discover family-friendly living in Providence, a well-established community offering
              affordable homes, parks, and excellent school access in northwest Las Vegas.
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
            <h2>About Providence Las Vegas</h2>
            <div className="overview-grid">
              <div className="overview-content">
                <p>
                  Providence is a charming residential community that offers excellent value for
                  families seeking quality homes in northwest Las Vegas. With tree-lined streets,
                  neighborhood parks, and proximity to top-rated schools, Providence provides a
                  suburban lifestyle with urban conveniences.
                </p>
                <p>
                  The community features a mix of single-story and two-story homes built primarily
                  in the 2000s, offering modern amenities and thoughtful floor plans. Residents
                  enjoy easy access to shopping, dining, and recreation while maintaining a peaceful
                  neighborhood atmosphere.
                </p>
              </div>
              <div className="quick-stats">
                <h3>Quick Stats</h3>
                <ul>
                  <li>
                    <strong>Zip Code:</strong> 89149
                  </li>
                  <li>
                    <strong>Median Home Price:</strong> $485,000
                  </li>
                  <li>
                    <strong>Average Square Feet:</strong> 2,400
                  </li>
                  <li>
                    <strong>Built:</strong> 2000-2010
                  </li>
                  <li>
                    <strong>Population:</strong> ~15,000
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="community-features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="container">
            <h2>Providence Community Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>🏫 Excellent Schools</h3>
                <p>Zoned for Centennial High School and quality elementary/middle schools</p>
              </div>
              <div className="feature-card">
                <h3>🏞️ Parks & Recreation</h3>
                <p>Multiple neighborhood parks with playgrounds and walking paths</p>
              </div>
              <div className="feature-card">
                <h3>🛍️ Shopping Access</h3>
                <p>Close to Centennial Center and Downtown Summerlin shopping</p>
              </div>
              <div className="feature-card">
                <h3>🏠 Affordable Housing</h3>
                <p>Great value with homes ranging from $400K to $750K</p>
              </div>
            </div>
          </div>
        </motion.section>

        <SchoolInfo neighborhood="Providence" />

        <motion.section
          className="listings-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="container">
            <h2>Current Homes for Sale in Providence</h2>
            <div className="realscout-widget-container">
              <RealScoutListings
                agentEncodedId="QWdlbnQtMjI1MDUw"
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
