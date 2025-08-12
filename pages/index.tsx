import {
  ArrowRight,
  Award,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  Play,
  Quote,
  Search,
  Share2,
  Sparkle,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useEffect, useState } from 'react';
import EnhancedContactForm from '../components/EnhancedContactForm';
import EnhancedPropertySearch from '../components/EnhancedPropertySearch';
import FAQSection from '../components/FAQSection';
import GoogleTagManager from '../components/GoogleTagManager';
import Layout from '../components/Layout';
import PerformanceOptimizer from '../components/PerformanceOptimizer';

// Lazy load heavy components for better performance
const AIAssistant = dynamic(() => import('../components/AIAssistant'), {
  loading: () => (
    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
      Loading AI Assistant...
    </div>
  ),
  ssr: false,
});

const InteractivePropertyMap = dynamic(() => import('../components/InteractivePropertyMap'), {
  loading: () => (
    <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
      Loading Interactive Map...
    </div>
  ),
  ssr: false,
});

const SmartPropertyRecommendations = dynamic(
  () => import('../components/SmartPropertyRecommendations'),
  {
    loading: () => (
      <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
        Loading Recommendations...
      </div>
    ),
    ssr: false,
  }
);

const MarketTrendChart = dynamic(() => import('../components/MarketTrendChart'), {
  loading: () => (
    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
      Loading Market Data...
    </div>
  ),
  ssr: false,
});

const LocalAmenities = dynamic(() => import('../components/LocalAmenities'), {
  loading: () => (
    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
      Loading Amenities...
    </div>
  ),
  ssr: false,
});

const _LeadCaptureForm = dynamic(() => import('../components/LeadCaptureForm'), {
  loading: () => (
    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
      Loading Contact Form...
    </div>
  ),
  ssr: false,
});

const HomePage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingMenu(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredProperties = [
    {
      id: 'featured-golden-moments',
      mlsNumber: 'GLVARTRESTLE-409',
      address: '11773 Golden Moments Avenue',
      price: 850000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 3200,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
          alt: 'Luxury Home - Golden Moments Avenue',
        },
        {
          url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
          alt: 'Modern Kitchen',
        },
        {
          url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
          alt: 'Living Room',
        },
      ],
      neighborhood: { name: 'Golden Moments' },
      listDate: '2024-01-15',
      status: 'active',
      features: ['Pool & Spa', 'Mountain Views', 'Gourmet Kitchen', 'Smart Home'],
      daysOnMarket: 15,
      pricePerSqft: 266,
      lotSize: '0.25 acres',
      isFeatured: true,
      realScoutUrl:
        'https://drjanduffy.realscout.com/homesearch/listings/p-11773-golden-moments-avenue-las-vegas-89138-glvartrestle-409',
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
        {
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
          alt: 'Modern Estate in Centennial Hills',
        },
        {
          url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
          alt: 'Exterior View',
        },
        {
          url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
          alt: 'Master Suite',
        },
      ],
      neighborhood: { name: 'Centennial Hills' },
      listDate: '2024-01-20',
      status: 'active',
      features: ['Guest House', 'Wine Cellar', 'Home Theater', 'Casita'],
      daysOnMarket: 8,
      pricePerSqft: 293,
      lotSize: '0.5 acres',
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
        {
          url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
          alt: 'Family Home in Skye Canyon',
        },
        {
          url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
          alt: 'Kitchen',
        },
        {
          url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
          alt: 'Backyard',
        },
      ],
      neighborhood: { name: 'Skye Canyon' },
      listDate: '2024-01-18',
      status: 'active',
      features: ['Open Floor Plan', 'Mountain Views', 'Upgraded Kitchen', 'Large Yard'],
      daysOnMarket: 15,
      pricePerSqft: 232,
      lotSize: '0.3 acres',
    },
  ];

  const stats = [
    {
      icon: Home,
      label: 'Homes Sold',
      value: '500+',
      color: 'text-secondary-color',
      description: 'Successful transactions',
    },
    {
      icon: Users,
      label: 'Happy Families',
      value: '500+',
      color: 'text-accent-color',
      description: 'Satisfied clients',
    },
    {
      icon: Award,
      label: 'Years Experience',
      value: '15+',
      color: 'text-primary-color',
      description: 'Local expertise',
    },
    {
      icon: TrendingUp,
      label: 'Avg Days on Market',
      value: '12',
      color: 'text-warning-color',
      description: 'Fast sales',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah & Mike Johnson',
      location: 'Centennial Hills',
      rating: 5,
      text: 'Dr. Jan Duffy made our home buying experience absolutely seamless. Her knowledge of the area and attention to detail is unmatched. We found our dream home in just 2 weeks!',
      image: '/images/testimonial-1.jpg',
      property: '4 bed, 3 bath in Centennial Hills',
    },
    {
      id: 2,
      name: 'David Chen',
      location: 'Providence',
      rating: 5,
      text: 'As a first-time homebuyer, I was nervous about the process. Dr. Duffy guided me through every step with patience and expertise. Highly recommend!',
      image: '/images/testimonial-2.jpg',
      property: '3 bed, 2.5 bath in Providence',
    },
    {
      id: 3,
      name: 'Jennifer Martinez',
      location: 'Skye Canyon',
      rating: 5,
      text: 'Dr. Duffy helped us sell our home above asking price in just 8 days! Her marketing strategy and negotiation skills are incredible.',
      image: '/images/testimonial-3.jpg',
      property: '5 bed, 4 bath in Skye Canyon',
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
      {showFloatingMenu && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <button
            className="bg-primary-color text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={() => (window.location.href = 'mailto:jan@centennialhillshomesforsale.com')}
            aria-label="Email us"
            title="Email us"
          >
            <MessageCircle className="w-6 h-6" />
          </button>

          <button
            className="bg-secondary-color text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowRight className="w-6 h-6 rotate-[-90deg]" />
          </button>
        </div>
      )}

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
          <div className="animate-fade-in-up">
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
              Experience the future of real estate with AI-powered search, expert guidance, and
              unparalleled local knowledge
            </p>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              {stats.map((stat, _index) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                  <div className="text-xs opacity-60">{stat.description}</div>
                </div>
              ))}
            </div>

            {/* Hero CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn btn-accent btn-lg group hover:scale-105 active:scale-95 transition-transform">
                <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Your Search
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn btn-outline btn-lg group text-white border-white hover:bg-white hover:text-primary-color hover:scale-105 active:scale-95 transition-transform">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Our Story
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-fade-in-up">
          <div className="animate-bounce">
            <ChevronRight className="w-6 h-6 text-white rotate-90" />
          </div>
        </div>
      </section>

      {/* Enhanced Property Search Section */}
      <section className="section bg-secondary -mt-20 relative z-20">
        <div className="container">
          <EnhancedPropertySearch
            onSearch={(filters) => {
              console.log('Search filters:', filters);
              // Handle search results
            }}
            showAdvanced={false}
          />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section bg-primary">
        <div className="container">
          <div className="text-center mb-16">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Featured Properties
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Discover exceptional homes in Centennial Hills&apos; most desirable neighborhoods
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <div
                key={property.id}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
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
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {property.isFeatured && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                          ⭐ Featured Home
                        </span>
                      )}
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
                        <div className="text-lg font-bold text-primary">
                          {property.sqft.toLocaleString()}
                        </div>
                        <div className="text-sm text-secondary">Sq Ft</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {property.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-tertiary text-secondary px-2 py-1 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {property.isFeatured ? (
                        <Link href="/featured-home" className="btn btn-primary flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View Featured Home
                        </Link>
                      ) : (
                        <button className="btn btn-primary flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                      )}
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
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in-up">
            <button className="btn btn-accent btn-lg group">
              View All Properties
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* RealScout Your Listings */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Your Listings</h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Browse our latest properties in Centennial Hills and surrounding areas
            </p>
          </div>

          <div className="animate-fade-in-up">
            <realscout-your-listings
              agent-encoded-id="QWdlbnQtMjI1MDUw"
              sort-order="STATUS_AND_SIGNIFICANT_CHANGE"
              listing-status="For Sale,Sold"
              property-types="SFR"
              price-min="500000"
            ></realscout-your-listings>
          </div>
        </div>
      </section>

      {/* RealScout Office Listings */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Current Listings</h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Browse our latest properties in Centennial Hills and surrounding areas
            </p>
          </div>

          <div className="animate-fade-in-up">
            <realscout-office-listings
              agent-encoded-id="QWdlbnQtMjI1MDUw"
              sort-order="STATUS_AND_SIGNIFICANT_CHANGE"
              listing-status="For Sale"
              property-types="SFR,MF,TC"
              price-min="600000"
              price-max="1200000"
            ></realscout-office-listings>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-primary">
        <div className="container">
          <div className="text-center mb-16">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                What Our Clients Say
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Don&apos;t just take our word for it - hear from the families we&apos;ve helped find
                their dream homes
              </p>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div
              key={currentTestimonial}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl animate-fade-in-up"
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
                    &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                  </blockquote>
                  <div>
                    <div className="font-bold text-primary text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-secondary">
                      {testimonials[currentTestimonial].property} •{' '}
                      {testimonials[currentTestimonial].location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Explore Neighborhoods
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Interactive map of Centennial Hills, Providence, and Skye Canyon communities
            </p>
          </div>

          <div className="animate-fade-in-up">
            <InteractivePropertyMap />
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="section bg-primary">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Market Trends & Insights
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Stay informed with real-time market data and trends in Centennial Hills
            </p>
          </div>

          <MarketTrendChart />
        </div>
      </section>

      {/* Local Amenities */}
      <LocalAmenities />

      {/* Featured Home CTA */}
      <section className="section bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">⭐ Featured Luxury Home ⭐</h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Discover this stunning 4-bedroom luxury home in the prestigious Golden Moments
                neighborhood
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="animate-fade-in-up">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-4">11773 Golden Moments Avenue</h3>
                  <div className="text-3xl font-bold text-yellow-300 mb-4">$850,000</div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">4</div>
                      <div className="text-sm text-white/80">Bedrooms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-white/80">Bathrooms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">3,200</div>
                      <div className="text-sm text-white/80">Sq Ft</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Pool & Spa</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      Mountain Views
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Smart Home</span>
                  </div>
                  <Link
                    href="/featured-home"
                    className="btn btn-white text-orange-600 hover:bg-gray-100 w-full text-center"
                  >
                    View Full Details & Photos
                  </Link>
                </div>
              </div>

              <div className="animate-fade-in-up">
                <div className="relative">
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
                      alt="Featured Luxury Home - Golden Moments Avenue"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-md rounded-lg p-4">
                        <div className="text-lg font-semibold text-gray-800">
                          Golden Moments Neighborhood
                        </div>
                        <div className="text-sm text-gray-600">
                          Prestigious location with luxury amenities
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form */}
      <section className="section bg-gradient-to-r from-primary-color to-secondary-color">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <EnhancedContactForm
              onSubmit={(data) => {
                console.log('Contact form submitted:', data);
                // Handle form submission
              }}
              showPropertyFields={true}
              title="Ready to Find Your Dream Home?"
              description="Get personalized property recommendations and expert guidance from Dr. Jan Duffy. Fill out the form below and we'll get back to you within 24 hours."
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions About Centennial Hills Real Estate"
        items={[
          {
            question: 'What makes Centennial Hills a great place to live?',
            answer:
              'Centennial Hills offers luxury homes with stunning mountain views, top-rated schools, premium amenities, and a family-friendly community atmosphere. Located in Northwest Las Vegas, it provides easy access to shopping, dining, and outdoor recreation while maintaining a peaceful residential environment.',
            category: 'Neighborhood',
          },
          {
            question: 'How can Dr. Jan Duffy help me buy a home?',
            answer:
              'Dr. Jan Duffy provides comprehensive buyer services including MLS access, financing guidance, negotiation support, and expert market knowledge of Centennial Hills, Providence, and Skye Canyon. As a Top 1% REALTOR®, she offers personalized property recommendations and 24/7 availability for showings.',
            category: 'Buying',
          },
          {
            question: 'What are the current market trends in Centennial Hills?',
            answer:
              'The Centennial Hills market is currently very active with strong demand for luxury homes. Average home prices are around $635,000 with 15-30 days on market. The area continues to see appreciation due to its desirable location, quality schools, and premium amenities.',
            category: 'Market',
          },
          {
            question: 'What amenities are available in Centennial Hills?',
            answer:
              'Centennial Hills features shopping centers, restaurants, parks, hiking trails, golf courses, and excellent schools. The area is known for its mountain views, family-friendly atmosphere, and convenient access to major highways and the Las Vegas Strip.',
            category: 'Amenities',
          },
          {
            question: 'How do I get started with my home search?',
            answer:
              "Start by contacting Dr. Jan Duffy for a free consultation. She'll discuss your needs, budget, and timeline, then provide personalized property recommendations and MLS access. You can also explore our featured listings and use our search tools to find your dream home.",
            category: 'Buying',
          },
          {
            question: 'What financing options are available?',
            answer:
              'Dr. Jan Duffy works with trusted lenders to offer various financing options including conventional loans, FHA loans, VA loans, and jumbo loans. She can help you get pre-approved and find the best rates and terms for your situation.',
            category: 'Financing',
          },
        ]}
        showCategories={true}
      />

      {/* Google Tag Manager */}
      <GoogleTagManager
        gtmId="GTM-XXXXXXX"
        gaId="G-XXXXXXXXXX"
        enableConversionTracking={true}
        enablePhoneTracking={true}
      />

      {/* Performance Optimizer */}
      <PerformanceOptimizer
        enableMonitoring={true}
        enablePreloading={true}
        enableLazyLoading={true}
      />

      {/* AI Assistant */}
      <AIAssistant />
    </Layout>
  );
};

export default HomePage;
