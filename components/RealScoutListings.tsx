
import React, { useEffect, useState } from 'react';

interface RealScoutListingsProps {
  agentId?: string;
  sortOrder?: string;
  listingStatus?: string;
  propertyTypes?: string;
  priceMin?: string;
  className?: string;
}

const RealScoutListings: React.FC<RealScoutListingsProps> = ({
  agentId = "QWdlbnQtMjI1MDUw",
  sortOrder = "STATUS_AND_SIGNIFICANT_CHANGE",
  listingStatus = "For Sale",
  propertyTypes = "SFR,MF,TC",
  priceMin = "450000",
  className = ""
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if script is already loaded
    const checkScript = () => {
      if (typeof window !== 'undefined') {
        const script = document.querySelector('script[src*="realscout-web-components"]');
        if (script) {
          setScriptLoaded(true);
          setIsLoading(false);
        } else {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    // Initial check
    checkScript();

    // Set timeout to stop loading after 10 seconds
    const timeout = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  // Listen for custom element definition
  useEffect(() => {
    if (typeof window !== 'undefined' && window.customElements) {
      window.customElements.whenDefined('realscout-office-listings')
        .then(() => {
          setScriptLoaded(true);
          setIsLoading(false);
        })
        .catch(() => {
          setHasError(true);
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="realscout-loading">
        <div className="loading-spinner"></div>
        <p>Loading property listings...</p>
      </div>
    );
  }

  if (hasError || !scriptLoaded) {
    return (
      <div className="realscout-error">
        <h3>Unable to Load Property Listings</h3>
        <p>We're experiencing technical difficulties loading the property listings widget.</p>
        <p>Please try refreshing the page or contact us at (702) 903-1952 for current listings.</p>
      </div>
    );
  }

  return (
    <div className={`realscout-widget-container ${className}`}>
      <realscout-office-listings 
        agent-encoded-id={agentId}
        sort-order={sortOrder}
        listing-status={listingStatus}
        property-types={propertyTypes}
        price-min={priceMin}
      />
    </div>
  );
};

export default RealScoutListings;
