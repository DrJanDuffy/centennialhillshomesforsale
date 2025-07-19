import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import AwesomeHero from '@/components/AwesomeHero';
import AwesomeEnhancements from '@/components/AwesomeEnhancements';
import { SlideUpSection, FadeInSection, BounceSection } from '../components/AwesomeScrollAnimations';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import LocalAmenities from '@/components/LocalAmenities';
import MarketTrendChart from '@/components/MarketTrendChart';
import SmartPropertyRecommendations from '@/components/SmartPropertyRecommendations';

import React, { useState, useEffect } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  TrendingUp, 
  Users, 
  Award, 
  Phone, 
  Home, 
  Heart,
  Search,
  Calendar,
  DollarSign,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
  Quote,
  ChevronRight,
  ChevronLeft,
  Filter,
  Grid,
  List,
  Share2,
  Bookmark,
  Eye,
  MessageCircle,
  Sparkles,
  Zap,
  Target,
  MousePointer,
  Sparkle,
  Star as StarIcon
} from 'lucide-react';

// Lazy load heavy components for better performance
const AIAssistant = dynamic(() => import('../components/AIAssistant'), {
  loading: () => <div className="loading-skeleton h-64 rounded-lg"></div>,
  ssr: false
});

const InteractivePropertyMap = dynamic(() => import('../components/InteractivePropertyMap'), {
  loading: () => <div className="loading-skeleton h-96 rounded-lg"></div>,
  ssr: false
});

const HomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    priceRange: '',
    bedrooms: '',
    propertyType: ''
  });
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowFloatingMenu(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        { url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', alt: 'Luxury Home in Providence' },
        { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop', alt: 'Modern Kitchen' },
        { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Living Room' }
      ],
      neighborhood: { name: 'Providence' },
      listDate: '2024-01-15',
      status: 'active',
      features: ['Pool', 'Mountain Views', 'Gourmet Kitchen', 'Smart Home'],
      daysOnMarket: 12,
      pricePerSqft: 266,
      lotSize: '0.25 acres'
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
        { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', alt: 'Modern Estate in Centennial Hills' },
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', alt: 'Exterior View' },
        { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop', alt: 'Master Suite' }
      ],
      neighborhood: { name: 'Centennial Hills' },
      listDate: '2024-01-20',
      status: 'active',
      features: ['Guest House', 'Wine Cellar', 'Home Theater', 'Casita'],
      daysOnMarket: 8,
      pricePerSqft: 293,
      lotSize: '0.5 acres'
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
        { url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop', alt: 'Family Home in Skye Canyon' },
        { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop', alt: 'Kitchen' },
        { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop', alt: 'Backyard' }
      ],
      neighborhood: { name: 'Skye Canyon' },
      listDate: '2024-01-18',
      status: 'active',
      features: ['Open Floor Plan', 'Mountain Views', 'Upgraded Kitchen', 'Large Yard'],
      daysOnMarket: 15,
      pricePerSqft: 232,
      lotSize: '0.3 acres'
    }
  ];

  const stats = [
    { icon: Home, label: 'Homes Sold', value: '500+', color: 'text-secondary-color', description: 'Successful transactions' },
    { icon: Users, label: 'Happy Families', value: '500+', color: 'text-accent-color', description: 'Satisfied clients' },
    { icon: Award, label: 'Years Experience', value: '15+', color: 'text-primary-color', description: 'Local expertise' },
    { icon: TrendingUp, label: 'Avg Days on Market', value: '12', color: 'text-warning-color', description: 'Fast sales' }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah & Mike Johnson',
      location: 'Centennial Hills',
      rating: 5,
      text: 'Dr. Jan Duffy made our home buying experience absolutely seamless. Her knowledge of the area and attention to detail is unmatched. We found our dream home in just 2 weeks!',
      image: '/images/testimonial-1.jpg',
      property: '4 bed, 3 bath in Centennial Hills'
    },
    {
      id: 2,
      name: 'David Chen',
      location: 'Providence',
      rating: 5,
      text: 'As a first-time homebuyer, I was nervous about the process. Dr. Duffy guided me through every step with patience and expertise. Highly recommend!',
      image: '/images/testimonial-2.jpg',
      property: '3 bed, 2.5 bath in Providence'
    },
    {
      id: 3,
      name: 'Jennifer Martinez',
      location: 'Skye Canyon',
      rating: 5,
      text: 'Dr. Duffy helped us sell our home above asking price in just 8 days! Her marketing strategy and negotiation skills are incredible.',
      image: '/images/testimonial-3.jpg',
      property: '5 bed, 4 bath in Skye Canyon'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching with filters:', searchFilters);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout
      title="Centennial Hills Homes For Sale | AI-Powered Property Search | Dr. Jan Duff"
      description="Discover your dream home in Centennial Hills, Providence, and Skye Canyon with AI-powered search technology. Expert real estate services by Dr. Jan Duff - Northwest Las Vegas specialist."
      canonical="https://centennialhillshomesforsale.com"
    >
      {/* Floating Action Menu */}
      <AnimatePresence>
        {showFloatingMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-accent-color text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = 'tel:+17025551234'}
              aria-label="Call us"
              title="Call us"
            >
              <Phone className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-primary-color text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.href = 'mailto:jan@centennialhillshomesforsale.com'}
              aria-label="Email us"
              title="Email us"
            >
              <MessageCircle className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-secondary-color text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowRight className="w-6 h-6 rotate-[-90deg]" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-accent-color/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-secondary-color/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-primary-color/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/images/hero-poster.jpg"
          >
            <source src="/videos/centennial-hills-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-color/80 to-secondary-color/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated Sparkles */}
            <div className="absolute top-0 left-1/4 animate-bounce">
              <Sparkles className="w-8 h-8 text-accent-color opacity-60" />
            </div>
            <div className="absolute top-10 right-1/4 animate-bounce delay-500">
              <Sparkle className="w-6 h-6 text-secondary-color opacity-60" />
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Find Your Dream Home in
              <span className="block bg-gradient-to-r from-accent-color to-secondary-color bg-clip-text text-transparent">
                Centennial Hills
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Experience the future of real estate with AI-powered search, expert guidance, and unparalleled local knowledge
            </p>
            
            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                  <div className="text-xs opacity-60">{stat.description}</div>
                </motion.div>
              ))}
            </div>

            {/* Hero CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                className="btn btn-accent btn-lg group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Your Search
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button 
                className="btn btn-outline btn-lg group text-white border-white hover:bg-white hover:text-primary-color"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Our Story
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="animate-bounce">
            <ChevronRight className="w-6 h-6 text-white rotate-90" />
          </div>
        </motion.div>
      </section>

      {/* Quick Search Section */}
      <section className="section bg-secondary -mt-20 relative z-20">
        <div className="container">
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Find Your Perfect Home</h2>
              <p className="text-secondary">Use our advanced search to find properties that match your criteria</p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-6">
              <div className="form-group">
                <label className="form-label" htmlFor="location-select">Location</label>
                <select 
                  id="location-select" 
                  className="form-input" 
                  value={searchFilters.location}
                  onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                  aria-label="Select location"
                >
                  <option value="">All Areas</option>
                  <option value="centennial-hills">Centennial Hills</option>
                  <option value="providence">Providence</option>
                  <option value="skye-canyon">Skye Canyon</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="price-select">Price Range</label>
                <select 
                  id="price-select" 
                  className="form-input"
                  value={searchFilters.priceRange}
                  onChange={(e) => setSearchFilters({...searchFilters, priceRange: e.target.value})}
                  aria-label="Select price range"
                >
                  <option value="">Any Price</option>
                  <option value="300-500">$300K - $500K</option>
                  <option value="500-750">$500K - $750K</option>
                  <option value="750-1000">$750K - $1M</option>
                  <option value="1000+">$1M+</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="bedrooms-select">Bedrooms</label>
                <select 
                  id="bedrooms-select" 
                  className="form-input"
                  value={searchFilters.bedrooms}
                  onChange={(e) => setSearchFilters({...searchFilters, bedrooms: e.target.value})}
                  aria-label="Select number of bedrooms"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="property-type-select">Property Type</label>
                <select 
                  id="property-type-select" 
                  className="form-input"
                  value={searchFilters.propertyType}
                  onChange={(e) => setSearchFilters({...searchFilters, propertyType: e.target.value})}
                  aria-label="Select property type"
                >
                  <option value="">All Types</option>
                  <option value="single-family">Single Family</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="condo">Condo</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              
              <div className="form-group">
                <motion.button 
                  className="btn btn-primary w-full h-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSearch}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section bg-primary">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Featured Properties
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Discover exceptional homes in Centennial Hills' most desirable neighborhoods
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  {/* Property Image */}
                  <div className="relative h-64 bg-gradient-to-br from-secondary-color to-accent-color">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Home className="w-16 h-16 text-white opacity-20" />
                    </div>
                                         <div className="absolute top-4 right-4">
                       <button 
                         className="bg-white/20 backdrop-blur-md rounded-full p-2 hover:bg-white/30 transition-colors"
                         aria-label="Add to favorites"
                         title="Add to favorites"
                       >
                         <Heart className="w-5 h-5 text-white" />
                       </button>
                     </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-accent-color text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {property.daysOnMarket} days on market
                      </span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-primary mb-2">
                          ${property.price.toLocaleString()}
                        </h3>
                        <p className="text-secondary flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {property.address}
                        </p>
                      </div>
                      <span className="bg-secondary-color/10 text-secondary-color px-3 py-1 rounded-full text-sm font-semibold">
                        {property.neighborhood.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{property.bedrooms}</div>
                        <div className="text-sm text-secondary">Beds</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{property.bathrooms}</div>
                        <div className="text-sm text-secondary">Baths</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{property.sqft.toLocaleString()}</div>
                        <div className="text-sm text-secondary">Sq Ft</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {property.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="bg-tertiary text-secondary px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button className="btn btn-primary flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </button>
                                           <button 
                       className="btn btn-outline"
                       aria-label="Share property"
                       title="Share property"
                     >
                       <Share2 className="w-4 h-4" />
                     </button>
                    </div>
                  </div>
                </div>
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
            <button className="btn btn-accent btn-lg group">
              View All Properties
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* RealScout Your Listings */}
      <section className="section bg-secondary">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Your Listings
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Browse our latest properties in Centennial Hills and surrounding areas
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <realscout-your-listings 
              agent-encoded-id="QWdlbnQtMjI1MDUw" 
              sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
              listing-status="For Sale,Sold" 
              property-types="SFR" 
              price-min="500000">
            </realscout-your-listings>
          </motion.div>
        </div>
      </section>

      {/* RealScout Office Listings */}
      <section className="section bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Current Listings
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Browse our latest properties in Centennial Hills and surrounding areas
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <realscout-office-listings 
              agent-encoded-id="QWdlbnQtMjI1MDUw" 
              sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
              listing-status="For Sale" 
              property-types="SFR,MF,TC" 
              price-min="600000" 
              price-max="1200000">
            </realscout-office-listings>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-primary">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                What Our Clients Say
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Don't just take our word for it - hear from the families we've helped find their dream homes
              </p>
            </motion.div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-secondary-color to-accent-color rounded-full flex items-center justify-center">
                    <Quote className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-warning-color fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-secondary mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  <div>
                    <div className="font-bold text-primary text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-secondary">
                      {testimonials[currentTestimonial].property} • {testimonials[currentTestimonial].location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Previous testimonial"
                title="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-white' : 'bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    title={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Next testimonial"
                title="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Property Recommendations */}
      <SmartPropertyRecommendations />

      {/* Interactive Map */}
      <section className="section bg-secondary">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Explore Neighborhoods
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
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
      <section className="section bg-primary">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Market Trends & Insights
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Stay informed with real-time market data and trends in Centennial Hills
            </p>
          </motion.div>

          <MarketTrendChart />
        </div>
      </section>

      {/* Local Amenities */}
      <LocalAmenities />

      {/* Lead Capture */}
      <section className="section bg-gradient-to-r from-primary-color to-secondary-color">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get personalized property recommendations and expert guidance from Dr. Jan Duff
              </p>
              <LeadCaptureForm trigger="homepage" onClose={() => {}} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Assistant */}
      <AIAssistant />
    </Layout>
  );
};

export default HomePage;