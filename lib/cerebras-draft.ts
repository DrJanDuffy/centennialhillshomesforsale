import { cerebrasService } from '@drjanduffy/cerebras-service';

import { failsFairHousing } from './fair-housing-scan';

const SITE_SYSTEM =
  'Centennial Hills, Las Vegas (89149 / 89131). Use listed square footage, amenities, commute times, and named places. Never invent a price, rate, or listing fact. If a number is unknown, say it needs verification. Client CTA phone is 702-222-1964.';

const PII_EMAIL = /\b[\w.+-]+@[\w.-]+\.\w+\b/g;
const PII_PHONE = /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g;

export function stripClientPii(text: string): string {
  return text.replace(PII_EMAIL, '[redacted]').replace(PII_PHONE, '[redacted]');
}

/**
 * Short Centennial Hills draft via Cerebras. Returns null if the key is
 * missing, the API fails, or the draft fails the Fair Housing scan.
 */
export async function draftSiteReply(prompt: string): Promise<string | null> {
  const cleaned = stripClientPii(prompt).trim();
  if (!cleaned) {
    return null;
  }

  const draft = await cerebrasService.generateDraft(cleaned, {
    system: SITE_SYSTEM,
    maxCompletionTokens: 200,
    promptCacheKey: 'site:centennial-hills',
  });

  if (!draft?.text) {
    return null;
  }

  if (failsFairHousing(draft.text)) {
    console.error('Cerebras draft failed Fair Housing scan');
    return null;
  }

  return draft.text;
}

export const CEREBRAS_FALLBACK =
  'I can help with Centennial Hills listings, square footage, amenities, and commute times. Call Dr. Jan Duffy at 702-222-1964.';
