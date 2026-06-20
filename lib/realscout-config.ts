/** RealScout widget defaults — agent ID is per-site via env when set. */
export const REALSCOUT_AGENT_ENCODED_ID =
  process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ENCODED_ID ?? 'QWdlbnQtMjI1MDUw';

export const REALSCOUT_SCRIPT_URL =
  'https://em.realscout.com/widgets/realscout-web-components.umd.js';

export const REALSCOUT_DEFAULT_LISTING_ATTRS = {
  sortOrder: 'STATUS_AND_SIGNIFICANT_CHANGE',
  listingStatus: 'For Sale',
  propertyTypes: 'SFR,MF,TC',
} as const;

export const REALSCOUT_DEFAULT_SECTION = {
  title: 'Current Listings',
  subtitle: 'Browse our latest property listings in Centennial Hills and surrounding areas',
} as const;
