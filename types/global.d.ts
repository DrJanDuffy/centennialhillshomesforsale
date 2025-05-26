
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    RealScout?: any;
  }
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

export {};
