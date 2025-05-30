import { useEffect, useState } from 'react';
import styles from './RealScoutWidget.module.css';

interface RealScoutWidgetProps {
  type?: string;
  propertyId?: string;
  agentId?: string;
  brokerId?: string;
  clientId?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  clientCity?: string;
  clientState?: string;
  clientZip?: string;
  clientBudget?: string;
  clientTimeline?: string;
  clientPreferences?: string;
  agentEncodedId?: string;
  sortOrder?: string;
  listingStatus?: string;
  propertyTypes?: string;
  priceMin?: number;
  className?: string;
  filterByZip?: string;
  neighborhood?: string;
  searchParams?: {
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    baths?: number;
    sqft?: number;
    propertyType?: string;
    location?: string;
  };
}

const RealScoutWidget: React.FC<RealScoutWidgetProps> = ({
  type,
  propertyId,
  agentId,
  brokerId,
  clientId,
  clientName,
  clientEmail,
  clientPhone,
  clientAddress,
  clientCity,
  clientState,
  clientZip,
  clientBudget,
  clientTimeline,
  clientPreferences,
  agentEncodedId,
  sortOrder,
  listingStatus,
  propertyTypes,
  priceMin,
  className,
  filterByZip,
  neighborhood,
  searchParams = {}
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load RealScout script
    const script = document.createElement('script');
    script.src = 'https://widget.realscout.com/widget.js';
    script.async = true;
    script.onload = () => {
      setIsLoading(false);
      // Initialize RealScout widget
      if (typeof window !== 'undefined' && (window as any).RealScout) {
        (window as any).RealScout.init({
          type,
          propertyId,
          agentId,
          brokerId,
          clientId,
          clientName,
          clientEmail,
          clientPhone,
          clientAddress,
          clientCity,
          clientState,
          clientZip,
          clientBudget,
          clientTimeline,
          clientPreferences,
          agentEncodedId,
          sortOrder,
          listingStatus,
          propertyTypes,
          priceMin,
          filterByZip,
          neighborhood,
          searchParams,
        });
      } else {
        setError('Failed to load RealScout widget');
      }
    };
    script.onerror = () => {
      setError('Failed to load RealScout script');
      setIsLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [propertyId, searchParams]);

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {isLoading && (
        <div className={styles.loading}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-gray-600">Loading property data...</p>
        </div>
      )}
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      <div id="realscout-widget" className="w-full"></div>
    </div>
  );
};

export default RealScoutWidget;