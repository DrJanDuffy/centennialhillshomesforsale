import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../components/Layout';
import RealScoutListingsSection from '../components/RealScoutListingsSection';

export default function Listings() {
  return (
    <Layout>
      <main className="container">
        <motion.section
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Current Real Estate Listings in Centennial Hills</h1>
          <p>
            Explore our exclusive collection of luxury homes, condos, and townhomes in Las
            Vegas&apos;s premier Centennial Hills area. Each listing features detailed property
            information, high-quality photos, and virtual tours. Filter by price, bedrooms,
            bathrooms, and more to find your perfect home.
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
            price-min="500000"
          ></realscout-your-listings>
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
            price-max="1200000"
          ></realscout-office-listings>
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
            price-max="2000000"
          ></realscout-office-listings>
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
              Our local expertise in Centennial Hills means we know every neighborhood, school
              district, and community amenity. Let us help you find your dream home.
            </p>
            <div className="expertise-highlights">
              <span className="expertise">Neighborhood Expert</span>
              <span className="expertise">School District Knowledge</span>
              <span className="expertise">Market Analysis</span>
              <span className="expertise">Negotiation Skills</span>
            </div>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-primary">
                Schedule Consultation
              </Link>
              <a href="tel:+1234567890" className="btn btn-secondary">
                Call Now
              </a>
            </div>
          </div>
        </motion.section>

        {/* RealScout Office Listings */}
        <RealScoutListingsSection
          title="All Available Properties"
          subtitle="Browse our complete inventory of homes for sale in Centennial Hills and surrounding areas"
        />
      </main>
    </Layout>
  );
}
