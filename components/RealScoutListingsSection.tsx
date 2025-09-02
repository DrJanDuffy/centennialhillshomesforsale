import type React from 'react';

interface RealScoutListingsSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const RealScoutListingsSection: React.FC<RealScoutListingsSectionProps> = ({
  title = 'Current Listings',
  subtitle = 'Browse our latest property listings in Centennial Hills and surrounding areas',
  className = 'py-16 bg-white',
}) => {
  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>
        <realscout-office-listings
          agent-encoded-id="QWdlbnQtMjI1MDUw"
          sort-order="STATUS_AND_SIGNIFICANT_CHANGE"
          listing-status="For Sale"
          property-types="SFR,MF,TC"
        />
      </div>
    </section>
  );
};

export default RealScoutListingsSection;
