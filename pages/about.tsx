import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { FaHome, FaChartLine, FaHandshake } from 'react-icons/fa';

const AboutPage = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Load third-party scripts after component mounts
    const scripts = [
      'https://cdn.realscout.com/widget.js',
      'https://cdn.homebot.com/widget.js',
      'https://cdn.cloudcma.com/widget.js',
      'https://cdn.percy.ai/widget.js'
    ];

    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    });

    return () => {
      scripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          document.head.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <Layout
      title="About Us | Centennial Hills Homes For Sale"
      description="Learn about our experienced team of real estate professionals serving the Centennial Hills area of Las Vegas."
    >
      <div className="about-page">
        <motion.section 
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Your Trusted Real Estate Partner in Centennial Hills</h1>
          <p>
            We're dedicated to helping you find the perfect home in one of Las Vegas's most desirable neighborhoods.
            With years of experience and deep local knowledge, we make your real estate journey seamless and successful.
          </p>
        </motion.section>

        <motion.section 
          className="content-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
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
        </motion.section>

        <motion.section 
          className="team-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <motion.div 
              className="team-member"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="/images/agent1.jpg" alt="Sarah Johnson" />
              <h3>Sarah Johnson</h3>
              <p>Principal Broker</p>
              <div className="social-links">
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="team-member"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="/images/agent2.jpg" alt="Michael Chen" />
              <h3>Michael Chen</h3>
              <p>Senior Real Estate Agent</p>
              <div className="social-links">
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="team-member"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="/images/agent3.jpg" alt="Emily Rodriguez" />
              <h3>Emily Rodriguez</h3>
              <p>Market Analysis Specialist</p>
              <div className="social-links">
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="cta-section"
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
      </div>
    </Layout>
  );
};

export default AboutPage; 