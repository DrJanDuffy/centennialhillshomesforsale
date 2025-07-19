import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import AwesomeHero from '@/components/AwesomeHero';
import AwesomeEnhancements from '@/components/AwesomeEnhancements';
import { SlideUpSection, FadeInSection, BounceSection } from '../components/AwesomeScrollAnimations';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import LocalAmenities from '@/components/LocalAmenities';
import MarketTrendChart from '@/components/MarketTrendChart';
import SmartPropertyRecommendations from '@/components/SmartPropertyRecommendations';

import React from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { motion } from 'framer-motion';
import { Star, MapPin, TrendingUp, Users, Award, Phone, Home } from 'lucide-react';

// Lazy load heavy components for better performance
const AIAssistant = dynamic(() => import('../components/AIAssistant'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>,
  ssr: false
});

const InteractivePropertyMap = dynamic(() => import('../components/InteractivePropertyMap'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>,
  ssr: false
});

const HomePage: React.FC = () => {
  const featuredProperties = [
    {
      id: '1',
      mlsNumber: 'MLS-001',
      address: '1234 Providence Drive',
      price: 850000,
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 3200,
      images: [
        { url: '/images/providence-luxury-home.jpg', alt: 'Luxury Home in Providence' }
      ],
      neighborhood: { name: 'Providence' },
      listDate: '2024-01-15',
      status: 'active',
      features: ['Pool', 'Mountain Views', 'Gourmet Kitchen', 'Smart Home']
    },
    {
      id: '2',
      mlsNumber: 'MLS-002',
      address: '5678 Centennial Hills Blvd',
      price: 1200000,
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4100,
      images: [
        { url: '/images/centennial-hills-modern-estate.jpg', alt: 'Modern Estate in Centennial Hills' }
      ],
      neighborhood: { name: 'Centennial Hills' },
      listDate: '2024-01-20',
      status: 'active',
      features: ['Guest House', 'Wine Cellar', 'Home Theater', 'Casita']
    },
    {
      id: '3',
      mlsNumber: 'MLS-003',
      address: '9012 Skye Canyon Road',
      price: 650000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      images: [
        { url: '/images/skye-canyon-family-home.jpg', alt: 'Family Home in Skye Canyon' }
      ],
      neighborhood: { name: 'Skye Canyon' },
      listDate: '2024-01-18',
      status: 'active',
      features: ['Open Floor Plan', 'Mountain Views', 'Upgraded Kitchen', 'Large Yard']
    }
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stats = [
    { icon: Home, label: 'Homes Sold', value: '500+', color: 'text-blue-600' },
    { icon: Users, label: 'Happy Families', value: '500+', color: 'text-green-600' },
    { icon: Award, label: 'Years Experience', value: '15+', color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Average Days on Market', value: '12', color: 'text-orange-600' }
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Layout
      title="Centennial Hills Homes For Sale | AI-Powered Property Search | Dr. Jan Duff"
      description="Discover your dream home in Centennial Hills, Providence, and Skye Canyon with AI-powered search technology. Expert real estate services by Dr. Jan Duff - Northwest Las Vegas specialist."
      canonical="https://centennialhillshomesforsale.com"
    >
      {/* Hero Section */}
      <BounceSection>
        <AwesomeHero />
      </BounceSection>

      {/* About Section */}
      <SlideUpSection delay={200}>
        <section className="about-section">
          <div className="container">
            <div className="section-header">
              <h2>Your Centennial Hills Real Estate Expert</h2>
              <p className="section-subtitle">30+ Years of Local Expertise</p>
            </div>
          </div>
        </section>
      </SlideUpSection>

      {/* Features Section */}
      <FadeInSection delay={400}>
        <AwesomeEnhancements />
      </FadeInSection>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exceptional homes in Centennial Hills' most desirable neighborhoods
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              View All Properties
            </button>
          </motion.div>
        </div>
      </section>

      {/* Smart Property Recommendations */}
      <SmartPropertyRecommendations />

      {/* Interactive Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore Neighborhoods
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interactive map of Centennial Hills, Providence, and Skye Canyon communities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <InteractivePropertyMap />
          </motion.div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Market Trends & Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with real-time market data and trends in Centennial Hills
            </p>
          </motion.div>

          <MarketTrendChart />
        </div>
      </section>

      {/* Local Amenities */}
      <LocalAmenities />

      {/* Lead Capture */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get personalized property recommendations and expert guidance from Dr. Jan Duff
            </p>
            <LeadCaptureForm trigger="homepage" onClose={() => {}} />
          </motion.div>
        </div>
      </section>

      {/* AI Assistant */}
      <AIAssistant />
    </Layout>
  );
};

export default HomePage;