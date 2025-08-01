import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import RealScoutWidget from '../components/widgets/RealScoutWidget';

export default function About() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scrollRef = React.useRef(null);

  return (
    <Layout
      title="About Dr. Jan Duffy | Top 1% Las Vegas REALTOR® | Centennial Hills Homes For Sale"
      description="Learn about Dr. Jan Duffy, Top 1% Las Vegas REALTOR® with 30+ years experience in Centennial Hills, Providence, and Skye Canyon luxury real estate. Call (702) 903-1952."
      canonical="https://centennialhillshomesforsale.com/about/"
    >

      <main className="container">
        <motion.section 
          className="section hero-about"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-hero-content">
            <div className="agent-profile">
              <h1>Dr. Jan Duffy, REALTOR®</h1>
              <h2>Top 1% Las Vegas Real Estate Expert</h2>
              <div className="credentials">
                <span className="credential">🏢 Berkshire Hathaway HomeServices</span>
                <span className="credential">📅 Licensed Since September 1993</span>
                <span className="credential">⭐ 4.9/5 Star Rating</span>
                <span className="credential">📞 (702) 903-1952</span>
              </div>
            </div>
            <div className="about-description">
              <p>
                With over 30 years of Las Vegas real estate experience, Dr. Jan Duffy specializes in luxury 
                and new-build homes in North Las Vegas master-planned communities. From Centennial Hills to 
                Providence, Skye Canyon to Summerlin, Dr. Duffy provides expert guidance with same-day showings 
                and personalized service available 24/7.
              </p>
              <p>
                Ranked in the Top 1% of Las Vegas REALTORS®, Dr. Duffy offers expert market analysis, 
                professional photography, and comprehensive marketing strategies to help you buy or sell 
                your Las Vegas home with confidence.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2>Property Search</h2>
          <div className="widget-container">
            <RealScoutWidget
              type="search"
              title="Find Your Dream Home"
              description="Search properties in Centennial Hills and surrounding areas"
              priceMin={400000}
              priceMax={1200000}
              propertyTypes="SFR"
            />
          </div>
        </motion.section>

        <motion.section 
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2>Featured Properties</h2>
          <div className="widget-container">
            <RealScoutWidget
              type="office-listings"
              title="Featured Properties"
              description="Handpicked properties in Centennial Hills and surrounding communities"
              priceMin={500000}
              priceMax={1500000}
              propertyTypes="SFR,MF,TC"
            />
          </div>
        </motion.section>

        {/* RealScout Your Listings */}
        <motion.section 
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2>Your Listings</h2>
            <p>Browse our latest properties in Centennial Hills and surrounding areas</p>
          </div>
          <realscout-your-listings 
            agent-encoded-id="QWdlbnQtMjI1MDUw" 
            sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
            listing-status="For Sale,Sold" 
            property-types="SFR" 
            price-min="500000">
          </realscout-your-listings>
        </motion.section>

        {/* RealScout Office Listings */}
        <motion.section 
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2>Current Listings</h2>
            <p>Browse our latest properties in Centennial Hills and surrounding areas</p>
          </div>
          <realscout-office-listings 
            agent-encoded-id="QWdlbnQtMjI1MDUw" 
            sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
            listing-status="For Sale" 
            property-types="SFR,MF,TC" 
            price-min="600000" 
            price-max="1200000">
          </realscout-office-listings>
        </motion.section>

        <motion.section 
          className="featured-listings-section section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2>Luxury Properties</h2>
          <RealScoutWidget
            type="office-listings"
            title="Luxury Properties"
            description="Exclusive luxury homes in Providence and premium neighborhoods"
            priceMin={800000}
            priceMax={2000000}
            propertyTypes="SFR"
            className="featured-listings-widget"
          />
        </motion.section>

        <motion.section 
          className="cta-section section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="cta-container">
            <h2>Ready to Find Your Dream Home?</h2>
            <p>
              Let&apos;s start your journey to finding the perfect property in Centennial Hills.
              Our team is here to help every step of the way.
            </p>
            <div className="cta-buttons">
              <motion.a 
                href="/contact" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.a>
              <motion.a 
                href="/listings" 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Listings
              </motion.a>
            </div>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}