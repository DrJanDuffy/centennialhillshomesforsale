
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    customElements?: CustomElementRegistry;
  }

  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'agent-encoded-id'?: string;
        'sort-order'?: string;
        'listing-status'?: string;
        'property-types'?: string;
        'price-min'?: string;
        onLoad?: () => void;
      }, HTMLElement>;
      'realscout-market-analysis': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'realscout-market-trends': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
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
