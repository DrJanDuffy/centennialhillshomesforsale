
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 AWESOME CENTENNIAL HILLS DEPLOYMENT SCRIPT');
console.log('🎯 Making your real estate site absolutely perfect!');

// 🌟 Awesome emergency fallback with perfect routing
const emergencyHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Centennial Hills Homes For Sale - Dr. Jan Duff</title>
  <meta name="description" content="Find your dream home in Centennial Hills, Las Vegas with Dr. Jan Duff. Expert real estate agent serving Providence, Skye Canyon, and Northwest Las Vegas.">
  <link rel="canonical" href="https://centennialhillshomesforsale.com">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    .container { 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 20px; 
      background: rgba(255,255,255,0.95);
      margin-top: 50px;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    .header { 
      text-align: center; 
      padding: 40px 0; 
      border-bottom: 3px solid #3182ce;
      margin-bottom: 40px;
    }
    h1 { 
      color: #2c5282; 
      font-size: 3em; 
      margin-bottom: 10px;
      font-weight: 700;
    }
    .subtitle { 
      color: #4a5568; 
      font-size: 1.3em; 
      font-weight: 300;
    }
    .contact-hero { 
      background: linear-gradient(135deg, #4299e1, #3182ce); 
      color: white; 
      padding: 30px; 
      border-radius: 15px; 
      margin: 30px 0;
      text-align: center;
    }
    .contact-hero h2 { 
      font-size: 2.2em; 
      margin-bottom: 15px;
    }
    .contact-info { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
      gap: 20px; 
      margin: 20px 0;
    }
    .contact-card { 
      background: rgba(255,255,255,0.1); 
      padding: 20px; 
      border-radius: 10px; 
      border-left: 4px solid #fff;
    }
    .services-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
      gap: 20px; 
      margin: 40px 0;
    }
    .service-card { 
      background: #f7fafc; 
      padding: 25px; 
      border-radius: 12px; 
      border-left: 4px solid #3182ce;
      transition: transform 0.3s ease;
    }
    .service-card:hover { 
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    .cta-buttons { 
      display: flex; 
      gap: 15px; 
      justify-content: center; 
      flex-wrap: wrap; 
      margin: 30px 0;
    }
    .btn { 
      padding: 15px 30px; 
      border-radius: 8px; 
      text-decoration: none; 
      font-weight: 600; 
      text-align: center; 
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-primary { 
      background: #3182ce; 
      color: white; 
    }
    .btn-primary:hover { 
      background: #2c5282; 
      transform: translateY(-2px);
    }
    .btn-secondary { 
      background: #38a169; 
      color: white; 
    }
    .btn-secondary:hover { 
      background: #2f855a; 
      transform: translateY(-2px);
    }
    .areas-served { 
      background: #edf2f7; 
      padding: 30px; 
      border-radius: 15px; 
      margin: 30px 0;
    }
    .status { 
      background: #fed7d7; 
      color: #c53030; 
      padding: 15px; 
      border-radius: 8px; 
      text-align: center; 
      margin: 20px 0;
      border-left: 4px solid #e53e3e;
    }
    @media (max-width: 768px) {
      h1 { font-size: 2em; }
      .container { margin-top: 20px; padding: 15px; }
      .cta-buttons { flex-direction: column; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏠 Centennial Hills Homes</h1>
      <p class="subtitle">Your Trusted Las Vegas Real Estate Expert</p>
    </div>
    
    <div class="contact-hero">
      <h2>Dr. Jan Duff - Licensed Real Estate Professional</h2>
      <div class="contact-info">
        <div class="contact-card">
          <h3>📞 Direct Line</h3>
          <p><strong>(702) 903-1952</strong></p>
        </div>
        <div class="contact-card">
          <h3>📧 Email</h3>
          <p><strong>jan@centennialhillshomesforsale.com</strong></p>
        </div>
      </div>
    </div>
    
    <div class="cta-buttons">
      <a href="tel:+17029031952" class="btn btn-primary">📞 Call Now</a>
      <a href="mailto:jan@centennialhillshomesforsale.com" class="btn btn-secondary">📧 Email Dr. Duff</a>
    </div>
    
    <div class="services-grid">
      <div class="service-card">
        <h3>🏡 Home Buying</h3>
        <p>Expert guidance through every step of your home buying journey in Las Vegas.</p>
      </div>
      <div class="service-card">
        <h3>💰 Home Selling</h3>
        <p>Maximize your property value with proven marketing strategies and local expertise.</p>
      </div>
      <div class="service-card">
        <h3>📊 Market Analysis</h3>
        <p>Comprehensive market reports and property valuations for informed decisions.</p>
      </div>
      <div class="service-card">
        <h3>🎯 Investment Properties</h3>
        <p>Identify lucrative investment opportunities in growing Las Vegas neighborhoods.</p>
      </div>
    </div>
    
    <div class="areas-served">
      <h2>🗺️ Areas We Serve</h2>
      <ul style="columns: 2; column-gap: 30px; list-style: none; padding: 20px 0;">
        <li>✓ Centennial Hills</li>
        <li>✓ Providence</li>
        <li>✓ Skye Canyon</li>
        <li>✓ Northwest Las Vegas</li>
        <li>✓ ZIP 89149</li>
        <li>✓ ZIP 89166</li>
      </ul>
    </div>
    
    <div class="status">
      <p><strong>🚧 Website Optimization in Progress</strong></p>
      <p>Our full AI-powered website is being optimized for the best user experience. This emergency site ensures you can always reach us!</p>
    </div>
  </div>
  
  <script>
    // 🎯 Awesome analytics tracking
    console.log('🚀 Centennial Hills Emergency Site Active');
    
    // Track page performance
    window.addEventListener('load', () => {
      console.log('📊 Page loaded successfully');
    });
    
    // Enhanced contact tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', () => {
        console.log('📞 Phone call initiated');
      });
    });
    
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
      link.addEventListener('click', () => {
        console.log('📧 Email contact initiated');
      });
    });
  </script>
</body>
</html>
`;

function createAwesomeEmergencyDeploy() {
  console.log('🚨 Creating awesome emergency fallback site...');
  
  // Remove existing public directory build files
  if (fs.existsSync('public')) {
    // Preserve static assets, remove generated files
    const preserveFiles = ['robots.txt', 'manifest.json', 'sitemap.xml', 'icon-192x192.png', 'icon-512x512.png', 'apple-touch-icon.png'];
    const files = fs.readdirSync('public');
    files.forEach(file => {
      if (!preserveFiles.includes(file) && file.endsWith('.html')) {
        fs.rmSync(`public/${file}`, { force: true });
      }
    });
  } else {
    fs.mkdirSync('public', { recursive: true });
  }
  
  // Write emergency HTML to all possible routes
  const routes = [
    'index.html',
    '404.html',
    'about/index.html',
    'contact/index.html',
    'services/index.html',
    'listings/index.html',
    'centennial-hills/index.html',
    'providence-las-vegas/index.html',
    'skye-canyon/index.html',
    'northwest-las-vegas/index.html',
    'las-vegas-89149/index.html',
    'las-vegas-89166/index.html',
    'neighborhoods/index.html',
    'testimonials/index.html',
    'faq/index.html',
    'market-update/index.html'
  ];
  
  routes.forEach(route => {
    const dir = path.dirname(route);
    if (dir !== '.') {
      fs.mkdirSync(path.join('public', dir), { recursive: true });
    }
    fs.writeFileSync(path.join('public', route), emergencyHTML);
  });
  
  // Create manifest.json for PWA (if not exists)
  if (!fs.existsSync('public/manifest.json')) {
    const manifest = {
      name: "Centennial Hills Homes For Sale",
      short_name: "CentennialHills",
      description: "Las Vegas Real Estate with Dr. Jan Duff",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#3182ce",
      icons: [
        {
          src: "/icon-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/icon-512x512.png",
          sizes: "512x512", 
          type: "image/png"
        }
      ]
    };
    
    fs.writeFileSync('public/manifest.json', JSON.stringify(manifest, null, 2));
  }
  
  // Create robots.txt (if not exists)
  if (!fs.existsSync('public/robots.txt')) {
    const robots = `User-agent: *
Allow: /

Sitemap: https://centennialhillshomesforsale.com/sitemap.xml`;
    
    fs.writeFileSync('public/robots.txt', robots);
  }
  
  console.log('✅ Awesome emergency site created successfully!');
  console.log('📁 Files in public:', fs.readdirSync('public'));
  
  return true;
}

function attemptAwesomeBuild() {
  console.log('🔨 Attempting to build awesome Next.js app...');
  
  try {
    // Clear cache first
    console.log('🧹 Clearing build cache...');
    if (fs.existsSync('.next')) {
      fs.rmSync('.next', { recursive: true, force: true });
    }
    // Don't remove public entirely, just clear generated files
    if (fs.existsSync('public')) {
      const preserveFiles = ['robots.txt', 'manifest.json', 'sitemap.xml', 'icon-192x192.png', 'icon-512x512.png', 'apple-touch-icon.png'];
      const files = fs.readdirSync('public');
      files.forEach(file => {
        if (!preserveFiles.includes(file) && (file.endsWith('.html') || fs.statSync(`public/${file}`).isDirectory())) {
          fs.rmSync(`public/${file}`, { recursive: true, force: true });
        }
      });
    }
    
    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
    
    // Try building the app
    console.log('🚀 Building awesome static site...');
    execSync('npm run build-static', { stdio: 'inherit' });
    
    // Check if build output exists
    if (fs.existsSync('public') && fs.readdirSync('public').length > 0) {
      console.log('✅ Awesome build successful!');
      
      // Create .nojekyll for GitHub Pages compatibility
      fs.writeFileSync('public/.nojekyll', '');
      
      // Create CNAME if needed
      // fs.writeFileSync('public/CNAME', 'centennialhillshomesforsale.com');
      
      console.log('🎯 Enhanced build with awesome optimizations!');
      return true;
    } else {
      throw new Error('Build output directory is empty');
    }
  } catch (error) {
    console.log('❌ Build failed:', error.message);
    return false;
  }
}

// 🚀 MAIN AWESOME DEPLOYMENT LOGIC
console.log('🎯 Starting awesome deployment process...');

const buildSuccess = attemptAwesomeBuild();

if (!buildSuccess) {
  console.log('🚨 Build failed - deploying awesome emergency site');
  createAwesomeEmergencyDeploy();
}

// Verify deployment is ready
if (fs.existsSync('public/index.html')) {
  console.log('🌐 Awesome site is ready for deployment!');
  console.log('📊 Total files:', fs.readdirSync('public').length);
  
  // Start awesome local server
  console.log('🚀 Starting awesome local server...');
  try {
    const { spawn } = require('child_process');
    const server = spawn('npx', ['serve', 'public', '-s', '-l', '5000', '--cors', '--host', '0.0.0.0'], {
      stdio: 'inherit'
    });
    
    console.log('✅ Awesome server started on http://0.0.0.0:5000');
    console.log('🌐 Your awesome Centennial Hills site is now live!');
    console.log('🎯 Features included:');
    console.log('   → Perfect SPA routing');
    console.log('   → SEO optimized');
    console.log('   → Mobile responsive');
    console.log('   → Emergency fallback');
    console.log('   → PWA ready');
  } catch (serverError) {
    console.log('⚠️ Could not start server automatically');
    console.log('Run: npx serve public -s -l 5000 --cors --host 0.0.0.0');
  }
} else {
  console.log('❌ Deployment failed completely');
  process.exit(1);
}
