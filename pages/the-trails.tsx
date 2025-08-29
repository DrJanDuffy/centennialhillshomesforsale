import { motion } from 'framer-motion';
import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';
import LocalAmenities from '../components/LocalAmenities';
import NeighborhoodBar from '../components/NeighborhoodBar';
import SchoolInfo from '../components/SchoolInfo';

type NeighborhoodName =
  | 'Centennial Hills'
  | 'The Trails'
  | 'Tournament Hills'
  | 'Skye Canyon'
  | 'Sun City Aliante';

export default function TheTrails() {
  const [currentNeighborhood, setCurrentNeighborhood] =
    React.useState<NeighborhoodName>('The Trails');

  return (
    <Layout>
      <Head>
        <title>The Trails Las Vegas Homes for Sale | Family-Friendly Community</title>
        <meta
          name="description"
          content="Find homes for sale in The Trails Las Vegas. Family-friendly community with walking trails, parks, and excellent schools. Master-planned neighborhood in Centennial Hills."
        />
        <meta
          name="keywords"
          content="The Trails homes for sale, Las Vegas family community, walking trails, parks, excellent schools, master-planned neighborhood"
        />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/the-trails" />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Place',
              name: 'The Trails',
              description:
                'Family-friendly master-planned community in Centennial Hills featuring walking trails, parks, and excellent schools',
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
                  name: 'Walking Trails',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Community Parks',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Top-Rated Schools',
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
            <h1>The Trails Las Vegas Real Estate</h1>
            <p className="hero-subtitle">
              Discover family-friendly living in this master-planned community featuring scenic
              walking trails, beautiful parks, and award-winning schools in the heart of Centennial
              Hills.
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
            <h2>About The Trails</h2>
            <div className="overview-grid">
              <div className="overview-content">
                <p>
                  The Trails represents the perfect blend of suburban tranquility and modern
                  convenience. This master-planned community is renowned for its extensive network
                  of walking trails, lush parks, and strong sense of community.
                </p>
                <p>
                  Located in the desirable 89149 zip code, The Trails offers residents easy access
                  to shopping, dining, and entertainment while maintaining a peaceful,
                  family-oriented atmosphere. Home prices range from $550K to $1.5M with diverse
                  architectural styles.
                </p>
              </div>
              <div className="quick-stats">
                <h3>Quick Stats</h3>
                <ul>
                  <li>
                    <strong>Zip Code:</strong> 89149
                  </li>
                  <li>
                    <strong>Median Home Price:</strong> $675,000
                  </li>
                  <li>
                    <strong>Average Square Feet:</strong> 2,400
                  </li>
                  <li>
                    <strong>Walking Trails:</strong> 15+ miles
                  </li>
                  <li>
                    <strong>Population:</strong> ~12,000
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <SchoolInfo neighborhood="The Trails" />

        <LocalAmenities />

        <motion.section
          className="trails-amenities"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="container">
            <h2>The Trails Lifestyle & Amenities</h2>
            <div className="amenities-grid">
              <div className="amenity-card">
                <h3>Scenic Walking Trails</h3>
                <p>
                  Extensive network of paved walking trails throughout the community, perfect for
                  jogging, biking, and leisurely strolls with scenic desert and mountain views.
                </p>
              </div>
              <div className="amenity-card">
                <h3>Community Parks</h3>
                <p>
                  Multiple neighborhood parks with playgrounds, picnic areas, and recreational
                  facilities for families and children of all ages.
                </p>
              </div>
              <div className="amenity-card">
                <h3>Family-Friendly Environment</h3>
                <p>
                  Safe, welcoming community with active neighborhood watch programs and strong
                  community involvement in local events and activities.
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
            <h2>The Trails Market Insights</h2>
            <div className="insights-grid">
              <div className="insight-card">
                <h3>Family Appeal</h3>
                <p>
                  Strong demand from families seeking safe, amenity-rich communities with excellent
                  schools and recreational opportunities.
                </p>
              </div>
              <div className="insight-card">
                <h3>Trail Premium</h3>
                <p>
                  Homes with direct trail access command 10-15% premium pricing due to the high
                  value residents place on outdoor recreation.
                </p>
              </div>
              <div className="insight-card">
                <h3>Stable Appreciation</h3>
                <p>
                  Consistent 7-9% annual appreciation driven by strong family demand and limited new
                  construction in established communities.
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
            <h2>The Trails Property Gallery</h2>
            <div id="trails-images" className="property-images-grid">
              <div className="loading-placeholder">Loading The Trails property images...</div>
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
            <h2>Current Homes for Sale in The Trails</h2>
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
    </Layout>
  );
}
