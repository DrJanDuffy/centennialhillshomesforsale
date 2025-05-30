import { useRef } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import RealScoutWidget from '../components/widgets/RealScoutWidget';
import { FaHome, FaChartLine, FaHandshake } from 'react-icons/fa';

export default function About() {
  const scrollRef = useRef(null);

  return (
    <Layout>
      <Head>
        <title>About Us - Centennial Hills Homes For Sale</title>
        <meta name="description" content="Learn about our team and services at Centennial Hills Homes For Sale." />
      </Head>

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
          <h2>Market Analysis</h2>
          <div className="widget-container">
            <RealScoutWidget
              type="market-analysis"
              propertyId="12345"
              agentId="67890"
              brokerId="13579"
              clientId="24680"
              clientName="John Doe"
              clientEmail="john@example.com"
              clientPhone="555-0123"
              clientAddress="123 Main St"
              clientCity="Las Vegas"
              clientState="NV"
              clientZip="89149"
              clientBudget="500000"
              clientTimeline="3-6 months"
              clientPreferences="3+ beds, 2+ baths"
            />
          </div>
        </motion.section>

        <motion.section 
          className="section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2>Market Trends</h2>
          <div className="widget-container">
            <RealScoutWidget
              type="market-trends"
              propertyId="12345"
              agentId="67890"
              brokerId="13579"
              clientId="24680"
              clientName="John Doe"
              clientEmail="john@example.com"
              clientPhone="555-0123"
              clientAddress="123 Main St"
              clientCity="Las Vegas"
              clientState="NV"
              clientZip="89149"
              clientBudget="500000"
              clientTimeline="3-6 months"
              clientPreferences="3+ beds, 2+ baths"
            />
          </div>
        </motion.section>

        <motion.section 
          className="content-section section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="content-grid">
            <motion.div 
              className="content-block"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaHome className="icon" />
              <h2>Local Expertise</h2>
              <p>
                Our deep understanding of Centennial Hills and the greater Las Vegas market
                helps you make informed decisions about your real estate investments.
              </p>
            </motion.div>

            <motion.div 
              className="content-block"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaChartLine className="icon" />
              <h2>Market Analysis</h2>
              <p>
                Stay ahead with our comprehensive market analysis tools and reports,
                giving you the latest insights into property values and market trends.
              </p>
            </motion.div>

            <motion.div 
              className="content-block"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaHandshake className="icon" />
              <h2>Personalized Service</h2>
              <p>
                We provide tailored solutions for every client, ensuring your specific
                needs and goals are met throughout the buying or selling process.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="featured-listings-section section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2>Featured Listings</h2>
          <RealScoutWidget
            agentEncodedId="QWdlbnQtMjI1MDUw"
            sortOrder="STATUS_AND_SIGNIFICANT_CHANGE"
            listingStatus="For Sale"
            propertyTypes="SFR,MF,TC,OTHER"
            priceMin={500000}
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
              Let's start your journey to finding the perfect property in Centennial Hills.
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