import React from 'react';
import GoogleTagManager from '../components/GoogleTagManager';
import Layout from '../components/Layout';
import ModernNeighborhoods from '../components/ModernNeighborhoods';

const NeighborhoodsPage: React.FC = () => {
  return (
    <Layout title="Centennial Hills Neighborhoods | Dr. Jan Duffy" description="Explore the beautiful neighborhoods of Centennial Hills, Las Vegas. Discover Providence, Skye Canyon, and other master-planned communities with luxury homes and mountain views.">
      <GoogleTagManager />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-color via-primary-dark to-primary-light overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-color/80 via-primary-dark/60 to-primary-light/40"></div>
        <div className="relative container text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8">
            Centennial Hills
            <span className="block text-secondary-color mt-2">Neighborhoods</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Discover the unique character and charm of each neighborhood in the Centennial Hills master-planned community
          </p>
        </div>
      </section>

      {/* Neighborhoods Component */}
      <ModernNeighborhoods />

      {/* Additional Neighborhood Info */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
              Why Choose Centennial Hills?
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each neighborhood offers its own unique lifestyle while sharing the benefits of this exceptional community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Community Benefits */}
            <div className="card p-6 lg:p-8 text-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🏔️</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">Mountain Views</h3>
              <p className="text-gray-600 leading-relaxed">
                Stunning views of the Spring Mountains and Red Rock Canyon from many properties
              </p>
            </div>

            <div className="card p-6 lg:p-8 text-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🎓</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">Top Schools</h3>
              <p className="text-gray-600 leading-relaxed">
                Access to highly-rated schools including Centennial Hills Elementary and nearby high schools
              </p>
            </div>

            <div className="card p-6 lg:p-8 text-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🛍️</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">Shopping & Dining</h3>
              <p className="text-gray-600 leading-relaxed">
                Centennial Center and nearby shopping centers with restaurants, retail, and services
              </p>
            </div>

            <div className="card p-6 lg:p-8 text-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🌳</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">Parks & Recreation</h3>
              <p className="text-gray-600 leading-relaxed">
                Beautiful parks, walking trails, and outdoor recreation opportunities
              </p>
            </div>

            <div className="card p-6 lg:p-8 text-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🚗</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">Easy Access</h3>
              <p className="text-gray-600 leading-relaxed">
                Convenient access to I-215, US-95, and major Las Vegas attractions
              </p>
          </div>

            <div className="card p-6 lg:p-8 text-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🏠</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4">Luxury Homes</h3>
              <p className="text-gray-600 leading-relaxed">
                High-quality construction with modern amenities and beautiful architecture
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-secondary-color to-secondary-dark">
        <div className="container text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8">
            Ready to Find Your Perfect Neighborhood?
          </h2>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Let Dr. Jan Duffy guide you through the Centennial Hills community and help you discover the perfect neighborhood for your lifestyle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <button type="button" className="bg-white text-secondary-color hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
              Schedule a Tour
            </button>
            <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-secondary-color px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
              Contact Dr. Jan Duffy
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NeighborhoodsPage;
