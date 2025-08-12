import type { NextApiRequest, NextApiResponse } from 'next';

interface LeadData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  timeline: string;
  budget: string;
  message: string;
  trigger: string;
  timestamp: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const leadData: LeadData = req.body;

    // Validate required fields
    if (!leadData.name || !leadData.email || !leadData.phone) {
      return res.status(400).json({
        error: 'Missing required fields',
        success: false,
      });
    }

    // In a real implementation, you would:
    // 1. Save to database
    // 2. Send email notifications
    // 3. Integrate with CRM
    // 4. Send auto-responder email

    console.log('New lead captured:', {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      interest: leadData.interest,
      trigger: leadData.trigger,
      timestamp: leadData.timestamp,
    });

    // Simulate successful lead capture
    return res.status(200).json({
      success: true,
      message: 'Lead captured successfully',
      leadId: `lead_${Date.now()}`,
    });
  } catch (error) {
    console.error('Lead capture error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      success: false,
    });
  }
}
