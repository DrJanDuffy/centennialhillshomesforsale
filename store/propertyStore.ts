import create from 'zustand';

export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  description: string;
  features: string[];
  type: 'house' | 'condo' | 'townhouse';
  status: 'for-sale' | 'pending' | 'sold';
  yearBuilt: number;
  garage: number;
  lot: number;
}

interface PropertyFilters {
  priceRange: string;
  bedrooms: string;
  propertyType: string;
  status: string;
}

interface PropertyStore {
  properties: Property[];
  filters: PropertyFilters;
  favorites: string[];
  loading: boolean;
  error: string | null;
  setProperties: (properties: Property[]) => void;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  toggleFavorite: (propertyId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  filteredProperties: () => Property[];
}

const usePropertyStore = create<PropertyStore>((set, get) => ({
  properties: [],
  filters: {
    priceRange: '',
    bedrooms: '',
    propertyType: '',
    status: '',
  },
  favorites: [],
  loading: false,
  error: null,

  setProperties: (properties) => set({ properties }),
  
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  toggleFavorite: (propertyId) =>
    set((state) => ({
      favorites: state.favorites.includes(propertyId)
        ? state.favorites.filter((id) => id !== propertyId)
        : [...state.favorites, propertyId],
    })),

  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),

  filteredProperties: () => {
    const { properties, filters } = get();
    
    return properties.filter((property) => {
      // Price Range Filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (min && property.price < min) return false;
        if (max && property.price > max) return false;
      }

      // Bedrooms Filter
      if (filters.bedrooms) {
        const minBeds = Number(filters.bedrooms);
        if (property.bedrooms < minBeds) return false;
      }

      // Property Type Filter
      if (filters.propertyType && property.type !== filters.propertyType) {
        return false;
      }

      // Status Filter
      if (filters.status && property.status !== filters.status) {
        return false;
      }

      return true;
    });
  },
}));

export default usePropertyStore; 