
import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import AdvancedSearch from '../components/AdvancedSearch';
import RealScoutWidget from '../components/widgets/RealScoutWidget';
import RealScoutListings from '../components/RealScoutListings';

export default function Listings() {
  const [searchFilters, setSearchFilters] = useState({
    priceMin: 0,
    priceMax: 2000000,
    beds: 'any',
    baths: 'any',
    sqftMin: 0,
    sqftMax: 10000,
    propertyType: 'any',
    features: [],
    neighborhood: 'all'
  });

  return (
    <Layout>
      <Head>
        <title>Homes for Sale in Centennial Hills Las Vegas | Browse All Listings</title>
        <meta name="description" content="Browse all homes for sale in Centennial Hills, Las Vegas. Search by price, bedrooms, bathrooms, and neighborhood. View photos, details, and schedule tours." />
        <meta name="keywords" content="Centennial Hills homes for sale, Las Vegas real estate listings, 89149 homes, 89166 properties, luxury homes Las Vegas" />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/listings" />
      </Head>

      <main className="container">
        <motion.section 
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Homes for Sale in Centennial Hills</h1>
          <p>
            Discover your perfect home in Las Vegas's premier Centennial Hills area. 
            Browse luxury homes, condos, and townhomes with detailed search filters and interactive maps.
          </p>
        </motion.section>

        <motion.section 
          className="search-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <AdvancedSearch 
            filters={searchFilters}
            onFiltersChange={setSearchFilters}
          />
        </motion.section>

        <motion.section 
          className="quick-searches"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2>Popular Searches in Centennial Hills</h2>
          <div className="quick-search-grid">
            <div className="quick-search-card">
              <h3>Luxury Homes $800K+</h3>
              <p>Premium properties with resort-style amenities</p>
              <button className="btn btn-outline">View Luxury Homes</button>
            </div>
            <div className="quick-search-card">
              <h3>Golf Course Properties</h3>
              <p>Homes with golf course views and access</p>
              <button className="btn btn-outline">View Golf Homes</button>
            </div>
            <div className="quick-search-card">
              <h3>New Construction</h3>
              <p>Brand new homes in Skye Canyon and surrounding areas</p>
              <button className="btn btn-outline">View New Homes</button>
            </div>
            <div className="quick-search-card">
              <h3>Family Homes</h3>
              <p>3+ bedrooms near top-rated schools</p>
              <button className="btn btn-outline">View Family Homes</button>
            </div>
            <div className="quick-search-card">
              <h3>Active Adult 55+</h3>
              <p>Sun City Aliante and similar communities</p>
              <button className="btn btn-outline">View 55+ Homes</button>
            </div>
            <div className="quick-search-card">
              <h3>Condos & Townhomes</h3>
              <p>Low-maintenance living options</p>
              <button className="btn btn-outline">View Condos</button>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="featured-neighborhoods"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2>Browse by Neighborhood</h2>
          <div className="neighborhood-links">
            <a href="/neighborhoods?area=centennial-hills" className="neighborhood-link">
              <h3>Centennial Hills</h3>
              <p>Master-planned luxury community</p>
            </a>
            <a href="/neighborhoods?area=the-trails" className="neighborhood-link">
              <h3>The Trails</h3>
              <p>Established community with mature trees</p>
            </a>
            <a href="/neighborhoods?area=tournament-hills" className="neighborhood-link">
              <h3>Tournament Hills</h3>
              <p>Golf course community with views</p>
            </a>
            <a href="/neighborhoods?area=skye-canyon" className="neighborhood-link">
              <h3>Skye Canyon</h3>
              <p>Newer master-planned community</p>
            </a>
          </div>
        </motion.section>

        <motion.section 
          className="listings-widget"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2>All Available Properties</h2>
          <RealScoutListings />
        </motion.section>

        <motion.section 
          className="local-expertise-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="cta-content">
            <h2>Need Help Finding the Perfect Home?</h2>
            <p>
              Our local expertise in Centennial Hills means we know every neighborhood, 
              school district, and community amenity. Let us help you find your dream home.
            </p>
            <div className="expertise-highlights">
              <span className="expertise">Neighborhood Expert</span>
              <span className="expertise">School District Knowledge</span>
              <span className="expertise">Market Analysis</span>
              <span className="expertise">Negotiation Skills</span>
            </div>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">Schedule Consultation</a>
              <a href="tel:+1234567890" className="btn btn-secondary">Call Now</a>
            </div>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
