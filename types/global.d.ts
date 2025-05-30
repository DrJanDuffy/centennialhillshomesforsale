
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
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
