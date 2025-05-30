import * as React from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    customElements?: CustomElementRegistry;
    RealScout?: any;
  }

  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-encoded-id'?: string;
          agentEncodedId?: string;
          'sort-order'?: string;
          sortOrder?: string;
          'listing-status'?: string;
          listingStatus?: string;
          'property-types'?: string;
          propertyTypes?: string;
          'price-min'?: string;
          priceMin?: string;
          onLoad?: () => void;
          style?: React.CSSProperties;
        },
        HTMLElement
      >;
      'realscout-market-analysis': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      'realscout-market-trends': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export interface NeighborhoodName {
  value: string;
  label: string;
}

export type NeighborhoodType = 
  | 'centennial-hills' 
  | 'providence' 
  | 'skye-canyon' 
  | 'northwest-las-vegas'
  | string;

export {};