'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaMagic,
  FaRocket,
  FaSearch,
  FaStar,
} from 'react-icons/fa';

interface AwesomeStats {
  homesSold: number;
  avgSalePrice: string;
  daysOnMarket: number;
  clientSatisfaction: number;
}

function AwesomeEnhancements() {
  const [stats, setStats] = useState<AwesomeStats>({
    homesSold: 0,
    avgSalePrice: '$0',
    daysOnMarket: 0,
    clientSatisfaction: 0,
  });

  // Mock performance metrics (replace with actual metrics)
  const performanceMetrics = useState(() => ({
    lcp: Math.random() * 2 + 1, // Example LCP between 1-3 seconds
    fid: Math.random() * 80 + 20, // Example FID between 20-100 ms
    cls: Math.random() * 0.05, // Example CLS under 0.05
  }))[0];

  // Awesome animated counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateStats();
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('awesome-stats');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [animateStats]);

  const animateStats = () => {
    // Animate homes sold
    let homesSoldCount = 0;
    const homesSoldInterval = setInterval(() => {
      homesSoldCount += 15;
      if (homesSoldCount >= 850) {
        homesSoldCount = 850;
        clearInterval(homesSoldInterval);
      }
      setStats((prev) => ({ ...prev, homesSold: homesSoldCount }));
    }, 20);

    // Animate average sale price
    let priceCount = 0;
    const priceInterval = setInterval(() => {
      priceCount += 25000;
      if (priceCount >= 725000) {
        priceCount = 725000;
        clearInterval(priceInterval);
      }
      setStats((prev) => ({
        ...prev,
        avgSalePrice: `$${(priceCount / 1000).toFixed(0)}K`,
      }));
    }, 30);

    // Animate days on market
    let daysCount = 0;
    const daysInterval = setInterval(() => {
      daysCount += 1;
      if (daysCount >= 18) {
        daysCount = 18;
        clearInterval(daysInterval);
      }
      setStats((prev) => ({ ...prev, daysOnMarket: daysCount }));
    }, 50);

    // Animate client satisfaction
    let satisfactionCount = 0;
    const satisfactionInterval = setInterval(() => {
      satisfactionCount += 1;
      if (satisfactionCount >= 98) {
        satisfactionCount = 98;
        clearInterval(satisfactionInterval);
      }
      setStats((prev) => ({ ...prev, clientSatisfaction: satisfactionCount }));
    }, 40);
  };

  const awesomeFeatures = useState(() => [
    {
      id: 'performance',
      title: 'Lightning Fast Performance',
      description: 'Optimized for Core Web Vitals with advanced caching and lazy loading',
      icon: FaRocket,
      color: '#FF6B6B',
      metrics: performanceMetrics,
      highlights: ['< 2.5s LCP', '< 100ms FID', '< 0.1 CLS'],
    },
    {
      id: 'ai-powered',
      title: 'AI-Powered Intelligence',
      description: 'Smart property recommendations with machine learning',
      icon: FaLightbulb,
      color: '#4ECDC4',
      features: ['Voice Search', 'Smart Recommendations', 'AI Chat', 'Predictive Analytics'],
    },
    {
      id: 'awesome-ux',
      title: 'Awesome User Experience',
      description: 'Smooth animations, PWA support, and responsive design',
      icon: FaMagic,
      color: '#FFE066',
      animations: true,
      features: ['PWA Install', 'Offline Support', 'Push Notifications'],
    },
  ])[0];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Awesome Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Awesome Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
              <FaRocket className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Absolutely Awesome Real Estate Experience
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of real estate with Dr. Jan Duffy&apos;s innovative approach,
            combining decades of expertise with cutting-edge technology for unparalleled results.
          </p>
        </motion.div>

        {/* Awesome Stats */}
        <motion.div
          id="awesome-stats"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl font-bold text-purple-600 mb-2"
            >
              {stats.homesSold}+
            </motion.div>
            <div className="text-gray-600 font-medium">Homes Sold</div>
            <FaRocket className="w-8 h-8 text-purple-500 mx-auto mt-2" />
          </div>

          <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="text-4xl font-bold text-blue-600 mb-2"
            >
              {stats.avgSalePrice}
            </motion.div>
            <div className="text-gray-600 font-medium">Avg Sale Price</div>
            <FaSearch className="w-8 h-8 text-blue-500 mx-auto mt-2" />
          </div>

          <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="text-4xl font-bold text-green-600 mb-2"
            >
              {stats.daysOnMarket}
            </motion.div>
            <div className="text-gray-600 font-medium">Avg Days on Market</div>
            <FaExclamationTriangle className="w-8 h-8 text-green-500 mx-auto mt-2" />
          </div>

          <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              className="text-4xl font-bold text-orange-600 mb-2"
            >
              {stats.clientSatisfaction}%
            </motion.div>
            <div className="text-gray-600 font-medium">Client Satisfaction</div>
            <FaStar className="w-8 h-8 text-orange-500 mx-auto mt-2" />
          </div>
        </motion.div>

        {/* Awesome Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {awesomeFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 h-full hover:shadow-2xl transition-all duration-300">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>

                {/* Awesome hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Awesome CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 p-12 rounded-3xl text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-6"
            >
              <FaCheckCircle className="w-16 h-16 text-yellow-300" />
            </motion.div>

            <h3 className="text-4xl font-bold mb-6">
              Ready for an Awesome Real Estate Experience?
            </h3>

            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who&apos;ve experienced the difference of working
              with Las Vegas&apos; most innovative real estate professional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="tel:702-903-1952"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-3"
              >
                <FaRocket className="w-5 h-5" />
                Call (702) 903-1952
              </motion.a>

              <motion.a
                href="mailto:jan@centennialhillshomes.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-3"
              >
                <FaSearch className="w-5 h-5" />
                Email Jan
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AwesomeEnhancements;
