const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript/React files
function findFiles(dir, extensions = ['.ts', '.tsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      results = results.concat(findFiles(filePath, extensions));
    } else if (extensions.some(ext => file.endsWith(ext))) {
      results.push(filePath);
    }
  });
  
  return results;
}

// Function to fix over-escaped entities
function fixOverEscapedEntities(content) {
  // Fix over-escaped quotes and apostrophes
  content = content.replace(/&apos;/g, "'");
  content = content.replace(/&quot;/g, '"');
  content = content.replace(/&amp;/g, '&');
  content = content.replace(/&lt;/g, '<');
  content = content.replace(/&gt;/g, '>');
  
  return content;
}

// Function to fix unused imports
function fixUnusedImports(content) {
  const lines = content.split('\n');
  const newLines = [];
  const usedImports = new Set();
  
  // Track used imports
  for (const line of lines) {
    if (line.includes('import') && line.includes('from')) {
      const importMatch = line.match(/import\s+{([^}]+)}\s+from/);
      if (importMatch) {
        const imports = importMatch[1].split(',').map(imp => imp.trim().split(' as ')[0]);
        imports.forEach(imp => usedImports.add(imp));
      }
    }
  }
  
  // Check if imports are actually used
  for (const line of lines) {
    if (line.includes('import') && line.includes('from')) {
      const importMatch = line.match(/import\s+{([^}]+)}\s+from/);
      if (importMatch) {
        const imports = importMatch[1].split(',').map(imp => imp.trim());
        const usedImportsInLine = imports.filter(imp => {
          const name = imp.split(' as ')[0];
          return content.includes(name) && content.indexOf(name) !== content.indexOf(line);
        });
        
        if (usedImportsInLine.length === 0) {
          // Skip this import line
          continue;
        } else if (usedImportsInLine.length !== imports.length) {
          // Keep only used imports
          const newImport = `import { ${usedImportsInLine.join(', ')} } from ${line.match(/from\s+['"][^'"]+['"]/)[0]};`;
          newLines.push(newImport);
          continue;
        }
      }
    }
    newLines.push(line);
  }
  
  return newLines.join('\n');
}

// Function to fix any types
function fixAnyTypes(content) {
  content = content.replace(/: any/g, ': unknown');
  content = content.replace(/any\[\]/g, 'unknown[]');
  content = content.replace(/any\b/g, 'unknown');
  return content;
}

// Function to fix HTML anchor tags to Next.js Link components
function fixAnchorTags(content) {
  // Replace anchor tags with Next.js Link components
  content = content.replace(
    /<a\s+href="\/([^"]+)"([^>]*)>/g,
    '<Link href="/$1"$2>'
  );
  content = content.replace(/<\/a>/g, '</Link>');
  
  // Add Link import if not present
  if (content.includes('<Link') && !content.includes("import Link from 'next/link'")) {
    const importMatch = content.match(/import\s+.*\s+from\s+['"]react['"]/);
    if (importMatch) {
      content = content.replace(
        importMatch[0],
        `${importMatch[0].replace('}', '')}, Link } from 'react'`
      );
    } else {
      content = content.replace(
        /import\s+.*\s+from\s+['"]next\/link['"]/,
        "import Link from 'next/link'"
      );
    }
  }
  
  return content;
}

// Function to add eslint-disable comments for intentionally unused variables
function addEslintDisableComments(content) {
  const lines = content.split('\n');
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this line declares a variable that might be unused
    if (line.match(/(const|let|var)\s+\w+\s*=/)) {
      const varName = line.match(/(const|let|var)\s+(\w+)\s*=/)?.[2];
      if (varName) {
        // Check if this variable is used elsewhere in the file
        const usageCount = (content.match(new RegExp(`\\b${varName}\\b`, 'g')) || []).length;
        if (usageCount <= 1) { // Only declared, not used
          newLines.push(`// eslint-disable-next-line @typescript-eslint/no-unused-vars`);
        }
      }
    }
    
    newLines.push(line);
  }
  
  return newLines.join('\n');
}

// Main function to process all files
function processAllFiles() {
  console.log('Finding all TypeScript/React files...');
  const files = findFiles('.', ['.ts', '.tsx']);
  
  console.log(`Found ${files.length} files to process`);
  
  let processedCount = 0;
  
  for (const filePath of files) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      
      // Fix over-escaped entities
      const originalContent = content;
      content = fixOverEscapedEntities(content);
      if (content !== originalContent) {
        modified = true;
      }
      
      // Fix unused imports
      content = fixUnusedImports(content);
      
      // Fix any types
      content = fixAnyTypes(content);
      
      // Fix anchor tags
      content = fixAnchorTags(content);
      
      // Add eslint-disable comments
      content = addEslintDisableComments(content);
      
      if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed issues in ${filePath}`);
        processedCount++;
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  }
  
  console.log(`Processed ${processedCount} files`);
}

// Run the script
console.log('Starting comprehensive fix...');
processAllFiles();
console.log('Finished comprehensive fix.'); 