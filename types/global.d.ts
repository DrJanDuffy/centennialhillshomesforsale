
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    GoogleAnalytics: any;
  }

  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
