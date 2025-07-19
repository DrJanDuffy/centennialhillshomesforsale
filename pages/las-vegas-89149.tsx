import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';
import SEOOptimized from '../components/SEOOptimized';
import NeighborhoodBar from '../components/NeighborhoodBar';
import SchoolInfo from '../components/SchoolInfo';
import RealScoutListings from '../components/RealScoutListings';
import { motion } from 'framer-motion';
import RealScoutWidget from '../components/widgets/RealScoutWidget';
import type { NeighborhoodName } from '../components/NeighborhoodBar';

export default function LasVegas89149() {
  const [currentNeighborhood, setCurrentNeighborhood] = useState('Centennial Hills');

  return (
    <Layout>
      <Head>
        <title>89149 Las Vegas Homes for Sale | Centennial Hills & Tournament Hills Real Estate</title>
        <meta name="description" content="Browse homes for sale in Las Vegas 89149 zip code. Includes Centennial Hills, Tournament Hills, and The Trails neighborhoods. Golf course communities and luxury homes." />
        <meta name="keywords" content="89149 homes for sale, Las Vegas 89149, Centennial Hills real estate, Tournament Hills homes, TPC Las Vegas golf" />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/las-vegas-89149" />
      </Head>

      <main>
        <NeighborhoodBar
          currentNeighborhood={currentNeighborhood as NeighborhoodName}
          onNeighborhoodChange={setCurrentNeighborhood}
        />

        <motion.section 
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h1>Las Vegas 89149 Homes for Sale</h1>
            <p className="hero-subtitle">
              Explore premium real estate in Las Vegas zip code 89149, featuring luxury golf course 
              communities, master-planned neighborhoods, and championship amenities.
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
            <h2>About 89149 Las Vegas</h2>
            <div className="overview-grid">
              <div className="overview-content">
                <p>
                  Zip code 89149 encompasses some of Las Vegas's most prestigious neighborhoods, 
                  including Centennial Hills, Tournament Hills, and portions of The Trails. 
                  This area is renowned for its championship golf courses, luxury homes, and 
                  family-friendly master-planned communities.
                </p>
                <p>
                  Residents enjoy access to TPC Las Vegas, Bear's Best Golf Course, top-rated 
                  schools, and proximity to Downtown Summerlin shopping and dining. Home prices 
                  range from $500K to $3M+ with diverse architectural styles and lot sizes.
                </p>
              </div>
              <div className="zip-stats">
                <h3>89149 Quick Facts</h3>
                <ul>
                  <li><strong>Population:</strong> ~52,000</li>
                  <li><strong>Median Income:</strong> $89,500</li>
                  <li><strong>Median Home Value:</strong> $675,000</li>
                  <li><strong>Major Neighborhoods:</strong> Centennial Hills, Tournament Hills, The Trails</li>
                  <li><strong>Golf Courses:</strong> TPC Las Vegas, Bear's Best</li>
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
            <h2>Neighborhoods in 89149</h2>
            <div className="neighborhood-cards">
              <div className="neighborhood-card">
                <h3>Centennial Hills</h3>
                <p className="price-range">$600K - $2.5M</p>
                <ul>
                  <li>TPC Las Vegas Golf Course</li>
                  <li>Master-planned luxury community</li>
                  <li>Custom and semi-custom homes</li>
                  <li>Gated sections available</li>
                </ul>
                <Link href="/centennial-hills" className="btn btn-primary">Explore Centennial Hills</Link>
              </div>

              <div className="neighborhood-card">
                <h3>Tournament Hills</h3>
                <p className="price-range">$500K - $1.8M</p>
                <ul>
                  <li>Bear's Best Golf Course</li>
                  <li>Mountain and city views</li>
                  <li>Established community</li>
                  <li>Premium lot locations</li>
                </ul>
                <Link href="/tournament-hills" className="btn btn-primary">Explore Tournament Hills</Link>
              </div>

              <div className="neighborhood-card">
                <h3>The Trails</h3>
                <p className="price-range">$550K - $1.5M</p>
                <ul>
                  <li>Mature landscaping</li>
                  <li>Walking trails throughout</li>
                  <li>Family-friendly environment</li>
                  <li>Close to shopping</li>
                </ul>
                <Link href="/the-trails" className="btn btn-primary">Explore The Trails</Link>
              </div>
            </div>
          </div>
        </motion.section>

        <SchoolInfo neighborhood="Centennial Hills" />

        <motion.section 
          className="listings-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="container">
            <h2>Current Homes for Sale in 89149</h2>
            <div className="realscout-widget-container">
              <RealScoutListings 
                agent-encoded-id="QWdlbnQtMjI1MDUw" 
                sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
                listing-status="For Sale" 
                property-types="SFR,MF,TC" 
                price-min="450000"
              />
            </div>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}