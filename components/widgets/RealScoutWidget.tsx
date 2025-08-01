import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './RealScoutWidget.module.css';

interface RealScoutWidgetProps {
  type?: 'search' | 'property-details' | 'market-analysis' | 'featured-listings' | 'office-listings';
  propertyId?: string;
  agentId?: string;
  brokerId?: string;
  neighborhood?: string;
  priceRange?: { min: number; max: number };
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  className?: string;
  title?: string;
  description?: string;
  // RealScout specific props
  agentEncodedId?: string;
  sortOrder?: string;
  listingStatus?: string;
  propertyTypes?: string;
  priceMin?: number;
  priceMax?: number;
}

const RealScoutWidget: React.FC<RealScoutWidgetProps> = ({
  type = 'office-listings',
  propertyId,
  neighborhood,
  className = '',
  title,
  description,
  // RealScout specific props with defaults
  agentEncodedId = 'QWdlbnQtMjI1MDUw',
  sortOrder = 'STATUS_AND_SIGNIFICANT_CHANGE',
  listingStatus = 'For Sale',
  propertyTypes = 'SFR,MF,TC',
  priceMin = 600000,
  priceMax = 1200000
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load RealScout script if not already loaded
    const loadRealScoutScript = () => {
      if (window.realscout) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.realscout.com/js/realscout.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load RealScout script'));
        document.head.appendChild(script);
      });
    };

    const initializeWidget = async () => {
      try {
        await loadRealScoutScript();
        
        // Wait for RealScout to be ready
        if (window.realscout && window.realscout.init) {
          window.realscout.init();
        }
      } catch (error) {
        console.error('Failed to initialize RealScout widget:', error);
      }
    };

    initializeWidget();
  }, []);

  const renderOfficeListings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${styles.realscoutWidget} ${className}`}
      ref={widgetRef}
    >
      {title && (
        <div className={styles.widgetHeader}>
          <h3 className={styles.widgetTitle}>{title}</h3>
          {description && <p className={styles.widgetDescription}>{description}</p>}
        </div>
      )}
      
      <div className={styles.realscoutContainer}>
        <realscout-office-listings
          agent-encoded-id={agentEncodedId}
          sort-order={sortOrder}
          listing-status={listingStatus}
          property-types={propertyTypes}
          price-min={priceMin.toString()}
          price-max={priceMax.toString()}
        />
      </div>
    </motion.div>
  );

  const renderSearchWidget = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${styles.realscoutWidget} ${className}`}
      ref={widgetRef}
    >
      {title && (
        <div className={styles.widgetHeader}>
          <h3 className={styles.widgetTitle}>{title}</h3>
          {description && <p className={styles.widgetDescription}>{description}</p>}
        </div>
      )}
      
      <div className={styles.realscoutContainer}>
        <realscout-search
          agent-encoded-id={agentEncodedId}
          sort-order={sortOrder}
          listing-status={listingStatus}
          property-types={propertyTypes}
          price-min={priceMin.toString()}
          price-max={priceMax.toString()}
        />
      </div>
    </motion.div>
  );

  const renderPropertyDetails = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${styles.realscoutWidget} ${className}`}
      ref={widgetRef}
    >
      {title && (
        <div className={styles.widgetHeader}>
          <h3 className={styles.widgetTitle}>{title}</h3>
          {description && <p className={styles.widgetDescription}>{description}</p>}
        </div>
      )}
      
      <div className={styles.realscoutContainer}>
        <realscout-property-details
          agent-encoded-id={agentEncodedId}
          property-id={propertyId}
        />
      </div>
    </motion.div>
  );

  const renderMarketAnalysis = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${styles.realscoutWidget} ${className}`}
      ref={widgetRef}
    >
      {title && (
        <div className={styles.widgetHeader}>
          <h3 className={styles.widgetTitle}>{title}</h3>
          {description && <p className={styles.widgetDescription}>{description}</p>}
        </div>
      )}
      
      <div className={styles.realscoutContainer}>
        <realscout-market-analysis
          agent-encoded-id={agentEncodedId}
          neighborhood={neighborhood}
        />
      </div>
    </motion.div>
  );

  const renderWidget = () => {
    switch (type) {
      case 'search':
        return renderSearchWidget();
      case 'property-details':
        return renderPropertyDetails();
      case 'market-analysis':
        return renderMarketAnalysis();
      case 'featured-listings':
      case 'office-listings':
      default:
        return renderOfficeListings();
    }
  };

  return renderWidget();
};

// Add RealScout types to window object
declare global {
  interface Window {
    realscout?: {
      init: () => void;
    };
  }
}

export default RealScoutWidget;