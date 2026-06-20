import type React from 'react';

import RealScoutOfficeListings from './RealScoutOfficeListings';
import { REALSCOUT_DEFAULT_SECTION } from '@/lib/realscout-config';

interface RealScoutListingsSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  priceMin?: string;
  priceMax?: string;
}

const RealScoutListingsSection: React.FC<RealScoutListingsSectionProps> = ({
  id,
  title = REALSCOUT_DEFAULT_SECTION.title,
  subtitle = REALSCOUT_DEFAULT_SECTION.subtitle,
  className = 'py-16 bg-white',
  priceMin,
  priceMax,
}) => {
  return (
    <section id={id} className={className} aria-label="Property listings">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>
        <RealScoutOfficeListings priceMin={priceMin} priceMax={priceMax} />
      </div>
    </section>
  );
};

export default RealScoutListingsSection;
