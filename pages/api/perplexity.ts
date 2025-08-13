import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // --------------------------------------------------------------
    // PERPLEXITY API CALL
    // --------------------------------------------------------------
    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',   // <-- official endpoint
      {
        model: 'llama-3-sonar-small-32k-online',   // pick any model you have access to
        messages: [
          { role: 'system', content: `You are a helpful real‑estate assistant specialized in Centennial Hills, Las Vegas. Give concise, friendly answers and reference local schools, parks, and price ranges when relevant.` },
          { role: 'user',   content: prompt }
        ],
        temperature: 0.6,
        max_tokens: 300
      },
      {
        headers: {
          // Perplexity expects the key in the Authorization header:
          Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Perplexity returns a `choices` array with `message.content`
    const reply = response.data.choices?.[0]?.message?.content?.trim() || 
                  'I could not generate a response.';

    res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Perplexity error →', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch response from Perplexity' });
  }
}
