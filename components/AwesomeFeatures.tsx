
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AwesomeFeatures: React.FC = () => {
  const features = [
    {
      icon: '🏘️',
      title: 'Premium Locations',
      description: 'Explore stunning homes in Providence, Skye Canyon, and other premier neighborhoods with resort-style amenities!',
      link: '/neighborhoods',
      gradient: 'from-purple-400 to-pink-400'
    },
    {
      icon: '⭐',
      title: 'Expert Service',
      description: 'Professional real estate guidance from local market experts who know Centennial Hills inside and out!',
      link: '/about',
      gradient: 'from-blue-400 to-purple-400'
    },
    {
      icon: '📊',
      title: 'Market Insights',
      description: 'Stay informed with the latest market trends and property values in real-time!',
      link: '/market-update',
      gradient: 'from-green-400 to-blue-400'
    }
  ];

  const stats = [
    { number: '15+', label: 'Years Experience', icon: '🏆' },
    { number: '500+', label: 'Happy Families', icon: '❤️' },
    { number: 'A+', label: 'Schools Nearby', icon: '🎓' },
    { number: '5★', label: 'Client Reviews', icon: '⭐' }
  ];

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
              transition: { duration: 0.3 }
            }}
          >
            <div className="text-6xl mb-6 bounce-animation" style={{ animationDelay: `${index * 0.2}s` }}>
              {feature.icon}
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
              <div className="text-4xl mb-2 pulse-animation">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="awesome-text font-semibold">
                {stat.label}
              </div>
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
