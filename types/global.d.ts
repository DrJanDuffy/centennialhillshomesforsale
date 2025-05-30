
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    GoogleAnalytics: any;
    RealScout?: {
      init: (config: any) => void;
      [key: string]: any;
    };
  }

  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
