'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { KCMArticle, RSSFeedData } from '../lib/rss-parser';

interface KCMFeedProps {
  maxArticles?: number;
  showFeatured?: boolean;
  className?: string;
}

export default function KCMFeed({ 
  maxArticles = 5, 
  showFeatured = false, 
  className = '' 
}: KCMFeedProps) {
  const [feedData, setFeedData] = useState<RSSFeedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/rss-feed');
        if (!response.ok) {
          throw new Error('Failed to fetch market insights');
        }
        
        const data: RSSFeedData = await response.json();
        setFeedData(data);
      } catch (err) {
        console.error('Error fetching KCM feed:', err);
        setError(err instanceof Error ? err.message : 'Failed to load market insights');
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) {
    return (
              <div className={`animate-pulse ${className}`}>
          <div className="space-y-4">
            {Array.from({ length: maxArticles }, (_, i) => (
              <div key={`skeleton-${i}`} className="bg-gray-200 rounded-12px h-32"></div>
            ))}
          </div>
        </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-12px p-4 ${className}`}>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-red-800 text-sm">
            {error}.             <button 
              type="button"
              onClick={() => window.location.reload()} 
              className="underline hover:no-underline"
            >
              Try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  if (!feedData || !feedData.articles.length) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-12px p-4 ${className}`}>
        <p className="text-gray-600 text-sm text-center">No market insights available at the moment.</p>
      </div>
    );
  }

  const articles = feedData.articles.slice(0, maxArticles);
  const featuredArticle = showFeatured ? articles[0] : null;
  const remainingArticles = showFeatured ? articles.slice(1) : articles;

  return (
    <div className={className}>
      {/* Featured Article */}
      {showFeatured && featuredArticle && (
        <div className="mb-8">
          <FeaturedArticleCard article={featuredArticle} />
        </div>
      )}

      {/* Article List */}
      <div className="space-y-4">
        {remainingArticles.map((article) => (
          <ArticleCard key={article.id} article={article} compact={!showFeatured} />
        ))}
      </div>

      {/* Attribution */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
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
      </div>
    </div>
  );
}

// Featured Article Card Component
function FeaturedArticleCard({ article }: { article: KCMArticle }) {
  return (
    <div className="bg-white rounded-12px shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="md:flex">
        {article.imageUrl && (
          <div className="md:w-1/3">
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={400}
              height={300}
              className="w-full h-48 md:h-full object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}
        <div className="p-6 md:w-2/3">
          <div className="flex items-center mb-3">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {article.category}
            </span>
            <span className="text-gray-500 text-sm ml-3">
              {formatDate(article.publishedAt)}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-4">By {article.author}</span>
              <span>{article.readTime} min read</span>
            </div>
            
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Read Full Article
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact Article Card Component
function ArticleCard({ article, compact = false }: { article: KCMArticle; compact?: boolean }) {
  return (
    <div className="bg-white rounded-12px shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
            {article.category}
          </span>
          <span className="text-gray-500 text-xs ml-2">
            {formatDate(article.publishedAt)}
          </span>
        </div>
        
        <h4 className={`font-semibold text-gray-900 mb-2 ${compact ? 'text-sm' : 'text-base'} line-clamp-2`}>
          {article.title}
        </h4>
        
        {!compact && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {article.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-3">By {article.author}</span>
            <span>{article.readTime} min</span>
          </div>
          
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium underline hover:no-underline"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
}

// Utility function to format dates
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  } catch {
    return 'Recent';
  }
}
