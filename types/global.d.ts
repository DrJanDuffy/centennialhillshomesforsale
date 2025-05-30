declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    customElements?: CustomElementRegistry;
    RealScout?: any;
  }
}

export {};