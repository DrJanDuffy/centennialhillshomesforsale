import React from 'react';
import Layout from '../components/Layout';
import ModernInteractiveMap from '../components/ModernInteractiveMap';
import GoogleTagManager from '../components/GoogleTagManager';

const AreaExplorerPage: React.FC = () => {
  return (
    <Layout title="Centennial Hills Area Explorer | Dr. Jan Duffy" description="Explore Centennial Hills, Las Vegas with our interactive map. Discover neighborhoods, schools, shopping, parks, and amenities in this beautiful master-planned community.">
      <GoogleTagManager />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-color via-primary-dark to-primary-light overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-color/80 via-primary-dark/60 to-primary-light/40"></div>
        <div className="relative container text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-8">
            Explore Centennial Hills
            <span className="block text-secondary-color mt-2">Interactive Map</span>
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Discover neighborhoods, amenities, and points of interest in the Centennial Hills community
          </p>
        </div>
      </section>

      {/* Interactive Map Component */}
      <ModernInteractiveMap />

      {/* Area Highlights */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
              Area Highlights & Amenities
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover what makes Centennial Hills such a desirable place to live
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Shopping & Dining */}
            <div className="card p-6 lg:p-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🛍️</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4 text-center">Shopping & Dining</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Centennial Center Shopping
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Grocery Stores (Smith's, Albertsons)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Restaurants & Fast Food
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Banks & Financial Services
                </li>
              </ul>
            </div>

            {/* Schools & Education */}
            <div className="card p-6 lg:p-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🎓</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4 text-center">Schools & Education</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Centennial Hills Elementary
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Centennial High School
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Private School Options
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  College of Southern Nevada
                </li>
              </ul>
            </div>

            {/* Parks & Recreation */}
            <div className="card p-6 lg:p-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🌳</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4 text-center">Parks & Recreation</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Centennial Hills Park
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Walking & Hiking Trails
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Playgrounds & Sports Fields
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Dog Parks & Pet Areas
                </li>
              </ul>
            </div>

            {/* Healthcare & Services */}
            <div className="card p-6 lg:p-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🏥</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4 text-center">Healthcare & Services</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Medical Clinics & Urgent Care
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Dental Offices
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Pharmacies
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Veterinary Services
                </li>
              </ul>
            </div>

            {/* Transportation */}
            <div className="card p-6 lg:p-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🚗</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4 text-center">Transportation</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  I-215 Beltway Access
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  US-95 Freeway
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  RTC Bus Routes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  McCarran Airport (20 min)
                </li>
              </ul>
            </div>

            {/* Entertainment */}
            <div className="card p-6 lg:p-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-secondary-color rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl lg:text-3xl">🎭</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-primary-color mb-4 text-center">Entertainment</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Movie Theaters
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Bowling & Arcades
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Golf Courses
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-color rounded-full"></span>
                  Red Rock Canyon (30 min)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Distance Guide */}
      <section className="section bg-gradient-soft">
        <div className="container">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-color mb-6 lg:mb-8">
              Distance Guide
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See how close Centennial Hills is to major Las Vegas attractions and destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="card p-6 lg:p-8 text-center">
              <div className="text-2xl lg:text-3xl font-bold text-secondary-color mb-2">15 min</div>
              <div className="text-sm lg:text-base text-gray-600">Downtown Summerlin</div>
            </div>

            <div className="card p-6 lg:p-8 text-center">
              <div className="text-2xl lg:text-3xl font-bold text-secondary-color mb-2">20 min</div>
              <div className="text-sm lg:text-base text-gray-600">Las Vegas Strip</div>
            </div>

            <div className="card p-6 lg:p-8 text-center">
              <div className="text-2xl lg:text-3xl font-bold text-secondary-color mb-2">25 min</div>
              <div className="text-sm lg:text-base text-gray-600">Downtown Las Vegas</div>
            </div>

            <div className="card p-6 lg:p-8 text-center">
              <div className="text-2xl lg:text-3xl font-bold text-secondary-color mb-2">30 min</div>
              <div className="text-sm lg:text-base text-gray-600">Red Rock Canyon</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-secondary-color to-secondary-dark">
        <div className="container text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8">
            Ready to Explore Centennial Hills?
          </h2>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            Let Dr. Jan Duffy show you around the area and help you discover the perfect location for your new home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <button type="button" className="bg-white text-secondary-color hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
              Schedule a Tour
            </button>
            <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-secondary-color px-8 lg:px-10 py-3 lg:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-base lg:text-lg">
              Get Area Guide
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AreaExplorerPage;
