
import { useState, useEffect, useCallback } from 'react';

interface MCPMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface MCPResponse {
  content: string;
  role: 'assistant';
}

interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  description: string;
  neighborhood: string;
  yearBuilt?: number;
  lotSize?: number;
  features: string[];
  status: 'for-sale' | 'sold' | 'pending';
  listingDate: string;
  mlsNumber?: string;
}

interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minSqft?: number;
  maxSqft?: number;
  neighborhood?: string;
  propertyType?: string;
  features?: string[];
}

interface MCPClient {
  sendMessage: (message: string) => Promise<MCPResponse>;
  searchProperties: (query: string, filters?: SearchFilters) => Promise<Property[]>;
  getPropertyDetails: (propertyId: string) => Promise<Property>;
  getFeaturedProperties: () => Promise<Property[]>;
  getNeighborhoodData: (neighborhood: string) => Promise<any>;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  searchPropertiesAI: (query: string, params: any) => Promise<any>;
  getInstantValuation: (address: string, params: any) => Promise<any>;
  getMarketForecast: (area: string, timeframe: string) => Promise<any>;
}

export interface UseMCPClientReturn {
  mcpClient: MCPClient;
  isConnected: boolean;
  isConnecting: boolean;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  searchProperties: (query: string, filters?: SearchFilters) => Promise<Property[]>;
  getPropertyDetails: (propertyId: string) => Promise<Property>;
  getFeaturedProperties: () => Promise<Property[]>;
  getNeighborhoodData: (neighborhood: string) => Promise<any>;
  properties: Property[];
  featuredProperties: Property[];
}

export const useMCPClient = (): UseMCPClientReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);

  // Enhanced mock property data for Centennial Hills
  const mockProperties: Property[] = [
    {
      id: '1',
      title: 'Stunning Modern Home in Centennial Hills',
      price: 850000,
      address: '8324 Providence Ranch Ave, Las Vegas, NV 89166',
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2850,
      imageUrl: '/api/placeholder/400/300',
      description: 'Beautiful modern home with mountain views and upgraded finishes throughout. Open floor plan perfect for entertaining.',
      neighborhood: 'Centennial Hills',
      yearBuilt: 2019,
      lotSize: 8500,
      features: ['Mountain Views', 'Upgraded Kitchen', 'Two-Car Garage', 'Covered Patio', 'Energy Efficient'],
      status: 'for-sale',
      listingDate: '2024-01-15',
      mlsNumber: 'CH001234'
    },
    {
      id: '2',
      title: 'Luxury Estate with Resort-Style Pool',
      price: 925000,
      address: '9876 Skye Canyon Dr, Las Vegas, NV 89166',
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3200,
      imageUrl: '/api/placeholder/400/300',
      description: 'Spacious luxury home featuring a resort-style backyard with pool, spa, and outdoor kitchen. Premium lot with privacy.',
      neighborhood: 'Skye Canyon',
      yearBuilt: 2020,
      lotSize: 12000,
      features: ['Pool', 'Spa', 'Outdoor Kitchen', 'Premium Lot', 'Smart Home Features', 'Wine Cellar'],
      status: 'for-sale',
      listingDate: '2024-01-08',
      mlsNumber: 'SC005678'
    },
    {
      id: '3',
      title: 'Family Home with Golf Course Views',
      price: 775000,
      address: '7543 Centennial Hills Blvd, Las Vegas, NV 89149',
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 2890,
      imageUrl: '/api/placeholder/400/300',
      description: 'Perfect family home overlooking the golf course with open floor plan and upgraded flooring throughout.',
      neighborhood: 'Centennial Hills',
      yearBuilt: 2018,
      lotSize: 9200,
      features: ['Golf Course Views', 'Open Floor Plan', 'Upgraded Flooring', 'Three-Car Garage', 'Study/Office'],
      status: 'for-sale',
      listingDate: '2024-01-20',
      mlsNumber: 'CH009876'
    },
    {
      id: '4',
      title: 'Providence New Construction',
      price: 695000,
      address: '5432 Providence Peaks Dr, Las Vegas, NV 89166',
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2200,
      imageUrl: '/api/placeholder/400/300',
      description: 'Brand new construction in popular Providence community. Modern design with energy-efficient features.',
      neighborhood: 'Providence',
      yearBuilt: 2024,
      lotSize: 7800,
      features: ['New Construction', 'Energy Efficient', 'Modern Design', 'Smart Home Ready', 'Community Pool'],
      status: 'for-sale',
      listingDate: '2024-01-25',
      mlsNumber: 'PR002468'
    },
    {
      id: '5',
      title: 'Upgraded Single Story in Centennial',
      price: 625000,
      address: '6789 Mountain Ridge Way, Las Vegas, NV 89149',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1950,
      imageUrl: '/api/placeholder/400/300',
      description: 'Beautifully upgraded single-story home with tile throughout and designer kitchen. Low maintenance desert landscaping.',
      neighborhood: 'Centennial Hills',
      yearBuilt: 2016,
      lotSize: 6500,
      features: ['Single Story', 'Tile Throughout', 'Designer Kitchen', 'Desert Landscaping', 'RV Parking'],
      status: 'for-sale',
      listingDate: '2024-01-12',
      mlsNumber: 'CH007531'
    },
    {
      id: '6',
      title: 'Sold - Market Comparison',
      price: 825000,
      address: '4321 Canyon Vista Ct, Las Vegas, NV 89149',
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2750,
      imageUrl: '/api/placeholder/400/300',
      description: 'Recently sold comparable property with similar features and layout. Great reference for market values.',
      neighborhood: 'Centennial Hills',
      yearBuilt: 2017,
      lotSize: 8200,
      features: ['Pool', 'Mountain Views', 'Upgraded Kitchen', 'Solar Panels', 'Three-Car Garage'],
      status: 'sold',
      listingDate: '2023-12-01',
      mlsNumber: 'CH004567'
    }
  ];

  const searchProperties = useCallback(async (query: string, filters?: SearchFilters): Promise<Property[]> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      let results = [...mockProperties];

      // Apply text search
      if (query.trim()) {
        const searchTerm = query.toLowerCase();
        results = results.filter(property => 
          property.title.toLowerCase().includes(searchTerm) ||
          property.address.toLowerCase().includes(searchTerm) ||
          property.description.toLowerCase().includes(searchTerm) ||
          property.neighborhood.toLowerCase().includes(searchTerm) ||
          property.features.some(feature => feature.toLowerCase().includes(searchTerm))
        );
      }

      // Apply filters
      if (filters) {
        if (filters.minPrice) results = results.filter(p => p.price >= filters.minPrice!);
        if (filters.maxPrice) results = results.filter(p => p.price <= filters.maxPrice!);
        if (filters.minBedrooms) results = results.filter(p => p.bedrooms >= filters.minBedrooms!);
        if (filters.maxBedrooms) results = results.filter(p => p.bedrooms <= filters.maxBedrooms!);
        if (filters.minBathrooms) results = results.filter(p => p.bathrooms >= filters.minBathrooms!);
        if (filters.maxBathrooms) results = results.filter(p => p.bathrooms <= filters.maxBathrooms!);
        if (filters.minSqft) results = results.filter(p => p.sqft >= filters.minSqft!);
        if (filters.maxSqft) results = results.filter(p => p.sqft <= filters.maxSqft!);
        if (filters.neighborhood) results = results.filter(p => p.neighborhood.toLowerCase() === filters.neighborhood!.toLowerCase());
        if (filters.features && filters.features.length > 0) {
          results = results.filter(p => 
            filters.features!.some(feature => 
              p.features.some(pFeature => pFeature.toLowerCase().includes(feature.toLowerCase()))
            )
          );
        }
      }

      setProperties(results);
      return results;
    } catch (err) {
      const errorMessage = 'Failed to search properties';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPropertyDetails = useCallback(async (propertyId: string): Promise<Property> => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const property = mockProperties.find(p => p.id === propertyId);
      if (!property) {
        throw new Error('Property not found');
      }

      return property;
    } catch (err) {
      const errorMessage = 'Failed to get property details';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFeaturedProperties = useCallback(async (): Promise<Property[]> => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Return featured properties (highest priced available)
      const featured = mockProperties
        .filter(p => p.status === 'for-sale')
        .sort((a, b) => b.price - a.price)
        .slice(0, 3);

      setFeaturedProperties(featured);
      return featured;
    } catch (err) {
      const errorMessage = 'Failed to get featured properties';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getNeighborhoodData = useCallback(async (neighborhood: string): Promise<any> => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const neighborhoodProperties = mockProperties.filter(p => 
        p.neighborhood.toLowerCase() === neighborhood.toLowerCase()
      );

      const avgPrice = neighborhoodProperties.reduce((sum, p) => sum + p.price, 0) / neighborhoodProperties.length;
      const totalListings = neighborhoodProperties.filter(p => p.status === 'for-sale').length;

      return {
        neighborhood,
        averagePrice: Math.round(avgPrice),
        totalListings,
        priceRange: {
          min: Math.min(...neighborhoodProperties.map(p => p.price)),
          max: Math.max(...neighborhoodProperties.map(p => p.price))
        },
        popularFeatures: [
          'Mountain Views',
          'Upgraded Kitchen',
          'Pool',
          'Two-Car Garage',
          'Open Floor Plan'
        ]
      };
    } catch (err) {
      const errorMessage = 'Failed to get neighborhood data';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Enhanced MCP client implementation
  const mcpClient: MCPClient = {
    isConnected,
    searchProperties,
    getPropertyDetails,
    getFeaturedProperties,
    getNeighborhoodData,

    sendMessage: async (message: string): Promise<MCPResponse> => {
      if (!isConnected) {
        throw new Error('MCP client is not connected');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

      // Enhanced intelligent responses for real estate
      const lowerMessage = message.toLowerCase();
      let response = '';

      if (lowerMessage.includes('home') || lowerMessage.includes('house') || lowerMessage.includes('property')) {
        response = `I can help you find the perfect home in Centennial Hills! Based on "${message}", I'd recommend checking out our latest listings with modern amenities and great school districts.`;
      } else if (lowerMessage.includes('price') || lowerMessage.includes('value') || lowerMessage.includes('worth')) {
        response = `Property values in Centennial Hills have been strong. For "${message}", I can provide a detailed market analysis including recent comparables and trends.`;
      } else if (lowerMessage.includes('school') || lowerMessage.includes('education')) {
        response = `Centennial Hills has excellent schools! The area is served by top-rated CCSD schools. Let me provide details about school ratings and boundaries for your area of interest.`;
      } else if (lowerMessage.includes('market') || lowerMessage.includes('trend')) {
        response = `The Centennial Hills market is showing positive trends. Based on "${message}", I can share current market conditions, inventory levels, and pricing forecasts.`;
      } else {
        const responses = [
          `I understand you're asking about "${message}". As your Centennial Hills real estate specialist, let me help you with that.`,
          `That's a great question about "${message}". With 15+ years in Northwest Las Vegas, I can provide expert insights.`,
          `Based on "${message}", I'd suggest exploring our comprehensive property search and market analysis tools.`,
          `I can help you with "${message}". Let me provide some relevant real estate information for the Centennial Hills area.`,
        ];
        response = responses[Math.floor(Math.random() * responses.length)];
      }

      return {
        content: response,
        role: 'assistant'
      };
    },

    searchPropertiesAI: async (query: string, params: any): Promise<any> => {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            properties: mockProperties.slice(0, 3).map(p => ({
              id: p.id,
              address: p.address,
              price: `$${p.price.toLocaleString()}`,
              bedrooms: p.bedrooms,
              bathrooms: p.bathrooms,
              sqft: p.sqft,
              neighborhood: p.neighborhood,
              features: p.features.slice(0, 3)
            })),
            total: mockProperties.length,
            query: query,
            suggestions: [
              'Refine search by price range',
              'Add specific amenities',
              'Search by school district',
              'Filter by lot size'
            ]
          })
        }]
      };
    },

    getInstantValuation: async (address: string, params: any): Promise<any> => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            estimate: '$775,000',
            confidence: 'High',
            range: '$750,000 - $800,000',
            factors: [
              'Recent comparable sales',
              'Neighborhood trends',
              'Property improvements',
              'Market conditions'
            ],
            suggestions: [
              'Schedule professional appraisal',
              'Review recent upgrades impact',
              'Compare with similar properties',
              'Get personalized market analysis'
            ]
          })
        }]
      };
    },

    getMarketForecast: async (area: string, timeframe: string): Promise<any> => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            area: area,
            forecast: 'Stable with moderate growth',
            priceChange: '+2.8% predicted',
            inventory: 'Balanced market',
            trends: [
              'Continued demand for family homes',
              'New construction adding inventory',
              'Strong school districts driving interest',
              'Infrastructure improvements boosting values'
            ],
            suggestions: [
              'Great time for both buyers and sellers',
              'Consider new construction options',
              'Explore emerging neighborhoods',
              'Lock in current interest rates'
            ]
          })
        }]
      };
    },

    connect: async (): Promise<void> => {
      setIsConnecting(true);
      setError(null);
      
      try {
        // Simulate connection delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        setIsConnected(true);
        setError(null);
        
        // Load initial data
        await Promise.all([
          searchProperties(''),
          getFeaturedProperties()
        ]);
      } catch (err) {
        setError('Failed to connect to MCP server');
        setIsConnected(false);
      } finally {
        setIsConnecting(false);
      }
    },

    disconnect: (): void => {
      setIsConnected(false);
      setError(null);
      setProperties([]);
      setFeaturedProperties([]);
    }
  };

  const connect = useCallback(async () => {
    await mcpClient.connect();
  }, []);

  const disconnect = useCallback(() => {
    mcpClient.disconnect();
  }, []);

  // Auto-connect on mount
  useEffect(() => {
    if (!isConnected && !isConnecting) {
      connect();
    }
  }, [connect, isConnected, isConnecting]);

  return {
    mcpClient,
    isConnected,
    isConnecting,
    isLoading,
    error,
    connect,
    disconnect,
    searchProperties,
    getPropertyDetails,
    getFeaturedProperties,
    getNeighborhoodData,
    properties,
    featuredProperties
  };
};
