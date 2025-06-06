
import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import NeighborhoodBar from '../components/NeighborhoodBar';
import SchoolInfo from '../components/SchoolInfo';
import RealScoutWidget from '../components/widgets/RealScoutWidget';

export default function NorthwestLasVegas() {
  const [currentNeighborhood, setCurrentNeighborhood] = useState('Centennial Hills');

  return (
    <Layout>
      <Head>
        <title>Northwest Las Vegas Homes for Sale | Centennial Hills Area Real Estate</title>
        <meta name="description" content="Discover homes for sale in Northwest Las Vegas including Centennial Hills, Skye Canyon, and surrounding communities. Master-planned living with top amenities." />
        <meta name="keywords" content="Northwest Las Vegas homes, Centennial Hills real estate, Skye Canyon, northwest valley homes, Las Vegas suburbs" />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/northwest-las-vegas" />
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
            <h1>Northwest Las Vegas Real Estate</h1>
            <p className="hero-subtitle">
              Explore the premier residential communities of Northwest Las Vegas, featuring 
              master-planned neighborhoods, championship golf, top schools, and stunning desert views.
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
            <h2>Northwest Las Vegas Overview</h2>
            <div className="overview-grid">
              <div className="overview-content">
                <p>
                  Northwest Las Vegas represents the pinnacle of planned community living in the 
                  valley. This rapidly growing area encompasses prestigious neighborhoods like 
                  Centennial Hills, Skye Canyon, The Trails, and Tournament Hills, offering 
                  residents an unmatched quality of life.
                </p>
                <p>
                  The region features championship golf courses, A-rated schools, extensive 
                  shopping and dining at Downtown Summerlin, and easy access to Red Rock Canyon 
                  for outdoor recreation. Home prices range from $400K for starter homes to 
                  $3M+ for luxury estates.
                </p>
              </div>
              <div className="quick-stats">
                <h3>Area Highlights</h3>
                <ul>
                  <li><strong>Major Communities:</strong> Centennial Hills, Skye Canyon, The Trails</li>
                  <li><strong>Golf Courses:</strong> TPC Las Vegas, Bear's Best, Angel Park</li>
                  <li><strong>Shopping:</strong> Downtown Summerlin, Centennial Center</li>
                  <li><strong>Schools:</strong> Top-rated CCSD schools</li>
                  <li><strong>Recreation:</strong> Red Rock Canyon, multiple parks</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="featured-communities"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="container">
            <h2>Featured Northwest Communities</h2>
            <div className="communities-grid">
              <div className="community-card">
                <h3>Centennial Hills</h3>
                <p className="price-range">$500K - $3M+</p>
                <p>Master-planned luxury community with TPC Las Vegas golf course and custom homes.</p>
                <a href="/centennial-hills" className="btn btn-primary">Explore</a>
              </div>
              
              <div className="community-card">
                <h3>Skye Canyon</h3>
                <p className="price-range">$450K - $1.2M</p>
                <p>Award-winning new community with recreation center and family amenities.</p>
                <a href="/skye-canyon" className="btn btn-primary">Explore</a>
              </div>
              
              <div className="community-card">
                <h3>The Trails</h3>
                <p className="price-range">$550K - $2M</p>
                <p>Established community with mature landscaping and walking trails.</p>
                <a href="/neighborhoods" className="btn btn-primary">Explore</a>
              </div>
              
              <div className="community-card">
                <h3>Tournament Hills</h3>
                <p className="price-range">$500K - $1.8M</p>
                <p>Golf course community with Bear's Best and mountain views.</p>
                <a href="/neighborhoods" className="btn btn-primary">Explore</a>
              </div>
            </div>
          </div>
        </motion.section>

        <SchoolInfo selectedNeighborhood="Centennial Hills" />

        <motion.section 
          className="why-northwest"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="container">
            <h2>Why Choose Northwest Las Vegas?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>🏫 Top Schools</h3>
                <p>Access to some of Clark County's highest-rated schools and educational programs</p>
              </div>
              <div className="benefit-card">
                <h3>🏌️ Championship Golf</h3>
                <p>Multiple world-class golf courses including TPC Las Vegas and Bear's Best</p>
              </div>
              <div className="benefit-card">
                <h3>🛍️ Premium Shopping</h3>
                <p>Downtown Summerlin offers over 125 stores, restaurants, and entertainment</p>
              </div>
              <div className="benefit-card">
                <h3>🏞️ Outdoor Recreation</h3>
                <p>Red Rock Canyon, extensive trail systems, and numerous parks nearby</p>
              </div>
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
            <h2>Current Homes for Sale in Northwest Las Vegas</h2>
            <RealScoutWidget 
              filterByZip="89149,89166"
              neighborhood="Northwest Las Vegas"
            />
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
