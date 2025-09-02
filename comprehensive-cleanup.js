#!/usr/bin/env node

/**
 * Comprehensive Website Directory Cleanup
 * This script audits every section, page, and file to ensure proper organization
 */

const fs = require('node:fs');
const path = require('node:path');

console.log('🧹 COMPREHENSIVE WEBSITE DIRECTORY CLEANUP');
console.log('==========================================\n');

// Track cleanup actions
const cleanupActions = {
  deleted: [],
  moved: [],
  created: [],
  fixed: []
};

// Check if file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Check if directory exists
function dirExists(dirPath) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

// Create directory if it doesn't exist
function ensureDir(dirPath) {
  if (!dirExists(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    cleanupActions.created.push(`📁 Directory: ${dirPath}`);
    console.log(`✅ Created directory: ${dirPath}`);
  }
}

// Delete file
function deleteFile(filePath) {
  if (fileExists(filePath)) {
    fs.unlinkSync(filePath);
    cleanupActions.deleted.push(`🗑️  File: ${filePath}`);
    console.log(`🗑️  Deleted: ${filePath}`);
  }
}

// Move file
function moveFile(from, to) {
  if (fileExists(from)) {
    ensureDir(path.dirname(to));
    fs.renameSync(from, to);
    cleanupActions.moved.push(`📦 Moved: ${from} → ${to}`);
    console.log(`📦 Moved: ${from} → ${to}`);
  }
}

// 1. AUDIT PAGES DIRECTORY
function auditPagesDirectory() {
  console.log('📄 AUDITING PAGES DIRECTORY');
  console.log('============================\n');
  
  const pagesDir = 'pages';
  if (!dirExists(pagesDir)) {
    console.log('❌ Pages directory not found');
    return;
  }
  
  const pages = fs.readdirSync(pagesDir);
  console.log(`📊 Found ${pages.length} files in pages directory:`);
  pages.forEach(page => {
    const fullPath = path.join(pagesDir, page);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      console.log(`   📁 ${page}/ (directory)`);
    } else {
      console.log(`   📄 ${page} (${stats.size} bytes)`);
    }
  });
  console.log('');
}

// 2. AUDIT COMPONENTS DIRECTORY
function auditComponentsDirectory() {
  console.log('🧩 AUDITING COMPONENTS DIRECTORY');
  console.log('=================================\n');
  
  const componentsDir = 'components';
  if (!dirExists(componentsDir)) {
    console.log('❌ Components directory not found');
    return;
  }
  
  const components = fs.readdirSync(componentsDir);
  console.log(`📊 Found ${components.length} files in components directory:`);
  components.forEach(component => {
    const fullPath = path.join(componentsDir, component);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      console.log(`   📁 ${component}/ (directory)`);
    } else {
      console.log(`   🧩 ${component} (${stats.size} bytes)`);
    }
  });
  console.log('');
}

// 3. AUDIT PUBLIC ASSETS
function auditPublicAssets() {
  console.log('📁 AUDITING PUBLIC ASSETS');
  console.log('==========================\n');
  
  const publicDir = 'public';
  if (!dirExists(publicDir)) {
    console.log('❌ Public directory not found');
    return;
  }
  
  function scanDirectory(dir, level = 0) {
    const items = fs.readdirSync(dir);
    const indent = '  '.repeat(level);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        console.log(`${indent}📁 ${item}/`);
        scanDirectory(fullPath, level + 1);
      } else {
        const sizeKB = Math.round(stats.size / 1024);
        console.log(`${indent}📄 ${item} (${sizeKB}KB)`);
      }
    });
  }
  
  scanDirectory(publicDir);
  console.log('');
}

// 4. CLEAN UP UNUSED SCRIPTS
function cleanupUnusedScripts() {
  console.log('🧹 CLEANING UP UNUSED SCRIPTS');
  console.log('==============================\n');
  
  const rootFiles = fs.readdirSync('.');
  const scriptFiles = rootFiles.filter(file => 
    file.endsWith('.js') && 
    !file.startsWith('package') && 
    !file.startsWith('next') &&
    !file.startsWith('middleware') &&
    !file.startsWith('vercel')
  );
  
  console.log(`📊 Found ${scriptFiles.length} script files in root:`);
  scriptFiles.forEach(script => {
    console.log(`   📜 ${script}`);
  });
  
  // Keep essential scripts, remove temporary ones
  const scriptsToKeep = [
    'audit-site-images.js',
    'create-placeholder-images.js',
    'update-image-references.js',
    'optimize-hero-image.js',
    'fix-image-display.js',
    'comprehensive-cleanup.js'
  ];
  
  const scriptsToRemove = scriptFiles.filter(script => 
    !scriptsToKeep.includes(script) && 
    (script.includes('generate-hero') || 
     script.includes('test-') || 
     script.includes('check-') ||
     script.includes('setup-') ||
     script.includes('find-') ||
     script.includes('trigger-') ||
     script.includes('improve-') ||
     script.includes('clear-') ||
     script.includes('fix-dns'))
  );
  
  console.log(`\n🗑️  Removing ${scriptsToRemove.length} temporary scripts:`);
  scriptsToRemove.forEach(script => {
    deleteFile(script);
  });
  console.log('');
}

// 5. ORGANIZE IMAGE ASSETS
function organizeImageAssets() {
  console.log('🖼️  ORGANIZING IMAGE ASSETS');
  console.log('===========================\n');
  
  // Ensure proper directory structure
  const imageDirs = [
    'public/images',
    'public/assets/images/property-gallery',
    'public/assets/images/neighborhoods',
    'public/assets/images/interior-photos',
    'public/assets/icons',
    'public/assets/icons/ui'
  ];
  
  imageDirs.forEach(dir => {
    ensureDir(dir);
  });
  
  // Check for misplaced images
  const publicDir = 'public';
  if (dirExists(publicDir)) {
    const allFiles = fs.readdirSync(publicDir, { withFileTypes: true });
    
    allFiles.forEach(file => {
      if (file.isFile() && (file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png'))) {
        const currentPath = path.join(publicDir, file.name);
        const targetPath = path.join('public/images', file.name);
        
        if (currentPath !== targetPath) {
          moveFile(currentPath, targetPath);
        }
      }
    });
  }
  
  console.log('');
}

// 6. CLEAN UP DOCUMENTATION FILES
function cleanupDocumentation() {
  console.log('📚 CLEANING UP DOCUMENTATION');
  console.log('=============================\n');
  
  const docsToKeep = [
    'README.md',
    'package.json',
    'package-lock.json',
    'next.config.js',
    'tailwind.config.js',
    'components.json',
    'middleware.js',
    'vercel.json'
  ];
  
  const rootFiles = fs.readdirSync('.');
  const docFiles = rootFiles.filter(file => 
    file.endsWith('.md') && 
    !docsToKeep.includes(file)
  );
  
  console.log(`📊 Found ${docFiles.length} documentation files:`);
  docFiles.forEach(doc => {
    console.log(`   📄 ${doc}`);
  });
  
  // Create docs directory and move documentation files
  ensureDir('docs');
  docFiles.forEach(doc => {
    const targetPath = path.join('docs', doc);
    moveFile(doc, targetPath);
  });
  
  console.log('');
}

// 7. FIX IMAGE REFERENCES
function fixImageReferences() {
  console.log('🔗 FIXING IMAGE REFERENCES');
  console.log('===========================\n');
  
  // Fix property gallery JSON to use SVG placeholders (since JPG files don't exist yet)
  const jsonPath = 'public/assets/images/property-gallery/index.json';
  if (fileExists(jsonPath)) {
    let content = fs.readFileSync(jsonPath, 'utf8');
    const originalContent = content;
    
    // Replace .jpg with .svg since we only have SVG placeholders
    content = content.replace(/\.jpg/g, '.svg');
    
    if (content !== originalContent) {
      fs.writeFileSync(jsonPath, content);
      cleanupActions.fixed.push(`🔗 Fixed image references in ${jsonPath}`);
      console.log(`✅ Fixed image references in property gallery JSON`);
    }
  }
  
  console.log('');
}

// 8. CLEAN UP ENVIRONMENT AND CONFIG FILES
function cleanupConfigFiles() {
  console.log('⚙️  CLEANING UP CONFIG FILES');
  console.log('=============================\n');
  
  const configFiles = [
    '.env.local',
    '.env.example',
    '.gitignore',
    '.eslintrc.json',
    '.prettierrc',
    'tsconfig.json',
    'next-env.d.ts'
  ];
  
  console.log('📊 Checking config files:');
  configFiles.forEach(config => {
    if (fileExists(config)) {
      const stats = fs.statSync(config);
      console.log(`   ✅ ${config} (${stats.size} bytes)`);
    } else {
      console.log(`   ❌ ${config} (missing)`);
    }
  });
  
  console.log('');
}

// 9. GENERATE CLEANUP REPORT
function generateCleanupReport() {
  console.log('📊 CLEANUP REPORT');
  console.log('=================\n');
  
  console.log(`✅ Created: ${cleanupActions.created.length} items`);
  cleanupActions.created.forEach(action => console.log(`   ${action}`));
  
  console.log(`\n📦 Moved: ${cleanupActions.moved.length} items`);
  cleanupActions.moved.forEach(action => console.log(`   ${action}`));
  
  console.log(`\n🗑️  Deleted: ${cleanupActions.deleted.length} items`);
  cleanupActions.deleted.forEach(action => console.log(`   ${action}`));
  
  console.log(`\n🔗 Fixed: ${cleanupActions.fixed.length} items`);
  cleanupActions.fixed.forEach(action => console.log(`   ${action}`));
  
  const totalActions = cleanupActions.created.length + 
                      cleanupActions.moved.length + 
                      cleanupActions.deleted.length + 
                      cleanupActions.fixed.length;
  
  console.log(`\n🎉 Total cleanup actions: ${totalActions}`);
  console.log('\n💡 Your website directory is now clean and organized!');
}

// Main execution
async function main() {
  try {
    auditPagesDirectory();
    auditComponentsDirectory();
    auditPublicAssets();
    cleanupUnusedScripts();
    organizeImageAssets();
    cleanupDocumentation();
    fixImageReferences();
    cleanupConfigFiles();
    generateCleanupReport();
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
    process.exit(1);
  }
}

main();
