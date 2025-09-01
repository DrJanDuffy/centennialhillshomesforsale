import type { NextApiRequest, NextApiResponse } from 'next';
import { bingAPI } from '../../../utils/bing';

interface SearchOptions {
  count: number;
  offset: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, type, location, propertyType, count, offset } = req.query;

    // Validate required parameters
    if (!query && !type) {
      return res.status(400).json({
        error: 'Query parameter or type parameter is required',
      });
    }

    let searchQuery = '';
    let searchOptions: SearchOptions = {
      count: 10,
      offset: 0,
    };

    // Handle different search types
    if (type === 'real-estate' && location) {
      const result = await bingAPI.searchRealEstate(location as string, propertyType as string, {
        count: count ? parseInt(count as string, 10) : 20,
        offset: offset ? parseInt(offset as string, 10) : 0,
      });
      return res.status(200).json(result);
    }

    if (type === 'news' && location) {
      const result = await bingAPI.searchRealEstateNews(location as string, {
        count: count ? parseInt(count as string, 10) : 10,
        offset: offset ? parseInt(offset as string, 10) : 0,
      });
      return res.status(200).json(result);
    }

    if (type === 'images' && query) {
      const result = await bingAPI.searchPropertyImages(query as string, {
        count: count ? parseInt(count as string, 10) : 15,
        offset: offset ? parseInt(offset as string, 10) : 0,
      });
      return res.status(200).json(result);
    }

    // Default web search
    if (query) {
      searchQuery = query as string;
      searchOptions = {
        count: count ? parseInt(count as string, 10) : 10,
        offset: offset ? parseInt(offset as string, 10) : 0,
      };
    } else {
      return res.status(400).json({
        error: 'Query parameter is required for web search',
      });
    }

    const result = await bingAPI.search(searchQuery, searchOptions);
    res.status(200).json(result);
  } catch (error) {
    console.error('Bing search API error:', error);

    if (error instanceof Error) {
      res.status(500).json({
        error: 'Search failed',
        message: error.message,
      });
    } else {
      res.status(500).json({
        error: 'Search failed',
        message: 'Unknown error occurred',
      });
    }
  }
}
