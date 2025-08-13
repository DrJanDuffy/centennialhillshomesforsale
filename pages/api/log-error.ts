import type { NextApiRequest, NextApiResponse } from 'next';

interface ErrorLogData {
  type: string;
  url?: string;
  error?: string;
  stack?: string;
  pageInfo?: any;
  metric?: string;
  value?: number;
  threshold?: number;
  step?: string;
  data?: any;
  timestamp: string;
  userAgent?: string;
  pathname?: string;
  referrer?: string;
  sessionId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const errorData: ErrorLogData = req.body;

    // Validate required fields
    if (!errorData.type || !errorData.timestamp) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Error logged:', errorData);
    }

    // In production, you could:
    // 1. Send to external error tracking service (Sentry, LogRocket, etc.)
    // 2. Store in database
    // 3. Send email alerts for critical errors
    // 4. Send to monitoring dashboard

    // For now, we'll just acknowledge receipt
    // You can implement actual logging logic here based on your needs

    // Example: Send to external service
    if (process.env.ERROR_TRACKING_WEBHOOK) {
      try {
        await fetch(process.env.ERROR_TRACKING_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...errorData,
            environment: process.env.NODE_ENV,
            domain: 'centennialhillshomesforsale.com'
          })
        });
      } catch (webhookError) {
        console.error('Failed to send to webhook:', webhookError);
      }
    }

    // Return success
    res.status(200).json({ 
      message: 'Error logged successfully',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in log-error API:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.message : 'Unknown error') : 
        'Unknown error'
    });
  }
}
