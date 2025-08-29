'use client';

import Link from 'next/link';
import KCMFeed from './KCMFeed';

interface MarketInsightsWidgetProps {
  className?: string;
  title?: string;
  maxArticles?: number;
}

export default function MarketInsightsWidget({
  className = '',
  title = 'Latest Market Insights',
  maxArticles = 3,
}: MarketInsightsWidgetProps) {
  return (
    <div className={`bg-white rounded-12px shadow-md p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>

      <KCMFeed maxArticles={maxArticles} showFeatured={false} />

      <div className="mt-4 text-center">
        <Link
          href="/market-insights"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
        >
          View All Insights
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
