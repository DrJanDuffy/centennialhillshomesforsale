import Head from 'next/head';
import Link from 'next/link';

import EnhancedHero from '../components/EnhancedHero';
import Layout from '../components/Layout';
import RealScoutListings from '../components/RealScoutListings';
import FeaturedInsight from '../components/rss/FeaturedInsight';


export default function Home() {
  return (
    <Layout>
      {/* Enhanced Hero with Modern Design */}
      <EnhancedHero />

      <Head>
        <title>Centennial Hills Homes for Sale | Dr. Jan Duffy | Luxury Real Estate</title>
        <meta
          name="description"
          content="Discover luxury homes for sale in Centennial Hills, Las Vegas. Dr. Jan Duffy, Top 1% REALTOR®, specializes in luxury properties and master-planned communities."
        />
        <meta
          name="keywords"
          content="Centennial Hills homes for sale, luxury real estate Las Vegas, Dr. Jan Duffy, Providence neighborhood, Skye Canyon, northwest Las Vegas"
        />

        {/* Enhanced Business Schema for SEO */}
        <script type="application/ld+json" id="business-schema" />
      </Head>

      {/* Quick Navigation Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Explore Centennial Hills
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about living, buying, and investing in this premier Las
              Vegas community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Properties Card */}
            <Link href="/properties" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 lg:p-8 text-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <svg
                    className="w-6 h-6 lg:w-7 lg:h-7 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 7c0-1.103-.897-2-2-2h-3v2h3v2.765l-3.447 4.018c-.34.39-.553.895-.553 1.47V19h4v2h-6v-4.765c0-.575-.213-1.08-.553-1.47L7 9.765V7h3V5H7c-1.103 0-2 .897-2 2v2.765l3.447 4.018c.34.39.553.895.553 1.47V19H5v2h4v-4.765c0-.575.213-1.08.553-1.47L13 9.765V7z" />
                  </svg>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                  Available Properties
                </h3>
                <p className="text-gray-600 mb-6">
                  Browse our curated selection of premium homes with stunning mountain views
                </p>
                <div className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                  View Properties →
                </div>
              </div>
            </Link>

            {/* Neighborhoods Card */}
            <Link href="/neighborhoods" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 lg:p-8 text-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <svg
                    className="w-6 h-6 lg:w-7 lg:h-7 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Neighborhoods</h3>
                <p className="text-gray-600 mb-6">
                  Discover the unique character and amenities of each community
                </p>
                <div className="text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                  Explore Areas →
                </div>
              </div>
            </Link>

            {/* Market Data Card */}
            <Link href="/market-data" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 lg:p-8 text-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <svg
                    className="w-6 h-6 lg:w-7 lg:h-7 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                  </svg>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Market Trends</h3>
                <p className="text-gray-600 mb-6">
                  Stay informed with the latest real estate market data and trends
                </p>
                <div className="text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                  View Data →
                </div>
              </div>
            </Link>

            {/* Area Explorer Card */}
            <Link href="/area-explorer" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 lg:p-8 text-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                  <svg
                    className="w-6 h-6 lg:w-7 lg:h-7 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
                  </svg>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Area Explorer</h3>
                <p className="text-gray-600 mb-6">
                  Interactive map showing amenities, schools, and attractions
                </p>
                <div className="text-orange-600 font-semibold group-hover:text-orange-700 transition-colors">
                  Explore Map →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Featured Properties
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the latest luxury homes available in Centennial Hills and surrounding
              communities
            </p>
          </div>

          <RealScoutListings
            priceMin={600000}
            priceMax={1200000}
            propertyTypes="SFR,MF"
            listingStatus="For Sale"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Meet Dr. Jan Duffy
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 mb-6 leading-relaxed">
                As a Top 1% REALTOR® with over 15 years of experience, I&apos;ve helped hundreds of
                families find their perfect home in Centennial Hills and surrounding communities.
              </p>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                My expertise spans luxury homes, investment properties, and first-time buyer
                guidance. I understand the unique characteristics of each neighborhood and can help
                you make an informed decision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Learn More About Me
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Schedule a Consultation
                </Link>
              </div>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <svg className="w-24 h-24 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-gray-700">Top 1% REALTOR®</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span className="text-gray-700">500+ Homes Sold</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-gray-700">15+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Insights Section */}
      <FeaturedInsight
        title="Latest Market Insight"
        subtitle="Stay informed with expert analysis from Keeping Current Matters"
        theme="blue"
        enableAnalytics={true}
        enablePerformance={true}
      />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center text-white px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let me guide you through the process of finding the perfect property in Centennial
            Hills. From initial consultation to closing, I&apos;ll be with you every step of the
            way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg"
            >
              Browse Available Properties
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
