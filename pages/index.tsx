import React from 'react';
import AIChatBox from '../components/AIChatBox';
import GoogleTagManager from '../components/GoogleTagManager';
import Layout from '../components/Layout';
import ModernAboutSection from '../components/ModernAboutSection';
import ModernContactCTA from '../components/ModernContactCTA';
import ModernFeaturedProperties from '../components/ModernFeaturedProperties';
import ModernHero from '../components/ModernHero';
import ModernInteractiveMap from '../components/ModernInteractiveMap';
import ModernNeighborhoods from '../components/ModernNeighborhoods';
import ModernTestimonials from '../components/ModernTestimonials';

const HomePage: React.FC = () => {
  return (
    <Layout
      title="Centennial Hills Homes For Sale | Luxury Real Estate | Dr. Jan Duffy"
      description="Discover luxury homes for sale in Centennial Hills, Las Vegas. Dr. Jan Duffy, Top 1% REALTOR®, specializes in Providence, Skye Canyon, and Northwest Las Vegas luxury real estate."
      canonical="https://centennialhillshomesforsale.com"
    >
      <GoogleTagManager />
      
      {/* Modern Hero Section */}
      <ModernHero />
      
      {/* Modern Neighborhoods Section */}
      <ModernNeighborhoods />
      
      {/* Modern Featured Properties Section */}
      <ModernFeaturedProperties />
      
      {/* Market Data Dashboard Section */}
      <section className="section bg-gray-50 py-12" id="market-dashboard">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 text-center">
            Centennial Hills Market Trends
          </h2>

          {/* Tab navigation */}
          <div className="flex justify-center mb-8 gap-4">
            <button type="button" className="tab-btn px-4 py-2 bg-blue-600 text-white rounded transition-colors duration-200" data-tab="price">Price Trend</button>
            <button type="button" className="tab-btn px-4 py-2 bg-gray-200 text-gray-800 rounded transition-colors duration-200" data-tab="inventory">Inventory</button>
            <button type="button" className="tab-btn px-4 py-2 bg-gray-200 text-gray-800 rounded transition-colors duration-200" data-tab="dom">Days on Market</button>
          </div>

          {/* Canvas elements – only one shown at a time */}
          <div className="relative">
            <canvas id="chart-price" className="tab-canvas"></canvas>
            <canvas id="chart-inventory" className="tab-canvas hidden"></canvas>
            <canvas id="chart-dom" className="tab-canvas hidden"></canvas>
          </div>
        </div>
      </section>

      {/* Modern Interactive Map Section */}
      <ModernInteractiveMap />
      
      {/* Modern About Section */}
      <ModernAboutSection />
      
      {/* Modern Testimonials Section */}
      <ModernTestimonials />
      
      {/* Modern Contact CTA Section */}
      <ModernContactCTA />
      
      {/* AI Chat Box */}
      <AIChatBox />
    </Layout>
  );
};

export default HomePage;
