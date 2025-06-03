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
    }
  }
}

export {};