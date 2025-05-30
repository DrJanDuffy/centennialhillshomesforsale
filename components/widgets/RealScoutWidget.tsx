import { useEffect, useState } from 'react';
import styles from './RealScoutWidget.module.css';

// Declare custom elements for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-market-analysis': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'realscout-market-trends': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

interface RealScoutWidgetProps {
  propertyId?: string;
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
  propertyId,
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
          propertyId,
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
    <div className={styles.container}>
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