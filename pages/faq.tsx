
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

const faqs = [
  {
    question: "What is the average home price in Centennial Hills in 2024?",
    answer: "The median home price in Centennial Hills is $635,000 as of 2024. Home prices range from $300,000 for condos and townhomes to over $2 million for luxury estates. The area has seen 8.2% year-over-year price appreciation, reflecting strong demand and limited inventory.",
    category: "Pricing"
  },
  {
    question: "How competitive is the Centennial Hills real estate market?",
    answer: "Centennial Hills is a competitive seller's market with homes selling in an average of 18 days. With only 1.8 months of inventory available, buyers should be prepared to act quickly. The area sold 127 homes last month with 89 active listings currently available.",
    category: "Market Conditions"
  },
  {
    question: "What are the best schools in Centennial Hills?",
    answer: "Centennial Hills is served by highly-rated Clark County schools including Centennial High School (9/10 rating), Del Webb Middle School (8/10 rating), and several top elementary schools. The area is known for its excellent educational opportunities and family-friendly environment.",
    category: "Schools"
  },
  {
    question: "What amenities are available in Centennial Hills?",
    answer: "Centennial Hills offers world-class amenities including TPC Las Vegas golf course, Floyd Lamb Park, extensive hiking trails, shopping at Downtown Summerlin, and easy access to Red Rock Canyon. The community features multiple parks, recreation centers, and is just 20 minutes from the Las Vegas Strip.",
    category: "Amenities"
  },
  {
    question: "Is Centennial Hills a good investment for real estate?",
    answer: "Yes, Centennial Hills has shown consistent appreciation with 8.2% year-over-year growth. The area benefits from new construction, excellent schools, proximity to employment centers, and strong demand from both local and out-of-state buyers. Limited inventory continues to support property values.",
    category: "Investment"
  },
  {
    question: "What types of homes are available in Centennial Hills?",
    answer: "Centennial Hills offers diverse housing options including luxury single-family homes, modern townhomes, condos, and custom estates. Popular communities include The Trails, Tournament Hills, and Skye Canyon, with homes featuring contemporary designs, energy-efficient features, and desert landscaping.",
    category: "Property Types"
  }
];

export default function FAQ() {
  return (
    <Layout>
      <Head>
        <title>Centennial Hills Real Estate FAQ | Common Questions Answered</title>
        <meta name="description" content="Get answers to frequently asked questions about Centennial Hills real estate, home prices, schools, market conditions, and investment opportunities in Las Vegas." />
        <meta name="keywords" content="Centennial Hills FAQ, real estate questions, Las Vegas home prices, school ratings, market conditions" />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/faq" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </Head>

      <main className="faq-page">
        <motion.section 
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <h1>Frequently Asked Questions</h1>
            <p>Get expert answers about Centennial Hills real estate from local market specialists</p>
          </div>
        </motion.section>

        <motion.section 
          className="faq-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="container">
            <div className="faq-grid">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  className="faq-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <div className="faq-category">{faq.category}</div>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="contact-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="container">
            <h2>Still Have Questions?</h2>
            <p>Our local real estate experts are here to help with personalized answers about Centennial Hills.</p>
            <a href="/contact" className="cta-button">Contact Our Team</a>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
