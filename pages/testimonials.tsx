
import { motion } from 'framer-motion';
import Head from 'next/head';
import Layout from '../components/Layout';
import SEOOptimized from '../components/SEOOptimized';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah M.",
      location: "Centennial Hills",
      rating: 5,
      text: "Dr. Jan Duffy helped us find our dream home in Centennial Hills. Her knowledge of the area and professionalism made the entire process smooth. We couldn't be happier with our new home!",
      date: "November 2024",
      serviceType: "Home Purchase"
    },
    {
      name: "Michael R.",
      location: "Providence",
      rating: 5,
      text: "Outstanding service! Jan knew exactly what we were looking for in Providence. She was available 24/7 and found us the perfect home within our budget. True professional!",
      date: "October 2024",
      serviceType: "First-Time Buyer"
    },
    {
      name: "Jennifer L.",
      location: "Skye Canyon",
      rating: 5,
      text: "First-time home buyer experience was amazing with Dr. Duffy. She guided us through every step and helped us understand the Skye Canyon market thoroughly.",
      date: "October 2024",
      serviceType: "Buyer Consultation"
    },
    {
      name: "David K.",
      location: "Summerlin",
      rating: 5,
      text: "Sold our Summerlin home in just 12 days! Jan's marketing strategy and pricing expertise are top-notch. We got above asking price thanks to her guidance.",
      date: "September 2024",
      serviceType: "Home Sale"
    },
    {
      name: "Lisa T.",
      location: "Lone Mountain",
      rating: 5,
      text: "Luxury home purchase in Lone Mountain went perfectly. Jan's attention to detail and market knowledge saved us both time and money. Highly recommend!",
      date: "September 2024",
      serviceType: "Luxury Purchase"
    },
    {
      name: "Robert W.",
      location: "Aliante",
      rating: 5,
      text: "Commercial property investment guidance was exceptional. Dr. Duffy's expertise in the Las Vegas market helped us make a profitable investment decision.",
      date: "August 2024",
      serviceType: "Commercial Investment"
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'star filled' : 'star'}
      />
    ));
  };

  return (
    <Layout>
      <SEOOptimized
        title="Client Testimonials | Dr. Jan Duffy REALTOR® | Las Vegas Real Estate Reviews"
        description="Read real client testimonials and reviews for Dr. Jan Duffy, top-rated REALTOR® in Centennial Hills, Providence, Skye Canyon, and Summerlin. 4.9/5 star rating with 127+ reviews."
        keywords="client testimonials, real estate reviews, Dr Jan Duffy reviews, Centennial Hills realtor reviews, Las Vegas realtor testimonials"
        pageType="testimonials"
        localBusiness={true}
      />

      <main className="testimonials-page">
        <motion.section 
          className="testimonials-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h1>⭐ Client Testimonials</h1>
            <p className="lead">
              See why Dr. Jan Duffy is rated 4.9/5 stars by 127+ satisfied clients across Las Vegas
            </p>
            
            <div className="rating-summary">
              <div className="overall-rating">
                <h2>4.9/5</h2>
                <div className="stars">
                  {renderStars(5)}
                </div>
                <p>127+ Reviews</p>
                <p className="certification">🏆 Top 1% Las Vegas REALTOR®</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="testimonials-grid-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="container">
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="testimonial-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="quote-icon">
                    <FaQuoteLeft />
                  </div>
                  
                  <div className="rating">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  
                  <div className="testimonial-footer">
                    <h4>{testimonial.name}</h4>
                    <p className="location">📍 {testimonial.location}</p>
                    <p className="service-type">{testimonial.serviceType}</p>
                    <p className="date">{testimonial.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="trust-indicators"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="container">
            <h2>🏅 Trust & Recognition</h2>
            <div className="indicators-grid">
              <div className="indicator">
                <h3>20+ Years</h3>
                <p>Real Estate Experience</p>
              </div>
              <div className="indicator">
                <h3>Top 1%</h3>
                <p>Las Vegas REALTORS®</p>
              </div>
              <div className="indicator">
                <h3>4.9/5 ⭐</h3>
                <p>Client Satisfaction</p>
              </div>
              <div className="indicator">
                <h3>24/7</h3>
                <p>Availability</p>
              </div>
              <div className="indicator">
                <h3>Same Day</h3>
                <p>Property Showings</p>
              </div>
              <div className="indicator">
                <h3>Free</h3>
                <p>Market Analysis</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="cta-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="container">
            <h2>Ready to Join Our Satisfied Clients?</h2>
            <p>Experience the difference of working with a top-rated REALTOR®</p>
            <div className="cta-buttons">
              <a href="tel:+17029031952" className="cta-button primary">
                📞 Call (702) 903-1952
              </a>
              <a href="/contact" className="cta-button secondary">
                📧 Get Free Consultation
              </a>
            </div>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
