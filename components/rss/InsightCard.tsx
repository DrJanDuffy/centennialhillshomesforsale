'use client';

import React from 'react';
import Image from 'next/image';
import { formatDate, formatReadTime } from '../../lib/rss-utils';

interface KCMArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  link: string;
  publishedAt: string;
  author: string;
  category: string;
  imageUrl?: string;
  readTime: number;
  tags?: string[];
}

interface InsightCardProps {
  article: KCMArticle;
  variant?: 'default' | 'featured' | 'compact' | 'minimal';
  className?: string;
  onCardClick?: (article: KCMArticle) => void;
  showImage?: boolean;
  showTags?: boolean;
}

export default function InsightCard({
  article,
  variant = 'default',
  className = '',
  onCardClick,
  showImage = true,
  showTags = true,
}: InsightCardProps) {
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(article);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  const cardVariants = {
    default:
      'bg-white rounded-12px shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1',
    featured:
      'bg-white rounded-12px shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2',
    compact:
      'bg-white rounded-12px shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5',
    minimal:
      'bg-transparent border border-gray-200 rounded-8px hover:border-blue-300 transition-colors duration-200',
  };

  const contentVariants = {
    default: 'p-4',
    featured: 'p-6',
    compact: 'p-3',
    minimal: 'p-2',
  };

  const titleVariants = {
    default: 'text-base font-semibold text-gray-900 mb-2 line-clamp-2',
    featured: 'text-xl font-bold text-gray-900 mb-3 line-clamp-2',
    compact: 'text-sm font-semibold text-gray-900 mb-2 line-clamp-2',
    minimal: 'text-sm font-medium text-gray-800 mb-1 line-clamp-1',
  };

  const excerptVariants = {
    default: 'text-sm text-gray-600 mb-3 line-clamp-2',
    featured: 'text-base text-gray-600 mb-4 line-clamp-3',
    compact: 'text-xs text-gray-600 mb-2 line-clamp-2',
    minimal: 'text-xs text-gray-500 mb-2 line-clamp-1',
  };

  return (
    <article
      className={`${cardVariants[variant]} ${className} cursor-pointer`}
      onClick={handleCardClick}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={`Read article: ${article.title}`}
    >
      <div className={contentVariants[variant]}>
        {/* Header */}
        <div className="flex items-center mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {article.category}
          </span>
          <span className="text-gray-500 text-xs ml-2">{formatDate(article.publishedAt)}</span>
          {article.readTime > 0 && (
            <span className="text-gray-500 text-xs ml-2 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              {formatReadTime(article.readTime)}
            </span>
          )}
        </div>

        {/* Image */}
        {showImage && article.imageUrl && (
          <div className="mb-3">
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={400}
              height={200}
              className="w-full h-32 object-cover rounded-lg"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 400px"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Title */}
        <h3 className={titleVariants[variant]}>{article.title}</h3>

        {/* Excerpt */}
        {variant !== 'minimal' && <p className={excerptVariants[variant]}>{article.excerpt}</p>}

        {/* Tags */}
        {showTags && article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={`${article.id}-tag-${index}`}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                +{article.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-3">By {article.author}</span>
            {variant === 'featured' && <span className="text-blue-600 font-medium">KCM Team</span>}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
              Read More
            </span>
            <svg
              className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Attribution for featured articles */}
      {variant === 'featured' && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Originally published on{' '}
            <a
              href="https://www.simplifyingthemarket.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
              onClick={(e) => e.stopPropagation()}
            >
              Simplifying the Market
            </a>
          </p>
        </div>
      )}
    </article>
  );
}

// Card variants for different use cases
export const CardVariants = {
  DEFAULT: 'default',
  FEATURED: 'featured',
  COMPACT: 'compact',
  MINIMAL: 'minimal',
} as const;

// HOC for enhanced card functionality
export function withCardEnhancement(WrappedComponent: React.ComponentType<any>) {
  return function EnhancedCard(props: any) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isClicked, setIsClicked] = React.useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleClick = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
    };

    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={`transition-all duration-200 ${
          isClicked ? 'scale-95' : isHovered ? 'scale-105' : 'scale-100'
        }`}
      >
        <WrappedComponent {...props} isHovered={isHovered} />
      </div>
    );
  };
}
