import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import AwesomeFeatures from '../components/AwesomeFeatures';
import InteractivePropertyMap from '../components/InteractivePropertyMap';
import RealScoutWidget from '../components/widgets/RealScoutWidget';
import RealScoutListings from '../components/RealScoutListings';
import PropertyCalculator from '../components/PropertyCalculator';
import MarketTrendChart from '../components/MarketTrendChart';
import AdvancedSearch from '../components/AdvancedSearch';
import NeighborhoodBar from '../components/NeighborhoodBar';
import SchoolInfo from '../components/SchoolInfo';
import LocalAmenities from '../components/LocalAmenities';
import LocalBusinessSchema from '../components/LocalBusinessSchema';
import GoogleBusinessOptimization from '../components/GoogleBusinessOptimization';
import LocalCitationWidget from '../components/LocalCitationWidget';
import SEOOptimized from '../components/SEOOptimized';
import GEOOptimized from '../components/GEOOptimized';
import AIContentOptimizer from '../components/AIContentOptimizer';
import StatisticalWidget from '../components/StatisticalWidget';
import { motion } from 'framer-motion';

interface Property {
  id: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  status: string;
}

type NeighborhoodName = 'Centennial Hills' | 'The Trails' | 'Tournament Hills' | 'Skye Canyon' | 'Sun City Aliante';

export default function Home() {
  const [currentNeighborhood, setCurrentNeighborhood] = useState<NeighborhoodName>('Centennial Hills');

  try {
    return (
      <Layout>
        <Head>
          <title>Centennial Hills Homes For Sale | Las Vegas Real Estate Expert Dr. Jan Duffy | Berkshire Hathaway HomeServices Nevada Properties</title>
          <meta name="description" content="Find luxury homes for sale in Centennial Hills, Providence, and Skye Canyon with Dr. Jan Duffy, top-rated REALTOR® at Berkshire Hathaway HomeServices Nevada Properties. 30+ years experience in Las Vegas real estate market. Current median home price $635,000." />
          <meta name="keywords" content="Centennial Hills homes for sale, Providence Las Vegas real estate, Skye Canyon luxury homes, Las Vegas REALTOR, Dr. Jan Duffy, Berkshire Hathaway HomeServices, Nevada Properties, 89149 homes, 89166 homes, Northwest Las Vegas real estate" />

          {/* Enhanced Open Graph Tags */}
          <meta property="og:title" content="Centennial Hills Homes For Sale | Dr. Jan Duffy REALTOR®" />
          <meta property="og:description" content="Discover luxury homes in Centennial Hills, Providence, and Skye Canyon with expert REALTOR® Dr. Jan Duffy. Median price $635,000. Call (702) 903-1952 today!" />
          <meta property="og:image" content="https://centennialhillshomesforsale.com/images/centennial-hills-hero.jpg" />
          <meta property="og:url" content="https://centennialhillshomesforsale.com" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:site_name" content="Centennial Hills Homes For Sale" />

          {/* Twitter Cards */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Centennial Hills Homes For Sale | Dr. Jan Duffy REALTOR®" />
          <meta name="twitter:description" content="Find luxury homes in Centennial Hills, Providence & Skye Canyon. Expert REALTOR® with 30+ years experience. Median price $635,000." />
          <meta name="twitter:image" content="https://centennialhillshomesforsale.com/images/centennial-hills-hero.jpg" />
        </Head>

        <SEOOptimized 
          title="Centennial Hills Homes For Sale | Dr. Jan Duffy REALTOR®"
          description="Find luxury homes in Centennial Hills, Providence & Skye Canyon with Dr. Jan Duffy, top-rated REALTOR® at Berkshire Hathaway HomeServices Nevada Properties."
          keywords="Centennial Hills homes for sale, Providence Las Vegas, Skye Canyon real estate, Dr. Jan Duffy REALTOR"
        />
        <GEOOptimized 
          title="Centennial Hills Homes For Sale | Dr. Jan Duffy REALTOR®"
          description="Find luxury homes in Centennial Hills, Providence & Skye Canyon with Dr. Jan Duffy, experienced REALTOR® with 30+ years in Las Vegas real estate. Specializing in Providence family communities ($450K-$800K) and Skye Canyon luxury homes ($550K-$1.2M)."
          pageType="homepage"
          priceRange="$450,000 - $1,200,000"
        />

        <AIContentOptimizer pageType="homepage">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text float-animation">
                🌟 Centennial Hills Homes For Sale ✨
              </h1>

              <p className="awesome-text text-xl md:text-2xl mb-12 max-w-4xl mx-auto">
                🏡 Discover your <span className="awesome-highlight">dream home</span> in the prestigious Centennial Hills community! 
                From luxury estates to family-friendly neighborhoods, find the perfect 
                property in Las Vegas's most <span className="awesome-highlight">sought-after area</span>. 🌴
              </p>

              <div className="mb-12">
                <Link href="/listings" className="awesome-btn mr-4 mb-4">
                  🔍 Browse Homes
                </Link>
                <Link href="/contact" className="awesome-btn mb-4">
                  📞 Get Started
                </Link>
              </div>
            </motion.div>

            <div className="hero-section awesome-hero">
        <div className="hero-background">
          <img 
            src="/images/centennial-hills-hero.jpg" 
            alt="Centennial Hills Las Vegas"
            className="hero-bg-image"
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title gradient-text pulse-animation">
              Your <span className="awesome-highlight">Centennial Hills</span> Home Expert
            </h1>
            <p className="hero-subtitle slide-in-up">
              Discover luxury homes in Las Vegas's premier master-planned community. 
              Dr. Jan Duffy brings you exclusive access to Centennial Hills, Providence, 
              and Skye Canyon properties with unmatched local expertise.
            </p>

            <div className="hero-features float-animation">
              <div className="feature glass-effect">
                <span className="feature-icon">🏆</span>
                <span>Top 1% REALTOR®</span>
              </div>
              <div className="feature glass-effect">
                <span className="feature-icon">⭐</span>
                <span>4.9/5 Rating</span>
              </div>
              <div className="feature glass-effect">
                <span className="feature-icon">🎯</span>
                <span>Local Expert</span>
              </div>
            </div>

            <div className="hero-stats awesome-stats">
              <div className="stat awesome-card neon-glow">
                <span className="stat-number gradient-text">500+</span>
                <span className="stat-label">Homes Sold</span>
              </div>
              <div className="stat awesome-card neon-glow">
                <span className="stat-number gradient-text">15+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat awesome-card neon-glow">
                <span className="stat-number gradient-text">98%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>

            <div className="hero-buttons">
              <Link href="/listings" className="awesome-btn btn-primary bounce-animation">
                <span>🏠 View Listings</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link href="/contact" className="awesome-btn btn-secondary pulse-animation">
                <span>💬 Get Started</span>
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

            <AwesomeFeatures />

      {/* Interactive Property Map Section */}
      <section className="property-map-section">
        <InteractivePropertyMap />
      </section>

            {/* Call to action */}
            <motion.div 
              className="awesome-card mt-12 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-6">🚀 Ready to Find Your Dream Home?</h2>
              <p className="awesome-text text-xl mb-8">
                Join hundreds of satisfied homeowners who found their perfect property in Centennial Hills!
              </p>
              <div className="space-x-4">
                <Link href="/neighborhoods" className="awesome-btn">
                  🗺️ Explore Areas
                </Link>
                <Link href="/market-update" className="awesome-btn">
                  📈 Market Report
                </Link>
              </div>
            </motion.div>
          </div>
        </AIContentOptimizer>

        <LocalBusinessSchema 
          pageType="home" 
          additionalServices={["Luxury Home Sales", "New Construction", "Master-Planned Communities"]}
        />
        <GoogleBusinessOptimization pageType="home" />
      </Layout>
    );
  } catch (error) {
    console.error('Home component error:', error);
    return (
      <Layout>
        <Head>
          <title>Centennial Hills Homes For Sale | Las Vegas Real Estate</title>
        </Head>
        <div className="error-fallback">
          <h1>Welcome to Centennial Hills Homes</h1>
          <p>Loading content...</p>
        </div>
      </Layout>
    );
  }
}