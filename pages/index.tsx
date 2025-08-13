import React from 'react';
import Link from 'next/link';
import AIChatBox from '../components/AIChatBox';
import GoogleTagManager from '../components/GoogleTagManager';
import Layout from '../components/Layout';
import ModernAboutSection from '../components/ModernAboutSection';
import ModernContactCTA from '../components/ModernContactCTA';
import ModernHero from '../components/ModernHero';
import ModernTestimonials from '../components/ModernTestimonials';

const HomePage: React.FC = () => {
  return (
    <Layout title="Centennial Hills Luxury Homes | Dr. Jan Duffy" description="Discover luxury homes for sale in Centennial Hills, Las Vegas. Dr. Jan Duffy specializes in premium real estate with stunning mountain views and exceptional quality.">
      <GoogleTagManager />
      
      {/* Hero Section */}
      <ModernHero />

      {/* Quick Navigation Cards */}
      <section className="section bg-gradient-soft">
        <div className="container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
              Explore Centennial Hills
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover everything this beautiful master-planned community has to offer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Properties */}
            <div className="card p-6 lg:p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🏠</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">Luxury Properties</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Browse our curated selection of premium homes with stunning mountain views
              </p>
              <Link href="/properties" className="inline-block bg-secondary-color hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                View Properties
              </Link>
            </div>

            {/* Neighborhoods */}
            <div className="card p-6 lg:p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🏘️</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">Neighborhoods</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Explore the unique character of each neighborhood in Centennial Hills
              </p>
              <Link href="/neighborhoods" className="inline-block bg-secondary-color hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Explore Areas
              </Link>
            </div>

            {/* Market Data */}
            <div className="card p-6 lg:p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">📊</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">Market Trends</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Stay informed with the latest real estate market data and trends
              </p>
              <Link href="/market-data" className="inline-block bg-secondary-color hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                View Data
              </Link>
            </div>

            {/* Area Explorer */}
            <div className="card p-6 lg:p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🗺️</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">Area Explorer</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Interactive map to discover amenities, schools, and points of interest
              </p>
              <Link href="/area-explorer" className="inline-block bg-secondary-color hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Explore Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <ModernAboutSection />

      {/* Testimonials */}
      <ModernTestimonials />

      {/* Contact CTA */}
      <ModernContactCTA />

      {/* AI Chat Box */}
      <AIChatBox />
    </Layout>
  );
};

export default HomePage;
