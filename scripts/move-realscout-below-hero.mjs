/**
 * Moves RealScoutListingsSection from page bottom to immediately after the hero section.
 * Run: node scripts/move-realscout-below-hero.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const pagesDir = path.join(process.cwd(), 'pages');

const BOTTOM_SECTION_RE =
  /\r?\n\s*\{\/\* RealScout Office Listings \*\/\}\r?\n\s*<RealScoutListingsSection[\s\S]*?\/>\r?\n/g;

function extractBottomSection(content) {
  const match = content.match(
    /\{\/\* RealScout Office Listings \*\/\}\s*\n\s*(<RealScoutListingsSection[\s\S]*?\/>)/
  );
  if (!match) return null;
  return match[1].trim();
}

function removeBottomSection(content) {
  return content.replace(BOTTOM_SECTION_RE, '\n');
}

function findHeroInsertIndex(content) {
  const heroSectionIdx = content.search(/className="hero-section"/);
  if (heroSectionIdx !== -1) {
    const afterHero = content.slice(heroSectionIdx);
    const motionClose = afterHero.search(/<\/motion\.section>/);
    if (motionClose !== -1) {
      return heroSectionIdx + motionClose + '</motion.section>'.length;
    }
    const sectionClose = afterHero.search(/<\/section>/);
    if (sectionClose !== -1) {
      return heroSectionIdx + sectionClose + '</section>'.length;
    }
  }

  const heroCommentIdx = content.search(/\{\/\* Hero Section \*\/\}/);
  if (heroCommentIdx !== -1) {
    const afterComment = content.slice(heroCommentIdx);
    const sectionClose = afterComment.search(/<\/section>/);
    if (sectionClose !== -1) {
      return heroCommentIdx + sectionClose + '</section>'.length;
    }
  }

  const homeHeroIdx = content.search(/<HomeHero[\s\S]*?\/>/);
  if (homeHeroIdx !== -1) {
    const tag = content.slice(homeHeroIdx).match(/<HomeHero[\s\S]*?\/>/)?.[0] ?? '';
    return homeHeroIdx + tag.length;
  }

  const verificationHero = content.search(/className="(?:business-hero|verification-hero|testimonials-hero)"/);
  if (verificationHero !== -1) {
    const afterHero = content.slice(verificationHero);
    const motionClose = afterHero.search(/<\/motion\.section>/);
    if (motionClose !== -1) {
      return verificationHero + motionClose + '</motion.section>'.length;
    }
    const sectionClose = afterHero.search(/<\/section>/);
    if (sectionClose !== -1) {
      return verificationHero + sectionClose + '</section>'.length;
    }
  }

  return -1;
}

function alreadyBelowHero(content, sectionBlock) {
  const heroIdx = findHeroInsertIndex(content);
  if (heroIdx === -1) return false;
  const window = content.slice(heroIdx, heroIdx + 600);
  return window.includes('<RealScoutListingsSection');
}

function ensureImport(content) {
  if (content.includes("from '../components/RealScoutListingsSection'") ||
      content.includes('from "../components/RealScoutListingsSection"') ||
      content.includes("from '@/components/RealScoutListingsSection'")) {
    return content;
  }

  const layoutImport = content.match(/import Layout from ['"][^'"]+['"];/);
  if (layoutImport) {
    return content.replace(
      layoutImport[0],
      `${layoutImport[0]}\nimport RealScoutListingsSection from '../components/RealScoutListingsSection';`
    );
  }

  const firstImport = content.match(/^import .+;$/m);
  if (firstImport) {
    return content.replace(
      firstImport[0],
      `${firstImport[0]}\nimport RealScoutListingsSection from '../components/RealScoutListingsSection';`
    );
  }

  return `import RealScoutListingsSection from '../components/RealScoutListingsSection';\n${content}`;
}

function processFile(filePath) {
  const rel = path.relative(process.cwd(), filePath);
  if (rel.startsWith('pages\\api') || rel.startsWith('pages/api')) return null;
  if (path.basename(filePath).startsWith('_')) return null;

  let content = fs.readFileSync(filePath, 'utf8');
  const bottomBlock = extractBottomSection(content);

  const defaultBlock =
    bottomBlock ??
    `<RealScoutListingsSection\n        title="Current Listings"\n        subtitle="Browse our latest property listings in Centennial Hills and surrounding areas"\n      />`;

  if (alreadyBelowHero(content, defaultBlock)) {
    if (bottomBlock) {
      content = removeBottomSection(content);
      fs.writeFileSync(filePath, content);
      return `${rel}: removed duplicate bottom section (post-hero already present)`;
    }
    return null;
  }

  const insertAt = findHeroInsertIndex(content);
  if (insertAt === -1) {
    return `${rel}: skipped (no hero found)`;
  }

  content = ensureImport(content);
  if (bottomBlock) {
    content = removeBottomSection(content);
  }

  const insertion = `\n\n      {/* RealScout Listings — below hero */}\n      ${defaultBlock}\n`;
  content = content.slice(0, insertAt) + insertion + content.slice(insertAt);

  fs.writeFileSync(filePath, content);
  return `${rel}: moved listings below hero`;
}

const files = fs
  .readdirSync(pagesDir)
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => path.join(pagesDir, f));

const results = files.map(processFile).filter(Boolean);
console.log(results.join('\n') || 'No pages updated.');
console.log(`Updated ${results.length} file(s).`);
