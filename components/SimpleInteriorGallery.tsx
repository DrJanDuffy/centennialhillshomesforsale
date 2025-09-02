import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

interface Photo {
  id: string;
  filename: string;
  title: string;
  description: string;
  category: string;
  roomType: string;
  style: string;
  colors: string[];
  features: string[];
  dimensions: {
    width: number;
    height: number;
  };
  tags: string[];
}

interface SimpleInteriorGalleryProps {
  photos?: Photo[];
  title?: string;
  subtitle?: string; // Added missing subtitle prop
  description?: string;
  className?: string;
  maxPhotos?: number; // Added missing maxPhotos prop
}

const SimpleInteriorGallery: React.FC<SimpleInteriorGalleryProps> = ({
  photos = [],
  title = 'Interior Photo Gallery',
  description = 'Explore the stunning interiors of Centennial Hills luxury homes',
  className = '',
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Default dummy photos if none provided
  const defaultPhotos: Photo[] = [
    {
      id: '1',
      filename: 'luxury-living-room.jpg',
      title: 'Elegant Living Room',
      description:
        'Spacious open-concept living area with floor-to-ceiling windows and mountain views',
      category: 'Living Space',
      roomType: 'Living Room',
      style: 'Modern Luxury',
      colors: ['Neutral', 'Warm Gray', 'Cream'],
      features: ['Floor-to-ceiling windows', 'Mountain views', 'Open concept', 'Premium finishes'],
      dimensions: { width: 1920, height: 1080 },
      tags: ['luxury', 'living-room', 'modern', 'mountain-views'],
    },
    {
      id: '2',
      filename: 'chef-kitchen.jpg',
      title: "Chef's Dream Kitchen",
      description: 'Professional-grade kitchen with premium appliances and granite countertops',
      category: 'Kitchen',
      roomType: 'Kitchen',
      style: 'Contemporary',
      colors: ['White', 'Gray', 'Stainless Steel'],
      features: ['Premium appliances', 'Granite countertops', 'Island seating', 'Walk-in pantry'],
      dimensions: { width: 1920, height: 1080 },
      tags: ['kitchen', 'chef', 'premium', 'appliances'],
    },
    {
      id: '3',
      filename: 'master-bedroom.jpg',
      title: 'Luxurious Master Suite',
      description: 'Spacious master bedroom with king bed and stunning mountain views',
      category: 'Bedroom',
      roomType: 'Master Bedroom',
      style: 'Luxury Retreat',
      colors: ['Neutral', 'Blue', 'Gold'],
      features: ['King bed', 'Mountain views', 'Sitting area', 'Walk-in closet'],
      dimensions: { width: 1920, height: 1080 },
      tags: ['master-bedroom', 'luxury', 'mountain-views', 'retreat'],
    },
    {
      id: '4',
      filename: 'spa-bathroom.jpg',
      title: 'Spa-like Master Bath',
      description: 'Luxurious bathroom retreat with dual vanities and soaking tub',
      category: 'Bathroom',
      roomType: 'Master Bathroom',
      style: 'Spa Luxury',
      colors: ['White', 'Gray', 'Chrome'],
      features: ['Dual vanities', 'Soaking tub', 'Walk-in shower', 'Heated floors'],
      dimensions: { width: 1920, height: 1080 },
      tags: ['bathroom', 'spa', 'luxury', 'dual-vanities'],
    },
    {
      id: '5',
      filename: 'formal-dining.jpg',
      title: 'Formal Dining Room',
      description: 'Elegant dining space perfect for hosting dinner parties and special occasions',
      category: 'Dining',
      roomType: 'Formal Dining Room',
      style: 'Traditional Elegance',
      colors: ['Cream', 'Gold', 'Brown'],
      features: ['Chandelier', 'Large table', 'Formal seating', 'Wine storage'],
      dimensions: { width: 1920, height: 1080 },
      tags: ['dining', 'formal', 'elegant', 'entertaining'],
    },
    {
      id: '6',
      filename: 'outdoor-living.jpg',
      title: 'Outdoor Living Space',
      description:
        'Beautiful outdoor area with fireplace and seating for enjoying Las Vegas weather',
      category: 'Outdoor',
      roomType: 'Patio/Deck',
      style: 'Outdoor Luxury',
      colors: ['Natural Stone', 'Wood', 'Green'],
      features: ['Fireplace', 'Seating area', 'Mountain views', 'Landscaping'],
      dimensions: { width: 1920, height: 1080 },
      tags: ['outdoor', 'patio', 'fireplace', 'mountain-views'],
    },
  ];

  const displayPhotos = photos.length > 0 ? photos : defaultPhotos;

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === displayPhotos.length - 1 ? 0 : prev + 1));
  };

  const previousPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? displayPhotos.length - 1 : prev - 1));
  };

  const openModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  // Generate placeholder image URLs using Unsplash
  const getPlaceholderImage = (photo: Photo, size: 'thumb' | 'full' = 'thumb') => {
    const width = size === 'full' ? 1200 : 400;
    const height = size === 'full' ? 800 : 300;

    // Use different Unsplash photos for variety
    const photoIds = [
      '1564013799919-ab600027ffc6', // Luxury home
      '1560250097-0b93528c311a', // Modern kitchen
      '1560518883-ce09059eeffa', // Bedroom
      '1560448204-e02f8c8c9cba', // Bathroom
      '1560449016-7c4a3a8f1c4d', // Dining room
      '1560448205-4d9f8c8c9cba', // Outdoor
    ];

    const photoIndex = parseInt(photo.id, 10) - 1;
    const photoId = photoIds[photoIndex % photoIds.length];

    return `https://images.unsplash.com/photo-${photoId}?w=${width}&h=${height}&fit=crop&q=80&auto=format`;
  };

  useEffect(() => {
    if (displayPhotos.length > 0) {
      setIsLoading(false);
    }
  }, [displayPhotos]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
        {displayPhotos.map((photo, index) => (
          <button
            key={photo.id}
            className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-left"
            onClick={() => openModal(index)}
            onKeyDown={(e) => handleKeyDown(e, () => openModal(index))}
            type="button"
            aria-label={`View ${photo.title} - ${photo.roomType}`}
          >
            <div className="relative aspect-[4/3] bg-gray-200">
              <img
                src={getPlaceholderImage(photo, 'thumb')}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                  <p className="font-semibold">{photo.title}</p>
                  <p className="text-sm">{photo.roomType}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative max-w-6xl max-h-[90vh] mx-4">
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
              aria-label="Close photo gallery"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Main Image */}
            <div className="relative">
              <img
                src={getPlaceholderImage(displayPhotos[currentPhotoIndex], 'full')}
                alt={displayPhotos[currentPhotoIndex].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={previousPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                type="button"
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </div>

            {/* Photo Info */}
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-semibold mb-2">
                {displayPhotos[currentPhotoIndex].title}
              </h3>
              <p className="text-gray-300 mb-2">{displayPhotos[currentPhotoIndex].description}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {displayPhotos[currentPhotoIndex].features
                  .slice(0, 3)
                  .map((feature, featureIndex) => (
                    <span
                      key={`feature-${displayPhotos[currentPhotoIndex].id}-${featureIndex}`}
                      className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center mt-4 space-x-2">
              {displayPhotos.map((photo, photoIndex) => (
                <button
                  key={`nav-${photo.id}`}
                  type="button"
                  onClick={() => setCurrentPhotoIndex(photoIndex)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    photoIndex === currentPhotoIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                  aria-label={`Go to photo ${photoIndex + 1}: ${photo.title}`}
                  aria-current={photoIndex === currentPhotoIndex ? 'true' : 'false'}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleInteriorGallery;
