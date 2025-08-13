import { NextApiRequest, NextApiResponse } from 'next';
import { CACHE_KEYS, CACHE_TTL, getCachedData } from '../../../lib/cache';
import { RSSFeedData, fetchKCMFeed } from '../../../lib/rss-parser';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RSSFeedData | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get cached data with fallback
    const feedData = await getCachedData(
      CACHE_KEYS.KCM_FEED,
      fetchKCMFeed,
      CACHE_TTL.FEED
    );

    // Set cache headers for CDN and browser caching
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'application/json');
    
    return res.status(200).json(feedData);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    
    // Return error response
    return res.status(500).json({ 
      error: 'Failed to fetch market insights. Please try again later.' 
    });
  }
}

// Configure response size limit for Vercel
export const config = {
  api: {
    responseLimit: '8mb',
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
