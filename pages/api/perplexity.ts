import type { NextApiRequest, NextApiResponse } from 'next';

import { CEREBRAS_FALLBACK, draftSiteReply } from '../../lib/cerebras-draft';

type ChatResponse = { reply: string } | { error: string };

/**
 * Centennial Hills AI chat. Cerebras is the inference path (sync, ≤200 tokens).
 * Route kept at /api/perplexity so existing AIChatBox clients keep working.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ChatResponse>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt : '';

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const reply = (await draftSiteReply(prompt)) ?? CEREBRAS_FALLBACK;
    return res.status(200).json({ reply });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Cerebras chat error →', errorMessage);
    return res.status(500).json({ error: 'Failed to generate a draft reply' });
  }
}
