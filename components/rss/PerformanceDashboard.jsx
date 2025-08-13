'use client';

import React, { useCallback, useEffect, useState } from 'react';

export default function PerformanceDashboard({ 
  className = '',
  showRealTime = true,
  refreshInterval = 5000
}) {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    cacheHitRate: 0,
    errorRate: 0,
    articleCount: 0,
    lastUpdate: null,
    performanceScore: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer for performance tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('performance-dashboard');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Collect performance metrics
  const collectMetrics = useCallback(() => {
    try {
      // Get RSS performance data from window
      const rssData = window.rssPerformanceData || [];
      
      if (rssData.length > 0) {
        const recentData = rssData.slice(-10); // Last 10 entries
        
        const loadTimes = recentData
          .filter(item => item.metric === 'component_load_time')
          .map(item => item.value);
        
        const avgLoadTime = loadTimes.length > 0 
          ? loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length 
          : 0;
        
        const cacheData = recentData
          .filter(item => item.metric === 'feed_view_cached' || item.metric === 'feed_view_fresh');
        
        const cacheHits = cacheData.filter(item => item.metric === 'feed_view_cached').length;
        const totalRequests = cacheData.length;
        const cacheHitRate = totalRequests > 0 ? (cacheHits / totalRequests) * 100 : 0;
        
        const errors = recentData.filter(item => item.metric === 'feed_error').length;
        const errorRate = totalRequests > 0 ? (errors / totalRequests) * 100 : 0;
        
        // Calculate performance score (0-100)
        let score = 100;
        if (avgLoadTime > 1000) score -= 20; // Penalty for slow loading
        if (avgLoadTime > 2000) score -= 20; // Additional penalty
        if (cacheHitRate < 50) score -= 15; // Penalty for low cache hit rate
        if (errorRate > 10) score -= 25; // Penalty for high error rate
        
        score = Math.max(0, score);
        
        setMetrics({
          loadTime: Math.round(avgLoadTime),
          cacheHitRate: Math.round(cacheHitRate),
          errorRate: Math.round(errorRate),
          articleCount: recentData.length,
          lastUpdate: new Date().toISOString(),
          performanceScore: score
        });
      }
    } catch (error) {
      console.warn('Error collecting performance metrics:', error);
    }
  }, []);

  // Real-time updates
  useEffect(() => {
    if (showRealTime && isVisible) {
      collectMetrics();
      
      const interval = setInterval(collectMetrics, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [showRealTime, isVisible, refreshInterval, collectMetrics]);

  // Performance score color
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Performance score background
  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div 
      id="performance-dashboard"
      className={`bg-white rounded-12px shadow-md p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Performance Dashboard</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-500">Live</span>
        </div>
      </div>

      {/* Performance Score */}
      <div className="mb-6">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreBg(metrics.performanceScore)} mb-3`}>
            <span className={`text-2xl font-bold ${getScoreColor(metrics.performanceScore)}`}>
              {metrics.performanceScore}
            </span>
          </div>
          <p className="text-sm text-gray-600">Performance Score</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{metrics.loadTime}ms</div>
          <div className="text-xs text-gray-500">Avg Load Time</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{metrics.cacheHitRate}%</div>
          <div className="text-xs text-gray-500">Cache Hit Rate</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{metrics.errorRate}%</div>
          <div className="text-xs text-gray-500">Error Rate</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{metrics.articleCount}</div>
          <div className="text-xs text-gray-500">Data Points</div>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Load Time</span>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              metrics.loadTime < 500 ? 'bg-green-500' : 
              metrics.loadTime < 1000 ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-xs text-gray-500">
              {metrics.loadTime < 500 ? 'Excellent' : 
               metrics.loadTime < 1000 ? 'Good' : 'Needs Improvement'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Cache Efficiency</span>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              metrics.cacheHitRate > 70 ? 'bg-green-500' : 
              metrics.cacheHitRate > 40 ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-xs text-gray-500">
              {metrics.cacheHitRate > 70 ? 'Excellent' : 
               metrics.cacheHitRate > 40 ? 'Good' : 'Needs Improvement'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Error Rate</span>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              metrics.errorRate < 5 ? 'bg-green-500' : 
              metrics.errorRate < 15 ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-xs text-gray-500">
              {metrics.errorRate < 5 ? 'Excellent' : 
               metrics.errorRate < 15 ? 'Good' : 'Needs Improvement'}
            </span>
          </div>
        </div>
      </div>

      {/* Last Update */}
      {metrics.lastUpdate && (
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Last updated: {new Date(metrics.lastUpdate).toLocaleTimeString()}
          </p>
        </div>
      )}

      {/* Recommendations */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Recommendations</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          {metrics.loadTime > 1000 && (
            <li>• Consider implementing lazy loading for RSS feeds</li>
          )}
          {metrics.cacheHitRate < 50 && (
            <li>• Increase cache TTL and implement better caching strategies</li>
          )}
          {metrics.errorRate > 10 && (
            <li>• Review error handling and implement retry mechanisms</li>
          )}
          {metrics.performanceScore >= 80 && (
            <li>• Performance is excellent! Keep up the good work</li>
          )}
        </ul>
      </div>
    </div>
  );
}

// Compact performance widget
export function CompactPerformanceWidget({ className = '' }) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const updateScore = () => {
      try {
        const rssData = window.rssPerformanceData || [];
        if (rssData.length > 0) {
          const recentData = rssData.slice(-5);
          const loadTimes = recentData
            .filter(item => item.metric === 'component_load_time')
            .map(item => item.value);
          
          if (loadTimes.length > 0) {
            const avgLoadTime = loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length;
            let newScore = 100;
            if (avgLoadTime > 1000) newScore -= 20;
            if (avgLoadTime > 2000) newScore -= 20;
            setScore(Math.max(0, newScore));
          }
        }
      } catch (error) {
        console.warn('Error updating performance score:', error);
      }
    };

    updateScore();
    const interval = setInterval(updateScore, 10000);
    return () => clearInterval(interval);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Performance</span>
        <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}</span>
      </div>
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              score >= 80 ? 'bg-green-600' : 
              score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
