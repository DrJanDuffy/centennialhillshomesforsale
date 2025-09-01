// Image optimization utilities for Phase 4 Final Polish

export interface ImageOptimizationConfig {
  quality: number;
  formats: string[];
  breakpoints: number[];
  lazyLoading: boolean;
  priorityImages: string[];
}

export interface OptimizedImageSource {
  src: string;
  srcSet: string;
  sizes: string;
  format: string;
  width: number;
  height: number;
}

export interface ImageMetadata {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  priority: boolean;
  category: string;
  description?: string;
}

// Default optimization configuration
export const defaultImageConfig: ImageOptimizationConfig = {
  quality: 85,
  formats: ['webp', 'avif', 'jpeg'],
  breakpoints: [320, 640, 768, 1024, 1280, 1920],
  lazyLoading: true,
  priorityImages: ['hero', 'exterior-main'],
};

// Check if browser supports WebP
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bAISLfQBfAA';
  });
};

// Check if browser supports AVIF
export const supportsAVIF = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 1);
    };
    avif.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgq8Y8AgAAWocyLcyToAAA';
  });
};

// Generate optimized image URL for external services
export const generateOptimizedUrl = (
  originalSrc: string,
  width: number,
  height: number,
  format: string = 'webp',
  quality: number = 85
): string => {
  // Handle Unsplash images
  if (originalSrc.includes('unsplash.com')) {
    const baseUrl = originalSrc.split('?')[0];
    return `${baseUrl}?w=${width}&h=${height}&fit=crop&fm=${format}&q=${quality}`;
  }

  // Handle Pixabay images
  if (originalSrc.includes('pixabay.com')) {
    const baseUrl = originalSrc.split('_')[0];
    return `${baseUrl}_${width}x${height}.${format}`;
  }

  // Handle Pexels images
  if (originalSrc.includes('pexels.com')) {
    const baseUrl = originalSrc.split('?')[0];
    return `${baseUrl}?auto=compress&cs=tinysrgb&w=${width}&h=${height}&dpr=1&fit=crop&fm=${format}&q=${quality}`;
  }

  // For local images, return as-is (would be optimized by build process)
  return originalSrc;
};

// Generate responsive srcSet
export const generateSrcSet = (
  originalSrc: string,
  baseWidth: number,
  baseHeight: number,
  formats: string[] = ['webp', 'jpeg'],
  breakpoints: number[] = [320, 640, 768, 1024, 1280, 1920],
  quality: number = 85
): string => {
  let srcSet = '';

  formats.forEach((format, formatIndex) => {
    if (formatIndex > 0) srcSet += ', ';

    breakpoints.forEach((breakpoint, index) => {
      if (index > 0) srcSet += ', ';
      const optimizedSrc = generateOptimizedUrl(
        originalSrc,
        breakpoint,
        Math.round((breakpoint / baseWidth) * baseHeight),
        format,
        quality
      );
      srcSet += `${optimizedSrc} ${breakpoint}w`;
    });
  });

  return srcSet;
};

// Generate appropriate sizes attribute
export const generateSizes = (
  breakpoints: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
  const sizes = breakpoints.map((breakpoint, index) => {
    if (index === 0) return `${breakpoint}px`;
    if (index === breakpoints.length - 1) return `${breakpoint}px`;
    return `(min-width: ${breakpoints[index - 1]}px) ${breakpoint}px`;
  });

  return sizes.join(', ');
};

// Calculate aspect ratio
export const calculateAspectRatio = (width: number, height: number): number => {
  return width / height;
};

// Generate CSS aspect ratio
export const generateAspectRatioCSS = (width: number, height: number): string => {
  const ratio = calculateAspectRatio(width, height);
  return `${(1 / ratio) * 100}%`;
};

// Generate placeholder SVG
export const generatePlaceholderSVG = (
  width: number,
  height: number,
  type: 'shimmer' | 'empty' | 'blur' = 'shimmer',
  isDark: boolean = false
): string => {
  const bgColor = isDark ? '%23374151' : '%23f3f4f6';
  const shimmerColor = isDark ? '%234b5563' : '%23e5e7eb';

  if (type === 'empty') {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='${bgColor}'/%3E%3C/svg%3E`;
  }

  if (type === 'shimmer') {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Cdefs%3E%3ClinearGradient id='shimmer' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' style='stop-color:${bgColor};stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:${shimmerColor};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:${bgColor};stop-opacity:1' /%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='${width}' height='${height}' fill='url(%23shimmer)'/%3E%3CanimateTransform attributeName='transform' type='translate' values='-${width} 0;${width} 0' dur='1.5s' repeatCount='indefinite'/%3E%3C/svg%3E`;
  }

  // Blur placeholder
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Cdefs%3E%3Cfilter id='blur' x='-50%25' y='-50%25' width='200%25' height='200%25'%3E%3CfeGaussianBlur stdDeviation='3'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='${width}' height='${height}' fill='${bgColor}' filter='url(%23blur)'/%3E%3C/svg%3E`;
};

// Preload critical images
export const preloadImage = (src: string, priority: 'high' | 'low' = 'low'): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.fetchPriority = priority;
  document.head.appendChild(link);
};

// Lazy load images with Intersection Observer
export const createLazyLoader = (
  images: NodeListOf<HTMLImageElement>,
  options: IntersectionObserverInit = {
    rootMargin: '50px 0px',
    threshold: 0.1,
  }
): IntersectionObserver => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const dataSrc = img.dataset.src;
        if (dataSrc) {
          img.src = dataSrc;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      }
    });
  }, options);

  images.forEach((img) => observer.observe(img));
  return observer;
};

// Generate image optimization report
export const generateOptimizationReport = (
  images: ImageMetadata[]
): {
  totalImages: number;
  priorityImages: number;
  lazyImages: number;
  totalSize: number;
  estimatedSavings: number;
} => {
  const totalImages = images.length;
  const priorityImages = images.filter((img) => img.priority).length;
  const lazyImages = totalImages - priorityImages;

  // Estimate sizes (this would be more accurate with actual file sizes)
  const totalSize = images.reduce((acc, img) => {
    const baseSize = (img.width * img.height * 4) / 1024; // Rough estimate in KB
    return acc + baseSize;
  }, 0);

  // Estimate savings from optimization (WebP typically 25-35% smaller)
  const estimatedSavings = totalSize * 0.3;

  return {
    totalImages,
    priorityImages,
    lazyImages,
    totalSize: Math.round(totalSize),
    estimatedSavings: Math.round(estimatedSavings),
  };
};

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / k ** i).toFixed(2)) + ' ' + sizes[i];
};

// Get optimal image format for browser
export const getOptimalFormat = async (): Promise<string> => {
  if (await supportsAVIF()) return 'avif';
  if (await supportsWebP()) return 'webp';
  return 'jpeg';
};

// Generate responsive image object
export const generateResponsiveImage = (
  originalSrc: string,
  metadata: ImageMetadata,
  config: ImageOptimizationConfig = defaultImageConfig
): OptimizedImageSource => {
  const optimalFormat = 'webp'; // Would be determined by browser support
  const srcSet = generateSrcSet(
    originalSrc,
    metadata.width,
    metadata.height,
    [optimalFormat, 'jpeg'],
    config.breakpoints,
    config.quality
  );

  const sizes = generateSizes(config.breakpoints);

  return {
    src: generateOptimizedUrl(
      originalSrc,
      metadata.width,
      metadata.height,
      optimalFormat,
      config.quality
    ),
    srcSet,
    sizes,
    format: optimalFormat,
    width: metadata.width,
    height: metadata.height,
  };
};
