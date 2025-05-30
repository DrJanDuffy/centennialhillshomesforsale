
import React, { useEffect } from 'react';
import ErrorReportingSystem from '../utils/errorReporting';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

const SafeGoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
  const errorReporter = ErrorReportingSystem.getInstance();

  useEffect(() => {
    try {
      if (!measurementId || typeof window === 'undefined') return;

      // Check if script is already loaded
      if (document.querySelector(`script[src*="gtag/js?id=${measurementId}"]`)) {
        return;
      }

      // Load Google Analytics script safely
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.onerror = (error) => {
        errorReporter.reportError({
          error: 'Failed to load Google Analytics script',
          component: 'SafeGoogleAnalytics',
          severity: 'medium'
        });
      };

      document.head.appendChild(script);

      // Initialize gtag function
      window.dataLayer = window.dataLayer || [];
      if (!window.gtag) {
        window.gtag = function(...args: any[]) {
          window.dataLayer.push(args);
        };
      }

      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        page_title: 'Centennial Hills Homes for Sale',
        custom_map: {
          'real_estate_type': 'residential',
          'market_area': 'centennial_hills',
          'agent_name': 'jan_duff'
        }
      });

    } catch (error) {
      errorReporter.reportError({
        error: error instanceof Error ? error.message : String(error),
        component: 'SafeGoogleAnalytics',
        severity: 'medium'
      });
    }
  }, [measurementId]);

  return null; // This component doesn't render anything
};

export default SafeGoogleAnalytics;
