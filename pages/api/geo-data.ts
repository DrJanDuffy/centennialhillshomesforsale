import type { NextApiRequest, NextApiResponse } from 'next';

interface GEOData {
  agent: {
    name: string;
    experience: string;
    license: string;
    rating: number;
    reviews: number;
    specialties: string[];
  };
  marketData: {
    medianPrice: string;
    averageDays: string;
    appreciation: string;
    inventory: string;
    lastUpdated: string;
  };
  neighborhoods: {
    name: string;
    priceRange: string;
    highlights: string[];
    schools: string[];
  }[];
  citations: string[];
}

// This file is moved to utils/geoData.ts for static export compatibility
// API routes are not compatible with static export