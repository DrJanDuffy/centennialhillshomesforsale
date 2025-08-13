'use client';

import Link from 'next/link';
import KCMFeed from './KCMFeed';

interface FeaturedMarketInsightProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function FeaturedMarketInsight({ 
  className = '',
  title = 'Latest Market Insight',
  subtitle = 'Stay informed with expert analysis from Keeping Current Matters'
}: FeaturedMarketInsightProps) {
  return (
    <section className={`py-16 bg-gradient-to-r from-blue-50 to-indigo-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <KCMFeed maxArticles={1} showFeatured={true} />
        </div>
        
        <div className="text-center mt-8">
          <Link
            href="/market-insights"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            View All Market Insights
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
