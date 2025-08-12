'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

// Slide up animation
export const SlideUpSection: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = '',
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Fade in animation
export const FadeInSection: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  className = '',
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Bounce animation
export const BounceSection: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = '',
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{
        duration,
        delay,
        type: 'spring',
        stiffness: 100,
        damping: 10,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Slide in from left
export const SlideInLeft: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = '',
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Slide in from right
export const SlideInRight: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = '',
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale in animation
export const ScaleInSection: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = '',
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Rotate in animation
export const RotateInSection: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = '',
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotate: -10 }}
      animate={inView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -10 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger children animation
interface StaggerContainerProps extends AnimationProps {
  staggerDelay?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  staggerDelay = 0.1,
  className = '',
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
      >
        {React.Children.map(children, (child) => (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Parallax scroll effect
interface ParallaxSectionProps extends AnimationProps {
  speed?: number;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  className = '',
}) => {
  return (
    <motion.div
      style={{
        y: useParallax(speed),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Custom hook for parallax effect
function useParallax(speed: number) {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY * speed;
}

// Floating animation for elements
export const FloatingElement: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 2,
  className = '',
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Pulse animation
export const PulseElement: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 1.5,
  className = '',
}) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Typewriter effect
interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
}) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex(0);
      setDisplayText('');
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-current ml-1"
      />
    </span>
  );
};
