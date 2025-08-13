'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { animationVariants, transitionConfigs } from '../utils/animationUtils';

interface EnhancedAnimationProps {
  children: React.ReactNode;
  variant?: keyof typeof animationVariants;
  transition?: keyof typeof transitionConfigs;
  delay?: number;
  threshold?: number;
  className?: string;
  dataAnimate?: string;
  onAnimationComplete?: () => void;
}

// Enhanced animation wrapper that fixes visibility issues
export const EnhancedAnimation: React.FC<EnhancedAnimationProps> = ({
  children,
  variant = 'fadeIn',
  transition = 'normal',
  delay = 0,
  threshold = 0.1,
  className = '',
  dataAnimate,
  onAnimationComplete,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: threshold, once: true });

  useEffect(() => {
    // Fix any immediate visibility issues
    if (ref.current) {
      const element = ref.current;
      if (element.style.opacity === '0') {
        element.style.opacity = '1';
      }
      if (element.style.transform && element.style.transform !== 'none') {
        element.style.transform = 'none';
      }
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={animationVariants[variant]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        ...transitionConfigs[transition],
        delay,
      }}
      className={className}
      data-animate={dataAnimate}
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </motion.div>
  );
};

// Stagger animation container for lists
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });

  return (
    <motion.div
      ref={ref}
      variants={animationVariants.staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={transitionConfigs.normal}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          variants={animationVariants.staggerItem}
          transition={{ delay: index * staggerDelay }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Enhanced scroll-triggered animation
interface ScrollAnimationProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  distance?: number;
  delay?: number;
  className?: string;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  direction = 'up',
  distance = 30,
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.1, once: true });

  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: -distance };
      case 'right':
        return { opacity: 0, x: distance };
      case 'scale':
        return { opacity: 0, scale: 0.95 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const getFinalState = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'scale':
        return { opacity: 1, scale: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  useEffect(() => {
    // Fix immediate visibility issues
    if (ref.current) {
      const element = ref.current;
      if (element.style.opacity === '0') {
        element.style.opacity = '1';
      }
      if (element.style.transform && element.style.transform !== 'none') {
        element.style.transform = 'none';
      }
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={isInView ? getFinalState() : getInitialState()}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Enhanced loading state component
interface EnhancedLoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({
  isLoading,
  children,
  fallback,
  className = '',
}) => {
  const defaultFallback = (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading content...</p>
      </div>
    </div>
  );

  if (isLoading) {
    return fallback || defaultFallback;
  }

  return <>{children}</>;
};

// Enhanced image component with lazy loading
interface EnhancedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallback?: string;
}

export const EnhancedImage: React.FC<EnhancedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  fallback = '/images/placeholder-property.jpg',
}) => {
  const [imageSrc, setImageSrc] = React.useState(priority ? src : fallback);
  const [isLoading, setIsLoading] = React.useState(!priority);
  const [hasError, setHasError] = React.useState(false);

  useEffect(() => {
    if (priority) {
      setImageSrc(src);
      setIsLoading(false);
    }
  }, [priority, src]);

  const handleImageLoad = () => {
    if (!priority) {
      setImageSrc(src);
    }
    setIsLoading(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
    setImageSrc(fallback);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full"></div>
        </div>
      )}

      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading={priority ? 'eager' : 'lazy'}
      />

      {hasError && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
              🏠
            </div>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced button component with loading states
interface EnhancedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    accent: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button type={type} className={buttonClasses} onClick={onClick} disabled={disabled || loading}>
      {loading && (
        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
      )}
      {children}
    </button>
  );
};

// Enhanced form field component
interface EnhancedFormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
  error?: string;
  className?: string;
}

export const EnhancedFormField: React.FC<EnhancedFormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value = '',
  onChange,
  options = [],
  required = false,
  error,
  className = '',
}) => {
  const fieldId = `field-${name}`;
  const hasError = !!error;

  const baseInputClasses =
    'w-full px-3 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500';
  const inputClasses = `${baseInputClasses} ${
    hasError
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500'
  }`;

  const renderField = () => {
    switch (type) {
      case 'select':
        return (
          <select
            id={fieldId}
            name={name}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={inputClasses}
            required={required}
          >
            <option value="">{placeholder || 'Select an option'}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            id={fieldId}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={`${inputClasses} resize-vertical min-h-[100px]`}
            required={required}
          />
        );

      default:
        return (
          <input
            id={fieldId}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={inputClasses}
            required={required}
          />
        );
    }
  };

  return (
    <div className={`form-field ${className}`}>
      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {renderField()}

      {hasError && <p className="mt-1 text-sm text-red-600 animate-fade-in">{error}</p>}
    </div>
  );
};

// Export all components
export default {
  EnhancedAnimation,
  StaggerContainer,
  ScrollAnimation,
  EnhancedLoading,
  EnhancedImage,
  EnhancedButton,
  EnhancedFormField,
};
