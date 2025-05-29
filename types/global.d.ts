
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    RealScout?: {
      init: (config: any) => void;
    };
  }
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

export {};
