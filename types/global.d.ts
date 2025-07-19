declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    customElements?: CustomElementRegistry;
    RealScout?: any;
  }
  
  namespace JSX {
    interface IntrinsicElements {
      'realscout-office-listings': any;
      'realscout-search': any;
      'realscout-property-details': any;
      'realscout-market-analysis': any;
      'realscout-your-listings': any;
    }
  }
}

export {};