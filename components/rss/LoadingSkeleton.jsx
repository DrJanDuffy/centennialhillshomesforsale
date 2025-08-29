'use client';

export default function LoadingSkeleton({ type = 'card', count = 3, className = '' }) {
  const renderSkeleton = () => {
    switch (type) {
      case 'featured':
        return <FeaturedSkeleton />;
      case 'compact':
        return <CompactSkeleton />;
      case 'list':
        return <ListSkeleton count={count} />;
      default:
        return <CardSkeleton count={count} />;
    }
  };

  return <div className={`animate-pulse ${className}`}>{renderSkeleton()}</div>;
}

function FeaturedSkeleton() {
  return (
    <div className="bg-white rounded-12px shadow-lg overflow-hidden">
      <div className="md:flex">
        {/* Image skeleton */}
        <div className="md:w-1/3">
          <div className="w-full h-48 md:h-full bg-gray-200"></div>
        </div>

        {/* Content skeleton */}
        <div className="p-6 md:w-2/3">
          <div className="flex items-center mb-3">
            <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
            <div className="w-24 h-4 bg-gray-200 rounded ml-3"></div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="w-full h-6 bg-gray-200 rounded"></div>
            <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
            <div className="w-4/6 h-4 bg-gray-200 rounded"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardSkeleton({ count }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-white rounded-12px shadow-md p-4">
          <div className="flex items-center mb-2">
            <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-20 h-4 bg-gray-200 rounded ml-2"></div>
          </div>

          <div className="space-y-2 mb-3">
            <div className="w-full h-5 bg-gray-200 rounded"></div>
            <div className="w-4/5 h-5 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-1 mb-3">
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-3 bg-gray-200 rounded"></div>
              <div className="w-12 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="w-20 h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CompactSkeleton({ count }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-white rounded-12px shadow-sm p-3">
          <div className="flex items-center mb-2">
            <div className="w-12 h-4 bg-gray-200 rounded-full"></div>
            <div className="w-16 h-3 bg-gray-200 rounded ml-2"></div>
          </div>

          <div className="space-y-1 mb-2">
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-3 bg-gray-200 rounded"></div>
              <div className="w-8 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ListSkeleton({ count }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex items-center space-x-3 p-2">
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
            <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
          </div>
          <div className="w-16 h-6 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

// Pulse animation variants
export const skeletonVariants = {
  pulse: 'animate-pulse',
  shimmer: 'animate-shimmer',
  bounce: 'animate-bounce',
};

// Skeleton wrapper with custom styling
export function SkeletonWrapper({ children, className = '', variant = 'pulse' }) {
  return <div className={`${skeletonVariants[variant]} ${className}`}>{children}</div>;
}
