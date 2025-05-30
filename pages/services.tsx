
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import SEOOptimized from '../components/SEOOptimized';
import { FaHome, FaBuilding, FaHandshake, FaChartLine, FaKey, FaUsers } from 'react-icons/fa';

const services = [
  {
    icon: <FaHome />,
    title: "Luxury Property Buying & Sales",
    description: "Explore exclusive luxury homes in premier Las Vegas locations with tailored, seamless experiences. Dr. Duffy's expertise helps secure exceptional luxury properties with professionalism and discretion.",
    features: ["Premium property access", "Luxury market expertise", "White-glove service", "Confidential transactions"]
  },
  {
    icon: <FaBuilding />,
    title: "Building Lot Sales", 
    description: "Explore exclusive building lot sales in premier locations with a seamless, tailored experience. Let our expertise help you secure the perfect foundation for your next luxury project.",
    features: ["Prime lot selection", "Zoning guidance", "Builder recommendations", "Investment analysis"]
  },
  {
    icon: <FaHandshake />,
    title: "Buying Agent Services",
    description: "Discover expert buying agent services tailored for discerning clients. We provide personalized support, navigating complex markets to secure exceptional opportunities with professionalism and discretion.",
    features: ["Market navigation", "Negotiation expertise", "Due diligence", "Closing coordination"]
  },
  {
    icon: <FaChartLine />,
    title: "Commercial Property Buying & Sales",
    description: "Expert commercial real estate services in Las Vegas, specializing in buying, selling, and leasing properties in Summerlin, Lone Mountain, and the Strip. Whether you're seeking retail spaces or office buildings.",
    features: ["Retail spaces", "Office buildings", "Investment properties", "Lease negotiations"]
  },
  {
    icon: <FaKey />,
    title: "First-time Home Buyer Services", 
    description: "Guiding first-time buyers through Las Vegas real estate. Expert advice on mortgages, neighborhoods, and home selection in Summerlin, Lone Mountain & beyond. We simplify the process, ensuring informed decisions.",
    features: ["Mortgage guidance", "Neighborhood selection", "Home inspection support", "Closing assistance"]
  },
  {
    icon: <FaUsers />,
    title: "Relocation Services",
    description: "Comprehensive relocation assistance for individuals and families moving to Las Vegas. Dr. Duffy provides detailed neighborhood insights, school information, and tailored home searches.",
    features: ["Area orientation", "School district guidance", "Moving coordination", "Community integration"]
  }
];

export default function Services() {
  return (
    <Layout>
      <SEOOptimized
        title="Real Estate Services | Dr. Jan Duffy, REALTOR® | Las Vegas"
        description="Comprehensive real estate services in Las Vegas including luxury sales, commercial properties, first-time buyers, and building lots. Top 1% REALTOR® with 20+ years experience."
        keywords="Las Vegas real estate services, luxury property sales, commercial real estate, first-time home buyers, building lots, relocation services"
        pageType="services"
        canonicalUrl="https://centennialhillshomesforsale.com/services"
      />

      <main className="services-page">
        <motion.section 
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h1>Comprehensive Real Estate Services</h1>
            <p>Dr. Jan Duffy, REALTOR® - Top 1% Las Vegas Professional with 20+ Years Experience</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">4.9/5</span>
                <span className="stat-label">Client Rating</span>
              </div>
              <div className="stat">
                <span className="stat-number">20+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Availability</span>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="services-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="container">
            <div className="services-container">
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  className="service-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex}>{feature}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="expertise-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="container">
            <h2>Why Choose Dr. Jan Duffy?</h2>
            <div className="expertise-grid">
              <div className="expertise-item">
                <h3>🏆 Top 1% REALTOR®</h3>
                <p>Ranked in the top 1% of Las Vegas REALTORS® with consistent excellence</p>
              </div>
              <div className="expertise-item">
                <h3>🏠 Master-Planned Community Expert</h3>
                <p>Specializing in Centennial Hills, Providence, Skye Canyon, and Summerlin</p>
              </div>
              <div className="expertise-item">
                <h3>⭐ 4.9/5 Client Rating</h3>
                <p>Exceptional client satisfaction with personalized service</p>
              </div>
              <div className="expertise-item">
                <h3>📱 24/7 Availability</h3>
                <p>Same-day showings and immediate response to client needs</p>
              </div>
              <div className="expertise-item">
                <h3>🏢 Berkshire Hathaway</h3>
                <p>Backed by one of the most trusted names in real estate</p>
              </div>
              <div className="expertise-item">
                <h3>📈 Market Analysis</h3>
                <p>Free comprehensive market analysis and pricing strategies</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="cta-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <div className="container">
            <h2>Ready to Get Started?</h2>
            <p>Contact Dr. Jan Duffy today for expert real estate guidance in Las Vegas</p>
            <div className="cta-buttons">
              <a href="tel:7029031952" className="btn btn-primary">Call (702) 903-1952</a>
              <a href="/contact" className="btn btn-secondary">Send Message</a>
              <a href="https://www.searchforhomeslasvegas.com/" target="_blank" className="btn btn-outline">Visit Website</a>
            </div>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
