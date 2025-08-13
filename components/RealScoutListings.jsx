// components/RealScoutListings.jsx
import { useEffect } from 'react';
import Script from 'next/script';

export default function RealScoutListings({ 
  priceMin = 600000, 
  priceMax = 750000,
  propertyTypes = "SFR,MF",
  listingStatus = "For Sale" 
}) {
  return (
    <>
      {/* Load RealScout script once */}
      <Script 
        src="https://em.realscout.com/widgets/realscout-web-components.umd.js" 
        type="module"
        strategy="lazyOnload"
      />
      
      {/* Custom styles for the widget */}
      <style jsx global>{`
        realscout-office-listings {
          --rs-listing-divider-color: #658dac;
          --rs-primary-color: #2563eb;
          --rs-hover-color: #1e40af;
          --rs-text-color: #1f2937;
          --rs-card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          display: block;
          min-height: 500px;
        }
        
        /* Responsive grid layout */
        realscout-office-listings::part(listings-grid) {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        /* Card styling */
        realscout-office-listings::part(listing-card) {
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        
        realscout-office-listings::part(listing-card):hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
      `}</style>
      
      {/* RealScout Widget */}
      <realscout-office-listings 
        agent-encoded-id="QWdlbnQtMjI1MDUw" 
        sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
        listing-status={listingStatus}
        property-types={propertyTypes}
        price-min={priceMin.toString()}
        price-max={priceMax.toString()}
      />
    </>
  );
}
