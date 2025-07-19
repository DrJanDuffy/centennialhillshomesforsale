import React from 'react';

interface AwesomeLoaderProps {
  isLoading?: boolean;
  message?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'property' | 'search';
}

const AwesomeLoader: React.FC<AwesomeLoaderProps> = ({
  isLoading = true,
  message = 'Loading...',
  size = 'medium',
  variant = 'default'
}) => {
  if (!isLoading) return null;

  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12', 
    large: 'h-16 w-16'
  };

  const containerClasses = {
    small: 'p-4',
    medium: 'p-8',
    large: 'p-12'
  };

  const getVariantContent = () => {
    switch (variant) {
      case 'property':
        return {
          icon: '🏠',
          defaultMessage: 'Searching properties...'
        };
      case 'search':
        return {
          icon: '🔍',
          defaultMessage: 'Searching...'
        };
      default:
        return {
          icon: '⚡',
          defaultMessage: 'Loading...'
        };
    }
  };

  const variantContent = getVariantContent();
  const displayMessage = message || variantContent.defaultMessage;

  return (
    <div className={`flex flex-col items-center justify-center ${containerClasses[size]}`}>
      {/* Animated Spinner */}
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`}></div>

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg">{variantContent.icon}</span>
        </div>
      </div>

      {/* Loading Message */}
      <p className="mt-4 text-gray-600 dark:text-gray-300 text-center font-medium">
        {displayMessage}
      </p>

      {/* Animated Dots */}
      <div className="flex space-x-1 mt-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animate-delay-1"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animate-delay-2"></div>
      </div>
    </div>
  );
};

export default AwesomeLoader;