import axios from 'axios';
import { Property } from '../store/propertyStore';

const REALSCOUT_API_BASE_URL = process.env.NEXT_PUBLIC_REALSCOUT_API_URL;
const REALSCOUT_API_KEY = process.env.REALSCOUT_API_KEY;

interface RealScoutProperty {
  id: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  photos: Array<{
    url: string;
    caption: string;
  }>;
  description: string;
  features: string[];
  property_type: string;
  status: string;
  year_built: number;
  garage_spaces: number;
  lot_size: number;
}

const realscoutClient = axios.create({
  baseURL: REALSCOUT_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${REALSCOUT_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

const mapRealScoutToProperty = (data: RealScoutProperty): Property => ({
  id: data.id,
  title: `${data.property_type} in ${data.address.city}`,
  address: `${data.address.street}, ${data.address.city}, ${data.address.state} ${data.address.zip}`,
  price: data.price,
  bedrooms: data.bedrooms,
  bathrooms: data.bathrooms,
  squareFeet: data.square_feet,
  imageUrl: data.photos[0]?.url || '/images/placeholder.jpg',
  description: data.description,
  features: data.features,
  type: data.property_type.toLowerCase() as Property['type'],
  status: data.status.toLowerCase() as Property['status'],
  yearBuilt: data.year_built,
  garage: data.garage_spaces,
  lot: data.lot_size,
});

export const searchProperties = async (params: {
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  maxBeds?: number;
  propertyType?: string;
  status?: string;
  location?: string;
}): Promise<Property[]> => {
  try {
    const { data } = await realscoutClient.get('/properties', {
      params: {
        min_price: params.minPrice,
        max_price: params.maxPrice,
        min_beds: params.minBeds,
        max_beds: params.maxBeds,
        property_type: params.propertyType,
        status: params.status,
        location: params.location,
      },
    });

    return data.properties.map(mapRealScoutToProperty);
  } catch (error) {
    console.error('Error fetching properties from RealScout:', error);
    throw new Error('Failed to fetch properties');
  }
};

export const getPropertyDetails = async (propertyId: string): Promise<Property> => {
  try {
    const { data } = await realscoutClient.get(`/properties/${propertyId}`);
    return mapRealScoutToProperty(data);
  } catch (error) {
    console.error('Error fetching property details from RealScout:', error);
    throw new Error('Failed to fetch property details');
  }
};

export const createClient = async (params: {
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
}) => {
  try {
    const { data } = await realscoutClient.post('/clients', params);
    return data;
  } catch (error) {
    console.error('Error creating client in RealScout:', error);
    throw new Error('Failed to create client');
  }
};

export const addToFavorites = async (clientId: string, propertyId: string) => {
  try {
    const { data } = await realscoutClient.post(`/clients/${clientId}/favorites`, {
      property_id: propertyId,
    });
    return data;
  } catch (error) {
    console.error('Error adding property to favorites:', error);
    throw new Error('Failed to add property to favorites');
  }
};

export const removeFromFavorites = async (clientId: string, propertyId: string) => {
  try {
    await realscoutClient.delete(`/clients/${clientId}/favorites/${propertyId}`);
    return true;
  } catch (error) {
    console.error('Error removing property from favorites:', error);
    throw new Error('Failed to remove property from favorites');
  }
}; 