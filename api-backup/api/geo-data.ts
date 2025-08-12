import type { NextApiRequest, NextApiResponse } from 'next';

interface GEOData {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GEOData | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Mock GEO data for Centennial Hills area
    const geoData: GEOData = {
      latitude: 36.2089,
      longitude: -115.2644,
      address: 'Centennial Hills',
      city: 'Las Vegas',
      state: 'NV',
      zipCode: '89149',
    };

    res.status(200).json(geoData);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch GEO data' });
  }
}
