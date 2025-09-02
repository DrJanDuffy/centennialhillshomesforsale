import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import RealScoutListingsSection from '../components/RealScoutListingsSection';
import SEOOptimized from '../components/SEOOptimized';

export default function BusinessVerification() {
  const verificationData = {
    businessName: 'Centennial Hills Homes | Providence & Skye Canyon | Dr. Jan Duffy, REALTOR®',
    category: 'Real Estate Agent',
    address: 'Providence Skye Canyon Dr, Las Vegas, NV 89166',
    phone: '(702) 903-1952',
    website: 'https://centennialhillshomesforsale.com',
    established: 'September 1993',
    services: [
      'Building lot sales',
      'Buying agent services',
      'Commercial property buying & sales',
      'First-time home buyer services',
      'Luxury property buying & sales',
      'New construction sales & leasing',
    ],
    areas: [
      'North Las Vegas',
      'Centennial Hills',
      'Providence',
      'Skye Canyon',
      'Summerlin',
      'Lone Mountain',
      'Aliante',
    ],
  };

  return (
    <Layout>
      <SEOOptimized
        title="Google Business Profile Verification | Dr. Jan Duffy REALTOR®"
        description="Verified Google Business Profile for Dr. Jan Duffy, REALTOR® specializing in Centennial Hills, Providence, and Skye Canyon real estate since 1993."
        pageType="local-business"
      />

      <main className="verification-page">
        <motion.section
          className="verification-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h1>✅ Verified Google Business Profile</h1>
            <p className="lead">
              Dr. Jan Duffy, REALTOR® - Your Trusted Las Vegas Real Estate Expert
            </p>

            <div className="verification-badge">
              <div className="badge-content">
                <h2>🏢 {verificationData.businessName}</h2>
                <p>
                  <strong>Category:</strong> {verificationData.category}
                </p>
                <p>
                  <strong>📍 Address:</strong> {verificationData.address}
                </p>
                <p>
                  <strong>📞 Phone:</strong> {verificationData.phone}
                </p>
                <p>
                  <strong>🌐 Website:</strong> {verificationData.website}
                </p>
                <p>
                  <strong>📅 Established:</strong> {verificationData.established}
                </p>
                <p>
                  <strong>⭐ Rating:</strong> 4.9/5 (127 reviews)
                </p>
                <p>
                  <strong>🏆 Recognition:</strong> Top 1% Las Vegas REALTOR®
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="services-verification"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="container">
            <h2>🏠 Verified Services</h2>
            <div className="services-grid">
              {verificationData.services.map((service, index) => (
                <div key={index} className="service-item">
                  <h3>✓ {service}</h3>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="areas-verification"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="container">
            <h2>📍 Verified Service Areas</h2>
            <div className="areas-grid">
              {verificationData.areas.map((area, index) => (
                <div key={index} className="area-item">
                  <h3>🏘️ {area}</h3>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="contact-verification"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="container">
            <h2>📱 Contact Our Verified Business</h2>
            <div className="contact-methods">
              <div className="method">
                <h3>📞 Phone</h3>
                <p>{verificationData.phone}</p>
                <p>Available 24/7</p>
              </div>
              <div className="method">
                <h3>🌐 Website</h3>
                <p>{verificationData.website}</p>
                <p>searchforhomeslasvegas.com</p>
              </div>
              <div className="method">
                <h3>📧 Email</h3>
                <p>contact@centennialhillshomesforsale.com</p>
                <p>Same-day response</p>
              </div>
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
