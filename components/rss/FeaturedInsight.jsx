'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { trackRSSAnalytics, trackRSSPerformance } from '../../lib/rss-utils';
import KCMFeed from './KCMFeed';

export default function FeaturedInsight({ 
  className = '',
  title = 'Latest Market Insight',
  subtitle = 'Stay informed with expert analysis from Keeping Current Matters',
  showBackground = true,
  enableAnalytics = true,
  enablePerformance = true,
  animationDelay = 0.2,
  theme = 'blue'
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Performance tracking
  useEffect(() => {
    if (enablePerformance) {
      const startTime = performance.now();
      
      return () => {
        const loadTime = performance.now() - startTime;
        trackRSSPerformance('featured_insight_load_time', loadTime, {
          component: 'FeaturedInsight',
          theme,
          animationDelay
        });
      };
    }
  }, [enablePerformance, theme, animationDelay]);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('featured-insight-container');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Handle interaction
  const handleInteraction = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      
      if (enableAnalytics) {
        trackRSSAnalytics('featured_insight_interaction', { id: 'featured-insight' }, {
          theme,
          action: 'first_interaction'
        });
      }
    }
  }, [enableAnalytics, theme, hasInteracted]);

  // Handle view all click
  const handleViewAll = useCallback(() => {
    if (enableAnalytics) {
      trackRSSAnalytics('featured_insight_view_all', { id: 'featured-insight' }, {
        theme,
        action: 'view_all_click'
      });
    }
  }, [enableAnalytics, theme]);

  // Theme variants
  const themeVariants = {
    blue: {
      background: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      title: 'text-gray-900',
      subtitle: 'text-gray-600',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonOutline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      accent: 'text-blue-600'
    },
    green: {
      background: 'bg-gradient-to-br from-green-50 to-emerald-50',
      title: 'text-gray-900',
      subtitle: 'text-gray-600',
      button: 'bg-green-600 hover:bg-green-700 text-white',
      buttonOutline: 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white',
      accent: 'text-green-600'
    },
    purple: {
      background: 'bg-gradient-to-br from-purple-50 to-violet-50',
      title: 'text-gray-900',
      subtitle: 'text-gray-600',
      button: 'bg-purple-600 hover:bg-purple-700 text-white',
      buttonOutline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white',
      accent: 'text-purple-600'
    },
    gray: {
      background: 'bg-gradient-to-br from-gray-50 to-slate-50',
      title: 'text-gray-900',
      subtitle: 'text-gray-600',
      button: 'bg-gray-600 hover:bg-gray-700 text-white',
      buttonOutline: 'border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white',
      accent: 'text-gray-600'
    }
  };

  const currentTheme = themeVariants[theme] || themeVariants.blue;

  return (
    <section 
      id="featured-insight-container"
      className={`py-16 ${showBackground ? currentTheme.background : ''} ${className}`}
      onMouseEnter={handleInteraction}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div 
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${animationDelay}s` }}
        >
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${currentTheme.title}`}>
            {title}
          </h2>
          <p className={`text-lg lg:text-xl max-w-3xl mx-auto ${currentTheme.subtitle}`}>
            {subtitle}
          </p>
        </div>
        
        {/* Featured Article */}
        <div 
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${animationDelay + 0.2}s` }}
        >
          <KCMFeed 
            maxArticles={1} 
            showFeatured={true}
            enableAnalytics={enableAnalytics}
            enablePerformance={enablePerformance}
            cacheKey="featured-insight"
          />
        </div>
        
        {/* CTA Section */}
        <div 
          className={`text-center mt-8 transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${animationDelay + 0.4}s` }}
        >
          <Link
            href="/market-insights"
            onClick={handleViewAll}
            className={`inline-flex items-center ${currentTheme.button} px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105`}
          >
            View All Market Insights
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {/* Additional Info */}
        <div 
          className={`mt-8 text-center transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${animationDelay + 0.6}s` }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Updated daily
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
              </svg>
              Expert verified
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Market trends
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Theme options
export const FeaturedInsightThemes = {
  BLUE: 'blue',
  GREEN: 'green',
  PURPLE: 'purple',
  GRAY: 'gray'
};

// Enhanced featured insight with additional features
export function EnhancedFeaturedInsight(props) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('featured-insight-container');
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        const progress = Math.max(0, Math.min(1, (scrollTop + windowHeight - elementTop) / elementHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      
      <FeaturedInsight {...props} />
    </div>
  );
}

// Compact featured insight for sidebars
export function CompactFeaturedInsight({ 
  className = '',
  title = 'Market Insight',
  maxArticles = 1,
  ...props 
}) {
  return (
    <div className={`bg-white rounded-12px shadow-md p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <KCMFeed 
        maxArticles={maxArticles} 
        showFeatured={false}
        variant="compact"
        {...props}
      />
      <div className="mt-3 text-center">
                 <Link 
           href="/market-insights"
           className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
         >
           View all insights →
         </Link>
      </div>
    </div>
  );
}
