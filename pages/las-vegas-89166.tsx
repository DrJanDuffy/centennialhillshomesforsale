import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import NeighborhoodBar from '../components/NeighborhoodBar';
import RealScoutListings from '../components/RealScoutListings';
import SchoolInfo from '../components/SchoolInfo';

export default function LasVegas89166() {
  const [currentNeighborhood, setCurrentNeighborhood] = useState<
    'Centennial Hills' | 'The Trails' | 'Tournament Hills' | 'Skye Canyon' | 'Sun City Aliante'
  >('Skye Canyon');

  return (
    <Layout>
      <Head>
        <title>89166 Las Vegas Homes for Sale | Skye Canyon & North Las Vegas Real Estate</title>
        <meta
          name="description"
          content="Find homes for sale in Las Vegas 89166 zip code. Includes Skye Canyon master-planned community, new construction, and family amenities."
        />
        <meta
          name="keywords"
          content="89166 homes for sale, Las Vegas 89166, Skye Canyon real estate, new construction Las Vegas, family communities"
        />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/las-vegas-89166" />
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
            <h1>Las Vegas 89166 Homes for Sale</h1>
            <p className="hero-subtitle">
              Explore new construction and established homes in Las Vegas zip code 89166, featuring
              the award-winning Skye Canyon community and family-friendly neighborhoods.
            </p>
          </div>
        </motion.section>

        <motion.section
          className="zip-overview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="container">
            <h2>About 89166 Las Vegas</h2>
            <div className="overview-grid">
              <div className="overview-content">
                <p>
                  Zip code 89166 represents some of the newest and most innovative residential
                  development in Las Vegas. Anchored by the award-winning Skye Canyon master-planned
                  community, this area offers modern homes, cutting-edge amenities, and a strong
                  focus on family living and outdoor recreation.
                </p>
                <p>
                  The area features extensive parks, trails, and the spectacular Skye Canyon Park
                  recreation center. With new schools, shopping centers, and continued development,
                  89166 represents the future of Las Vegas suburban living.
                </p>
              </div>
              <div className="zip-stats">
                <h3>89166 Quick Facts</h3>
                <ul>
                  <li>
                    <strong>Population:</strong> ~45,000
                  </li>
                  <li>
                    <strong>Median Income:</strong> $78,000
                  </li>
                  <li>
                    <strong>Median Home Value:</strong> $590,000
                  </li>
                  <li>
                    <strong>Major Community:</strong> Skye Canyon
                  </li>
                  <li>
                    <strong>Development:</strong> Ongoing new construction
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="neighborhoods-in-zip"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="container">
            <h2>Communities in 89166</h2>
            <div className="neighborhood-cards">
              <div className="neighborhood-card">
                <h3>Skye Canyon</h3>
                <p className="price-range">$450K - $1.2M</p>
                <ul>
                  <li>Award-winning master plan</li>
                  <li>Skye Canyon Park recreation center</li>
                  <li>New construction available</li>
                  <li>Mountain and valley views</li>
                </ul>
                <Link href="/skye-canyon" className="btn btn-primary">
                  Explore Skye Canyon
                </Link>
              </div>

              <div className="neighborhood-card">
                <h3>North Centennial</h3>
                <p className="price-range">$500K - $900K</p>
                <ul>
                  <li>Established neighborhoods</li>
                  <li>Close to amenities</li>
                  <li>Family-friendly environment</li>
                  <li>Good school access</li>
                </ul>
                <Link href="/centennial-hills" className="btn btn-primary">
                  Explore Area
                </Link>
              </div>

              <div className="neighborhood-card">
                <h3>New Development Areas</h3>
                <p className="price-range">$400K - $800K</p>
                <ul>
                  <li>Brand new communities</li>
                  <li>Modern home designs</li>
                  <li>Planned amenities</li>
                  <li>Future growth potential</li>
                </ul>
                <Link href="/listings" className="btn btn-primary">
                  View New Homes
                </Link>
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
            <h2>Current Homes for Sale in 89166</h2>
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
