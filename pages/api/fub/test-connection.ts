import { NextApiRequest, NextApiResponse } from 'next';
import { fubAPI } from '../../../lib/follow-up-boss';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test Follow Up Boss API connection
    const result = await fubAPI.testConnection();

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Follow Up Boss API connection successful',
        timestamp: new Date().toISOString(),
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error || 'API connection failed',
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('API Connection Test Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
}
