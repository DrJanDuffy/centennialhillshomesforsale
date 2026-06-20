const DEFAULT_ORIGIN = 'https://www.centennialhillshomesforsale.com';

/** Resolved once at module load (build/runtime). */
export const SITE_ORIGIN = getProductionSiteOriginUncached();

function normalizeOrigin(value: string): string {
  const trimmed = value.trim().replace(/\/$/, '');
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function getProductionSiteOriginUncached(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return normalizeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  }
  return DEFAULT_ORIGIN;
}

/**
 * Canonical production origin for SEO, JSON-LD, and OG tags.
 * Set NEXT_PUBLIC_SITE_URL in Vercel. On deploys, VERCEL_PROJECT_PRODUCTION_URL
 * is also available (including preview) when system env vars are enabled.
 */
export function getProductionSiteOrigin(): string {
  return SITE_ORIGIN;
}

/** Hostname only (e.g. www.centennialhillshomesforsale.com) — not for email local-parts. */
export function getSiteHostname(): string {
  return new URL(SITE_ORIGIN).hostname;
}

/** JSON-LD @id: https://www.example.com/#fragment */
export function siteEntityId(fragment: string): string {
  return `${SITE_ORIGIN}/#${fragment.replace(/^#/, '')}`;
}

/** Absolute canonical URL for a site path (default `/`). */
export function canonicalForPath(path = '/'): string {
  if (!path || path === '/') {
    return SITE_ORIGIN;
  }
  return toAbsoluteUrl(path.startsWith('/') ? path : `/${path}`);
}

/** Deployment hostname without protocol — preview *.vercel.app; not for canonical URLs. */
export function getDeploymentHost(): string | undefined {
  return process.env.VERCEL_URL;
}

export function isVercelPreview(): boolean {
  return process.env.VERCEL_ENV === 'preview';
}

export function isVercelProduction(): boolean {
  return process.env.VERCEL_ENV === 'production';
}

export function toAbsoluteUrl(path: string, origin = getProductionSiteOrigin()): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalizedPath}`;
}
