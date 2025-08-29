import type { NextApiRequest, NextApiResponse } from 'next';
import { type FUBLead, fubAPI } from '../../../lib/follow-up-boss';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const leadData: FUBLead = req.body;

    // Validate required fields
    if (!leadData.firstName || !leadData.lastName || !leadData.email || !leadData.phone) {
      return res.status(400).json({
        error: 'Missing required fields: firstName, lastName, email, phone',
      });
    }

    // Add timestamp and source if not provided
    const enrichedLeadData: FUBLead = {
      ...leadData,
      timestamp: leadData.timestamp || new Date().toISOString(),
      source: leadData.source || 'Website API',
      trigger: leadData.trigger || 'API Submission',
    };

    // Create lead in Follow Up Boss
    const result = await fubAPI.createLead(enrichedLeadData);

    if (result.success) {
      // Log successful lead creation
      console.log('Lead created successfully via API:', {
        name: `${enrichedLeadData.firstName} ${enrichedLeadData.lastName}`,
        email: enrichedLeadData.email,
        phone: enrichedLeadData.phone,
        timestamp: enrichedLeadData.timestamp,
      });

      return res.status(200).json({
        success: true,
        message: 'Lead created successfully',
        data: result.data,
      });
    } else {
      console.error('Failed to create lead in Follow Up Boss:', result.error);
      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to create lead',
      });
    }
  } catch (error) {
    console.error('API Error creating lead:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
