import type { NextApiRequest, NextApiResponse } from 'next';
import { CloudflareAPI } from '../../../utils/cloudflare';

// Create instance with environment variables
const cloudflareAPI = new CloudflareAPI({
  apiKey: process.env.CLOUDFLARE_API_KEY || '',
  email: process.env.CLOUDFLARE_EMAIL || '',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests for security
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, zoneId, ...data } = req.body;

    if (!zoneId) {
      return res.status(400).json({ error: 'Zone ID is required' });
    }

    let result: any;

    switch (action) {
      case 'get':
        result = await cloudflareAPI.getDNSRecords(zoneId);
        break;

      case 'create':
        if (!data.record) {
          return res.status(400).json({ error: 'DNS record data is required' });
        }
        result = await cloudflareAPI.createDNSRecord(zoneId, data.record);
        break;

      case 'update':
        if (!data.recordId || !data.updates) {
          return res.status(400).json({ error: 'Record ID and updates are required' });
        }
        result = await cloudflareAPI.updateDNSRecord(zoneId, data.recordId, data.updates);
        break;

      case 'delete':
        if (!data.recordId) {
          return res.status(400).json({ error: 'Record ID is required' });
        }
        result = await cloudflareAPI.deleteDNSRecord(zoneId, data.recordId);
        break;

      case 'purge':
        result = await cloudflareAPI.purgeCache(zoneId, data.urls);
        break;

      case 'zone-info':
        result = await cloudflareAPI.getZoneInfo(zoneId);
        break;

      default:
        return res.status(400).json({ error: 'Invalid action specified' });
    }

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Cloudflare API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
