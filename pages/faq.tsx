import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import FeaturedInsight from '../components/rss/FeaturedInsight';
import MarketInsightsWidget from '../components/rss/MarketInsightsWidget';

const faqs = [
  {
    question: 'What areas does Dr. Jan Duffy specialize in?',
    answer:
      "Dr. Jan Duffy specializes in North Las Vegas, Centennial Hills, Providence, Skye Canyon, Summerlin, Lone Mountain, Aliante, Tule Springs, El Dorado, and other master-planned communities. With 20+ years of experience, she's ranked in the Top 1% of Las Vegas REALTORS®.",
    category: 'Service Areas',
  },
  {
    question: 'What services does Dr. Duffy offer?',
    answer:
      'Dr. Duffy offers luxury property sales, new construction sales, first-time home buyer services, relocation assistance, property management, real estate investing guidance, and commercial property transactions. She provides same-day showings and free market analysis.',
    category: 'Services',
  },
  {
    question: 'What is the average home price in Summerlin and Centennial Hills?',
    answer:
      'Home prices vary by neighborhood and property type. Centennial Hills median is around $635,000, while Summerlin ranges from $400,000 to over $2 million for luxury estates. Dr. Duffy provides current market analysis for specific neighborhoods upon request.',
    category: 'Pricing',
  },
  {
    question: 'How do I find homes for sale in Summerlin or Centennial Hills?',
    answer:
      'Browse our up-to-date listings, use our interactive map, or contact Dr. Duffy directly at (702) 903-1952 for personalized recommendations. She offers 24/7 availability and same-day showings for qualified buyers.',
    category: 'Home Search',
  },
  {
    question: 'What makes Dr. Duffy different from other REALTORS®?',
    answer:
      'Dr. Duffy is ranked in the Top 1% of Las Vegas REALTORS® with 20+ years of experience in master-planned communities. She offers 24/7 availability, same-day showings, personalized service, and specializes in luxury and new construction homes with a 4.9/5 star rating.',
    category: 'Experience',
  },
  {
    question: 'Does Dr. Duffy help with relocation to Las Vegas?',
    answer:
      'Yes, Dr. Duffy provides comprehensive relocation assistance including detailed neighborhood insights, school information, and tailored home searches. She helps individuals and families moving to Las Vegas from anywhere in the country.',
    category: 'Relocation',
  },
];

export default function FAQ() {
  return (
    <Layout>
      <Head>
        <title>Centennial Hills Real Estate FAQ | Common Questions Answered</title>
        <meta
          name="description"
          content="Get answers to frequently asked questions about Centennial Hills real estate, home prices, schools, market conditions, and investment opportunities in Las Vegas."
        />
        <meta
          name="keywords"
          content="Centennial Hills FAQ, real estate questions, Las Vegas home prices, school ratings, market conditions"
        />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/faq" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            }),
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
            <p>
              Get expert answers about Centennial Hills real estate from local market specialists
            </p>
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

        {/* Market Insights for FAQ Page */}
        <motion.section
          className="market-insights-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="container">
            <h2>Stay Informed with Market Insights</h2>
            <p>Get the latest real estate trends and analysis to help answer your questions</p>
            
            <div className="max-w-6xl mx-auto">
              <FeaturedInsight 
                title="Latest Market Analysis"
                subtitle="Expert insights to guide your real estate decisions"
                theme="blue"
                enableAnalytics={true}
                enablePerformance={true}
              />
            </div>
          </div>
        </motion.section>

        {/* Market Trends Widget */}
        <motion.section
          className="market-trends-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="container">
            <h2>Current Market Trends</h2>
            <p>Track real-time market data and trends affecting Centennial Hills real estate</p>
            
            <MarketInsightsWidget 
              maxArticles={4}
              enableAnalytics={true}
              enablePerformance={true}
            />
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
            <p>
              Our local real estate experts are here to help with personalized answers about
              Centennial Hills.
            </p>
            <Link href="/contact" className="cta-button">
              Contact Our Team
            </Link>
          </div>
        </motion.section>
      </main>
    </Layout>
  );
}
