import { motion } from 'framer-motion';
import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';
import LocalAmenities from '../components/LocalAmenities';
import NeighborhoodBar from '../components/NeighborhoodBar';
import RealScoutListingsSection from '../components/RealScoutListingsSection';
import SchoolInfo from '../components/SchoolInfo';

type NeighborhoodName =
  | 'Centennial Hills'
  | 'The Trails'
  | 'Tournament Hills'
  | 'Skye Canyon'
  | 'Sun City Aliante';

export default function TournamentHills() {
  const [currentNeighborhood, setCurrentNeighborhood] =
    React.useState<NeighborhoodName>('Tournament Hills');

  return (
    <Layout>
      <Head>
        <title>Tournament Hills Las Vegas Homes for Sale | Championship Golf Community</title>
        <meta
          name="description"
          content="Find homes for sale in Tournament Hills Las Vegas. Championship golf community with Bear's Best Golf Course, luxury homes, and family amenities near Centennial Hills."
        />
        <meta
          name="keywords"
          content="Tournament Hills homes for sale, Las Vegas golf community, Bear's Best Golf Course, luxury homes Las Vegas, Championship golf"
        />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/tournament-hills" />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Place',
              name: 'Tournament Hills',
              description:
                'Luxury golf course community in Las Vegas featuring championship golf, custom homes, and resort-style amenities',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Las Vegas',
                addressRegion: 'NV',
                postalCode: '89149',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '36.268',
                longitude: '-115.328',
              },
              amenityFeature: [
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Championship Golf Course',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Resort-Style Amenities',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Mountain Views',
                  value: true,
                },
              ],
            }),
          }}
        />
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
            <h1>Tournament Hills Las Vegas Real Estate</h1>
            <p className="hero-subtitle">
              Experience championship golf living in Las Vegas's premier golf course community.
              Featuring Bear's Best Golf Course, custom luxury homes, and resort-style amenities.
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
            <h2>About Tournament Hills</h2>
            <div className="overview-grid">
              <div className="overview-content">
                <p>
                  Tournament Hills represents the pinnacle of golf course living in Las Vegas. This
                  prestigious community is centered around the championship Bear's Best Golf Course,
                  offering residents the opportunity to live on one of Nevada's most renowned golf
                  courses.
                </p>
                <p>
                  Home to PGA Tour professionals and golf enthusiasts alike, Tournament Hills
                  features custom-built luxury homes ranging from $500K to $2M+. The community
                  offers stunning mountain views, championship golf, and proximity to all the
                  amenities of Centennial Hills.
                </p>
              </div>
              <div className="quick-stats">
                <h3>Quick Stats</h3>
                <ul>
                  <li>
                    <strong>Zip Code:</strong> 89149
                  </li>
                  <li>
                    <strong>Median Home Price:</strong> $725,000
                  </li>
                  <li>
                    <strong>Average Square Feet:</strong> 2,600
                  </li>
                  <li>
                    <strong>Golf Course:</strong> Bear's Best (Championship)
                  </li>
                  <li>
                    <strong>Population:</strong> ~8,500
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <SchoolInfo neighborhood="Tournament Hills" />

        <LocalAmenities />

        <motion.section
          className="golf-amenities"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="container">
            <h2>Tournament Hills Golf & Amenities</h2>
            <div className="amenities-grid">
              <div className="amenity-card">
                <h3>Bear's Best Golf Course</h3>
                <p>
                  Championship 18-hole golf course designed by renowned golf course architect. Home
                  to professional tournaments and a challenging par 72 layout.
                </p>
              </div>
              <div className="amenity-card">
                <h3>Resort-Style Clubhouse</h3>
                <p>
                  Full-service clubhouse with fine dining, pro shop, fitness center, and social
                  amenities for residents and guests.
                </p>
              </div>
              <div className="amenity-card">
                <h3>Golf Course Living</h3>
                <p>
                  Many homes offer direct golf course views and proximity to fairways, creating an
                  unparalleled golf lifestyle experience.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="market-insights"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="container">
            <h2>Tournament Hills Market Insights</h2>
            <div className="insights-grid">
              <div className="insight-card">
                <h3>Golf Course Premium</h3>
                <p>
                  Homes with golf course views command 15-25% premium pricing compared to similar
                  homes without direct course access.
                </p>
              </div>
              <div className="insight-card">
                <h3>Year-Round Appeal</h3>
                <p>
                  Strong demand from golf enthusiasts, retirees, and luxury home buyers seeking
                  championship golf living.
                </p>
              </div>
              <div className="insight-card">
                <h3>Appreciation Potential</h3>
                <p>
                  Historic 12% annual appreciation driven by limited inventory and growing demand
                  for golf course communities.
                </p>
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
            <h2>Tournament Hills Property Gallery</h2>
            <div id="tournament-hills-images" className="property-images-grid">
              <div className="loading-placeholder">Loading Tournament Hills property images...</div>
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
            <h2>Current Homes for Sale in Tournament Hills</h2>
            <div className="realscout-widget-container">
              <realscout-office-listings
                agent-encoded-id="QWdlbnQtMjI1MDUw"
                sort-order="STATUS_AND_SIGNIFICANT_CHANGE"
                listing-status="For Sale"
                property-types="SFR,MF,TC"
                price-min="500000"
              ></realscout-office-listings>
            </div>
          </div>
        </motion.section>
      </main>
      {/* RealScout Office Listings */}
      <RealScoutListingsSection
        title="Current Listings"
        subtitle="Browse our latest property listings in Centennial Hills and surrounding areas"
      />
    </Layout>
  );
}
