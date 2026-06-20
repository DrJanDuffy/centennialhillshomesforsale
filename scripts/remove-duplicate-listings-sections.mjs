import fs from 'node:fs';
import path from 'node:path';

const pagesDir = path.join(process.cwd(), 'pages');
const listingsSectionRe =
  /\r?\n\s*<motion\.section\r?\n\s*className="listings-section"[\s\S]*?<\/motion\.section>/g;

const files = [
  'the-trails.tsx',
  'tournament-hills.tsx',
  'skye-canyon.tsx',
  'providence-las-vegas.tsx',
  'las-vegas-89149.tsx',
  'las-vegas-89166.tsx',
  'northwest-las-vegas.tsx',
];

for (const f of files) {
  const p = path.join(pagesDir, f);
  const before = fs.readFileSync(p, 'utf8');
  const after = before.replace(listingsSectionRe, '');
  if (after !== before) {
    fs.writeFileSync(p, after);
    console.log(`removed duplicate listings-section: ${f}`);
  }
}
