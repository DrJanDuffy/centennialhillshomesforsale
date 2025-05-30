
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
    let retryCount = 0;
    const maxRetries = 3;
    
    // Check if script is already loaded
    const checkScript = () => {
      if (typeof window !== 'undefined') {
        const script = document.querySelector('script[src*="realscout-web-components"]');
        if (script) {
          // Wait for script to actually load
          if (script.getAttribute('data-loaded') === 'true') {
            setScriptLoaded(true);
            setIsLoading(false);
          } else {
            script.addEventListener('load', () => {
              script.setAttribute('data-loaded', 'true');
              setScriptLoaded(true);
              setIsLoading(false);
            });
            script.addEventListener('error', () => {
              if (retryCount < maxRetries) {
                retryCount++;
                console.log(`RealScout script failed, retry ${retryCount}/${maxRetries}`);
                setTimeout(checkScript, 2000);
              } else {
                setHasError(true);
                setIsLoading(false);
              }
            });
          }
        } else {
          // Script not found, try again in a moment
          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(checkScript, 1000);
          } else {
            setHasError(true);
            setIsLoading(false);
          }
        }
      }
    };

    // Initial check
    checkScript();

    // Set timeout to stop loading after 12 seconds (increased for retry attempts)
    const timeout = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 12000);

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
        <div className="fallback-buttons">
          <a href="tel:+17029031952" className="btn btn-primary">
            📞 Call (702) 903-1952
          </a>
          <a href="/listings" className="btn btn-secondary">
            View All Listings
          </a>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-outline"
          >
            🔄 Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`realscout-widget-container ${className}`} 
      style={{ 
        pointerEvents: 'auto',
        position: 'relative',
        zIndex: 1,
        isolation: 'isolate',
        minHeight: '400px'
      }}
    >
      <realscout-office-listings 
        agent-encoded-id={agentId}
        sort-order={sortOrder}
        listing-status={listingStatus}
        property-types={propertyTypes}
        price-min={priceMin}
        style={{ 
          pointerEvents: 'auto',
          cursor: 'auto',
          userSelect: 'auto',
          touchAction: 'manipulation',
          position: 'relative',
          zIndex: 2,
          width: '100%',
          minHeight: '400px',
          display: 'block'
        }}
        onLoad={() => {
          // Ensure all interactive elements within are clickable
          setTimeout(() => {
            const widget = document.querySelector('realscout-office-listings');
            if (widget) {
              const interactiveElements = widget.querySelectorAll('a, button, [role="button"], .listing-card, .property-card');
              interactiveElements.forEach(el => {
                el.style.pointerEvents = 'auto';
                el.style.cursor = 'pointer';
                el.style.userSelect = 'auto';
                el.style.touchAction = 'manipulation';
              });
            }
          }, 1000);
        }}
      />
    </div>
  );
};

export default RealScoutListings;
