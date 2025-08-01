
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Home, 
  Search, 
  Heart,
  Eye
} from 'lucide-react';

interface Neighborhood {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  properties: number;
  avgPrice: number;
  description: string;
  features: string[];
  image: string;
}

interface InteractivePropertyMapProps {
  className?: string;
}

const InteractivePropertyMap: React.FC<InteractivePropertyMapProps> = ({ className = '' }) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState<string | null>(null);

  const neighborhoods: Neighborhood[] = [
    {
      id: 'centennial-hills',
      name: 'Centennial Hills',
      coordinates: { lat: 36.2833, lng: -115.2833 },
      properties: 45,
      avgPrice: 789000,
      description: 'Upscale residential community with mountain views and modern amenities',
      features: ['Mountain Views', 'Golf Course', 'Shopping Centers', 'Top Schools'],
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'
    },
    {
      id: 'providence',
      name: 'Providence',
      coordinates: { lat: 36.2900, lng: -115.2900 },
      properties: 32,
      avgPrice: 850000,
      description: 'Luxury community with custom homes and exclusive amenities',
      features: ['Custom Homes', 'Private Pool', 'Wine Cellar', 'Home Theater'],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'
    },
    {
      id: 'skye-canyon',
      name: 'Skye Canyon',
      coordinates: { lat: 36.2750, lng: -115.2750 },
      properties: 28,
      avgPrice: 650000,
      description: 'Family-friendly community with parks and recreational facilities',
      features: ['Parks & Trails', 'Community Pool', 'Playgrounds', 'Family Amenities'],
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop'
    }
  ];

  const formatPrice = (price: number) => {
    return `$${(price / 1000).toFixed(0)}K`;
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
      {/* Map Header */}
      <div className="bg-gradient-to-r from-primary-color to-secondary-color text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Interactive Neighborhood Map</h3>
            <p className="text-white/80">Explore Centennial Hills, Providence, and Skye Canyon</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{neighborhoods.reduce((sum, n) => sum + n.properties, 0)}</div>
              <div className="text-sm text-white/80">Total Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{formatPrice(neighborhoods.reduce((sum, n) => sum + n.avgPrice, 0) / neighborhoods.length)}</div>
              <div className="text-sm text-white/80">Avg Price</div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96 bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Background Map Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200"></div>
        </div>

        {/* Neighborhood Markers */}
        {neighborhoods.map((neighborhood, index) => (
          <motion.div
            key={neighborhood.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className={`absolute cursor-pointer transition-all duration-300 ${
              hoveredNeighborhood === neighborhood.id ? 'z-20' : 'z-10'
            }`}
            style={{
              left: `${20 + (index * 25)}%`,
              top: `${30 + (index * 10)}%`
            }}
            onMouseEnter={() => setHoveredNeighborhood(neighborhood.id)}
            onMouseLeave={() => setHoveredNeighborhood(null)}
            onClick={() => setSelectedNeighborhood(neighborhood)}
          >
            {/* Marker */}
            <motion.div
              className={`relative ${hoveredNeighborhood === neighborhood.id ? 'scale-125' : 'scale-100'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="w-12 h-12 bg-accent-color rounded-full shadow-lg flex items-center justify-center border-4 border-white">
                <Home className="w-6 h-6 text-white" />
              </div>
              
              {/* Pulse Animation */}
              <motion.div
                className="absolute inset-0 bg-accent-color rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              />
            </motion.div>

            {/* Neighborhood Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: hoveredNeighborhood === neighborhood.id ? 1 : 0, y: hoveredNeighborhood === neighborhood.id ? 0 : 10 }}
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-3 py-2 shadow-lg whitespace-nowrap"
            >
              <div className="text-sm font-semibold text-primary">{neighborhood.name}</div>
              <div className="text-xs text-secondary">{neighborhood.properties} properties</div>
            </motion.div>
          </motion.div>
        ))}

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-lg">
          <h4 className="text-sm font-semibold text-primary mb-2">Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent-color rounded-full"></div>
              <span className="text-xs text-secondary">Neighborhoods</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary-color rounded-full"></div>
              <span className="text-xs text-secondary">Properties</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning-color rounded-full"></div>
              <span className="text-xs text-secondary">Amenities</span>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <div className="absolute top-4 right-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-lg px-4 py-2 shadow-lg flex items-center gap-2 hover:shadow-xl transition-shadow"
          >
            <Search className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Search Area</span>
          </motion.button>
        </div>
      </div>

      {/* Neighborhood Details Modal */}
      <AnimatePresence>
        {selectedNeighborhood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedNeighborhood(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-primary">{selectedNeighborhood.name}</h3>
                <button
                  onClick={() => setSelectedNeighborhood(null)}
                  className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center hover:bg-secondary-color/20 transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Image */}
              <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                <Image
                  src={selectedNeighborhood.image}
                  alt={selectedNeighborhood.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-2xl font-bold">{formatPrice(selectedNeighborhood.avgPrice)}</div>
                  <div className="text-sm opacity-90">Average Price</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-tertiary rounded-lg">
                  <div className="text-lg font-bold text-primary">{selectedNeighborhood.properties}</div>
                  <div className="text-sm text-secondary">Properties</div>
                </div>
                <div className="text-center p-3 bg-tertiary rounded-lg">
                  <div className="text-lg font-bold text-primary">{selectedNeighborhood.features.length}</div>
                  <div className="text-sm text-secondary">Amenities</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-secondary text-sm mb-4">{selectedNeighborhood.description}</p>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-primary mb-2">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNeighborhood.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-accent-color/10 text-accent-color px-2 py-1 rounded text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Properties
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-outline"
                >
                  <Heart className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractivePropertyMap;
