import { useState } from 'react';

interface VirtualTourProps {
  propertyId: string;
  tourUrl?: string;
  matterportId?: string;
  photos: string[];
  className?: string;
}

export default function VirtualTour({
  propertyId,
  tourUrl,
  matterportId,
  photos,
  className = '',
}: VirtualTourProps) {
  const [activeTour, setActiveTour] = useState<'matterport' | 'photos' | 'video'>('photos');
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className={`virtual-tour-container ${className}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Tour Type Selector */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTour('photos')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTour === 'photos'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            📸 Photo Gallery
          </button>
          {matterportId && (
            <button
              onClick={() => setActiveTour('matterport')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTour === 'matterport'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              🏠 3D Tour
            </button>
          )}
          {tourUrl && (
            <button
              onClick={() => setActiveTour('video')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTour === 'video'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              🎥 Video Tour
            </button>
          )}
        </div>

        {/* Tour Content */}
        <div className="relative">
          {activeTour === 'photos' && (
            <div className="relative">
              <img
                src={photos[currentPhotoIndex]}
                alt={`Property photo ${currentPhotoIndex + 1}`}
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Previous photo"
              >
                ←
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Next photo"
              >
                →
              </button>

              {/* Photo Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentPhotoIndex + 1} / {photos.length}
              </div>
            </div>
          )}

          {activeTour === 'matterport' && matterportId && (
            <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
              <iframe
                src={`https://my.matterport.com/show/?m=${matterportId}`}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title="3D Virtual Tour"
                className="rounded-lg"
              />
            </div>
          )}

          {activeTour === 'video' && tourUrl && (
            <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
              <video
                src={tourUrl}
                controls
                className="w-full h-full object-cover rounded-lg"
                poster={photos[0]}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {activeTour === 'photos' && photos.length > 1 && (
          <div className="p-4 bg-gray-50">
            <div className="flex space-x-2 overflow-x-auto">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentPhotoIndex
                      ? 'border-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={photo}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
