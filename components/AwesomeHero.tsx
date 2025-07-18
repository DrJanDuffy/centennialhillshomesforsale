import React, { useState, useEffect } from 'react';
import { useMCPClient } from '../hooks/useMCPClient';
import { useVoiceSearch } from '../hooks/useVoiceSearch';

interface AwesomeHeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const AwesomeHero: React.FC<AwesomeHeroProps> = ({
  title = "Centennial Hills Homes For Sale",
  subtitle = "Your Premier Las Vegas Real Estate Experience with Dr. Jan Duffy",
  backgroundImage = "/images/centennial-hills-hero.jpg"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { sendMessage, isConnected, isLoading, error, connect } = useMCPClient();
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    resetTranscript,
    isSupported: voiceSupported 
  } = useVoiceSearch();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (transcript) {
      setSearchQuery(transcript);
    }
  }, [transcript]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    try {
      const response = await sendMessage(`Search for properties: ${query}`);
      if (response.success) {
        console.log('Search results:', response.data);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleVoiceSearch = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  // Create dynamic CSS for background image
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .hero-background-image {
        background-image: url(${backgroundImage}) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [backgroundImage]);

  return (
    <section 
      className={`hero-background-image relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat transition-all duration-1000 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
      }`}
    >
      {/* Enhanced gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-purple-900/70 to-blue-900/85"></div>

      {/* Main content container with improved spacing */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero title with better responsive typography */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight tracking-tight">
          {title}
        </h1>

        {/* Subtitle with improved readability */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 lg:mb-10 max-w-4xl mx-auto leading-relaxed font-light">
          {subtitle}
        </p>

        {/* Enhanced search container with better mobile responsiveness */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto border border-white/20 shadow-2xl">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search input with improved styling */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for your dream home..."
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-white/25 backdrop-blur-sm text-white placeholder-white/80 border border-white/30 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 text-base sm:text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            />

            {/* Action buttons container */}
            <div className="flex gap-2 sm:gap-3">
              {voiceSupported && (
                <button
                  onClick={handleVoiceSearch}
                  className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-white/25 hover:bg-white/35'
                  } text-white border border-white/30 hover:border-white/50`}
                  title={isListening ? 'Stop listening' : 'Start voice search'}
                >
                  <span className="text-lg sm:text-xl">🎤</span>
                </button>
              )}

              <button
                onClick={() => handleSearch(searchQuery)}
                disabled={isLoading}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg flex items-center justify-center min-w-[100px]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Searching...
                  </span>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>

          {/* Voice listening indicator */}
          {isListening && (
            <div className="mt-4 text-center">
              <p className="text-white/90 animate-pulse text-sm sm:text-base">🎤 Listening... Speak now</p>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="mt-4 text-center">
              <p className="text-red-300 text-sm sm:text-base">Search error: {error}</p>
            </div>
          )}
        </div>

        {/* CTA buttons with improved spacing and responsive design */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto">
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/30 hover:border-white/50 text-base sm:text-lg">
            View Listings
          </button>
          <button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-base sm:text-lg">
            Free Market Analysis
          </button>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/30 hover:border-white/50 text-base sm:text-lg">
            Contact Dr. Jan
          </button>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default AwesomeHero;