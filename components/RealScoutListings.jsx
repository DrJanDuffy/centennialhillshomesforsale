// components/RealScoutListings.jsx

export default function RealScoutListings({ 
  priceMin = 600000, 
  priceMax = 750000,
  propertyTypes = "SFR,MF",
  listingStatus = "For Sale" 
}) {
  return (
    <>
      {/* RealScout Widget - Script and styles loaded globally in _document.tsx */}
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
