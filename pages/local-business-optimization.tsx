import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { FaCheckCircle, FaClock, FaMapMarkerAlt, FaPhone, FaStar } from 'react-icons/fa';
import Layout from '../components/Layout';
import RealScoutListingsSection from '../components/RealScoutListingsSection';

export default function LocalBusinessOptimization() {
  const serviceAreas = [
    {
      name: 'Centennial Hills',
      zipCodes: ['89149', '89143'],
      medianPrice: '$635,000',
      population: '25,000+',
      description: 'Master-planned community with luxury homes and family amenities',
    },
    {
      name: 'Providence',
      zipCodes: ['89166'],
      medianPrice: '$580,000',
      population: '15,000+',
      description: 'Upscale community with new construction and modern amenities',
    },
    {
      name: 'Skye Canyon',
      zipCodes: ['89166', '89131'],
      medianPrice: '$595,000',
      population: '20,000+',
      description: 'Growing community with hiking trails and outdoor recreation',
    },
    {
      name: 'Summerlin',
      zipCodes: ['89135', '89144', '89145'],
      medianPrice: '$750,000',
      population: '100,000+',
      description: 'Premier master-planned community with golf courses and shopping',
    },
  ];

  const businessInfo = {
    name: 'Dr. Jan Duffy, REALTOR®',
    phone: '(702) 903-1952',
    address: 'Providence Skye Canyon Dr, Las Vegas, NV 89166',
    hours: 'Monday-Sunday: 6:00 AM - 9:00 PM',
    rating: '4.9/5',
    reviews: '127+',
    yearsInBusiness: '30+',
  };

  return (
    <Layout>
      <Head>
        <title>
          Local Las Vegas Real Estate Expert | Dr. Jan Duffy REALTOR® | Centennial Hills
        </title>
        <meta
          name="description"
          content="Local Las Vegas real estate expert Dr. Jan Duffy serves Centennial Hills, Providence, Skye Canyon, and Summerlin. 30+ years experience, 4.9/5 rating, available 24/7."
        />
        <meta
          name="keywords"
          content="Las Vegas local realtor, Centennial Hills expert, Providence homes, Skye Canyon specialist, local real estate agent"
        />
        <link
          rel="canonical"
          href="https://centennialhillshomesforsale.com/local-business-optimization"
        />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: businessInfo.name,
              telephone: businessInfo.phone,
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Providence Skye Canyon Dr',
                addressLocality: 'Las Vegas',
                addressRegion: 'NV',
                postalCode: '89166',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '36.268',
                longitude: '-115.328',
              },
              openingHours: 'Mo-Su 06:00-21:00',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '127',
                bestRating: '5',
              },
              areaServed: serviceAreas.map((area) => ({
                '@type': 'Place',
                name: `${area.name}, Las Vegas, NV`,
              })),
            }),
          }}
        />
      </Head>

      <main className="local-business-page">
        <motion.section
          className="business-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h1>🏠 Your Local Las Vegas Real Estate Expert</h1>
            <p className="lead">
              Dr. Jan Duffy - Serving Centennial Hills, Providence, Skye Canyon & Summerlin for 30+
              Years
            </p>

            <div className="business-card">
              <div className="business-info">
                <h2>{businessInfo.name}</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <FaPhone />
                    <span>{businessInfo.phone}</span>
                  </div>
                  <div className="info-item">
                    <FaMapMarkerAlt />
                    <span>{businessInfo.address}</span>
                  </div>
                  <div className="info-item">
                    <FaClock />
                    <span>{businessInfo.hours}</span>
                  </div>
                  <div className="info-item">
                    <FaStar />
                    <span>
                      {businessInfo.rating} ({businessInfo.reviews} Reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="service-areas-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="container">
            <h2>📍 Local Market Expertise</h2>
            <p className="section-description">
              Deep knowledge of Las Vegas neighborhoods with hyperlocal market insights
            </p>

            <div className="areas-grid">
              {serviceAreas.map((area, index) => (
                <motion.div
                  key={index}
                  className="area-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <h3>{area.name}</h3>
                  <div className="area-stats">
                    <div className="stat">
                      <span className="label">Median Price:</span>
                      <span className="value">{area.medianPrice}</span>
                    </div>
                    <div className="stat">
                      <span className="label">Population:</span>
                      <span className="value">{area.population}</span>
                    </div>
                    <div className="stat">
                      <span className="label">ZIP Codes:</span>
                      <span className="value">{area.zipCodes.join(', ')}</span>
                    </div>
                  </div>
                  <p className="area-description">{area.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="local-credentials"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="container">
            <h2>🏆 Local Recognition & Credentials</h2>
            <div className="credentials-grid">
              <div className="credential">
                <FaCheckCircle />
                <h3>Top 1% REALTOR®</h3>
                <p>Las Vegas Market</p>
              </div>
              <div className="credential">
                <FaCheckCircle />
                <h3>30+ Years Experience</h3>
                <p>Local Market Expert</p>
              </div>
              <div className="credential">
                <FaCheckCircle />
                <h3>4.9/5 Star Rating</h3>
                <p>127+ Client Reviews</p>
              </div>
              <div className="credential">
                <FaCheckCircle />
                <h3>24/7 Availability</h3>
                <p>Always Here for You</p>
              </div>
              <div className="credential">
                <FaCheckCircle />
                <h3>Same-Day Showings</h3>
                <p>Fast Response Time</p>
              </div>
              <div className="credential">
                <FaCheckCircle />
                <h3>Free Market Analysis</h3>
                <p>Complimentary Service</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="contact-local"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="container">
            <h2>Ready to Work with a Local Expert?</h2>
            <p>Get personalized service from someone who knows your neighborhood inside and out</p>
            <div className="contact-buttons">
              <a href="tel:+17029031952" className="contact-button primary">
                📞 Call Now: (702) 903-1952
              </a>
              <Link href="/contact" className="contact-button secondary">
                📧 Request Free Consultation
              </Link>
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
