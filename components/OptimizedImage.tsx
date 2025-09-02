'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty' | 'shimmer';
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

interface ImageDimensions {
  width: number;
  height: number;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'shimmer',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const { isDark } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [placeholderSrc, setPlaceholderSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate optimized image URLs
  const generateOptimizedSrc = (
    originalSrc: string,
    targetWidth: number,
    targetHeight: number,
    format: 'webp' | 'avif' | 'jpeg' = 'webp'
  ) => {
    // If it's already an external URL (like Unsplash), optimize it
    if (originalSrc.includes('unsplash.com')) {
      const baseUrl = originalSrc.split('?')[0];
      return `${baseUrl}?w=${targetWidth}&h=${targetHeight}&fit=crop&fm=${format}&q=${quality}`;
    }

    // For local images, we'd use a CDN or image optimization service
    // For now, return the original src
    return originalSrc;
  };

  // Generate placeholder
  const generatePlaceholder = (w: number, h: number) => {
    if (placeholder === 'empty') {
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}'%3E%3Crect width='${w}' height='${h}' fill='${isDark ? '%23374151' : '%23f3f4f6'}'/%3E%3C/svg%3E`;
    }

    if (placeholder === 'shimmer') {
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}'%3E%3Cdefs%3E%3ClinearGradient id='shimmer' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' style='stop-color:${isDark ? '%23374151' : '%23f3f4f6'};stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:${isDark ? '%234b5563' : '%23e5e7eb'};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:${isDark ? '%23374151' : '%23f3f4f6'};stop-opacity:1' /%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='${w}' height='${h}' fill='url(%23shimmer)'/%3E%3CanimateTransform attributeName='transform' type='translate' values='-${w} 0;${w} 0' dur='1.5s' repeatCount='indefinite'/%3E%3C/svg%3E`;
    }

    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}'%3E%3Crect width='${w}' height='${h}' fill='${isDark ? '%23374151' : '%23f3f4f6'}'/%3E%3C/svg%3E`;
  };

  // Generate srcset for responsive images
  const _generateSrcSet = (originalSrc: string, baseWidth: number, baseHeight: number) => {
    const breakpoints = [320, 640, 768, 1024, 1280, 1536];
    const formats = ['webp', 'avif'];

    let srcSet = '';

    formats.forEach((format, formatIndex) => {
      if (formatIndex > 0) srcSet += ', ';

      breakpoints.forEach((breakpoint, index) => {
        if (index > 0) srcSet += ', ';
        const optimizedSrc = generateOptimizedSrc(
          originalSrc,
          breakpoint,
          Math.round((breakpoint / baseWidth) * baseHeight),
          format as 'webp' | 'avif' | 'jpeg'
        );
        srcSet += `${optimizedSrc} ${breakpoint}w`;
      });
    });

    return srcSet;
  };

  useEffect(() => {
    // Set initial placeholder
    setPlaceholderSrc(generatePlaceholder(width, height));

    // Generate optimized image sources
    const webpSrc = generateOptimizedSrc(src, width, height, 'webp');
    const _avifSrc = generateOptimizedSrc(src, width, height, 'avif');
    const _jpegSrc = generateOptimizedSrc(src, width, height, 'jpeg');

    // Set the primary source (WebP for modern browsers)
    setImageSrc(webpSrc);

    // Set up intersection observer for lazy loading
    if (!priority && imgRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Load the image when it comes into view
              const img = entry.target as HTMLImageElement;
              img.src = webpSrc;
              observerRef.current?.unobserve(img);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.1,
        }
      );

      observerRef.current.observe(imgRef.current);
    } else if (priority) {
      // Load immediately for priority images
      setImageSrc(webpSrc);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, width, height, priority, generateOptimizedSrc, generatePlaceholder]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const handleImageClick = () => {
    // Open image in lightbox or full view
    if (isLoaded && !hasError) {
      window.open(src, '_blank');
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <img
              src={placeholderSrc}
              alt="Loading placeholder"
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Image */}
      <motion.img
        ref={imgRef}
        src={priority ? imageSrc : placeholderSrc}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${hasError ? 'hidden' : ''}`}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        onClick={handleImageClick}
        style={{ cursor: isLoaded && !hasError ? 'pointer' : 'default' }}
      />

      {/* Error State */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          >
            <div className="text-center text-gray-500 dark:text-gray-400">
              <svg
                className="w-12 h-12 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">Image unavailable</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Indicator */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          >
            <div className="text-center text-gray-500 dark:text-gray-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-sm">Loading...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Info Overlay (on hover) */}
      <AnimatePresence>
        {isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-end"
          >
            <div className="w-full p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black bg-opacity-50 rounded-lg p-2 text-xs">
                <p className="font-medium">{alt}</p>
                <p className="text-gray-300">
                  {width} × {height}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
