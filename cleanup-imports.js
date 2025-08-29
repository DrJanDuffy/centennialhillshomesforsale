const fs = require('node:fs');
const _path = require('node:path');

const filesToFix = [
  './pages/about.tsx',
  './pages/index.tsx',

  // Add all files with unused imports
];

filesToFix.forEach((file) => {
  try {
    console.log(`Processing: ${file}`);
    let content = fs.readFileSync(file, 'utf8');

    // Remove all next/image imports
    content = content.replace(/import\s+.*Image.*from\s+['"]next\/image['"];?\n?/g, '');
    // Remove all next/link imports
    content = content.replace(/import\s+.*Link.*from\s+['"]next\/link['"];?\n?/g, '');

    fs.writeFileSync(file, content);
    console.log(`Cleaned: ${file}`);
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
});
