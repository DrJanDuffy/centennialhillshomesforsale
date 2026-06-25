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

function mountWidget(
  host: HTMLDivElement,
  attrs: {
    agentEncodedId: string;
    sortOrder: string;
    listingStatus: string;
    propertyTypes: string;
    priceMin?: string;
    priceMax?: string;
    maxResults?: string;
  }
) {
  host.replaceChildren();
  const widget = document.createElement('realscout-office-listings');
  widget.setAttribute('agent-encoded-id', attrs.agentEncodedId);
  widget.setAttribute('sort-order', attrs.sortOrder);
  widget.setAttribute('listing-status', attrs.listingStatus);
  widget.setAttribute('property-types', attrs.propertyTypes);
  if (attrs.priceMin) widget.setAttribute('price-min', attrs.priceMin);
  if (attrs.priceMax) widget.setAttribute('price-max', attrs.priceMax);
  if (attrs.maxResults) widget.setAttribute('max-results', attrs.maxResults);
  widget.className = 'realscout-widget';
  host.appendChild(widget);
}

/** Imperatively mounts RealScout after the web component registry is ready (client navigation safe). */
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

    let cancelled = false;
    const attrs = {
      agentEncodedId,
      sortOrder,
      listingStatus,
      propertyTypes,
      priceMin,
      priceMax,
      maxResults,
    };

    async function hydrate() {
      if (typeof window !== 'undefined' && window.customElements) {
        try {
          await window.customElements.whenDefined('realscout-office-listings');
        } catch {
          // Script still loading — mount anyway so the element upgrades when defined.
        }
      }
      if (!cancelled && hostRef.current) {
        mountWidget(hostRef.current, attrs);
      }
    }

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, [agentEncodedId, sortOrder, listingStatus, propertyTypes, priceMin, priceMax, maxResults]);

  return <div ref={hostRef} className={`realscout-widget-container ${className}`.trim()} />;
}
