'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { cacheRSSData, getCachedRSSData, trackRSSAnalytics, trackRSSPerformance } from '../../lib/rss-utils';
import InsightCard from './InsightCard';
import LoadingSkeleton from './LoadingSkeleton';

export default function KCMFeed({ 
  maxArticles = 5, 
  showFeatured = false, 
  className = '',
  variant = 'default',
  showImage = true,
  showTags = true,
  enableAnalytics = true,
  enablePerformance = true,
  cacheKey = 'kcm-feed'
}) {
  const [feedData, setFeedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Performance tracking
  useEffect(() => {
    if (enablePerformance) {
      const startTime = performance.now();
      
      return () => {
        const loadTime = performance.now() - startTime;
        trackRSSPerformance('component_load_time', loadTime, {
          component: 'KCMFeed',
          variant,
          maxArticles
        });
      };
    }
  }, [enablePerformance, variant, maxArticles]);

  // Fetch feed data with caching
  const fetchFeed = useCallback(async (useCache = true) => {
    try {
      setLoading(true);
      setError(null);

      // Try to get cached data first
      if (useCache) {
        const cached = getCachedRSSData(cacheKey);
        if (cached) {
          setFeedData(cached);
          setLoading(false);
          setLastUpdated(new Date().toISOString());
          
          if (enableAnalytics) {
            trackRSSAnalytics('feed_view_cached', { id: 'kcm-feed' }, {
              source: 'cache',
              variant,
              maxArticles
            });
          }
          return;
        }
      }

      // Fetch fresh data
      const startTime = performance.now();
      const response = await fetch('/api/rss-feed');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch market insights: ${response.status}`);
      }
      
      const data = await response.json();
      const loadTime = performance.now() - startTime;

      // Validate data
      if (!data || !data.articles || !Array.isArray(data.articles)) {
        throw new Error('Invalid feed data structure');
      }

      // Cache the data
      cacheRSSData(cacheKey, data, 3600000); // 1 hour TTL

      setFeedData(data);
      setLastUpdated(new Date().toISOString());
      setRetryCount(0);

      // Performance tracking
      if (enablePerformance) {
        trackRSSPerformance('feed_fetch_time', loadTime, {
          component: 'KCMFeed',
          variant,
          articleCount: data.articles.length
        });
      }

      // Analytics tracking
      if (enableAnalytics) {
        trackRSSAnalytics('feed_view_fresh', { id: 'kcm-feed' }, {
          source: 'api',
          variant,
          maxArticles,
          articleCount: data.articles.length
        });
      }

    } catch (err) {
      console.error('Error fetching KCM feed:', err);
      setError(err.message || 'Failed to load market insights');
      
      // Analytics tracking for errors
      if (enableAnalytics) {
        trackRSSAnalytics('feed_error', { id: 'kcm-feed' }, {
          error: err.message,
          variant,
          retryCount
        });
      }
    } finally {
      setLoading(false);
    }
  }, [cacheKey, enableAnalytics, enablePerformance, variant, maxArticles, retryCount]);

  // Initial fetch
  useEffect(() => {
    fetchFeed(true);
  }, [fetchFeed]);

  // Handle retry
  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    fetchFeed(false);
  }, [fetchFeed]);

  // Handle card click
  const handleCardClick = useCallback((article) => {
    if (enableAnalytics) {
      trackRSSAnalytics('article_click', article, {
        variant,
        position: feedData?.articles?.indexOf(article) || 0
      });
    }
    
    // Open article in new tab
    window.open(article.link, '_blank', 'noopener,noreferrer');
  }, [enableAnalytics, variant, feedData]);

  // Memoized articles
  const articles = useMemo(() => {
    if (!feedData?.articles) return [];
    return feedData.articles.slice(0, maxArticles);
  }, [feedData, maxArticles]);

  const featuredArticle = useMemo(() => {
    return showFeatured ? articles[0] : null;
  }, [showFeatured, articles]);

  const remainingArticles = useMemo(() => {
    return showFeatured ? articles.slice(1) : articles;
  }, [showFeatured, articles]);

  // Loading state
  if (loading) {
    return (
      <div className={className}>
        <LoadingSkeleton 
          type={showFeatured ? 'featured' : variant === 'compact' ? 'compact' : 'card'} 
          count={maxArticles} 
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-12px p-6 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Unable to Load Market Insights
          </h3>
          
          <p className="text-red-700 mb-4 max-w-md mx-auto">
            {error}. Please try again or check back later.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              type="button"
              onClick={handleRetry}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Try Again
            </button>
            
            <button 
              type="button"
              onClick={() => window.location.reload()}
              className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Refresh Page
            </button>
          </div>
          
          {retryCount > 0 && (
            <p className="text-sm text-red-600 mt-3">
              Retry attempt: {retryCount}
            </p>
          )}
        </div>
      </div>
    );
  }

  // No data state
  if (!feedData || !articles.length) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-12px p-6 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No Market Insights Available
          </h3>
          
          <p className="text-gray-600 mb-4">
            Check back later for the latest real estate market updates and insights.
          </p>
          
          <button 
            type="button"
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Featured Article */}
      {showFeatured && featuredArticle && (
        <div className="mb-8">
          <InsightCard 
            article={featuredArticle}
            variant="featured"
            onCardClick={handleCardClick}
            showImage={showImage}
            showTags={showTags}
          />
        </div>
      )}

      {/* Article List */}
      <div className="space-y-4">
        {remainingArticles.map((article) => (
          <InsightCard 
            key={article.id}
            article={article}
            variant={variant}
            onCardClick={handleCardClick}
            showImage={showImage}
            showTags={showTags}
          />
        ))}
      </div>

      {/* Attribution and Status */}
      <div className="mt-6 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-500">
          <p>
            Market insights provided by{' '}
            <a 
              href="https://www.simplifyingthemarket.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Keeping Current Matters
            </a>
          </p>
          
          {lastUpdated && (
            <p className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Updated {new Date(lastUpdated).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Export component variants
export const FeedVariants = {
  DEFAULT: 'default',
  COMPACT: 'compact',
  MINIMAL: 'minimal'
};

// HOC for enhanced feed functionality
export function withFeedEnhancement(WrappedComponent) {
  return function EnhancedFeed(props) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      const element = document.getElementById('rss-feed-container');
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    }, [isVisible]);

    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    return (
      <div id="rss-feed-container" onMouseEnter={handleInteraction}>
        <WrappedComponent {...props} isVisible={isVisible} hasInteracted={hasInteracted} />
      </div>
    );
  };
}
