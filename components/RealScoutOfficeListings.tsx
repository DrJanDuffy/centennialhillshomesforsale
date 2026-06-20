'use client';

import { useEffect, useRef } from 'react';

import {
  REALSCOUT_AGENT_ENCODED_ID,
  REALSCOUT_DEFAULT_LISTING_ATTRS,
} from '@/lib/realscout-config';

type RealScoutOfficeListingsProps = {
  agentEncodedId?: string;
  sortOrder?: string;
  listingStatus?: string;
  propertyTypes?: string;
  priceMin?: string;
  priceMax?: string;
  maxResults?: string;
  className?: string;
};

/** Imperatively mounts the RealScout custom element so it hydrates on client navigation. */
export default function RealScoutOfficeListings({
  agentEncodedId = REALSCOUT_AGENT_ENCODED_ID,
  sortOrder = REALSCOUT_DEFAULT_LISTING_ATTRS.sortOrder,
  listingStatus = REALSCOUT_DEFAULT_LISTING_ATTRS.listingStatus,
  propertyTypes = REALSCOUT_DEFAULT_LISTING_ATTRS.propertyTypes,
  priceMin,
  priceMax,
  maxResults,
  className = '',
}: RealScoutOfficeListingsProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.replaceChildren();
    const widget = document.createElement('realscout-office-listings');
    widget.setAttribute('agent-encoded-id', agentEncodedId);
    widget.setAttribute('sort-order', sortOrder);
    widget.setAttribute('listing-status', listingStatus);
    widget.setAttribute('property-types', propertyTypes);
    if (priceMin) widget.setAttribute('price-min', priceMin);
    if (priceMax) widget.setAttribute('price-max', priceMax);
    if (maxResults) widget.setAttribute('max-results', maxResults);
    widget.className = 'realscout-widget';
    host.appendChild(widget);
  }, [agentEncodedId, sortOrder, listingStatus, propertyTypes, priceMin, priceMax, maxResults]);

  return <div ref={hostRef} className={`realscout-widget-container ${className}`.trim()} />;
}
