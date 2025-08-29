// components/HyperLocalHero.jsx
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export default function HyperLocalHero() {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [localizedContent, setLocalizedContent] = useState([]);
  const [localStats, setLocalStats] = useState(null);

  // Localization mapping for Centennial Hills
  const localizeContent = useCallback((kcmArticle) => {
    const localizations = {
      // National to Local keyword mapping
      'housing market': 'Centennial Hills real estate market',
      'home prices': 'Centennial Hills home values',
      'mortgage rates': 'Las Vegas mortgage rates',
      inventory: 'Northwest Las Vegas inventory',
      buyers: 'Centennial Hills homebuyers',
      sellers: 'Providence and Skye Canyon sellers',
      'interest rates': 'Nevada VA and conventional loan rates',
      'home sales': 'Centennial Hills property sales',
      'real estate': 'Las Vegas luxury real estate',
      housing: 'master-planned community homes',
      nationwide: 'throughout Centennial Hills',
      'across the country': 'in Northwest Las Vegas',
      national: 'Las Vegas metropolitan',
      Americans: 'Las Vegas residents',
    };

    let localizedTitle = kcmArticle.title;
    let localizedExcerpt = kcmArticle.excerpt;

    // Replace national terms with local ones
    Object.entries(localizations).forEach(([national, local]) => {
      const regex = new RegExp(national, 'gi');
      localizedTitle = localizedTitle.replace(regex, local);
      localizedExcerpt = localizedExcerpt.replace(regex, local);
    });

    // Add local context to national trends
    const localContexts = [
      `This trend is particularly strong in Providence, where ${generateLocalStat()}.`,
      `Centennial Hills continues to outperform with ${generateLocalStat()}.`,
      `Local experts in Skye Canyon report ${generateLocalStat()}.`,
      `Northwest Las Vegas shows ${generateLocalStat()}.`,
    ];

    return {
      ...kcmArticle,
      title: localizedTitle,
      excerpt: localizedExcerpt,
      localContext: localContexts[Math.floor(Math.random() * localContexts.length)],
      neighborhoods: ['Centennial Hills', 'Providence', 'Skye Canyon'],
      localMetrics: {
        medianPrice: '$725,000',
        daysOnMarket: '21',
        inventoryChange: '+12%',
        priceChange: '+5.2%',
      },
    };
  }, []);

  const generateLocalStat = () => {
    const stats = [
      'homes are selling 15% faster than last quarter',
      'luxury properties under $1M see multiple offers',
      'new construction comprises 30% of current inventory',
      'average price per square foot reached $285',
      'golf course properties command 20% premiums',
      'mountain view homes appreciate 7% annually',
    ];
    return stats[Math.floor(Math.random() * stats.length)];
  };

  const getDynamicTitlePart = (headlineIndex) => {
    const dynamicParts = [
      'Real Estate Expert',
      'Market Intelligence',
      'Investment Opportunity',
      'Luxury Home Specialist',
      'Neighborhood Guide',
      'Market Trend Analyst',
    ];
    return dynamicParts[headlineIndex % dynamicParts.length];
  };

  const getNeighborhoodMetric = (neighborhood) => {
    const metrics = {
      'Centennial Hills': 'Median: $725K',
      Providence: 'Median: $680K',
      'Skye Canyon': 'Median: $890K',
    };
    return metrics[neighborhood] || 'Median: $750K';
  };

  const generateNeighborhoodUpdates = () => {
    const updates = [
      { neighborhood: 'Centennial Hills', message: 'New luxury listing at 123 Mountain View Dr' },
      { neighborhood: 'Providence', message: 'Property sold in 3 days at 98.5% of asking price' },
      { neighborhood: 'Skye Canyon', message: 'New construction phase 2 now available' },
      { neighborhood: 'Centennial Hills', message: 'Golf course homes up 8% this quarter' },
      { neighborhood: 'Providence', message: 'Inventory increased 15% month-over-month' },
      { neighborhood: 'Skye Canyon', message: 'Mountain view premiums reach 25%' },
    ];
    return updates;
  };

  const getFallbackContent = useCallback(() => {
    return [
      {
        title: 'Centennial Hills Real Estate Market Shows Strong Growth',
        excerpt:
          'The luxury real estate market in Centennial Hills continues to outperform regional averages with strong buyer demand and limited inventory.',
        localContext: 'Local experts report homes are selling 15% faster than last quarter.',
        neighborhoods: ['Centennial Hills', 'Providence', 'Skye Canyon'],
        localMetrics: {
          medianPrice: '$725,000',
          daysOnMarket: '21',
          inventoryChange: '+12%',
          priceChange: '+5.2%',
        },
      },
    ];
  }, []);

  const fetchAndLocalizeContent = useCallback(async () => {
    try {
      // Fetch KCM RSS feed
      const response = await fetch('/api/rss-feed');
      const data = await response.json();

      if (data.articles && data.articles.length > 0) {
        // Localize each article
        const localized = data.articles.slice(0, 5).map((item) => localizeContent(item));
        setLocalizedContent(localized);
      } else {
        // Fallback to static local content
        setLocalizedContent(getFallbackContent());
      }

      // Fetch local market stats (placeholder for now)
      setLocalStats({
        medianPrice: '$725,000',
        activeListings: 247,
        daysOnMarket: 21,
        saleListRatio: '98.7%',
      });
    } catch (error) {
      console.error('Failed to fetch content:', error);
      // Fallback to static local content
      setLocalizedContent(getFallbackContent());
    }
  }, [localizeContent, getFallbackContent]);

  useEffect(() => {
    fetchAndLocalizeContent();
    // Rotate headlines every 5 seconds
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % Math.max(localizedContent.length, 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [localizedContent.length, fetchAndLocalizeContent]);

  return (
    <section className="hyperlocal-hero">
      {/* Dynamic Background with Ken Burns Effect */}
      <div className="hero-backgrounds">
        <div className="hero-bg-image">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
            alt="Luxury Real Estate Hero"
            fill
            sizes="100vw"
            className="object-cover opacity-50"
            priority
            quality={85}
          />
        </div>
        <div className="hero-gradient-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="container">
          {/* Breaking News Ticker */}
          <div className="breaking-news-ticker">
            <span className="ticker-label">
              <span className="pulse-dot"></span>
              BREAKING
            </span>
            <div className="ticker-content">
              <AnimatePresence mode="wait">
                {localizedContent[currentHeadline] && (
                  <motion.span
                    key={currentHeadline}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="ticker-text"
                  >
                    {localizedContent[currentHeadline].title}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="hero-main-grid">
            {/* Left: Dynamic Localized Content */}
            <div className="hero-dynamic-content">
              <h1 className="hero-title">
                <span className="title-static">Your Centennial Hills</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentHeadline}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="title-dynamic"
                  >
                    {getDynamicTitlePart(currentHeadline)}
                  </motion.span>
                </AnimatePresence>
              </h1>

              {/* Rotating Local Market Insights */}
              <div className="insights-carousel">
                <AnimatePresence mode="wait">
                  {localizedContent[currentHeadline] && (
                    <motion.div
                      key={currentHeadline}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="insight-content"
                    >
                      <p className="insight-excerpt">{localizedContent[currentHeadline].excerpt}</p>
                      <p className="local-context">
                        <strong>Local Impact:</strong>{' '}
                        {localizedContent[currentHeadline].localContext}
                      </p>

                      {/* Neighborhood-Specific Stats */}
                      <div className="neighborhood-stats">
                        {localizedContent[currentHeadline].neighborhoods.map((hood) => (
                          <div key={hood} className="hood-stat">
                            <span className="hood-name">{hood}</span>
                            <span className="hood-metric">{getNeighborhoodMetric(hood)}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Buttons */}
              <div className="hero-ctas">
                <button type="button" className="cta-primary">
                  See How This Affects Your Home Value
                </button>
                <button type="button" className="cta-secondary">
                  Get Personalized Market Report
                </button>
              </div>
            </div>

            {/* Right: Live Local Market Dashboard */}
            <div className="hero-market-dashboard">
              <div className="dashboard-header">
                <h3>Centennial Hills Live Market</h3>
                <span className="last-updated">Updated {new Date().toLocaleTimeString()}</span>
              </div>

              {/* Animated Stats */}
              <div className="market-stats-grid">
                <motion.div
                  className="stat-card"
                  animate={{ scale: [1, 1.01, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center mx-auto mb-2">
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <span className="stat-label">Median Price</span>
                  <span className="stat-value">$725,000</span>
                  <span className="stat-change positive">+5.2%</span>
                </motion.div>

                <motion.div
                  className="stat-card"
                  animate={{ scale: [1, 1.01, 1] }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                >
                  <div className="w-5 h-5 bg-green-100 rounded-md flex items-center justify-center mx-auto mb-2">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                  </div>
                  <span className="stat-label">Active Listings</span>
                  <span className="stat-value">247</span>
                  <span className="stat-change positive">+12</span>
                </motion.div>

                <motion.div
                  className="stat-card"
                  animate={{ scale: [1, 1.01, 1] }}
                  transition={{ duration: 2, delay: 1, repeat: Infinity }}
                >
                  <div className="w-5 h-5 bg-purple-100 rounded-md flex items-center justify-center mx-auto mb-2">
                    <svg
                      className="w-3 h-3 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                  </div>
                  <span className="stat-label">Days on Market</span>
                  <span className="stat-value">21</span>
                  <span className="stat-change negative">-3</span>
                </motion.div>

                <motion.div
                  className="stat-card"
                  animate={{ scale: [1, 1.01, 1] }}
                  transition={{ duration: 2, delay: 1.5, repeat: Infinity }}
                >
                  <div className="w-5 h-5 bg-orange-100 rounded-md flex items-center justify-center mx-auto mb-2">
                    <svg
                      className="w-3 h-3 text-orange-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <span className="stat-label">Sale/List Ratio</span>
                  <span className="stat-value">98.7%</span>
                  <span className="stat-change positive">+1.2%</span>
                </motion.div>
              </div>

              {/* Mini Activity Feed */}
              <div className="activity-feed">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center">
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <h4>Live Activity</h4>
                </div>
                <AnimatedActivityFeed />
              </div>
            </div>
          </div>

          {/* Bottom: Scrolling Neighborhood Updates */}
          <div className="neighborhood-ticker">
            <div className="ticker-track">
              {generateNeighborhoodUpdates().map((update, idx) => (
                <span key={idx} className="ticker-item">
                  <span className="ticker-neighborhood">{update.neighborhood}:</span>
                  <span className="ticker-update">{update.message}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper Components
function AnimatedActivityFeed() {
  const [activities, setActivities] = useState([]);

  const generateActivity = useCallback(() => {
    const activityTypes = [
      'New listing in Providence',
      'Property sold in Centennial Hills',
      'Price reduction in Skye Canyon',
      'New construction available',
      'Open house scheduled',
    ];

    return {
      id: Date.now() + Math.random(),
      time: new Date().toLocaleTimeString(),
      text: activityTypes[Math.floor(Math.random() * activityTypes.length)],
    };
  }, []);

  useEffect(() => {
    // Simulate real-time activities
    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities((prev) => [newActivity, ...prev.slice(0, 2)]);
    }, 4000);
    return () => clearInterval(interval);
  }, [generateActivity]);

  return (
    <div className="activity-list">
      <AnimatePresence>
        {activities.map((activity, idx) => (
          <motion.div
            key={activity.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="activity-item"
          >
            <span className="activity-time">{activity.time}</span>
            <span className="activity-text">{activity.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
