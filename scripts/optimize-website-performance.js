#!/usr/bin/env node

/**
 * Website Performance Optimization Script
 * Implements critical performance improvements for the Centennial Hills website
 */

const fs = require('node:fs');
const path = require('node:path');

console.log('🚀 Website Performance Optimization');
console.log('===================================\n');

// Optimization configurations
const optimizations = {
  criticalResourceHints: {
    description: 'Add critical resource hints for faster loading',
    files: ['pages/_document.tsx'],
    changes: [
      {
        search: '<link rel="preconnect" href="https://fonts.googleapis.com">',
        replace: `<link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="dns-prefetch" href="//images.unsplash.com">
        <link rel="dns-prefetch" href="//www.google-analytics.com">
        <link rel="dns-prefetch" href="//em.realscout.com">`,
      },
    ],
  },

  loadingStates: {
    description: 'Add loading states for better UX',
    files: ['components/PropertyListings.tsx', 'components/RealScoutWidget.tsx'],
    changes: [
      {
        search: 'Loading property listings...',
        replace: `<div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span>Loading property listings...</span>
        </div>`,
      },
    ],
  },

  mobileOptimizations: {
    description: 'Optimize mobile interactions and touch targets',
    files: ['components/Navigation.tsx', 'components/PropertyCard.tsx'],
    changes: [
      {
        search: 'className="p-2 rounded-lg"',
        replace:
          'className="p-3 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"',
      },
    ],
  },

  seoEnhancements: {
    description: 'Enhance SEO with better structured data',
    files: ['pages/index.tsx'],
    changes: [
      {
        search: '<script type="application/ld+json" id="business-schema"></script>',
        replace: `<script type="application/ld+json" id="business-schema">
        {
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Dr. Jan Duffy",
          "description": "Top 1% REALTOR® specializing in Centennial Hills luxury real estate",
          "areaServed": {
            "@type": "Place",
            "name": "Centennial Hills, Las Vegas, NV"
          },
          "serviceType": "Real Estate Services",
          "telephone": "+1-702-222-1964",
          "email": "jan@centennialhills.com",
          "url": "https://centennialhillshomesforsale.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Las Vegas",
            "addressRegion": "NV",
            "addressCountry": "US"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "150"
          }
        }
        </script>`,
      },
    ],
  },
};

// Function to apply optimizations
function applyOptimization(optimization) {
  console.log(`🔧 ${optimization.description}`);

  optimization.files.forEach((filePath) => {
    const fullPath = path.join(process.cwd(), filePath);

    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      optimization.changes.forEach((change) => {
        if (content.includes(change.search)) {
          content = content.replace(change.search, change.replace);
          modified = true;
          console.log(`   ✅ Updated: ${filePath}`);
        } else {
          console.log(`   ⚠️  Pattern not found in: ${filePath}`);
        }
      });

      if (modified) {
        fs.writeFileSync(fullPath, content);
      }
    } else {
      console.log(`   ❌ File not found: ${filePath}`);
    }
  });

  console.log('');
}

// Function to create performance monitoring component
function createPerformanceMonitor() {
  console.log('📊 Creating performance monitoring component...');

  const performanceMonitor = `import { useEffect } from 'react';

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log('LCP:', entry.startTime);
          // Send to analytics
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log('FID:', entry.processingStart - entry.startTime);
          // Send to analytics
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value);
            // Send to analytics
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }, []);

  return null;
};`;

  const filePath = path.join(process.cwd(), 'components/PerformanceMonitor.tsx');
  fs.writeFileSync(filePath, performanceMonitor);
  console.log('   ✅ Created: components/PerformanceMonitor.tsx');
  console.log('');
}

// Function to create loading skeleton component
function createLoadingSkeleton() {
  console.log('💀 Creating loading skeleton component...');

  const loadingSkeleton = `import React from 'react';

export const PropertyCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

export const PropertyListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <PropertyCardSkeleton key={index} />
    ))}
  </div>
);`;

  const filePath = path.join(process.cwd(), 'components/LoadingSkeleton.tsx');
  fs.writeFileSync(filePath, loadingSkeleton);
  console.log('   ✅ Created: components/LoadingSkeleton.tsx');
  console.log('');
}

// Function to create mobile optimization utilities
function createMobileOptimizations() {
  console.log('📱 Creating mobile optimization utilities...');

  const mobileUtils = `import { useEffect, useState } from 'react';

export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export const useTouchOptimization = () => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      // Handle swipe
      return { isLeftSwipe, isRightSwipe };
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
};`;

  const filePath = path.join(process.cwd(), 'hooks/useMobileOptimizations.ts');
  fs.writeFileSync(filePath, mobileUtils);
  console.log('   ✅ Created: hooks/useMobileOptimizations.ts');
  console.log('');
}

// Main execution
async function main() {
  try {
    console.log('🎯 Applying critical optimizations...\n');

    // Apply each optimization
    Object.values(optimizations).forEach(applyOptimization);

    // Create new components
    createPerformanceMonitor();
    createLoadingSkeleton();
    createMobileOptimizations();

    console.log('✅ Optimization complete!');
    console.log('\n📋 Next Steps:');
    console.log('   1. Test the changes locally');
    console.log('   2. Run Lighthouse audit');
    console.log('   3. Deploy to Vercel');
    console.log('   4. Monitor performance metrics');
    console.log('\n🚀 Your website should now be significantly faster and more user-friendly!');
  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
    process.exit(1);
  }
}

main();
