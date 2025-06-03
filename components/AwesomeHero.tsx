
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, MapPin, Sparkles, Mic, MicOff } from 'lucide-react';
import { useMCPClient } from '../hooks/useMCPClient';
import { useVoiceSearch } from '../hooks/useVoiceSearch';

const AwesomeHero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { searchProperties, isLoading } = useMCPClient();
  const { isListening, startListening, stopListening, transcript } = useVoiceSearch();

  const heroSlides = [
    {
      title: "Find Your Dream Home in Centennial Hills",
      subtitle: "AI-Powered Property Search • Expert Local Knowledge • Personalized Service",
      image: "/images/centennial-hills-luxury-homes.jpg"
    },
    {
      title: "Providence & Skye Canyon Specialist",
      subtitle: "Northwest Las Vegas Premier Communities • New Construction • Luxury Living",
      image: "/images/providence-neighborhood.jpg"
    },
    {
      title: "Your Trusted Real Estate Partner",
      subtitle: "Dr. Jan Duff • 15+ Years Experience • Local Market Expert",
      image: "/images/jan-duff-realtor.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (transcript) {
      setSearchQuery(transcript);
    }
  }, [transcript]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        await searchProperties(searchQuery);
      } catch (error) {
        console.error('Search error:', error);
      }
    }
  };

  const toggleVoiceSearch = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold text-lg">AI-POWERED REAL ESTATE</span>
            <Sparkles className="w-8 h-8 text-yellow-400 ml-2" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <motion.span
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="block"
            >
              {heroSlides[currentSlide].title}
            </motion.span>
          </h1>
          
          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto"
          >
            {heroSlides[currentSlide].subtitle}
          </motion.p>
        </motion.div>

        {/* AI Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12"
        >
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="relative flex items-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4">
              <Search className="w-6 h-6 text-gray-500 ml-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask me anything: 'Find 4-bedroom homes under $600K in Providence' or 'Show me new construction in Centennial Hills'"
                className="flex-1 px-6 py-4 text-lg border-none outline-none bg-transparent placeholder-gray-500"
              />
              <button
                type="button"
                onClick={toggleVoiceSearch}
                className={`p-3 rounded-xl transition-all duration-300 mr-2 ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? 'Searching...' : 'Search with AI'}
              </button>
            </div>
            {isListening && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-yellow-400 mt-2 text-sm"
              >
                🎤 Listening... Speak your property search query
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
          <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center">
            <Home className="w-5 h-5 mr-2" />
            New Listings
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Neighborhoods
          </button>
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
            Free Home Valuation
          </button>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center"
        >
          <p className="text-white/90 text-lg mb-2">Ready to get started?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="tel:+17029031952" 
              className="text-yellow-400 font-bold text-xl hover:text-yellow-300 transition-colors"
            >
              📞 (702) 903-1952
            </a>
            <span className="text-white/60 hidden sm:block">•</span>
            <a 
              href="mailto:jan@centennialhillshomesforsale.com"
              className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors"
            >
              ✉️ jan@centennialhillshomesforsale.com
            </a>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-20 text-6xl opacity-20"
      >
        🏠
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-32 left-20 text-4xl opacity-20"
      >
        🌟
      </motion.div>
    </section>
  );
};

export default AwesomeHero;
