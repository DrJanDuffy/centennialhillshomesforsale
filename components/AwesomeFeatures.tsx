import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useMemo } from 'react';
import { FaLightbulb, FaMagic, FaRocket } from 'react-icons/fa';

const AwesomeFeatures: React.FC = () => {
  const features = useMemo(
    () => [
      {
        id: 'performance',
        title: 'Lightning Fast Performance',
        description: 'Optimized for Core Web Vitals with advanced caching and lazy loading',
        icon: FaRocket,
        color: 'from-red-500 to-orange-500',
        highlights: ['< 2.5s LCP', '< 100ms FID', '< 0.1 CLS'],
        link: '/services',
      },
      {
        id: 'ai-powered',
        title: 'AI-Powered Intelligence',
        description: 'Smart property recommendations with machine learning',
        icon: FaLightbulb,
        color: 'from-blue-500 to-cyan-500',
        highlights: ['Voice Search', 'Smart Recommendations', 'AI Chat', 'Predictive Analytics'],
        link: '/services',
      },
      {
        id: 'awesome-ux',
        title: 'Awesome User Experience',
        description: 'Smooth animations, PWA support, and responsive design',
        icon: FaMagic,
        color: 'from-purple-500 to-pink-500',
        highlights: ['PWA Install', 'Offline Support', 'Push Notifications'],
        link: '/services',
      },
    ],
    []
  );

  const stats = [
    { number: '15+', label: 'Years Experience', icon: '🏆' },
    { number: '500+', label: 'Happy Families', icon: '❤️' },
    { number: 'A+', label: 'Schools Nearby', icon: '🎓' },
    { number: '5★', label: 'Client Reviews', icon: '⭐' },
  ];

  // Set CSS custom properties for animation delays
  useEffect(() => {
    features.forEach((_feature, index) => {
      const element = document.querySelector(
        `.awesome-card:nth-child(${index + 1}) .animate-delay-dynamic`
      ) as HTMLElement;
      if (element) {
        element.style.setProperty('--animation-delay', `${index * 0.2}s`);
      }
    });
  }, [features]);

  return (
    <div className="awesome-features-section">
      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="awesome-card glass-effect"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{
              scale: 1.05,
              rotate: index % 2 === 0 ? -2 : 2,
              transition: { duration: 0.3 },
            }}
          >
            <div className="text-6xl mb-6 bounce-animation animate-delay-dynamic">
              {React.createElement(feature.icon, { className: 'w-16 h-16' })}
            </div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">{feature.title}</h3>
            <p className="awesome-text mb-6">{feature.description}</p>
            <Link href={feature.link} className="awesome-btn">
              Learn More 🚀
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        className="awesome-card glass-effect neon-glow"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-8 gradient-text text-center">
          🎯 Why Choose Centennial Hills?
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-4xl mb-2 pulse-animation">{stat.icon}</div>
              <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="awesome-text font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        .awesome-features-section {
          padding: 4rem 0;
        }
      `}</style>
    </div>
  );
};

export default AwesomeFeatures;
