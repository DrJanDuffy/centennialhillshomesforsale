
import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'buying',
    budget: '',
    timeline: '',
    neighborhood: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // Form submission handled
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <Head>
        <title>Contact Our Centennial Hills Real Estate Team | Las Vegas Agents</title>
        <meta name="description" content="Contact our local Centennial Hills real estate experts. Office located in Las Vegas serving 89149, 89166, and surrounding areas. Call, email, or visit today." />
        <meta name="keywords" content="Centennial Hills real estate agent, Las Vegas realtor, contact real estate agent, 89149 realtor, Las Vegas real estate office" />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/contact" />
      </Head>

      <main className="container">
        <motion.section 
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Contact Our Centennial Hills Real Estate Team</h1>
          <p>
            Ready to buy or sell in Centennial Hills? Our local experts are here to help. 
            Contact us today for personalized service and deep market knowledge.
          </p>
        </motion.section>

        <div className="contact-content">
          <motion.section 
            className="contact-info"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2>Get in Touch</h2>
            
            <div className="contact-methods">
              <div className="contact-method">
                <FaPhone className="contact-icon" />
                <div>
                  <h3>Call Dr. Jan Duffy</h3>
                  <p>(702) 903-1952</p>
                  <p className="contact-note">Available 24/7 - Same day showings</p>
                </div>
              </div>

              <div className="contact-method">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h3>Email Dr. Duffy</h3>
                  <p>Contact via website</p>
                  <p className="contact-note">Visit: searchforhomeslasvegas.com</p>
                </div>
              </div>

              <div className="contact-method">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h3>Service Area</h3>
                  <p>Providence Skye Canyon Dr<br />Las Vegas, NV 89166</p>
                  <p className="contact-note">Berkshire Hathaway HomeServices</p>
                </div>
              </div>

              <div className="contact-method">
                <FaClock className="contact-icon" />
                <div>
                  <h3>Availability</h3>
                  <p>Daily: 6:00 AM - 9:00 PM<br />Emergency: 24/7</p>
                  <p className="contact-note">Since September 1993</p>
                </div>
              </div>
            </div>

            <div className="service-areas">
              <h3>Dr. Duffy&apos;s Specialty Areas</h3>
              <div className="service-area-tags">
                <span className="area-tag">Centennial Hills</span>
                <span className="area-tag">Providence</span>
                <span className="area-tag">Skye Canyon</span>
                <span className="area-tag">Summerlin</span>
                <span className="area-tag">Lone Mountain</span>
                <span className="area-tag">Aliante</span>
                <span className="area-tag">Tule Springs</span>
                <span className="area-tag">El Dorado</span>
                <span className="area-tag">North Las Vegas</span>
                <span className="area-tag">Master-Planned Communities</span>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="contact-form-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <h2>Send Us a Message</h2>
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="propertyType">I&apos;m Interested In</label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                  >
                    <option value="buying">Buying a Home</option>
                    <option value="selling">Selling My Home</option>
                    <option value="both">Both Buying & Selling</option>
                    <option value="investing">Investment Properties</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select Range</option>
                    <option value="under-400k">Under $400k</option>
                    <option value="400k-600k">$400k - $600k</option>
                    <option value="600k-800k">$600k - $800k</option>
                    <option value="800k-1m">$800k - $1M</option>
                    <option value="over-1m">Over $1M</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="timeline">Timeline</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                  >
                    <option value="">Select Timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3-months">1-3 Months</option>
                    <option value="3-6-months">3-6 Months</option>
                    <option value="6-12-months">6-12 Months</option>
                    <option value="just-looking">Just Looking</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="neighborhood">Preferred Neighborhood</label>
                  <select
                    id="neighborhood"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                  >
                    <option value="">Any Neighborhood</option>
                    <option value="centennial-hills">Centennial Hills</option>
                    <option value="the-trails">The Trails</option>
                    <option value="tournament-hills">Tournament Hills</option>
                    <option value="skye-canyon">Skye Canyon</option>
                    <option value="sun-city-aliante">Sun City Aliante</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your real estate needs, specific requirements, or unknown questions you have about Centennial Hills..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Send Message
              </button>

              <p className="form-disclaimer">
                By submitting this form, you agree to be contacted by our team. 
                We respect your privacy and will never share your information.
              </p>
            </form>
          </motion.section>
        </div>

        <motion.section 
          className="local-knowledge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2>Why Choose Our Local Team?</h2>
          <div className="knowledge-grid">
            <div className="knowledge-item">
              <h3>🏠 Neighborhood Experts</h3>
              <p>We live and work in Centennial Hills. We know every street, school, and amenity.</p>
            </div>
            <div className="knowledge-item">
              <h3>📊 Market Data</h3>
              <p>Access to the latest market trends, pricing data, and inventory levels.</p>
            </div>
            <div className="knowledge-item">
              <h3>🤝 Personal Service</h3>
              <p>Direct contact with your agent, not a call center. We&apos;re here when you need us.</p>
            </div>
            <div className="knowledge-item">
              <h3>💰 Negotiation Power</h3>
              <p>Our local reputation and relationships help get the best deals for our clients.</p>
            </div>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
