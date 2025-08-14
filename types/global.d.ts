declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer: unknown[];
    webVitals?: {
      track: (metric: string, value: number, metadata?: any) => void;
    };
  }

  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-encoded-id'?: string;
          'sort-order'?: string;
          'listing-status'?: string;
          neighborhood?: string;
          'price-min'?: string;
          'price-max'?: string;
          'beds-min'?: string;
          'baths-min'?: string;
          'sqft-min'?: string;
          'year-built-min'?: string;
          'property-type'?: string;
        },
        HTMLElement
      >;
      'realscout-property-search': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-encoded-id'?: string;
          'sort-order'?: string;
          'listing-status'?: string;
          neighborhood?: string;
          'price-min'?: string;
          'price-max'?: string;
          'beds-min'?: string;
          'baths-min'?: string;
          'sqft-min'?: string;
          'year-built-min'?: string;
          'property-type'?: string;
        },
        HTMLElement
      >;
      'realscout-property-details': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-encoded-id'?: string;
          'sort-order'?: string;
          'listing-status'?: string;
          neighborhood?: string;
          'price-min'?: string;
          'price-max'?: string;
          'beds-min'?: string;
          'baths-min'?: string;
          'sqft-min'?: string;
          'year-built-min'?: string;
          'property-type'?: string;
        },
        HTMLElement
      >;
      'realscout-mortgage-calculator': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-encoded-id'?: string;
          'sort-order'?: string;
          'listing-status'?: string;
          neighborhood?: string;
          'price-min'?: string;
          'price-max'?: string;
          'beds-min'?: string;
          'baths-min'?: string;
          'sqft-min'?: string;
          'year-built-min'?: string;
          'property-type'?: string;
        },
        HTMLElement
      >;
      'realscout-market-insights': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-encoded-id'?: string;
          'sort-order'?: string;
          'listing-status'?: string;
          neighborhood?: string;
          'price-min'?: string;
          'price-max'?: string;
          'beds-min'?: string;
          'baths-min'?: string;
          'sqft-min'?: string;
          'year-built-min'?: string;
          'property-type'?: string;
        },
        HTMLElement
      >;
      'realscout-search': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-encoded-id'?: string;
          'sort-order'?: string;
          'listing-status'?: string;
          neighborhood?: string;
          'price-min'?: string;
          'price-max'?: string;
          'beds-min'?: string;
          'baths-min'?: string;
          'sqft-min'?: string;
          'year-built-min'?: string;
          'property-type'?: string;
        },
        HTMLElement
      >;
      'realscout-market-analysis': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-encoded-id'?: string;
          'sort-order'?: string;
          'listing-status'?: string;
          neighborhood?: string;
          'price-min'?: string;
          'price-max'?: string;
          'beds-min'?: string;
          'baths-min'?: string;
          'sqft-min'?: string;
          'year-built-min'?: string;
          'property-type'?: string;
        },
        HTMLElement
      >;
      'realscout-your-listings': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-encoded-id'?: string;
          'sort-order'?: string;
          'listing-status'?: string;
          neighborhood?: string;
          'price-min'?: string;
          'price-max'?: string;
          'beds-min'?: string;
          'baths-min'?: string;
          'sqft-min'?: string;
          'year-built-min'?: string;
          'property-type'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
