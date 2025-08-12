
#!/usr/bin/env node

const { execSync } = require('node:child_process');

console.log('🚀 Starting automatic deployment...');

try {
  // Build the project
  console.log('📦 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Commit and push changes
  console.log('📤 Pushing changes...');
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Auto-deploy: $(date)" || echo "No changes to commit"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('✅ Automatic deployment completed!');
  console.log('🌐 Your site will be available at your deployment URL');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
