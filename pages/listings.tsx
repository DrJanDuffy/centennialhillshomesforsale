
import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Listings() {
  return (
    <Layout
      title="Centennial Hills Homes For Sale | Current Listings | Dr. Jan Duffy REALTOR®"
      description="Browse current homes for sale in Centennial Hills, Providence, and Skye Canyon. Expert real estate listings with Dr. Jan Duffy, top 1% Las Vegas REALTOR®. Call (702) 903-1952."
      canonical="https://centennialhillshomesforsale.com/listings"
    >
      <main className="container">
        <motion.section 
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Homes for Sale in Centennial Hills</h1>
          <p>
            Discover your perfect home in Las Vegas&apos;s premier Centennial Hills area. 
            Browse luxury homes, condos, and townhomes with detailed search filters and interactive maps.
          </p>
        </motion.section>



        {/* RealScout Your Listings */}
        <motion.section 
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
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

        <motion.section 
          className="featured-neighborhoods"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2>Browse by Neighborhood</h2>
          <div className="neighborhood-links">
            <Link href="/neighborhoods?area=centennial-hills" className="neighborhood-link">
              <h3>Centennial Hills</h3>
              <p>Master-planned luxury community</p>
            </Link>
            <Link href="/neighborhoods?area=the-trails" className="neighborhood-link">
              <h3>The Trails</h3>
              <p>Established community with mature trees</p>
            </Link>
            <Link href="/neighborhoods?area=tournament-hills" className="neighborhood-link">
              <h3>Tournament Hills</h3>
              <p>Golf course community with views</p>
            </Link>
            <Link href="/neighborhoods?area=skye-canyon" className="neighborhood-link">
              <h3>Skye Canyon</h3>
              <p>Newer master-planned community</p>
            </Link>
          </div>
        </motion.section>

        {/* RealScout Office Listings */}
        <motion.section 
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
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
          className="listings-widget"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2>All Available Properties</h2>
          <realscout-office-listings 
            agent-encoded-id="QWdlbnQtMjI1MDUw" 
            sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
            listing-status="For Sale" 
            property-types="SFR,MF,TC" 
            price-min="300000" 
            price-max="2000000">
          </realscout-office-listings>
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
              <Link href="/contact" className="btn btn-primary">Schedule Consultation</Link>
              <a href="tel:+1234567890" className="btn btn-secondary">Call Now</a>
            </div>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
