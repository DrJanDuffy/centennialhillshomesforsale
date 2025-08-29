import type { NextApiRequest, NextApiResponse } from 'next';
import { type FUBContact, fubAPI } from '../../../lib/follow-up-boss';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const contactData: FUBContact = req.body;

    // Validate required fields
    if (
      !contactData.firstName ||
      !contactData.lastName ||
      !contactData.email ||
      !contactData.phone
    ) {
      return res.status(400).json({
        error: 'Missing required fields: firstName, lastName, email, phone',
      });
    }

    // Add default tags and custom fields
    const enrichedContactData: FUBContact = {
      ...contactData,
      tags: ['Website Contact', 'Centennial Hills', ...(contactData.tags || [])],
      customFields: {
        'Contact Source': 'Website API',
        'Contact Time': new Date().toISOString(),
        ...contactData.customFields,
      },
    };

    // Create contact in Follow Up Boss
    const result = await fubAPI.createContact(enrichedContactData);

    if (result.success) {
      // Log successful contact creation
      console.log('Contact created successfully via API:', {
        name: `${enrichedContactData.firstName} ${enrichedContactData.lastName}`,
        email: enrichedContactData.email,
        phone: enrichedContactData.phone,
        timestamp: new Date().toISOString(),
      });

      return res.status(200).json({
        success: true,
        message: 'Contact created successfully',
        data: result.data,
      });
    } else {
      console.error('Failed to create contact in Follow Up Boss:', result.error);
      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to create contact',
      });
    }
  } catch (error) {
    console.error('API Error creating contact:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
