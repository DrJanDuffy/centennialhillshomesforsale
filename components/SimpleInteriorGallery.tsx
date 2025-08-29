'use client';

import React from 'react';
import Image from 'next/image';

interface InteriorPhoto {
  id: string;
  filename: string;
  alt: string;
  description: string;
  category: string;
  style: string;
}

interface SimpleInteriorGalleryProps {
  photos: InteriorPhoto[];
  title?: string;
  subtitle?: string;
  maxPhotos?: number;
  className?: string;
}

export default function SimpleInteriorGallery({
  photos,
  title,
  subtitle,
  maxPhotos,
  className = ''
}: SimpleInteriorGalleryProps) {
  const displayPhotos = maxPhotos ? photos.slice(0, maxPhotos) : photos;

  return (
    <div className={className}>
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

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPhotos.map((photo) => (
          <div
            key={photo.id}
            className="group transform transition-all duration-300 hover:scale-105"
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
    </div>
  );
}
