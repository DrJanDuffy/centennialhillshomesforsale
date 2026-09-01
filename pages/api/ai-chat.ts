import type { NextApiRequest, NextApiResponse } from 'next';

import { CEREBRAS_FALLBACK, draftSiteReply } from '../../lib/cerebras-draft';

type ChatResponse = { response: string } | { error: string };

/**
 * Alias for AIRealEstateChat, which posts `{ message }` and reads `data.response`.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ChatResponse>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const message = typeof req.body?.message === 'string' ? req.body.message : '';

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = (await draftSiteReply(message)) ?? CEREBRAS_FALLBACK;
    return res.status(200).json({ response });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Cerebras ai-chat error →', errorMessage);
    return res.status(500).json({ error: 'Failed to generate a draft reply' });
  }
}
