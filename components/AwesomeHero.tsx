
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, MapPin, Sparkles, Mic, MicOff, ChevronLeft, ChevronRight, Star, Phone, Mail } from 'lucide-react';
import { useMCPClient } from '../hooks/useMCPClient';
import { useVoiceSearch } from '../hooks/useVoiceSearch';

const AwesomeHero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const { isConnected, isLoading } = useMCPClient();
  const { isListening, startListening, stopListening, isSupported } = useVoiceSearch(setSearchQuery, {
    onResult: (transcript) => setSearchQuery(transcript),
    continuous: false,
    interimResults: true
  });

  const heroSlides = [
    {
      title: "Find Your Dream Home in Centennial Hills",
      subtitle: "AI-Powered Property Search • Expert Local Knowledge • Personalized Service",
      image: "/api/placeholder/1920/1080?text=Luxury+Centennial+Hills+Homes",
      cta: "Luxury Homes from $650K"
    },
    {
      title: "Providence & Skye Canyon Specialist",
      subtitle: "Northwest Las Vegas Premier Communities • New Construction • Family Living",
      image: "/api/placeholder/1920/1080?text=Providence+New+Construction",
      cta: "New Construction Available"
    },
    {
      title: "Your Trusted Real Estate Partner",
      subtitle: "Dr. Jan Duff • 15+ Years Experience • Top 1% Las Vegas Agent",
      image: "/api/placeholder/1920/1080?text=Expert+Real+Estate+Service",
      cta: "Expert Guidance 24/7"
    }
  ];

  // Auto-rotate slides with pause on hover
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !isConnected) return;
    
    try {
      await searchProperties(searchQuery);
    } catch (error) {
      console.error('Search failed:', error);
    }
  }, [searchQuery, isConnected, searchProperties]);

  const handleVoiceToggle = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
        />
      </AnimatePresence>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Slide Navigation */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          {/* AI Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="flex items-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-2">
              <Sparkles className="w-5 h-5 text-yellow-400 mr-2 animate-pulse" />
              <span className="text-yellow-400 font-semibold text-sm md:text-base">AI-POWERED REAL ESTATE</span>
              <Sparkles className="w-5 h-5 text-yellow-400 ml-2 animate-pulse" />
            </div>
          </motion.div>
          
          {/* Dynamic Title */}
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {heroSlides[currentSlide].title}
          </motion.h1>
          
          {/* Dynamic Subtitle */}
          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            {heroSlides[currentSlide].subtitle}
          </motion.p>

          {/* CTA Badge */}
          <motion.div
            key={`cta-${currentSlide}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2 mb-8"
          >
            <Star className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-400 font-medium text-sm">{heroSlides[currentSlide].cta}</span>
          </motion.div>
        </motion.div>

        {/* Enhanced Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12"
        >
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className={`relative flex items-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-2 transition-all duration-300 ${isSearchFocused ? 'ring-4 ring-blue-400/30' : ''}`}>
              <Search className="w-6 h-6 text-gray-500 ml-4 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Ask me anything: 'Find 4-bedroom homes under $700K in Providence' or 'Show me new construction in Centennial Hills'"
                className="flex-1 px-6 py-4 text-lg border-none outline-none bg-transparent placeholder-gray-500"
                disabled={isLoading || !isConnected}
              />
              
              {isSupported && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleVoiceToggle}
                  className={`p-3 rounded-xl transition-all duration-300 mr-2 ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse shadow-lg' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={isListening ? 'Stop voice input' : 'Start voice input'}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!searchQuery.trim() || isLoading || !isConnected}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Searching...
                  </>
                ) : (
                  'Search with AI'
                )}
              </motion.button>
            </div>
            
            {isListening && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-yellow-400 mt-3 text-sm flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                🎤 Listening... Speak your property search query
              </motion.p>
            )}
            
            {!isConnected && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-orange-400 mt-3 text-sm flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-2"></div>
                Connecting to AI search service...
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Quick Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center border border-white/20"
          >
            <Home className="w-5 h-5 mr-2" />
            New Listings
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center border border-white/20"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Neighborhoods
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg"
          >
            Free Home Valuation
          </motion.button>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center"
        >
          <p className="text-white/90 text-lg mb-4">Ready to find your dream home?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="tel:+17029031952" 
              className="flex items-center text-yellow-400 font-bold text-xl hover:text-yellow-300 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              (702) 903-1952
            </motion.a>
            <span className="text-white/60 hidden sm:block">•</span>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="mailto:jan@centennialhillshomesforsale.com"
              className="flex items-center text-yellow-400 font-semibold hover:text-yellow-300 transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              jan@centennialhillshomesforsale.com
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Animation Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-20 text-6xl select-none pointer-events-none"
      >
        🏠
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-32 left-20 text-4xl select-none pointer-events-none"
      >
        ⭐
      </motion.div>

      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 3, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-40 left-32 text-3xl select-none pointer-events-none"
      >
        🌄
      </motion.div>

      {/* Search Results Preview */}
      <AnimatePresence>
        {properties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-white/20"
          >
            <div className="max-w-7xl mx-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Found {properties.length} Properties
                </h3>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View All Results →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {properties.slice(0, 3).map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={property.imageUrl}
                      alt={property.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 truncate mb-1">
                        {property.title}
                      </h4>
                      <p className="text-blue-600 font-bold text-lg mb-1">
                        {formatPrice(property.price)}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {property.bedrooms} bed • {property.bathrooms} bath • {property.sqft.toLocaleString()} sqft
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AwesomeHero;
