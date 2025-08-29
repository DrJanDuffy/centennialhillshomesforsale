'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { trackRSSAnalytics, trackRSSPerformance } from '../../lib/rss-utils';
import KCMFeed from './KCMFeed';

export default function MarketInsightsWidget({
  className = '',
  title = 'Latest Market Insights',
  subtitle = 'Stay informed with expert real estate analysis',
  maxArticles = 3,
  variant = 'default',
  showRefreshButton = true,
  enableAnalytics = true,
  enablePerformance = true,
  theme = 'light',
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [interactionCount, setInteractionCount] = useState(0);

  // Performance tracking
  useEffect(() => {
    if (enablePerformance) {
      const startTime = performance.now();

      return () => {
        const loadTime = performance.now() - startTime;
        trackRSSPerformance('widget_load_time', loadTime, {
          component: 'MarketInsightsWidget',
          variant,
          maxArticles,
          theme,
        });
      };
    }
  }, [enablePerformance, variant, maxArticles, theme]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setLastRefresh(new Date().toISOString());
    setInteractionCount((prev) => prev + 1);

    if (enableAnalytics) {
      trackRSSAnalytics(
        'widget_refresh',
        { id: 'market-insights-widget' },
        {
          variant,
          maxArticles,
          theme,
          interactionCount: interactionCount + 1,
        }
      );
    }
  }, [enableAnalytics, variant, maxArticles, theme, interactionCount]);

  // Handle expand/collapse
  const handleToggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);

    if (enableAnalytics) {
      trackRSSAnalytics(
        'widget_toggle',
        { id: 'market-insights-widget' },
        {
          action: isExpanded ? 'collapse' : 'expand',
          variant,
          maxArticles,
          theme,
        }
      );
    }
  }, [enableAnalytics, isExpanded, variant, maxArticles, theme]);

  // Handle view all click
  const handleViewAll = useCallback(() => {
    if (enableAnalytics) {
      trackRSSAnalytics(
        'widget_view_all',
        { id: 'market-insights-widget' },
        {
          variant,
          maxArticles,
          theme,
        }
      );
    }
  }, [enableAnalytics, variant, maxArticles, theme]);

  // Theme variants
  const themeVariants = {
    light: {
      container: 'bg-white border border-gray-200',
      header: 'text-gray-900',
      subtitle: 'text-gray-600',
      icon: 'bg-blue-100 text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonOutline: 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    },
    dark: {
      container: 'bg-gray-800 border border-gray-700',
      header: 'text-white',
      subtitle: 'text-gray-300',
      icon: 'bg-blue-900 text-blue-300',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonOutline: 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900',
    },
    gradient: {
      container: 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200',
      header: 'text-gray-900',
      subtitle: 'text-gray-700',
      icon: 'bg-blue-500 text-white',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonOutline: 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    },
  };

  const currentTheme = themeVariants[theme] || themeVariants.light;

  return (
    <div className={`rounded-12px shadow-md p-6 ${currentTheme.container} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${currentTheme.icon}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${currentTheme.header}`}>{title}</h3>
            {subtitle && <p className={`text-sm ${currentTheme.subtitle}`}>{subtitle}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {showRefreshButton && (
            <button
              type="button"
              onClick={handleRefresh}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              title="Refresh insights"
              aria-label="Refresh market insights"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleExpand}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            title={isExpanded ? 'Collapse' : 'Expand'}
            aria-label={isExpanded ? 'Collapse widget' : 'Expand widget'}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Last Updated */}
      {lastRefresh && (
        <div className="text-xs text-gray-500 mb-3 text-center">
          Last updated: {new Date(lastRefresh).toLocaleTimeString()}
        </div>
      )}

      {/* Content */}
      <div
        className={`transition-all duration-300 ${isExpanded ? 'max-h-none' : 'max-h-96 overflow-hidden'}`}
      >
        <KCMFeed
          maxArticles={maxArticles}
          showFeatured={false}
          variant={variant}
          enableAnalytics={enableAnalytics}
          enablePerformance={enablePerformance}
          cacheKey="market-insights-widget"
        />
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* View All Link */}
          <Link
            href="/market-insights"
            onClick={handleViewAll}
            className={`inline-flex items-center ${currentTheme.buttonOutline} px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm`}
          >
            View All Insights
            <svg
              className="w-4 h-4 ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          {/* Status Indicators */}
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Live Feed
            </span>
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              {maxArticles} articles
            </span>
          </div>
        </div>
      </div>

      {/* Expand/Collapse Indicator */}
      {!isExpanded && (
        <div className="mt-2 text-center">
          <button
            type="button"
            onClick={handleToggleExpand}
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            Show more insights
          </button>
        </div>
      )}
    </div>
  );
}

// Widget variants
export const WidgetVariants = {
  DEFAULT: 'default',
  COMPACT: 'compact',
  MINIMAL: 'minimal',
};

// Theme options
export const WidgetThemes = {
  LIGHT: 'light',
  DARK: 'dark',
  GRADIENT: 'gradient',
};

// Enhanced widget with additional features
export function EnhancedMarketInsightsWidget(props) {
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

    const element = document.getElementById('enhanced-market-insights-widget');
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
    <div
      id="enhanced-market-insights-widget"
      onMouseEnter={handleInteraction}
      className="transition-all duration-500"
    >
      <MarketInsightsWidget {...props} isVisible={isVisible} hasInteracted={hasInteracted} />
    </div>
  );
}
