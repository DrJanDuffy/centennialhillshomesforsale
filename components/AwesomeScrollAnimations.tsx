
'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'bounce' | 'zoom';
  delay?: number;
  duration?: number;
  threshold?: number;
}

export const AwesomeScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 800,
  threshold = 0.1
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, threshold]);

  const getAnimationStyle = () => {
    const baseStyle: React.CSSProperties = {
      transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      transitionDelay: `${delay}ms`
    };

    if (!isVisible) {
      switch (animation) {
        case 'fadeIn':
          return { ...baseStyle, opacity: 0 };
        case 'slideUp':
          return { ...baseStyle, opacity: 0, transform: 'translateY(50px)' };
        case 'slideLeft':
          return { ...baseStyle, opacity: 0, transform: 'translateX(-50px)' };
        case 'slideRight':
          return { ...baseStyle, opacity: 0, transform: 'translateX(50px)' };
        case 'bounce':
          return { ...baseStyle, opacity: 0, transform: 'scale(0.8) translateY(30px)' };
        case 'zoom':
          return { ...baseStyle, opacity: 0, transform: 'scale(0.9)' };
        default:
          return { ...baseStyle, opacity: 0 };
      }
    }

    return {
      ...baseStyle,
      opacity: 1,
      transform: 'translateX(0) translateY(0) scale(1)'
    };
  };

  return (
    <div ref={elementRef} style={getAnimationStyle()}>
      {children}
    </div>
  );
};

// Preset animation components for common use cases
export const FadeInSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <AwesomeScrollAnimation animation="fadeIn" delay={delay}>
    {children}
  </AwesomeScrollAnimation>
);

export const SlideUpSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <AwesomeScrollAnimation animation="slideUp" delay={delay}>
    {children}
  </AwesomeScrollAnimation>
);

export const BounceSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <AwesomeScrollAnimation animation="bounce" delay={delay} duration={1000}>
    {children}
  </AwesomeScrollAnimation>
);

// Staggered animations for lists
export const StaggeredList: React.FC<{ 
  children: React.ReactElement[]; 
  staggerDelay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight';
}> = ({ children, staggerDelay = 100, animation = 'slideUp' }) => (
  <>
    {children.map((child, index) => (
      <AwesomeScrollAnimation
        key={index}
        animation={animation}
        delay={index * staggerDelay}
      >
        {child}
      </AwesomeScrollAnimation>
    ))}
  </>
);

export default AwesomeScrollAnimation;
