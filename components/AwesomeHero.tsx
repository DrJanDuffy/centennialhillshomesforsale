import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  ChevronRight,
  Clock,
  DollarSign,
  Home,
  MapPin,
  Play,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react';
import type React from 'react';
import { useEffect, useId, useState } from 'react';

const AwesomeHero: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const stats = [
    {
      icon: Home,
      label: 'Homes Sold',
      value: '500+',
      color: 'text-secondary-color',
      description: 'Successful transactions',
      delay: 0.1,
    },
    {
      icon: Users,
      label: 'Happy Families',
      value: '500+',
      color: 'text-accent-color',
      description: 'Satisfied clients',
      delay: 0.2,
    },
    {
      icon: Award,
      label: 'Years Experience',
      value: '15+',
      color: 'text-primary-color',
      description: 'Local expertise',
      delay: 0.3,
    },
    {
      icon: TrendingUp,
      label: 'Avg Days on Market',
      value: '12',
      color: 'text-warning-color',
      description: 'Fast sales',
      delay: 0.4,
    },
  ];

  const features = [
    {
      icon: Search,
      title: 'AI-Powered Search',
      description: 'Find your perfect home with intelligent matching',
    },
    {
      icon: MapPin,
      title: 'Local Expertise',
      description: '15+ years of Northwest Las Vegas knowledge',
    },
    {
      icon: DollarSign,
      title: 'Best Value',
      description: 'Negotiate the best deals with expert guidance',
    },
    {
      icon: Clock,
      title: 'Fast Results',
      description: 'Average 12 days on market for quick sales',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {}, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  // Generate unique IDs for form elements
  const locationId = useId();
  const priceId = useId();
  const bedroomsId = useId();

  // Create unique keys for floating stars
  const floatingStars = [
    { id: 'star-1', top: '10%', left: '15%', delay: 0 },
    { id: 'star-2', top: '25%', left: '85%', delay: 0.5 },
    { id: 'star-3', top: '60%', left: '10%', delay: 1 },
    { id: 'star-4', top: '80%', left: '80%', delay: 1.5 },
    { id: 'star-5', top: '40%', left: '50%', delay: 2 },
    { id: 'star-6', top: '15%', left: '70%', delay: 2.5 },
  ];

  return (
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
          onLoadedData={handleVideoLoad}
        >
          <source src="/videos/centennial-hills-hero.mp4" type="video/mp4" />
          <source src="/videos/centennial-hills-hero.webm" type="video/webm" />
        </video>

        {/* Fallback Image */}
        {!isVideoLoaded && <div className="w-full h-full bg-cover bg-center hero-poster-bg" />}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-color/90 via-primary-color/80 to-secondary-color/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Headline */}
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find Your Dream Home in
            <span className="block bg-gradient-to-r from-accent-color to-secondary-color bg-clip-text text-transparent">
              Centennial Hills
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the future of real estate with AI-powered search, expert guidance, and
            unparalleled local knowledge
          </motion.p>

          {/* Hero Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stat.delay }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
                <div className="text-xs opacity-60">{stat.description}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Hero CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button type="button" className="btn btn-accent btn-lg group">
              <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Your Search
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              className="btn btn-outline btn-lg group text-white border-white hover:bg-white hover:text-primary-color"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Our Story
            </button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <feature.icon className="w-8 h-8 mx-auto mb-4 text-accent-color" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-80">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="animate-bounce">
          <ChevronRight className="w-6 h-6 text-white rotate-90" />
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Stars */}
        {floatingStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute text-white/20"
            style={{
              top: star.top,
              left: star.left,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: star.delay,
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>

      {/* Quick Search Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl px-6"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">
            Find Your Perfect Home
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="form-group">
              <label htmlFor={locationId} className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select id={locationId} className="form-input" aria-label="Select location">
                <option>All Areas</option>
                <option>Centennial Hills</option>
                <option>Providence</option>
                <option>Skye Canyon</option>
                <option>Northwest Las Vegas</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={priceId} className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select id={priceId} className="form-input" aria-label="Select price range">
                <option>Any Price</option>
                <option>$300K - $500K</option>
                <option>$500K - $750K</option>
                <option>$750K - $1M</option>
                <option>$1M+</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={bedroomsId} className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <select id={bedroomsId} className="form-input" aria-label="Select number of bedrooms">
                <option>Any</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
                <option>5+</option>
              </select>
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary w-full h-full">
                <Search className="w-5 h-5 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AwesomeHero;
