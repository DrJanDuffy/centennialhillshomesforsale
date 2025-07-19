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
  MessageCircle
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
        { url: '/images/centennial-hills-modern-estate.jpg', alt: 'Modern Estate in Centennial Hills' }
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
        { url: '/images/skye-canyon-family-home.jpg', alt: 'Family Home in Skye Canyon' }
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

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <Layout
      title="Centennial Hills Homes For Sale | AI-Powered Property Search | Dr. Jan Duff"
      description="Discover your dream home in Centennial Hills, Providence, and Skye Canyon with AI-powered search technology. Expert real estate services by Dr. Jan Duff - Northwest Las Vegas specialist."
      canonical="https://centennialhillshomesforsale.com"
    >
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
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
              <button className="btn btn-accent btn-lg group">
                <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Your Search
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn btn-outline btn-lg group text-white border-white hover:bg-white hover:text-primary-color">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Our Story
              </button>
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
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Find Your Perfect Home</h2>
            <div className="grid md:grid-cols-4 gap-6">
                             <div className="form-group">
                 <label className="form-label" htmlFor="location-select">Location</label>
                 <select id="location-select" className="form-input" aria-label="Select location">
                   <option>All Areas</option>
                   <option>Centennial Hills</option>
                   <option>Providence</option>
                   <option>Skye Canyon</option>
                 </select>
               </div>
               <div className="form-group">
                 <label className="form-label" htmlFor="price-select">Price Range</label>
                 <select id="price-select" className="form-input" aria-label="Select price range">
                   <option>Any Price</option>
                   <option>$300K - $500K</option>
                   <option>$500K - $750K</option>
                   <option>$750K - $1M</option>
                   <option>$1M+</option>
                 </select>
               </div>
               <div className="form-group">
                 <label className="form-label" htmlFor="bedrooms-select">Bedrooms</label>
                 <select id="bedrooms-select" className="form-input" aria-label="Select number of bedrooms">
                   <option>Any</option>
                   <option>1+</option>
                   <option>2+</option>
                   <option>3+</option>
                   <option>4+</option>
                 </select>
               </div>
              <div className="form-group">
                <button className="btn btn-primary w-full h-full">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
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

      {/* Why Choose Us Section */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                Why Choose Dr. Jan Duffy?
              </h2>
              <p className="text-xl text-secondary max-w-3xl mx-auto">
                Experience the difference that 15+ years of local expertise and cutting-edge technology can make
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Trusted Expert',
                description: '15+ years of experience in Northwest Las Vegas real estate with hundreds of satisfied clients.',
                color: 'text-accent-color'
              },
              {
                icon: Search,
                title: 'AI-Powered Search',
                description: 'Advanced algorithms help you find properties that match your exact preferences and lifestyle.',
                color: 'text-secondary-color'
              },
              {
                icon: Clock,
                title: 'Fast Results',
                description: 'Average 12 days on market - we get your home sold quickly and for top dollar.',
                color: 'text-warning-color'
              },
              {
                icon: DollarSign,
                title: 'Best Value',
                description: 'Negotiate the best deals with our expert market analysis and pricing strategies.',
                color: 'text-accent-color'
              },
              {
                icon: Users,
                title: 'Personal Service',
                description: 'Dedicated support throughout your entire real estate journey, from search to closing.',
                color: 'text-secondary-color'
              },
              {
                icon: Award,
                title: 'Top 1% Realtor',
                description: 'Consistently ranked among the top performing real estate professionals in Las Vegas.',
                color: 'text-warning-color'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${feature.color.split('-')[1]}/10 to-${feature.color.split('-')[1]}/20 flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                <p className="text-secondary leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
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
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
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