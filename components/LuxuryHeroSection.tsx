import Image from 'next/image';
import type React from 'react';
import { useEffect, useState } from 'react';

interface LuxuryHeroSectionProps {
  heroImageUrl?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaPhone?: string;
  agentName?: string;
  agentTagline?: string;
}

const LuxuryHeroSection: React.FC<LuxuryHeroSectionProps> = ({
  heroImageUrl = '/images/hero-image.jpg',
  title = 'Luxury Desert Living Redefined',
  subtitle = 'Centennial Hills • Spring Mountains Views • Modern Architectural Excellence',
  ctaText = 'Call/Text 702-222-1964',
  ctaPhone = '702-222-1964',
  agentName = 'Dr. Jan Duffy | Las Vegas Real Estate Expert 🎰',
  agentTagline = 'Your Expert Neighbor Who Knows Every Sale',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Check if the hero image exists
    const img = new window.Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = heroImageUrl;
  }, [heroImageUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center text-white">
      <div className="w-full max-w-6xl mx-auto px-5 text-center">
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8 group">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
              <div className="flex items-center text-yellow-400 text-xl">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mr-4"></div>
                Loading your luxury Vegas masterpiece...
              </div>
            </div>
          )}

          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
              <div className="text-center">
                <div className="text-yellow-400 text-xl mb-4">🏠</div>
                <div className="text-white text-lg">Hero image not found</div>
                <div className="text-gray-400 text-sm mt-2">
                  Please add your hero image to /public/images/hero-image.jpg
                </div>
              </div>
            </div>
          )}

          {imageLoaded && (
            <>
              <Image
                src={heroImageUrl}
                alt="Luxury Modern Home in Centennial Hills, Las Vegas with Spring Mountains Backdrop"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-8 pb-6">
                <h1 className="text-4xl md:text-5xl font-light mb-4 text-shadow-lg tracking-wide">
                  {title}
                </h1>
                <p className="text-xl md:text-2xl opacity-90 mb-6 font-light">{subtitle}</p>
                <a
                  href={`tel:${ctaPhone}`}
                  className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/25 hover:from-yellow-500 hover:to-yellow-400"
                >
                  {ctaText}
                </a>
              </div>
            </>
          )}
        </div>

        <div className="text-center">
          <div className="text-2xl text-yellow-400 font-medium mb-3">{agentName}</div>
          <div className="text-lg text-gray-300 tracking-wide">{agentTagline}</div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryHeroSection;
