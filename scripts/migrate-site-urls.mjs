/**
 * One-off: replace hardcoded centennialhillshomesforsale.com URLs with lib/site-url helpers.
 * Skips email addresses (jan@centennialhillshomesforsale.com).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const SKIP_FILES = new Set([
  path.normalize('lib/site-url.ts'),
  path.normalize('scripts/migrate-site-urls.mjs'),
  path.normalize('.env.example'),
]);

const IMPORT_LINE =
  "import { canonicalForPath, getProductionSiteOrigin, siteEntityId, toAbsoluteUrl } from '@/lib/site-url';\n";

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (name === 'node_modules' || name === '.next' || name === '.git') continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (/\.(tsx|ts)$/.test(name)) files.push(full);
  }
  return files;
}

function ensureImport(content) {
  if (content.includes("from '@/lib/site-url'") || content.includes('from "../lib/site-url"')) {
    return content;
  }
  const useClient = content.startsWith("'use client'") || content.startsWith('"use client"');
  if (useClient) {
    const lines = content.split('\n');
    const insertAt = lines[0].includes('use client') ? 1 : 0;
    lines.splice(insertAt, 0, '', IMPORT_LINE.trim());
    return lines.join('\n');
  }
  const m = content.match(/^import .+ from .+;\n/m);
  if (m) {
    const idx = content.indexOf(m[0]) + m[0].length;
    return `${content.slice(0, idx)}${IMPORT_LINE}${content.slice(idx)}`;
  }
  return `${IMPORT_LINE}${content}`;
}

function migrateContent(content) {
  let next = content;

  // @id with hash fragment
  next = next.replace(
    /'https:\/\/(?:www\.)?centennialhillshomesforsale\.com\/#([\w-]+)'/g,
    (_, frag) => `siteEntityId('${frag}')`
  );

  // href="https://..."
  next = next.replace(
    /href="https:\/\/(?:www\.)?centennialhillshomesforsale\.com(\/?[^"]*)"/g,
    (_, p) => {
      const pathPart = p || '/';
      return `href={canonicalForPath('${pathPart === '/' ? '/' : pathPart}')}`;
    }
  );

  // content="https://..."
  next = next.replace(
    /content="https:\/\/(?:www\.)?centennialhillshomesforsale\.com(\/?[^"]*)"/g,
    (_, p) => {
      const pathPart = p || '/';
      return `content={canonicalForPath('${pathPart === '/' ? '/' : pathPart}')}`;
    }
  );

  // canonicalUrl="https://..."
  next = next.replace(
    /canonicalUrl="https:\/\/(?:www\.)?centennialhillshomesforsale\.com(\/?[^"]*)"/g,
    (_, p) => {
      const pathPart = p || '/';
      return `canonicalUrl={canonicalForPath('${pathPart === '/' ? '/' : pathPart}')}`;
    }
  );

  // default prop: pageUrl = 'https://...'
  next = next.replace(
    /pageUrl = 'https:\/\/(?:www\.)?centennialhillshomesforsale\.com\/?'/g,
    'pageUrl = getProductionSiteOrigin()'
  );

  // website = 'https://...'
  next = next.replace(
    /website = 'https:\/\/(?:www\.)?centennialhillshomesforsale\.com\/?'/g,
    'website = getProductionSiteOrigin()'
  );

  // website: 'https://...' in objects
  next = next.replace(
    /website: 'https:\/\/(?:www\.)?centennialhillshomesforsale\.com\/?'/g,
    'website: getProductionSiteOrigin()'
  );

  // const siteUrl = 'https://...'
  next = next.replace(
    /const siteUrl = 'https:\/\/(?:www\.)?centennialhillshomesforsale\.com\/?';/g,
    'const siteUrl = getProductionSiteOrigin();'
  );

  // Template literal prefix
  next = next.replace(
    /`https:\/\/(?:www\.)?centennialhillshomesforsale\.com\$\{/g,
    '`${getProductionSiteOrigin()}${'
  );

  // url: 'https://...path' (schema)
  next = next.replace(
    /url: 'https:\/\/(?:www\.)?centennialhillshomesforsale\.com(\/?[^']*)'/g,
    (_, p) => {
      const pathPart = p || '/';
      return `url: canonicalForPath('${pathPart === '/' ? '/' : pathPart}')`;
    }
  );

  // item: 'https://...'
  next = next.replace(
    /item: 'https:\/\/(?:www\.)?centennialhillshomesforsale\.com(\/?[^']*)'/g,
    (_, p) => {
      const pathPart = p || '/';
      return `item: canonicalForPath('${pathPart === '/' ? '/' : pathPart}')`;
    }
  );

  // image: 'https://.../images/...'
  next = next.replace(
    /image: 'https:\/\/(?:www\.)?centennialhillshomesforsale\.com(\/[^']+)'/g,
    (_, p) => `image: toAbsoluteUrl('${p}')`
  );

  // contentUrl:
  next = next.replace(
    /contentUrl: 'https:\/\/(?:www\.)?centennialhillshomesforsale\.com(\/[^']+)'/g,
    (_, p) => `contentUrl: canonicalForPath('${p}')`
  );

  // domain: 'centennialhillshomesforsale.com' (no protocol, not email)
  next = next.replace(
    /domain: 'centennialhillshomesforsale\.com'/g,
    "domain: getSiteHostname().replace(/^www\\./, '')"
  );

  return next;
}

function needsSiteUrlImport(content) {
  return (
    content.includes('canonicalForPath(') ||
    content.includes('getProductionSiteOrigin()') ||
    content.includes('siteEntityId(') ||
    content.includes('toAbsoluteUrl(')
  );
}

function needsGetSiteHostname(content) {
  return content.includes('getSiteHostname()');
}

let updated = 0;
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  if (SKIP_FILES.has(rel)) continue;

  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('centennialhillshomesforsale.com')) continue;
  // Skip email-only lines
  const hasUrl =
    /https:\/\/(?:www\.)?centennialhillshomesforsale\.com/.test(content) ||
    /domain: 'centennialhillshomesforsale\.com'/.test(content) ||
    /website = 'https:\/\//.test(content) ||
    /const siteUrl = 'https:\/\//.test(content);

  if (!hasUrl) continue;

  const migrated = migrateContent(content);
  if (migrated === content) {
    console.log('unchanged:', rel);
    continue;
  }

  let final = migrated;
  if (needsSiteUrlImport(final)) {
    final = ensureImport(final);
    if (needsGetSiteHostname(final) && !final.includes('getSiteHostname')) {
      final = final.replace(
        "from '@/lib/site-url'",
        "from '@/lib/site-url'"
      );
      final = final.replace(
        '{ canonicalForPath, getProductionSiteOrigin, siteEntityId, toAbsoluteUrl }',
        '{ canonicalForPath, getProductionSiteOrigin, getSiteHostname, siteEntityId, toAbsoluteUrl }'
      );
    }
  }

  fs.writeFileSync(file, final, 'utf8');
  console.log('updated:', rel);
  updated++;
}

console.log(`\nDone. ${updated} file(s) updated.`);
