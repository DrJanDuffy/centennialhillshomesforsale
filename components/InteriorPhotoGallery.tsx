'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';

interface InteriorPhoto {
  id: string;
  filename: string;
  alt: string;
  description: string;
  category: string;
  style: string;
  tags: string[];
}

interface InteriorPhotoGalleryProps {
  photos: InteriorPhoto[];
  title?: string;
  subtitle?: string;
  layout?: 'grid' | 'carousel' | 'masonry';
  showFilters?: boolean;
  maxPhotos?: number;
  className?: string;
}

export default function InteriorPhotoGallery({
  photos,
  title,
  subtitle,
  layout = 'grid',
  showFilters = false,
  maxPhotos,
  className = ''
}: InteriorPhotoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<InteriorPhoto | null>(null);

  // Get unique categories and styles for filters
  const categories = useMemo(() => {
    const cats = ['all', ...Array.from(new Set(photos.map(p => p.category)))];
    return cats;
  }, [photos]);

  const styles = useMemo(() => {
    const stls = ['all', ...Array.from(new Set(photos.map(p => p.style)))];
    return stls;
  }, [photos]);

  // Filter photos based on selected filters
  const filteredPhotos = useMemo(() => {
    let filtered = photos;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (selectedStyle !== 'all') {
      filtered = filtered.filter(p => p.style === selectedStyle);
    }
    
    if (maxPhotos) {
      filtered = filtered.slice(0, maxPhotos);
    }
    
    return filtered;
  }, [photos, selectedCategory, selectedStyle, maxPhotos]);

  const handlePhotoClick = (photo: InteriorPhoto) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const renderGridLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPhotos.map((photo) => (
        <button
          key={photo.id}
          className="group cursor-pointer transform transition-all duration-300 hover:scale-105 text-left"
          onClick={() => handlePhotoClick(photo)}
          onKeyDown={(e) => e.key === 'Enter' && handlePhotoClick(photo)}
          aria-label={`View ${photo.description}`}
          type="button"
        >
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <div className="aspect-[4/3] relative">
              <Image
                src={`/assets/images/interior-photos/${photo.filename}`}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <h3 className="font-semibold text-lg mb-1">{photo.description}</h3>
              <p className="text-sm opacity-90 capitalize">{photo.style} {photo.category}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCarouselLayout = () => (
    <div className="relative">
      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
        {filteredPhotos.map((photo) => (
                  <button
          key={photo.id}
          className="flex-shrink-0 w-80 cursor-pointer transform transition-all duration-300 hover:scale-105 text-left"
          onClick={() => handlePhotoClick(photo)}
          onKeyDown={(e) => e.key === 'Enter' && handlePhotoClick(photo)}
          aria-label={`View ${photo.description}`}
          type="button"
        >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-[4/3] relative">
                <Image
                  src={`/assets/images/interior-photos/${photo.filename}`}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg mb-2">{photo.description}</h3>
                <p className="text-gray-600 capitalize">{photo.style} {photo.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMasonryLayout = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {filteredPhotos.map((photo) => (
        <button
          key={photo.id}
          className="break-inside-avoid cursor-pointer transform transition-all duration-300 hover:scale-105 text-left"
          onClick={() => handlePhotoClick(photo)}
          onKeyDown={(e) => e.key === 'Enter' && handlePhotoClick(photo)}
          aria-label={`View ${photo.description}`}
          type="button"
        >
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <div className="aspect-[4/3] relative">
              <Image
                src={`/assets/images/interior-photos/${photo.filename}`}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-lg mb-2">{photo.description}</h3>
              <p className="text-gray-600 capitalize">{photo.style} {photo.category}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLayout = () => {
    switch (layout) {
      case 'carousel':
        return renderCarouselLayout();
      case 'masonry':
        return renderMasonryLayout();
      default:
        return renderGridLayout();
    }
  };

  return (
    <div className={`${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          
          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {styles.map((style) => (
              <option key={style} value={style}>
                {style === 'all' ? 'All Styles' : style.charAt(0).toUpperCase() + style.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Photo Gallery */}
      {filteredPhotos.length > 0 ? (
        renderLayout()
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No photos match the selected filters.</p>
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative aspect-[4/3]">
              <Image
                src={`/assets/images/interior-photos/${selectedPhoto.filename}`}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
            
            <div className="bg-white p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPhoto.description}</h3>
              <p className="text-gray-600 capitalize mb-3">{selectedPhoto.style} {selectedPhoto.category}</p>
              <div className="flex flex-wrap gap-2">
                {selectedPhoto.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
