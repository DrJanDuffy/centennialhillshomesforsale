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
  const { sendMessage, isConnected, error, connect } = useMCPClient();
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

  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center bg-cover bg-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
      }`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60"></div>

      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {title}
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for your dream home..."
              className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/50"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            />

            <div className="flex gap-2">
              {voiceSupported && (
                <button
                  onClick={handleVoiceSearch}
                  className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-white/20 hover:bg-white/30'
                  } text-white border border-white/30`}
                  title={isListening ? 'Stop listening' : 'Start voice search'}
                >
                  🎤
                </button>
              )}

              <button
                onClick={() => handleSearch(searchQuery)}
                disabled={mcpLoading}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mcpLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {isListening && (
            <div className="mt-4 text-center">
              <p className="text-white/80 animate-pulse">🎤 Listening...</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/30">
            View Listings
          </button>
          <button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
            Free Market Analysis
          </button>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/30">
            Contact Dr. Jan
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default AwesomeHero;