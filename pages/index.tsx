import Head from 'next/head';
import Link from 'next/link';

import ConversionOptimizer from '../components/ConversionOptimizer';
import Layout from '../components/Layout';
import RealScoutListings from '../components/RealScoutListings';
import FeaturedInsight from '../components/rss/FeaturedInsight';
import SimpleInteriorGallery from '../components/SimpleInteriorGallery';
import { getPhotosForPage } from '../utils/interiorPhotos';

export default function Home() {
  return (
    <Layout>
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

      {/* Hero Section with RealScout Focus */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Your Dream Home in
              <span className="block text-yellow-400">Centennial Hills</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Browse our exclusive collection of luxury homes, condos, and townhomes in Las Vegas's
              premier Centennial Hills area. Each listing features detailed property information,
              high-quality photos, and virtual tours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#listings"
                className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg"
              >
                View All Listings
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured RealScout Listings Section */}
      <section id="listings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of luxury homes in Centennial Hills. Each property
              is carefully selected for its exceptional quality, prime location, and outstanding
              value.
            </p>
          </div>

          {/* RealScout Listings Component */}
          <realscout-office-listings
            agent-encoded-id="QWdlbnQtMjI1MDUw"
            sort-order="STATUS_AND_SIGNIFICANT_CHANGE"
            listing-status="For Sale"
            property-types="SFR,MF,TC"
          />
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Explore More</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover neighborhoods, market insights, and everything you need to know about
              Centennial Hills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/neighborhoods" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Neighborhoods</h3>
                <p className="text-gray-600 mb-6">
                  Discover the unique character and amenities of each community
                </p>
                <div className="text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                  Explore Areas →
                </div>
              </div>
            </Link>

            <Link href="/market-data" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Market Trends</h3>
                <p className="text-gray-600 mb-6">
                  Stay informed with the latest real estate market data and trends
                </p>
                <div className="text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                  View Data →
                </div>
              </div>
            </Link>

            <Link href="/contact" className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Get In Touch</h3>
                <p className="text-gray-600 mb-6">
                  Ready to find your dream home? Let's start the conversation
                </p>
                <div className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                  Contact Us →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Interior Inspiration Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SimpleInteriorGallery
            photos={getPhotosForPage('homepage')}
            title="Interior Inspiration"
            subtitle="Discover the stunning interior designs and premium finishes that make Centennial Hills homes truly special"
            maxPhotos={6}
          />
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

      {/* Conversion Optimization Components */}
      <ConversionOptimizer />
    </Layout>
  );
}
