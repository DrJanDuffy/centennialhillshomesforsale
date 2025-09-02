import Head from 'next/head';
import Link from 'next/link';
import type React from 'react';
import Layout from '../components/Layout';
import RealScoutListings from '../components/RealScoutListings';
import RealScoutListingsSection from '../components/RealScoutListingsSection';

const FAQSchemaPage: React.FC = () => {
  // FAQ Schema for better SERP visibility
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the average home price in Centennial Hills?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The average home price in Centennial Hills ranges from $500,000 to $1.5 million, depending on size, location, and amenities. Luxury homes can reach $2-5 million for premium properties with mountain views and custom features.',
        },
      },
      {
        '@type': 'Question',
        name: 'What makes Centennial Hills a desirable place to live?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Centennial Hills offers stunning mountain views, master-planned communities, excellent schools, shopping centers, parks, and easy access to major highways. The area is known for its family-friendly atmosphere, low crime rates, and proximity to outdoor recreation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How far is Centennial Hills from the Las Vegas Strip?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Centennial Hills is approximately 20-25 minutes from the Las Vegas Strip via I-215 and US-95. The area provides a peaceful residential setting while maintaining convenient access to entertainment and amenities.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of homes are available in Centennial Hills?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Centennial Hills offers diverse housing options including single-family homes, luxury estates, new construction, custom builds, and investment properties. Home sizes range from 1,500 to 8,000+ square feet with various architectural styles.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there good schools in the Centennial Hills area?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Centennial Hills has excellent schools including Centennial Hills Elementary, Centennial High School, and private school options. The area is served by the Clark County School District with high ratings and strong academic programs.',
        },
      },
      {
        '@type': 'Question',
        name: 'What amenities are available in Centennial Hills?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Centennial Hills features shopping centers, restaurants, medical facilities, parks, walking trails, golf courses, and community centers. The area has everything needed for daily living while maintaining a suburban feel.',
        },
      },
    ],
  };

  return (
    <Layout>
      <Head>
        <title>Centennial Hills Real Estate FAQ | Dr. Jan Duffy</title>
        <meta
          name="description"
          content="Get answers to frequently asked questions about Centennial Hills real estate, home prices, schools, amenities, and living in this beautiful Las Vegas community."
        />
        <link rel="canonical" href="https://centennialhillshomesforsale.com/faq-schema" />

        {/* FAQ Schema for better SERP visibility */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-blue-700/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Centennial Hills
            <span className="block text-blue-200 mt-2">Real Estate FAQ</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Get answers to the most frequently asked questions about living, buying, and investing
            in Centennial Hills, Las Vegas&apos;s premier master-planned community.
          </p>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about Centennial Hills real estate, from home prices to
              community amenities
            </p>
          </div>

          <div className="space-y-8">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                What is the average home price in Centennial Hills?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The average home price in Centennial Hills ranges from $500,000 to $1.5 million,
                depending on size, location, and amenities. Luxury homes can reach $2-5 million for
                premium properties with mountain views and custom features.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                What makes Centennial Hills a desirable place to live?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Centennial Hills offers stunning mountain views, master-planned communities,
                excellent schools, shopping centers, parks, and easy access to major highways. The
                area is known for its family-friendly atmosphere, low crime rates, and proximity to
                outdoor recreation.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                How far is Centennial Hills from the Las Vegas Strip?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Centennial Hills is approximately 20-25 minutes from the Las Vegas Strip via I-215
                and US-95. The area provides a peaceful residential setting while maintaining
                convenient access to entertainment and amenities.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                What types of homes are available in Centennial Hills?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Centennial Hills offers diverse housing options including single-family homes,
                luxury estates, new construction, custom builds, and investment properties. Home
                sizes range from 1,500 to 8,000+ square feet with various architectural styles.
              </p>
            </div>

            {/* FAQ Item 5 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                Are there good schools in the Centennial Hills area?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, Centennial Hills has excellent schools including Centennial Hills Elementary,
                Centennial High School, and private school options. The area is served by the Clark
                County School District with high ratings and strong academic programs.
              </p>
            </div>

            {/* FAQ Item 6 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                What amenities are available in Centennial Hills?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Centennial Hills features shopping centers, restaurants, medical facilities, parks,
                walking trails, golf courses, and community centers. The area has everything needed
                for daily living while maintaining a suburban feel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Need More Information?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our other resources to learn more about Centennial Hills real estate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Market Data */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">📊</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Market Trends</h3>
              <p className="text-gray-600 mb-6">
                Stay informed with the latest real estate market data and trends in Centennial Hills
              </p>
              <Link
                href="/market-data"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                View Market Data
              </Link>
            </div>

            {/* Properties */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🏠</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                Available Properties
              </h3>
              <p className="text-gray-600 mb-6">
                Browse our curated selection of premium homes with stunning mountain views
              </p>
              <Link
                href="/properties"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                View Properties
              </Link>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">📞</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                Get Personal Help
              </h3>
              <p className="text-gray-600 mb-6">
                Have specific questions? Contact Dr. Jan Duffy for personalized assistance
              </p>
              <Link
                href="/contact"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Contact Dr. Jan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RealScout Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Featured Properties
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our latest listings while reading our FAQ
            </p>
          </div>

          <RealScoutListings
            priceMin={500000}
            priceMax={2000000}
            propertyTypes="SFR,MF"
            listingStatus="For Sale"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center text-white px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Dr. Jan Duffy has helped hundreds of families find their perfect home in Centennial
            Hills. Let her expertise guide you to your ideal property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <Link
              href="/properties"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg"
            >
              Browse Properties
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
      {/* RealScout Office Listings */}
      <RealScoutListingsSection
        title="Current Listings"
        subtitle="Browse our latest property listings in Centennial Hills and surrounding areas"
      />
    </Layout>
  );
};

export default FAQSchemaPage;
